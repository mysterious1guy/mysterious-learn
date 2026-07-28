import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Terminal, Shield, Sparkles, Trophy, HelpCircle, RefreshCw, CheckCircle2, 
    ArrowRight, BookOpen, Code2, Cpu, Zap, Lock, Eye, AlertCircle, Play, 
    ArrowLeft, Compass, Bot, Check, Layers, Lightbulb, Key, Maximize2, Minimize2
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';
import NanoEditor from '../components/terminal/NanoEditor';
import TerminalConsole from '../components/terminal/TerminalConsole';
import { getMissionByStep } from '../data/learningMissions';

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
        hint: '💡 CONSEIL DÉBUTANT : Tapez "whoami" et appuyez sur Entrée pour connaître votre identité sur le système.',
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
        hint: '💡 CONSEIL DÉBUTANT : La commande "ls" (pour List) affiche tous les fichiers du dossier courant.',
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
        hint: '💡 CONSEIL DÉBUTANT : La commande "cat <nom_du_fichier>" permet de lire directement le contenu d\'un fichier texte.',
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
        hint: '💡 CONSEIL DÉBUTANT : Tapez "scan 10.0.0.5" pour analyser les ports réseau ouverts sur la machine cible.',
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
        hint: '💡 CONSEIL DÉBUTANT : Tapez "decode TXlzdGVyaW91c1Bhc3M2NzA=" pour déchiffrer le mot de passe secret.',
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
        hint: '💡 CONSEIL DÉBUTANT : Tapez "ping 192.168.1.50" pour envoyer des requêtes de vérification réseau.',
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
        hint: '💡 CONSEIL DÉBUTANT : La commande "grep <recherche> <fichier>" extrait les lignes contenant le mot recherché.',
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
        hint: '💡 CONSEIL DÉBUTANT : Réutilisez "cat keylog.txt" (comme au projet 3) pour afficher le journal de frappes.',
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
        hint: '💡 CONSEIL DÉBUTANT : La commande "chmod 777 <fichier>" accorde tous les droits d\'exécution à un script.',
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
        hint: '💡 CONSEIL DÉBUTANT : Tapez "id root" pour afficher l\'identifiant UID 0 (root) du système.',
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
        if (user.name) return user.name.toLowerCase().split(' ').join('');
        return 'agent';
    }, [user]);

    const userHomePath = `/home/${displayUsername}`;
    const [activeUser, setActiveUser] = useState(displayUsername);
    const [terminalMode, setTerminalMode] = useState('apprentissage');
    const [activeEditor, setActiveEditor] = useState(null);
    const [activeMission, setActiveMission] = useState(null);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [currentPath, setCurrentPath] = useState(userHomePath);
    const [executingCmd, setExecutingCmd] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [completedMissions, setCompletedMissions] = useState([]);
    const [score, setScore] = useState(user?.xp || 0);

    // Mode Apprentissage Infini
    const [learningStep, setLearningStep] = useState(() => {
        try {
            const saved = localStorage.getItem(`terminal_learning_step_${displayUsername}`);
            return saved ? parseInt(saved, 10) : 0;
        } catch (e) {
            return 0;
        }
    });

    const activeLearningMission = useMemo(() => {
        return getMissionByStep(learningStep);
    }, [learningStep]);

    // Mode Plein écran et Historique des commandes (Flèches Haut / Bas)
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [cmdStack, setCmdStack] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [draftInput, setDraftInput] = useState('');

    // Mode Authentification par mot de passe & Session SSH interactive
    const [pendingAuth, setPendingAuth] = useState(null);
    const [sshSession, setSshSession] = useState(null);

    // Système de fichiers virtuel VFS persistant
    const [vfs, setVfs] = useState(() => {
        try {
            const savedVfs = localStorage.getItem(`terminal_vfs_${displayUsername}`);
            return savedVfs ? JSON.parse(savedVfs) : {
                [`/home/${displayUsername}/script.sh`]: 'echo "Bienvenue dans Mysterious Classroom !"'
            };
        } catch (e) {
            return {};
        }
    });

    const outputContainerRef = useRef(null);
    const inputRef = useRef(null);

    // Mettre à jour activeUser quand displayUsername change (si pas en root)
    useEffect(() => {
        if (!activeUser || activeUser === 'agent') {
            setActiveUser(displayUsername);
        }
    }, [displayUsername]);

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

    // Bloquer le défilement global de la page en mode Plein Écran pour éviter que le footer n'apparaisse
    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isFullscreen]);

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
                    { type: 'mission', text: '💡 Tapez "clear" pour effacer l\'historique et recommencer à zéro.' },
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
        let cmd = input.trim();

        // 1. Saisie de mot de passe en cours (mode d'attente de mot de passe)
        if (pendingAuth) {
            const auth = pendingAuth;
            setPendingAuth(null);
            setInput('');

            const masked = '•'.repeat(Math.max(cmd.length, 6));
            const newHistory = [
                ...history,
                { type: 'user', text: `${auth.promptLabel}${masked}` }
            ];

            if (auth.type === 'su') {
                setActiveUser(auth.targetUser || 'root');
                newHistory.push({
                    type: 'output',
                    text: `[+] Authentification réussie. Session basculée sur '${auth.targetUser || 'root'}'.`
                });
                setHistory(newHistory);
                return;
            } else if (auth.type === 'sudo') {
                setActiveUser('root');
                newHistory.push({
                    type: 'output',
                    text: `[+] Authentification sudo réussie. Exécution de "${auth.pendingCmd || ''}" en tant que root...`
                });
                if (auth.pendingCmd) {
                    // Si une sous-commande était associée à sudo, l'exécuter sous privilège root
                    const pendingCmd = auth.pendingCmd;
                    setExecutingCmd(true);
                    setHistory(newHistory);
                    try {
                        const token = user?.token || localStorage.getItem('token');
                        const res = await fetch(`${API_URL}/ai/execute-terminal-command`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                command: pendingCmd,
                                currentPath: currentPath,
                                currentUser: 'root',
                                vfs: vfs,
                                sshSession: sshSession,
                                mission: activeMission,
                                history: newHistory
                            })
                        });
                        const data = await res.json();
                        if (res.ok) {
                            setHistory(prev => [
                                ...prev,
                                { type: 'output', text: data.output }
                            ]);
                        }
                    } catch (e) {
                        setHistory(prev => [
                            ...prev,
                            { type: 'error', text: `bash: ${pendingCmd}: erreur d'exécution sudo.` }
                        ]);
                    } finally {
                        setExecutingCmd(false);
                    }
                    return;
                }
                setHistory(newHistory);
                return;
            } else if (auth.type === 'ssh') {
                const targetSsh = { user: auth.targetUser, host: auth.host, password: cmd };
                setExecutingCmd(true);
                setHistory(newHistory);

                try {
                    const token = user?.token || localStorage.getItem('token');
                    const res = await fetch(`${API_URL}/ai/execute-terminal-command`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            command: 'whoami',
                            currentPath: currentPath,
                            currentUser: activeUser,
                            vfs: vfs,
                            sshSession: targetSsh,
                            mission: activeMission,
                            history: newHistory
                        })
                    });

                    const data = await res.json();
                    if (res.ok && data.sshSuccess) {
                        const realHost = data.remoteHostname || auth.host;
                        const osBanner = data.osInfo || 'Debian GNU/Linux 12 (bookworm)';
                        setSshSession({
                            ...targetSsh,
                            remoteHostname: realHost,
                            osInfo: osBanner
                        });
                        setHistory(prev => [
                            ...prev,
                            {
                                type: 'output',
                                text: `[+] Connected to ${realHost} via SSH.\nWelcome to ${osBanner}`
                            }
                        ]);
                    } else if (activeMission && !data.isRealSsh) {
                        // En mode APPRENTISSAGE uniquement (missions CTF / lab virtuel)
                        setSshSession(targetSsh);
                        setHistory(prev => [
                            ...prev,
                            {
                                type: 'output',
                                text: `[+] Connected to ${auth.host} via SSH (Virtual CTF Lab).\nWelcome to Debian GNU/Linux 12`
                            }
                        ]);
                    } else {
                        // En Mode Libre ou en cas d'échec SSH réel : afficher l'erreur et NE PAS ouvrir de session SSH !
                        setHistory(prev => [
                            ...prev,
                            { type: 'error', text: data.output || `ssh: connect to host ${auth.host} port ${auth.port || 22}: Connection failed` }
                        ]);
                    }
                } catch (err) {
                    setHistory(prev => [
                        ...prev,
                        { type: 'error', text: `ssh: connect to host ${auth.host} port 22: Connection timed out` }
                    ]);
                } finally {
                    setExecutingCmd(false);
                }
                return;
            }
        }

        if (!cmd || executingCmd) return;

        // Enregistrer la commande dans la pile d'historique (Flèches Haut/Bas)
        setCmdStack(prev => (prev[prev.length - 1] === cmd ? prev : [...prev, cmd]));
        setHistoryIndex(-1);
        setDraftInput('');

        const activePromptUser = sshSession ? sshSession.user : activeUser;
        const activeHost = sshSession ? (sshSession.remoteHostname || sshSession.host) : 'classroom';
        const promptSymbol = activePromptUser === 'root' ? '#' : '$';
        const promptText = `${activePromptUser}@${activeHost}:${formattedPath}${promptSymbol} ${cmd}`;
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

        if ((lower === 'exit' || lower === 'logout') && sshSession) {
            const closedHost = sshSession.remoteHostname || sshSession.host;
            setSshSession(null);
            setCurrentPath('~');
            newHistory.push({ type: 'output', text: `Connection to ${closedHost} closed.` });
            setHistory(newHistory);
            return;
        }

        // Interception des éditeurs de texte (nano, vim, vi)
        if (lower.startsWith('nano') || lower.startsWith('vim') || lower.startsWith('vi')) {
            const parts = cmd.split(' ').filter(Boolean);
            const editorName = parts[0].toLowerCase();
            const fileName = parts[1] || 'script.sh';

            if (sshSession) {
                setExecutingCmd(true);
                setHistory(newHistory);
                try {
                    const token = user?.token || localStorage.getItem('token');
                    const res = await fetch(`${API_URL}/ai/execute-terminal-command`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            command: `cat "${fileName}" 2>/dev/null || echo ""`,
                            currentPath: currentPath,
                            currentUser: activeUser,
                            vfs: vfs,
                            sshSession: sshSession,
                            mission: activeMission,
                            history: newHistory
                        })
                    });
                    const data = await res.json();
                    setActiveEditor({
                        fileName: fileName,
                        content: data.output || '',
                        editorType: editorName.includes('vi') ? 'vim' : 'nano',
                        isRemoteSsh: true
                    });
                } catch (e) {
                    setActiveEditor({
                        fileName: fileName,
                        content: '',
                        editorType: editorName.includes('vi') ? 'vim' : 'nano',
                        isRemoteSsh: true
                    });
                } finally {
                    setExecutingCmd(false);
                }
                return;
            }

            setActiveEditor({
                fileName: fileName,
                content: vfs[`${currentPath}/${fileName}`] || vfs[`${fileName}`] || (fileName.endsWith('.sh') ? 'echo "Hello from Mysterious Classroom!"' : ''),
                editorType: editorName.includes('vi') ? 'vim' : 'nano'
            });
            return;
        }

        // Helper pour valider l'accomplissement d'une étape d'apprentissage ou d'un projet
        const triggerStepOrMissionValidation = (lowerCmd, data = {}) => {
            const expected = (activeMission?.expectedCommand || '').toLowerCase().trim();

            // Vérifier si le projet est accompli (si en mode projet)
            if (activeMission) {
                const isCompleted = data.isMissionCompleted || (expected && (lowerCmd === expected || lowerCmd.startsWith(expected)));

                if (isCompleted && !completedMissions.includes(activeMission.id)) {
                    const gained = activeMission.xpReward || 100;
                    const newScore = score + gained;
                    setScore(newScore);

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

            // Validation automatique pour le Mode Apprentissage Infini
            if (terminalMode === 'apprentissage' && !activeMission && activeLearningMission) {
                const expectedCmd = (activeLearningMission.expectedCommand || '').toLowerCase().trim();
                const userCmdLower = lowerCmd.trim();

                const isStepCompleted = userCmdLower === expectedCmd || userCmdLower.startsWith(expectedCmd) || 
                    (expectedCmd === 'pwd' && userCmdLower === 'pwd') ||
                    (expectedCmd === 'ls' && userCmdLower.startsWith('ls')) ||
                    (expectedCmd === 'whoami' && userCmdLower.includes('whoami')) ||
                    (expectedCmd.startsWith('mkdir') && userCmdLower.startsWith('mkdir')) ||
                    (expectedCmd.startsWith('cd') && userCmdLower.startsWith('cd')) ||
                    (expectedCmd.startsWith('touch') && userCmdLower.startsWith('touch')) ||
                    (expectedCmd.startsWith('cp') && userCmdLower.startsWith('cp')) ||
                    (expectedCmd.startsWith('mv') && userCmdLower.startsWith('mv')) ||
                    (expectedCmd.startsWith('rm') && userCmdLower.startsWith('rm')) ||
                    (expectedCmd.startsWith('cat') && userCmdLower.startsWith('cat')) ||
                    (expectedCmd.startsWith('chmod') && userCmdLower.startsWith('chmod')) ||
                    (expectedCmd.startsWith('sudo') && userCmdLower.startsWith('sudo')) ||
                    (expectedCmd.startsWith('ps') && userCmdLower.startsWith('ps')) ||
                    (expectedCmd.startsWith('df') && userCmdLower.startsWith('df')) ||
                    (expectedCmd.startsWith('du') && userCmdLower.startsWith('du')) ||
                    (expectedCmd.startsWith('uname') && userCmdLower.startsWith('uname')) ||
                    (expectedCmd.startsWith('history') && userCmdLower.startsWith('history')) ||
                    (expectedCmd.startsWith('ping') && userCmdLower.startsWith('ping')) ||
                    (expectedCmd.startsWith('ssh') && userCmdLower.startsWith('ssh'));

                if (isStepCompleted) {
                    const gained = activeLearningMission.xpReward || 50;
                    const newScore = score + gained;
                    setScore(newScore);

                    const nextStepIndex = learningStep + 1;
                    setLearningStep(nextStepIndex);
                    try {
                        localStorage.setItem(`terminal_learning_step_${displayUsername}`, nextStepIndex.toString());
                    } catch (e) {}

                    const nextMission = getMissionByStep(nextStepIndex);

                    setHistory(prev => [
                        ...prev,
                        { type: 'success', text: `[+] 🎉 BRAVO ! Étape ${activeLearningMission.id} Validée : "${activeLearningMission.title}" (+${gained} XP) !` },
                        { type: 'sys', text: `[🎯 ÉTAPE SUIVANTE ${nextMission.id}] : ${nextMission.title}` },
                        { type: 'sys', text: `🎯 Scénario : ${nextMission.scenario}` },
                        { type: 'mission', text: `💡 Explication : ${nextMission.explanation}` }
                    ]);

                    if (setUser) {
                        setUser(prev => prev ? ({ ...prev, xp: newScore }) : prev);
                    }
                    if (setToast) {
                        setToast({ message: `🎯 Étape ${activeLearningMission.id} complétée ! +${gained} XP`, type: 'success' });
                    }
                }
            }
        };

        // Execution instantanée des commandes système de base (Vitesse & Fluidité hors SSH)
        if (!sshSession) {
            if (lower === 'whoami') {
                newHistory.push({ type: 'output', text: activePromptUser });
                setHistory(newHistory);
                triggerStepOrMissionValidation('whoami');
                return;
            }

            if (lower === 'pwd') {
                newHistory.push({ type: 'output', text: currentPath });
                setHistory(newHistory);
                triggerStepOrMissionValidation('pwd');
                return;
            }

            if (lower === 'date') {
                newHistory.push({ type: 'output', text: new Date().toString() });
                setHistory(newHistory);
                triggerStepOrMissionValidation('date');
                return;
            }

            if (lower.startsWith('echo ')) {
                const textToEcho = cmd.substring(5).replace(/^["']|["']$/g, '');
                newHistory.push({ type: 'output', text: textToEcho });
                setHistory(newHistory);
                triggerStepOrMissionValidation(lower);
                return;
            }

            if (lower === 'history') {
                const historyList = cmdStack.map((c, idx) => `  ${idx + 1}  ${c}`).join('\n');
                newHistory.push({ type: 'output', text: historyList || '  1  history' });
                setHistory(newHistory);
                triggerStepOrMissionValidation('history');
                return;
            }
        }

        // Interception de su root / su / sudo -i / sudo su
        if (['su', 'su root', 'su -', 'su - root', 'sudo su', 'sudo -i', 'sudo bash', 'sudo sh'].includes(lower)) {
            setPendingAuth({
                type: 'su',
                targetUser: 'root',
                promptLabel: '[sudo] Password for root (mot de passe: root) : '
            });
            setHistory(newHistory);
            return;
        }

        // Interception de sudo <commande>
        if (lower.startsWith('sudo ')) {
            const subCmd = cmd.substring(5).trim();
            if (activeUser === 'root') {
                // Déjà root, pas besoin de redemander le mot de passe, modifier la commande
                cmd = subCmd;
            } else {
                setPendingAuth({
                    type: 'sudo',
                    targetUser: 'root',
                    pendingCmd: subCmd,
                    promptLabel: '[sudo] Password for root (mot de passe: root) : '
                });
                setHistory(newHistory);
                return;
            }
        }

        // Interception de su <nom_utilisateur>
        if (lower.startsWith('su ')) {
            const targetUser = cmd.split(' ').filter(Boolean)[1];
            if (targetUser) {
                setPendingAuth({
                    type: 'su',
                    targetUser: targetUser,
                    promptLabel: `Password for ${targetUser}: `
                });
                setHistory(newHistory);
                return;
            }
        }

        // Interception de ssh <user>@<host> ou ssh <host>
        if (lower.startsWith('ssh ')) {
            const targetArg = cmd.split(' ').filter(Boolean)[1] || '';
            let targetUser = activeUser;
            let host = targetArg;

            if (targetArg.includes('@')) {
                const parts = targetArg.split('@');
                targetUser = parts[0];
                host = parts[1];
            }

            if (host) {
                setPendingAuth({
                    type: 'ssh',
                    targetUser: targetUser,
                    host: host,
                    promptLabel: `${targetUser}@${host}'s password: `
                });
                setHistory(newHistory);
                return;
            }
        }

        // Gestion de exit / logout
        if (lower === 'exit' || lower === 'logout') {
            if (sshSession) {
                newHistory.push({ type: 'output', text: `Connection to ${sshSession.host} closed.` });
                setSshSession(null);
                setHistory(newHistory);
                return;
            }
            if (activeUser !== displayUsername) {
                setActiveUser(displayUsername);
                newHistory.push({ type: 'output', text: 'exit' });
                setHistory(newHistory);
                return;
            }
        }

        if (lower === 'help') {
            newHistory.push({
                type: 'sys',
                text: `📚 NOYAU LINUX UNIVERSEL (Toutes commandes supportées) :
- whoami, ls, pwd, cat, cd, mkdir, touch, rm, chmod, chown
- su root, sudo -i, exit : Basculer entre utilisateur et Super-Utilisateur (root)
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
                    currentUser: activeUser,
                    vfs: vfs,
                    sshSession: sshSession,
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
                    { type: 'output', text: data.output, cmd: cmd }
                ]);

                // Déclencher la validation
                triggerStepOrMissionValidation(lower, data);
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

    const handleKeyDown = (e) => {
        // Navigation dans l'historique des commandes avec la flèche HAUT
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdStack.length === 0) return;
            if (historyIndex === -1) {
                setDraftInput(input);
                const lastIdx = cmdStack.length - 1;
                setHistoryIndex(lastIdx);
                setInput(cmdStack[lastIdx]);
            } else if (historyIndex > 0) {
                const nextIdx = historyIndex - 1;
                setHistoryIndex(nextIdx);
                setInput(cmdStack[nextIdx]);
            }
            return;
        }

        // Navigation dans l'historique des commandes avec la flèche BAS
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === -1) return;
            if (historyIndex < cmdStack.length - 1) {
                const nextIdx = historyIndex + 1;
                setHistoryIndex(nextIdx);
                setInput(cmdStack[nextIdx]);
            } else {
                setHistoryIndex(-1);
                setInput(draftInput);
            }
            return;
        }

        // Quitter le mode plein écran avec la touche ÉCHAP
        if (e.key === 'Escape' && isFullscreen) {
            setIsFullscreen(false);
            return;
        }

        // Auto-complétion avec TAB
        if (e.key === 'Tab') {
            e.preventDefault();
            if (!input) return;

            const commonCommands = [
                'ls', 'cd', 'cat', 'pwd', 'mkdir', 'touch', 'rm', 'nano', 'vim', 'vi',
                'chmod', 'chown', 'echo', 'grep', 'clear', 'whoami', 'sudo', 'su', 'ssh',
                'python3', 'python', 'node', 'npm', 'git', 'systemctl', 'service', 'top',
                'htop', 'ps', 'df', 'du', 'find', 'history', 'exit'
            ];

            const parts = input.split(' ');

            if (parts.length === 1) {
                const prefix = parts[0].toLowerCase();
                const matches = commonCommands.filter(c => c.startsWith(prefix));
                if (matches.length === 1) {
                    setInput(matches[0] + ' ');
                } else if (matches.length > 1) {
                    let common = prefix;
                    for (let i = prefix.length; ; i++) {
                        const char = matches[0][i];
                        if (!char || !matches.every(m => m[i] === char)) break;
                        common += char;
                    }
                    if (common !== prefix) {
                        setInput(common);
                    }
                }
            } else {
                const lastPart = parts[parts.length - 1];
                const historyFiles = history
                    .filter(h => h.type === 'output' && h.text)
                    .flatMap(h => h.text.split('\n').map(l => l.trim().replace(/^["']|["']$/g, '')))
                    .filter(f => f && !f.includes(' ') && !f.startsWith('[') && !f.startsWith('Connection'));

                const vfsFiles = Object.keys(vfs || {}).map(pathStr => {
                    const pathParts = pathStr.split('/').filter(Boolean);
                    return pathParts[pathParts.length - 1] || pathStr;
                });
                const defaultFiles = ['script.sh', 'notes.txt', 'config.json', 'README.md', 'app.py', 'Musique', 'Bureau', 'Documents', 'Images', 'Téléchargements', 'Vidéos'];
                const candidates = Array.from(new Set([...historyFiles, ...vfsFiles, ...defaultFiles]));

                const matches = candidates.filter(f => f.toLowerCase().startsWith(lastPart.toLowerCase()));
                if (matches.length === 1) {
                    parts[parts.length - 1] = matches[0];
                    setInput(parts.join(' '));
                } else if (matches.length > 1) {
                    let common = lastPart;
                    for (let i = lastPart.length; ; i++) {
                        const char = matches[0][i];
                        if (!char || !matches.every(m => m[i].toLowerCase() === char.toLowerCase())) break;
                        common += char;
                    }
                    if (common !== lastPart) {
                        parts[parts.length - 1] = common;
                        setInput(parts.join(' '));
                    }
                }
            }
        }
    };

    return (
        <div className="flex-1 min-w-0 bg-slate-900 dark:bg-[#070C14] relative flex flex-col min-h-screen">
            <div className="flex-1 p-2 sm:p-4 lg:p-6 pb-12">
                <div className="w-full max-w-full mx-auto space-y-4">

                    {/* Header Minimaliste du Projet - Mode libre */}
                    <div className="bg-slate-900 dark:bg-slate-900 rounded-2xl p-4 lg:p-5 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400 shrink-0">
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

                        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                            {activeMission ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setShowHint(!showHint)}
                                        className={`px-3 py-2 rounded-lg font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                                            showHint
                                                ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.6)] font-bold scale-105'
                                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                                        }`}
                                        title="Afficher l'indice du projet"
                                    >
                                        <Lightbulb size={15} className="animate-pulse" />
                                        <span>Indice</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate('/terminal-simulator')}
                                        className="px-3 py-2 rounded-lg font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                                        title="Quitter la mission de projet"
                                    >
                                        <ArrowLeft size={14} />
                                        <span>Quitter Projet</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setTerminalMode('libre')}
                                        className={`px-4 py-2 rounded-lg font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                                            terminalMode === 'libre'
                                                ? 'bg-emerald-500 text-slate-950 shadow-lg font-bold'
                                                : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        <Zap size={14} />
                                        Mode Libre
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setTerminalMode('apprentissage')}
                                        className={`relative px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                                            terminalMode === 'apprentissage'
                                                ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-[0_0_25px_rgba(129,140,248,0.8)] border-2 border-indigo-300 scale-105 font-bold'
                                                : 'bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-indigo-200 border-2 border-indigo-500/50 hover:border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] hover:scale-105'
                                        }`}
                                    >
                                        <span className="absolute -top-2.5 -right-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 border border-amber-300 animate-bounce">
                                            <Sparkles size={10} className="fill-slate-950" />
                                            RECOMMANDÉ
                                        </span>
                                        <BookOpen size={16} className={terminalMode === 'apprentissage' ? 'animate-bounce text-white' : 'text-indigo-400 animate-pulse'} />
                                        <span>Mode Apprentissage</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Carte d'indice interactive et informations utiles (UNIQUEMENT pour les projets) */}
                    {showHint && activeMission && (
                        <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-4 text-amber-200 shadow-2xl transition-all font-mono space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 font-black text-amber-400 text-sm tracking-wide uppercase">
                                    <Lightbulb size={18} className="text-amber-400 animate-bounce" />
                                    <span>💡 Indice du Projet & Aide Linux</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowHint(false)}
                                    className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700"
                                >
                                    ✕ Fermer
                                </button>
                            </div>

                            {activeMission ? (
                                <div className="space-y-1">
                                    <p className="text-xs sm:text-sm text-amber-100 font-semibold leading-relaxed">
                                        {activeMission.hint || `Tapez "${activeMission.expectedCommand}" pour valider ce projet.`}
                                    </p>
                                    {activeMission.scenario && (
                                        <p className="text-xs text-slate-400">
                                            🎯 Objectif : {activeMission.scenario}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-xs sm:text-sm text-amber-100 font-semibold leading-relaxed">
                                    💡 Vous êtes actuellement en Mode Libre. Utilisez les commandes standard (`ls`, `cd`, `whoami`, `cat`, `sudo`, `ssh`).
                                </p>
                            )}

                            <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                                <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                                    <Key size={14} className="text-emerald-400 shrink-0" />
                                    <span>Mot de passe super-utilisateur (root) par défaut : <code className="bg-slate-950 px-2 py-0.5 rounded text-white border border-emerald-500/50 font-black">root</code></span>
                                </div>

                                {activeMission?.expectedCommand && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setInput(activeMission.expectedCommand);
                                            setShowHint(false);
                                            inputRef.current?.focus();
                                        }}
                                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-xs transition flex items-center gap-1.5 shadow-lg active:scale-95"
                                    >
                                        <Sparkles size={14} />
                                        <span>Insérer "{activeMission.expectedCommand}" dans le terminal</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Carte d'Apprentissage Didactique Infini (en Mode Apprentissage) */}
                    {terminalMode === 'apprentissage' && !activeMission && activeLearningMission && (
                        <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900 to-slate-900 border border-indigo-500/40 rounded-2xl p-4 sm:p-5 text-indigo-100 shadow-2xl space-y-3 font-sans">
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-black text-xs uppercase tracking-wider shadow">
                                        ⚡ Étape {activeLearningMission.id} / Infini
                                    </div>
                                    <span className="text-xs text-indigo-300 font-semibold bg-indigo-950/60 px-2.5 py-1 rounded border border-indigo-500/30">
                                        📚 {activeLearningMission.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={learningStep === 0}
                                        onClick={() => {
                                            const prevStep = Math.max(0, learningStep - 1);
                                            setLearningStep(prevStep);
                                            try { localStorage.setItem(`terminal_learning_step_${displayUsername}`, prevStep.toString()); } catch (e) {}
                                        }}
                                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-300 transition"
                                        title="Étape Précédente"
                                    >
                                        ⏮️ Précédent
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const nextStep = learningStep + 1;
                                            setLearningStep(nextStep);
                                            try { localStorage.setItem(`terminal_learning_step_${displayUsername}`, nextStep.toString()); } catch (e) {}
                                        }}
                                        className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow"
                                        title="Sauter à l'étape suivante"
                                    >
                                        ⏭️ Sauter
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (window.confirm("Voulez-vous recommencer la formation Linux depuis l'Étape 1 ?")) {
                                                setLearningStep(0);
                                                try { localStorage.setItem(`terminal_learning_step_${displayUsername}`, '0'); } catch (e) {}
                                            }
                                        }}
                                        className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 text-xs font-bold transition"
                                        title="Recommencer depuis l'Étape 1"
                                    >
                                        🔄 Recommencer
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                                    <span>🎯</span>
                                    <span>{activeLearningMission.title}</span>
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
                                    {activeLearningMission.scenario}
                                </p>
                            </div>

                            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                                <div className="text-amber-300 font-semibold bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
                                    💡 <strong>Explication & Indice :</strong> {activeLearningMission.explanation} ({activeLearningMission.hint})
                                </div>
                                <div className="text-emerald-400 font-bold bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                                    🏆 Récompense : +{activeLearningMission.xpReward} XP
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Console Terminal Linux Authentique */}
                    <div className={
                        isFullscreen 
                            ? "fixed inset-0 z-[9999] bg-[#06141d] w-screen h-screen flex flex-col font-mono" 
                            : "w-full bg-[#06141d] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono"
                    }>

                        {/* Top Bar macOS - Linux Native avec Bouton Plein Écran */}
                        <div className="bg-[#0b1d28] px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer" onClick={() => navigate('/')} title="Fermer"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                            </div>
                            <div className="text-xs font-bold text-slate-300 tracking-wide font-mono flex items-center gap-2">
                                <span>{activeUser}@{sshSession ? (sshSession.remoteHostname || sshSession.host) : 'classroom'}:{formattedPath}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg text-xs border border-slate-700 transition font-sans font-bold shadow-sm"
                                title={isFullscreen ? "Quitter le plein écran (Échap)" : "Activer le mode plein écran"}
                            >
                                {isFullscreen ? (
                                    <>
                                        <Minimize2 size={14} className="text-amber-400" />
                                        <span className="hidden sm:inline">Réduire</span>
                                    </>
                                ) : (
                                    <>
                                        <Maximize2 size={14} className="text-emerald-400" />
                                        <span className="hidden sm:inline">Plein Écran</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Écran Terminal et Invite de Commande Directe ou Éditeur Nano */}
                        {activeEditor ? (
                            <NanoEditor
                                activeEditor={activeEditor}
                                setActiveEditor={setActiveEditor}
                                currentPath={currentPath}
                                vfs={vfs}
                                setVfs={setVfs}
                                displayUsername={displayUsername}
                                activeUser={activeUser}
                                formattedPath={formattedPath}
                                setHistory={setHistory}
                                sshSession={sshSession}
                                API_URL={API_URL}
                                user={user}
                            />
                        ) : (
                            <TerminalConsole
                                outputContainerRef={outputContainerRef}
                                inputRef={inputRef}
                                history={history}
                                executingCmd={executingCmd}
                                handleCommand={handleCommand}
                                handleKeyDown={handleKeyDown}
                                pendingAuth={pendingAuth}
                                sshSession={sshSession}
                                activeUser={activeUser}
                                formattedPath={formattedPath}
                                input={input}
                                setInput={setInput}
                                isFullscreen={isFullscreen}
                            />
                        )}

                    </div>

                </div>
            </div>

            <AIAssistant />
        </div>
    );
};

export default TerminalSimulatorPage;
