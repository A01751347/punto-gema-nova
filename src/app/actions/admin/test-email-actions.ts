'use server';

import { sendAdminOrderNotificationEmail, sendAdminInvoiceNotificationEmail } from '@/lib/email/email-service';

import prisma from '@/lib/db/prisma';

export async function sendTestAdminEmailsAction() {
    try {
        const settings = await prisma.storeSettings.findUnique({ where: { id: 'default' } });

        let orderEmails = settings?.orderNotificationEmails || [];
        if (orderEmails.length === 0 && process.env.ADMIN_EMAIL) {
            orderEmails.push(process.env.ADMIN_EMAIL);
        }

        let invoiceEmails = settings?.invoiceNotificationEmails || [];
        if (invoiceEmails.length === 0 && process.env.ADMIN_EMAIL) {
            invoiceEmails.push(process.env.ADMIN_EMAIL);
        }

        if (orderEmails.length === 0 && invoiceEmails.length === 0) {
            return { success: false, error: 'No hay correos configurados. Ve a "Configuración" y añade un correo primero.' };
        }

        let testItems = [
            { name: 'Suero Antioxidante (Prueba)', quantity: 1, price: 850.00 },
            { name: 'Limpiador Facial (Prueba)', quantity: 2, price: 300.00 }
        ];

        try {
            const realProducts = await prisma.product.findMany({
                take: 2,
                select: { name: true, price: true }
            });
            if (realProducts && realProducts.length > 0) {
                testItems = realProducts.map((p, index) => ({
                    name: p.name,
                    quantity: index === 0 ? 1 : 2,
                    price: p.price
                }));
            }
        } catch (e) {
            console.error("Error fetching real products for test email", e);
        }

        const fakeOrder = {
            id: 'test-0000',
            orderNumber: 'TEST-0000',
            total: testItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
            items: testItems
        };

        const fakeUser = {
            firstName: 'Cliente',
            lastName: 'De Prueba',
            email: 'cliente@ejemplo.com'
        };

        const fakeInvoiceRequest = {
            rfc: 'XAXX010101000',
            razonSocial: 'PÚBLICO EN GENERAL',
            regimenFiscal: '616',
            usoCfdi: 'G03',
            codigoPostal: '00000'
        };

        // Send Test Emails
        console.log(`[Test Actions] Sending test order emails to ${orderEmails.join(', ')}...`);
        console.log(`[Test Actions] Sending test invoice emails to ${invoiceEmails.join(', ')}...`);

        const promises: Promise<any>[] = [];

        orderEmails.forEach((email: string) => {
            if (email) promises.push(sendAdminOrderNotificationEmail(fakeOrder, fakeUser, email));
        });

        invoiceEmails.forEach((email: string) => {
            if (email) promises.push(sendAdminInvoiceNotificationEmail(fakeInvoiceRequest, fakeOrder, email));
        });

        await Promise.allSettled(promises);

        return { success: true, message: 'Correos de prueba enviados satisfactoriamente.' };
    } catch (error: any) {
        console.error('[Test Actions] Error sending test emails:', error);
        return { success: false, error: error.message || 'Error desconocido al enviar los correos.' };
    }
}
