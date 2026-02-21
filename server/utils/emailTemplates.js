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
    <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px; background: linear-gradient(to right, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">MYSTERIOUS CLASSROOM</h1>
    <p style="margin: 10px 0 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Système d'Activation Core</p>
  </div>
  
  <div style="${bodyStyles}">
    <h2 style="color: #ffffff; margin-top: 0;">Bonjour ${name} ! 👋</h2>
    <p style="color: #cbd5e1; font-size: 16px;">Bienvenue à bord. Pour finaliser ton inscription et libérer le potentiel de l'Oracle, veuillez utiliser le code d'activation suivant :</p>
    
    <div style="text-align: center; margin: 40px 0;">
      <div style="display: inline-block; background: #0f172a; border: 2px solid #3b82f6; padding: 20px 40px; border-radius: 20px; font-size: 42px; font-family: monospace; font-weight: 900; letter-spacing: 10px; color: #60a5fa; text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);">
        ${code}
      </div>
    </div>
    
    <p style="color: #64748b; font-size: 14px; text-align: center;">Ce code possède une validité temporelle de 30 minutes.</p>
  </div>
  
  <div style="${footerStyles}">
    <p>Si tu n'es pas à l'origine de cette demande, ton système a peut-être été infiltré. Ignore cet email.</p>
    <p style="margin-top: 20px;">&copy; 2026 Mysterious Classroom — Advanced AI Learning</p>
  </div>
</div>
`;

/**
 * Template de Bienvenue (Félicitations)
 */
const getWelcomeEmail = (name) => `
<div style="${baseStyles}">
  <div style="${headerStyles}">
    <div style="margin-bottom: 20px;">
      <div style="width: 80px; height: 80px; margin: 0 auto; background: #3b82f6; border-radius: 50%; padding: 2px; background: linear-gradient(135deg, #3b82f6, #8b5cf6);">
           <img src="https://em-content.zobj.net/source/apple/354/brain_1f9e0.png" width="80" height="80" alt="Oracle Logo" style="border-radius: 50%;">
      </div>
    </div>
    <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px; color: #ffffff;">BIENVENUE, ${name.toUpperCase()}</h1>
    <p style="margin: 10px 0 0; color: #10b981; font-size: 12px; font-weight: bold; text-transform: uppercase;">ACCÈS AUTORISÉ — COMPTE ACTIF</p>
  </div>
  
  <div style="${bodyStyles}">
    <h2 style="color: #ffffff; text-align: center;">Félicitations ! 🎉</h2>
    <p style="color: #cbd5e1; font-size: 16px; text-align: center;">Ton compte Mysterious Classroom est désormais pleinement opérationnel. Tu as franchi la première étape vers la maîtrise de la logique pure.</p>
    
    <div style="background: #0f172a; border-radius: 16px; padding: 25px; margin: 30px 0; border: 1px solid #1e293b;">
       <h4 style="color: #60a5fa; margin-top: 0; text-transform: uppercase; font-size: 12px;">Ce qui t'attend :</h4>
       <ul style="color: #94a3b8; padding-left: 20px; margin-bottom: 0;">
         <li style="margin-bottom: 10px;">L'Oracle v2.0 disponible 24/7 pour répondre à tes questions.</li>
         <li style="margin-bottom: 10px;">Des cours d'algorithmique interactifs et immersifs.</li>
         <li>Une progression sauvegardée en temps réel.</li>
       </ul>
    </div>
    
    <div style="text-align: center;">
      <a href="https://mysterious-classroom-free-courses.onrender.com" style="${buttonStyles}">Accéder au Dashboard</a>
    </div>
  </div>
  
  <div style="${footerStyles}">
    <p>Préparez-vous à repousser les limites de votre esprit.</p>
    <p style="margin-top: 20px;">Mysterious Classroom — Powered by L'Oracle</p>
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
    <p style="color: #cbd5e1;">Bonjour ${name}, pour valider ton nouvel email, entre ce code :</p>
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

module.exports = {
    getVerificationEmail,
    getWelcomeEmail,
    getEmailChangeEmail,
    getPasswordResetEmail
};
