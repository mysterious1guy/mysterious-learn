const Progress = require('../models/Progress');

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

module.exports = { getProgress, updateProgress, getAllProgress };