import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Terminal, Shield, Sparkles, Trophy, HelpCircle, RefreshCw, CheckCircle2, 
    ArrowRight, BookOpen, Code2, Cpu, Zap, Lock, Eye, AlertCircle, Play, 
    ArrowLeft, Compass, Bot, Check, Layers
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

const INITIAL_PROJECT_MISSIONS = [
    {
        id: 'mission_1',
        title: 'Projet 1 : Premier Contact & Exploration Système',
        category: 'Système & Privilèges',
        level: 'Débutant',
        xpReward: 15,
        targetHost: '192.168.1.10',
        scenario: 'Vous venez d\'obtenir un accès SSH initial sur un serveur mystérieux (192.168.1.10). Votre mission est de déterminer qui vous êtes et de vérifier votre niveau d\'accès.',
        objectives: [
            'Ouvrir la console SSH',
            'Exécuter la commande whoami pour vérifier le nom d\'utilisateur'
        ],
        hint: 'Tapez la commande `whoami` et appuyez sur Entrée.',
        expectedCommand: 'whoami',
        initialOutput: '[+] Session SSH ouverte sur target@192.168.1.10\n[+] Tapez "whoami" pour vérifier votre niveau de privilège.',
        successOutput: 'root\n[🎉 SUCCÈS] Vous êtes connecté en tant que SUPER-UTILISATEUR (root) ! (+15 XP)'
    },
    {
        id: 'mission_2',
        title: 'Projet 2 : Audit & Infiltration de Fichiers Confidentiels',
        category: 'Gestion de Fichiers',
        level: 'Débutant',
        xpReward: 20,
        targetHost: '10.0.4.15',
        scenario: 'Infiltré dans le répertoire /var/secret_data/, vous devez lister les fichiers présents pour trouver les mots de passe et configurations masquées.',
        objectives: [
            'Lister l\'intégralité des fichiers du répertoire courant avec ls',
            'Repérer le fichier sensible flag.txt'
        ],
        hint: 'Tapez `ls` (ou `ls -la` pour voir les fichiers masqués).',
        expectedCommand: 'ls',
        initialOutput: '[+] Répertoire courant : /var/secret_data/\n[+] Tapez "ls" pour afficher les fichiers présents dans ce dossier.',
        successOutput: 'passwords.txt  config.env  flag.txt  firewall.log\n[🎉 SUCCÈS] Fichiers découverts ! Vous avez repéré "flag.txt". (+20 XP)'
    },
    {
        id: 'mission_3',
        title: 'Projet 3 : Extraction du Flag de Sécurité',
        category: 'Analyse & Forensics',
        level: 'Intermédiaire',
        xpReward: 25,
        targetHost: '10.0.4.15',
        scenario: 'Le fichier flag.txt contient le code de validation de l\'infiltration. Lisez son contenu pour soumettre le flag.',
        objectives: [
            'Utiliser la commande cat pour lire le fichier flag.txt',
            'Extraire la clef secrète de format FLAG{...}'
        ],
        hint: 'Exécutez `cat flag.txt` pour afficher la clef.',
        expectedCommand: 'cat flag.txt',
        initialOutput: '[+] Le fichier "flag.txt" est localisé.\n[+] Utilisez "cat flag.txt" pour extraire la clef secrète.',
        successOutput: 'FLAG{MYSTERIOUS_CLI_MASTER_2026}\n[🎉 SUCCÈS] Flag déchiffré avec succès ! (+25 XP)'
    },
    {
        id: 'mission_4',
        title: 'Projet 4 : Reconnaissance & Audit de Ports Réseau',
        category: 'Réseau & Pentest',
        level: 'Intermédiaire',
        xpReward: 30,
        targetHost: '10.0.0.5',
        scenario: 'Détectez les services web et bases de données vulnérables qui tournent sur le serveur distant 10.0.0.5.',
        objectives: [
            'Lancer un scan de ports sur la cible 10.0.0.5',
            'Identifier les services vulnérables ouverts'
        ],
        hint: 'Exécutez `scan 10.0.0.5` (ou `nmap 10.0.0.5`).',
        expectedCommand: 'scan 10.0.0.5',
        initialOutput: '[+] Préparation de l\'audit réseau sur 10.0.0.5...\n[+] Tapez "scan 10.0.0.5" pour démarrer l\'analyse.',
        successOutput: '[+] PORT 80/TCP   : OPEN (HTTP Nginx)\n[+] PORT 8080/TCP : OPEN (Spring Boot Vuln)\n[🎉 SUCCÈS] Ports ouverts identifiés ! (+30 XP)'
    },
    {
        id: 'mission_5',
        title: 'Projet 5 : Cryptanalyse & Décodage Base64',
        category: 'Cryptographie',
        level: 'Avancé',
        xpReward: 40,
        targetHost: '172.16.0.8',
        scenario: 'Une chaîne de texte chiffrée a été interceptée dans un paquet réseau. Décodez-la pour révéler le mot de passe administrateur.',
        objectives: [
            'Décoder la chaîne Base64 TXlzdGVyaW91c1Bhc3M2NzA=',
            'Récupérer le mot de passe en clair'
        ],
        hint: 'Exécutez `decode TXlzdGVyaW91c1Bhc3M2NzA=`.',
        expectedCommand: 'decode TXlzdGVyaW91c1Bhc3M2NzA=',
        initialOutput: '[+] Donnée encodée reçue : TXlzdGVyaW91c1Bhc3M2NzA=\n[+] Tapez "decode TXlzdGVyaW91c1Bhc3M2NzA=" pour la décoder.',
        successOutput: 'Mot de passe décodé : MysteriousPass670\n[🎉 SUCCÈS] Mot de passe déchiffré ! Vous maîtrisez les bases du CLI ! (+40 XP)'
    }
];

const CHEATSHEET = [
    { cmd: 'whoami', desc: 'Affiche le nom du compte utilisateur actuellement connecté.' },
    { cmd: 'ls', desc: 'Liste le contenu (fichiers et dossiers) du répertoire courant.' },
    { cmd: 'cat <fichier>', desc: 'Affiche l\'intégralité du texte contenu dans un fichier.' },
    { cmd: 'grep <mot> <fichier>', desc: 'Cherche un mot ou motif précis dans un fichier.' },
    { cmd: 'useradd <nom>', desc: 'Crée un nouvel utilisateur sur le système Linux.' },
    { cmd: 'id <nom>', desc: 'Affiche les identifiants UID/GID d\'un utilisateur.' },
    { cmd: 'chmod 777 <fichier>', desc: 'Accorde tous les droits de lecture/écriture/exécution.' },
    { cmd: 'ping <ip>', desc: 'Teste la connectivité réseau vers un serveur.' },
    { cmd: 'nmap <ip>', desc: 'Scanne et identifie les ports réseau ouverts.' },
    { cmd: 'clear', desc: 'Nettoie l\'écran du terminal.' }
];

const TerminalSimulatorPage = ({ user, setUser, setToast, API_URL }) => {
    // Mode Active: 'missions' (Cartes de Projets) vs 'sandbox' (Terminal Libre)
    const [activeTab, setActiveTab] = useState('missions');
    
    // Projets & Mission Active
    const [projectMissions, setProjectMissions] = useState(INITIAL_PROJECT_MISSIONS);
    const [activeMission, setActiveMission] = useState(null);
    
    // Terminal state
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [currentPath, setCurrentPath] = useState('/root');
    const [executingCmd, setExecutingCmd] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);
    const [completedMissions, setCompletedMissions] = useState([]);
    const [score, setScore] = useState(user?.xp || 0);

    const outputContainerRef = useRef(null);

    // Initialisation du terminal lors du lancement d'une mission ou du Sandbox
    useEffect(() => {
        if (activeTab === 'sandbox') {
            setHistory([
                { type: 'sys', text: '=== MYSTERIOUS TERMINAL SANDBOX v4.0 (Noyau Linux Universel) ===' },
                { type: 'sys', text: 'Mode d\'entraînement libre activé. Vous disposez d\'un accès root complet.' },
                { type: 'sys', text: 'Tapez n\'importe quelle commande Linux réelle (ex: whoami, ls, useradd, grep, python3, etc.).' },
                { type: 'output', text: '[+] Shell interactif prêt sur root@mysterious-lab.' }
            ]);
        } else if (activeMission) {
            setHistory([
                { type: 'sys', text: `=== ${activeMission.title.toUpperCase()} ===` },
                { type: 'sys', text: `Catégorie : ${activeMission.category} | Cible : ${activeMission.targetHost}` },
                { type: 'mission', text: `🎯 OBJECTIF DE L'OPÉRATION :\n${activeMission.scenario}` },
                { type: 'output', text: activeMission.initialOutput || '[+] Connexion réseau établie.' }
            ]);
            setShowHint(false);
        }
    }, [activeMission, activeTab]);

    // Scroll automatique du terminal
    useEffect(() => {
        if (outputContainerRef.current) {
            outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
        }
    }, [history, executingCmd]);

    // Générer une mission aléatoire via l'IA
    const fetchAIMission = async () => {
        try {
            setLoadingAI(true);
            const token = user?.token || localStorage.getItem('token');
            const res = await fetch(`${API_URL}/ai/generate-terminal-mission`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ level: 'Débutant' })
            });

            if (!res.ok) throw new Error('Échec génération IA');
            const data = await res.json();

            const newMission = {
                id: data.id || `mission_${Date.now()}`,
                title: data.title || "Mission Spéciale IA",
                category: data.commandCategory || "Cyber Hacking",
                level: "Débutant",
                xpReward: data.xpReward || 25,
                targetHost: data.targetHost || "192.168.1.42",
                scenario: data.description || "Infiltration système par IA",
                objectives: [data.description],
                hint: data.hint || "Utilisez les commandes Linux de base.",
                expectedCommand: data.expectedCommand || "whoami",
                initialOutput: data.initialOutput || "[+] Mission IA chargée.",
                successOutput: data.successOutput || "[+] Mission accomplie !"
            };

            setProjectMissions(prev => [newMission, ...prev]);
            setActiveMission(newMission);
            if (setToast) setToast({ message: 'Nouveau Projet IA généré avec succès ! ⚡', type: 'success' });
        } catch (err) {
            console.error(err);
            if (setToast) setToast({ message: 'Erreur lors de la génération IA', type: 'error' });
        } finally {
            setLoadingAI(false);
        }
    };

    const handleCommand = async (e) => {
        e.preventDefault();
        const cmd = input.trim();
        if (!cmd || executingCmd) return;

        const promptText = `root@mysterious-lab:${currentPath}# ${cmd}`;
        const newHistory = [...history, { type: 'user', text: promptText }];
        setInput('');

        const lower = cmd.toLowerCase();
        const expected = (activeMission?.expectedCommand || '').toLowerCase().trim();

        if (lower === 'clear') {
            setHistory([]);
            return;
        }

        if (lower === 'help') {
            newHistory.push({
                type: 'sys',
                text: `📚 NOYAU LINUX UNIVERSEL (Toutes commandes supportées) :
- whoami, ls, pwd, cat, cd, mkdir, touch, rm, chmod, chown
- useradd, id, grep, find, ps aux, netstat, nmap, python3, curl, ping, uname -a
- clear               : Effacer l'écran
- hint                : Obtenir un indice sur la mission actuelle`
            });
            setHistory(newHistory);
            return;
        }

        if (lower === 'hint' && activeMission) {
            setShowHint(true);
            newHistory.push({ type: 'mission', text: `💡 INDICE : ${activeMission.hint}` });
            setHistory(newHistory);
            return;
        }

        // Exécution via Noyau IA Universel Linux
        setHistory(newHistory);
        setExecutingCmd(true);

        try {
            const token = user?.token || localStorage.getItem('token');
            const res = await fetch(`${API_URL}/ai/execute-terminal-command`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    command: cmd,
                    currentPath: currentPath,
                    mission: activeMission,
                    history: newHistory
                })
            });

            if (res.ok) {
                const data = await res.json();
                
                if (data.newPath && data.newPath !== currentPath) {
                    setCurrentPath(data.newPath);
                }

                setHistory(prev => [
                    ...prev,
                    { type: 'output', text: data.output }
                ]);

                // Vérifier si la mission est accomplie (si en mode mission)
                if (activeMission) {
                    const isCompleted = data.isMissionCompleted || (expected && (lower === expected || lower.startsWith(expected)));

                    if (isCompleted && !completedMissions.includes(activeMission.id)) {
                        const gained = activeMission.xpReward || 20;
                        const newScore = score + gained;
                        setScore(newScore);
                        setCompletedMissions(prev => [...prev, activeMission.id]);

                        setHistory(prev => [
                            ...prev,
                            { type: 'success', text: data.completionMessage || activeMission.successOutput || '[+] Mission accomplie avec succès !' }
                        ]);

                        if (setUser) {
                            setUser(prev => prev ? ({ ...prev, xp: newScore }) : prev);
                        }
                        if (setToast) {
                            setToast({ message: `🎯 Projet complété ! +${gained} XP gagnés`, type: 'success' });
                        }
                    }
                }

            } else {
                throw new Error("Erreur exécution");
            }
        } catch (err) {
            console.error("Erreur commande terminal:", err);
            setHistory(prev => [
                ...prev,
                { type: 'error', text: `bash: ${cmd}: erreur d'exécution système.` }
            ]);
        } finally {
            setExecutingCmd(false);
        }
    };

    return (
        <div className="flex-1 min-w-0 bg-slate-50 dark:bg-[#0B1120] relative flex flex-col min-h-screen">
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 mt-14 lg:mt-0 pb-20">
                <div className="w-full max-w-[1750px] mx-auto space-y-6">

                    {/* Header Banner & Mode Selector */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                <Terminal size={32} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-black uppercase tracking-wider">
                                        Mysterious Lab v4.0
                                    </span>
                                    <span className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                                        <Bot size={12} /> Copilot Accompagnateur
                                    </span>
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mt-1">
                                    {activeTab === 'missions' ? 'Projets & Cartes de Missions Hacking' : 'Terminal Sandbox d\'Entraînement Libre'}
                                </h1>
                            </div>
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex items-center gap-2">
                                <Trophy size={18} className="text-amber-500" />
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Score XP</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">{score} XP</p>
                                </div>
                            </div>

                            {activeTab === 'missions' && !activeMission && (
                                <button
                                    onClick={fetchAIMission}
                                    disabled={loadingAI}
                                    className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition"
                                >
                                    <RefreshCw size={16} className={loadingAI ? 'animate-spin' : ''} />
                                    {loadingAI ? 'Génération IA...' : '⚡ Générer Projet IA'}
                                </button>
                            )}

                            {activeMission && (
                                <button
                                    onClick={() => setActiveMission(null)}
                                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl border border-slate-700 flex items-center gap-2 transition"
                                >
                                    <ArrowLeft size={16} />
                                    Retour aux Cartes
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Navigation Tabs (Missions vs Sandbox) */}
                    <div className="flex items-center gap-3 bg-slate-200/60 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 w-fit">
                        <button
                            onClick={() => { setActiveTab('missions'); }}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 ${
                                activeTab === 'missions'
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <Layers size={16} />
                            🚀 Cartes de Missions ({projectMissions.length})
                        </button>

                        <button
                            onClick={() => { setActiveTab('sandbox'); setActiveMission(null); }}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 ${
                                activeTab === 'sandbox'
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            <Terminal size={16} />
                            💻 Terminal Libre (Sandbox)
                        </button>
                    </div>

                    {/* VUE 1: GALERIE DE CARTES DE MISSIONS (Si activeTab === 'missions' ET pas de mission ouverte) */}
                    {activeTab === 'missions' && !activeMission && (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 lg:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
                                <div className="relative z-10 space-y-2">
                                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                                        <Sparkles size={16} /> PROJETS & INFILTRATION GUIDÉE PAR L'IA
                                    </div>
                                    <h2 className="text-xl lg:text-2xl font-black text-white">
                                        Choisissez un Projet et Laissez Mysterious Copilot vous Guider
                                    </h2>
                                    <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
                                        Chaque carte représente une opération complète. Lisez les objectifs, la cible et les récompenses XP. Une fois l'opération lancée, **Mysterious Copilot** vous assistera dans le terminal pour vous expliquer pas à pas quelle commande exécuter et pourquoi.
                                    </p>
                                </div>
                            </div>

                            {/* Grille des Cartes de Briefing */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {projectMissions.map((m) => {
                                    const isDone = completedMissions.includes(m.id);
                                    return (
                                        <motion.div
                                            key={m.id}
                                            whileHover={{ y: -4 }}
                                            className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-xl flex flex-col justify-between transition relative overflow-hidden ${
                                                isDone 
                                                    ? 'border-emerald-500/50 dark:border-emerald-500/30' 
                                                    : 'border-slate-200 dark:border-slate-800'
                                            }`}
                                        >
                                            {isDone && (
                                                <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                                    <Check size={12} /> Complété
                                                </div>
                                            )}

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">
                                                        {m.category}
                                                    </span>
                                                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-bold">
                                                        {m.level}
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                                                    {m.title}
                                                </h3>

                                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                                    {m.scenario}
                                                </p>

                                                {/* Objectifs de la mission */}
                                                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Objectifs du projet :</p>
                                                    <ul className="space-y-1.5">
                                                        {m.objectives.map((obj, i) => (
                                                            <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                                                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                                                <span>{obj}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-1.5 text-amber-500 font-black text-xs">
                                                    <Trophy size={16} />
                                                    <span>+{m.xpReward} XP</span>
                                                </div>

                                                <button
                                                    onClick={() => setActiveMission(m)}
                                                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition"
                                                >
                                                    <Play size={14} />
                                                    Lancer l'Opération
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* VUE 2: TERMINAL INTERACTIF (Si activeTab === 'sandbox' OU si activeMission est sélectionnée) */}
                    {(activeTab === 'sandbox' || activeMission) && (
                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">

                            {/* Console Terminal Principal (3 colonnes) */}
                            <div className="xl:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 lg:p-6 shadow-xl space-y-4">

                                {/* Header de Console */}
                                <div className="flex items-center justify-between bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 text-xs font-mono">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="text-slate-400 font-bold ml-2">bash - root@mysterious-lab:{currentPath}</span>
                                    </div>
                                    <span className="text-emerald-400 font-bold hidden sm:inline">
                                        {activeMission ? `MISSION : ${activeMission.title.substring(0, 30)}...` : 'NOYAU LINUX UNIVERSEL [LIBRE]'}
                                    </span>
                                </div>

                                {/* Banner d'Information si Mission Active */}
                                {activeMission && (
                                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-300 space-y-2">
                                        <div className="flex items-center justify-between text-emerald-400 font-bold">
                                            <span>🎯 CIBLE : {activeMission.targetHost}</span>
                                            <span className="text-amber-400">+{activeMission.xpReward} XP</span>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed">{activeMission.scenario}</p>
                                    </div>
                                )}

                                {/* Output Terminal */}
                                <div
                                    ref={outputContainerRef}
                                    className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-xs md:text-sm h-[500px] lg:h-[580px] xl:h-[620px] overflow-y-auto space-y-3 shadow-inner custom-scrollbar"
                                >
                                    {history.map((h, i) => (
                                        <div
                                            key={i}
                                            className={`leading-relaxed whitespace-pre-wrap ${
                                                h.type === 'user'
                                                    ? 'text-amber-300 font-bold'
                                                    : h.type === 'success'
                                                    ? 'text-emerald-400 font-bold bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20'
                                                    : h.type === 'error'
                                                    ? 'text-red-400 font-semibold'
                                                    : h.type === 'mission'
                                                    ? 'text-purple-300 font-semibold bg-purple-500/20 p-3.5 rounded-xl border border-purple-500/30'
                                                    : 'text-slate-300'
                                            }`}
                                        >
                                            {h.text}
                                        </div>
                                    ))}
                                    {executingCmd && (
                                        <div className="text-emerald-400 animate-pulse font-bold text-xs">
                                            ⚡ [Noyau Linux] Traitement de la commande en cours...
                                        </div>
                                    )}
                                </div>

                                {/* Formulaire de Commande */}
                                <form onSubmit={handleCommand} className="flex items-center gap-3 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl px-4 py-3">
                                    <span className="text-emerald-500 font-mono text-xs font-black shrink-0">root@mysterious-lab:{currentPath}#</span>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        disabled={executingCmd}
                                        placeholder="Tapez votre commande Linux (ex: whoami, ls, cat, grep, useradd, chmod)..."
                                        className="w-full bg-transparent text-slate-900 dark:text-white font-mono text-xs md:text-sm focus:outline-none placeholder:text-slate-400 disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={executingCmd}
                                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/30 transition shrink-0 flex items-center gap-2"
                                    >
                                        {executingCmd ? (
                                            <>
                                                <RefreshCw size={14} className="animate-spin" />
                                                Exécution...
                                            </>
                                        ) : (
                                            'Exécuter'
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Panneau de Guidage & Copilot Mentor (1 Colonne) */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                                
                                {/* Header Copilot */}
                                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                                        <Bot size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                            Mysterious Copilot
                                        </h3>
                                        <p className="text-xs text-purple-500 font-bold">Mentor Cyber & Terminal</p>
                                    </div>
                                </div>

                                {/* Guidance contextualisée */}
                                {activeMission ? (
                                    <div className="space-y-4 bg-purple-500/10 border border-purple-500/20 p-4 rounded-2xl">
                                        <div className="flex items-center gap-2 text-purple-400 text-xs font-black uppercase">
                                            <Sparkles size={14} /> Guidage de Mission Pas-à-Pas
                                        </div>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                            Pour cette mission, votre but est : <br/>
                                            <strong className="text-purple-600 dark:text-purple-300">{activeMission.hint}</strong>
                                        </p>
                                        <button
                                            onClick={() => setInput(activeMission.expectedCommand)}
                                            className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition text-center"
                                        >
                                            ⚡ Pré-remplir la commande suggérée
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl">
                                        <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase">
                                            <Compass size={14} /> Mode Bac à Sable Libre
                                        </div>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                            Testez toutes les commandes Linux réelles. Cliquez sur une suggestion ci-dessous pour l'essayer et voir son fonctionnement en direct !
                                        </p>
                                    </div>
                                )}

                                {/* Guide & Aide-Mémoire Commandes */}
                                <div className="space-y-3">
                                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Raccourcis & Commandes Courantes :</p>
                                    <div className="space-y-2.5 h-[340px] lg:h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                                        {CHEATSHEET.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => setInput(item.cmd.split(' ')[0])}
                                                className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl cursor-pointer transition group"
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-mono text-xs font-black text-indigo-600 dark:text-indigo-400 group-hover:underline">
                                                        {item.cmd}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Tester</span>
                                                </div>
                                                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </div>
                    )}

                </div>
            </div>

            <AIAssistant />
        </div>
    );
};

export default TerminalSimulatorPage;
