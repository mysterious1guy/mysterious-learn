const nodemailer = require('nodemailer');
const dns = require('dns');

console.log('📧 Initialisation du service email...');
const emailUser = (process.env.EMAIL_USER || '').trim();
const emailPass = (process.env.EMAIL_PASS || '').trim();

console.log('📧 EMAIL_USER:', emailUser ? 'OK' : 'MANQUANT');
console.log('📧 Longueur EMAIL_PASS:', emailPass.length, 'caractères');

// Configuration forcée IPv4 + Port 465 (le plus stable sur Render Free)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  // On force l'IPv4 au niveau du transporteur
  family: 4,
  // On fournit un lookup qui ne renvoie que de l'IPv4
  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { family: 4 }, (err, address) => {
      if (err) return callback(err);
      console.log(`📡 SMTP Lookup: ${hostname} -> ${address}`);
      callback(null, address, 4);
    });
  },
  connectionTimeout: 40000, // 40s
  greetingTimeout: 40000,
  socketTimeout: 40000,
  debug: true,
  logger: true
});

// Vérification immédiate au démarrage
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ ÉCHEC CONNEXION SMTP AU DÉMARRAGE:', error.message);
  } else {
    console.log('✅ CONNEXION SMTP ÉTABLIE AVEC SUCCÈS');
  }
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
