import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Activity, Shield, AlertTriangle, Github, Linkedin, Mail } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';

const HomePage = ({ API_URL }) => {
    const navigate = useNavigate();
    const { setTheme } = useTheme();
    const { t } = useLanguage();
    const { scrollY } = useScroll();

    // Effet parallaxe sur le texte principal
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);

    // Force le thème clair pour cette nouvelle version
    useEffect(() => {
        setTheme('light');
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
            level: "01",
            title: t('home.lvl1_title') || "Logique & Cryptographie",
            tag: t('home.lvl1_tag') || "INITIATION",
            desc: t('home.lvl1_desc') || "Déchiffrez des messages encodés en Base64, Hexadécimal ou ROT13. Maîtrisez les bases de la cryptographie et de la logique booléenne."
        },
        {
            level: "02",
            title: t('home.lvl2_title') || "Système & Shell (Linux)",
            tag: t('home.lvl2_tag') || "FONDAMENTAUX",
            desc: t('home.lvl2_desc') || "Naviguez dans des environnements UNIX virtuels. Analysez des logs systèmes, trouvez des fichiers cachés et manipulez le shell Bash."
        },
        {
            level: "03",
            title: t('home.lvl3_title') || "Analyse de Code & Bugs",
            tag: t('home.lvl3_tag') || "AVANCÉ",
            desc: t('home.lvl3_desc') || "Plongez dans des scripts Python ou des binaires C. Identifiez des failles logiques, des débordements ou des portes dérobées (backdoors)."
        },
        {
            level: "04",
            title: t('home.lvl4_title') || "Opérations Cyber",
            tag: t('home.lvl4_tag') || "EXPERT",
            desc: t('home.lvl4_desc') || "Simulez des attaques Web réelles (XSS, SQLi, LFI) sur nos serveurs d'entraînement isolés. Pénétrez le système, capturez le drapeau."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30 text-slate-800 relative overflow-hidden">
            
            {/* Arrière-plan dynamique et clair */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50">
                {/* Grille subtile */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
                
                {/* Effet d'aura qui suit la souris (très doux) */}
                <div
                    className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[100px] transition-transform duration-700 ease-out"
                    style={{ transform: `translate3d(${mousePosition.x * 60}px, ${mousePosition.y * 60}px, 0)` }}
                />
                <div
                    className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[100px] transition-transform duration-1000 ease-out"
                    style={{ transform: `translate3d(${mousePosition.x * -40}px, ${mousePosition.y * -40}px, 0)` }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 md:px-6 overflow-hidden z-10 flex flex-col items-center justify-center min-h-[90vh]">
                <motion.div 
                    className="max-w-7xl mx-auto w-full"
                    style={{ y: y1, opacity: opacity1 }}
                >
                    <div className="text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-semibold tracking-widest shadow-sm mx-auto">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {t('home.established_connection') || "Connexion Sécurisée Établie"}
                            </div>

                            {/* Le retour du Grand Titre */}
                            <h1 className="flex flex-col items-center justify-center mt-8">
                                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85]">
                                    {t('home.title_part1') || "MYSTERIOUS"}
                                </span>
                                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tighter leading-[0.85] mt-2">
                                    {t('home.title_part2') || "CLASSROOM"}
                                </span>
                            </h1>

                            <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-10 font-medium">
                                {t('home.subtitle') || "Initialisation de la première plateforme d'apprentissage par l'investigation et le CTF. Pas de théorie ennuyeuse, juste des serveurs virtuels à analyser, du code à auditer et des flags à capturer."}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-4 mt-12"
                        >
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg rounded-2xl shadow-xl shadow-slate-900/20 active:scale-95 transition-all flex items-center gap-3"
                            >
                                {t('home.btn_create_agent') || "Créer un Dossier d'Agent"}
                                <ArrowRight size={20} />
                            </button>
                            
                            <button
                                onClick={() => document.getElementById('mechanics').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold text-lg rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95 flex items-center gap-2"
                            >
                                {t('home.btn_read_briefing') || "Lire le Briefing"}
                            </button>
                        </motion.div>

                        {/* Stats - Minimaliste */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex justify-center gap-12 pt-16 mt-8 max-w-4xl mx-auto"
                        >
                            <div className="text-center">
                                <p className="text-4xl font-bold text-slate-900">
                                    {(12840 + (stats.totalUsers || 0)).toLocaleString()}
                                </p>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2">{t('home.stats_registered') || "Agents Enregistrés"}</p>
                            </div>
                            <div className="w-px h-16 bg-slate-200 hidden md:block" />
                            <div className="text-center">
                                <p className="text-4xl font-bold text-slate-900">
                                    {(1420 + (stats.activeUsers || 0)).toLocaleString()}
                                </p>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2">{t('home.stats_active') || "Agents Opérationnels"}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Section Fonctionnement - Sans icônes génériques, typographie forte */}
            <section id="mechanics" className="py-32 bg-white relative z-10 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            {t('home.mechanics_title') || "Apprendre par l'Investigation (CTF)"}
                        </h2>
                        <p className="text-slate-500 text-xl max-w-2xl mx-auto">
                            {t('home.mechanics_desc') || "Oubliez les QCM. Ici, vous êtes face à des systèmes réels simulés. Cherchez les indices, trouvez la faille et prouvez votre expertise."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {[
                            {
                                step: "01",
                                title: t('home.step1_title') || "Analyser le Scénario",
                                desc: t('home.step1_desc') || "Une entreprise virtuelle a été piratée. Lisez le briefing de mission, étudiez l'architecture et analysez les logs fournis.",
                            },
                            {
                                step: "02",
                                title: t('home.step2_title') || "Trouver la Vulnérabilité",
                                desc: t('home.step2_desc') || "Utilisez vos compétences en logique, programmation ou réseau pour exploiter la faille (XSS, Injection, mauvaise configuration).",
                            },
                            {
                                step: "03",
                                title: t('home.step3_title') || "Capturer le FLAG",
                                desc: t('home.step3_desc') || "Une fois le système compromis, récupérez une chaîne de caractère spéciale (ex: FLAG{h4ck3d}). Validez-la pour gagner de l'XP.",
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.2, duration: 0.6 }}
                                className="relative group"
                            >
                                <div className="text-[120px] font-black text-slate-100 absolute -top-20 -left-6 z-0 pointer-events-none select-none transition-all duration-500 group-hover:text-blue-50">
                                    {item.step}
                                </div>
                                <div className="relative z-10 pt-8 border-t-2 border-slate-900">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Niveaux - Design "Editorial" épuré */}
            <section className="py-32 bg-slate-50 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            {t('home.clearance_title') || "Parcours d'Habilitation"}
                        </h2>
                        <p className="text-xl text-slate-500 max-w-2xl mt-4">
                            {t('home.clearance_desc') || "Les missions sont classifiées par niveau d'habilitation (Clearance Level). Acquérez de l'expérience pour débloquer l'accès aux opérations les plus critiques."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {clearanceLevels.map((lvl, idx) => (
                            <motion.div
                                key={lvl.level}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-10 md:p-12 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-500"
                            >
                                <div className="flex flex-col h-full justify-between gap-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="font-bold text-sm text-blue-600 tracking-widest">LEVEL {lvl.level}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{lvl.tag}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 mb-4">{lvl.title}</h3>
                                        <p className="text-slate-600 text-lg leading-relaxed">
                                            {lvl.desc}
                                        </p>
                                    </div>
                                    <div className="w-12 h-1 bg-slate-900 rounded-full" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Créateur - Claire et élégante */}
            <section className="py-32 relative bg-white border-t border-slate-100 z-10">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center space-y-10"
                    >
                        <div className="w-32 h-32 mx-auto rounded-full p-2 bg-slate-50 border border-slate-200">
                            <div className="w-full h-full bg-slate-200 rounded-full overflow-hidden">
                                {config?.creatorAvatar && config.creatorAvatar.length > 2 ? (
                                    <img
                                        src={config.creatorAvatar}
                                        alt="L'Architecte"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(config?.creatorName || 'MF')}&background=f1f5f9&color=0f172a&size=128`;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-black text-slate-900">
                                        MF
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600">
                                {t('home.architect_tag') || "L'ARCHITECTE SYSTÈME"}
                            </h3>
                            <h2 className="text-4xl font-black text-slate-900">{config?.creatorName || 'Mouhamed FALL'}</h2>
                            <p className="text-slate-600 text-xl max-w-2xl mx-auto italic leading-relaxed">
                                "{config?.creatorBio && config.creatorBio.length > 0
                                    ? config.creatorBio[config.creatorBio.length - 1]
                                    : t('home.architect_quote') || "Je crois en un monde où la technologie doit être comprise pour être sécurisée. Mysterious Classroom est l'arène que j'ai bâtie pour forger la prochaine génération d'experts cyber."
                                }"
                            </p>
                        </div>

                        <div className="flex justify-center gap-6 pt-6">
                            <a href="#" className="p-4 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                <Github size={24} />
                            </a>
                            <a href="#" className="p-4 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:mouhamedfa2007@gmail.com" className="p-4 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all">
                                <Mail size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
