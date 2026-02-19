// Service SMS désactivé pour éviter les erreurs
class SMSService {
  constructor() {
    console.log('📵 Service SMS désactivé');
    this.isEnabled = false;
  }

  // Envoyer un SMS de vérification
  async sendVerificationCode(phoneNumber, code) {
    console.log('📵 SMS désactivé - Code de vérification:', code);
    return { success: false, message: 'SMS non configuré' };
  }

  // Envoyer une alerte de sécurité
  async sendSecurityAlert(phoneNumber, message) {
    try {
      const fullMessage = `🚨 Mysterious Classroom - ${message}`;
      
      // await this.client.messages.create({
      //   body: fullMessage,
      //   from: this.fromNumber,
      //   to: phoneNumber
      // });

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
