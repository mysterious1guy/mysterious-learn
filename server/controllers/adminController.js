const User = require('../models/User');
const Course = require('../models/Course');
const nodemailer = require('nodemailer');

// Configuration email
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// @desc    Obtenir tous les utilisateurs (admin)
// @route   GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Supprimer un utilisateur (admin)
// @route   DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Envoyer un email aux utilisateurs (admin)
// @route   POST /api/admin/send-email
const sendEmailToUsers = async (req, res) => {
  try {
    const { subject, body, recipients } = req.body;

    if (!subject || !body) {
      return res.status(400).json({ message: 'Sujet et contenu requis' });
    }

    // Déterminer les destinataires
    let users;
    switch (recipients) {
      case 'verified':
        users = await User.find({ verified: true });
        break;
      case 'unverified':
        users = await User.find({ verified: false });
        break;
      default:
        users = await User.find({});
    }

    const emailPromises = users.map(user => 
      transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">Mysterious Classroom</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                ${body.replace(/\n/g, '<br>')}
              </div>
              <div style="text-align: center; margin-top: 30px; color: #666;">
                <p>Cet email a été envoyé depuis Mysterious Classroom</p>
                <p>Si vous ne souhaitez plus recevoir ces emails, contactez l'administrateur.</p>
              </div>
            </div>
          </div>
        `
      })
    );

    await Promise.all(emailPromises);

    res.json({ 
      message: `Email envoyé à ${users.length} utilisateur(s)`,
      sentCount: users.length
    });
  } catch (error) {
    console.error('Erreur email:', error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
  }
};

// @desc    Envoyer une notification push (admin)
// @route   POST /api/admin/send-notification
const sendNotificationToUsers = async (req, res) => {
  try {
    const { title, message, type, recipients } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: 'Titre et message requis' });
    }

    // Pour l'instant, on simule l'envoi de notifications
    // Dans une vraie implémentation, on utiliserait un service comme Firebase Cloud Messaging
    const notification = {
      title,
      message,
      type: type || 'info',
      timestamp: new Date(),
      sender: 'admin'
    };

    // Stocker la notification dans la base de données (à implémenter)
    // await Notification.create(notification);

    res.json({ 
      message: 'Notification envoyée avec succès',
      notification
    });
  } catch (error) {
    console.error('Erreur notification:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de la notification' });
  }
};

// @desc    Obtenir les statistiques admin
// @route   GET /api/admin/stats
const getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      verifiedUsers,
      totalCourses,
      activeUsers
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ verified: true }),
      Course.countDocuments(),
      User.countDocuments({ lastLogin: { $exists: true } })
    ]);

    res.json({
      totalUsers,
      verifiedUsers,
      unverifiedUsers: totalUsers - verifiedUsers,
      totalCourses,
      activeUsers,
      growthRate: '+24%' // À calculer réellement
    });
  } catch (error) {
    console.error('Erreur stats:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Mettre à jour le rôle d'un utilisateur (admin)
// @route   PUT /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin', 'moderator'].includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ 
      message: 'Rôle mis à jour avec succès',
      user
    });
  } catch (error) {
    console.error('Erreur mise à jour rôle:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Bannir/débannir un utilisateur (admin)
// @route   PUT /api/admin/users/:id/ban
const toggleUserBan = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.banned = !user.banned;
    await user.save();

    res.json({ 
      message: user.banned ? 'Utilisateur banni' : 'Utilisateur débanni',
      banned: user.banned
    });
  } catch (error) {
    console.error('Erreur bannissement:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  sendEmailToUsers,
  sendNotificationToUsers,
  getAdminStats,
  updateUserRole,
  toggleUserBan
};
