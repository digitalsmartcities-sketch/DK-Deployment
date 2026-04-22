import { Resend } from 'resend';

let resend;
const apiKey = process.env.RESEND_API_KEY;

if (apiKey) {
    try {
        resend = new Resend(apiKey);
    } catch (err) {
        console.error('❌ Failed to initialize Resend:', err.message);
    }
} else {
    console.warn('⚠️ WARNING: RESEND_API_KEY is missing. Email services will be unavailable.');
}

export const sendEmail = async ({ to, subject, html }) => {
    if (!resend) {
        console.error('❌ Email not sent: Resend is not initialized (missing API key).');
        return false;
    }

    try {
        console.log(`Attempting to send email to ${to} via Resend...`);
        
        const { data, error } = await resend.emails.send({
            from: process.env.SMTP_FROM || 'Digital Kohat <onboarding@resend.dev>',
            to,
            subject,
            html
        });

        if (error) {
            console.error('❌ Resend Error:', error);
            return false;
        }

        console.log(`Email sent successfully: ${data.id}`);
        return true;
    } catch (error) {
        console.error('❌ Resend Exception:', error.message);
        return false;
    }
};
