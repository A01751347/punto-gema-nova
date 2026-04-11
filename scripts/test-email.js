const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });
// Fallback to .env
require('dotenv').config({ path: '.env' });

async function testEmail() {
    console.log('--- Test Email Script ---');
    console.log('Loading environment variables...');
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const smtpFrom = process.env.SMTP_FROM ||
        (process.env.SMTP_FROM_EMAIL ? `"${process.env.SMTP_FROM_NAME || 'Punto Gema Nova'}" <${process.env.SMTP_FROM_EMAIL}>` : null);

    console.log('SMTP Config:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: Number(process.env.SMTP_PORT) === 465,
        user: process.env.SMTP_USER,
        pass: smtpPass ? '********' : 'NOT_SET'
    });

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !smtpPass) {
        console.error('ERROR: Missing SMTP credentials (HOST, USER, or PASS/PASSWORD)');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: smtpPass,
        },
        debug: true, // show debug output
        logger: true // log information in console
    });

    try {
        console.log('Verifying connection...');
        await transporter.verify();
        console.log('✅ Connection verified successfully!');

        const testTo = process.env.SMTP_USER; // Send to self
        console.log(`Sending test email to ${testTo}...`);

        const info = await transporter.sendMail({
            from: smtpFrom || process.env.SMTP_USER,
            to: testTo,
            subject: 'Test Email from Punto Gema Nova Script',
            html: '<h1>It works!</h1><p>Your SMTP configuration is correct.</p>'
        });

        console.log('✅ Message sent: %s', info.messageId);
        console.log('Preview URL (if available): %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.error('❌ Error testing email:');
        console.error(error);
    }
}

testEmail();
