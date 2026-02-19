const Course = require('../models/Course');
const Progress = require('../models/Progress');
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

// @desc    Obtenir tous les cours
// @route   GET /api/courses
const getAllCourses = async (req, res) => {
  // Forcer le fallback temporairement pour résoudre le problème Render
  console.log('🔄 Forcing fallback mode for Render deployment');
  return getAllCoursesFallback(req, res);
  
  // Code original (commenté temporairement)
  /*
  const mongoAvailable = await isMongoDBAvailable();
  
  if (!mongoAvailable) {
    console.log('⚠️ MongoDB indisponible - utilisation du fallback JSON');
    return getAllCoursesFallback(req, res);
  }

  try {
    const { category, level, search } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (level) query.level = level;
    if (search) {
      query.$text = { $search: search };
    }

    const courses = await Course.find(query)
      .populate('prerequisites', 'title')
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (err) {
    console.error('Erreur MongoDB:', err);
    // Fallback en cas d'erreur
    return getAllCoursesFallback(req, res);
  }
  */
};

// @desc    Obtenir un cours par son ID
// @route   GET /api/courses/:id
const getCourseById = async (req, res) => {
  const mongoAvailable = await isMongoDBAvailable();
  
  if (!mongoAvailable) {
    console.log('⚠️ MongoDB indisponible - utilisation du fallback JSON');
    return getCourseByIdFallback(req, res);
  }

  try {
    const course = await Course.findById(req.params.id)
      .populate('prerequisites', 'title description');
    
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    res.json(course);
  } catch (err) {
    console.error('Erreur MongoDB:', err);
    // Fallback en cas d'erreur
    return getCourseByIdFallback(req, res);
  }
};

// @desc    Obtenir les catégories disponibles
// @route   GET /api/courses/categories
const getCategories = async (req, res) => {
  const mongoAvailable = await isMongoDBAvailable();
  
  if (!mongoAvailable) {
    console.log('⚠️ MongoDB indisponible - utilisation du fallback JSON');
    return getCategoriesFallback(req, res);
  }

  try {
    const categories = await Course.distinct('category');
    res.json(categories);
  } catch (err) {
    console.error('Erreur MongoDB:', err);
    // Fallback en cas d'erreur
    return getCategoriesFallback(req, res);
  }
};

// @desc    Obtenir la progression de l'utilisateur pour un cours
// @route   GET /api/courses/:courseId/progress
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.user._id,
      courseId: req.params.courseId,
    });
    res.json(progress || { completedLessons: [], progress: 0 });
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
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    // Calcul du pourcentage (on suppose que le nombre total de leçons est connu côté front, mais on peut aussi le stocker dans le document)
    // Ici, on reçoit le total depuis le front pour simplifier
    const { totalLessons } = req.body;
    if (totalLessons) {
      progress.progress = Math.round((progress.completedLessons.length / totalLessons) * 100);
    }

    progress.lastAccessed = Date.now();
    await progress.save();

    res.json(progress);
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

module.exports = { 
  getAllCourses, 
  getCourseById, 
  getCategories,
  getProgress, 
  updateProgress, 
  getAllProgress 
};