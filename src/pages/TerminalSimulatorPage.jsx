import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Sparkles, Trophy, HelpCircle, RefreshCw, CheckCircle2, ArrowRight, BookOpen, Code2, Cpu, Zap, Lock, Eye, AlertCircle } from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

const BEGINNER_MISSIONS = [
    {
        id: 'mission_1',
        title: 'Mission 1 : Premier Contact & Découverte Système',
        description: 'Vous êtes infiltré sur la machine cible `192.168.1.10`. Votre premier objectif est d\'identifier le nom de l\'utilisateur actuellement connecté avec la commande `whoami`.',
        hint: 'Tapez la commande `whoami` dans le terminal et appuyez sur Entrée.',
        expectedCommand: 'whoami',
        commandCategory: 'Système',
        xpReward: 100,
        initialOutput: '[+] Session SSH ouverte sur target@192.168.1.10\n[+] Tapez "whoami" pour vérifier votre niveau de privilège.',
        successOutput: 'root\n[🎉 SUCCÈS] Vous êtes connecté en tant que SUPER-UTILISATEUR (root) ! (+100 XP)'
    },
    {
        id: 'mission_2',
        title: 'Mission 2 : Exploration des Fichiers Secrets',
        description: 'Trouvez tous les fichiers enregistrés dans le répertoire actuel. Utilisez la commande `ls` pour lister le contenu du dossier.',
        hint: 'Tapez `ls` (ou `ls -la` pour voir les fichiers cachés).',
        expectedCommand: 'ls',
        commandCategory: 'Fichiers',
        xpReward: 120,
        initialOutput: '[+] Répertoire courant : /var/secret_data/\n[+] Tapez "ls" pour afficher les fichiers présent dans ce dossier.',
        successOutput: 'passwords.txt  config.env  flag.txt  firewall.log\n[🎉 SUCCÈS] Fichiers découverts ! Vous avez repéré "flag.txt". (+120 XP)'
    },
    {
        id: 'mission_3',
        title: 'Mission 3 : Lecture du Flag d\'Infiltration',
        description: 'Lisez le contenu du fichier confidentiel `flag.txt` à l\'aide de la commande `cat flag.txt`.',
        hint: 'Exécutez `cat flag.txt` pour afficher ce qui est écrit à l\'intérieur du fichier.',
        expectedCommand: 'cat flag.txt',
        commandCategory: 'Fichiers',
        xpReward: 150,
        initialOutput: '[+] Le fichier "flag.txt" est dans le dossier courant.\n[+] Utilisez "cat flag.txt" pour extraire la clef secrète.',
        successOutput: 'FLAG{MYSTERIOUS_CLI_MASTER_2026}\n[🎉 SUCCÈS] Flag déchiffré avec succès ! (+150 XP)'
    },
    {
        id: 'mission_4',
        title: 'Mission 4 : Scanning de Ports Distants',
        description: 'Effectuez une analyse de sécurité sur l\'adresse cible `10.0.0.5` pour détecter les ports ouverts avec `scan 10.0.0.5`.',
        hint: 'Exécutez `scan 10.0.0.5` pour effectuer l\'audit des ports.',
        expectedCommand: 'scan 10.0.0.5',
        commandCategory: 'Réseau',
        xpReward: 200,
        initialOutput: '[+] Préparation de l\'audit réseau sur 10.0.0.5...\n[+] Tapez "scan 10.0.0.5" pour démarrer l\'analyse.',
        successOutput: '[+] PORT 80/TCP   : OPEN (HTTP Nginx)\n[+] PORT 8080/TCP : OPEN (Spring Boot Vuln)\n[🎉 SUCCÈS] Ports ouverts identifiés ! (+200 XP)'
    },
    {
        id: 'mission_5',
        title: 'Mission 5 : Décryptage Base64',
        description: 'Un mot de passe intercepté est encodé en Base64 : `TXlzdGVyaW91c1Bhc3M2NzA=`. Décodez-le avec `decode TXlzdGVyaW91c1Bhc3M2NzA=`.',
        hint: 'Exécutez `decode TXlzdGVyaW91c1Bhc3M2NzA=`.',
        expectedCommand: 'decode TXlzdGVyaW91c1Bhc3M2NzA=',
        commandCategory: 'Cryptographie',
        xpReward: 250,
        initialOutput: '[+] Donnée encodée reçue : TXlzdGVyaW91c1Bhc3M2NzA=\n[+] Tapez "decode TXlzdGVyaW91c1Bhc3M2NzA=" pour la décoder.',
        successOutput: 'Mot de passe décodé : MysteriousPass670\n[🎉 SUCCÈS] Mot de passe déchiffré ! Vous maîtrisez les bases du CLI ! (+250 XP)'
    }
];

const CHEATSHEET = [
    { cmd: 'whoami', desc: 'Affiche le nom du compte utilisateur actuellement connecté.' },
    { cmd: 'ls', desc: 'Liste le contenu (fichiers et dossiers) du répertoire courant.' },
    { cmd: 'cat <fichier>', desc: 'Affiche l\'intégralité du texte contenu dans un fichier.' },
    { cmd: 'grep <texte> <fichier>', desc: 'Cherche un mot ou motif précis dans un fichier.' },
    { cmd: 'ping <ip>', desc: 'Teste si une machine distante répond sur le réseau.' },
    { cmd: 'scan <ip>', desc: 'Analyse les ports réseau ouverts d\'un serveur distant.' },
    { cmd: 'exploit <port>', desc: 'Déclenche une charge d\'expérimentation sur un port vulnérable.' },
    { cmd: 'decode <base64>', desc: 'Décode une chaîne de texte chiffrée en format Base64.' },
    { cmd: 'clear', desc: 'Nettoie l\'écran de la console du terminal.' },
    { cmd: 'help', desc: 'Affiche le guide complet des commandes du simulateur.' }
];

const TerminalSimulatorPage = ({ user, setUser, setToast, API_URL }) => {
    const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
    const [activeMission, setActiveMission] = useState(BEGINNER_MISSIONS[0]);
    const [input, setInput] = useState('');
    const [score, setScore] = useState(user?.xp || 0);
    const [history, setHistory] = useState([]);
    const [showHint, setShowHint] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);
    const [completedMissions, setCompletedMissions] = useState([]);
    const terminalEndRef = useRef(null);
    const outputContainerRef = useRef(null);

    // Initialiser l'historique lors du changement de mission
    useEffect(() => {
        if (activeMission) {
            setHistory([
                { type: 'sys', text: '=== MYSTERIOUS TERMINAL HACKING SIMULATOR v3.0 ===' },
                { type: 'sys', text: 'Bienvenue dans le centre d\'entraînement au Terminal CLI pour Débutants.' },
                { type: 'sys', text: 'Tapez "help" à tout moment pour consulter le guide complet.' },
                { type: 'mission', text: `🎯 OBJET : ${activeMission.title}\n${activeMission.description}` },
                { type: 'output', text: activeMission.initialOutput || '[+] Terminal prêt.' }
            ]);
            setShowHint(false);
        }
    }, [activeMission]);

    // Scroll interne à la console SANS faire défiler la page web globale
    useEffect(() => {
        if (outputContainerRef.current) {
            outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
        }
    }, [history]);

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

            setActiveMission(data);
            if (setToast) setToast({ message: 'Nouveau défi IA généré avec succès ! ⚡', type: 'success' });
        } catch (err) {
            console.error(err);
            // Fallback sur une mission locale
            const nextIdx = (currentMissionIndex + 1) % BEGINNER_MISSIONS.length;
            setCurrentMissionIndex(nextIdx);
            setActiveMission(BEGINNER_MISSIONS[nextIdx]);
        } finally {
            setLoadingAI(false);
        }
    };

    const handleCommand = (e) => {
        e.preventDefault();
        const cmd = input.trim();
        if (!cmd) return;

        const newHistory = [...history, { type: 'user', text: `root@mysterious-lab:~# ${cmd}` }];
        const lower = cmd.toLowerCase();
        const expected = (activeMission.expectedCommand || '').toLowerCase().trim();

        if (lower === 'help') {
            newHistory.push({
                type: 'sys',
                text: `📚 COMMANDES DE BASE DISPONIBLES :
- whoami              : Vérifier le nom d'utilisateur connecté
- ls                  : Lister les fichiers du répertoire
- cat <fichier>       : Lire un fichier (ex: cat flag.txt)
- scan <ip>           : Analyser les ports (ex: scan 192.168.1.10)
- decode <base64>     : Décoder du texte Base64
- ping <ip>           : Tester la connectivité réseau
- clear               : Effacer l'écran
- hint                : Obtenir un indice sur la mission actuelle`
            });
        } else if (lower === 'clear') {
            setHistory([]);
            setInput('');
            return;
        } else if (lower === 'hint') {
            setShowHint(true);
            newHistory.push({ type: 'mission', text: `💡 INDICE : ${activeMission.hint}` });
        } else if (lower === expected || lower.startsWith(expected)) {
            // Reussite de la mission
            newHistory.push({ type: 'success', text: activeMission.successOutput || '[+] Mission Accomplie avec succès !' });
            
            if (!completedMissions.includes(activeMission.id)) {
                const gained = activeMission.xpReward || 150;
                const newScore = score + gained;
                setScore(newScore);
                setCompletedMissions([...completedMissions, activeMission.id]);

                if (setUser) {
                    setUser(prev => prev ? ({ ...prev, xp: newScore }) : prev);
                }

                if (setToast) {
                    setToast({ message: `🎯 Mission réussie ! +${gained} XP gagnés`, type: 'success' });
                }
            }
        } else if (lower === 'whoami') {
            newHistory.push({ type: 'output', text: 'root (Super-utilisateur)' });
        } else if (lower === 'ls' || lower === 'ls -la') {
            newHistory.push({ type: 'output', text: 'passwords.txt  config.env  flag.txt  firewall.log' });
        } else if (lower.startsWith('cat ')) {
            const fileName = cmd.substring(4).trim();
            if (fileName === 'flag.txt') {
                newHistory.push({ type: 'output', text: 'FLAG{MYSTERIOUS_CLI_MASTER_2026}' });
            } else if (fileName === 'config.env') {
                newHistory.push({ type: 'output', text: 'PORT=5000\nENV=production\nSECRET=mysterious_key_99' });
            } else if (fileName === 'passwords.txt') {
                newHistory.push({ type: 'output', text: 'admin:$2a$10$e8Z.hK7q7...' });
            } else {
                newHistory.push({ type: 'error', text: `cat: ${fileName}: Aucun fichier de ce nom` });
            }
        } else if (lower.startsWith('scan ')) {
            const target = cmd.substring(5).trim();
            newHistory.push({ type: 'output', text: `[+] Audit de ${target}...\nPORT 80/TCP  : OPEN (HTTP Nginx)\nPORT 8080/TCP: OPEN (Spring Boot Vuln)` });
        } else if (lower.startsWith('decode ')) {
            const hash = cmd.substring(7).trim();
            newHistory.push({ type: 'output', text: `[+] Décodage de "${hash}" -> Output: MysteriousPass2026` });
        } else {
            newHistory.push({ type: 'error', text: `Commande "${cmd}" non reconnue. Tapez "help" ou "hint" pour être guidé.` });
        }

        setHistory(newHistory);
        setInput('');
    };

    const nextPresetMission = () => {
        const nextIdx = (currentMissionIndex + 1) % BEGINNER_MISSIONS.length;
        setCurrentMissionIndex(nextIdx);
        setActiveMission(BEGINNER_MISSIONS[nextIdx]);
    };

    return (
        <div className="flex-1 min-w-0 bg-slate-50 dark:bg-[#0B1120] relative flex flex-col min-h-screen">
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 mt-14 lg:mt-0 pb-20">
                <div className="w-full max-w-[1750px] mx-auto space-y-6">

                    {/* Header Banner */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                <Terminal size={30} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-black uppercase tracking-wider">
                                        Niveau Débutant
                                    </span>
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full text-xs font-black uppercase tracking-wider">
                                        {activeMission?.commandCategory || 'Linux & Hacking'}
                                    </span>
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mt-1">
                                    Terminal & Hacking Simulator
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

                            <button
                                onClick={fetchAIMission}
                                disabled={loadingAI}
                                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition"
                            >
                                <RefreshCw size={16} className={loadingAI ? 'animate-spin' : ''} />
                                {loadingAI ? 'Génération IA...' : '⚡ Nouveau Défi IA'}
                            </button>

                            <button
                                onClick={nextPresetMission}
                                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition"
                            >
                                <ArrowRight size={16} />
                                Mission Suivante
                            </button>
                        </div>
                    </div>

                    {/* Mission Active Card */}
                    <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 lg:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                        <div className="relative z-10 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                                    <Sparkles size={16} /> OBJECTIF COURANT
                                </div>
                                <span className="text-xs font-bold px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                                    +{activeMission?.xpReward || 150} XP à gagner
                                </span>
                            </div>

                            <h2 className="text-xl lg:text-2xl font-black text-white">
                                {activeMission?.title}
                            </h2>

                            <p className="text-slate-300 text-sm lg:text-base leading-relaxed max-w-5xl">
                                {activeMission?.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-1">
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold flex items-center gap-2 transition"
                                >
                                    <HelpCircle size={15} />
                                    {showHint ? 'Masquer l\'indice' : '💡 Besoin d\'un indice ?'}
                                </button>

                                {showHint && (
                                    <motion.span
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20"
                                    >
                                        Indice : {activeMission?.hint}
                                    </motion.span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Layout: Terminal Console + Cheatsheet */}
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">

                        {/* Terminal Console (3 Columns out of 4 on XL screens) */}
                        <div className="xl:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 lg:p-6 shadow-xl space-y-4">

                            {/* Console Header Bar */}
                            <div className="flex items-center justify-between bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 text-xs font-mono">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-slate-400 font-bold ml-2">bash - root@mysterious-lab:~</span>
                                </div>
                                <span className="text-emerald-400 font-bold hidden sm:inline">CONNECTED [SSH]</span>
                            </div>

                            {/* Terminal Window Output */}
                            <div
                                ref={outputContainerRef}
                                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-xs md:text-sm h-[520px] lg:h-[620px] xl:h-[680px] overflow-y-auto space-y-3 shadow-inner custom-scrollbar"
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
                            </div>

                            {/* Command Input Form */}
                            <form onSubmit={handleCommand} className="flex items-center gap-3 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl px-4 py-3">
                                <span className="text-emerald-500 font-mono text-xs font-black shrink-0">root@mysterious-lab:~#</span>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Tapez votre commande (ex: whoami, ls, cat flag.txt, scan 10.0.0.5)..."
                                    className="w-full bg-transparent text-slate-900 dark:text-white font-mono text-xs md:text-sm focus:outline-none placeholder:text-slate-400"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/30 transition shrink-0"
                                >
                                    Exécuter
                                </button>
                            </form>
                        </div>

                        {/* Cheatsheet Panel (1 Column out of 4) */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                        Guide Commandes
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium">Aide-mémoire Débutant</p>
                                </div>
                            </div>

                            <div className="space-y-3 h-[520px] lg:h-[620px] xl:h-[680px] overflow-y-auto pr-1 custom-scrollbar">
                                {CHEATSHEET.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setInput(item.cmd.split(' ')[0])}
                                        className="p-3.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl cursor-pointer transition group"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-mono text-xs font-black text-indigo-600 dark:text-indigo-400 group-hover:underline">
                                                {item.cmd}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Cliquer</span>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
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
