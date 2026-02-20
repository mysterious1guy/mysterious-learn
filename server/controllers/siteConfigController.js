const SiteConfig = require('../models/SiteConfig');

// @desc    Obtenir la configuration du site
// @route   GET /api/site-config
const getSiteConfig = async (req, res) => {
    try {
        let config = await SiteConfig.findOne();
        if (!config) {
            // Créer une config par défaut si elle n'existe pas
            config = await SiteConfig.create({});
        }
        res.json(config);
    } catch (err) {
        console.error('Erreur getSiteConfig:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// @desc    Mettre à jour la configuration du site
// @route   PUT /api/site-config
// @access  Admin
const updateSiteConfig = async (req, res) => {
    try {
        let config = await SiteConfig.findOne();
        if (!config) {
            config = new SiteConfig(req.body);
        } else {
            Object.assign(config, req.body);
        }
        await config.save();
        res.json(config);
    } catch (err) {
        console.error('Erreur updateSiteConfig:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = {
    getSiteConfig,
    updateSiteConfig
};
