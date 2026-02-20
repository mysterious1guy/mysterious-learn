import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Bot, Sparkles, ChevronLeft, ChevronRight, Mic, MicOff, Volume2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { safeGetUserName } from '../utils/userUtils';
import GuideAvatar from './GuideAvatar';

// --- 1. CONFIGURATION DE L'ONBOARDING ---
const ONBOARDING_STEPS = [
    {
        title: "Bienvenue, Voyageur du Code ! 🎓",
        content: "Je suis le Professeur Mysterious. Je vais te montrer comment dompter cette plateforme créée par Mouhamed Fall.",
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
        { role: 'assistant', text: `Bonjour ${safeGetUserName(user, 'ami')} ! Je suis le Professeur Mysterious, envoyé par Mouhamed Fall. Que souhaites-tu explorer aujourd'hui ?` }
    ]);
    const chatEndRef = useRef(null);
    const [dynamicKnowledge, setDynamicKnowledge] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showPoster, setShowPoster] = useState(false);
    const [currentPoster, setCurrentPoster] = useState(null);
    const [hudPrompts, setHudPrompts] = useState(null);
    const [hudMurmur, setHudMurmur] = useState(null);
    const recognitionRef = useRef(null);
    const synthRef = window.speechSynthesis;
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

    // Handle external triggers (e.g., from Course page)
    useEffect(() => {
        const handleOpenChat = (e) => {
            setIsOpen(true);
            if (e.detail?.message) {
                setChatInput(e.detail.message);
            }
        };

        const handleSuggest = (e) => {
            if (e.detail?.text) {
                if (e.detail?.type === 'murmur') {
                    setHudMurmur(e.detail.text);
                    setTimeout(() => setHudMurmur(null), 8000);
                } else {
                    setChatHistory(prev => [...prev, {
                        role: 'assistant',
                        text: e.detail.text,
                        type: e.detail.type || 'standard'
                    }]);
                    if (e.detail?.forceOpen) setIsOpen(true);
                }
            }
        };

        const handleMurmur = (e) => {
            if (e.detail?.text) {
                setHudMurmur(e.detail.text);
                setTimeout(() => setHudMurmur(null), 8000);
            }
        };

        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'fr-FR';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setChatInput(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }

        window.addEventListener('mysterious-ai-open', handleOpenChat);
        window.addEventListener('mysterious-ai-suggest', handleSuggest);
        window.addEventListener('mysterious-ai-murmur', handleMurmur);
        return () => {
            window.removeEventListener('mysterious-ai-open', handleOpenChat);
            window.removeEventListener('mysterious-ai-suggest', handleSuggest);
            window.removeEventListener('mysterious-ai-murmur', handleMurmur);
        };
    }, []);

    // Proactive Posters Logic
    useEffect(() => {
        if (!isOpen && currentView !== 'home') {
            const interval = setInterval(() => {
                if (Math.random() > 0.7 && !showPoster) {
                    const tips = [
                        { title: "💡 Astuce de Pro", text: "Le typage des variables évite 90% des bugs en production !" },
                        { title: "🚀 Saviez-vous ?", text: "L'algorithmique est un art millénaire, bien plus vieux que l'électricité." },
                        { title: "🎯 Objectif", text: "Maîtriser les boucles permet de déléguer les tâches répétitives à la machine." }
                    ];
                    const randomTip = tips[Math.floor(Math.random() * tips.length)];
                    setCurrentPoster(randomTip);
                    setShowPoster(true);
                    setTimeout(() => setShowPoster(false), 8000);
                }
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [isOpen, currentView, showPoster]);

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

    // --- PROACTIVE LOGIC ---
    useEffect(() => {
        if (!user || isOpen) return;

        const checkProactivity = async () => {
            // 1. Check if user has a level
            if (!user.programmingLevel) {
                setChatHistory([
                    {
                        role: 'assistant',
                        text: `Salutations ! Je suis le Professeur Mysterious. Pour mieux t'aider dans ton aventure, j'ai besoin de connaître ton niveau en programmation. Quel est-il ?`,
                        type: 'level_selection'
                    }
                ]);
                setIsOpen(true);
                return;
            }

            // 2. Check for last progress
            try {
                const res = await fetch(`${API_URL}/courses/algo/progress`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.completedLessons && data.completedLessons.length > 0) {
                        const lastLessonId = data.completedLessons[data.completedLessons.length - 1];
                        const lessonNames = {
                            'algo_m_1_1': "Qu'est-ce qu'un Algorithme ?",
                            'algo_m_1_2': "Quiz : Nature de l'Algo",
                            'algo_m_1_3': "Anatomie d'un Algorithme",
                            'algo_m_2_1': "Les Variables",
                            'algo_m_2_2': "Quiz : Mutabilité",
                            'algo_m_2_3': "Types de Données",
                            'algo_m_2_4': "Pratique : Variables",
                            'algo_m_3_1': "L'Art du Choix (SI)",
                            'algo_m_3_2': "Pratique : SI",
                            'algo_m_4_1': "Boucle TANT QUE",
                            'algo_m_4_2': "Boucle POUR",
                            'algo_m_4_3': "Pratique : Boucles",
                            'algo_m_5_1': "Concept du Tableau",
                            'algo_m_5_2': "Quiz : Indexation",
                            'algo_m_5_3': "Parcourir un Tableau",
                            'algo_m_6_1': "Les Fonctions",
                            'algo_m_6_2': "Pratique : Fonctions",
                            'algo_m_7_1': "Dichotomie",
                            'algo_m_7_2': "Tri à Bulles"
                        };
                        const readableName = lessonNames[lastLessonId] || lastLessonId;

                        setHudPrompts({
                            title: `Bon retour, ${user.firstName} !`,
                            text: `Contenu d'enfin te revoir. Tu en étais à ta leçon : "${readableName}". Souhaites-tu reprendre ton ascension ?`,
                            actions: [
                                { label: "🚀 Reprendre", type: 'primary', onClick: () => { if (onAction) onAction('OPEN_COURSE', 'algo'); setHudPrompts(null); } },
                                { label: "Plus tard", type: 'secondary', onClick: () => setHudPrompts(null) }
                            ]
                        });
                    } else {
                        setHudPrompts({
                            title: `Bonjour ${user.firstName} !`,
                            text: `Tu n'as pas encore commencé de cours. Prêt à lancer ton premier algorithme aujourd'hui ?`,
                            actions: [
                                { label: "🔥 Commencer l'Algorithme", type: 'primary', onClick: () => { if (onAction) onAction('OPEN_COURSE', 'algo'); setHudPrompts(null); } },
                                { label: "Plus tard", type: 'secondary', onClick: () => setHudPrompts(null) }
                            ]
                        });
                    }
                }
            } catch (error) {
                console.error("Erreur proactivité:", error);
            }
        };

        const timer = setTimeout(checkProactivity, 3000);
        return () => clearTimeout(timer);
    }, [user, API_URL]);

    const handleLevelSelect = async (level) => {
        setIsThinking(true);
        try {
            const res = await fetch(`${API_URL}/users/level`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ level })
            });
            if (res.ok) {
                setChatHistory(prev => {
                    const next = prev.map(m => m.type === 'level_selection' ? { ...m, type: null } : m);
                    return [...next,
                    { role: 'user', text: `Je suis ${level === 'beginner' ? 'débutant' : level}.` },
                    { role: 'assistant', text: `C'est noté ! Je vais adapter ma pédagogie pour ton profil ${level}. Je te conseille de commencer par le cours d'Algorithmique pour poser des bases solides.` }
                    ];
                });
            }
        } catch (error) {
            console.error("Erreur niveau:", error);
        }
        setIsThinking(false);
    };

    const fetchWithRetry = async (url, options, retries = 3, backoff = 1000) => {
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            return await res.json();
        } catch (error) {
            if (retries > 0) {
                console.warn(`AI Retry ${4 - retries}...`);
                await new Promise(resolve => setTimeout(resolve, backoff));
                return fetchWithRetry(url, options, retries - 1, backoff * 2);
            }
            throw error;
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || isThinking) return;

        const originalMessage = chatInput.trim();
        const normalizeInput = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

        setChatHistory(prev => [...prev, { role: 'user', text: originalMessage }]);
        setChatInput("");
        setIsThinking(true);

        try {
            const data = await fetchWithRetry(`${API_URL}/ai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    message: originalMessage,
                    courseId,
                    history: chatHistory.slice(-5)
                })
            });

            setChatHistory(prev => [...prev, { role: 'assistant', text: data.response }]);
            speakText(data.response);
        } catch (error) {
            console.error("AI Error:", error);
            // Sophisticated Local Fallback
            const normalized = normalizeInput(originalMessage);
            let fallbackResponse = "Je analyse ta question... Malheureusement une petite interférence bloque ma connexion directe avec le Grand Oracle, mais voici ce que mon savoir local me dit : ";

            let found = false;
            for (const category in KNOWLEDGE_BASE) {
                if (KNOWLEDGE_BASE[category].keywords.some(k => normalized.includes(k))) {
                    fallbackResponse += KNOWLEDGE_BASE[category].response;
                    found = true;
                    break;
                }
            }

            if (!found) {
                fallbackResponse = "Oups, une petite interférence dans les ondes du multivers ! Je n'ai pas pu joindre le Grand Oracle Gemini à l'instant, mais réessaie dans quelques secondes, je suis déjà en train de rétablir le pont. 😉";
            }

            setChatHistory(prev => [...prev, { role: 'assistant', text: fallbackResponse }]);
            speakText(fallbackResponse);
        }
        setIsThinking(false);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const speakText = (text) => {
        if (!synthRef) return;
        synthRef.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        synthRef.speak(utterance);
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
                                        <h3 className="font-bold text-white text-sm">Professeur Mysterious</h3>
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
                                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                                    >
                                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none shadow-lg'
                                            : 'bg-gray-800 text-gray-300 rounded-bl-none border border-white/5'
                                            }`}>
                                            {msg.text}
                                        </div>

                                        {/* Interactive Elements for Assistant Messages */}
                                        {msg.role === 'assistant' && msg.type === 'level_selection' && (
                                            <div className="grid grid-cols-2 gap-2 mt-3 w-content">
                                                {['beginner', 'intermediate', 'advanced', 'expert'].map((lvl) => (
                                                    <button
                                                        key={lvl}
                                                        onClick={() => handleLevelSelect(lvl)}
                                                        className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 rounded-xl text-xs font-bold transition-all capitalize"
                                                    >
                                                        {lvl === 'beginner' ? 'Débutant' : lvl === 'intermediate' ? 'Moyen' : lvl === 'advanced' ? 'Avancé' : 'Expert'}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {msg.role === 'assistant' && msg.type === 'resume_prompt' && (
                                            <div className="flex gap-2 mt-3">
                                                <button
                                                    onClick={() => {
                                                        // Hide buttons
                                                        setChatHistory(prev => prev.map(m => m.id === msg.id ? { ...m, type: null } : m));
                                                        if (onAction) onAction('OPEN_COURSE', 'algo');
                                                    }}
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20"
                                                >
                                                    🚀 Reprendre
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        // Hide buttons
                                                        setChatHistory(prev => prev.map(m => m.id === msg.id ? { ...m, type: null } : m));
                                                        setChatHistory(prev => [...prev, { role: 'assistant', text: "Très bien, je reste à ta disposition si tu changes d'avis !" }]);
                                                    }}
                                                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-xl text-xs font-bold"
                                                >
                                                    Plus tard
                                                </button>
                                            </div>
                                        )}

                                        {msg.role === 'assistant' && msg.type === 'start_prompt' && (
                                            <div className="mt-3">
                                                <button
                                                    onClick={() => {
                                                        // Hide buttons
                                                        setChatHistory(prev => prev.map(m => m.id === msg.id ? { ...m, type: null } : m));
                                                        if (onAction) onAction('OPEN_COURSE', 'algo');
                                                    }}
                                                    className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                                                >
                                                    🔥 Commencer l'Algorithme
                                                </button>
                                            </div>
                                        )}
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
                                        className="w-full bg-gray-800/50 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleListening}
                                        className={`absolute left-2 top-1.5 p-2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-blue-400'}`}
                                        title="Utiliser la recherche vocale"
                                    >
                                        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                    </button>
                                    <button type="submit" className="absolute right-2 top-1.5 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Proactive Poster Markup */}
                <AnimatePresence>
                    {showPoster && currentPoster && (
                        <motion.div
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.9 }}
                            className="fixed bottom-32 right-8 w-64 bg-slate-800 border border-blue-500/50 rounded-2xl p-4 shadow-2xl z-[100] backdrop-blur-md"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2 text-blue-400">
                                    <Info size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{currentPoster.title}</span>
                                </div>
                                <button onClick={() => setShowPoster(false)} className="text-slate-500 hover:text-white">
                                    <X size={14} />
                                </button>
                            </div>
                            <p className="text-xs text-slate-200 leading-relaxed">
                                {currentPoster.text}
                            </p>
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

                {/* --- AI HUD OVERLAY --- */}
                <div className="ai-hud-container">
                    <AnimatePresence>
                        {hudMurmur && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="ai-hud-bubble p-4 rounded-2xl border-l-4 border-blue-500 animate-hud-in"
                            >
                                <p className="text-xs text-blue-100/90 italic leading-relaxed">
                                    <Sparkles size={12} className="inline mr-2 text-blue-400" />
                                    {hudMurmur}
                                </p>
                            </motion.div>
                        )}

                        {hudPrompts && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="ai-hud-bubble p-6 rounded-[2rem] shadow-2xl animate-hud-in max-w-sm"
                            >
                                <h4 className="text-white font-black mb-2 text-sm uppercase tracking-widest flex items-center gap-2">
                                    <Bot size={16} className="text-blue-400" />
                                    {hudPrompts.title}
                                </h4>
                                <p className="text-gray-300 text-xs mb-6 leading-relaxed">
                                    {hudPrompts.text}
                                </p>
                                <div className="flex gap-2">
                                    {hudPrompts.actions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={action.onClick}
                                            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${action.type === 'primary'
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500'
                                                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                                                }`}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default AIAssistant;
