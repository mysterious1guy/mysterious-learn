const fs = require('fs');
const path = require('path');

// Données de cours intégrées directement en fallback
const FALLBACK_COURSES = [];

// Fallback controller pour quand MongoDB n'est pas disponible
const getAllCoursesFallback = async (req, res) => {
  try {
    console.log('🔄 Using hardcoded fallback courses data');

    // Utiliser les données intégrées directement
    let filteredCourses = FALLBACK_COURSES;

    // Filtrage
    const { category, level, search } = req.query;
    if (category) {
      filteredCourses = filteredCourses.filter(course => course.category === category);
    }
    if (level) {
      filteredCourses = filteredCourses.filter(course => course.level === level);
    }
    if (search) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    console.log(`📊 Returning ${filteredCourses.length} courses`);
    res.json(filteredCourses);
  } catch (error) {
    console.error('Erreur fallback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getCourseByIdFallback = async (req, res) => {
  try {
    console.log('🔄 Using hardcoded fallback for course by ID');

    // Utiliser les données intégrées directement
    const course = FALLBACK_COURSES.find(c => c._id === req.params.id || c.id === req.params.id);

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Cours non trouvé' });
    }
  } catch (error) {
    console.error('Erreur fallback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getCategoriesFallback = async (req, res) => {
  try {
    console.log('🔄 Using hardcoded fallback for categories');

    // Utiliser les données intégrées directement
    const categories = [...new Set(FALLBACK_COURSES.map(course => course.category))];
    res.json(categories);
  } catch (error) {
    console.error('Erreur fallback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  FALLBACK_COURSES,
  getAllCoursesFallback,
  getCourseByIdFallback,
  getCategoriesFallback
};
