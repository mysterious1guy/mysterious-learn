import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Terminal, Shield, Sparkles, Trophy, HelpCircle, RefreshCw, CheckCircle2, 
    ArrowRight, BookOpen, Code2, Cpu, Zap, Lock, Eye, AlertCircle, Play, 
    ArrowLeft, Compass, Bot, Check, Layers
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

export const ALL_PROJECT_MISSIONS = [
    {
        id: 'mission_1',
        title: 'Projet 1 : Hacker un Site Web (Infiltration & Privilèges)',
        category: 'INFILTRATION WEB',
        xpReward: 25,
        targetHost: '192.168.1.10',
        scenario: 'Infiltrez le serveur d\'hébergement d\'un site Web d\'entreprise. Votre objectif est d\'identifier le nom de l\'utilisateur actuellement connecté et de prendre le contrôle des accès root.',
        objectives: [
            'Ouvrir la console SSH du serveur Web cible',
            'Exécuter la commande whoami pour vérifier votre niveau de privilège'
        ],
        hint: 'Tapez la commande `whoami` et appuyez sur Entrée.',
        expectedCommand: 'whoami',
        initialOutput: '[+] Session SSH ouverte sur webserver@192.168.1.10\n[+] Tapez "whoami" pour vérifier votre niveau de privilège.',
        successOutput: 'root\n[🎉 SUCCÈS] Infiltration réussie ! Vous êtes connecté en tant que SUPER-UTILISATEUR (root) ! (+25 XP)'
    },
    {
        id: 'mission_2',
        title: 'Projet 2 : Hacker une Banque (Exploration & Mots de Passe)',
        category: 'INFILTRATION BANCAIRE',
        xpReward: 35,
        targetHost: '10.0.4.15',
        scenario: 'Accédez au répertoire secret des serveurs d\'une banque centrale (/var/secret_bank/). Inspectez la liste des fichiers sensibles et repérez les données d\'accès.',
        objectives: [
            'Lister l\'intégralité des fichiers secrets avec la commande ls',
            'Identifier le fichier d\'accès ultra-confidentiel flag.txt'
        ],
        hint: 'Tapez `ls` pour afficher la liste des fichiers du répertoire bancaire.',
        expectedCommand: 'ls',
        initialOutput: '[+] Répertoire courant : /var/secret_bank/\n[+] Tapez "ls" pour afficher les données bancaires confidentielles.',
        successOutput: 'accounts.db  bank_passwords.env  flag.txt  audit.log\n[🎉 SUCCÈS] Fichiers bancaires découverts ! Fichier "flag.txt" repéré. (+35 XP)'
    },
    {
        id: 'mission_3',
        title: 'Projet 3 : Vol de Données Confidentielles (Extraction du Flag)',
        category: 'EXFILTRATION CYBER',
        xpReward: 45,
        targetHost: '10.0.4.15',
        scenario: 'Extrayez le flag d\'accès secret contenu dans le fichier flag.txt pour valider l\'opération d\'exfiltration et prouver la prise de contrôle.',
        objectives: [
            'Utiliser la commande cat pour lire le fichier confidentiel flag.txt',
            'Extraire la clef secrète sous forme de FLAG{...}'
        ],
        hint: 'Exécutez `cat flag.txt` pour afficher la clef d\'accès.',
        expectedCommand: 'cat flag.txt',
        initialOutput: '[+] Le fichier "flag.txt" est verrouillé dans le système.\n[+] Utilisez "cat flag.txt" pour lire et exfiltrer la clé.',
        successOutput: 'FLAG{MYSTERIOUS_BANK_HACK_2026}\n[🎉 SUCCÈS] Données confidentielles exfiltrées avec succès ! (+45 XP)'
    },
    {
        id: 'mission_4',
        title: 'Projet 4 : Hacker un Jeu Vidéo (Audit Serveur & Scan de Ports)',
        category: 'SERVEURS DE JEU',
        xpReward: 50,
        targetHost: '10.0.0.5',
        scenario: 'Auditez les serveurs dédiés d\'un jeu vidéo multijoueur. Lancez un scan de ports réseau pour détecter les failles d\'hébergement et les portes dérobées.',
        objectives: [
            'Exécuter un scan de ports réseau sur la cible 10.0.0.5',
            'Détecter les services et failles ouvertes sur le serveur de jeu'
        ],
        hint: 'Exécutez `scan 10.0.0.5` (ou `nmap 10.0.0.5`).',
        expectedCommand: 'scan 10.0.0.5',
        initialOutput: '[+] Analyse du serveur de jeu 10.0.0.5...\n[+] Tapez "scan 10.0.0.5" pour lancer le scan de vulnérabilités.',
        successOutput: '[+] PORT 80/TCP   : OPEN (HTTP Nginx Game API)\n[+] PORT 8080/TCP : OPEN (Spring Boot Vuln)\n[🎉 SUCCÈS] Ports et failles du serveur de jeu identifiés ! (+50 XP)'
    },
    {
        id: 'mission_5',
        title: 'Projet 5 : Infiltrer un Serveur Secret & Décodage Crypto',
        category: 'CRYPTANALYSE SECRÈTE',
        xpReward: 60,
        targetHost: '172.16.0.8',
        scenario: 'Interceptez un paquet de données crypté transmis entre deux serveurs d\'élite. Décodez la chaîne Base64 pour obtenir le mot de passe maître du système.',
        objectives: [
            'Décoder le paquet d\'accès encodé en Base64 : TXlzdGVyaW91c1Bhc3M2NzA=',
            'Récupérer le mot de passe maître en clair'
        ],
        hint: 'Exécutez `decode TXlzdGVyaW91c1Bhc3M2NzA=`.',
        expectedCommand: 'decode TXlzdGVyaW91c1Bhc3M2NzA=',
        initialOutput: '[+] Paquet chiffré intercepté : TXlzdGVyaW91c1Bhc3M2NzA=\n[+] Tapez "decode TXlzdGVyaW91c1Bhc3M2NzA=" pour déchiffrer le mot de passe.',
        successOutput: 'Mot de passe maître : MysteriousPass670\n[🎉 SUCCÈS] Mot de passe maître déchiffré ! Vous êtes un maître du Terminal CLI ! (+60 XP)'
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
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const missionIdParam = searchParams.get('mission');

    const [activeMission, setActiveMission] = useState(null);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [currentPath, setCurrentPath] = useState('/root');
    const [executingCmd, setExecutingCmd] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [completedMissions, setCompletedMissions] = useState([]);
    const [score, setScore] = useState(user?.xp || 0);

    const outputContainerRef = useRef(null);
    const inputRef = useRef(null);

    // Charger la mission active si spécifiée via query param (?mission=mission_1)
    useEffect(() => {
        if (missionIdParam) {
            const found = ALL_PROJECT_MISSIONS.find(m => m.id === missionIdParam);
            if (found) {
                setActiveMission(found);
            }
        } else {
            setActiveMission(null);
        }
    }, [missionIdParam]);

    // Initialisation du terminal lors du lancement d'une mission ou du Sandbox libre
    useEffect(() => {
        if (activeMission) {
            setHistory([
                { type: 'sys', text: `=== PROJET : ${activeMission.title.toUpperCase()} ===` },
                { type: 'sys', text: `Catégorie : ${activeMission.category} | Cible : ${activeMission.targetHost}` },
                { type: 'mission', text: `🎯 OBJECTIF DE L'OPÉRATION :\n${activeMission.scenario}` },
                { type: 'output', text: activeMission.initialOutput || '[+] Session de projet ouverte sur target.' }
            ]);
            setShowHint(false);
        } else {
            setHistory([
                { type: 'sys', text: '=== MYSTERIOUS TERMINAL CLI (Salle d\'Entraînement Libre) ===' },
                { type: 'sys', text: 'Bienvenue dans la Salle d\'Entraînement au Terminal Linux.' },
                { type: 'sys', text: 'Toutes les commandes Linux réelles sont désormais supportées sans restriction (accès root).' },
                { type: 'output', text: '[+] Interprète bash prêt. Tapez une commande ou utilisez le guide de droite.' }
            ]);
        }
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }, [activeMission]);

    // Scroll automatique du terminal & maintien du focus
    useEffect(() => {
        if (outputContainerRef.current) {
            outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
        }
    }, [history, executingCmd]);

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
- hint                : Obtenir un indice sur le projet actuel`
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

                // Vérifier si le projet est accompli (si en mode projet)
                if (activeMission) {
                    const isCompleted = data.isMissionCompleted || (expected && (lower === expected || lower.startsWith(expected)));

                    if (isCompleted && !completedMissions.includes(activeMission.id)) {
                        const gained = activeMission.xpReward || 20;
                        const newScore = score + gained;
                        setScore(newScore);
                        setCompletedMissions(prev => [...prev, activeMission.id]);

                        setHistory(prev => [
                            ...prev,
                            { type: 'success', text: data.completionMessage || activeMission.successOutput || '[+] Projet accompli avec succès !' }
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
            setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
        }
    };

    return (
        <div className="flex-1 min-w-0 bg-slate-50 dark:bg-[#0B1120] relative flex flex-col min-h-screen">
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 mt-14 lg:mt-0 pb-20">
                <div className="w-full max-w-[1750px] mx-auto space-y-6">

                    {/* Header Banner */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                <Terminal size={32} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-black uppercase tracking-wider">
                                        {activeMission ? `Projet Actif : ${activeMission.level}` : 'Salle d\'Entraînement'}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                                        <Bot size={12} /> Copilot Assistant
                                    </span>
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mt-1">
                                    {activeMission ? activeMission.title : 'Terminal CLI & Noyau Linux Universel'}
                                </h1>
                            </div>
                        </div>

                        {/* Stats & Navigation */}
                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex items-center gap-2">
                                <Trophy size={18} className="text-amber-500" />
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Score XP</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">{score} XP</p>
                                </div>
                            </div>

                            {activeMission ? (
                                <button
                                    onClick={() => navigate('/projects')}
                                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition"
                                >
                                    <ArrowLeft size={16} />
                                    Retour à la Liste des Projets
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate('/projects')}
                                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition"
                                >
                                    <Layers size={16} />
                                    Voir les Cartes de Projets
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Conteneur Principal : Console Terminal + Copilot Mentor */}
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
                                    {activeMission ? `PROJET : ${activeMission.title.substring(0, 30)}...` : 'NOYAU LINUX UNIVERSEL [ENTRAÎNEMENT LIBRE]'}
                                </span>
                            </div>

                            {/* Banner d'Information si Projet Actif */}
                            {activeMission && (
                                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-300 space-y-2">
                                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                                        <span>🎯 CIBLE : {activeMission.targetHost}</span>
                                        <span className="text-amber-400">+{activeMission.xpReward} XP</span>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">{activeMission.scenario}</p>
                                </div>
                            )}

                            {/* Output Terminal & Inline Command Line (Authentic Linux Shell) */}
                            <div
                                ref={outputContainerRef}
                                onClick={() => inputRef.current?.focus()}
                                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-xs md:text-sm h-[580px] lg:h-[660px] xl:h-[720px] overflow-y-auto space-y-3 shadow-inner custom-scrollbar cursor-text relative flex flex-col justify-between"
                            >
                                <div className="space-y-3">
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
                                        <div className="text-emerald-400 animate-pulse font-bold text-xs flex items-center gap-2">
                                            <RefreshCw size={14} className="animate-spin" />
                                            <span>⚡ [Noyau Linux] Traitement de la commande en cours...</span>
                                        </div>
                                    )}
                                </div>

                                {/* Invite de Commande Intégrée au Terminal */}
                                <form onSubmit={handleCommand} className="flex items-center gap-2 pt-4 border-t border-slate-800/80 mt-4 shrink-0">
                                    <span className="text-emerald-400 font-mono text-xs md:text-sm font-black shrink-0">
                                        root@mysterious-lab:{currentPath}#
                                    </span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        disabled={executingCmd}
                                        autoFocus
                                        placeholder={executingCmd ? "Exécution en cours..." : "Tapez votre commande Linux..."}
                                        className="w-full bg-transparent text-slate-100 font-mono text-xs md:text-sm focus:outline-none placeholder:text-slate-600 disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={executingCmd}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-emerald-600/30 transition shrink-0 flex items-center gap-1.5"
                                    >
                                        {executingCmd ? (
                                            <RefreshCw size={14} className="animate-spin" />
                                        ) : (
                                            'Exécuter ↵'
                                        )}
                                    </button>
                                </form>
                            </div>
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
                                        <Sparkles size={14} /> Guidage de Projet Pas-à-Pas
                                    </div>
                                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                        Pour ce projet, votre objectif est : <br/>
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
                                        <Compass size={14} /> Salle d'Entraînement Libre
                                    </div>
                                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                        Testez toutes les commandes Linux réelles. Cliquez sur n'importe quelle suggestion pour l'essayer directement dans le terminal !
                                    </p>
                                </div>
                            )}

                            {/* Guide & Aide-Mémoire Commandes */}
                            <div className="space-y-3">
                                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Guide & Commandes Linux :</p>
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

                </div>
            </div>

            <AIAssistant />
        </div>
    );
};

export default TerminalSimulatorPage;
