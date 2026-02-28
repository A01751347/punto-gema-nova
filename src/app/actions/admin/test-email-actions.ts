'use server';

import { sendAdminOrderNotificationEmail, sendAdminInvoiceNotificationEmail } from '@/lib/email/email-service';

export async function sendTestAdminEmailsAction() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!adminEmail) {
            return { success: false, error: 'No se ha configurado la variable ADMIN_EMAIL en el servidor.' };
        }

        const fakeOrder = {
            id: 'test-0000',
            orderNumber: 'TEST-0000',
            total: 1450.00,
            items: [
                { name: 'Suero Antioxidante (Prueba)', quantity: 1, price: 850.00 },
                { name: 'Limpiador Facial (Prueba)', quantity: 2, price: 300.00 }
            ]
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

        // Send Test Order Email
        console.log(`[Test Actions] Sending test emails to ${adminEmail}...`);

        await Promise.allSettled([
            sendAdminOrderNotificationEmail(fakeOrder, fakeUser, adminEmail),
            sendAdminInvoiceNotificationEmail(fakeInvoiceRequest, fakeOrder, adminEmail)
        ]);

        return { success: true, message: 'Correos de prueba enviados a ' + adminEmail };
    } catch (error: any) {
        console.error('[Test Actions] Error sending test emails:', error);
        return { success: false, error: error.message || 'Error desconocido al enviar los correos.' };
    }
}
