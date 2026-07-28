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

// @desc    Obtenir le classement des utilisateurs (Top + Bots)
// @route   GET /api/users/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const topRealUsers = await User.find({ role: 'user' })
      .sort({ xp: -1, streak: -1 })
      .select('firstName lastName name avatar xp streak programmingLevel joinedAt');

    const botProfiles = [
      { firstName: "Alexandre", lastName: "Dubois", xp: 18450, streak: 42, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Fatou", lastName: "Sow", xp: 16800, streak: 38, avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80" },
      { firstName: "David", lastName: "Miller", xp: 15250, streak: 31, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Elena", lastName: "Rostova", xp: 14100, streak: 29, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Ousmane", lastName: "Diallo", xp: 13650, streak: 26, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Kaito", lastName: "Tanaka", xp: 12900, streak: 24, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Sophie", lastName: "Laurent", xp: 11800, streak: 21, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Amadou", lastName: "Ndiaye", xp: 10950, streak: 19, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Sarah", lastName: "Conner", xp: 9800, streak: 17, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Lucas", lastName: "Martin", xp: 8900, streak: 15, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Aïcha", lastName: "Camara", xp: 8200, streak: 14, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Viktor", lastName: "Novak", xp: 7600, streak: 12 },
      { firstName: "Claire", lastName: "Moreau", xp: 7100, streak: 11 },
      { firstName: "Ibrahima", lastName: "Ba", xp: 6500, streak: 10 },
      { firstName: "Yuki", lastName: "Sato", xp: 5900, streak: 9 },
      { firstName: "Marcus", lastName: "Vance", xp: 5400, streak: 8 },
      { firstName: "Ndeye", lastName: "Diop", xp: 4800, streak: 7 },
      { firstName: "Mateo", lastName: "Silva", xp: 4200, streak: 6 },
      { firstName: "Chloe", lastName: "Bennett", xp: 3700, streak: 5 },
      { firstName: "Babacar", lastName: "Faye", xp: 3100, streak: 4 },
      { firstName: "Emma", lastName: "Watson", xp: 2600, streak: 4 },
      { firstName: "Cheikh", lastName: "Toure", xp: 2100, streak: 3 },
      { firstName: "Liam", lastName: "O'Connor", xp: 1700, streak: 2 },
      { firstName: "Mariama", lastName: "Gaye", xp: 1300, streak: 2 },
      { firstName: "Carlos", lastName: "Mendoza", xp: 950, streak: 1 }
    ];

    const formattedBots = botProfiles.map((bot, index) => ({
      _id: `bot_${index + 1}`,
      firstName: bot.firstName,
      lastName: bot.lastName,
      name: `${bot.firstName} ${bot.lastName}`,
      avatar: bot.avatar || null,
      xp: bot.xp,
      streak: bot.streak,
      programmingLevel: 'Avancé',
      isBot: true
    }));

    const combined = [...(topRealUsers || []), ...formattedBots];
    combined.sort((a, b) => (b.xp || 0) - (a.xp || 0));

    res.json(combined);
  } catch (err) {
    console.error('Erreur classement:', err);
    res.json([]);
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

// @desc    Mettre à jour le niveau de programmation
// @route   PUT /api/users/level
const updateProgrammingLevel = async (req, res) => {
  try {
    const { level } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    user.programmingLevel = level;
    await user.save();
    res.json({ message: 'Niveau mis à jour', level: user.programmingLevel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getUsers, deleteUserProfile, updateProgrammingLevel, getLeaderboard };