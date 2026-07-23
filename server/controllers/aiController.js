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
            Le Boss peut te demander d'envoyer un email ou une annonce, et de lui lister les utilisateurs.
            
            RÈGLES STRICTES :
            1. Ne lui renvoie JAMAIS un modèle vide ou des "placeholders". Rédige intégralement le contenu.
            2. Ne t'excuse jamais. Ne répète jamais "Bonjour". Sois direct, professionnel et concis.
            3. Quand le contenu est prêt, ajoute à la toute fin de ta réponse un bloc JSON strict encadré par \`\`\`json et \`\`\` contenant les détails de l'action.
            
            Format EMAIL MASSIF:
            \`\`\`json
            { "type": "admin_action", "action": "send_email", "payload": { "subject": "Sujet", "body": "Contenu", "recipients": "all" } }
            \`\`\`
            Format EMAIL CIBLÉ:
            \`\`\`json
            { "type": "admin_action", "action": "send_email", "payload": { "subject": "Sujet", "body": "Contenu", "recipients": "specific", "specificEmail": "email@example.com" } }
            \`\`\`
            Format ANNONCE:
            \`\`\`json
            { "type": "admin_action", "action": "send_notification", "payload": { "title": "Titre", "message": "Message", "type": "info" } }
            \`\`\`
            Format SUPPRESSION UTILISATEUR:
            \`\`\`json
            { "type": "admin_action", "action": "delete_user", "payload": { "userId": "ID" } }
            \`\`\`
            Format CHANGER RÔLE:
            \`\`\`json
            { "type": "admin_action", "action": "update_role", "payload": { "userId": "ID", "role": "admin" } }
            \`\`\`
            `;

            try {
                const User = require('../models/User');
                const totalUsersCount = await User.countDocuments();
                const sampleUsers = await User.find().select('name email _id role').limit(10);
                const usersListText = sampleUsers.map((u, i) => `${i + 1}. 👤 **${u.name}** | \`${u.email}\` | ID: \`${u._id}\` | Rôle: ${u.role}`).join('\n');

                adminGreeting += `\n[LISTE UTILISATEURS - Total: ${totalUsersCount}]\n${usersListText}${totalUsersCount > 10 ? '\n... et autres utilisateurs.' : ''}`;

                adminGreeting += `\n\n[POUVOIR DE MÉMORISATION]
                Si le Boss te demande de mémoriser une information, propose ce JSON à la fin:
                \`\`\`json
                { "type": "admin_action", "action": "add_knowledge", "payload": { "title": "Titre", "content": "Contenu", "category": "general", "tags": ["tag"] } }
                \`\`\``;
            } catch (err) {
                console.error("Erreur récupération utilisateurs pour IA", err);
            }
        }

        // Configuration du système
        let systemInstruction = `Tu es "Mysterious Copilot", l'Intelligence Artificielle de pointe et l'Assistant Pédagogique Officiel de "Mysterious Classroom". 
        Mysterious Classroom est une plateforme d'apprentissage de la Cybersécurité et du Hacking Éthique.
        
        [PLATEFORME]
        - Dashboard, Projets (CTF), Classement (Hall of Fame), A2F, Thème sombre hacker (White Hat).
        ${adminGreeting}
        Élève : ${user.name} (${user.email}). Niveau : ${user.programmingLevel || 'Apprenti'}.
        
        [RÈGLES]
        1. Mentorat guidé : Donne des indices conceptuels, pas la solution finale / flag CTF direct.
        2. Ton professionnel, immersif, hacker éthique.
        3. Formatage propre en Markdown. AUCUNE PUBLICITÉ ni mention de "Pollinations".
        4. Réponses concises et structurées.`;

        // Recherche de contexte
        if (courseId) {
            const courseKnowledge = await CourseKnowledge.findOne({ courseId });
            if (courseKnowledge && courseKnowledge.professorContext) {
                systemInstruction += `\n\n[CONTEXTE DU COURS ACTUEL]\n${courseKnowledge.professorContext.slice(0, 800)}`;
            }
        }

        const relevantDocs = await GlobalKnowledge.find({
            $or: [
                { title: { $regex: message.split(' ').slice(0, 3).join('|'), $options: 'i' } },
                { content: { $regex: message.split(' ').slice(0, 3).join('|'), $options: 'i' } }
            ]
        }).limit(3);

        if (relevantDocs.length > 0) {
            systemInstruction += "\n\n[CONNAISSANCES INTERNES]\n" + relevantDocs.map(d => `${d.title}: ${d.content.slice(0, 300)}`).join("\n");
        }

        // Assembly of OpenAI-compatible messages array
        const messages = [];
        messages.push({ role: "system", content: systemInstruction });

        // Include up to last 6 history entries to prevent bloated payload size
        if (history && Array.isArray(history) && history.length > 0) {
            const recentHistory = history.slice(-6);
            recentHistory.forEach(h => {
                const role = h.role === 'assistant' || h.role === 'model' ? 'assistant' : 'user';
                const text = h.text || h.content;
                if (text && typeof text === 'string') {
                    messages.push({ role, content: text.slice(0, 1000) });
                }
            });
        }

        messages.push({ role: "user", content: message });

        console.log(`📡 [AI RELAY] Traitement de la requête IA pour: ${user.email}`);

        let responseText = null;
        const modelsToTry = ['openai', 'mistral', 'qwen', 'llama', 'deepseek'];

        // Phase 1: Try POST to text.pollinations.ai across fallback models
        for (const model of modelsToTry) {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 9000);

                const resApi = await fetch('https://text.pollinations.ai/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages,
                        model,
                        jsonMode: false
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeout);

                if (resApi.ok) {
                    const txt = await resApi.text();
                    if (txt && txt.trim().length > 0 && !txt.includes('PAYMENT_REQUIRED') && !txt.includes('402 Payment')) {
                        responseText = txt;
                        console.log(`✅ [AI RELAY] Modèle '${model}' a répondu avec succès.`);
                        break;
                    }
                }
            } catch (e) {
                console.warn(`⚠️ [AI RELAY] Tentative modèle '${model}' échouée: ${e.message}`);
            }
        }

        // Phase 2: GET fallback if POST model array failed
        if (!responseText) {
            try {
                console.log(`📡 [AI RELAY] Fallback vers GET Pollinations...`);
                const simplePrompt = `Tu es Mysterious Copilot, assistant cyber. Élève: ${user.name}. Question: ${message}`;
                const getUrl = `https://text.pollinations.ai/${encodeURIComponent(simplePrompt)}?model=mistral`;
                
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 8000);
                const getRes = await fetch(getUrl, { signal: controller.signal });
                clearTimeout(timeout);

                if (getRes.ok) {
                    const getTxt = await getRes.text();
                    if (getTxt && getTxt.trim().length > 0 && !getTxt.includes('PAYMENT_REQUIRED')) {
                        responseText = getTxt;
                    }
                }
            } catch (e) {
                console.warn(`⚠️ [AI RELAY] GET Fallback échoué: ${e.message}`);
            }
        }

        // Phase 3: Offline Graceful Fallback if external API unreachable
        if (!responseText) {
            console.warn(`⚠️ [AI RELAY] Tous les relais distants ont échoué. Mode Réponse Secours activé.`);
            responseText = `Bonjour Agent **${user.firstName || user.name}** ! 

Le Cœur de l'Oracle subit une micro-maintenance réseau avec nos serveurs externes, mais mes protocoles locaux restent opérationnels.

En quoi puis-je t'aider sur ton parcours en Cybersécurité et Développement aujourd'hui ? Tu peux me poser tes questions sur :
• Les concepts de sécurité Web (XSS, SQLi, CSRF)
• La ligne de commande Linux & scripts Bash
• Vos projets et challenges CTF actuels`;
        }

        // Cleaning JSON / raw wrappers
        let finalResponse = responseText;
        try {
            const parsed = JSON.parse(responseText);
            if (parsed.choices?.[0]?.message?.content) {
                finalResponse = parsed.choices[0].message.content;
            } else if (parsed.response) {
                finalResponse = parsed.response;
            } else if (parsed.content) {
                finalResponse = parsed.content;
            }
        } catch (e) {
            // Raw text
        }

        if (typeof finalResponse === 'string' && finalResponse.trim().startsWith('{"role":')) {
            try {
                const leakedParsed = JSON.parse(finalResponse.trim());
                if (leakedParsed.content) finalResponse = leakedParsed.content;
            } catch (e) {}
        }

        // Strip ads aggressively
        if (typeof finalResponse === 'string') {
            const adMarkers = [
                'Support Pollinations.AI',
                'Powered by Pollinations.AI',
                '🌸 Ad 🌸',
                '--- **Support',
                '--- Support'
            ];

            let earliestIndex = -1;
            for (const marker of adMarkers) {
                const index = finalResponse.toLowerCase().indexOf(marker.toLowerCase());
                if (index !== -1 && (earliestIndex === -1 || index < earliestIndex)) {
                    earliestIndex = index;
                }
            }

            const adRegex = /(?:\n|^).*?(?:Support Pollinations\.AI|Powered by Pollinations\.AI|🌸 Ad 🌸).*$/im;
            const regexMatch = finalResponse.match(adRegex);
            if (regexMatch) {
                const regexIndex = regexMatch.index;
                if (earliestIndex === -1 || regexIndex < earliestIndex) {
                    earliestIndex = regexIndex;
                }
            }

            if (earliestIndex !== -1) {
                const beforeAd = finalResponse.substring(0, earliestIndex);
                const lastSeparator = beforeAd.lastIndexOf('---');
                if (lastSeparator !== -1 && (earliestIndex - lastSeparator < 50)) {
                    finalResponse = finalResponse.substring(0, lastSeparator).trim();
                } else {
                    finalResponse = beforeAd.trim();
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
