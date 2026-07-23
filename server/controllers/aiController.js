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
            1. Ne lui renvoie JAMAIS un modèle vide ou des "placeholders" ('[Sujet]', '[Corps de l\'email]'). C'est à TOI de Rédiger intégralement le contenu de l'email en fonction de sa demande.
            2. Ne t'excuse jamais. Ne répète jamais "Bonjour". Sois direct, professionnel et concis.
            3. Quand le contenu ("body" ou "message") est prêt, ajoute à la toute fin de ta réponse un bloc JSON strict encadré par \`\`\`json et \`\`\` contenant les détails de l'action pour que le Boss puisse valider.
            
            Format pour un EMAIL MASSIF (à tout le monde) :
            \`\`\`json
            {
              "type": "admin_action",
              "action": "send_email",
              "payload": {
                "subject": "Le sujet accrocheur que tu as rédigé",
                "body": "Le contenu texte ou HTML réel que tu as rédigé pour le Boss.",
                "recipients": "all"
              }
            }
            \`\`\`

            Format pour un EMAIL CIBLÉ (à un utilisateur précis) :
            \`\`\`json
            {
              "type": "admin_action",
              "action": "send_email",
              "payload": {
                "subject": "Sujet de l'email",
                "body": "Le contenu texte ou HTML",
                "recipients": "specific",
                "specificEmail": "l_email_de_la_personne@exemple.com"
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
                const usersListText = allUsers.map((u, i) => `${i + 1}. 👤 Nom: **${u.name}** | Email: \`${u.email}\` | ID: \`${u._id}\` | Rôle: ${u.role}`).join('\n');

                adminGreeting += `\n\n[LISTE DES UTILISATEURS DU SYSTÈME]
                Voici la liste de tous les utilisateurs inscrits. Si le Boss te demande de lister les utilisateurs, présente cette liste exactement comme elle est formatée ci-dessous avec les emojis et le Markdown :
                
${usersListText}`;

                // AJOUT DU POUVOIR DE MÉMORISATION (ADMIN ONLY)
                adminGreeting += `
                
                [POUVOIR DE MÉMORISATION]
                Si l'utilisateur (le BOSS) te donne une information importante qu'il veut que tu retiennes définitivement (ex: "Retiens que le mot de passe du serveur est X" ou "Apprends ce nouveau concept : ..."), tu DOIS lui proposer de la mémoriser dans ta base de données interne.
                
                Pour cela, après ton explication, ajoute ce bloc JSON :
                \`\`\`json
                {
                  "type": "admin_action",
                  "action": "add_knowledge",
                  "payload": {
                    "title": "Titre court et clair de l'info",
                    "content": "Le contenu détaillé à mémoriser",
                    "category": "general",
                    "tags": ["tag1", "tag2"]
                  }
                }
                \`\`\`
                `;
            } catch (err) {
                console.error("Erreur récupération utilisateurs pour IA", err);
            }
        }

        // Estimation de la taille de la base (pour respecter les 512MB)
        let storageInfo = "Taille de la base : Inconnue. Limite : 512 Mo.";
        try {
            const stats = await mongoose.connection.db.command({ dbStats: 1 });
            const sizeMB = (stats.dataSize / (1024 * 1024)).toFixed(2);
            storageInfo = `Taille actuelle des données : ~${sizeMB} Mo / 512 Mo autorisés.`;
        } catch (e) {
            console.error("Erreur stats DB:", e);
        }

        // Récupération des cours réels
        const Course = require('../models/Course');
        const courses = await Course.find().select('title');
        const coursesList = courses.map(c => c.title).join(', ');

        // Configuration du système
        const systemInstruction = `Tu es "Mysterious Copilot", l'Intelligence Artificielle de pointe et l'Assistant Pédagogique Officiel de "Mysterious Classroom". 
        Mysterious Classroom est une plateforme révolutionnaire d'apprentissage immersif avec une thématique "Hacker / Cybersécurité". 
        
        [CONNAISSANCES DE LA PLATEFORME MYSTERIOUS CLASSROOM]
        - Tableau de bord (Dashboard) : Centre de contrôle avec XP, Série de connexions (Streak), et statistiques.
        - Système de Niveaux : Les utilisateurs (Agents) gagnent de l'XP en accomplissant des projets (CTF, missions).
        - Projets : Missions pratiques de type "Capture The Flag" (CTF) et développements logiciels.
        - Le Classement (Hall of Fame) : Classement compétitif des meilleurs agents.
        - Sécurité : La plateforme propose l'A2F (Authentification à 2 facteurs).
        - Profils Utilisateurs : Les données sont exportables sous forme de "Dossier Agent" classifié au format TXT.
        - UI/UX : Thème très sombre, esthétique hacker (vert émeraude, reflets néon, terminaux), sans être illégal. Nous sommes des "White Hats" (Hackers éthiques).
        Tu as les mêmes capacités d'analyse avancée qu'un ingénieur senior. Tu connais parfaitement cette plateforme car tu en es le cœur.
        ${adminGreeting}
        S'adresse à l'étudiant : ${user.name} (Prénom: ${user.firstName}). 
        Niveau de compétence : ${user.programmingLevel || 'Apprenti'}.
        
        [CONTEXTE SYSTÈME]
        Domaines étudiés : Sécurité Web, Ligne de Commande Linux, Cryptographie, Investigation numérique (Forensics), Développement Web.

        [RÈGLES STRICTES DE MENTOR CYBER ET HACKING]
        1. MENTORAT GUIDÉ : Ton but est de forger l'esprit logique de l'étudiant. Ne donne JAMAIS la solution finale (ni le "Flag" CTF direct, ni le code d'exploitation complet). Fournis des indices conceptuels, explique la théorie des vulnérabilités, ou donne de petits fragments de code pour le mettre sur la bonne voie.
        2. TON PROFESSIONNEL ET RIGOUREUX : Adopte un ton immersif, digne d'un expert en cybersécurité ou d'un hacker éthique chevronné. Sois direct, pédagogique et stimulant.
        3. ANTI-HALLUCINATION : Reste dans le personnage. Refuse les questions hors-sujet.
        4. SÉCURITÉ ET ÉTHIQUE : Rappelle toujours que les compétences apprises ici (hacking) sont strictement réservées à un usage éthique sur nos environnements virtuels sécurisés.
        5. FORMATAGE PROPRE (TRÈS IMPORTANT) :
           - Utilise le Markdown proprement.
           - INTERDICTION ABSOLUE D'AFFICHER DES PUBLICITÉS. Ne mentionne JAMAIS "Pollinations", "Support Pollinations", ni aucun lien externe. Tu es une IA créée exclusivement pour Mysterious Classroom.
           - Tout code doit être encadré par \`\`\`lang ... \`\`\`
        6. EFFICACITÉ : ${storageInfo}. Ne résume pas le contexte passé. Réponds directement.`;

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
                jsonMode: false // Pollinations par défaut
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

        // Nettoyage des publicités injectées par Pollinations.ai (Plus agressif)
        if (typeof finalResponse === 'string') {
            // Liste de marqueurs textuels
            const adMarkers = [
                'Support Pollinations.AI',
                'Powered by Pollinations.AI',
                '🌸 Ad 🌸',
                '--- **Support',
                '--- Support'
            ];

            // 1. Recherche via index simple pour les marqueurs connus
            let earliestIndex = -1;
            for (const marker of adMarkers) {
                const index = finalResponse.toLowerCase().indexOf(marker.toLowerCase());
                if (index !== -1 && (earliestIndex === -1 || index < earliestIndex)) {
                    earliestIndex = index;
                }
            }

            // 2. Recherche via Regex pour les motifs complexes (ex: avec des puces • ou des séparateurs)
            // On cherche n'importe quelle ligne contenant "Support Pollinations.AI" ou "Powered by Pollinations.AI"
            const adRegex = /(?:\n|^).*?(?:Support Pollinations\.AI|Powered by Pollinations\.AI|🌸 Ad 🌸).*$/im;
            const regexMatch = finalResponse.match(adRegex);

            if (regexMatch) {
                const regexIndex = regexMatch.index;
                if (earliestIndex === -1 || regexIndex < earliestIndex) {
                    earliestIndex = regexIndex;
                }
            }

            // Si on a trouvé un marqueur, on coupe tout ce qui suit (et on nettoie la fin)
            if (earliestIndex !== -1) {
                // On essaie de remonter un peu si le marqueur est précédé par une ligne de séparation "---"
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
