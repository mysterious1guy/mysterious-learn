import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Bot, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { safeGetUserName } from '../utils/userUtils';
import GuideAvatar from './GuideAvatar';

// --- 1. CONFIGURATION DE L'ONBOARDING ---
const ONBOARDING_STEPS = [
    {
        title: "Bienvenue, Voyageur du Code ! 🎩",
        content: "Je suis ton Guide Mystérieux. Je vais te montrer comment dompter cette plateforme créée par Mouhamed Fall.",
        target: "brand-logo",
        position: "center"
    },
    {
        title: "Ton Tableau de Bord 📊",
        content: "C'est ici que tu peux suivre ta progression, voir tes séries de jours consécutifs et reprendre tes cours en un clic.",
        target: "dashboard-hero",
        position: "bottom"
    },
    {
        title: "Le Grimoire des Savoirs 📚",
        content: "Explore nos cours premium. Chaque module est conçu pas à pas, même si tu n'as jamais touché à une ligne de code.",
        target: "courses-grid",
        position: "top"
    },
    {
        title: "Ton Compte & Favoris ❤️",
        content: "Gère ton profil, tes réglages et retrouve tes cours préférés dans ton espace personnel en haut à droite.",
        target: "user-profile",
        position: "left"
    }
];

// --- 2. NOUVELLE BASE DE CONNAISSANCES (INTELLIGENTE) ---
const KNOWLEDGE_BASE = {
    // IDENTITÉ & SYSTÈME
    identity: {
        keywords: ['qui es-tu', 'ton nom', 'tu es qui', 't\'es qui', 'présente toi', 'assistant'],
        response: "Je suis ton professeur, déployé de la part du créateur Mouhamed Fall. Je suis ici pour t'accompagner dans ton apprentissage, répondre à tes questions techniques et te guider pas à pas. 🎓"
    },
    creator: {
        keywords: ['mouhamed', 'créateur', 'fondateur', 'fall', 'auteur'],
        response: "Mouhamed Fall est le Grand Architecte de cette plateforme. Pédagogue et développeur expert, il a conçu ce cursus pour combler le fossé entre la théorie universitaire et la pratique réelle."
    },
    hello: {
        keywords: ['bonjour', 'salut', 'hello', 'hi', 'hey', 'coucou', 'yo', 'wesh'],
        response: "Salutations, jeune voyageur du code ! Prêt à apprendre quelque chose de nouveau aujourd'hui ? 🎓"
    },
    status: {
        keywords: ['ça va', 'ca va', 'forme', 'comment tu vas'],
        response: "Mes circuits tournent à 100% d'efficacité ! Je suis prêt à décoder tes questions."
    },

    // CONCEPTS FONDAMENTAUX
    variable: {
        keywords: ['variable', 'stocker', 'mémoire', 'donnée', 'let', 'const'],
        response: "Une variable est une boîte nommée dans la mémoire 📦. Elle permet de stocker une valeur (nombre, texte...) pour la réutiliser. En C, on définit le type de la boîte. En Python/JS, la boîte s'adapte."
    },
    loop: {
        keywords: ['boucle', 'loop', 'répéter', 'for', 'while', 'tant que'],
        response: "Une boucle permet de répéter une action. \n- 'For' : Quand tu sais combien de fois répéter.\n- 'While' : Quand tu répètes tant qu'une condition est vraie."
    },
    condition: {
        keywords: ['condition', 'si', 'sinon', 'if', 'else'],
        response: "Les conditions (If/Else) sont le cerveau du programme. 'Si x > 10, fais ceci, Sinon fais cela'. C'est la base de la logique."
    },
    function: {
        keywords: ['fonction', 'function', 'méthode', 'procédure', 'return'],
        response: "Une fonction est comme une recette 🍳. Tu lui donnes des ingrédients (paramètres), elle cuisine, et renvoie un plat (return). Elle évite de répéter du code."
    },
    array: {
        keywords: ['tableau', 'array', 'liste', 'vecteur'],
        response: "Un tableau est une liste de valeurs rangées dans des cases numérotées [0, 1, 2...]. Très utile pour stocker une liste d'élèves ou de scores."
    },

    // LANGAGES
    python: {
        keywords: ['python', 'py'],
        response: "Python est idéal pour débuter. Syntaxe claire, proche de l'anglais. Très utilisé en Data Science et IA. Sur ce site, on l'utilise pour l'algo avancé."
    },
    javascript: {
        keywords: ['javascript', 'js', 'web', 'script'],
        response: "JavaScript est le roi du Web. C'est le seul langage compris par les navigateurs pour rendre les pages interactives et dynamiques."
    },
    react: {
        keywords: ['react', 'hook', 'composant', 'jsx'],
        response: "React est la bibliothèque JS utilisée pour construire ce site ! Elle fonctionne par 'Composants' réutilisables (comme des LEGOs)."
    },
    c_lang: {
        keywords: ['langage c', 'pointeur', 'mémoire'],
        response: "Le C est un langage bas niveau. Il t'apprend à gérer la mémoire manuellement. C'est difficile, mais c'est la meilleure école pour comprendre l'ordinateur."
    },

    // AIDE & NAVIGATION
    bug: {
        keywords: ['bug', 'erreur', 'marche pas', 'problème', 'crash'],
        response: "Un bug ? Pas de panique. 🕵️‍♂️ \n1. Lis le message d'erreur.\n2. Vérifie tes points-virgules.\n3. Si ça persiste, vérifie la solution du cours."
    },
    account: {
        keywords: ['compte', 'profil', 'avatar', 'photo', 'changer'],
        response: "Clique sur ton avatar en haut à droite pour gérer ton profil, tes préférences et voir ta progression."
    }
};

const AIAssistant = ({ user, currentView, courseId, onAction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [chatInput, setChatInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', text: `Bonjour ${safeGetUserName(user, 'ami')} ! Je suis ton professeur, envoyé par Mouhamed Fall. Que souhaites-tu explorer aujourd'hui ?` }
    ]);
    const chatEndRef = useRef(null);
    const [dynamicKnowledge, setDynamicKnowledge] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        if (courseId) {
            const fetchKnowledge = async () => {
                try {
                    const res = await fetch(`${API_URL}/course-knowledge/${courseId}`);
                    if (res.ok) {
                        const data = await res.json();
                        setDynamicKnowledge(data);
                        setChatHistory(prev => [...prev, { role: 'assistant', text: `🎓 Mode Professeur Activé ! ${data.professorContext.substring(0, 100)}...` }]);
                    }
                } catch (error) {
                    console.error("Erreur chargement connaissances:", error);
                }
            };
            fetchKnowledge();
        } else {
            setDynamicKnowledge(null);
        }
    }, [courseId, API_URL]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isThinking]);

    useEffect(() => {
        if (user && currentView === 'dashboard') {
            const hasSeenOnboarding = localStorage.getItem(`hasSeenOnboarding_${user.id || 'guest'}`);
            if (!hasSeenOnboarding) {
                setTimeout(() => setShowOnboarding(true), 1500);
            }
        }
    }, [user, currentView]);

    const handleFinishOnboarding = () => {
        const userId = user && user.id ? user.id : 'guest';
        localStorage.setItem(`hasSeenOnboarding_${userId}`, 'true');
        setShowOnboarding(false);
    };

    // Nettoyage et correction des fautes courantes
    const normalizeInput = (text) => {
        let normalized = text.toLowerCase();
        const replacements = {
            'ki': 'qui', 'pk': 'pourquoi', 'koi': 'quoi',
            't ': 'tu ', 'c ': 'c\'est ', 'g ': 'j\'ai ',
            'slt': 'salut', 'bjr': 'bonjour', 'stp': 's\'il te plaît',
            'phyton': 'python', 'javascrip': 'javascript',
            'parametre': 'paramètres', 'reglage': 'paramètres'
        };

        Object.keys(replacements).forEach(key => {
            normalized = normalized.replace(new RegExp(`\\b${key}\\b`, 'g'), replacements[key]);
        });
        return normalized;
    };

    // --- C'EST ICI QUE LA MAGIE OPÈRE (NOUVELLE LOGIQUE) ---
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim() || isThinking) return;

        const originalMessage = chatInput.trim();
        setChatHistory(prev => [...prev, { role: 'user', text: originalMessage }]);
        setChatInput("");
        setIsThinking(true);

        const normalizedMsg = normalizeInput(originalMessage);

        // 1. Détection d'actions de navigation
        const wantsSettings = /\b(paramètres|réglages|mon compte|profil)\b/i.test(normalizedMsg);
        const wantsCourses = /\b(cours|dashboard|tableau de bord|tous les cours)\b/i.test(normalizedMsg);
        const wantsSpecificCourse = /\b(ouvrir|lancer|voir|apprendre|cours de|cours)\s+(\w+)/i.exec(normalizedMsg);

        setTimeout(() => {
            let response = "";
            let actionTriggered = false;

            // Priorité aux actions
            if (wantsSettings && onAction) {
                onAction('NAVIGATE_SETTINGS');
                response = "Bien sûr ! J'ouvre tes paramètres. ⚙️";
                actionTriggered = true;
            } else if (wantsCourses && !wantsSpecificCourse && onAction) {
                onAction('NAVIGATE_DASHBOARD');
                response = "Cap sur le tableau de bord ! 📚";
                actionTriggered = true;
            } else if (wantsSpecificCourse && onAction) {
                const courseName = wantsSpecificCourse[2];
                onAction('OPEN_COURSE', courseName);
                response = `C'est parti pour le cours de ${courseName} ! 🚀`;
                actionTriggered = true;
            }

            // Si pas d'action, recherche intelligente dans la base de connaissances
            if (!actionTriggered) {
                let bestMatch = null;
                let highestScore = 0;

                // Chercher d'abord dans la base de connaissances dynamique (cours spécifique)
                if (dynamicKnowledge) {
                    const allDynamicRules = [...(dynamicKnowledge.modules || []), ...(dynamicKnowledge.generalFaq || [])];
                    for (const rule of allDynamicRules) {
                        let score = 0;
                        if (rule.keywords) {
                            rule.keywords.forEach(keyword => {
                                if (normalizedMsg.includes(keyword)) {
                                    score += keyword.length > 3 ? 3 : 1;
                                }
                            });
                        }
                        if (score > highestScore) {
                            highestScore = score;
                            bestMatch = rule.response;
                        }
                    }
                }

                // Si pas de résultat satisfaisant, chercher dans la base par défaut
                if (highestScore < 2) {
                    Object.values(KNOWLEDGE_BASE).forEach(entry => {
                        let score = 0;
                        entry.keywords.forEach(keyword => {
                            if (normalizedMsg.includes(keyword)) {
                                score += keyword.length > 3 ? 3 : 1; // Bonus pour les mots longs
                            }
                        });
                        if (score > highestScore) {
                            highestScore = score;
                            bestMatch = entry.response;
                        }
                    });
                }

                if (highestScore > 0) {
                    response = bestMatch;
                } else {
                    // Réponses par défaut variées
                    const fallbacks = [
                        "Intéressant... mais je ne suis pas sûr de comprendre. Parle-moi de code (Python, Boucles...) ou du site ! 🤔",
                        "Mes capteurs ne détectent pas ce concept dans ma base. Essaye de reformuler ?",
                        "Je suis encore un jeune assistant. Pose-moi une question sur les cours ou Mouhamed.",
                        "Désolé, je n'ai pas la réponse. Mais tu la trouveras sûrement dans un de nos modules !"
                    ];
                    response = fallbacks[Math.floor(Math.random() * fallbacks.length)];
                }
            }

            setChatHistory(prev => [...prev, { role: 'assistant', text: response }]);
            setIsThinking(false);
        }, 1200);
    };

    return (
        <>
            {/* Onboarding Overlay */}
            <AnimatePresence>
                {showOnboarding && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 border border-blue-500/30 p-8 rounded-[2.5rem] max-w-lg w-full shadow-[0_0_50px_rgba(59,130,246,0.2)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
                                        <Sparkles size={24} />
                                    </div>
                                    <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Étape {currentStep + 1} / {ONBOARDING_STEPS.length}</span>
                                </div>

                                <h2 className="text-2xl font-black mb-4 text-white tracking-tight">{ONBOARDING_STEPS[currentStep].title}</h2>
                                <p className="text-gray-400 leading-relaxed mb-10 text-lg">{ONBOARDING_STEPS[currentStep].content}</p>

                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                                        disabled={currentStep === 0}
                                        className={`flex items-center gap-2 font-bold transition-colors ${currentStep === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        <ChevronLeft size={20} /> Précédent
                                    </button>

                                    {currentStep < ONBOARDING_STEPS.length - 1 ? (
                                        <button
                                            onClick={() => setCurrentStep(prev => prev + 1)}
                                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                                        >
                                            Suivant <ChevronRight size={20} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleFinishOnboarding}
                                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                                        >
                                            C'est parti ! 🚀
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Chat Interface */}
            <div className="fixed bottom-8 right-8 z-[90]">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <GuideAvatar isOpen={true} isThinking={isThinking} size="w-10 h-10" />
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Guide Mystérieux</h3>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">En ligne</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                                {chatHistory.map((msg, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={i}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none shadow-lg'
                                            : 'bg-gray-800 text-gray-300 rounded-bl-none border border-white/5'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                                {isThinking && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                        <div className="bg-gray-800 p-4 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSendMessage} className="p-4 bg-gray-900 border-t border-white/5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Pose ta question..."
                                        className="w-full bg-gray-800/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                                    />
                                    <button type="submit" className="absolute right-2 top-1.5 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 flex items-center justify-center transition-all relative"
                >
                    <GuideAvatar isOpen={isOpen} isThinking={isThinking} />
                    {!isOpen && (
                        <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-[#0f172a] animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    )}
                </motion.button>
            </div>
        </>
    );
};

export default AIAssistant;
