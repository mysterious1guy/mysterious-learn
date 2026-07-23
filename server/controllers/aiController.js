const mongoose = require('mongoose');
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

        // Phase 0: Check for Gemini API key if present in environment
        let geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        if (geminiKey) {
            geminiKey = geminiKey.trim().replace(/^["']|["']$/g, '');

            const historyText = (history && Array.isArray(history)) 
                ? history.slice(-4).map(h => `${(h.role === 'assistant' || h.role === 'model') ? 'Assistant' : 'Élève'}: ${h.text || h.content || ''}`).join('\n')
                : '';

            const combinedUserPrompt = `[CONSIGNE SYSTÈME ASSISTANT]\n${systemInstruction}\n\n${historyText ? `[HISTORIQUE CONVERSATION]\n${historyText}\n\n` : ''}[QUESTION ÉLÈVE]\n${message}`;

            const geminiEndpoints = [
                { url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', name: 'gemini-2.0-flash' },
                { url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent', name: 'gemini-1.5-flash-latest' },
                { url: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent', name: 'gemini-1.5-flash (v1)' },
                { url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent', name: 'gemini-2.0-flash-lite' }
            ];

            for (const ep of geminiEndpoints) {
                try {
                    console.log(`📡 [AI RELAY] Appel Google Gemini API (${ep.name})...`);
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 10000);

                    const geminiPayload = {
                        contents: [
                            { role: 'user', parts: [{ text: combinedUserPrompt }] }
                        ]
                    };

                    const geminiRes = await fetch(`${ep.url}?key=${geminiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(geminiPayload),
                        signal: controller.signal
                    });
                    clearTimeout(timeout);

                    if (geminiRes.ok) {
                        const geminiData = await geminiRes.json();
                        const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
                        if (text && text.trim()) {
                            responseText = text;
                            console.log(`✅ [AI RELAY] Gemini API (${ep.name}) a répondu avec succès.`);
                            break;
                        }
                    } else {
                        const errText = await geminiRes.text();
                        console.warn(`⚠️ [AI RELAY] Gemini API (${ep.name}) HTTP ${geminiRes.status}: ${errText.slice(0, 150)}`);
                    }
                } catch (e) {
                    console.warn(`⚠️ [AI RELAY] Gemini API (${ep.name}) failed: ${e.message}`);
                }
            }
        }

        // Phase 1: Free DeepSeek Relay (DeepSeek-V3 & DeepSeek-R1 via Pollinations)
        if (!responseText) {
            const deepseekModels = ['deepseek', 'deepseek-r1'];
            for (const modelName of deepseekModels) {
                try {
                    console.log(`📡 [AI RELAY] Appel DeepSeek Gratuit (${modelName})...`);
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 10000);

                    const safePrompt = `[CONSIGNE SYSTÈME]\n${systemInstruction}\n\n[ÉLÈVE ${user.name}]\n${message}`;
                    const getUrl = `https://text.pollinations.ai/${encodeURIComponent(safePrompt.slice(0, 300))}?model=${modelName}`;

                    const dsRes = await fetch(getUrl, { signal: controller.signal });
                    clearTimeout(timeout);

                    if (dsRes.ok) {
                        const dsTxt = await dsRes.text();
                        if (dsTxt && dsTxt.trim().length > 0 && !dsTxt.includes('PAYMENT_REQUIRED') && !dsTxt.includes('402 Payment')) {
                            responseText = dsTxt;
                            console.log(`✅ [AI RELAY] DeepSeek Gratuit (${modelName}) a répondu avec succès.`);
                            break;
                        }
                    } else {
                        const errText = await dsRes.text();
                        console.warn(`⚠️ [AI RELAY] DeepSeek (${modelName}) HTTP ${dsRes.status}: ${errText.slice(0, 150)}`);
                    }
                } catch (e) {
                    console.warn(`⚠️ [AI RELAY] DeepSeek (${modelName}) failed: ${e.message}`);
                }
            }
        }

        // Phase 2: Anonymous Short Pollinations GET (URL < 250 chars guarantees fast delivery)
        if (!responseText) {
            try {
                console.log(`📡 [AI RELAY] Fallback vers Pollinations Fast GET...`);
                const shortPrompt = `Assistant Cyber Mysterious Classroom. Question de ${user.name}: ${message}`;
                const safeUrlPrompt = shortPrompt.length > 200 ? shortPrompt.slice(0, 200) : shortPrompt;
                const getUrl = `https://text.pollinations.ai/${encodeURIComponent(safeUrlPrompt)}`;
                
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 10000);
                const getRes = await fetch(getUrl, { signal: controller.signal });
                clearTimeout(timeout);

                if (getRes.ok) {
                    const getTxt = await getRes.text();
                    if (getTxt && getTxt.trim().length > 0 && !getTxt.includes('PAYMENT_REQUIRED')) {
                        responseText = getTxt;
                        console.log(`✅ [AI RELAY] Pollinations Fast GET a répondu avec succès.`);
                    }
                } else {
                    const errText = await getRes.text();
                    console.warn(`⚠️ [AI RELAY] Pollinations GET HTTP ${getRes.status}: ${errText.slice(0, 150)}`);
                }
            } catch (e) {
                console.warn(`⚠️ [AI RELAY] GET Fallback échoué: ${e.message}`);
            }
        }

        // Phase 3: Conversational Local Assistant (Dynamic fallback if external APIs offline)
        if (!responseText) {
            console.warn(`⚠️ [AI RELAY] Mode Assistant Local Intelligent activé.`);
            const lowerMsg = message.toLowerCase().trim();

            if (lowerMsg.includes('ctf signifie') || lowerMsg.includes('signifie quoi') || lowerMsg.includes('définition ctf') || lowerMsg.includes('definition ctf') || lowerMsg.includes('c quoi ctf') || lowerMsg.includes('c\'est quoi ctf')) {
                responseText = `Le **CTF (Capture The Flag)** est un jeu de hacking éthique ! 🚩

Le principe : tu dois exploiter une vulnérabilité (dans un site web, un serveur ou un binaire) pour trouver un texte secret caché appelé **« Flag »** (exemple: \`MYSTERIOUS{hacked_xss_2026}\`).

En soumettant le Flag sur la plateforme, tu prouves que tu as réussi la mission et tu gagnes des points XP !`;
            } else if (lowerMsg.includes('cours') || lowerMsg.includes('module') || lowerMsg.includes('formation') || lowerMsg.includes('programme') || lowerMsg.includes('apprendre') || lowerMsg.includes('disponible') || lowerMsg.includes('dispo')) {
                responseText = `Voici les modules de formation actuellement disponibles sur **Mysterious Classroom** :

• 🛡️ **Sécurité Web & Injection** (XSS, SQLi, CSRF)
• 🐧 **Administration Linux & Hacking Terminal** (Commandes, Bash, Privilèges)
• 🌐 **Analyse Réseau & Web Recon** (Port Scanning, Footprinting)

Tu peux les explorer directement depuis ton **Tableau de bord** !`;
            } else if (lowerMsg.includes('projet') || lowerMsg.includes('ctf') || lowerMsg.includes('mission')) {
                responseText = `Pour accéder aux **Projets & Challenges CTF** :

1. Clique sur l'onglet **📁 Projets** dans la barre supérieure.
2. Choisis un challenge de ton niveau.
3. Résous la mission pour accumuler des points XP !`;
            } else if (lowerMsg.includes('classement') || lowerMsg.includes('leaderboard') || lowerMsg.includes('rang') || lowerMsg.includes('points') || lowerMsg.includes('xp')) {
                responseText = `Agent **${user.firstName || user.name}**, pour consulter le **Classement (Hall of Fame)** :

1. Regarde la barre de navigation supérieure.
2. Clique sur l'onglet **🏆 Classement**.
3. Tu y trouveras le rang des élèves, leurs points d'expérience (XP) et les badges débloqués !`;
            } else if (lowerMsg.includes('fondateur') || lowerMsg.includes('créateur') || lowerMsg.includes('createur') || lowerMsg.includes('qui a fait') || lowerMsg.includes('mouhamed fall') || lowerMsg.includes('boss')) {
                responseText = `La plateforme **Mysterious Classroom** a été conçue et développée par **Mouhamed FALL**, passionné d'investigation numérique, de cybersécurité et de développement web ! 🚀`;
            } else if (lowerMsg.includes('qui es tu') || lowerMsg.includes('qui es-tu') || lowerMsg.includes('tes qui') || lowerMsg.includes('t\'es qui') || lowerMsg.includes('tu est ki')) {
                responseText = `Je suis **Mysterious Copilot**, l'IA et Mentor Officiel de Mysterious Classroom. Mon rôle est de te guider dans ton apprentissage de la Cybersécurité et du Hacking Éthique !`;
            } else if (lowerMsg.includes('profil') || lowerMsg.includes('compte') || lowerMsg.includes('2fa') || lowerMsg.includes('mot de passe')) {
                responseText = `Pour gérer ton **Profil & Sécurité** :

1. Clique sur ton avatar en haut à droite.
2. Choisis **Mon Profil**.
3. Tu pourras y configurer la 2FA (A2F) et télécharger ton Dossier Agent !`;
            } else if (isAdmin && (lowerMsg.includes('mail') || lowerMsg.includes('email') || lowerMsg.includes('annonce') || lowerMsg.includes('notification') || lowerMsg.includes('utilisateur'))) {
                responseText = `Bonjour Boss **Mouhamed** ! Je suis prêt pour tes commandes d'administration. Que souhaites-tu effectuer ? (envoi d'email, publication d'annonce ou gestion des utilisateurs).`;
            } else if (lowerMsg.includes('arrete') || lowerMsg.includes('arrête') || lowerMsg.includes('repete') || lowerMsg.includes('répète') || lowerMsg.includes('meme reponse') || lowerMsg.includes('même réponse')) {
                responseText = `Bien reçu Agent **${user.firstName || user.name}** ! 

Actuellement, je fonctionne avec la base de connaissances locale. Pour débloquer la génération IA illimitée et totalement libre, il suffit d'ajouter une clé API Google Gemini dans les paramètres de Render. 

En attendant, pose-moi une question sur un sujet précis (XSS, SQLi, Linux, CTF) !`;
            } else if (lowerMsg.includes('how are you') || lowerMsg.includes('how are u')) {
                responseText = `I'm doing great, Agent **${user.firstName || user.name}**! Ready to master cybersecurity on Mysterious Classroom today? How can I help you?`;
            } else if (lowerMsg.includes('repond') || lowerMsg.includes('répond') || lowerMsg.includes('comprends pas') || lowerMsg.includes('wesh')) {
                responseText = `Je suis là et à ton écoute Agent **${user.firstName || user.name}** ! Pose-moi directement ta question sur les **cours**, les **challenges CTF**, la **sécurité web (XSS, SQLi)** ou la **plateforme** !`;
            } else if (lowerMsg.includes('comment tu vas') || lowerMsg.includes('ca va') || lowerMsg.includes('ça va') || lowerMsg.includes('comment vas') || lowerMsg.includes('alors')) {
                responseText = `Je vais très bien, Agent **${user.firstName || user.name}** ! Prêt à relever de nouveaux défis sur Mysterious Classroom aujourd'hui ? Que souhaites-tu explorer ?`;
            } else if (lowerMsg.includes('salut') || lowerMsg.includes('coucou') || lowerMsg.includes('hello') || lowerMsg.includes('bonjour') || lowerMsg.includes('yo')) {
                responseText = `Bonjour Agent **${user.firstName || user.name}** ! Je suis ton mentor Mysterious Copilot. En quoi puis-je t'aider aujourd'hui ?`;
            } else {
                responseText = `Reçu Agent **${user.firstName || user.name}** ! 

Pour me poser tes questions :
• **Cybersécurité & Hacking Éthique** (XSS, SQLi, CSRF, Linux)
• **Plateforme** (Classement 🏆, Projets 📁, Profil 👤)`;
            }
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
