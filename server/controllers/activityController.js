const UserActivity = require('../models/UserActivity');
const User = require('../models/User');

// @desc    Enregistrer la connexion d'un utilisateur
// @route   POST /api/activity/login
const trackLogin = async (req, res) => {
  try {
    const { userId } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Vérifier si une session est déjà active
    const activeSession = await UserActivity.findOne({
      userId,
      logoutTime: null
    });

    if (activeSession) {
      return res.status(400).json({ 
        message: 'Session déjà active' 
      });
    }

    // Créer une nouvelle activité de connexion
    const activity = new UserActivity({
      userId,
      loginTime: new Date(),
      ipAddress,
      userAgent,
      sessionData: {
        totalTime: 0,
        pagesVisited: [],
        interactions: []
      }
    });

    await activity.save();

    // Mettre à jour le dernier login de l'utilisateur
    await User.findByIdAndUpdate(userId, {
      lastLogin: new Date(),
      isOnline: true
    });

    res.json({ 
      message: 'Connexion enregistrée',
      sessionId: activity._id
    });
  } catch (error) {
    console.error('Erreur tracking login:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Enregistrer la déconnexion
// @route   POST /api/activity/logout
const trackLogout = async (req, res) => {
  try {
    const { userId, sessionId } = req.body;

    // Mettre à jour l'activité de connexion
    const activity = await UserActivity.findById(sessionId);
    if (activity) {
      const logoutTime = new Date();
      const duration = Math.round((logoutTime - activity.loginTime) / (1000 * 60)); // en minutes
      
      activity.logoutTime = logoutTime;
      activity.duration = duration;
      activity.sessionData.totalTime = duration;
      
      await activity.save();
    }

    // Mettre à jour le statut de l'utilisateur
    await User.findByIdAndUpdate(userId, {
      isOnline: false,
      totalSessionTime: mongoose.Types.Decimal128 ? 
        { $add: ['$totalSessionTime', duration] } : 
        { $inc: { totalSessionTime: duration } }
    });

    res.json({ 
      message: 'Déconnexion enregistrée',
      sessionDuration: duration
    });
  } catch (error) {
    console.error('Erreur tracking logout:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Suivre l'activité sur une page
// @route   POST /api/activity/track
const trackPageActivity = async (req, res) => {
  try {
    const { userId, sessionId, page, action, target, metadata } = req.body;

    const activity = await UserActivity.findById(sessionId);
    if (!activity) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    // Ajouter la page visitée
    if (page && !activity.sessionData.pagesVisited.find(p => p.page === page)) {
      activity.sessionData.pagesVisited.push({
        page,
        visitTime: new Date(),
        duration: 0
      });
    }

    // Ajouter l'interaction
    if (action) {
      activity.sessionData.interactions.push({
        type: action,
        timestamp: new Date(),
        target: target || page,
        metadata: metadata || {}
      });
    }

    await activity.save();

    res.json({ message: 'Activité enregistrée' });
  } catch (error) {
    console.error('Erreur tracking activity:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Suivre la progression d'un cours
// @route   POST /api/activity/course-progress
const trackCourseProgress = async (req, res) => {
  try {
    const { userId, sessionId, courseId, exerciseId, timeSpent, score, completed } = req.body;

    const activity = await UserActivity.findById(sessionId);
    if (!activity) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    // Ajouter ou mettre à jour la vue du cours
    if (!activity.coursesViewed.find(c => c.courseId.toString() === courseId)) {
      activity.coursesViewed.push({
        courseId,
        viewTime: new Date(),
        duration: 0,
        completed: false
      });
    }

    // Ajouter l'exercice complété
    if (exerciseId && completed) {
      activity.exercisesCompleted.push({
        courseId,
        exerciseId,
        completedAt: new Date(),
        timeSpent: timeSpent || 0,
        score: score || 0
      });

      // Marquer le cours comme complété si tous les exercices sont faits
      // (logique à implémenter selon la structure du cours)
    }

    await activity.save();

    res.json({ message: 'Progression enregistrée' });
  } catch (error) {
    console.error('Erreur tracking progress:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir les statistiques d'utilisation d'un utilisateur
// @route   GET /api/activity/user-stats/:userId
const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const { period = '7days' } = req.query; // 7days, 30days, 90days, all

    let dateFilter = {};
    if (period !== 'all') {
      const days = parseInt(period.replace('days', ''));
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      dateFilter = { loginTime: { $gte: startDate } };
    }

    const activities = await UserActivity.find({ 
      userId,
      ...dateFilter
    }).sort({ loginTime: -1 });

    // Calculer les statistiques
    const stats = {
      totalSessions: activities.length,
      totalTime: activities.reduce((sum, act) => sum + (act.duration || 0), 0),
      averageSessionTime: activities.length > 0 ? 
        Math.round(activities.reduce((sum, act) => sum + (act.duration || 0), 0) / activities.length) : 0,
      coursesViewed: activities.reduce((set, act) => {
        act.coursesViewed.forEach(course => set.add(course.courseId.toString()));
        return set;
      }, new Set()).size,
      exercisesCompleted: activities.reduce((sum, act) => sum + act.exercisesCompleted.length, 0),
      lastLogin: activities.length > 0 ? activities[0].loginTime : null,
      streak: calculateStreak(activities)
    };

    res.json(stats);
  } catch (error) {
    console.error('Erreur getting stats:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir les statistiques globales (admin)
// @route   GET /api/activity/global-stats
const getGlobalStats = async (req, res) => {
  try {
    const { period = '7days' } = req.query;

    let dateFilter = {};
    if (period !== 'all') {
      const days = parseInt(period.replace('days', ''));
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      dateFilter = { loginTime: { $gte: startDate } };
    }

    const activities = await UserActivity.find(dateFilter);
    
    const stats = {
      totalUsers: await User.countDocuments(),
      activeUsers: await User.countDocuments({ isOnline: true }),
      totalSessions: activities.length,
      averageSessionTime: activities.length > 0 ? 
        Math.round(activities.reduce((sum, act) => sum + (act.duration || 0), 0) / activities.length) : 0,
      mostActiveUsers: await getMostActiveUsers(activities),
      popularCourses: await getPopularCourses(activities),
      peakHours: getPeakHours(activities)
    };

    res.json(stats);
  } catch (error) {
    console.error('Erreur getting global stats:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Fonctions utilitaires
const calculateStreak = (activities) => {
  if (activities.length === 0) return 0;
  
  let streak = 0;
  const sortedActivities = activities.sort((a, b) => new Date(b.loginTime) - new Date(a.loginTime));
  
  for (let i = 0; i < sortedActivities.length - 1; i++) {
    const current = new Date(sortedActivities[i].loginTime);
    const next = new Date(sortedActivities[i + 1].loginTime);
    const diffDays = Math.floor((next - current) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

const getMostActiveUsers = async (activities) => {
  const userTimeMap = {};
  
  activities.forEach(activity => {
    const userId = activity.userId.toString();
    userTimeMap[userId] = (userTimeMap[userId] || 0) + (activity.duration || 0);
  });

  const sortedUsers = Object.entries(userTimeMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return await User.find({ _id: { $in: sortedUsers.map(([userId]) => userId) } })
    .select('firstName lastName email totalSessionTime')
    .limit(10);
};

const getPopularCourses = async (activities) => {
  const courseViews = {};
  
  activities.forEach(activity => {
    activity.coursesViewed.forEach(course => {
      const courseId = course.courseId.toString();
      courseViews[courseId] = (courseViews[courseId] || 0) + 1;
    });
  });

  const sortedCourses = Object.entries(courseViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return sortedCourses.map(([courseId]) => courseId);
};

const getPeakHours = (activities) => {
  const hourCounts = Array(24).fill(0);
  
  activities.forEach(activity => {
    const hour = new Date(activity.loginTime).getHours();
    hourCounts[hour]++;
  });

  return hourCounts.map((count, hour) => ({
    hour,
    count,
    percentage: activities.length > 0 ? Math.round((count / activities.length) * 100) : 0
  }));
};

module.exports = {
  trackLogin,
  trackLogout,
  trackPageActivity,
  trackCourseProgress,
  getUserStats,
  getGlobalStats
};
