'use server';

import { prisma } from '@/../lib/db/prisma';
import { sendInvoiceGeneratedEmail } from '@/lib/email/email-service';

export async function getInvoiceRequests() {
    try {
        const requests = await prisma.invoiceRequest.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                order: {
                    select: {
                        orderNumber: true,
                        total: true,
                        paymentStatus: true
                    }
                }
            }
        });
        return { success: true, requests };
    } catch (error) {
        console.error('Error fetching invoice requests:', error);
        return { success: false, error: 'Error al obtener solicitudes' };
    }
}

export async function updateInvoiceRequest(id: string, data: { status: 'GENERATED' | 'FAILED', xmlUrl?: string, pdfUrl?: string }) {
    try {
        const updated = await prisma.invoiceRequest.update({
            where: { id },
            data: {
                status: data.status,
                xmlUrl: data.xmlUrl,
                pdfUrl: data.pdfUrl,
            },
            include: { order: true }
        });

        if (data.status === 'GENERATED' && data.xmlUrl && data.pdfUrl) {
            // Send email asynchronously and don't block response (optional, but safer to await if critical)
            try {
                await sendInvoiceGeneratedEmail(updated.email, updated.order.orderNumber, data.xmlUrl, data.pdfUrl);
            } catch (emailErr) {
                console.error("Failed to send invoice email", emailErr);
            }
        }

        return { success: true, request: updated };
    } catch (error) {
        console.error('Error updating invoice request:', error);
        return { success: false, error: 'Error al actualizar la solicitud' };
    }
}
