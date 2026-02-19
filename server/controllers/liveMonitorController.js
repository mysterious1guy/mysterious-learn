const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Stockage des actions en temps réel
let liveActions = [];
let terminalHistory = [];
let systemStatus = {};

// Ajouter une action
const addAction = (type, action, details = {}) => {
  const actionData = {
    timestamp: new Date().toISOString(),
    type,
    action,
    details,
    id: Date.now()
  };
  
  liveActions.unshift(actionData);
  if (liveActions.length > 100) liveActions.pop(); // Garder que 100 dernières actions
  
  console.log(`🔍 [${type.toUpperCase()}] ${action}`, details);
};

// Intercepter les commandes bash
const originalExec = require('child_process').exec;
require('child_process').exec = function(command, options, callback) {
  addAction('bash', command, { 
    cwd: options?.cwd || process.cwd(),
    timestamp: new Date().toISOString()
  });
  
  if (typeof options === 'function') {
    return originalExec(command, options);
  }
  return originalExec(command, options, callback);
};

// @desc    Dashboard de monitoring en temps réel
// @route   GET /api/live-monitor
const getLiveMonitor = async (req, res) => {
  try {
    // Mettre à jour le statut système
    systemStatus = {
      timestamp: new Date().toISOString(),
      mongodb: {
        connected: mongoose.connection.readyState === 1,
        state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState],
        host: mongoose.connection.host,
        name: mongoose.connection.name
      },
      environment: {
        node_version: process.version,
        platform: process.platform,
        arch: process.arch,
        memory: process.memoryUsage(),
        uptime: process.uptime()
      },
      files: {
        cwd: process.cwd(),
        package_json: fs.existsSync(path.join(process.cwd(), 'package.json')),
        server_js: fs.existsSync(path.join(process.cwd(), 'server/server.js'))
      },
      recent_actions: liveActions.slice(0, 20),
      terminal_history: terminalHistory.slice(0, 10)
    };

    res.json({
      status: 'success',
      data: systemStatus,
      actions: liveActions,
      terminal: terminalHistory
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Exécuter une commande et retourner le résultat
// @route   POST /api/live-monitor/execute
const executeCommand = async (req, res) => {
  try {
    const { command } = req.body;
    
    if (!command) {
      return res.status(400).json({
        status: 'error',
        message: 'Command requise'
      });
    }

    addAction('user_command', command, { 
      user_ip: req.ip,
      timestamp: new Date().toISOString()
    });

    const { exec } = require('child_process');
    exec(command, { 
      cwd: process.cwd(),
      timeout: 10000 
    }, (error, stdout, stderr) => {
      const result = {
        command,
        stdout: stdout || '',
        stderr: stderr || '',
        error: error ? error.message : null,
        timestamp: new Date().toISOString()
      };

      terminalHistory.unshift(result);
      if (terminalHistory.length > 50) terminalHistory.pop();

      res.json({
        status: 'success',
        result
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Stream des actions en temps réel (Server-Sent Events)
// @route   GET /api/live-monitor/stream
const streamActions = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const sendAction = (action) => {
    res.write(`data: ${JSON.stringify(action)}\n\n`);
  };

  // Envoyer les dernières actions
  liveActions.slice(0, 5).forEach(sendAction);

  // Envoyer les nouvelles actions
  const interval = setInterval(() => {
    if (liveActions.length > 0) {
      sendAction(liveActions[0]);
    }
  }, 1000);

  req.on('close', () => {
    clearInterval(interval);
  });
};

module.exports = {
  getLiveMonitor,
  executeCommand,
  streamActions,
  addAction
};
