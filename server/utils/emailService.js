const nodemailer = require('nodemailer');
const dns = require('dns');
const { promisify } = require('util');
const resolve4 = promisify(dns.resolve4);

console.log('📧 Initialisation du service email (V6)...');
console.log('📧 EMAIL_USER:', process.env.EMAIL_USER ? 'OK' : 'MANQUANT');

/**
 * Envoie un email formaté avec résolution IPv4 forcée et diagnostic
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const password = (process.env.EMAIL_PASS || '').trim();

  // Diagnostic password
  if (password.length === 17) {
    console.warn('⚠️ [SMTP Debug] Ton mot de passe fait 17 caractères. Google utilise normalement 16 caractères (4x4). Vérifie s\'il n\'y a pas une lettre en trop à la fin !');
  }

  try {
    // 1. Résolution IPv4 manuelle pour éviter le "dual-stack" bug de Render
    let smtpIp = 'smtp.gmail.com';
    try {
      const addresses = await resolve4('smtp.gmail.com');
      smtpIp = addresses[0] || 'smtp.gmail.com';
      console.log(`📡 [SMTP DNS] Liaison directe vers IPv4: ${smtpIp}`);
    } catch (dnsErr) {
      console.warn('⚠️ [SMTP DNS] Échec résolution IPv4, repli sur hostname');
    }

    // 2. Configuration "The Hammer" (Port 465 SSL Direct)
    const transporter = nodemailer.createTransport({
      host: smtpIp,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: password,
      },
      tls: {
        servername: 'smtp.gmail.com', // Indispensable pour que le certificat SSL de l'IP soit valide
        rejectUnauthorized: false     // Permet de passer si le proxy Render interfère
      },
      logger: true,
      debug: true,
      connectionTimeout: 30000, // On laisse 30s de marge
      socketTimeout: 30000,
    });

    const info = await transporter.sendMail({
      from: `"Mysterious Classroom" <${process.env.EMAIL_USER}>`,
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

    console.log('✅ [SMTP Succès] Message envoyé:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ [SMTP Échec] Détails du crash:', error.message);
    if (error.code === 'ETIMEDOUT') {
      console.error('👉 Render semble bloquer la route sortante. Vérifie tes "Outbound Rules" si elles existent.');
    }
    throw error;
  }
};

module.exports = { sendEmail };
