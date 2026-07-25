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
    const { FALLBACK_COURSES } = require('./courseControllerFallback');
    let dbCourses = [];
    try {
      dbCourses = await Course.find().lean();
    } catch (dbErr) {
      console.error('Erreur lecture MongoDB courses:', dbErr.message);
    }

    const combinedMap = new Map();
    [...FALLBACK_COURSES, ...dbCourses].forEach(c => {
      const key = c.id || c._id?.toString();
      combinedMap.set(key, c);
    });

    let filteredCourses = Array.from(combinedMap.values());
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
        c.title?.toLowerCase().includes(s) ||
        c.description?.toLowerCase().includes(s) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(s)))
      );
    }

    res.json(filteredCourses);
  } catch (err) {
    console.error('Erreur chargement cours:', err);
    res.status(500).json({ message: 'Erreur lors du chargement des cours' });
  }
};

// @desc    Obtenir un cours par son ID
// @route   GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    let course = null;

    try {
      course = await Course.findOne({ $or: [{ id: id }, { _id: mongoose.Types.ObjectId.isValid(id) ? id : null }] }).lean();
    } catch (e) {}

    if (!course) {
      const { FALLBACK_COURSES } = require('./courseControllerFallback');
      course = FALLBACK_COURSES.find(c => c.id === id || c._id === id);
    }

    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    res.json(course);
  } catch (err) {
    console.error('Erreur chargement cours par ID:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir les catégories disponibles
// @route   GET /api/courses/categories
const getCategories = async (req, res) => {
  try {
    const { FALLBACK_COURSES } = require('./courseControllerFallback');
    let dbCourses = [];
    try {
      dbCourses = await Course.find().lean();
    } catch (e) {}

    const all = [...FALLBACK_COURSES, ...dbCourses];
    const categories = [...new Set(all.map(c => c.category).filter(Boolean))];
    res.json(categories);
  } catch (err) {
    console.error('Erreur chargement categories:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Créer ou mettre à jour un cours dans MongoDB
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  try {
    const { id, title, description, category, level, duration, image, chapters, tags, isFree } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Titre et description requis' });
    }

    const courseId = id || `course_${Date.now()}`;
    const courseCategory = category || 'Web';
    const courseLevel = level || 'Débutant';
    const courseDuration = duration || '2h';
    const courseImage = image || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80';

    let course = await Course.findOne({ id: courseId });
    if (course) {
      course.title = title;
      course.description = description;
      course.category = courseCategory;
      course.level = courseLevel;
      course.duration = courseDuration;
      course.image = courseImage;
      if (chapters) course.chapters = chapters;
      if (tags) course.tags = tags;
      course.updatedAt = Date.now();
      await course.save();
    } else {
      course = await Course.create({
        id: courseId,
        title,
        description,
        category: courseCategory,
        level: courseLevel,
        duration: courseDuration,
        image: courseImage,
        chapters: chapters || [],
        tags: tags || [],
        isFree: isFree !== undefined ? isFree : true
      });
    }

    console.log(`✅ [COURSE] Cours "${course.title}" enregistré dans MongoDB avec succès (ID: ${course.id})`);
    res.status(201).json(course);
  } catch (err) {
    console.error('Erreur création cours:', err);
    res.status(500).json({ message: 'Erreur lors de la création du cours', error: err.message });
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

// @desc    Supprimer un cours par son ID
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.deleteOne({ id });
    res.json({ message: `Cours ${id} supprimé avec succès` });
  } catch (err) {
    console.error('Erreur suppression cours:', err);
    res.status(500).json({ message: 'Erreur lors de la suppression du cours' });
  }
};

// @desc    Purger tous les cours
// @route   DELETE /api/courses/purge/all
// @access  Private/Admin
const purgeCourses = async (req, res) => {
  try {
    await Course.deleteMany({});
    res.json({ message: 'Tous les cours ont été supprimés avec succès.' });
  } catch (err) {
    console.error('Erreur purge cours:', err);
    res.status(500).json({ message: 'Erreur lors de la purge des cours' });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  getCategories,
  createCourse,
  deleteCourse,
  purgeCourses,
  getProgress,
  updateProgress,
  getAllProgress,
  getCourseStats
};