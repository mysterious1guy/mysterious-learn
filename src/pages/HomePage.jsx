import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Shield, Cpu, Code2, Lock, Target, Key, Heart, Mail, Github, Linkedin, AlertTriangle, Activity } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';

const HomePage = ({ API_URL }) => {
    const navigate = useNavigate();
    const { setTheme } = useTheme();

    // Forcer le thème sombre pour la landing page CTF
    useEffect(() => {
        setTheme('dark');
    }, [setTheme]);

    const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [config, setConfig] = useState(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 2;
            const y = (clientY / window.innerHeight - 0.5) * 2;
            setMousePosition({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/auth/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (err) {
                console.error('Erreur fetch stats:', err);
            }
        };
        fetchStats();

        const fetchConfig = async () => {
            try {
                const res = await fetch(`${API_URL}/site-config`);
                if (res.ok) {
                    const data = await res.json();
                    setConfig(data);
                }
            } catch (err) {
                console.error('Erreur fetch site config:', err);
            }
        };
        fetchConfig();
    }, [API_URL]);

    const clearanceLevels = [
        {
            level: "LEVEL 01",
            title: "Logique & Cryptographie",
            tag: "ACCÈS RESTREINT",
            color: "from-cyan-500 to-blue-600",
            bgLight: "bg-cyan-500/10",
            textColor: "text-cyan-400",
            borderColor: "border-cyan-500/30",
            icon: Key,
            desc: "Déchiffrez des messages encodés en Base64, Hexadécimal ou ROT13. Maîtrisez les bases de la cryptographie et de la logique booléenne."
        },
        {
            level: "LEVEL 02",
            title: "Système & Shell (Linux)",
            tag: "SYSTÈME CRITIQUE",
            color: "from-emerald-500 to-teal-600",
            bgLight: "bg-emerald-500/10",
            textColor: "text-emerald-400",
            borderColor: "border-emerald-500/30",
            icon: Terminal,
            desc: "Naviguez dans des environnements UNIX virtuels. Analysez des logs systèmes, trouvez des fichiers cachés et manipulez le shell Bash."
        },
        {
            level: "LEVEL 03",
            title: "Analyse de Code & Bugs",
            tag: "REVERSE ENGINEERING",
            color: "from-purple-500 to-indigo-600",
            bgLight: "bg-purple-500/10",
            textColor: "text-purple-400",
            borderColor: "border-purple-500/30",
            icon: Code2,
            desc: "Plongez dans des scripts Python ou des binaires C. Identifiez des failles logiques, des débordements ou des portes dérobées (backdoors)."
        },
        {
            level: "LEVEL 04",
            title: "Opérations Cyber (Offensif)",
            tag: "TOP SECRET",
            color: "from-rose-500 to-red-600",
            bgLight: "bg-rose-500/10",
            textColor: "text-rose-400",
            borderColor: "border-rose-500/30",
            icon: Target,
            desc: "Simulez des attaques Web réelles (XSS, SQLi, LFI) sur nos serveurs d'entraînement isolés. Pénétrez le système, capturez le drapeau."
        }
    ];

    return (
        <div className="min-h-screen bg-[#050B14] font-sans selection:bg-cyan-500/30 text-slate-300 relative overflow-hidden">
            {/* Background Cyber Grid & Radars */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
                
                <div
                    className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[140px] transition-transform duration-300 ease-out"
                    style={{ transform: `translate3d(${mousePosition.x * 40}px, ${mousePosition.y * 40}px, 0)` }}
                />
                <div
                    className="absolute top-1/3 -right-40 w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[160px] transition-transform duration-300 ease-out"
                    style={{ transform: `translate3d(${mousePosition.x * -50}px, ${mousePosition.y * -50}px, 0)` }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-4 md:px-6 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-10">
                        {/* Logo animé Cyber */}
                        <motion.div
                            style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex justify-center"
                        >
                            <AnimatedLogo size="xlarge" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 rounded-full text-xs font-mono tracking-widest uppercase mb-4">
                                <Activity size={14} className="animate-pulse" />
                                Connexion Sécurisée Établie
                            </div>

                            <h1 className="flex flex-col items-center">
                                <span className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight leading-[0.9]">
                                    PÉNÉTREZ LE RÉSEAU.
                                </span>
                                <span className="text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 mt-2 md:mt-4 leading-[0.9]">
                                    RÉSOLVEZ LE MYSTÈRE.
                                </span>
                            </h1>

                            <p className="text-slate-400 font-mono text-sm md:text-lg max-w-3xl mx-auto leading-relaxed mt-6">
                                <span className="text-cyan-500">{">"}</span> Initialisation de la première plateforme d'apprentissage par l'investigation et le CTF. Pas de théorie ennuyeuse, juste des serveurs virtuels à analyser, du code à auditer et des flags à capturer.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap justify-center gap-6 mt-10"
                        >
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#050B14] font-black text-lg rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] active:scale-95 transition-all flex items-center gap-3 uppercase tracking-wider"
                            >
                                <Terminal size={22} />
                                Créer un Dossier d'Agent
                            </button>
                            
                            <button
                                onClick={() => document.getElementById('mechanics').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-transparent border border-slate-700 text-white font-bold text-lg rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center gap-3 uppercase tracking-wider"
                            >
                                Lire le Briefing
                                <ArrowRight size={22} />
                            </button>
                        </motion.div>

                        {/* Cyber Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex justify-center gap-8 md:gap-16 pt-10 border-t border-slate-800/50 mt-12 max-w-4xl mx-auto"
                        >
                            <div className="text-center group">
                                <p className="text-3xl md:text-4xl font-mono text-cyan-400 font-bold group-hover:text-cyan-300 transition-colors">
                                    {(12840 + (stats.totalUsers || 0)).toLocaleString('fr-FR')}
                                </p>
                                <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">Agents Enregistrés</p>
                            </div>
                            <div className="w-px h-12 bg-slate-800 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-3xl md:text-4xl font-mono text-emerald-400 font-bold group-hover:text-emerald-300 transition-colors">
                                    {(1420 + (stats.activeUsers || 0)).toLocaleString('fr-FR')}
                                </p>
                                <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">Agents Opérationnels</p>
                            </div>
                            <div className="w-px h-12 bg-slate-800 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-3xl md:text-4xl font-mono text-purple-400 font-bold group-hover:text-purple-300 transition-colors">
                                    En Ligne
                                </p>
                                <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">Statut Serveurs</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Mechanics Section (How it works) */}
            <section id="mechanics" className="py-24 bg-[#0a111f] border-y border-slate-800 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-950/40 text-emerald-400 rounded-full text-xs font-mono tracking-widest uppercase mx-auto w-max border border-emerald-500/20">
                            <Shield size={16} /> PROTOCOLE D'ENTRAÎNEMENT
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                            Apprendre par l'Investigation (CTF)
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Oubliez les QCM. Ici, vous êtes face à des systèmes réels simulés. Cherchez les indices, trouvez la faille et prouvez votre expertise.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-y-1/2 z-0" />
                        
                        {[
                            {
                                step: "01",
                                title: "Analyser le Scénario",
                                desc: "Une entreprise virtuelle a été piratée. Lisez le briefing de mission, étudiez l'architecture et analysez les logs fournis.",
                                icon: Cpu,
                                color: "text-blue-400"
                            },
                            {
                                step: "02",
                                title: "Trouver la Vulnérabilité",
                                desc: "Utilisez vos compétences en logique, programmation ou réseau pour exploiter la faille (XSS, Injection, mauvaise configuration).",
                                icon: Code2,
                                color: "text-cyan-400"
                            },
                            {
                                step: "03",
                                title: "Capturer le FLAG",
                                desc: "Une fois le système compromis, récupérez une chaîne de caractère spéciale (ex: FLAG{h4ck3d}). Validez-la pour gagner de l'XP.",
                                icon: Lock,
                                color: "text-emerald-400"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="relative z-10 bg-[#0f172a] border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group shadow-xl"
                            >
                                <div className="text-[80px] font-black font-mono text-slate-800/50 absolute top-4 right-4 z-0 group-hover:text-slate-700/50 transition-colors">
                                    {item.step}
                                </div>
                                <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 relative z-10 ${item.color}`}>
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{item.title}</h3>
                                <p className="text-slate-400 font-medium relative z-10 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Clearance Levels Section */}
            <section className="py-24 bg-[#050B14] relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div className="space-y-4 max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                                Parcours d'Habilitation
                            </h2>
                            <p className="text-lg text-slate-400 font-medium">
                                Les missions sont classifiées par niveau d'habilitation (Clearance Level). Acquérez de l'expérience pour débloquer l'accès aux opérations les plus critiques.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {clearanceLevels.map((lvl, idx) => (
                            <motion.div
                                key={lvl.level}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className={`bg-gradient-to-br from-[#0a111f] to-[#0f172a] border ${lvl.borderColor} rounded-3xl p-8 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all group flex gap-6 items-start`}
                            >
                                <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${lvl.color} flex items-center justify-center text-white shadow-lg`}>
                                    <lvl.icon size={32} />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`font-mono font-bold text-xs ${lvl.textColor}`}>{lvl.level}</span>
                                        <span className="px-2 py-0.5 rounded text-[9px] font-black bg-slate-800 text-slate-300">{lvl.tag}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{lvl.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {lvl.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Creator / Transmission Section */}
            <section className="py-24 relative overflow-hidden bg-[#0a111f] border-t border-slate-800 z-10">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-700/50 rounded-[3rem] p-10 md:p-16 text-center space-y-10 shadow-2xl relative"
                    >
                        {/* Dossier Top Secret stamp */}
                        <div className="absolute top-8 right-8 border-2 border-red-500/30 text-red-500/50 rotate-12 px-4 py-1 rounded font-black tracking-widest text-xl opacity-20 pointer-events-none">
                            CONFIDENTIAL
                        </div>

                        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                            <div className="w-24 h-24 p-1 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl shadow-2xl overflow-hidden rotate-3 hover:rotate-0 transition-transform">
                                <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden">
                                    {config?.creatorAvatar && config.creatorAvatar.length > 2 ? (
                                        <img
                                            src={config.creatorAvatar}
                                            alt="L'Architecte"
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(config?.creatorName || 'MF')}&background=0D8ABC&color=fff&size=128`;
                                            }}
                                        />
                                    ) : (
                                        <span className="text-3xl font-black text-cyan-500 font-mono">
                                            MF
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h3 className="text-xs font-mono font-black uppercase tracking-[0.5em] text-cyan-500">L'ARCHITECTE SYSTÈME</h3>
                            <h2 className="text-4xl md:text-5xl font-black text-white">{config?.creatorName || 'Mouhamed FALL'}</h2>
                            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto italic leading-relaxed font-mono">
                                "{config?.creatorBio && config.creatorBio.length > 0
                                    ? config.creatorBio[config.creatorBio.length - 1]
                                    : "Je crois en un monde où la technologie doit être comprise pour être sécurisée. Mysterious Classroom est l'arène que j'ai bâtie pour forger la prochaine génération d'experts cyber."
                                }"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Shield, label: "Habilitation", value: "Root (Admin)" },
                                { icon: Terminal, label: "Spécialité", value: "Développement & Sécurité" },
                                { icon: Code2, label: "Mission", value: "Partage de Connaissances" }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-[#050b14] rounded-2xl border border-slate-800 group hover:border-cyan-500/30 transition-colors">
                                    <item.icon size={24} className="mx-auto mb-3 text-cyan-600 group-hover:scale-110 group-hover:text-cyan-400 transition-all" />
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                                    <p className="text-white font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-6 pt-2">
                            <a href="#" className="p-4 bg-[#050b14] border border-slate-800 rounded-2xl text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                                <Github size={24} />
                            </a>
                            <a href="#" className="p-4 bg-[#050b14] border border-slate-800 rounded-2xl text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:mouhamedfa2007@gmail.com" className="p-4 bg-[#050b14] border border-slate-800 rounded-2xl text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                                <Mail size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* TRANSMISSION INTERCEPTEE - CONSTRUCTION BANNER */}
            <section className="py-20 px-4 md:px-6 bg-[#030712] relative overflow-hidden border-t border-red-900/30 z-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full -ml-20 -mb-20 pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-red-500/20 rounded-3xl p-10 md:p-14 text-center space-y-8 shadow-2xl relative overflow-hidden">
                        
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-950/50 border border-red-500/40 text-red-400 rounded-full text-xs md:text-sm font-mono uppercase tracking-widest">
                            <AlertTriangle size={16} className="animate-pulse" />
                            TRANSMISSION INTERCEPTÉE
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
                            Le Système est en cours de déploiement
                        </h2>

                        <p className="text-slate-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-mono">
                            <span className="text-red-500">[INFO]</span> Nos ingénieurs injectent actuellement les nouveaux scénarios d'entraînement (CTF) dans la matrice. La plateforme évolue. Préparez-vous pour de nouvelles missions imminentes.
                        </p>

                        <div className="pt-4 flex flex-wrap items-center justify-center gap-6">
                            <div className="inline-flex items-center gap-3 px-5 py-3 bg-slate-900 border border-slate-700 text-slate-400 rounded-xl text-xs font-mono tracking-wider">
                                <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
                                Compilation des missions en cours...
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
