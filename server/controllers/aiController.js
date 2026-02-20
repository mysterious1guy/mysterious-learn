const GlobalKnowledge = require('../models/GlobalKnowledge');
const CourseKnowledge = require('../models/CourseKnowledge');

// @desc    Get all global knowledge
// @route   GET /api/ai/knowledge
// @access  Private/Admin
const getGlobalKnowledge = async (req, res) => {
    try {
        const knowledge = await GlobalKnowledge.find().sort({ updatedAt: -1 });
        res.json(knowledge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des connaissances globales' });
    }
};

// @desc    Upsert global knowledge document
// @route   POST /api/ai/knowledge
// @access  Private/Admin
const upsertGlobalKnowledge = async (req, res) => {
    try {
        const { id, title, content, category, tags, source } = req.body;

        let knowledge;
        if (id) {
            knowledge = await GlobalKnowledge.findById(id);
            if (knowledge) {
                knowledge.title = title || knowledge.title;
                knowledge.content = content || knowledge.content;
                knowledge.category = category || knowledge.category;
                knowledge.tags = tags || knowledge.tags;
                knowledge.source = source || knowledge.source;
                knowledge.lastUpdatedBy = req.user._id;
                await knowledge.save();
            }
        } else {
            knowledge = await GlobalKnowledge.create({
                title,
                content,
                category,
                tags,
                source,
                lastUpdatedBy: req.user._id
            });
        }

        res.status(200).json(knowledge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la connaissance' });
    }
};

// @desc    Delete global knowledge document
// @route   DELETE /api/ai/knowledge/:id
// @access  Private/Admin
const deleteGlobalKnowledge = async (req, res) => {
    try {
        await GlobalKnowledge.findByIdAndDelete(req.params.id);
        res.json({ message: 'Connaissance supprimée' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
};

// @desc    AI Chat endpoint (Contextualized)
// @route   POST /api/ai/chat
// @access  Private
const aiChat = async (req, res) => {
    try {
        const { message, courseId, history } = req.body;

        // In a real production environment with Gemini API Key:
        // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // For now, we simulate the "intelligence" by retrieving relevant context
        let context = "Tu es le Professeur Mysterious. Tu es expert, bienveillant et passionné.";

        if (courseId) {
            const courseKnowledge = await CourseKnowledge.findOne({ courseId });
            if (courseKnowledge) {
                context += `\nContexte actuel du cours : ${courseKnowledge.professorContext}`;
            }
        }

        // Search global knowledge for relevant keywords in the message
        const globalDocs = await GlobalKnowledge.find({
            $or: [
                { tags: { $in: [message.toLowerCase()] } },
                { title: { $regex: message, $options: 'i' } }
            ]
        }).limit(3);

        if (globalDocs.length > 0) {
            context += "\nInformations de recherche supplémentaires : " + globalDocs.map(d => d.content).join("\n");
        }

        // Logic here would call Gemini or another LLM
        // For the simulation, we'll return a more 'intelligent' looking response if we found context
        let aiResponse = "Je suis en train d'analyser ta demande avec mes circuits de Professeur...";

        if (globalDocs.length > 0) {
            aiResponse = `D'après mes recherches dans ma base de connaissances sur "${globalDocs[0].title}", voici ce que je peux te dire : ${globalDocs[0].content.substring(0, 200)}...`;
        } else {
            aiResponse = "C'est une excellente question. Je n'ai pas de document spécifique sur ce point précis dans ma mémoire centrale, mais en tant que ton Professeur, je te recommande de vérifier les bases de l'algorithmique.";
        }

        res.json({ response: aiResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de communication avec le cerveau de l\'IA' });
    }
};

module.exports = {
    getGlobalKnowledge,
    upsertGlobalKnowledge,
    deleteGlobalKnowledge,
    aiChat
};
