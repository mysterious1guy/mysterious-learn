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

        // Construction du payload pour Pollinations API (Format OpenAI)
        const messages = [];

        // Ajout du system prompt
        messages.push({
            role: "system",
            content: systemInstruction
        });

        // Contexte (s'il y en a)
        if (contextPrompt !== "Voici tes connaissances internes pour répondre à cette question :\n\nAucun document spécifique trouvé dans la base. Utilise tes connaissances générales.") {
            messages.push({
                role: "system",
                content: contextPrompt
            });
        }

        // Ajout de l'historique
        if (history && history.length > 0) {
            history.forEach(h => {
                messages.push({
                    role: h.role === 'assistant' || h.role === 'model' ? 'assistant' : 'user',
                    content: h.text || h.content
                });
            });
        }

        // Ajout de la question actuelle
        messages.push({
            role: "user",
            content: message
        });

        const pollinationsUrl = `https://text.pollinations.ai/`;

        console.log(`📡 [AI RELAY] Appel POLLINATIONS (Gratuit) pour: ${user.email}`);

        const response = await fetch(pollinationsUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: messages,
                model: 'mistral-large', // Ou 'openai', 'llama', etc. On utilise mistral pour le français (et car performant)
                seed: 42 // Optionnel, pour plus de cohérence
            })
        });

        // L'API Pollinations textuelle renvoie directement une string si on ne met pas jsonMode
        // Mais avec le header JSON elle renvoie parfois la string ou du JSON. On va forcer la lecture en texte pour être sûr.
        const responseText = await response.text();

        if (!response.ok) {
            console.error("❌ [AI RELAY] Erreur Pollinations API:", responseText);
            return res.status(response.status).json({
                message: "Désolé, le Cœur du Système (Pollinations) a renvoyé une erreur.",
                error: responseText || "Erreur inconnue"
            });
        }

        // Si la réponse texte commence par '{' ou '[', on essaie de la parser au cas où
        let finalResponse = responseText;
        try {
            const parsed = JSON.parse(responseText);
            if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
                finalResponse = parsed.choices[0].message.content;
            } else if (parsed.response) {
                finalResponse = parsed.response;
            }
        } catch (e) {
            // C'est du texte brut, c'est parfait
        }

        res.json({ response: finalResponse });

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
