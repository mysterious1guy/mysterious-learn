const { Resend } = require('resend');

console.log('📧 Initialisation du service email (Resend API)...');
const resend = new Resend(process.env.RESEND_API_KEY);

console.log('📧 RESEND_API_KEY configuré:', process.env.RESEND_API_KEY ? 'OUI' : 'NON');

/**
 * Envoie un email formaté via Resend API
 */
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Mysterious Classroom <no-reply@mysterious-classroom.com>',
      to: [to],
      subject: subject,
      text: text || '',
      html: html || `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #3b82f6;">Mysterious Classroom</h2>
          <p>${(text || '').replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Erreur Resend API:', error);
      throw error;
    }

    console.log('✅ Email envoyé via Resend:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Erreur d\'envoi d\'email:', error.message);
    throw error;
  }
};

module.exports = { sendEmail };
