import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, ShieldAlert, Sparkles, Heart, Github, Linkedin, Mail, Terminal, Lock, Globe, Cpu, AlertTriangle } from 'lucide-react';

const HomePage = ({ API_URL }) => {
    const navigate = useNavigate();
    const { setTheme } = useTheme();
    const { t } = useLanguage();

    useEffect(() => {
        setTheme('light');
    }, [setTheme]);

    const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [config, setConfig] = useState(null);

    // Mouse Tracking for dynamic glowing background effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
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

    const cyberTopics = [
        {
            name: t('home.topic_sys_name') || "Shell & Linux",
            tag: t('home.topic_sys_tag') || "Système",
            color: "text-slate-700",
            bgIcon: "bg-slate-100",
            icon: <Terminal size={32} className="text-slate-800" />,
            desc: t('home.topic_sys_desc') || "Maîtrisez les environnements UNIX, analysez les logs systèmes et manipulez le shell Bash en profondeur."
        },
        {
            name: t('home.topic_web_name') || "Exploitation Web",
            tag: t('home.topic_web_tag') || "Réseau & Web",
            color: "text-blue-600",
            bgIcon: "bg-blue-100",
            icon: <Globe size={32} className="text-blue-600" />,
            desc: t('home.topic_web_desc') || "Simulez des attaques (XSS, SQLi, LFI) sur nos serveurs isolés et apprenez à colmater les brèches."
        },
        {
            name: t('home.topic_crypto_name') || "Cryptographie",
            tag: t('home.topic_crypto_tag') || "Logique & Maths",
            color: "text-purple-600",
            bgIcon: "bg-purple-100",
            icon: <Lock size={32} className="text-purple-600" />,
            desc: t('home.topic_crypto_desc') || "Déchiffrez des messages encodés, étudiez la cryptographie moderne et la théorie des nombres."
        },
        {
            name: t('home.topic_rev_name') || "Reverse Engineering",
            tag: t('home.topic_rev_tag') || "Analyse Binaire",
            color: "text-emerald-600",
            bgIcon: "bg-emerald-100",
            icon: <Cpu size={32} className="text-emerald-600" />,
            desc: t('home.topic_rev_desc') || "Désassemblez des exécutables, analysez la mémoire et découvrez comment les programmes fonctionnent sous le capot."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30 text-slate-900 relative overflow-hidden">
            
            {/* Dynamic Mouse Tracking Background */}
            <div 
                className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-multiply transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 80%)`
                }}
            />

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-4 md:px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-12">
                        
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h1 className="flex flex-col items-center">
                                <span className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 leading-[0.85] tracking-tight">
                                    {t('home.title_part1') || "MYSTERIOUS"}
                                </span>
                                <span className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-2 md:mt-4 leading-[0.85] tracking-tight">
                                    {t('home.title_part2') || "CLASSROOM"}
                                </span>
                            </h1>

                            <p className="text-slate-600 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mt-10" dangerouslySetInnerHTML={{ __html: t('home.hero_desc') || "L'arène d'entraînement ultime pour <strong class=\"text-slate-900\">apprendre la cybersécurité</strong>, maîtriser l'investigation numérique et résoudre des scénarios CTF concrets." }}>
                            </p>

                            {/* Section Objectif de l'Application */}
                            <div className="max-w-3xl mx-auto mt-8 p-6 md:p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-lg text-left space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-md">
                                        <Sparkles size={22} />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
                                        {t('home.objective_title') || "Objectif de la plateforme MYSTERIOUS CLASSROOM"}
                                    </h2>
                                </div>
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t('home.objective_desc') || "<strong>MYSTERIOUS CLASSROOM</strong> est une plateforme de simulation immersive (CTF). Ma vocation est de vous plonger dans des environnements virtuels où chaque mission consiste à auditer du code, exploiter des vulnérabilités, sécuriser des serveurs et capturer des \"Flags\" pour forger votre expertise cyber." }}>
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-6 mt-12"
                        >
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg md:text-xl rounded-2xl shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 group"
                            >
                                <Zap size={22} className="group-hover:text-yellow-400 transition-colors" />
                                {t('home.btn_create_agent') || "CRÉER UN DOSSIER D'AGENT"}
                                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex justify-center gap-8 md:gap-16 pt-10"
                        >
                            <div className="text-center group">
                                <p className="text-4xl md:text-5xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {(12840 + (stats.totalUsers || 0)).toLocaleString('fr-FR')}+
                                </p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{t('home.stats_registered') || "Agents Inscrits"}</p>
                            </div>
                            <div className="w-px h-16 bg-slate-200 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-4xl md:text-5xl font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                                    {(1420 + (stats.activeUsers || 0)).toLocaleString('fr-FR')}+
                                </p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{t('home.stats_active') || "Opérationnels"}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Topics Gallery Showcase Section */}
            <section className="py-24 bg-white/50 backdrop-blur-md border-t border-slate-200/50 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black tracking-widest uppercase mx-auto w-max border border-blue-200">
                            <ShieldAlert size={16} /> {t('home.operations_arsenal') || "OPÉRATIONS & ARSENAL"}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            {t('home.explore_vectors') || "Explorez les Vecteurs d'Attaque"}
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                            {t('home.vectors_desc') || "Chaque discipline est une arme essentielle pour comprendre, attaquer et défendre les systèmes informatiques critiques."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cyberTopics.map((topic, idx) => (
                            <motion.div
                                key={topic.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${topic.bgIcon}`}>
                                    {topic.icon}
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 border ${topic.color} bg-slate-50`}>
                                    {topic.tag}
                                </span>
                                <h3 className="text-xl font-black text-slate-900 mb-3">{topic.name}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-1">
                                    {topic.desc}
                                </p>
                                <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('home.mission_prep') || "Mission en préparation"}</span>
                                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Creator Section */}
            <section className="py-24 relative overflow-hidden bg-slate-50 z-10 border-t border-slate-200/50">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border border-slate-200 rounded-[3rem] p-10 md:p-16 text-center space-y-10 shadow-xl relative"
                    >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                            <div className="w-24 h-24 p-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full shadow-2xl overflow-hidden">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                                    {config?.creatorAvatar && config.creatorAvatar.length > 2 ? (
                                        <img
                                            src={config.creatorAvatar}
                                            alt="L'Architecte"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(config?.creatorName || 'MF')}&background=0D8ABC&color=fff&size=128`;
                                            }}
                                        />
                                    ) : (
                                        <span className="text-3xl font-black bg-gradient-to-tr from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            {config?.creatorAvatar || 'MF'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-blue-600">{t('home.architect_tag') || "L'ARCHITECTE SYSTÈME"}</h3>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900">{config?.creatorName || 'Mouhamed FALL'}</h2>
                            <p className="text-slate-600 text-lg md:text-xl font-medium max-w-xl mx-auto italic leading-relaxed">
                                "{config?.creatorBio && config.creatorBio.length > 0
                                    ? config.creatorBio[config.creatorBio.length - 1]
                                    : t('home.architect_quote') || "Je crois en un monde où la technologie doit être comprise pour être sécurisée. Mysterious Classroom est l'arène que j'ai bâtie pour forger la prochaine génération d'experts cyber."
                                }"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Sparkles, label: "Statut", value: "Étudiant L1" },
                                { icon: Heart, label: "Passion", value: "Code & Cybersécurité" },
                                { icon: Terminal, label: "Focus", value: "Hacking Éthique" }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 group hover:border-blue-500/30 transition-colors">
                                    <item.icon size={24} className="mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                                    <p className="text-slate-900 font-bold mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-6 pt-2">
                            <a href="#" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all">
                                <Github size={24} />
                            </a>
                            <a href="#" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:text-blue-600 hover:border-blue-500 transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:mouhamedfa2007@gmail.com" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:text-red-500 hover:border-red-500 transition-all">
                                <Mail size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* TRANSMISSION INTERCEPTEE - CONSTRUCTION BANNER */}
            <section className="py-20 px-4 md:px-6 bg-[#050B14] relative overflow-hidden border-t border-red-900/30 z-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full -ml-20 -mb-20 pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-red-500/20 rounded-3xl p-10 md:p-14 text-center space-y-8 shadow-2xl relative overflow-hidden">
                        
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-950/50 border border-red-500/40 text-red-400 rounded-full text-xs md:text-sm font-mono uppercase tracking-widest">
                            <AlertTriangle size={16} className="animate-pulse" />
                            {t('home.intercept_tag') || 'TRANSMISSION INTERCEPTÉE'}
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
                            {t('home.intercept_title') || 'Le Système est en cours de déploiement'}
                        </h2>

                        <p className="text-slate-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-mono">
                            <span className="text-red-500">[INFO]</span> {t('home.intercept_desc') || "J'injecte actuellement les nouveaux scénarios d'entraînement (CTF) dans la matrice. La plateforme évolue. Préparez-vous pour de nouvelles missions imminentes."}
                        </p>

                        <div className="pt-4 flex flex-wrap items-center justify-center gap-6">
                            <div className="inline-flex items-center gap-3 px-5 py-3 bg-slate-950 border border-slate-800 text-slate-400 rounded-xl text-xs font-mono tracking-wider">
                                <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
                                {t('home.intercept_status') || 'Compilation des missions en cours...'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
