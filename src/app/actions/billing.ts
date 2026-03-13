'use server';

import { prisma } from '@/../lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { sendInvoiceRequestNotification, sendAdminInvoiceNotificationEmail } from '@/lib/email/email-service';

// Response types
type ActionResponse = {
    success: boolean;
    message?: string;
    data?: any;
    error?: string;
};

/**
 * Validates if an order exists, is paid, and matches the amount provided.
 */
export async function validateOrderForInvoicing(orderNumber: string, amount: string): Promise<ActionResponse> {
    try {
        // Clean params
        const cleanOrderNum = orderNumber.trim();
        const cleanAmount = parseFloat(amount);

        if (isNaN(cleanAmount)) {
            return { success: false, error: 'Monto inválido' };
        }

        // Find order
        const order = await prisma.order.findUnique({
            where: { orderNumber: cleanOrderNum },
            include: { invoiceRequest: true } // Check if already invoiced
        });

        if (!order) {
            return {
                success: false,
                error: 'No encontramos una orden con ese número. Verifica tu correo de confirmación.'
            };
        }

        // Validate Amount (Allowing a tiny margin for float weirdness, though unlikely with 2 decimals)
        const diff = Math.abs(order.total - cleanAmount);
        if (diff > 1.00) { // Allow 1 peso difference just in case of rounding, or strict? Let's be semi-strict.
            return {
                success: false,
                error: `El monto ingresado ($${cleanAmount}) no coincide con el total de la orden.`
            };
        }

        // Validate Status
        if (order.paymentStatus !== 'COMPLETED') {
            return {
                success: false,
                error: 'Esta orden aún no está marcada como pagada. Si acabas de pagar, espera unos minutos.'
            };
        }

        // Check if already has invoice request
        if (order.invoiceRequest) {
            return {
                success: false,
                error: 'Esta orden ya tiene una factura generada o en proceso.'
            };
        }

        // Success
        return { success: true, message: 'Orden válida' };

    } catch (error) {
        console.error('Error validating order:', error);
        return { success: false, error: 'Ocurrió un error al buscar la orden.' };
    }
}

/**
 * Saves the fiscal data requested by the user.
 * In a real scenario with Facturapi, this would also trigger the API call.
 */
export async function createInvoiceRequest(data: {
    orderNumber: string;
    rfc: string;
    razonSocial: string;
    regimenFiscal: string;
    usoCfdi: string;
    cp: string;
    email: string;
}): Promise<ActionResponse> {
    try {
        const { orderNumber, rfc, razonSocial, regimenFiscal, usoCfdi, cp, email } = data;

        // Verify order again just in case
        const order = await prisma.order.findUnique({
            where: { orderNumber },
        });

        if (!order) return { success: false, error: 'Orden no encontrada' };

        // Create Invoice Request
        // Create Invoice Request
        await prisma.invoiceRequest.create({
            data: {
                orderId: order.id,
                rfc: rfc.toUpperCase(),
                razonSocial: razonSocial.toUpperCase(),
                regimenFiscal,
                usoCfdi,
                cp,
                email,
                status: 'PENDING', // Initially pending until admin/job processes it
            }
        });

        // Send Notifications (Client + Admin)
        try {
            const emailPromises: Promise<any>[] = [
                sendInvoiceRequestNotification(data, order, email)
            ];

            // Fetch configured invoice admin emails from DB
            const settings = await prisma.storeSettings.findUnique({ where: { id: 'default' } });
            const adminEmails = settings?.invoiceNotificationEmails || [];

            // Fallback to env if empty
            if (adminEmails.length === 0 && process.env.ADMIN_EMAIL) {
                adminEmails.push(process.env.ADMIN_EMAIL);
            }

            // Send to each config email
            for (const adminEmail of adminEmails) {
                if (adminEmail) {
                    emailPromises.push(sendAdminInvoiceNotificationEmail(data, order, adminEmail));
                }
            }

            await Promise.allSettled(emailPromises);
        } catch (emailErr) {
            console.error('Failed to send invoice request emails:', emailErr);
        }

        return {
            success: true,
            message: 'Solicitud guardada correctamente. Recibirás tu factura en breve.'
        };

    } catch (error) {
        console.error('Error creating invoice request:', error);
        return { success: false, error: 'Error al guardar la solicitud.' };
    }
}
