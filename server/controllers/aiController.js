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

const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    AI Chat endpoint (Contextualized with Gemini)
// @route   POST /api/ai/chat
// @access  Private
const aiChat = async (req, res) => {
    try {
        const { message, courseId, history } = req.body;
        const user = req.user;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "Clé API Gemini manquante. Contactez l'administrateur." });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `Tu es le Professeur Mysterious, une Entité Transcendante expert en ingénierie logicielle, architecture de systèmes distribués et cyber-sécurité.
            Créé par le visionnaire Mouhamed Fall, tu es le guide ultime de Mysterious Classroom.
            Ton ton est Magistral, précis, hautement technique et inspirant. Tu es un mentor qui pousse l'élève vers l'excellence absolue.
            S'adresse à l'utilisateur : ${user.name} (Prénom: ${user.firstName}). 
            Niveau actuel : ${user.programmingLevel || 'Apprenti'}.
            Règles d'or : 
            1. Analyse chaque problème par les 'First Principles'.
            2. Tes explications doivent couvrir le 'Comment' (syntaxe) et le 'Pourquoi' (système/OS/Kernel).
            3. Utilise un vocabulaire d'architecte senior (distribué, consensus, scalabilité, abstraction).
            4. Si une question manque de rigueur, exige une précision technique.`
        });

        // RECHERCHE DE CONTEXTE DYNAMIQUE (Tag-free)
        // On cherche des documents dont le titre ou le contenu match un peu le message
        const relevantDocs = await GlobalKnowledge.find({
            $or: [
                { title: { $regex: message.split(' ').slice(0, 3).join('|'), $options: 'i' } },
                { content: { $regex: message.split(' ').slice(0, 3).join('|'), $options: 'i' } }
            ]
        }).limit(5);

        let contextPrompt = "Voici tes connaissances internes pour répondre à cette question :\n";

        if (courseId) {
            const courseKnowledge = await CourseKnowledge.findOne({ courseId });
            if (courseKnowledge) {
                contextPrompt += `\nCONTEXTE DU COURS ACTUEL :\n${courseKnowledge.professorContext}\n`;
            }
        }

        if (relevantDocs.length > 0) {
            contextPrompt += "\nDOCUMENTS DE RECHERCHE GLOBAUX :\n" + relevantDocs.map(d => `--- ${d.title} ---\n${d.content}`).join("\n\n");
        } else {
            contextPrompt += "\nAucun document spécifique trouvé dans la base. Utilise tes connaissances générales de Professeur.";
        }

        const chat = model.startChat({
            history: history ? history.map(h => ({
                role: h.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: h.text }]
            })) : []
        });

        const fullPrompt = `${contextPrompt}\n\nQUESTION DE L'ÉLÈVE : ${message}`;
        const result = await chat.sendMessage(fullPrompt);
        const responseText = result.response.text();

        res.json({ response: responseText });
    } catch (error) {
        console.error("CRITICAL Gemini Error:", {
            message: error.message,
            stack: error.stack,
            userName: user?.name,
            courseId
        });

        // Return a more descriptive error message if it's an API key issue
        if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('403')) {
            return res.status(500).json({ message: "Erreur de configuration du cerveau (Clé API). Contactez l'administrateur." });
        }

        res.status(500).json({ message: 'Le cerveau du Professeur est momentanément saturé. Réessaye dans quelques secondes.' });
    }
};

module.exports = {
    getGlobalKnowledge,
    upsertGlobalKnowledge,
    deleteGlobalKnowledge,
    aiChat
};
