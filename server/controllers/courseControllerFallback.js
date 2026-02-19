const fs = require('fs');
const path = require('path');

// Fallback controller pour quand MongoDB n'est pas disponible
const getAllCoursesFallback = async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/courses.json');
    
    if (fs.existsSync(dataPath)) {
      const coursesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      
      // Filtrage
      const { category, level, search } = req.query;
      let filteredCourses = coursesData;
      
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
      
      res.json(filteredCourses);
    } else {
      res.status(503).json({ 
        message: 'Service temporairement indisponible',
        fallback: true 
      });
    }
  } catch (error) {
    console.error('Erreur fallback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getCourseByIdFallback = async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/courses.json');
    
    if (fs.existsSync(dataPath)) {
      const coursesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const course = coursesData.find(c => c._id === req.params.id || c.id === req.params.id);
      
      if (course) {
        res.json(course);
      } else {
        res.status(404).json({ message: 'Cours non trouvé' });
      }
    } else {
      res.status(503).json({ 
        message: 'Service temporairement indisponible',
        fallback: true 
      });
    }
  } catch (error) {
    console.error('Erreur fallback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getCategoriesFallback = async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/courses.json');
    
    if (fs.existsSync(dataPath)) {
      const coursesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const categories = [...new Set(coursesData.map(course => course.category))];
      res.json(categories);
    } else {
      res.status(503).json({ 
        message: 'Service temporairement indisponible',
        fallback: true 
      });
    }
  } catch (error) {
    console.error('Erreur fallback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getAllCoursesFallback,
  getCourseByIdFallback,
  getCategoriesFallback
};
