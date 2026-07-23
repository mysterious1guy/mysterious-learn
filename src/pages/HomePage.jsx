import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Star, BookOpen, Sparkles, Zap, Code2, Heart, Mail, ExternalLink, Github, Twitter, Linkedin, Terminal, Shield, Cpu, Layers, Database, Globe } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';

const HomePage = ({ API_URL }) => {
    const navigate = useNavigate();
    const { setTheme } = useTheme();

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

    const languages = [
        {
            name: "Langage C",
            tag: "Système & RAM",
            color: "from-blue-600 to-indigo-700",
            bgLight: "bg-blue-50",
            textColor: "text-blue-600",
            borderColor: "border-blue-200",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
            desc: "L'art d'interagir directement avec les octets de la mémoire vive et le matériel CPU."
        },
        {
            name: "C++",
            tag: "Performance & Jeux",
            color: "from-indigo-600 to-purple-700",
            bgLight: "bg-indigo-50",
            textColor: "text-indigo-600",
            borderColor: "border-indigo-200",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
            desc: "Puissance extrême, moteurs 3D, programmation orientée objet et calculs parallèles."
        },
        {
            name: "Python",
            tag: "IA & Data Science",
            color: "from-emerald-600 to-teal-700",
            bgLight: "bg-emerald-50",
            textColor: "text-emerald-600",
            borderColor: "border-emerald-200",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
            desc: "Machine Learning, automatisation de scripts et syntaxe claire d'une élégance rare."
        },
        {
            name: "JavaScript",
            tag: "Web Fullstack",
            color: "from-amber-500 to-yellow-600",
            bgLight: "bg-amber-50",
            textColor: "text-amber-600",
            borderColor: "border-amber-200",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80",
            desc: "Le langage universel du web interactif, des applications front-end et des serveurs Node.js."
        },
        {
            name: "Rust",
            tag: "Sécurité & Futur",
            color: "from-orange-600 to-red-700",
            bgLight: "bg-orange-50",
            textColor: "text-orange-600",
            borderColor: "border-orange-200",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
            desc: "Garantie de sécurité mémoire sans garbage collector et rapidité système exceptionnelle."
        },
        {
            name: "Go (Golang)",
            tag: "Cloud & Microservices",
            color: "from-cyan-600 to-blue-700",
            bgLight: "bg-cyan-50",
            textColor: "text-cyan-600",
            borderColor: "border-cyan-200",
            image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80",
            desc: "Concurrence native, simplicité d'architecture et déploiement ultra-rapide de microservices."
        },
        {
            name: "SQL & Databases",
            tag: "Données & Structure",
            color: "from-violet-600 to-purple-700",
            bgLight: "bg-violet-50",
            textColor: "text-violet-600",
            borderColor: "border-violet-200",
            image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80",
            desc: "Modélisation relationnelle, requêtes complexes et persistance robuste des données."
        },
        {
            name: "HTML5 & CSS3",
            tag: "Design & UX",
            color: "from-pink-600 to-rose-700",
            bgLight: "bg-pink-50",
            textColor: "text-pink-600",
            borderColor: "border-pink-200",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80",
            desc: "Création d'interfaces web somptueuses, responsive design et animations modernes."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30 text-slate-900 relative overflow-hidden">
            {/* Animated Background Mouse Parallax Blobs & Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div
                    className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-blue-400/20 rounded-full blur-[140px] transition-transform duration-300 ease-out"
                    style={{
                        transform: `translate3d(${mousePosition.x * 40}px, ${mousePosition.y * 40}px, 0)`
                    }}
                />
                <div
                    className="absolute top-1/3 -right-40 w-[700px] h-[700px] bg-purple-400/20 rounded-full blur-[160px] transition-transform duration-300 ease-out"
                    style={{
                        transform: `translate3d(${mousePosition.x * -50}px, ${mousePosition.y * -50}px, 0)`
                    }}
                />
                <div
                    className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-indigo-400/15 rounded-full blur-[130px] transition-transform duration-300 ease-out"
                    style={{
                        transform: `translate3d(${mousePosition.x * 30}px, ${mousePosition.y * 30}px, 0)`
                    }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 md:px-6 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-10">
                        {/* Logo animé */}
                        <motion.div
                            style={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
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
                            <h1 className="flex flex-col items-center">
                                <span className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] brand-font text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 leading-[0.85]">
                                    MYSTERIOUS
                                </span>
                                <span className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl brand-font text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-2 md:mt-4 leading-[0.85]">
                                    CLASSROOM
                                </span>
                            </h1>

                            <p className="text-slate-600 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                                L'écosystème d'excellence pour <strong className="text-slate-900">apprendre à coder</strong>, maîtriser la logique machine et bâtir l'avenir du numérique.
                            </p>

                            {/* Section Objectif de l'Application */}
                            <div className="max-w-3xl mx-auto mt-6 p-6 md:p-8 bg-white backdrop-blur-md rounded-3xl border border-slate-200 shadow-xl text-left space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-md">
                                        <Sparkles size={22} />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
                                        Objectif de la plateforme MYSTERIOUS CLASSROOM
                                    </h2>
                                </div>
                                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                                    <strong>MYSTERIOUS CLASSROOM</strong> a pour vocation de rendre l'apprentissage de la programmation accessible à tous. Notre plateforme prépare un environnement d'apprentissage intuitif et immersif permettant à chaque passionné de s'initier aux fondamentaux du développement logiciel.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg md:text-xl rounded-2xl shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                            >
                                <Zap size={22} className="group-hover:text-yellow-400 transition-colors" />
                                REJOINDRE LA COMMUNAUTÉ
                                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex justify-center gap-8 md:gap-16 pt-6"
                        >
                            <div className="text-center group">
                                <p className="text-4xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {(12840 + (stats.totalUsers || 0)).toLocaleString('fr-FR')}+
                                </p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Membres Inscrits</p>
                            </div>
                            <div className="w-px h-12 bg-slate-300 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-4xl font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                                    {(1420 + (stats.activeUsers || 0)).toLocaleString('fr-FR')}+
                                </p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Apprenants Actifs</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Languages Gallery Showcase Section */}
            <section className="py-24 bg-white border-y border-slate-200 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black tracking-widest uppercase mx-auto w-max border border-blue-200">
                            <Code2 size={16} /> GALERIE DU CODE
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                            Explorez les Langages de Programmation
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                            Chaque langage est une fenêtre sur une manière unique d'interagir avec la machine et d'exprimer votre logique.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {languages.map((lang, idx) => (
                            <motion.div
                                key={lang.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 group flex flex-col"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={lang.image}
                                        alt={lang.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <span className={`px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider ${lang.textColor}`}>
                                            {lang.tag}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-2">{lang.name}</h3>
                                        <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4">
                                            {lang.desc}
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Module en préparation</span>
                                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Creator Section */}
            <section className="py-24 relative overflow-hidden bg-slate-50">
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
                                            alt="Créateur"
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
                            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-blue-600">LE CRÉATEUR</h3>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900">{config?.creatorName || 'Mouhamed FALL'}</h2>
                            <p className="text-slate-600 text-lg md:text-xl font-medium max-w-xl mx-auto italic leading-relaxed">
                                "{config?.creatorBio && config.creatorBio.length > 0
                                    ? config.creatorBio[config.creatorBio.length - 1]
                                    : "Je crois en un monde où la technologie est accessible à tous. Mysterious Classroom est ma contribution pour rendre l'apprentissage du code gratuit, passionnant et interactif."
                                }"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Sparkles, label: "Statut", value: "Étudiant L1" },
                                { icon: Heart, label: "Passion", value: "Code & Partage" },
                                { icon: Code2, label: "Focus", value: "Apprentissage" }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 group hover:border-blue-500/30 transition-colors">
                                    <item.icon size={24} className="mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                                    <p className="text-slate-900 font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-6 pt-2">
                            <a href="#" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all">
                                <Github size={24} />
                            </a>
                            <a href="#" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:mouhamedfa2007@gmail.com" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all">
                                <Mail size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* BRILLIANT UNDER CONSTRUCTION ANNOUNCEMENT BANNER AT THE BOTTOM */}
            <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white relative overflow-hidden border-t border-slate-800 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full -ml-20 -mb-20 pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-14 text-center space-y-8 shadow-2xl">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full text-xs md:text-sm font-black uppercase tracking-widest shadow-lg shadow-amber-500/10">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                            🚧 ANNONCE OFFICIELLE : PLATEFORME EN CONSTRUCTION
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                            Mysterious Classroom prépare son tout nouvel écosystème
                        </h2>

                        <p className="text-slate-300 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
                            Nos équipes et développeurs travaillent activement en coulisses pour concevoir des expériences de cours et de jeux de code interactifs d'exception. Le site est actuellement en phase de construction et de préparation des futurs contenus.
                        </p>

                        <div className="pt-4 flex flex-wrap items-center justify-center gap-6">
                            <div className="inline-flex items-center gap-3 px-5 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-2xl text-xs md:text-sm font-black tracking-wider">
                                <span className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                                ✨ Le site est actuellement en cours d'amélioration
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
