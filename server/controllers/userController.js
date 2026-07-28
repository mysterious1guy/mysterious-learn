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

// @desc    Obtenir le classement des utilisateurs (Top + Bots dynamiques)
// @route   GET /api/users/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const topRealUsers = await User.find({ role: 'user' })
      .sort({ xp: -1, streak: -1 })
      .select('firstName lastName name email avatar xp streak programmingLevel joinedAt lastLogin lastRankAlertSentAt');

    const topRealUser = topRealUsers[0];
    const highestRealUserXp = topRealUser?.xp || 0;

    // Vérifier le délai d'inactivité du meilleur utilisateur réel (ex: >= 24 heures sans connexion)
    let isTopUserInactive = false;
    if (topRealUser && topRealUser.lastLogin) {
      const hoursInactive = (Date.now() - new Date(topRealUser.lastLogin).getTime()) / (1000 * 3600);
      if (hoursInactive >= 24) {
        isTopUserInactive = true;
      }
    }

    // Calcul dynamique et équilibré de l'XP pour les bots (sans exagération)
    // Si l'utilisateur réel est ACTIF, les bots restent juste derrière (~95% de son score).
    // Si l'utilisateur réel est INACTIF (> 24h), le bot #1 prend légèrement le dessus (+45 XP).
    const baseBotTopXp = isTopUserInactive 
      ? Math.max(highestRealUserXp + 45, 450)
      : Math.max(Math.round(highestRealUserXp * 0.95), 400);

    // Profils de bots avec échelonnage d'XP — avatars cohérents avec le genre
    const botRawData = [
      // HOMMES
      { firstName: "Alexandre", lastName: "Dubois",  multiplier: 1.00, streak: 42, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
      { firstName: "David",     lastName: "Miller",  multiplier: 0.85, streak: 31, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Ousmane",   lastName: "Diallo",  multiplier: 0.72, streak: 26, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Kaito",     lastName: "Tanaka",  multiplier: 0.65, streak: 24, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Amadou",    lastName: "Ndiaye",  multiplier: 0.54, streak: 19, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Lucas",     lastName: "Martin",  multiplier: 0.42, streak: 15, avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Viktor",    lastName: "Novak",   multiplier: 0.34, streak: 12, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Ibrahima",  lastName: "Ba",      multiplier: 0.26, streak: 10, avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Marcus",    lastName: "Vance",   multiplier: 0.18, streak:  8, avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Mateo",     lastName: "Silva",   multiplier: 0.12, streak:  6, avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Babacar",   lastName: "Faye",    multiplier: 0.08, streak:  4, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" },
      // FEMMES
      { firstName: "Fatou",     lastName: "Sow",     multiplier: 0.92, streak: 38, avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Elena",     lastName: "Rostova", multiplier: 0.78, streak: 29, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Sophie",    lastName: "Laurent", multiplier: 0.60, streak: 21, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Sarah",     lastName: "Conner",  multiplier: 0.48, streak: 17, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Aïcha",     lastName: "Camara",  multiplier: 0.38, streak: 14, avatar: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Claire",    lastName: "Moreau",  multiplier: 0.30, streak: 11, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Yuki",      lastName: "Sato",    multiplier: 0.22, streak:  9, avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Ndeye",     lastName: "Diop",    multiplier: 0.15, streak:  7, avatar: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=150&auto=format&fit=crop&q=80" },
      { firstName: "Chloe",     lastName: "Bennett", multiplier: 0.10, streak:  5, avatar: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=150&auto=format&fit=crop&q=80" }
    ];

    const formattedBots = botRawData.map((bot, index) => ({
      _id: `bot_${index + 1}`,
      firstName: bot.firstName,
      lastName: bot.lastName,
      name: `${bot.firstName} ${bot.lastName}`,
      avatar: bot.avatar || null,
      xp: Math.round(baseBotTopXp * bot.multiplier),
      streak: bot.streak,
      programmingLevel: 'Avancé',
      isBot: true
    }));

    const combined = [...(topRealUsers || []), ...formattedBots];
    combined.sort((a, b) => (b.xp || 0) - (a.xp || 0));

    // Si le meilleur utilisateur réel est inactif et a perdu la 1ère place au profit d'un bot
    if (isTopUserInactive && topRealUser && combined[0]._id !== topRealUser._id) {
      const lastAlert = topRealUser.lastRankAlertSentAt ? new Date(topRealUser.lastRankAlertSentAt).getTime() : 0;
      const cooldownHours = (Date.now() - lastAlert) / (1000 * 3600);

      // Envoyer un mail d'alerte maximum une fois toutes les 48 heures
      if (cooldownHours >= 48) {
        const leaderBotName = combined[0].name;
        const leaderBotXp = combined[0].xp;

        try {
          await sendEmail({
            to: topRealUser.email,
            subject: `🚨 Alerte Classement : ${leaderBotName} a pris ta 1ère place !`,
            html: `
              <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0b0f19; color: #f1f5f9; padding: 32px; border-radius: 24px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.1);">
                <div style="text-align: center; margin-bottom: 24px;">
                  <span style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); padding: 8px 16px; border-radius: 9999px; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em;">
                    🚨 ALERTE DU CLASSEMENT
                  </span>
                </div>
                
                <h2 style="font-size: 24px; font-weight: 900; color: #ffffff; text-align: center; margin-bottom: 16px; line-height: 1.3;">
                  Tu as perdu ton trône sur <span style="color: #3b82f6;">Mysterious Classroom</span> !
                </h2>
                
                <p style="font-size: 16px; color: #cbd5e1; line-height: 1.6; margin-bottom: 20px;">
                  Bonjour <strong>${topRealUser.firstName || topRealUser.name}</strong>,
                </p>
                
                <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin-bottom: 24px;">
                  Pendant ton absence de plus de 24 heures, l'agent <strong>${leaderBotName}</strong> a engrangé de l'expérience et vient de te dépasser au classement général avec <strong>${leaderBotXp} XP</strong> !
                </p>

                <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.08); padding: 20px; border-radius: 16px; text-align: center; margin-bottom: 28px;">
                  <p style="margin: 0; font-size: 14px; color: #64748b; font-weight: bold; text-transform: uppercase;">Nouveau Rang 1</p>
                  <p style="margin: 6px 0 0 0; font-size: 22px; font-weight: 900; color: #f59e0b;">🏆 ${leaderBotName} (${leaderBotXp} XP)</p>
                  <p style="margin: 4px 0 0 0; font-size: 14px; color: #94a3b8;">Ton XP : ${highestRealUserXp} XP</p>
                </div>

                <div style="text-align: center; margin-bottom: 24px;">
                  <a href="https://mysterious-learn.onrender.com/auth" style="background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%); color: #ffffff; text-decoration: none; padding: 16px 36px; border-radius: 16px; font-weight: 900; font-size: 16px; display: inline-block; box-shadow: 0 10px 30px rgba(59,130,246,0.3);">
                    🔥 REPRENDRE MON TRÔNE
                  </a>
                </div>

                <p style="font-size: 12px; color: #64748b; text-align: center; line-height: 1.5; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;">
                  Connecte-toi, exécute des commandes dans le terminal et complète des modules pour engranger de l'XP.
                </p>
              </div>
            `
          });

          await User.findByIdAndUpdate(topRealUser._id, { lastRankAlertSentAt: new Date() });
          console.log(`✉️ Mail d'alerte classement envoyé à ${topRealUser.email}`);
        } catch (emailErr) {
          console.error("❌ Échec envoi mail alerte classement:", emailErr.message);
        }
      }
    }

    res.json(combined);
  } catch (err) {
    console.error('Erreur classement:', err);
    res.json([]);
  }
};

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

// @desc    Ajouter de l'XP à l'utilisateur (ex: validation d'étape du terminal)
// @route   POST /api/users/add-xp
const addXp = async (req, res) => {
  try {
    const { amount } = req.body;
    const xpToAdd = parseInt(amount, 10) || 50;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    user.xp = (user.xp || 0) + xpToAdd;
    user.lastActiveAt = new Date();
    await user.save();

    res.json({ message: `+${xpToAdd} XP ajoutés avec succès !`, xp: user.xp });
  } catch (err) {
    console.error('❌ Error addXp:', err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout d\'XP' });
  }
};

module.exports = { getUsers, deleteUserProfile, updateProgrammingLevel, getLeaderboard, addXp };