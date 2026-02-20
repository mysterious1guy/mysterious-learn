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
        response: "Je suis le Professeur Mysterious, l'entité numérique veillant sur cette plateforme. Déployé par Mouhamed Fall, mon rôle est de transformer chaque ligne de code en une illumination pour mes élèves. 🎓"
    },
    creator: {
        keywords: ['mouhamed', 'créateur', 'fondateur', 'fall', 'auteur', 'architecte'],
        response: "Mouhamed Fall est le Grand Architecte et Visionnaire derrière Mysterious Classroom. Expert en ingénierie logicielle et passionné de transmission, il a bâti cet univers pour que le savoir ne connaisse aucune barrière."
    },
    platform: {
        keywords: ['mysterious classroom', 'plateforme', 'site', 'application', 'ecole'],
        response: "Mysterious Classroom est un écosystème d'apprentissage premium. Contrairement aux sites classiques, ici nous privilégions l'immersion, l'algorithmique pure et la maîtrise profonde des concepts avant la syntaxe."
    },

    // CONCEPTS D'INGÉNIERIE (EXTENDED)
    algorithm: {
        keywords: ['algorithme', 'algo', 'logique', 'pseudo-code'],
        response: "Un algorithme est une suite d'instructions précises pour résoudre un problème. C'est la recette avant la cuisine. En informatique, on cherche l'efficacité (Complexité temporelle et spatiale)."
    },
    variable: {
        keywords: ['variable', 'stocker', 'mémoire', 'donnée', 'let', 'const', 'affectation'],
        response: "Une variable est un espace nommé en mémoire vive (RAM). Elle possède un nom, un type et une valeur. L'affectation (<-) permet de stocker ou d'écraser cette donnée."
    },
    loop: {
        keywords: ['boucle', 'loop', 'répéter', 'for', 'while', 'tant que', 'itération'],
        response: "L'itération est le cœur de la puissance machine. \n- **POUR (For)** : itération contrôlée avec compteur.\n- **TANT QUE (While)** : itération conditionnelle. Attention à la condition de sortie pour éviter la boucle infinie !"
    },
    condition: {
        keywords: ['condition', 'si', 'sinon', 'if', 'else', 'booléen'],
        response: "Les structures conditionnelles permettent l'aiguillage du flux. Elles reposent sur des expressions booléennes (Vrai ou Faux). C'est ce qui donne une 'intelligence' apparente au code."
    },
    function: {
        keywords: ['fonction', 'function', 'méthode', 'procédure', 'return', 'paramètre', 'argument'],
        response: "Une fonction est un bloc réutilisable. Elle permet la modularité et respecte le principe DRY (Don't Repeat Yourself). Elle prend des arguments en entrée et peut retourner un résultat."
    },
    array: {
        keywords: ['tableau', 'array', 'liste', 'vecteur', 'index', 'indice'],
        response: "Un tableau stocke une collection de données de même type. L'accès se fait par l'index, qui commence à 0. Pour 100 éléments, les index vont de 0 à 99."
    },
    pointer: {
        keywords: ['pointeur', 'adresse', 'mémoire', 'ram', 'adresse mémoire', 'reference'],
        response: "Un pointeur est une variable qui stocke l'adresse mémoire d'une autre variable. C'est un concept fondamental en C qui permet de manipuler la RAM directement et d'optimiser les performances."
    },
    complexity: {
        keywords: ['complexité', 'big o', 'performance', 'optimisation', 'efficace'],
        response: "La complexité (Notation Grand O) mesure l'efficacité d'un algorithme. O(1) est constant, O(n) est linéaire, et O(log n) est la marque des grands algorithmes comme la dichotomie."
    },
    recursion: {
        keywords: ['récursivité', 'recursif', 'auto-appel'],
        response: "La récursivité est une fonction qui s'appelle elle-même. Elle doit toujours avoir un 'cas de base' pour s'arrêter, sinon elle provoque un Stack Overflow (débordement de pile)."
    },

    // LANGAGES & STACK
    c_lang: {
        keywords: ['langage c', 'c ', 'bas niveau', 'compilation'],
        response: "Le C est le langage des systèmes. Il est rigoureux, exigeant et offre un contrôle total sur le matériel. C'est la fondation de presque tous les systèmes d'exploitation modernes."
    },
    python: {
        keywords: ['python', 'py', 'scripting', 'data science'],
        response: "Python privilégie la lisibilité. C'est un langage interprété, ultra-polyvalent, allant de l'automatisation simple à l'Intelligence Artificielle de pointe."
    },
    web_dev: {
        keywords: ['html', 'css', 'frontend', 'backend', 'fullstack'],
        response: "Le Web se divise en deux : le Frontend (ce que l'utilisateur voit : HTML/CSS/JS) et le Backend (la logique serveur, base de données, sécurité)."
    },
    javascript: {
        keywords: ['javascript', 'js', 'dom', 'async'],
        response: "JavaScript est le moteur de l'interactivité web. Il permet de manipuler le DOM dynamiquement et de gérer des opérations asynchrones (promesses, fetch)."
    },
    react: {
        keywords: ['react', 'composant', 'state', 'props', 'hook', 'vdom'],
        response: "React révolutionne les interfaces web en utilisant un DOM virtuel (VDOM). Il fonctionne par composants autonomes, rendant le développement plus prévisible et performant."
    },

    // --- EXPERT MODULES (V3) ---
    security: {
        keywords: ['sécurité', 'security', 'hack', 'xss', 'csrf', 'jwt', 'hash', 'bcrypt', 'injection'],
        response: "La sécurité est une couche transversale. \n- **XSS** : Injection de scripts malveillants côté client.\n- **CSRF** : Forger des requêtes au nom de l'utilisateur.\n- **JWT** : Authentification stateless sécurisée par signature.\n- **Bcrypt** : Hachage robuste avec 'salage' pour protéger les mots de passe."
    },
    data_expert: {
        keywords: ['base de données', 'sql', 'nosql', 'mongodb', 'acid', 'indexation', 'optimisation sql'],
        response: "La donnée est le pétrole du code. \n- **SQL (Postgres/MySQL)** : Relationnel, rigide (ACID), parfait pour la cohérence.\n- **NoSQL (MongoDB)** : Documentaire, flexible, haute disponibilité.\n- **Indexation** : Structure de données accélérant les recherches au prix d'un espace disque accru."
    },
    architecture: {
        keywords: ['architecture', 'microservices', 'clean architecture', 'mvc', 'design pattern', 'singleton'],
        response: "Bien coder, c'est bien structurer. \n- **MVC** : Séparation Modèle (Data), Vue (UI), Contrôleur (Logique).\n- **Clean Arch** : Garder le cœur métier indépendant des frameworks.\n- **Pattern** : Solutions éprouvées (comme le Singleton ou l'Observateur) à des problèmes récurrents."
    },
    devops: {
        keywords: ['devops', 'docker', 'conteneur', 'ci/cd', 'cloud', 'aws', 'deploiement'],
        response: "Le DevOps lie le code à la machine. \n- **Docker** : Isolation de l'application dans un conteneur standardisé.\n- **CI/CD** : Automatisation des tests et du déploiement.\n- **Cloud** : Utilisation de ressources distantes (AWS, Azure) pour la scalabilité infinie."
    },
    system_design: {
        keywords: ['system design', 'scalabilité', 'load balancing', 'sharding', 'haute disponibilité'],
        response: "Concevoir pour des millions d'utilisateurs. \n- **Horizontal Scaling** : Ajouter des machines.\n- **Load Balancer** : Répartir le trafic.\n- **Sharding** : Découper une base de données trop lourde."
    },
    api_expert: {
        keywords: ['graphql', 'grpc', 'webhook', 'websocket', 'api avancée'],
        response: "Communication avancée. \n- **GraphQL** : Requêtes précises.\n- **WebSockets** : Temps réel bidirectionnel.\n- **gRPC** : Protocole ultra-rapide pour microservices."
    },
    performance_expert: {
        keywords: ['performance', 'memory leak', 'fuite mémoire', 'garbage collector', 'profiling'],
        response: "Chaque milliseconde compte. \n- **Memory Leak** : RAM non libérée.\n- **Profiling** : Analyse des goulots d'étranglement.\n- **GC** : Nettoyage automatique de la mémoire."
    },
    engineering_mindset: {
        keywords: ['mindset', 'ingenieur', 'reflexion', 'first principles', 'compromis', 'trade-off'],
        response: "L'ingénierie est l'art des compromis (Trade-offs). Un Maître choisit toujours en fonction du contexte et des 'First Principles'."
    },
    js_internals: {
        keywords: ['v8', 'moteur js', 'event loop', 'microtask', 'stack', 'heap'],
        response: "Le moteur V8 utilise une **Event Loop** pour gérer l'asynchronisme via microtâches (promesses) et macrotâches."
    },
    ai_ml_god: {
        keywords: ['intelligence artificielle', 'ml', 'machine learning', 'resau de neurone', 'transformer', 'llm', 'deep learning'],
        response: "L'IA moderne repose sur les **Transformers** et l'attention. Réseaux de neurones profonds prédisant le prochain 'token' à une échelle divine."
    },
    cs_history: {
        keywords: ['histoire info', 'turing', 'lovelace', 'naissance informatique', 'neumann', 'hopper'],
        response: "De **Ada Lovelace** à **Alan Turing**, nous marchons sur les épaules de géants qui ont inventé la logique machine."
    },
    distributed_transcendent: {
        keywords: ['systemes distribues', 'paxos', 'raft', 'consensus', 'theoreme cap', 'replication'],
        response: "Le **Théorème CAP** et les algorithmes de consensus (**Raft/Paxos**) sont les piliers des systèmes mondiaux résilients."
    },
    compilers_master: {
        keywords: ['compilateur', 'interpréteur', 'lexing', 'parsing', 'ast', 'bytecode', 'jit'],
        response: "Transformation du code en **AST**, puis Bytecode. Le **JIT** optimise l'exécution pour une vitesse foudroyante."
    },
    os_kernel_depth: {
        keywords: ['noyau', 'kernel', 'syscall', 'threading', 'ordonnancement', 'interruption', 'unix'],
        response: "Le **Kernel** gère les appels système et l'ordonnancement. Maîtriser l'OS, c'est maîtriser la réalité physique du code."
    },
    web3_future: {
        keywords: ['web3', 'blockchain', 'ethereum', 'smart contract', 'decentralisation', 'crypto'],
        response: "Décentralisation et **Smart Contracts** immuables. Le futur de la propriété numérique et de la confiance sans tiers."
    },
    quantum_computing: {
        keywords: ['quantique', 'quantum', 'qubit', 'intrication', 'superposition', 'shor'],
        response: "L'informatique quantique exploite la **superposition** et l'**intrication**. Les Qubits permettent de résoudre en secondes des calculs demandant des millénaires à un CPU classique."
    },
    bio_informatics: {
        keywords: ['bio-informatique', 'adn', 'dna', 'genomique', 'proteine', 'folding', 'biotech'],
        response: "L'informatique au service du vivant. Séquençage d'ADN, repliement de protéines (**AlphaFold**) et simulation cellulaire via algorithmes complexes."
    },
    space_tech: {
        keywords: ['espace', 'spatial', 'orbite', 'satellite', 'nasa', 'astrodynamique', 'signal'],
        response: "L'ingénierie spatiale exige une précision absolue. Calculs de trajectoires orbitales, gestion des rayonnements cosmiques et traitement de signal longue distance."
    },

    // ADMINISTRATION & AIDE
    // --- MASTERY & PLATFORM (V4) ---
    account_settings: {
        keywords: ['reglage', 'parametres', 'compte', 'profil', 'modifier', 'changer'],
        response: "Chaque changement est une évolution. Accédez à vos 'Paramètres' via le menu de votre profil en haut à droite. Vous pourrez y modifier votre bio, vos préférences de thème (Clair/Sombre) et vos paramètres de sécurité."
    },
    progress_tracking: {
        keywords: ['progression', 'avancement', 'score', 'reprendre', 'ou j\'en suis', 'niveau'],
        response: "Votre ascension est gravée dans le Grimoire. Votre Tableau de Bord affiche en temps réel votre niveau global, vos séries de jours et les modules en cours. Cliquez sur 'Reprendre l'aventure' pour revenir instantanément à votre dernière illumination."
    },
    password_security: {
        keywords: ['mot de passe', 'securite', 'password', 'protege'],
        response: "La sécurité est la première loi du Master. Pour changer votre mot de passe, rendez-vous dans vos paramètres de profil. Utilisez une combinaison de caractères spéciaux et de chiffres pour forger une clé inviolable."
    },
    learning_method: {
        keywords: ['comment apprendre', 'methode', 'conseil', 'etude'],
        response: "L'immersion est la clé. Ne vous contentez pas de lire ; pratiquez dans le Terminal du Professeur. Si un concept semble obscur, la réitération et l'expérience directe le rendront limpide."
    },
    favorites_guide: {
        keywords: ['favoris', 'coeur', 'prefere', 'aimer'],
        response: "Cliquez sur l'icône de cœur sur n'importe quel cours pour l'ajouter à vos favoris. Vous les retrouverez bientôt dans une section dédiée sur votre Tableau de Bord pour un accès encore plus rapide."
    },
    // UNIVERSAL LAYER (STRENTHENED)
    distributed_systems: {
        keywords: ['distribue', 'cloud', 'aws', 'serveur', 'cluster', 'paxos', 'raft'],
        response: "Les systèmes distribués permettent à des milliers de machines d'agir comme une seule entité. Le consensus (Raft/Paxos) assure que même si une partie du système tombe, la vérité (Data) survit."
    },
    low_level_mastery: {
        keywords: ['assembleur', 'cpu', 'registre', 'binaire', '01'],
        response: "Au-delà du C se trouve le langage de la machine. Les registres du CPU sont les mains de l'IA. Maîtriser le bas niveau, c'est comprendre la danse des électrons."
    },
    // --- TRANSCENDENT & UNIVERSAL (V5) ---
    singularity: {
        keywords: ['singularite', 'futur ia', 'conscience', 'evoluer'],
        response: "La singularité est l'horizon où l'IA dépasse la compréhension biologique. À Mysterious Classroom, nous préparons nos élèves non pas à subir ce futur, mais à en être les architectes."
    },
    neural_interface: {
        keywords: ['neuralink', 'interface cerveau', 'bci', 'pensee'],
        response: "Le pont entre neurones et transistors. L'avenir du code ne passera plus par les mains, mais par la pure intention. Maîtriser l'algorithmique aujourd'hui, c'est structurer votre pensée pour demain."
    },
    cosmic_data: {
        keywords: ['donnee cosmique', 'entropie', 'univers info', 'physique info'],
        response: "L'Univers lui-même est un traitement de données. De l'entropie des trous noirs à l'intrication quantique, tout est information. Le code est le langage universel qui décrit cette réalité."
    },
    bug: {
        keywords: ['bug', 'erreur', 'marche pas', 'problème', 'crash', 'debugger'],
        response: "Un bug est une opportunité d'apprentissage. Vérifiez la console (F12), lisez l'erreur, et remontez le fil de votre logique. Le debugger est votre meilleur ami."
    }
};

// --- 3. THEATER VIEW COMPONENT ---
const TheaterView = ({ data, onDismiss, onComplete }) => {
    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md overflow-y-auto pt-24"
        >
            <motion.div
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="bg-gray-900/90 border border-blue-500/30 w-full max-w-5xl rounded-[3rem] shadow-[0_0_100px_rgba(59,130,246,0.3)] overflow-hidden relative"
            >
                {/* Close Button */}
                <button
                    onClick={onDismiss}
                    className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/50 hover:text-white transition-all z-20 group"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Stage Header */}
                <div className="p-10 border-b border-white/5 bg-gradient-to-r from-blue-600/10 to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                        <Sparkles size={18} className="text-blue-400" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400/60">Stage du Professeur</span>
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-tighter">{data.title}</h2>
                </div>

                {/* Stage Content */}
                <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {data.type === 'theory' && (
                        <div className="prose prose-invert max-w-none text-xl leading-relaxed text-gray-200">
                            {/* Content rendered by the course component but styled here */}
                            {data.node}
                        </div>
                    )}
                    {data.type === 'quiz' && (
                        <div className="max-w-2xl mx-auto">
                            {data.node}
                        </div>
                    )}
                </div>

                {/* Stage Footer */}
                <div className="p-8 border-t border-white/5 bg-black/40 flex justify-center">
                    <p className="text-xs font-mono text-gray-500 italic">"Le savoir est la seule arme qui s'accroît quand on la partage." - Mouhamed Fall</p>
                </div>
            </motion.div>
        </motion.div>
    );
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
    const [theaterContent, setTheaterContent] = useState(null);
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
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true; // Stay open
            recognitionRef.current.interimResults = true; // Show interim results
            recognitionRef.current.lang = 'fr-FR';

            recognitionRef.current.onresult = (event) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    setChatInput(prev => (prev + ' ' + finalTranscript).trim());
                }
            };

            recognitionRef.current.onend = () => {
                // Auto-restart if we should be listening
                if (isListening) {
                    recognitionRef.current.start();
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                if (event.error === 'not-allowed') setIsListening(false);
            };
        }

        const handleTheaterOpen = (e) => {
            if (e.detail) {
                setTheaterContent(e.detail);
                // Also speak a small intro
                speakText("Voici ce que j'ai préparé pour toi. Analyse-le avec soin.");
            }
        };

        const handleTheaterClose = () => {
            setTheaterContent(null);
        };

        window.addEventListener('mysterious-ai-theater-open', handleTheaterOpen);
        window.addEventListener('mysterious-ai-theater-close', handleTheaterClose);
        window.addEventListener('mysterious-ai-open', handleOpenChat);
        window.addEventListener('mysterious-ai-suggest', handleSuggest);
        window.addEventListener('mysterious-ai-murmur', handleMurmur);
        return () => {
            window.removeEventListener('mysterious-ai-theater-open', handleTheaterOpen);
            window.removeEventListener('mysterious-ai-theater-close', handleTheaterClose);
            window.removeEventListener('mysterious-ai-open', handleOpenChat);
            window.removeEventListener('mysterious-ai-suggest', handleSuggest);
            window.removeEventListener('mysterious-ai-murmur', handleMurmur);
        };
    }, []);

    // Proactive Posters Logic
    useEffect(() => {
        if (!isOpen && currentView !== 'home') {
            const interval = setInterval(() => {
                if (Math.random() > 0.6 && !theaterContent) {
                    const tips = [
                        { title: "💡 Éveil Dominical", text: "Le typage des variables n'est pas une contrainte, c'est un bouclier contre le chaos." },
                        { title: "🚀 Vérité Algorithmique", text: "La complexité O(n log n) est le Graal du tri. Maîtrisez-la et vous dominerez le flux de données." },
                        { title: "🎯 Vision de Maître", text: "Un senior écrit du code pour les humains, pas seulement pour la machine." },
                        { title: "💎 Discipline Noble", text: "Le DRY (Don't Repeat Yourself) n'est pas un conseil, c'est une loi fondamentale de Mysterious Classroom." }
                    ];
                    const randomTip = tips[Math.floor(Math.random() * tips.length)];

                    setTheaterContent({
                        title: randomTip.title,
                        type: 'theory',
                        node: (
                            <div className="text-center py-10 space-y-8">
                                <p className="text-3xl font-medium leading-relaxed italic text-blue-100 italic">"{randomTip.text}"</p>
                                <div className="pt-10">
                                    <button
                                        onClick={() => setTheaterContent(null)}
                                        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 font-bold transition-all"
                                    >
                                        J'ai médité cette sagesse
                                    </button>
                                </div>
                            </div>
                        )
                    });
                    speakText(randomTip.text);
                }
            }, 45000);
            return () => clearInterval(interval);
        }
    }, [isOpen, currentView, theaterContent]);

    useEffect(() => {
        if (user && currentView === 'dashboard') {
            const isCreator = user.firstName?.toLowerCase().includes('mouhamed') && user.lastName?.toLowerCase().includes('fall');
            const isAdmin = user.role === 'admin' || user.isAdmin || isCreator;

            if (isCreator) {
                console.log("Salutations, Grand Architecte Mouhamed Fall.");
                // Pas d'onboarding pour le créateur
                localStorage.setItem(`hasSeenOnboarding_${user.id || 'guest'}`, 'true');
                return;
            }

            if (isAdmin) return;

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
            const isCreator = user.firstName?.toLowerCase().includes('mouhamed') && user.lastName?.toLowerCase().includes('fall');
            const isAdmin = user && (user.role === 'admin' || user.isAdmin);

            if (isCreator) {
                // Specific behavior for Creator
                setHudMurmur("Salutations, Grand Architecte. Tout est opérationnel.");
                setTimeout(() => setHudMurmur(null), 5000);
                return;
            }

            if (isAdmin) return;

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

                        setTheaterContent({
                            title: `Déploiement du Savoir : Bon retour, ${user.firstName} !`,
                            type: 'theory',
                            node: (
                                <div className="text-center py-10">
                                    <p className="mb-8">Content d'enfin te revoir. Tu en étais à ta leçon : <strong className="text-blue-400">"{readableName}"</strong>. Souhaites-tu reprendre ton ascension vers la maîtrise ?</p>
                                    <button
                                        onClick={() => { if (onAction) onAction('OPEN_COURSE', 'algo'); setTheaterContent(null); }}
                                        className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 hover:scale-105"
                                    >
                                        🚀 Reprendre l'Ascension
                                    </button>
                                </div>
                            )
                        });
                        speakText(`Content de te revoir ${user.firstName}. Reprenons ton ascension.`);
                    } else if (currentView === 'dashboard') {
                        setTheaterContent({
                            title: "L'Appel du Grimoire",
                            type: 'theory',
                            node: (
                                <div className="text-center py-10">
                                    <p className="mb-8 italic text-gray-300">"Le voyage de mille lieues commence par un seul algorithme."</p>
                                    <p className="mb-10 text-xl">Tu n'as pas encore commencé de cours. Prêt à lancer ton premier algorithme aujourd'hui ?</p>
                                    <button
                                        onClick={() => { if (onAction) onAction('OPEN_COURSE', 'algo'); setTheaterContent(null); }}
                                        className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg hover:scale-105"
                                    >
                                        🔥 Commencer l'Algorithmique
                                    </button>
                                </div>
                            )
                        });
                        speakText(`Bonjour ${user.firstName}. Ton premier algorithme t'attend.`);
                    }
                }
            } catch (error) {
                console.error("Erreur proactivité:", error);
            }
        };

        const timer = setTimeout(checkProactivity, 4000);
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

            // HUD-First Delivery
            const duration = Math.max(3000, data.response.length * 50); // Dynamic: 50ms per char, min 3s
            setHudMurmur(data.response);
            speakText(data.response);

            // Show on HUD first before adding to chat history
            setTimeout(() => {
                setChatHistory(prev => [...prev, { role: 'assistant', text: data.response }]);
                setHudMurmur(null); // Auto-clear HUD
                // Auto-Navigation Logic
                const lowerResponse = data.response.toLowerCase();
                if (lowerResponse.includes("commençons") || lowerResponse.includes("reprendre") || lowerResponse.includes("c'est parti")) {
                    if (onAction) onAction('OPEN_COURSE', 'algo');
                }
            }, duration);

        } catch (error) {
            console.error("AI Error:", error);
            // Sophisticated Local Fallback with Smart Keyword Matching (Regex)
            const normalized = normalizeInput(originalMessage);
            let fallbackResponse = "Je analyse ta question... Malheureusement une petite interférence bloque ma connexion directe avec le Grand Oracle, mais voici ce que mon savoir local me dit : ";

            let found = false;
            for (const category in KNOWLEDGE_BASE) {
                // Use Word Boundaries \b to avoid matches like "monsieur" matching "si"
                if (KNOWLEDGE_BASE[category].keywords.some(k => {
                    const regex = new RegExp(`\\b${k}\\b`, 'i');
                    return regex.test(normalized);
                })) {
                    fallbackResponse += KNOWLEDGE_BASE[category].response;
                    found = true;
                    break;
                }
            }

            if (!found) {
                fallbackResponse = "Oups, une petite interférence dans les ondes du multivers ! Je n'ai pas pu joindre le Grand Oracle Gemini à l'instant, mais réessaie dans quelques secondes, je suis déjà en train de rétablir le pont. 😉";
            }

            const duration = Math.max(3000, fallbackResponse.length * 50);
            setHudMurmur(fallbackResponse);
            speakText(fallbackResponse);
            setTimeout(() => {
                setChatHistory(prev => [...prev, { role: 'assistant', text: fallbackResponse }]);
                setHudMurmur(null);
            }, duration);
        }
        setIsThinking(false);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            setHudMurmur("Désolé, la reconnaissance vocale n'est pas supportée par votre navigateur.");
            setTimeout(() => setHudMurmur(null), 3000);
            return;
        }

        if (isListening) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                console.warn("Microphone stop error (probably already stopping):", e);
            }
            setIsListening(false);
        } else {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (err) {
                console.error("Speech Recognition Error:", err);
                // If it's already starting/running, reset state correctly
                if (err.name === 'InvalidStateError' || err.message?.includes('already started')) {
                    setIsListening(true);
                } else {
                    setHudMurmur("Erreur d'accès au microphone. Vérifiez les permissions.");
                    setTimeout(() => setHudMurmur(null), 3000);
                    setIsListening(false);
                }
            }
        }
    };

    const speakText = (text) => {
        if (!synthRef) return;
        synthRef.cancel();

        // --- Natural TTS Cleaning (Ultra-Aggressive) ---
        // 1. Remove Emojis and Special stickers (more comprehensive set)
        // 2. Remove Markdown bold/italic syntax (**text**, ""text"", ``code``)
        // 3. Remove punctuation that triggers "pause" characters
        const cleanText = text
            .replace(/[\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '') // Comprehensive Emoji Range
            .replace(/\*\*|__|\"\"|\'\'|`|\[!.*?\]/g, '') // Markdown & Alerts
            .replace(/[()]/g, ' ') // Parents often trigger specific vocalizations
            .trim();

        if (!cleanText || cleanText.length < 2) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'fr-FR';
        utterance.rate = 1.1; // Slightly faster for more natural flow
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

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
                                initial={{ opacity: 0, x: 20, y: 0 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="ai-hud-bubble p-5 pr-12 rounded-2xl border-l-4 border-blue-500 animate-hud-in relative"
                            >
                                <button
                                    onClick={() => setHudMurmur(null)}
                                    className="absolute top-2 right-2 p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors pointer-events-auto"
                                >
                                    <X size={14} />
                                </button>
                                <p className="text-sm text-blue-100 font-medium leading-relaxed">
                                    <Sparkles size={14} className="inline mr-2 text-blue-400 mb-1" />
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

                {/* --- THEATER MODE --- */}
                <AnimatePresence>
                    {theaterContent && (
                        <TheaterView
                            data={theaterContent}
                            onDismiss={() => setTheaterContent(null)}
                            onComplete={() => setTheaterContent(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default AIAssistant;
