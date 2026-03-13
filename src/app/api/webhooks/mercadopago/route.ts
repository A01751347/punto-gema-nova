import { NextRequest, NextResponse } from 'next/server';
import { getPayment } from '@/lib/payment/mercadopago';
import prisma from '@/lib/db/prisma';
import { sendOrderConfirmationEmail, sendAdminOrderNotificationEmail } from '@/lib/email/email-service';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, data } = body;

        // Mercado Pago sends "payment" events with the ID in data.id
        if (type === 'payment' && data?.id) {
            console.log(`[Webhook] Received payment notification for ID: ${data.id}`);

            // 1. Verify payment with Mercado Pago
            const payment = await getPayment(data.id);

            if (!payment) {
                console.error('[Webhook] Payment not found in Mercado Pago');
                return NextResponse.json({ status: 'error', message: 'Payment not found' }, { status: 404 });
            }

            const { status, external_reference, payment_method_id } = payment;
            const orderId = external_reference;

            if (!orderId) {
                console.error('[Webhook] No external_reference (Order ID) found in payment');
                return NextResponse.json({ status: 'ignored', message: 'No order ID' });
            }

            console.log(`[Webhook] Processing Order: ${orderId} | Status: ${status}`);

            // 2. Map MP status to our DB status
            // Enums from Schema:
            // PaymentStatus: PENDING, COMPLETED, FAILED, REFUNDED
            // OrderStatus: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED

            let dbPaymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' = 'PENDING';
            let dbOrderStatus: 'PENDING' | 'PROCESSING' | 'CANCELLED' | 'REFUNDED' = 'PENDING';

            switch (status) {
                case 'approved':
                    dbPaymentStatus = 'COMPLETED';
                    dbOrderStatus = 'PROCESSING'; // confirmed and ready
                    break;
                case 'pending':
                case 'in_process':
                case 'authorized':
                    dbPaymentStatus = 'PENDING';
                    dbOrderStatus = 'PENDING';
                    break;
                case 'rejected':
                case 'cancelled':
                    dbPaymentStatus = 'FAILED';
                    dbOrderStatus = 'CANCELLED';
                    break;
                case 'refunded':
                case 'charged_back':
                    dbPaymentStatus = 'REFUNDED';
                    dbOrderStatus = 'REFUNDED';
                    break;
                default:
                    console.warn(`[Webhook] Unhandled status: ${status}`);
            }

            // Check previous status to prevent double-processing stock
            const existingOrder = await prisma.order.findUnique({
                where: { id: orderId },
                select: { paymentStatus: true }
            });

            // 3. Update Order in DB
            const updatedOrder = await prisma.order.update({
                where: { id: orderId },
                data: {
                    paymentStatus: dbPaymentStatus,
                    status: dbOrderStatus,
                    paymentId: data.id.toString(),
                    updatedAt: new Date()
                },
                include: { items: true, user: true }
            });

            console.log(`[Webhook] Order ${orderId} updated successfully.`);

            // 4. Update Stock & Send Email (Only on NEW approval)
            const isNewApproval = dbPaymentStatus === 'COMPLETED' && existingOrder?.paymentStatus !== 'COMPLETED';

            if (isNewApproval) {
                console.log(`[Webhook] Processing Stock and Email for confirmed order ${orderId}`);

                // Decrement Stock
                for (const item of updatedOrder.items) {
                    await prisma.product.update({
                        where: { id: item.productId },
                        data: { stock: { decrement: item.quantity } }
                    });
                }

                // Send Emails (Client + Admin)
                if (updatedOrder.user) {
                    try {
                        const emailPromises: Promise<any>[] = [
                            sendOrderConfirmationEmail(updatedOrder, updatedOrder.user)
                        ];

                        // Fetch configured admin emails from DB
                        const settings = await prisma.storeSettings.findUnique({ where: { id: 'default' } });
                        const adminEmails = settings?.orderNotificationEmails || [];

                        // Fallback to env if empty for safety
                        if (adminEmails.length === 0 && process.env.ADMIN_EMAIL) {
                            adminEmails.push(process.env.ADMIN_EMAIL);
                        }

                        // Send to each config email
                        for (const email of adminEmails) {
                            if (email) {
                                emailPromises.push(sendAdminOrderNotificationEmail(updatedOrder, updatedOrder.user, email));
                            }
                        }

                        await Promise.allSettled(emailPromises);
                        console.log(`[Webhook] Emails sent successfully`);
                    } catch (emailError) {
                        console.error('[Webhook] Failed to send email:', emailError);
                    }
                }
            }
        }

        return NextResponse.json({ status: 'success' });
    } catch (error) {
        console.error('[Webhook] Error processing notification:', error);
        return NextResponse.json({ status: 'error', error: 'Internal Server Error' }, { status: 500 });
    }
}
