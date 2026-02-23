const Project = require('../models/Project');
const User = require('../models/User');
const staticProjects = require('../data/projects');

// @desc    Créer un nouveau projet (Admin/Owner)
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Obtenir tous les projets
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
    try {
        // Force static projects for stability
        res.json(staticProjects);
        /* 
        // Original DB logic
        const projects = await Project.find({});
        res.json(projects);
        */
    } catch (error) {
        console.error('Erreur chargement projets:', error);
        res.json(staticProjects); // Fallback to static even on error
    }
};

// @desc    Soumettre un projet (marquer comme complété pour le user)
// @route   POST /api/projects/:id/submit
// @access  Private
const submitProject = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const project = await Project.findById(req.params.id);

        if (!user || !project) {
            return res.status(404).json({ message: 'Utilisateur ou projet non trouvé' });
        }

        if (!user.completedQuests) {
            user.completedQuests = [];
        }

        // Check if already submitted
        const isAlreadyCompleted = user.completedQuests.some(q => q.projectId.toString() === project._id.toString());

        if (isAlreadyCompleted) {
            return res.status(400).json({ message: 'Projet déjà soumis et complété' });
        }

        user.completedQuests.push({
            projectId: project._id,
            completedAt: Date.now()
        });

        user.xp = (user.xp || 0) + project.xpReward;
        await user.save();

        res.json({ message: 'Projet validé avec succès !', xpGained: project.xpReward, totalXp: user.xp });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProject,
    getProjects,
    submitProject
};
