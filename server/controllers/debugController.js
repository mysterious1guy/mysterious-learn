const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

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

// @desc    Debug complet de l'application
// @route   GET /api/debug/status
const fullStatusCheck = async (req, res) => {
  const status = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: {
      connected: mongoose.connection.readyState === 1,
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState],
      host: mongoose.connection.host,
      name: mongoose.connection.name
    },
    environment_vars: {
      CLIENT_URL: process.env.CLIENT_URL || 'NOT_SET',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT_SET',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT_SET',
      MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT_SET',
      PORT: process.env.PORT || 'NOT_SET'
    },
    file_system: {
      cwd: process.cwd(),
      courses_json_exists: fs.existsSync(path.join(process.cwd(), 'data/courses.json')),
      package_json_exists: fs.existsSync(path.join(process.cwd(), 'package.json'))
    },
    memory_usage: process.memoryUsage(),
    uptime: process.uptime()
  };

  res.json(status);
};

// @desc    Test Google OAuth flow
// @route   GET /api/debug/google-oauth
const testGoogleOAuth = async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.json({
      error: 'No code provided',
      google_auth_url: `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(process.env.CLIENT_URL + '/auth/callback')}` +
        `&response_type=code` +
        `&scope=email profile` +
        `&prompt=select_account`
    });
  }

  try {
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    const { tokens } = await client.getToken(code);
    
    res.json({
      success: true,
      tokens: {
        access_token: tokens.access_token ? 'RECEIVED' : 'MISSING',
        id_token: tokens.id_token ? 'RECEIVED' : 'MISSING',
        refresh_token: tokens.refresh_token ? 'RECEIVED' : 'MISSING'
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
};

module.exports = {
  checkPaths,
  fullStatusCheck,
  testGoogleOAuth
};
