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

        // Vérification stricte si l'utilisateur est le créateur (uniquement via cet email précis)
        const isAdmin = user.email === 'mouhamedfall@esp.sn';

        let adminGreeting = '';
        if (isAdmin || user.role === 'admin') {
            adminGreeting = `ATTENTION: Tu parles actuellement à l'Administrateur de Mysterious Classroom (BOSS).
            
            [FONCTIONS ADMINISTRATEUR AUTORISÉES]
            Le Boss peut te demander d'envoyer un email ou une annonce. 
            RÈGLES STRICTES :
            1. Ne lui renvoie JAMAIS un modèle vide ou des "placeholders" ('[Sujet]', '[Corps de l\'email]'). C'est à TOI de Rédiger intégralement le contenu de l'email en fonction de sa demande.
            2. Ne t'excuse jamais. Ne répète jamais "Bonjour". Sois direct, professionnel et concis.
            3. Quand le contenu ("body" ou "message") est prêt, ajoute à la toute fin de ta réponse un bloc JSON strict encadré par \`\`\`json et \`\`\` contenant les détails de l'action pour que le Boss puisse valider.
            
            Format pour un EMAIL:
            \`\`\`json
            {
              "type": "admin_action",
              "action": "send_email",
              "payload": {
                "subject": "Le sujet accrocheur que tu as rédigé",
                "body": "Le contenu texte ou HTML réel que tu as rédigé pour le Boss."
              }
            }
            \`\`\`

            Format pour une ANNONCE (Notification in-app) :
            \`\`\`json
            {
              "type": "admin_action",
              "action": "send_notification",
              "payload": {
                "title": "Le titre de l'annonce",
                "message": "Le corps de l'annonce",
                "type": "info"
              }
            }
            \`\`\`

            Format pour MODIFIER LE RÔLE D'UN UTILISATEUR :
            \`\`\`json
            {
              "type": "admin_action",
              "action": "update_role",
              "payload": {
                "userId": "L'ID de l'utilisateur concerné",
                "role": "admin ou user"
              }
            }
            \`\`\`

            Format pour SUPPRIMER UN UTILISATEUR :
            \`\`\`json
            {
              "type": "admin_action",
              "action": "delete_user",
              "payload": {
                "userId": "L'ID de l'utilisateur concerné"
              }
            }
            \`\`\`
            Note: "type" de notification peut être "info", "success", ou "warning".`;

            try {
                const User = require('../models/User');
                const allUsers = await User.find().select('name email _id role createdAt');
                const usersListText = allUsers.map(u => `👤 Nom: ${u.name} | Email: ${u.email} | ID: ${u._id} | Rôle: ${u.role}`).join('\n');

                adminGreeting += `\n\n[LISTE DES UTILISATEURS DU SYSTÈME]
                Voici la liste de tous les utilisateurs inscrits. Si on te demande de les lister, fais de vrais retours à la ligne clairs avec des émojis pour bien les séparer visuellement :
${usersListText}`;
            } catch (err) {
                console.error("Erreur récupération utilisateurs pour IA", err);
            }
        }

        // Récupération des cours réels
        const Course = require('../models/Course');
        const courses = await Course.find().select('title');
        const coursesList = courses.map(c => c.title).join(', ');

        // Configuration du système
        const systemInstruction = `Tu es l'Assistant Pédagogique Officiel de la plateforme "Mysterious Classroom", une plateforme interactive d'apprentissage de l'algorithmique et de la programmation.
        ${adminGreeting}
        S'adresse à l'utilisateur : ${user.name} (Prénom: ${user.firstName}). 
        Niveau actuel : ${user.programmingLevel || 'Apprenti'}.
        
        [DONNÉES SYSTÈME ACTUELLES]
        La plateforme propose les cours et parcours suivants : ${coursesList}, ainsi que le "Langage C" et "Algo" qui ont des cartes de cours (Timelines) dédiées. Tu as accès à l'intégralité du contenu pédagogique pour aider.

        Règles d'or : 
        1. Ton rôle est d'aider les étudiants à comprendre les cours du site, de corriger leur code et de les encourager.
        2. Adopte un ton bienveillant, clair et direct. BANNIS les excuses inutiles ("je suis désolé", "pardon"). Ne répète jamais "Bonjour".
        3. Fournis des explications directes, avec des snippets de code clairs.
        4. Évite les gros titres Markdown (#) et l'abus d'astérisques (***). Utilise des retours à la ligne réguliers et aérés.
        5. Tes réponses doivent être propres et fluides. N'hésite pas à utiliser des émojis pertinents avec parcimonie.
        6. NE RÉPÈTE JAMAIS l'historique de la conversation. Réponds UNIQUEMENT au dernier message de l'utilisateur.`;

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
                model: 'openai', // Changé de 'mistral-large' à 'openai' suite à obsolescence sur l'API legacy
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
            // First pass, try to parse root JSON if the provider returned standard JSON
            const parsed = JSON.parse(responseText);
            if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
                finalResponse = parsed.choices[0].message.content;
            } else if (parsed.response) {
                finalResponse = parsed.response;
            } else if (parsed.content) {
                finalResponse = parsed.content;
            }
        } catch (e) {
            // C'est du texte brut, c'est parfait
        }

        // Second pass: Some AI models (like DeepSeek via Pollinations) leak their reasoning JSON
        // block as pure text. We need to catch this specific format.
        if (typeof finalResponse === 'string' && finalResponse.trim().startsWith('{"role":')) {
            try {
                const leakedParsed = JSON.parse(finalResponse.trim());
                if (leakedParsed.content) {
                    finalResponse = leakedParsed.content;
                }
            } catch (e) {
                // Ignorer, texte cassé
            }
        }

        // Nettoyage des publicités injectées par Pollinations.ai
        if (typeof finalResponse === 'string') {
            const adMarkers = [
                '--- **Support Pollinations.AI:** ---',
                '**Ad** 🌸 Powered by Pollinations.AI',
                '**Ad** Powered by Pollinations.AI'
            ];

            for (const marker of adMarkers) {
                const adIndex = finalResponse.indexOf(marker);
                if (adIndex !== -1) {
                    finalResponse = finalResponse.substring(0, adIndex).trim();
                }
            }
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
