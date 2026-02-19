const twilio = require('twilio');

class SMSService {
  constructor() {
    // Configuration Twilio
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
  }

  // Envoyer un SMS de vérification
  async sendVerificationCode(phoneNumber, code) {
    try {
      const message = await this.client.messages.create({
        body: `🔐 Mysterious Classroom - Votre code de vérification est: ${code}. Valide 10 minutes.`,
        from: this.fromNumber,
        to: phoneNumber
      });

      console.log(`SMS envoyé à ${phoneNumber}: SID ${message.sid}`);
      return { success: true, sid: message.sid };
    } catch (error) {
      console.error('Erreur SMS:', error);
      
      // Fallback: simuler l'envoi en développement
      if (process.env.NODE_ENV !== 'production') {
        console.log(`📱 [DEV] Code pour ${phoneNumber}: ${code}`);
        return { success: true, simulated: true };
      }
      
      return { success: false, error: error.message };
    }
  }

  // Envoyer une alerte de sécurité
  async sendSecurityAlert(phoneNumber, message) {
    try {
      const fullMessage = `🚨 Mysterious Classroom - ${message}`;
      
      await this.client.messages.create({
        body: fullMessage,
        from: this.fromNumber,
        to: phoneNumber
      });

      return { success: true };
    } catch (error) {
      console.error('Erreur alerte SMS:', error);
      return { success: false, error: error.message };
    }
  }

  // Vérifier si un numéro est valide
  validatePhoneNumber(phoneNumber) {
    // Format international: +221771234567
    const phoneRegex = /^\+\d{10,15}$/;
    return phoneRegex.test(phoneNumber);
  }

  // Formater le numéro de téléphone
  formatPhoneNumber(phoneNumber) {
    // Supprimer tous les caractères non numériques sauf le +
    let formatted = phoneNumber.replace(/[^\d+]/g, '');
    
    // Ajouter + si pas présent
    if (!formatted.startsWith('+')) {
      // Supposer le Sénégal si format local
      if (formatted.startsWith('77') || formatted.startsWith('76') || 
          formatted.startsWith('75') || formatted.startsWith('78') || 
          formatted.startsWith('70')) {
        formatted = '+221' + formatted;
      } else {
        formatted = '+' + formatted;
      }
    }
    
    return formatted;
  }
}

module.exports = new SMSService();
