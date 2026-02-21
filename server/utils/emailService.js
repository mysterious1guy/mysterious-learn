const nodemailer = require('nodemailer');

console.log('📧 Initialisation du service email...');
const emailUser = (process.env.EMAIL_USER || '').trim();
const emailPass = (process.env.EMAIL_PASS || '').trim();

console.log('📧 EMAIL_USER:', emailUser ? 'OK' : 'MANQUANT');
console.log('📧 Longueur EMAIL_PASS:', emailPass.length, 'caractères');

if (emailPass.length !== 16) {
  console.warn('⚠️ ATTENTION : Un mot de passe d\'application Google doit faire exactement 16 caractères.');
}

// Configuration standard mais robuste pour Render
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  // Augmentation des timeouts pour le réseau instable de Render
  connectionTimeout: 60000, // 60 secondes
  greetingTimeout: 60000,
  socketTimeout: 60000,
  debug: true,
  logger: true
});

/**
 * Envoie un email formaté
 */
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Mysterious Classroom" <${emailUser}>`,
      to,
      subject,
      text: text || '',
      html: html || `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #3b82f6;">Mysterious Classroom</h2>
          <p>${(text || '').replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    console.log('✅ Email envoyé:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Erreur d\'envoi d\'email:', error.message);
    throw error;
  }
};

module.exports = { sendEmail };
