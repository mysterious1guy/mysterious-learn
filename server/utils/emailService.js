const nodemailer = require('nodemailer');
const dns = require('dns');
const { promisify } = require('util');
const resolve4 = promisify(dns.resolve4);

console.log('📧 Initialisation du service email (V6)...');
console.log('📧 EMAIL_USER:', process.env.EMAIL_USER ? 'OK' : 'MANQUANT');

/**
 * Envoie un email formaté avec résolution IPv4 forcée
 */
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    // 1. Résoudre l'adresse IPv4 de Gmail manuellement pour éviter IPv6 sur Render
    let smtpIp = 'smtp.gmail.com';
    try {
      const addresses = await resolve4('smtp.gmail.com');
      if (addresses && addresses.length > 0) {
        smtpIp = addresses[0];
        console.log(`📡 [DNS Force] smtp.gmail.com -> ${smtpIp}`);
      }
    } catch (dnsErr) {
      console.warn('⚠️ Échec résolution IPv4, tentative avec hostname standard:', dnsErr.message);
    }

    // 2. Créer le transporteur à la volée avec l'IP résolue
    const transporter = nodemailer.createTransport({
      host: smtpIp,
      port: 587,
      secure: false, // Port 587 utilise STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        servername: 'smtp.gmail.com',
        rejectUnauthorized: false // Aide parfois à passer les proxies cloud
      },
      logger: true,
      debug: true,
      connectionTimeout: 20000,
      socketTimeout: 30000,
    });

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

    console.log('✅ Email envoyé avec succès:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Erreur d\'envoi d\'email (Log complet):', error);
    throw error;
  }
};

module.exports = { sendEmail };
