const { getWelcomeEmail } = require('./emailTemplates');

/**
 * Envoie un email via le relais Google Apps Script (100% Gratuit)
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const relayUrl = process.env.GAS_RELAY_URL;

  if (!relayUrl) {
    console.error('❌ GAS_RELAY_URL non configurée dans les variables d\'environnement.');
    throw new Error('Configuration email manquante');
  }

  try {
    const response = await fetch(relayUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: to,
        subject: subject,
        text: text || '',
        html: html,
        key: 'mysterious_secret_key_2026' // La clé de sécurité définie dans le script
      })
    });

    const result = await response.json();

    if (!result.success) {
      console.error('❌ Erreur Relais Google:', result.error);
      throw new Error(result.error);
    }

    console.log(`✅ Email [${subject}] envoyé avec succès à ${to}`);
    return result;
  } catch (error) {
    console.error('❌ Erreur d\'envoi d\'email via relais:', error.message);
    throw error;
  }
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
