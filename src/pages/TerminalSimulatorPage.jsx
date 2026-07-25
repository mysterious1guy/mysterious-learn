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
        title: 'Projet 1 : Hacker un Site Web (Identification & Privilèges)',
        category: 'INFILTRATION WEB',
        xpReward: 25,
        targetHost: '192.168.1.10',
        scenario: 'Bienvenue Agent ! Vous venez d\'ouvrir un canal SSH sur le serveur Web d\'une entreprise. Votre tout premier réflexe d\'hacker éthique est de vérifier quel utilisateur vous incarnez et si vous possédez les droits super-utilisateur (root).',
        objectives: [
            'Ouvrir la console SSH du serveur Web cible',
            'Exécuter la commande "whoami" pour identifier votre compte'
        ],
        hint: '💡 CONSEIL DÉBUTANT : Tapez `whoami` et appuyez sur Entrée pour connaître votre identité sur le système.',
        expectedCommand: 'whoami',
        initialOutput: '[+] Session SSH ouverte sur webserver@192.168.1.10\n[+] Tapez "whoami" pour vérifier votre identité.',
        successOutput: 'root\n[🎉 SUCCÈS] Infiltration réussie ! Vous êtes connecté en tant que SUPER-UTILISATEUR (root) ! (+25 XP)'
    },
    {
        id: 'mission_2',
        title: 'Projet 2 : Hacker une Banque (Exploration du Système)',
        category: 'INFILTRATION BANCAIRE',
        xpReward: 35,
        targetHost: '10.0.4.15',
        scenario: 'Maintenant que vous savez vous identifier (projet 1), vous devez explorer le serveur d\'une banque (/var/secret_bank/). Quelle commande permet de lister tous les fichiers et dossiers secrets présents dans ce répertoire ?',
        objectives: [
            'Lister l\'intégralité des fichiers secrets avec la commande "ls"',
            'Repérer le fichier d\'accès ultra-confidentiel flag.txt'
        ],
        hint: '💡 CONSEIL DÉBUTANT : La commande `ls` (pour List) affiche tous les fichiers du dossier courant.',
        expectedCommand: 'ls',
        initialOutput: '[+] Répertoire courant : /var/secret_bank/\n[+] Tapez "ls" pour afficher le contenu du répertoire bancaire.',
        successOutput: 'accounts.db  bank_passwords.env  flag.txt  audit.log\n[🎉 SUCCÈS] Fichiers bancaires découverts ! Le fichier "flag.txt" a été repéré. (+35 XP)'
    },
    {
        id: 'mission_3',
        title: 'Projet 3 : Vol de Données Confidentielles (Lecture avec cat)',
        category: 'EXFILTRATION CYBER',
        xpReward: 45,
        targetHost: '10.0.4.15',
        scenario: 'Dans le projet précédent, votre commande "ls" a révélé l\'existence du fichier secret "flag.txt". Utilisez à présent la commande de lecture de texte "cat" pour afficher et exfiltrer la clé secrète.',
        objectives: [
            'Utiliser la commande "cat flag.txt" pour lire le fichier repéré au projet 2',
            'Extraire le flag d\'accès sous la forme FLAG{...}'
        ],
        hint: '💡 CONSEIL DÉBUTANT : La commande `cat <nom_du_fichier>` permet de lire directement le contenu d\'un fichier texte.',
        expectedCommand: 'cat flag.txt',
        initialOutput: '[+] Le fichier "flag.txt" est présent dans le répertoire.\n[+] Utilisez "cat flag.txt" pour lire et exfiltrer la clé.',
        successOutput: 'FLAG{MYSTERIOUS_BANK_HACK_2026}\n[🎉 SUCCÈS] Données bancaires confidentielles exfiltrées avec succès ! (+45 XP)'
    },
    {
        id: 'mission_4',
        title: 'Projet 4 : Hacker un Jeu Vidéo (Audit & Connexion Réseau)',
        category: 'SERVEURS DE JEU',
        xpReward: 50,
        targetHost: '10.0.0.5',
        scenario: 'Vous devez auditer les serveurs d\'un jeu vidéo. Avant d\'explorer des fichiers (projet 2 & 3), vous devez scanner le réseau pour vérifier quels ports et services sont ouverts sur la cible 10.0.0.5.',
        objectives: [
            'Exécuter un scan de ports sur le serveur hôte 10.0.0.5',
            'Découvrir les failles et portes dérobées actives'
        ],
        hint: '💡 CONSEIL DÉBUTANT : Tapez `scan 10.0.0.5` pour analyser les ports réseau ouverts sur la machine cible.',
        expectedCommand: 'scan 10.0.0.5',
        initialOutput: '[+] Connexion réseau établie vers le serveur de jeu 10.0.0.5...\n[+] Tapez "scan 10.0.0.5" pour analyser les ports ouverts.',
        successOutput: '[+] PORT 80/TCP   : OPEN (HTTP Nginx Game API)\n[+] PORT 8080/TCP : OPEN (Spring Boot Vuln)\n[🎉 SUCCÈS] Ports et failles du serveur de jeu identifiés ! (+50 XP)'
    },
    {
        id: 'mission_5',
        title: 'Projet 5 : Infiltrer un Serveur Secret & Décodage Crypto',
        category: 'CRYPTANALYSE SECRÈTE',
        xpReward: 60,
        targetHost: '172.16.0.8',
        scenario: 'Vous avez intercepté un message chiffré transmis en Base64. Pour ouvrir les accès du système d\'élite, utilisez la commande "decode" suivie du mot de passe encodé.',
        objectives: [
            'Décoder la chaîne chiffrée Base64 : TXlzdGVyaW91c1Bhc3M2NzA=',
            'Récupérer le mot de passe maître en clair'
        ],
        hint: '💡 CONSEIL DÉBUTANT : Tapez `decode TXlzdGVyaW91c1Bhc3M2NzA=` pour déchiffrer le mot de passe secret.',
        expectedCommand: 'decode TXlzdGVyaW91c1Bhc3M2NzA=',
        initialOutput: '[+] Paquet chiffré intercepté : TXlzdGVyaW91c1Bhc3M2NzA=\n[+] Tapez "decode TXlzdGVyaW91c1Bhc3M2NzA=" pour déchiffrer le mot de passe.',
        successOutput: 'Mot de passe maître : MysteriousPass670\n[🎉 SUCCÈS] Mot de passe maître déchiffré ! (+60 XP)'
    },
    {
        id: 'mission_6',
        title: 'Projet 6 : Infiltration d\'un Serveur VNC (Vérification Ping)',
        category: 'PRISE DE CONTRÔLE A DISTANCE',
        xpReward: 70,
        targetHost: '192.168.1.50',
        scenario: 'Rappelez-vous le projet 4 (analyse réseau). Pour vérifier si un serveur distant répond avant une attaque VNC, on envoie des paquets ICMP avec la commande "ping".',
        objectives: [
            'Tester la réactivité du serveur 192.168.1.50 avec la commande "ping"',
            'Confirmer l\'ouverture du canal d\'accès à distance'
        ],
        hint: '💡 CONSEIL DÉBUTANT : Tapez `ping 192.168.1.50` pour envoyer des requêtes de vérification réseau.',
        expectedCommand: 'ping 192.168.1.50',
        initialOutput: '[+] Analyse de la joignabilité de l\'hôte VNC 192.168.1.50...\n[+] Tapez "ping 192.168.1.50" pour envoyer les paquets de test.',
        successOutput: '64 bytes from 192.168.1.50: icmp_seq=1 ttl=64 time=0.42 ms\n[🎉 SUCCÈS] Canal VNC réactif ! Le serveur répond aux pings ! (+70 XP)'
    },
    {
        id: 'mission_7',
        title: 'Projet 7 : Injection SQL & Recherche Furtive (Commande grep)',
        category: 'EXPLOITATION SQL',
        xpReward: 80,
        targetHost: '10.0.8.20',
        scenario: 'Vous avez appris à utiliser "cat" (projet 3) pour lire des fichiers. Mais dans un grand fichier comme db_config.php, la commande "grep" permet de filtrer uniquement la ligne contenant le mot "admin" !',
        objectives: [
            'Utiliser "grep admin db_config.php" pour chercher le mot admin dans le fichier',
            'Isoler immédiatement les identifiants administrateurs'
        ],
        hint: '💡 CONSEIL DÉBUTANT : La commande `grep <recherche> <fichier>` extrait les lignes contenant le mot recherché.',
        expectedCommand: 'grep admin db_config.php',
        initialOutput: '[+] Fichier de configuration "db_config.php" accessible sur le serveur SQL.\n[+] Tapez "grep admin db_config.php" pour filtrer le mot de passe admin.',
        successOutput: 'DB_USER=admin DB_PASS=SuperSecretSQLPass2026!\n[🎉 SUCCÈS] Identifiants SQL Administrateur exfiltrés grâce à grep ! (+80 XP)'
    },
    {
        id: 'mission_8',
        title: 'Projet 8 : Keylogger Stealth & Relecture de Logs',
        category: 'CYBER-ANALYSE & STEALTH',
        xpReward: 90,
        targetHost: '172.20.1.1',
        scenario: 'Une sonde enregistre les frappes au clavier dans un fichier journal "keylog.txt". Réutilisez la commande "cat" (découverte au projet 3) pour lire et exfiltrer les dernières données saisies par la cible.',
        objectives: [
            'Réutiliser la commande "cat keylog.txt" pour inspecter les frappes capturées',
            'Valider la saisie de la clé confidentielle'
        ],
        hint: '💡 CONSEIL DÉBUTANT : Réutilisez `cat keylog.txt` (comme au projet 3) pour afficher le journal de frappes.',
        expectedCommand: 'cat keylog.txt',
        initialOutput: '[+] Sonde furtive active. Journal "keylog.txt" prêt à être relu.\n[+] Tapez "cat keylog.txt" pour lire les frappes capturées.',
        successOutput: '[LOG] User: chief_officer | KeyTyped: FLAG{STEALTH_KEYLOG_CAPTURED}\n[🎉 SUCCÈS] Frappes réseau lues et analysées avec succès ! (+90 XP)'
    },
    {
        id: 'mission_9',
        title: 'Projet 9 : Hijacking Botnet & Permissions Linux (chmod)',
        category: 'CYBERDÉFENSE & BOTNET',
        xpReward: 100,
        targetHost: '10.100.0.1',
        scenario: 'Pour neutraliser un réseau Botnet, vous devez exécuter un script de pare-feu "firewall.sh". Sous Linux, un fichier doit être rendu exécutable avec la commande "chmod 777".',
        objectives: [
            'Modifier les droits du script avec la commande "chmod 777 firewall.sh"',
            'Activer la neutralisation du flux malveillant'
        ],
        hint: '💡 CONSEIL DÉBUTANT : La commande `chmod 777 <fichier>` accorde tous les droits d\'exécution à un script.',
        expectedCommand: 'chmod 777 firewall.sh',
        initialOutput: '[+] Le script de secours "firewall.sh" est verrouillé en lecture seule.\n[+] Tapez "chmod 777 firewall.sh" pour lui accorder les droits d\'exécution.',
        successOutput: 'Permissions mises à jour : -rwxrwxrwx 1 root root firewall.sh\n[🎉 SUCCÈS] Le pare-feu a neutralisé le réseau Botnet ! (+100 XP)'
    },
    {
        id: 'mission_10',
        title: 'Projet 10 : Infiltration Satellite & Audit Root Final (Commande id)',
        category: 'INFILTRATION SPATIALE',
        xpReward: 120,
        targetHost: 'SAT-ORBIT-99',
        scenario: 'Félicitations pour votre parcours ! Pour valider la mission ultime, rappelez-vous du projet 1 (whoami). Sur les serveurs haute sécurité, la commande "id root" confirme formellement l\'UID zero du super-utilisateur.',
        objectives: [
            'Exécuter la commande "id root" pour confirmer l\'accréditation UID 0',
            'Valider l\'obtention du rang de Maître de Mysterious Classroom'
        ],
        hint: '💡 CONSEIL DÉBUTANT : Tapez `id root` pour afficher l\'identifiant UID 0 (root) du système.',
        expectedCommand: 'id root',
        initialOutput: '[+] Liaison montante vers le relais satellite SAT-ORBIT-99 établie.\n[+] Tapez "id root" pour valider l\'accréditation finale UID zéro.',
        successOutput: 'uid=0(root) gid=0(root) groups=0(root),27(sudo)\n[🎉 SUCCÈS ULTIME] Accréditation Spatiale Validée ! Vous avez accompli les 10 Projets et maîtrisez les bases du Terminal Linux ! (+120 XP)'
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

    // Nom d'utilisateur dynamique selon l'élève connecté
    const displayUsername = useMemo(() => {
        if (!user) return 'agent';
        if (user.username) return user.username.toLowerCase();
        if (user.email) return user.email.split('@')[0].toLowerCase();
        if (user.name) return user.name.toLowerCase().replace(/\s+/g, '');
        return 'agent';
    }, [user]);

    const userHomePath = `/home/${displayUsername}`;
    const [activeMission, setActiveMission] = useState(null);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [currentPath, setCurrentPath] = useState(userHomePath);
    const [executingCmd, setExecutingCmd] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [completedMissions, setCompletedMissions] = useState([]);
    const [score, setScore] = useState(user?.xp || 0);

    const outputContainerRef = useRef(null);
    const inputRef = useRef(null);

    // Formater le chemin pour afficher ~ pour le répertoire home
    const formattedPath = useMemo(() => {
        if (!currentPath) return '~';
        if (currentPath === userHomePath || currentPath === `${userHomePath}/`) return '~';
        if (currentPath.startsWith(`${userHomePath}/`)) {
            return currentPath.replace(userHomePath, '~');
        }
        return currentPath;
    }, [currentPath, userHomePath]);

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

    // Initialisation & Persistance de l'historique du terminal
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
            // Mode entraînement libre : charger l'historique sauvegardé dans localStorage
            const savedHistoryKey = `terminal_history_${displayUsername}`;
            let loadedHistory = null;
            try {
                const stored = localStorage.getItem(savedHistoryKey);
                if (stored) {
                    loadedHistory = JSON.parse(stored);
                }
            } catch (e) {}

            if (loadedHistory && Array.isArray(loadedHistory) && loadedHistory.length > 0) {
                setHistory(loadedHistory);
            } else {
                setHistory([
                    { type: 'sys', text: '=== MYSTERIOUS TERMINAL CLI (Console Officielle) ===' },
                    { type: 'sys', text: `Bienvenue ${displayUsername} ! Répertoire personnel : ${userHomePath}` },
                    { type: 'sys', text: 'Toutes les commandes Linux réelles sont supportées. Votre historique est sauvegardé.' },
                    { type: 'output', text: '[+] Interprète bash prêt. Tapez votre commande...' }
                ]);
            }
        }
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }, [activeMission, displayUsername, userHomePath]);

    // Sauvegarder l'historique dans localStorage après chaque modification
    useEffect(() => {
        if (!activeMission && history.length > 0) {
            try {
                const savedHistoryKey = `terminal_history_${displayUsername}`;
                // Conserver les 120 dernières entrées pour des performances optimales
                localStorage.setItem(savedHistoryKey, JSON.stringify(history.slice(-120)));
            } catch (e) {}
        }
    }, [history, activeMission, displayUsername]);

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

        const promptText = `${displayUsername}@MYSTERIOUS:${formattedPath}$ ${cmd}`;
        const newHistory = [...history, { type: 'user', text: promptText }];
        setInput('');

        const lower = cmd.toLowerCase();
        const expected = (activeMission?.expectedCommand || '').toLowerCase().trim();

        if (lower === 'clear') {
            setHistory([]);
            if (!activeMission) {
                try {
                    localStorage.removeItem(`terminal_history_${displayUsername}`);
                } catch (e) {}
            }
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

                        const updatedCompleted = [...completedMissions, activeMission.id];
                        setCompletedMissions(updatedCompleted);
                        try {
                            localStorage.setItem('completed_missions', JSON.stringify(updatedCompleted));
                        } catch (e) {}

                        setHistory(prev => [
                            ...prev,
                            { type: 'success', text: data.completionMessage || activeMission.successOutput || '[+] Projet accompli avec succès !' }
                        ]);

                        if (setUser) {
                            setUser(prev => {
                                if (!prev) return prev;
                                const quests = prev.completedQuests || [];
                                const hasQuest = quests.some(q => (typeof q === 'string' ? q : q.projectId) === activeMission.id);
                                return {
                                    ...prev,
                                    xp: newScore,
                                    completedQuests: hasQuest ? quests : [...quests, { projectId: activeMission.id, completedAt: new Date() }]
                                };
                            });
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
        <div className="flex-1 min-w-0 bg-slate-900 dark:bg-[#070C14] relative flex flex-col min-h-screen">
            <div className="flex-1 p-2 sm:p-4 lg:p-6 pb-12">
                <div className="w-full max-w-full mx-auto space-y-4">

                    {/* Header Minimaliste du Projet / Mode libre */}
                    <div className="bg-slate-900/90 dark:bg-slate-900 rounded-2xl p-4 lg:p-5 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                                <Terminal size={24} />
                            </div>
                            <div>
                                <h1 className="text-lg lg:text-xl font-black text-white flex items-center gap-2">
                                    {activeMission ? activeMission.title : 'Terminal Linux CLI (Console Officielle)'}
                                </h1>
                                {activeMission && (
                                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                                        🎯 Mission : {activeMission.scenario}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                            <div className="px-3 py-2 bg-slate-800/80 rounded-xl border border-slate-700/50 flex items-center gap-2">
                                <Trophy size={16} className="text-amber-400" />
                                <span className="text-xs font-black text-white">{score} XP</span>
                            </div>

                            <button
                                onClick={() => navigate('/projects')}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center gap-1.5"
                            >
                                <ArrowLeft size={14} />
                                Cartes de Projets
                            </button>
                        </div>
                    </div>

                    {/* Console Terminal Linux Authentique (100% Plein Écran) */}
                    <div className="w-full bg-[#06141d] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono">

                        {/* Top Bar macOS / Linux Native */}
                        <div className="bg-[#0b1d28] px-4 py-3 border-b border-slate-800/80 flex items-center justify-between select-none">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 cursor-pointer" onClick={() => navigate('/')}></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50"></div>
                            </div>
                            <div className="text-xs font-bold text-slate-300 tracking-wide font-mono flex items-center gap-2">
                                <span>{displayUsername}@MYSTERIOUS: ~</span>
                            </div>
                            <div className="w-12"></div>
                        </div>

                        {/* Écran Terminal et Invite de Commande Directe (Sans boutons séparés) */}
                        <div
                            ref={outputContainerRef}
                            onClick={() => inputRef.current?.focus()}
                            className="p-4 sm:p-6 text-xs sm:text-sm md:text-base h-[680px] lg:h-[760px] overflow-y-auto custom-scrollbar cursor-text space-y-2 leading-relaxed text-slate-200"
                            style={{ backgroundColor: '#06141d' }}
                        >
                            {/* Historique des lignes de commande */}
                            {history.map((h, i) => (
                                <div key={i} className="whitespace-pre-wrap">
                                    {h.type === 'user' ? (
                                        <div className="flex items-center gap-2 py-0.5">
                                            <span className="text-[#eab308] font-bold">{displayUsername}@MYSTERIOUS</span>
                                            <span className="text-slate-400">:</span>
                                            <span className="text-[#38bdf8] font-bold">{formattedPath}</span>
                                            <span className="text-white font-bold">$</span>
                                            <span className="text-white font-bold ml-1">{h.text.split('$ ').pop() || h.text}</span>
                                        </div>
                                    ) : h.type === 'success' ? (
                                        <div className="text-emerald-400 font-bold py-1 bg-emerald-500/10 px-3 rounded-lg border border-emerald-500/20 my-1">
                                            {h.text}
                                        </div>
                                    ) : h.type === 'error' ? (
                                        <div className="text-red-400 font-medium py-0.5">
                                            {h.text}
                                        </div>
                                    ) : h.type === 'mission' ? (
                                        <div className="text-purple-300 font-semibold py-1 bg-purple-500/10 px-3 rounded-lg border border-purple-500/20 my-1">
                                            {h.text}
                                        </div>
                                    ) : (
                                        <div className="text-slate-300 font-mono py-0.5">
                                            {h.text}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {executingCmd && (
                                <div className="text-emerald-400 animate-pulse font-bold text-xs flex items-center gap-2 py-1">
                                    <RefreshCw size={14} className="animate-spin" />
                                    <span>[Noyau Linux] Traitement de la commande...</span>
                                </div>
                            )}

                            {/* Ligne d'invité de commande active et fluide (Directement intégrée au flux du texte) */}
                            <form onSubmit={handleCommand} className="flex items-center gap-1.5 pt-1">
                                <span className="text-[#eab308] font-bold shrink-0">{displayUsername}@MYSTERIOUS</span>
                                <span className="text-slate-400 font-bold shrink-0">:</span>
                                <span className="text-[#38bdf8] font-bold shrink-0">{formattedPath}</span>
                                <span className="text-white font-bold shrink-0">$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={executingCmd}
                                    autoFocus
                                    className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm md:text-base focus:outline-none border-none p-0 m-0 caret-emerald-400 disabled:opacity-50"
                                />
                            </form>
                        </div>

                    </div>

                </div>
            </div>

            <AIAssistant />
        </div>
    );
};

export default TerminalSimulatorPage;
