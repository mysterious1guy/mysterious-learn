/**
 * Templates d'emails pour Mysterious Classroom
 * Design: Premium Dark Mode / Cyberpunk Slate
 */

const baseStyles = `
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  background-color: #020617;
  color: #f8fafc;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid #1e293b;
`;

const headerStyles = `
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
  border-bottom: 1px solid #1e293b;
`;

const bodyStyles = `
  padding: 40px;
  line-height: 1.6;
`;

const footerStyles = `
  padding: 30px;
  text-align: center;
  font-size: 12px;
  color: #64748b;
  background-color: #010409;
  border-top: 1px solid #1e293b;
`;

const buttonStyles = `
  display: inline-block;
  padding: 16px 32px;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
`;

/**
 * Template pour le code de vérification
 */
const getVerificationEmail = (name, code) => `
<div style="${baseStyles}">
  <div style="${headerStyles}">
    <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px; color: #ffffff;">MYSTERIOUS CLASSROOM</h1>
    <p style="margin: 10px 0 0; color: #64748b; font-size: 11px; font-weight: bold; text-transform: uppercase;">CODE DE VALIDATION</p>
  </div>
  
  <div style="${bodyStyles}">
    <h2 style="color: #ffffff; margin-top: 0; font-size: 20px;">Bonjour ${name} ! 👋</h2>
    <p style="color: #cbd5e1; font-size: 16px;">Heureux de te voir parmi nous. Pour finaliser ton inscription sur la plateforme, saisis le code suivant :</p>
    
    <div style="text-align: center; margin: 40px 0;">
      <div style="display: inline-block; background: #0f172a; border: 2px solid #3b82f6; padding: 25px 45px; border-radius: 20px; font-size: 48px; font-family: 'Courier New', monospace; font-weight: 900; letter-spacing: 8px; color: #60a5fa; box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);">
        ${code}
      </div>
    </div>
    
    <p style="color: #64748b; font-size: 13px; text-align: center;">Ce code expirera dans 30 minutes pour ta sécurité.</p>
  </div>
  
  <div style="${footerStyles}">
    <p>Merci de rejoindre notre communauté d'apprentissage.</p>
    <p style="margin-top: 15px; font-weight: bold;">&copy; 2026 Mysterious Classroom</p>
  </div>
</div>
`;

/**
 * Template de Bienvenue (Félicitations)
 */
const getWelcomeEmail = (name) => `
<div style="${baseStyles}">
  <div style="${headerStyles}">
    <div style="margin-bottom: 25px;">
      <div style="width: 70px; height: 70px; margin: 0 auto; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 20px; display: flex; align-items: center; justify-content: center; transform: rotate(5deg);">
           <span style="font-size: 35px;">🚀</span>
      </div>
    </div>
    <h1 style="margin: 0; font-size: 22px; letter-spacing: 1px; color: #ffffff;">INSCRIPTION VALIDÉE</h1>
    <p style="margin: 8px 0 0; color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">ACCÈS ACTIVÉ</p>
  </div>
  
  <div style="${bodyStyles}">
    <h2 style="color: #ffffff; text-align: center; font-size: 24px;">Bonjour ${name} ! 👋</h2>
    <p style="color: #cbd5e1; font-size: 16px; text-align: center; margin-bottom: 30px;">Prêt à explorer Mysterious Classroom ? Ton compte est désormais actif.</p>
    
    <div style="background: rgba(30, 41, 59, 0.5); border-radius: 20px; padding: 30px; margin: 30px 0; border: 1px solid #1e293b;">
       <h4 style="color: #60a5fa; margin-top: 0; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">TES AVANTAGES :</h4>
       <ul style="color: #94a3b8; padding-left: 20px; margin-bottom: 0; font-size: 15px;">
         <li style="margin-bottom: 12px;">Accès illimité au catalogue de cours.</li>
         <li style="margin-bottom: 12px;">Assistant intelligent disponible 24/7.</li>
         <li>Suivi de progression en temps réel.</li>
       </ul>
    </div>
    
    <div style="text-align: center; margin-top: 40px;">
      <a href="https://mysterious-classroom.com" style="${buttonStyles}">Accéder à mon espace</a>
    </div>
  </div>
  
  <div style="${footerStyles}">
    <p>L'apprentissage commence ici.</p>
    <p style="margin-top: 15px; font-weight: bold;">Mysterious Classroom Team</p>
  </div>
</div>
`;

/**
 * Template Changement d'Email
 */
const getEmailChangeEmail = (name, code) => `
<div style="${baseStyles}">
  <div style="${headerStyles}">
    <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Mise à Jour de Sécurité</h1>
  </div>
  <div style="${bodyStyles}">
    <h2 style="color: #ffffff;">Confirmation Obligatoire 👋</h2>
    <p style="color: #cbd5e1;">Bonjour ${name}, pour valider ton nouvel email Mysterious Classroom, entre ce code :</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; background: #1e293b; padding: 20px 40px; border-radius: 12px; font-size: 32px; font-weight: bold; color: #60a5fa; letter-spacing: 5px;">
        ${code}
      </div>
    </div>
  </div>
  <div style="${footerStyles}">
    <p>Si tu n'as pas demandé ce changement, contacte immédiatement le support.</p>
  </div>
</div>
`;

/**
 * Template de Réinitialisation de Mot de Passe
 */
const getPasswordResetEmail = (name, url) => `
<div style="${baseStyles}">
  <div style="${headerStyles}">
    <h1 style="margin: 0; font-size: 24px; color: #ffffff;">RESTAURATION D'ACCÈS</h1>
  </div>
  <div style="${bodyStyles}">
    <h2 style="color: #ffffff;">Besoin d'un nouveau mot de passe ?</h2>
    <p style="color: #cbd5e1;">Bonjour ${name}, nous avons reçu une demande de réinitialisation pour ton compte Mysterious Classroom.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${url}" style="${buttonStyles}">Réinitialiser mon mot de passe</a>
    </div>
    
    <p style="color: #64748b; font-size: 13px; text-align: center;">Ce lien expirera automatiquement dans 1 heure par mesure de sécurité.</p>
  </div>
  <div style="${footerStyles}">
    <p>Si tu n'as pas demandé cette action, ton compte est peut-être en sécurité mais nous te conseillons de rester vigilant.</p>
  </div>
</div>
`;

/**
 * Template Annonce / Marketing (Admin)
 */
const getMarketingEmail = (title, content) => `
<div style="${baseStyles}">
  <div style="${headerStyles}">
    <h1 style="margin: 0; font-size: 24px; color: #ffffff;">${title}</h1>
  </div>
  <div style="${bodyStyles} background-color: #0f172a;">
    <div style="color: #cbd5e1; font-size: 16px;">
      ${content}
    </div>
  </div>
  <div style="${footerStyles}">
    <p>Message de l'équipe Mysterious Classroom.</p>
    <p style="margin-top: 15px; font-weight: bold;">&copy; 2026 Mysterious Classroom</p>
  </div>
</div>
`;

/**
 * Template Suppression de Compte
 */
const getAccountDeletionEmail = (name) => `
<div style="${baseStyles}">
  <div style="${headerStyles}">
    <div style="margin-bottom: 25px;">
      <div style="width: 70px; height: 70px; margin: 0 auto; background: linear-gradient(135deg, #ef4444, #be123c); border-radius: 20px; display: flex; align-items: center; justify-content: center; transform: rotate(5deg);">
           <span style="font-size: 35px;">👋</span>
      </div>
    </div>
    <h1 style="margin: 0; font-size: 24px; color: #ffffff;">COMPTE SUPPRIMÉ</h1>
  </div>
  <div style="${bodyStyles}">
    <h2 style="color: #ffffff;">Au revoir, ${name}</h2>
    <p style="color: #cbd5e1; font-size: 16px;">Nous te confirmons que ton compte Mysterious Classroom a été définitivement supprimé, ainsi que toutes tes données associées.</p>
    
    <div style="background: rgba(30, 41, 59, 0.5); border-radius: 20px; padding: 25px; margin: 30px 0; border: 1px solid #1e293b; text-align: center;">
       <p style="color: #94a3b8; font-size: 14px; margin: 0;">Si tu souhaites revenir un jour, tu seras toujours le bienvenu pour créer un nouveau compte et reprendre ton apprentissage.</p>
    </div>
    
    <div style="text-align: center; margin-top: 40px;">
      <a href="https://mysterious-classroom.com" style="${buttonStyles} background: linear-gradient(135deg, #475569 0%, #1e293b 100%);">Retourner à l'accueil</a>
    </div>
  </div>
  <div style="${footerStyles}">
    <p>Merci d'avoir fait partie de l'aventure.</p>
    <p style="margin-top: 15px; font-weight: bold;">Mysterious Classroom Team</p>
  </div>
</div>
`;

/**
 * Template Notification Administrateur (Nouvel Inscrit)
 */
const getAdminNotificationEmail = (newUserName, newUserEmail) => `
<div style="${baseStyles}">
  <div style="${headerStyles}">
    <div style="margin-bottom: 25px;">
      <div style="width: 70px; height: 70px; margin: 0 auto; background: linear-gradient(135deg, #10b981, #059669); border-radius: 20px; display: flex; align-items: center; justify-content: center; transform: rotate(5deg);">
           <span style="font-size: 35px;">👤</span>
      </div>
    </div>
    <h1 style="margin: 0; font-size: 24px; color: #ffffff;">NOUVEL INSCRIT</h1>
  </div>
  <div style="${bodyStyles}">
    <h2 style="color: #ffffff;">Un nouvel étudiant a rejoint Mysterious Classroom</h2>
    <p style="color: #cbd5e1; font-size: 16px;">Voici les informations du nouveau membre :</p>
    
    <div style="background: rgba(30, 41, 59, 0.5); border-radius: 20px; padding: 25px; margin: 30px 0; border: 1px solid #1e293b;">
       <p style="color: #cbd5e1; font-size: 15px; margin-bottom: 10px;"><strong>Nom :</strong> ${newUserName}</p>
       <p style="color: #cbd5e1; font-size: 15px; margin-bottom: 0;"><strong>Email :</strong> ${newUserEmail}</p>
    </div>
  </div>
  <div style="${footerStyles}">
    <p>Système de Notification Automatique - Mysterious Classroom</p>
  </div>
</div>
`;

module.exports = {
  getVerificationEmail,
  getWelcomeEmail,
  getEmailChangeEmail,
  getPasswordResetEmail,
  getMarketingEmail,
  getAccountDeletionEmail,
  getAdminNotificationEmail
};
