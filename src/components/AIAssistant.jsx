import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, ChevronRight, ChevronLeft, Info, HelpCircle, Sparkles, User, Brain } from 'lucide-react';

const ONBOARDING_STEPS = [
    {
        title: "Bienvenue, Voyageur du Code ! 🎩",
        content: "Je suis ton Guide Mystérieux. Je vais te montrer comment dompter cette plateforme créée par Mouhamed pour faire de toi un expert.",
        target: "brand-logo", // Selector or conceptual target
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

const KNOWLEDGE_BASE = {
    // Site General & Advanced Logic
    'site': "Mysterious Classroom est une plateforme d'apprentissage révolutionnaire créée par Mouhamed Fall. Elle est dédiée à l'apprentissage des langages de programmation au niveau universitaire, combinant théorie, exemples et exercices pratiques.",
    'mouhamed': "Mouhamed Fall est le créateur et le Grand Architecte de Mysterious Classroom. Passionné par l'enseignement, il a conçu cette plateforme pour offrir une progression universitaire claire (des bases aux concepts avancés) aux étudiants sérieux.",
    'pedagogie': "Ma méthode repose sur une explication claire et logique. Je guide l'étudiant sans donner la solution complète directement, afin de favoriser une réelle compréhension des concepts universitaires.",

    // Languages (University Standard)
    'python': "Le Python est abordé sur Mysterious Classroom pour sa polyvalence. Nous couvrons l'installation, les structures de données (listes, dictionnaires) et les modules fondamentaux.",
    'c': "Le Langage C est le pilier de la programmation système sur Mysterious Classroom. Nous approfondissons la syntaxe et la gestion de la mémoire (pointeurs).",
    'cpp': "Le C++ sur Mysterious Classroom explore l'orienté objet, les classes, l'héritage et la STL pour une performance brute.",
    'java': "Le Java est enseigné comme standard industriel, avec un focus sur la POO avancée, les interfaces et les Streams.",
    'javascript': "Le JavaScript est au cœur de l'interactivité. Nous étudions l'ES6+, l'async/await et la manipulation du DOM.",
    'html': "Le HTML5 sur Mysterious Classroom se concentre sur la sémantique et la structure rigoureuse des documents web.",
    'css': "Le CSS3 est abordé sous l'angle du design responsive, de Flexbox, Grid et des animations fluides.",
    'typescript': "Le TypeScript ajoute la sécurité du typage statique à vos projets web.",
    'react': "Le cours React explore les hooks, le pattern composant et la gestion d'état moderne.",
    'vue': "Vue.js est étudié pour sa réactivité et sa syntaxe intuitive (Composition API).",
    'svelte': "Svelte est enseigné pour son approche sans virtual DOM et sa performance optimale.",
    'php': "PHP 8 est abordé pour le développement backend moderne, notamment avec l'introduction à Laravel.",
    'rust': "Le Rust est étudié pour sa sécurité mémoire et ses concepts avancés comme l'Ownership.",
    'go': "Le Golang est présenté pour sa simplicité et son efficacité dans les systèmes distribués.",
    'swift': "Le Swift permet de bâtir des applications performantes pour l'écosystème Apple via SwiftUI.",
    'kotlin': "Le Kotlin est le standard moderne pour le développement Android natif.",
    'dart': "Dart & Flutter sont enseignés pour le développement multiplateforme haute performance.",
    'sql': "Le SQL est fondamental pour la maîtrise des données relationnelles (Postgres).",
    'mongodb': "Le NoSQL est exploré avec MongoDB pour la gestion de documents flexibles.",
    'logic': "La logique binaire et les algorithmes fondamentaux constituent la base de tout programmeur universitaire sur notre site.",

    // Advanced concepts
    'recursivite': "La récursivité est explorée en profondeur. C'est une méthode où une fonction s'appelle elle-même pour résoudre des sous-problèmes.",
    'dichotomie': "La recherche dichotomique est expliquée comme un modèle d'efficacité algorithmique (O(log n)).",
    'complexité': "Nous étudions la complexité Big O pour analyser l'efficacité des algorithmes.",

    // Support
    'connexion': "Pour accéder à l'intégralité des cours techniques, tu dois te connecter avec ton email ou ton compte Google via le formulaire central.",
    'compte': "Gère ton profil, tes réglages et tes favoris dans ton espace personnel Mysterious Classroom.",
    'favoris': "Les favoris te permettent de sauvegarder les cours universitaires que tu souhaites approfondir.",
    'politique': "La politique de confidentialité est stricte : tes données servent uniquement à ta progression et ne sont jamais partagées."
};


import GuideAvatar from './GuideAvatar';

const AIAssistant = ({ user, currentView, onAction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [chatInput, setChatInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', text: `Bonjour ${user?.firstName || 'ami'} ! Je suis ton Guide Mystérieux. Pose-moi n'importe quelle question sur le site, sur Mouhamed ou sur tes cours !` }
    ]);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isThinking]);

    useEffect(() => {
        // Only show onboarding if user is logged in AND it's the dashboard view
        if (user && currentView === 'dashboard') {
            const hasSeenOnboarding = localStorage.getItem(`hasSeenOnboarding_${user.id || 'guest'}`);
            if (!hasSeenOnboarding) {
                setTimeout(() => setShowOnboarding(true), 1500);
            }
        }
    }, [user, currentView]);

    const handleFinishOnboarding = () => {
        localStorage.setItem(`hasSeenOnboarding_${user?.id || 'guest'}`, 'true');
        setShowOnboarding(false);
    };

    const normalizeInput = (text) => {
        let normalized = text.toLowerCase();
        const replacements = {
            'ki': 'qui',
            't ': 'tu ',
            'est tu': 'es-tu',
            'es tu': 'es-tu',
            'c ': 'c\'est ',
            'pk': 'pourquoi',
            'koi': 'quoi',
            'fo': 'faut',
            'g ': 'j\'ai ',
            'chuis': 'je suis',
            'jsuis': 'je suis',
            'stp': 's\'il te plaît',
            'merci': 'merci',
            'bjr': 'bonjour',
            'slt': 'salut',
            'ouvrir': 'ouvrir',
            'parametre': 'paramètres',
            'reglage': 'paramètres',
            'setting': 'paramètres'
        };

        Object.keys(replacements).forEach(key => {
            normalized = normalized.replace(new RegExp(key, 'g'), replacements[key]);
        });
        return normalized;
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim() || isThinking) return;

        const originalMessage = chatInput.trim();
        setChatHistory(prev => [...prev, { role: 'user', text: originalMessage }]);
        setChatInput("");
        setIsThinking(true);

        const normalizedMsg = normalizeInput(originalMessage);

        // Salutations (PROMPT ULTIME)
        const isGreeting = /\b(bonjour|salut|hello|hi|hey|coucou)\b/i.test(normalizedMsg);

        // Action detection
        const wantsSettings = /\b(paramètres|réglages|mon compte|profil)\b/i.test(normalizedMsg);
        const wantsCourses = /\b(cours|dashboard|tableau de bord|tous les cours)\b/i.test(normalizedMsg);

        // Match "ouvrir cours X" or just "ouvrir X" if X is a language
        const wantsSpecificCourse = /\b(ouvrir|lancer|voir|apprendre|cours de|cours)\s+(\w+)/i.exec(normalizedMsg);

        // Simulation de réflexion
        setTimeout(() => {
            let response = "Ce contenu n'est pas encore disponible sur MYSTERIOUS CLASSROOM.";

            if (isGreeting) {
                response = "Bonjour 👋 Bienvenue sur MYSTERIOUS CLASSROOM, plateforme universitaire d’apprentissage en programmation. Comment puis-je vous aider ?";
            } else if (normalizedMsg.includes("qui es-tu") || normalizedMsg.includes("ton nom") || normalizedMsg.includes("tu es qui")) {
                response = "Je suis le Guide Mystérieux, l'assistant IA officiel de MYSTERIOUS CLASSROOM. J'ai été conçu par Mouhamed Fall pour t'accompagner dans ton apprentissage universitaire de la programmation. 🧠";
            } else {
                const keys = Object.keys(KNOWLEDGE_BASE);

                // Technical keywords
                const technicalKeywords = [
                    'variable', 'type', 'logic', 'tableau', 'fonction', 'recursivite', 'tri', 'dichotomie', 'algorithme', 'algo',
                    'python', 'c', 'cpp', 'java', 'javascript', 'html', 'css', 'typescript', 'react', 'vue', 'svelte', 'php', 'rust', 'go', 'swift', 'kotlin', 'dart', 'sql', 'mongodb'
                ];

                const isStrictlyTechnical = technicalKeywords.some(key => normalizedMsg.includes(key)) ||
                    (/\b(si|pour|tant que|boucle)\b/i.test(normalizedMsg));

                const helpKeywords = ['connexion', 'connecter', 'inscription', 'compte', 'login', 'email', 'passe', 'politique', 'confidentialité'];
                const isAskingHelp = helpKeywords.some(key => normalizedMsg.includes(key));

                if (isStrictlyTechnical && !user && !isAskingHelp) {
                    response = "Je sens une soif de savoir technique en toi ! Cependant, pour accéder aux secrets universitaires de la programmation, tu dois d'abord te connecter à ton compte. 🔐";
                } else {
                    // Find the best match in knowledge base
                    const matchedKey = keys.find(key => normalizedMsg.includes(key));
                    if (matchedKey) {
                        response = KNOWLEDGE_BASE[matchedKey];
                    }

                    // Perform actions if detected
                    if (wantsSettings && onAction) {
                        onAction('NAVIGATE_SETTINGS');
                        response = "Bien sûr ! J'ouvre tes paramètres pour toi. ⚙️";
                    } else if (wantsCourses && !wantsSpecificCourse && onAction) {
                        onAction('NAVIGATE_DASHBOARD');
                        response = "C'est parti ! Retournons à la liste des cours. 📚";
                    } else if (wantsSpecificCourse && onAction) {
                        const courseName = wantsSpecificCourse[2];
                        onAction('OPEN_COURSE', courseName);
                        // Check if course exists to adapt response? 
                        // Actually handleAIAction will handle the existence check but we can assume it for the response text
                        response = `J'ouvre le cours de ${courseName} pour toi ! Bonne étude. 🚀`;
                    }
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

            {/* Floating Button / Chat Interface */}
            <div className="fixed bottom-8 right-8 z-[90]">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Chat Header */}
                            <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center">
                                        <GuideAvatar isOpen={true} isThinking={isThinking} size="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Guide Mystérieux</h3>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">En ligne</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Chat History */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                                {chatHistory.map((msg, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={i}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-600/10'
                                            : 'bg-gray-800 text-gray-300 rounded-bl-none border border-white/5'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                                {isThinking && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-gray-800 text-gray-300 p-4 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat Input */}
                            <form onSubmit={handleSendMessage} className="p-4 bg-gray-900 border-t border-white/5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Pose ta question..."
                                        className="w-full bg-gray-800/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1.5 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button */}
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
