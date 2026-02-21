const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envoie un email formaté
 */
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Mysterious Classroom" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: text || '',
      html: html || `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: -0.5px;">Mysterious Classroom</h1>
          </div>
          <div style="padding: 40px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <div style="font-size: 16px;">
            ${(text || '').replace(/\n/g, '<br>')}
            </div>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f3f4f6; text-align: center; color: #9ca3af; font-size: 12px;">
              <p>© ${new Date().getFullYear()} Mysterious Classroom. Créé par Mouhamed Fall.</p>
              <p>Cet email est automatique, merci de ne pas y répondre directement.</p>
            </div>
          </div>
        </div>
      `,
    });
    console.log('Email envoyé:', info.messageId);
    return info;
  } catch (error) {
    console.error('Erreur d\'envoi d\'email:', error);
    throw error;
  }
};

module.exports = { sendEmail };
