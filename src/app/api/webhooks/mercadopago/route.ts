import { NextRequest, NextResponse } from 'next/server';
import { getPayment } from '@/lib/payment/mercadopago';
import prisma from '@/lib/db/prisma';

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

            // 3. Update Order in DB
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    paymentStatus: dbPaymentStatus,
                    status: dbOrderStatus,
                    paymentId: data.id.toString(),
                    updatedAt: new Date()
                }
            });

            console.log(`[Webhook] Order ${orderId} updated successfully.`);
        }

        return NextResponse.json({ status: 'success' });
    } catch (error) {
        console.error('[Webhook] Error processing notification:', error);
        return NextResponse.json({ status: 'error', error: 'Internal Server Error' }, { status: 500 });
    }
}
