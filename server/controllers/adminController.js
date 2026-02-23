const Notification = require('../models/Notification');
const User = require('../models/User');
const Course = require('../models/Course');
const coursesData = require('../data/courses/index');
const { sendEmail } = require('../utils/emailService');
const { getMarketingEmail } = require('../utils/emailTemplates');

// @desc    Obtenir tous les utilisateurs (admin)
// @route   GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Supprimer un utilisateur (admin)
// @route   DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Protection Admin
    const isPrimaryAdmin = targetUser.email === 'mouhamedfall@esp.sn' || targetUser.adminTier === 'owner';
    if (targetUser.role === 'admin' || isPrimaryAdmin) {
      return res.status(403).json({ message: 'Impossible de supprimer un compte administrateur principal' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Envoyer un email aux utilisateurs (admin)
// @route   POST /api/admin/send-email
const sendEmailToUsers = async (req, res) => {
  try {
    const { subject, body, recipients, specificEmail } = req.body;

    if (!subject || !body) {
      return res.status(400).json({ message: 'Sujet et contenu requis' });
    }

    let users = [];
    if (recipients === 'specific' && specificEmail) {
      users = [{ email: specificEmail }];
    } else if (recipients === 'verified') {
      users = await User.find({ isEmailVerified: true });
    } else if (recipients === 'unverified') {
      users = await User.find({ isEmailVerified: false });
    } else {
      users = await User.find({});
    }

    const results = await Promise.allSettled(
      users.map(user => {
        // Envelopper le corps de l'email généré par l'IA (texte ou html) dans le template officiel avec logo
        const finalHtml = getMarketingEmail(subject, body);
        return sendEmail({
          to: user.email,
          subject: subject,
          html: finalHtml
        });
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    res.json({
      message: `Email envoyé à ${successful} utilisateur(s). Échecs: ${failed}`,
      sentCount: successful,
      failedCount: failed
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
    const { title, message, type, sendEmail: shouldSendEmail } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: 'Titre et message requis' });
    }

    const notification = await Notification.create({
      title,
      message,
      type: type || 'info',
      createdBy: req.user._id,
      targetUsers: 'all'
    });

    if (shouldSendEmail) {
      const users = await User.find({ isEmailVerified: true });
      // On utilise le template marketing pour les annonces
      const htmlContent = getMarketingEmail(title, message);

      const emailPromises = users.map(user =>
        sendEmail({
          to: user.email,
          subject: title,
          html: htmlContent
        })
      );
      await Promise.all(emailPromises);
    }

    res.json({
      message: 'Notification diffusée' + (shouldSendEmail ? ' et emails envoyés' : ''),
      notification
    });
  } catch (error) {
    console.error('Erreur notification:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de la notification' });
  }
};

// @desc    Obtenir toutes les notifications (admin)
// @route   GET /api/admin/notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Supprimer une notification (admin)
// @route   DELETE /api/admin/notifications/:id
const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
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
      User.countDocuments({ isEmailVerified: true }),
      Course.countDocuments(),
      User.countDocuments({ lastLogin: { $exists: true } })
    ]);

    res.json({
      totalUsers,
      verifiedUsers,
      unverifiedUsers: totalUsers - verifiedUsers,
      totalCourses,
      activeUsers,
      growthRate: '+24%'
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

    // Protection Admin Principal (mouhamedfall@esp.sn)
    const targetUser = await User.findById(req.params.id);
    if (targetUser && (targetUser.email === 'mouhamedfall@esp.sn' || targetUser.adminTier === 'owner')) {
      return res.status(403).json({ message: 'Impossible de modifier le rôle de l\'administrateur principal' });
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

    // Protection Admin Principal
    if (user.email === 'mouhamedfall@esp.sn' || user.adminTier === 'owner') {
      return res.status(403).json({ message: 'Impossible de bannir l\'administrateur principal' });
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

// @desc    Mettre à jour le niveau d'un utilisateur (admin)
// @route   PUT /api/admin/users/:id/level
const updateUserLevel = async (req, res) => {
  try {
    const { programmingLevel } = req.body;

    if (!['beginner', 'intermediate', 'advanced', 'expert'].includes(programmingLevel)) {
      return res.status(400).json({ message: 'Niveau d\'expertise invalide' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { programmingLevel },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({
      message: 'Niveau mis à jour avec succès',
      user
    });
  } catch (error) {
    console.error('Erreur mise à jour niveau:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Débloquer manuellement un cours pour un utilisateur (admin)
// @route   PUT /api/admin/users/:id/unlock-course
const unlockCourseForUser = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ message: 'Course ID requis' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    if (!user.unlockedCourses) {
      user.unlockedCourses = [];
    }

    if (!user.unlockedCourses.includes(courseId)) {
      user.unlockedCourses.push(courseId);
      await user.save();
    }

    res.json({ message: 'Cours débloqué avec succès', unlockedCourses: user.unlockedCourses });
  } catch (error) {
    console.error('Erreur déblocage admin:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Bloquer un cours pour un utilisateur spécifique
// @route   POST /api/admin/users/:id/lock-course
const lockCourseForUser = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ message: 'Course ID requis' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    if (user.unlockedCourses && user.unlockedCourses.includes(courseId)) {
      user.unlockedCourses = user.unlockedCourses.filter(id => id !== courseId);
      await user.save();
    }

    res.json({ message: 'Cours bloqué avec succès', unlockedCourses: user.unlockedCourses });
  } catch (error) {
    console.error('Erreur blocage admin:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Peupler brutalement la BDD avec les 36 cours officiels et détruire l'ancien contenu
// @route   POST /api/admin/seed-courses
const seedCourses = async (req, res) => {
  try {
    // Restreindre formellement à l'admin originel
    if (req.user.email !== 'mouhamedfall@esp.sn' && req.user.adminTier !== 'owner') {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    await Course.deleteMany({});
    await Course.insertMany(coursesData);

    res.json({ message: `Base de données synchronisée : ${coursesData.length} modules d'expertise mondiaux insérés.` });
  } catch (error) {
    console.error('Erreur Seeding:', error);
    res.status(500).json({ message: 'Erreur lors du seeding de la BDD' });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  sendEmailToUsers,
  sendNotificationToUsers,
  getAdminStats,
  updateUserRole,
  toggleUserBan,
  updateUserLevel,
  unlockCourseForUser,
  lockCourseForUser,
  getAllNotifications,
  deleteNotification,
  seedCourses
};
