const nodemailer = require('nodemailer');
const { getWelcomeEmail } = require('./emailTemplates');

// Transporter SMTP de secours (utilisant Nodemailer si EMAIL_USER/EMAIL_PASS configurés)
const createSmtpTransporter = () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return null;
};

/**
 * Envoie un email (via Google Apps Script Relay ou Nodemailer SMTP)
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const relayUrl = process.env.GAS_RELAY_URL;
  const fullSubject = subject.startsWith('[Mysterious') ? subject : `[Mysterious Classroom] ${subject}`;

  // 1. Essayer le relais Google Apps Script si configuré
  if (relayUrl) {
    try {
      const response = await fetch(relayUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: to,
          subject: fullSubject,
          text: text || '',
          html: html,
          name: "Mysterious Classroom",
          from: "Mysterious Classroom <mysteriousclassroom@gmail.com>",
          key: 'mysterious_secret_key_2026'
        })
      });

      const result = await response.json();
      if (result.success) {
        console.log(`✅ Email [${subject}] envoyé via GAS à ${to}`);
        return result;
      }
      console.warn('⚠️ Le relais GAS a répondu sans succès, tentative SMTP...', result.error);
    } catch (gasErr) {
      console.warn('⚠️ Échec de connexion au relais GAS, tentative SMTP...', gasErr.message);
    }
  }

  // 2. Tenter l'envoi via SMTP Nodemailer si disponible
  const transporter = createSmtpTransporter();
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || `"Mysterious Classroom" <${process.env.EMAIL_USER}>`,
        to,
        subject: fullSubject,
        text: text || '',
        html,
      });
      console.log(`✅ Email [${subject}] envoyé via SMTP à ${to}`);
      return info;
    } catch (smtpErr) {
      console.error('❌ Échec d\'envoi d\'email via SMTP:', smtpErr.message);
      throw new Error(`Erreur d'envoi d'email SMTP: ${smtpErr.message}`);
    }
  }

  // 3. Si aucun des deux n'est configuré
  console.error('❌ Aucun service d\'email configuré (GAS_RELAY_URL ou EMAIL_USER/EMAIL_PASS manquants).');
  throw new Error('Service d\'envoi d\'email non configuré sur le serveur (variable GAS_RELAY_URL ou EMAIL_USER manquante sur Render).');
};

/**
 * Envoi spécifique du mail de Bienvenue
 */
const sendWelcomeEmail = async (email, name) => {
  const html = getWelcomeEmail(name);
  return sendEmail({
    to: email,
    subject: 'Bienvenue dans Mysterious Classroom ! 🚀',
    html
  });
};

module.exports = { sendEmail, sendWelcomeEmail };
