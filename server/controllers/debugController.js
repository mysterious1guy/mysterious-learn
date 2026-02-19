const fs = require('fs');
const path = require('path');

// @desc    Debug endpoint pour vérifier les chemins
// @route   GET /api/debug/paths
const checkPaths = async (req, res) => {
  const possiblePaths = [
    path.join(__dirname, '../data/courses.json'),
    path.join(process.cwd(), 'data/courses.json'),
    path.join(process.cwd(), 'src/data/courses.json'),
    '/opt/render/project/src/data/courses.json',
    '/opt/render/project/data/courses.json',
    '/opt/render/project/src/server/data/courses.json'
  ];

  const results = possiblePaths.map(testPath => {
    const exists = fs.existsSync(testPath);
    let content = null;
    
    if (exists) {
      try {
        content = fs.readFileSync(testPath, 'utf8');
        const parsed = JSON.parse(content);
        content = `Found (${parsed.length} courses)`;
      } catch (error) {
        content = `Error reading: ${error.message}`;
      }
    }
    
    return {
      path: testPath,
      exists,
      content
    };
  });

  res.json({
    cwd: process.cwd(),
    results
  });
};

module.exports = {
  checkPaths
};
