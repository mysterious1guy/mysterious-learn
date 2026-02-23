const Course = require('../models/Course');
const Progress = require('../models/Progress');
const User = require('../models/User');
const {
  getAllCoursesFallback,
  getCourseByIdFallback,
  getCategoriesFallback
} = require('./courseControllerFallback');

// Vérifie si MongoDB est disponible
const isMongoDBAvailable = async () => {
  try {
    await Course.findOne().limit(1);
    return true;
  } catch (error) {
    return false;
  }
};

const getAllCourses = async (req, res) => {
  try {
    // FORCE STATIC DATA as primary source
    const coursesData = require('../data/courses/index');

    let filteredCourses = [...coursesData];
    const { category, level, search } = req.query;

    if (category) {
      filteredCourses = filteredCourses.filter(c => c.category === category);
    }
    if (level) {
      filteredCourses = filteredCourses.filter(c => c.level === level);
    }
    if (search) {
      const s = search.toLowerCase();
      filteredCourses = filteredCourses.filter(c =>
        c.title.toLowerCase().includes(s) ||
        c.description.toLowerCase().includes(s) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(s)))
      );
    }

    res.json(filteredCourses);
  } catch (err) {
    console.error('Erreur chargement cours statiques:', err);
    res.status(500).json({ message: 'Erreur lors du chargement des cours' });
  }
};

// @desc    Obtenir un cours par son ID
// @route   GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const coursesData = require('../data/courses/index');

    const course = coursesData.find(c => c.id === id || (c._id && c._id.toString() === id));

    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    res.json(course);
  } catch (err) {
    console.error('Erreur chargement cours statique par ID:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir les catégories disponibles
// @route   GET /api/courses/categories
const getCategories = async (req, res) => {
  try {
    const coursesData = require('../data/courses/index');
    const categories = [...new Set(coursesData.map(c => c.category))];
    res.json(categories);
  } catch (err) {
    console.error('Erreur chargement categories statiques:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir la progression de l'utilisateur pour un cours
// @route   GET /api/courses/:courseId/progress
const getProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({
      user: req.user._id,
      courseId: req.params.courseId,
    });

    if (!progress) {
      // Créer une progression vide pour compter l'étudiant
      progress = new Progress({
        user: req.user._id,
        courseId: req.params.courseId,
        completedLessons: [],
        progress: 0,
        lastAccessed: Date.now()
      });
      await progress.save();
    }

    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Mettre à jour la progression (marquer une leçon comme terminée)
// @route   POST /api/courses/:courseId/progress
const updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const { courseId } = req.params;

    let progress = await Progress.findOne({ user: req.user._id, courseId });

    if (!progress) {
      progress = new Progress({ user: req.user._id, courseId, completedLessons: [] });
    }

    // Si la leçon n'est pas déjà dans la liste, on l'ajoute
    let isNewCompletion = false;
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      isNewCompletion = true;
    }

    // Donner de l'XP à l'utilisateur si c'est une nouvelle complétion (ex: 50 XP par leçon)
    let currentXp = 0;
    if (isNewCompletion) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.xp = (user.xp || 0) + 50;
        await user.save();
        currentXp = user.xp;
      }
    }

    // Calcul du pourcentage (on suppose que le nombre total de leçons est connu côté front, mais on peut aussi le stocker dans le document)
    // Ici, on reçoit le total depuis le front pour simplifier
    const { totalLessons } = req.body;
    if (totalLessons) {
      progress.progress = Math.round((progress.completedLessons.length / totalLessons) * 100);
    }

    progress.lastAccessed = Date.now();
    await progress.save();

    res.json({
      ...progress.toObject(),
      xpGained: isNewCompletion ? 50 : 0,
      totalXp: currentXp
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir toutes les progressions de l'utilisateur
// @route   GET /api/courses/progress/all
const getAllProgress = async (req, res) => {
  try {
    const progresses = await Progress.find({ user: req.user._id });
    res.json(progresses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir les statistiques des cours (nombre d'étudiants par cours)
// @route   GET /api/courses/stats
const getCourseStats = async (req, res) => {
  try {
    const stats = await Progress.aggregate([
      {
        $group: {
          _id: "$courseId",
          studentCount: { $sum: 1 }
        }
      }
    ]);

    // Transformer en objet { courseId: count }
    const statsObj = {};
    stats.forEach(s => {
      statsObj[s._id] = s.studentCount;
    });

    res.json(statsObj);
  } catch (err) {
    console.error('Erreur stats cours:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  getCategories,
  getProgress,
  updateProgress,
  getAllProgress,
  getCourseStats
};