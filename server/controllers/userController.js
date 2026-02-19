const User = require('../models/User');

// @desc    Obtenir tous les utilisateurs (admin)
// @route   GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const { sendEmail } = require('../utils/emailService');

// @desc    Supprimer son propre compte
// @route   DELETE /api/users/profile
const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const userEmail = user.email;
    const userName = user.name;

    // Suppression (le middleware s'occupe du cascade)
    await User.findByIdAndDelete(req.user._id);

    // Notification à l'admin
    try {
      await sendEmail({
        to: 'mouhamedfall@esp.sn',
        subject: '🚨 Désinscription Utilisateur - Mysterious Classroom',
        text: `L'utilisateur ${userName} (${userEmail}) vient de supprimer son compte et toutes ses données associées.`
      });
    } catch (mailErr) {
      console.error('Échec envoi mail admin suppression:', mailErr);
    }

    res.json({ message: 'Compte supprimé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getUsers, deleteUser, deleteUserProfile };