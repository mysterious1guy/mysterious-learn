const CourseKnowledge = require('../models/CourseKnowledge');

// @desc    Get course knowledge
// @route   GET /api/course-knowledge/:courseId
// @access  Public
const getCourseKnowledge = async (req, res) => {
    try {
        const knowledge = await CourseKnowledge.findOne({ courseId: req.params.courseId });
        if (!knowledge) {
            return res.status(404).json({ message: 'Connaissance pour ce cours introuvable' });
        }
        res.json(knowledge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// @desc    Create or update course knowledge
// @route   POST /api/course-knowledge
// @access  Private/Admin
const upsertCourseKnowledge = async (req, res) => {
    try {
        // Simple admin check based on role in token if available
        if (req.user && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        const { courseId, professorContext, modules, generalFaq } = req.body;

        let knowledge = await CourseKnowledge.findOne({ courseId });

        if (knowledge) {
            // Update
            knowledge.professorContext = professorContext || knowledge.professorContext;
            knowledge.modules = modules || knowledge.modules;
            knowledge.generalFaq = generalFaq || knowledge.generalFaq;
            await knowledge.save();
        } else {
            // Create
            knowledge = await CourseKnowledge.create({
                courseId,
                professorContext: professorContext || "Tu es le Professeur expert de ce cours.",
                modules: modules || [],
                generalFaq: generalFaq || []
            });
        }

        res.status(200).json(knowledge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour des connaissances' });
    }
};

module.exports = {
    getCourseKnowledge,
    upsertCourseKnowledge
};
