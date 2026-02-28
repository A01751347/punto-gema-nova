import nodemailer from 'nodemailer';

console.log('[EmailService] Initializing...');
console.log('[EmailService] SMTP Config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: Number(process.env.SMTP_PORT) === 465,
    user: process.env.SMTP_USER,
    pass: (process.env.SMTP_PASS || process.env.SMTP_PASSWORD) ? '********' : 'NOT_SET'
});

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD,
    },
});

const DEFAULT_FROM_EMAIL = process.env.SMTP_FROM_EMAIL || 'noreply@cremasshop.com';
const DEFAULT_FROM_NAME = process.env.SMTP_FROM_NAME || 'Cremas Shop';
const DEFAULT_FROM = `"${DEFAULT_FROM_NAME}" <${DEFAULT_FROM_EMAIL}>`;

export async function sendEmail({ to, subject, html, attachments }: { to: string, subject: string, html: string, attachments?: any[] }) {
    console.log(`[EmailService] Sending email to: ${to} | Subject: ${subject}`);
    try {
        // Verify connection first
        try {
            await transporter.verify();
            console.log('[EmailService] SMTP Connection Verified');
        } catch (verifyError) {
            console.error('[EmailService] Connection Verification Failed:', verifyError);
            throw verifyError;
        }

        const info = await transporter.sendMail({
            from: DEFAULT_FROM,
            replyTo: DEFAULT_FROM_EMAIL,
            to,
            subject,
            html,
            attachments
        });
        console.log('[EmailService] Message sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error: any) {
        console.error('[EmailService] Error sending email:', error);
        return { success: false, error };
    }
}

// --- Templates ---

export const sendOrderConfirmationEmail = async (order: any, user: any) => {
    const itemsHtml = order.items.map((item: any) => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">$${item.price.toFixed(2)}</td>
        </tr>
    `).join('');

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h1 style="color: #2c4a52;">¡Gracias por tu compra!</h1>
            <p>Hola ${user.firstName},</p>
            <p>Hemos recibido tu pedido <strong>#${order.orderNumber}</strong> y ya lo estamos preparando.</p>
            
            <h3 style="color: #2c4a52; margin-top: 20px;">Resumen del Pedido</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #f9f9f9; text-align: left;">
                        <th style="padding: 8px;">Producto</th>
                        <th style="padding: 8px;">Cant.</th>
                        <th style="padding: 8px;">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            
            <p style="text-align: right; font-size: 1.1em;">
                <strong>Total: $${order.total.toFixed(2)}</strong>
            </p>
            
            <p>Te notificaremos cuando tu pedido sea enviado.</p>
            <p style="margin-top: 30px; font-size: 0.9em; color: #777;">Si necesitas factura, puedes solicitarla desde <a href="${process.env.NEXT_PUBLIC_APP_URL}/cuenta/pedidos/${order.id}">Mis Pedidos</a>.</p>
        </div>
    `;

    return sendEmail({
        to: user.email,
        subject: `Confirmación de Pedido #${order.orderNumber}`,
        html
    });
};

export const sendInvoiceRequestNotification = async (request: any, order: any, userEmail: string) => {
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2c4a52;">Solicitud de Factura Recibida</h2>
            <p>Hemos recibido tus datos fiscales para el pedido <strong>#${order.orderNumber}</strong>.</p>
            <p><strong>RFC:</strong> ${request.rfc}</p>
            <p><strong>Razón Social:</strong> ${request.razonSocial}</p>
            <p>Tu factura será generada y enviada a este correo en un plazo de 24 a 48 horas hábiles.</p>
        </div>
    `;

    return sendEmail({
        to: userEmail,
        subject: `Solicitud de Factura - Pedido #${order.orderNumber}`,
        html
    });
};

export const sendInvoiceGeneratedEmail = async (contactEmail: string, orderNumber: string, xmlUrl: string, pdfUrl: string) => {
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2c4a52;">Tu Factura está lista</h2>
            <p>Adjuntamos la factura correspondiente a tu pedido <strong>#${orderNumber}</strong>.</p>
            <p>Gracias por tu preferencia.</p>
        </div>
    `;

    // Note: If URLs are public, simple links might be better than attachments to avoid spam filters, 
    // but users expect attachments. Nodemailer can fetch URL attachments.
    // For now, let's provide links in body AND try simple URL attachments if supported.
    // Attachments with 'path' work for URLs.

    return sendEmail({
        to: contactEmail,
        subject: `Factura Pedido #${orderNumber}`,
        html: html + `<p><a href="${pdfUrl}">Descargar PDF</a> | <a href="${xmlUrl}">Descargar XML</a></p>`,
        attachments: [
            { filename: `Factura-${orderNumber}.pdf`, path: pdfUrl },
            { filename: `Factura-${orderNumber}.xml`, path: xmlUrl }
        ]
    });
};

export const sendShippingNotificationEmail = async (order: any, user: any, items: any[]) => { // Added items
    // Re-fetch items if not provided or simplified
    const itemsHtml = items.map((item: any) => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
        </tr>
    `).join('');

    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2c4a52;">¡Tu paquete está en camino! 🚚</h2>
            <p>Hola ${user.firstName},</p>
            <p>Tu pedido <strong>#${order.orderNumber}</strong> ha sido enviado.</p>
            
            ${order.trackingNumber ? `<p><strong>Número de Guía:</strong> ${order.trackingNumber}</p>` : ''}
            ${order.carrier ? `<p><strong>Paquetería:</strong> ${order.carrier}</p>` : ''}
            
             <h3 style="color: #2c4a52; margin-top: 20px;">Lo que viene en camino:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #f9f9f9; text-align: left;">
                        <th style="padding: 8px;">Producto</th>
                        <th style="padding: 8px;">Cant.</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>

            <p>Gracias por comprar con nosotros.</p>
        </div>
    `;

    return sendEmail({
        to: user.email,
        subject: `Tu pedido ha sido enviado - #${order.orderNumber}`,
        html
    });
};

export const sendAdminOrderNotificationEmail = async (order: any, user: any, adminEmail: string) => {
    const itemsHtml = order.items.map((item: any) => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">$${item.price.toFixed(2)}</td>
        </tr>
    `).join('');

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h1 style="color: #2c4a52;">¡Nuevo Pedido Recibido!</h1>
            <p>Se ha registrado un nuevo pedido en la tienda.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                    <td style="padding: 5px 0;"><strong>Pedido:</strong></td>
                    <td style="padding: 5px 0;">#${order.orderNumber}</td>
                </tr>
                <tr>
                    <td style="padding: 5px 0;"><strong>Cliente:</strong></td>
                    <td style="padding: 5px 0;">${user.firstName} ${user.lastName || ''} (${user.email})</td>
                </tr>
                <tr>
                    <td style="padding: 5px 0;"><strong>Total:</strong></td>
                    <td style="padding: 5px 0;">$${order.total.toFixed(2)}</td>
                </tr>
            </table>
            
            <h3 style="color: #2c4a52; margin-top: 20px;">Artículos</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #f9f9f9; text-align: left;">
                        <th style="padding: 8px;">Producto</th>
                        <th style="padding: 8px;">Cant.</th>
                        <th style="padding: 8px;">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            
            <div style="margin-top: 30px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/pedidos/${order.id}" style="background-color: #2c4a52; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver Pedido en Admin</a>
            </div>
        </div>
    `;

    return sendEmail({
        to: adminEmail,
        subject: `[NUEVO PEDIDO] Pedido #${order.orderNumber} - $${order.total.toFixed(2)}`,
        html
    });
};

export const sendAdminInvoiceNotificationEmail = async (request: any, order: any, adminEmail: string) => {
    const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2c4a52;">Nueva Solicitud de Factura</h2>
            <p>El cliente del pedido <strong>#${order.orderNumber}</strong> ha solicitado una factura.</p>
            
            <h3 style="color: #2c4a52; margin-top: 20px;">Datos Fiscales</h3>
            <p><strong>RFC:</strong> ${request.rfc}</p>
            <p><strong>Razón Social:</strong> ${request.razonSocial}</p>
            ${request.regimenFiscal ? `<p><strong>Régimen Fiscal:</strong> ${request.regimenFiscal}</p>` : ''}
            ${request.usoCfdi ? `<p><strong>Uso de CFDI:</strong> ${request.usoCfdi}</p>` : ''}
            ${request.codigoPostal ? `<p><strong>Código Postal:</strong> ${request.codigoPostal}</p>` : ''}

            <p style="margin-top: 20px;">Por favor procede a generarla y cargarla en el sistema.</p>
            
            <div style="margin-top: 30px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/pedidos/${order.id}" style="background-color: #2c4a52; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver Pedido en Admin</a>
            </div>
        </div>
    `;

    return sendEmail({
        to: adminEmail,
        subject: `[FACTURA SOLICITADA] Pedido #${order.orderNumber}`,
        html
    });
};
