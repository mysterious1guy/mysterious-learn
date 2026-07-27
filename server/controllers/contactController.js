const { sendEmail } = require('../utils/emailService');

// @desc    Traiter le formulaire de contact public
// @route   POST /api/contact
// @access  Public
const handleContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Nom, email et message sont obligatoires.' });
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Adresse email invalide.' });
    }

    // Limite taille message
    if (message.length > 3000) {
        return res.status(400).json({ message: 'Le message est trop long (3000 caractères max).' });
    }

    const subjectLine = subject ? `[Contact] ${subject}` : `[Contact] Message de ${name}`;

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e2e8f0; padding: 32px; border-radius: 16px; border: 1px solid #1e293b;">
            <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 20px 24px; border-radius: 12px; margin-bottom: 24px;">
                <h1 style="margin: 0; color: white; font-size: 20px;">📬 Nouveau message de contact</h1>
                <p style="margin: 6px 0 0; color: rgba(255,255,255,0.7); font-size: 14px;">Via le formulaire de Mysterious Classroom</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px; width: 120px; vertical-align: top;">👤 Nom</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9; font-weight: bold;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px; vertical-align: top;">📧 Email</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #1e293b;">
                        <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px; vertical-align: top;">📂 Sujet</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9;">${subject || 'Non spécifié'}</td>
                </tr>
            </table>
            
            <div style="background: #1e293b; border-radius: 10px; padding: 20px; border-left: 4px solid #4f46e5;">
                <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">MESSAGE</p>
                <p style="margin: 0; color: #e2e8f0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; text-align: center;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Votre message')}" 
                   style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
                    ↩ Répondre à ${name}
                </a>
            </div>
            
            <p style="margin-top: 20px; color: #475569; font-size: 11px; text-align: center;">
                Message reçu le ${new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })} — Mysterious Classroom
            </p>
        </div>
    `;

    try {
        // 1. Envoyer la notification à l'admin
        await sendEmail({
            to: 'mouhamedfa2007@gmail.com',
            subject: subjectLine,
            html,
            text: `Nouveau message de ${name} (${email})\n\nSujet: ${subject || 'Non spécifié'}\n\n${message}`
        });

        // 2. Envoyer une confirmation à l'utilisateur
        const confirmHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e2e8f0; padding: 32px; border-radius: 16px; border: 1px solid #1e293b;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="font-size: 48px; margin-bottom: 12px;">✅</div>
                    <h1 style="margin: 0; color: white; font-size: 22px;">Message bien reçu, ${name} !</h1>
                    <p style="color: #94a3b8; margin-top: 8px;">Nous vous répondrons sous 24 heures.</p>
                </div>
                <div style="background: #1e293b; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #64748b; font-size: 13px;">Votre message :</p>
                    <p style="margin: 8px 0 0; color: #94a3b8; font-style: italic; white-space: pre-wrap;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
                </div>
                <p style="color: #475569; font-size: 12px; text-align: center;">
                    En attendant, explorez nos cours sur <a href="https://mysterious-classroom.com" style="color: #60a5fa;">mysterious-classroom.com</a>
                </p>
            </div>
        `;

        try {
            await sendEmail({
                to: email,
                subject: `Nous avons reçu votre message — Mysterious Classroom`,
                html: confirmHtml,
                text: `Bonjour ${name},\n\nNous avons bien reçu votre message et vous répondrons sous 24 heures.\n\nL'équipe Mysterious Classroom`
            });
        } catch (confirmErr) {
            // La confirmation à l'utilisateur peut échouer sans bloquer la réponse
            console.warn('⚠️ Email de confirmation non envoyé à', email, confirmErr.message);
        }

        return res.json({ success: true, message: 'Message envoyé avec succès !' });

    } catch (err) {
        console.error('❌ Erreur envoi formulaire contact:', err.message);
        return res.status(500).json({ 
            message: 'Erreur lors de l\'envoi. Écrivez-nous directement à mouhamedfa2007@gmail.com' 
        });
    }
};

module.exports = { handleContactForm };
