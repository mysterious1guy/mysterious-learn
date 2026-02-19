const fs = require('fs');
const path = require('path');

// Fallback controller pour quand MongoDB n'est pas disponible
const getAllCoursesFallback = async (req, res) => {
  try {
    // Essayer plusieurs chemins possibles
    const possiblePaths = [
      path.join(__dirname, '../data/courses.json'),
      path.join(process.cwd(), 'data/courses.json'),
      path.join(process.cwd(), 'src/data/courses.json'),
      '/opt/render/project/src/data/courses.json'
    ];
    
    let dataPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        dataPath = testPath;
        console.log(`📁 Found courses.json at: ${dataPath}`);
        break;
      }
    }
    
    if (!dataPath) {
      console.log('❌ courses.json not found in any location');
      return res.status(503).json({ 
        message: 'Service temporairement indisponible',
        fallback: true,
        debug: 'courses.json not found'
      });
    }
    
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
  } catch (error) {
    console.error('Erreur fallback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getCourseByIdFallback = async (req, res) => {
  try {
    // Essayer plusieurs chemins possibles
    const possiblePaths = [
      path.join(__dirname, '../data/courses.json'),
      path.join(process.cwd(), 'data/courses.json'),
      path.join(process.cwd(), 'src/data/courses.json'),
      '/opt/render/project/src/data/courses.json'
    ];
    
    let dataPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        dataPath = testPath;
        break;
      }
    }
    
    if (!dataPath) {
      return res.status(503).json({ 
        message: 'Service temporairement indisponible',
        fallback: true,
        debug: 'courses.json not found'
      });
    }
    
    const coursesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const course = coursesData.find(c => c._id === req.params.id || c.id === req.params.id);
    
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
    // Essayer plusieurs chemins possibles
    const possiblePaths = [
      path.join(__dirname, '../data/courses.json'),
      path.join(process.cwd(), 'data/courses.json'),
      path.join(process.cwd(), 'src/data/courses.json'),
      '/opt/render/project/src/data/courses.json'
    ];
    
    let dataPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        dataPath = testPath;
        break;
      }
    }
    
    if (!dataPath) {
      return res.status(503).json({ 
        message: 'Service temporairement indisponible',
        fallback: true,
        debug: 'courses.json not found'
      });
    }
    
    const coursesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const categories = [...new Set(coursesData.map(course => course.category))];
    res.json(categories);
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
