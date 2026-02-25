const orientationCourse = [
    {
        id: "orientation-comprendre-les-roles-des-disciplines",
        title: "Orientation - Mission Zéro : Devenir Développeur",
        description: "Le sas d'entrée de MYSTERIOUS CLASSROOM. Ici, tu construis ton plan de bataille, tu comprends comment fonctionne un produit numérique de bout en bout et tu valides ta première mission concrète.",
        category: "Orientation",
        level: "Débutant",
        duration: "2h15",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Orientation", "Mandatory", "Mindset", "Roadmap", "XP", "Projet"],
        chapters: [
            {
                title: "1. Pourquoi tu veux coder (vraiment)",
                description: "Clarifier ton objectif pour éviter l'abandon en cours de route.",
                order: 1,
                duration: "20 min",
                content: "Avant d'apprendre un langage, tu dois connaître ta destination. On distingue 4 profils : (1) Créateur d'apps/web, (2) Automatisation & scripts, (3) Data/IA, (4) Carrière professionnelle. Ton profil influence ton parcours, ton rythme et les projets à privilégier. Le but de ce chapitre est de transformer une envie floue en objectif mesurable (ex: 'livrer une app todo publique en 30 jours').",
                objectives: [
                    "Identifier son profil d'apprentissage",
                    "Formuler un objectif concret à 30 jours",
                    "Définir un critère de réussite observable"
                ],
                exercises: [
                    {
                        title: "Déclaration de mission",
                        description: "Rédige ta mission en une phrase : objectif + échéance + livrable.",
                        difficulty: "Facile",
                        solution: "Exemple: 'En 30 jours, je publie une mini application web (frontend + backend simple) documentée sur GitHub.'",
                        hints: [
                            "Ajoute une date précise.",
                            "Le livrable doit pouvoir être montré à quelqu'un."
                        ]
                    }
                ],
                resources: [
                    {
                        title: "How to think like a programmer",
                        type: "video",
                        url: "https://www.youtube.com/embed/azcrPFhaY9k"
                    },
                    {
                        title: "The map of computer science",
                        type: "video",
                        url: "https://www.youtube.com/embed/-uleG_Vecis"
                    },
                    {
                        title: "Guide métier développeur (France Travail)",
                        type: "article",
                        url: "https://candidat.francetravail.fr/metierscope/fiche-metier/M1805/developpement-informatique"
                    }
                ]
            },
            {
                title: "2. Anatomie d'une application moderne",
                description: "Comprendre les rôles exacts de l'algorithmique, frontend, backend, base de données et réseau.",
                order: 2,
                duration: "30 min",
                content: "Une app moderne est un système coordonné :\n- Algorithmique: la logique de décision\n- Frontend: l'interface que voit l'utilisateur\n- Backend: les règles métier et la sécurité\n- Database: la mémoire persistante\n- Réseaux/API: les échanges entre composants\n- Outils (Git/Linux): la fiabilité du travail\n\nCe chapitre t'apprend à ne plus confondre 'coder' et 'construire un produit'. Tu vas apprendre à lire un flux utilisateur complet (inscription -> login -> création d'objet -> sauvegarde -> affichage).",
                objectives: [
                    "Associer chaque besoin produit au bon composant technique",
                    "Suivre un flux de données de bout en bout",
                    "Comprendre pourquoi l'algorithmique est le socle"
                ],
                exercises: [
                    {
                        title: "Trace de flux utilisateur",
                        description: "Décris étape par étape ce qu'il se passe quand un utilisateur crée un compte sur une plateforme.",
                        difficulty: "Moyen",
                        solution: "Frontend envoie formulaire -> Backend valide -> mot de passe hashé -> DB enregistre -> Backend retourne token -> Frontend met à jour session -> utilisateur connecté.",
                        hints: [
                            "Commence par l'interface, termine par le stockage.",
                            "N'oublie pas la validation côté serveur."
                        ]
                    }
                ],
                resources: [
                    {
                        title: "Client-Server Model explained",
                        type: "video",
                        url: "https://www.youtube.com/embed/L5BlpPU_muY"
                    },
                    {
                        title: "How does the Internet work? (MDN)",
                        type: "article",
                        url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work"
                    },
                    {
                        title: "REST API concepts and examples",
                        type: "video",
                        url: "https://www.youtube.com/embed/lsMQRaeKNDk"
                    }
                ]
            },
            {
                title: "3. Méthode d'apprentissage haute rétention",
                description: "Passer d'un mode passif (vidéos) à un mode productif (pratique + feedback).",
                order: 3,
                duration: "25 min",
                content: "La règle anti-oubli : 15-30-15.\n- 15 min théorie active (prise de notes à la main)\n- 30 min pratique immédiate (exercice/terminal)\n- 15 min synthèse (ce que tu sais expliquer sans support)\n\nPlan hebdo recommandé : 5 sessions courtes + 1 mini-bilan + 1 mini-projet. C'est plus efficace qu'un marathon ponctuel. On introduit aussi la revue personnelle: à chaque session, note 1 erreur répétée et la correction associée.",
                objectives: [
                    "Construire une routine durable",
                    "Mesurer sa progression chaque semaine",
                    "Réduire la fatigue cognitive"
                ],
                exercises: [
                    {
                        title: "Planning 7 jours",
                        description: "Crée un planning précis de 7 jours (créneaux, objectifs, livrables).",
                        difficulty: "Moyen",
                        solution: "Exemple: Lun-Ven 45 min/jour (Algo + langage), Sam 90 min mini-projet, Dim 20 min rétro + plan semaine suivante.",
                        hints: [
                            "Privilégie des créneaux fixes.",
                            "Ajoute un livrable par semaine (README, exercice, mini script)."
                        ]
                    }
                ],
                resources: [
                    {
                        title: "Learning How to Learn (overview)",
                        type: "video",
                        url: "https://www.youtube.com/embed/vd2dtkMINIw"
                    },
                    {
                        title: "Deliberate Practice explained",
                        type: "video",
                        url: "https://www.youtube.com/embed/f2O6mQkFiiw"
                    },
                    {
                        title: "How to take smart notes",
                        type: "article",
                        url: "https://www.soenkeahrens.de/en/takesmartnotes"
                    }
                ]
            },
            {
                title: "4. Git/GitHub, documentation et preuves de progression",
                description: "Apprendre à montrer ce que tu sais faire, pas seulement ce que tu as regardé.",
                order: 4,
                duration: "30 min",
                content: "Un recruteur, un mentor ou un pair ne lit pas tes intentions: il lit tes preuves. Tes preuves sont: commits réguliers, README clairs, projets livrables et historique d'amélioration. Ce chapitre pose les standards dès le début : nommage propre, messages de commit utiles, structure minimale d'un projet et journal de progression.",
                objectives: [
                    "Comprendre l'importance du versionnage",
                    "Écrire un README minimal de qualité",
                    "Mettre en place un journal de progression"
                ],
                exercises: [
                    {
                        title: "Premier dépôt propre",
                        description: "Crée un repo avec README, objectifs, stack visée et checklist de progression.",
                        difficulty: "Facile",
                        solution: "Repo initialisé + README sections (Objectif, Stack, Plan 30 jours, Livrables) + premier commit conventionnel.",
                        hints: [
                            "Rédige comme si quelqu'un d'autre devait reprendre ton projet.",
                            "Fais des commits petits et explicites."
                        ]
                    }
                ],
                resources: [
                    {
                        title: "Git & GitHub for Beginners",
                        type: "video",
                        url: "https://www.youtube.com/embed/RGOj5yH7evk"
                    },
                    {
                        title: "Conventional Commits",
                        type: "article",
                        url: "https://www.conventionalcommits.org/fr/v1.0.0/"
                    },
                    {
                        title: "GitHub Skills",
                        type: "article",
                        url: "https://skills.github.com/"
                    }
                ]
            },
            {
                title: "5. Mission finale Orientation : plan + exécution",
                description: "Valider l'orientation avec un livrable concret qui prépare la suite du parcours.",
                order: 5,
                duration: "30 min",
                content: "Tu finalises l'orientation avec un document exécutable :\n1) ton objectif 30 jours\n2) ton parcours de cours (ordre exact)\n3) ton premier mini-projet\n4) tes critères de validation\n5) ton plan de sessions hebdo\n\nÀ la fin, tu ne 'commences pas plus tard': tu démarres immédiatement l'algorithmique avec une feuille de route déjà prête.",
                objectives: [
                    "Sortir de l'orientation avec un plan actionnable",
                    "Préparer la transition vers Algorithmique",
                    "Relier XP, cours et projets à des actions concrètes"
                ],
                exercises: [
                    {
                        title: "One-page roadmap",
                        description: "Rédige une roadmap d'une page (max 300 mots) et publie-la dans ton repo.",
                        difficulty: "Moyen",
                        solution: "Roadmap concise contenant cap, étapes, calendrier, livrables et règles de discipline.",
                        hints: [
                            "300 mots max = clarté forcée.",
                            "Le but est d'être exécutable, pas parfait."
                        ]
                    }
                ],
                resources: [
                    {
                        title: "Build projects that get you hired",
                        type: "video",
                        url: "https://www.youtube.com/embed/oC483DTjRXU"
                    },
                    {
                        title: "Roadmap.sh - Developer Roadmaps",
                        type: "article",
                        url: "https://roadmap.sh/"
                    },
                    {
                        title: "SMART goals framework",
                        type: "article",
                        url: "https://asana.com/resources/smart-goals"
                    }
                ]
            }
        ]
    }
];

module.exports = orientationCourse;
