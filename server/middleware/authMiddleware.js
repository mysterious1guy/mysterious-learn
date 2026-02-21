const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, token manquant' });
  }
};

const admin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.email === 'mouhamedfall@esp.sn')) {
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit (admin)' });
  }
};

const ownerAdmin = (req, res, next) => {
  const isOwner = req.user && (req.user.adminTier === 'owner' || req.user.email === 'mouhamedfall@esp.sn');
  if (isOwner && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit. Privilèges insuffisants (requis: Owner).' });
  }
};

module.exports = { protect, admin, ownerAdmin };