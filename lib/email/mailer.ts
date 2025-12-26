import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export interface EmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    from?: string;
}

/**
 * Send email
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
    try {
        const from = options.from || `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`;

        await transporter.sendMail({
            from,
            to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        });
    } catch (error: any) {
        console.error('Email send error:', error);
        throw new Error(error.message || 'Failed to send email');
    }
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(
    email: string,
    orderNumber: string,
    orderDetails: {
        items: Array<{ name: string; quantity: number; price: number }>;
        subtotal: number;
        shipping: number;
        tax: number;
        total: number;
    }
): Promise<void> {
    const itemsHtml = orderDetails.items
        .map(
            (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `
        )
        .join('');

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Pedido</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #463931; background-color: #f5f4ed; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 15px rgba(0,0,0,0.1);">
        <div style="background-color: #426c78; color: #ffffff; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">¡Gracias por tu pedido!</h1>
        </div>
        
        <div style="padding: 30px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Tu pedido <strong>#${orderNumber}</strong> ha sido confirmado.
          </p>
          
          <h2 style="color: #426c78; font-size: 20px; margin-top: 30px; margin-bottom: 15px;">Resumen del Pedido</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f5f4ed;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #426c78;">Producto</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #426c78;">Cantidad</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #426c78;">Precio</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div style="text-align: right; margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee;">
            <p style="margin: 5px 0;"><strong>Subtotal:</strong> $${orderDetails.subtotal.toFixed(2)}</p>
            <p style="margin: 5px 0;"><strong>Envío:</strong> $${orderDetails.shipping.toFixed(2)}</p>
            <p style="margin: 5px 0;"><strong>IVA:</strong> $${orderDetails.tax.toFixed(2)}</p>
            <p style="margin: 10px 0 0 0; font-size: 20px; color: #426c78;"><strong>Total:</strong> $${orderDetails.total.toFixed(2)}</p>
          </div>
          
          <div style="margin-top: 40px; padding: 20px; background-color: #f5f4ed; border-radius: 8px;">
            <h3 style="color: #426c78; margin-top: 0;">¿Qué sigue?</h3>
            <p style="margin: 10px 0;">Procesaremos tu pedido en las próximas 24-48 horas. Recibirás un correo de confirmación cuando tu pedido sea enviado.</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/cuenta/pedidos" style="display: inline-block; background-color: #426c78; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: 600;">Ver mi pedido</a>
          </div>
        </div>
        
        <div style="background-color: #f5f4ed; padding: 20px; text-align: center; font-size: 14px; color: #6b6358;">
          <p style="margin: 5px 0;">YUTNÜÜ - Cosmética Natural con Respaldo Científico</p>
          <p style="margin: 5px 0;">¿Tienes preguntas? Contáctanos en ${process.env.SMTP_FROM_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `;

    await sendEmail({
        to: email,
        subject: `Confirmación de Pedido #${orderNumber} - YUTNÜÜ`,
        html,
    });
}

/**
 * Send newsletter welcome email
 */
export async function sendNewsletterWelcomeEmail(email: string, firstName?: string): Promise<void> {
    const greeting = firstName ? `Hola ${firstName}` : 'Hola';

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a YUTNÜÜ</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #463931; background-color: #f5f4ed; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 15px rgba(0,0,0,0.1);">
        <div style="background-color: #426c78; color: #ffffff; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">¡Bienvenido a YUTNÜÜ!</h1>
        </div>
        
        <div style="padding: 30px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            ${greeting},
          </p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Gracias por suscribirte a nuestro newsletter. Ahora recibirás:
          </p>
          
          <ul style="font-size: 16px; margin-bottom: 30px; padding-left: 20px;">
            <li style="margin-bottom: 10px;">Rutinas personalizadas para tu tipo de piel</li>
            <li style="margin-bottom: 10px;">Información científica sobre ingredientes</li>
            <li style="margin-bottom: 10px;">Lanzamientos exclusivos</li>
            <li style="margin-bottom: 10px;">Ofertas especiales para suscriptores</li>
          </ul>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/quiz" style="display: inline-block; background-color: #426c78; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: 600;">Descubre tu rutina ideal</a>
          </div>
        </div>
        
        <div style="background-color: #f5f4ed; padding: 20px; text-align: center; font-size: 14px; color: #6b6358;">
          <p style="margin: 5px 0;">YUTNÜÜ - Cosmética Natural con Respaldo Científico</p>
        </div>
      </div>
    </body>
    </html>
  `;

    await sendEmail({
        to: email,
        subject: '¡Bienvenido a YUTNÜÜ!',
        html,
    });
}

export default transporter;
