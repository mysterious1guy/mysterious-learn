import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Star, BookOpen, Sparkles, Zap, Code2, Heart, Mail, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';

const HomePage = ({ API_URL }) => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });
    const [courseStats, setCourseStats] = useState({});
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

                const cStatsRes = await fetch(`${API_URL}/courses/stats`);
                if (cStatsRes.ok) {
                    const cStatsData = await cStatsRes.json();
                    setCourseStats(cStatsData);
                }
            } catch (err) {
                console.error('Erreur fetch stats/config:', err);
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

    // Le site contient désormais 36 cours officiels et 12 langages
    const totalCoursesCount = 36;

    return (
        <div className="min-h-screen bg-transparent font-sans selection:bg-blue-500/30">
            {/* Background elements */}

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 overflow-hidden">
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
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h1 className="flex flex-col items-center">
                                <motion.span
                                    style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
                                    className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] brand-font text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-glow-blue leading-[0.85] flex"
                                >
                                    {"MYSTERIOUS".split('').map((char, i) => (
                                        <motion.span
                                            key={i}
                                            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                                            transition={{
                                                duration: 6,
                                                times: [0, (i * 0.15) / 6, (i * 0.15 + 0.1) / 6, 0.8, 0.85, 1],
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.span>
                                <motion.span
                                    style={{ x: mousePosition.x * -0.5, y: mousePosition.y * -0.5 }}
                                    className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl brand-font text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mt-2 md:mt-4 text-glow-purple leading-[0.85] flex"
                                >
                                    {"CLASSROOM".split('').map((char, i) => (
                                        <motion.span
                                            key={i}
                                            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                                            transition={{
                                                duration: 6,
                                                times: [0, ((i + 10) * 0.15) / 6, ((i + 10) * 0.15 + 0.1) / 6, 0.8, 0.85, 1],
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.span>
                            </h1>

                            <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                                L'éducation technologique repensée. Apprenez gratuitement avec une plateforme interactive et immersive.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-6 py-4 md:px-10 md:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg md:text-xl rounded-2xl shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                            >
                                <Zap size={20} className="md:w-6 md:h-6 group-hover:text-yellow-400 transition-colors" />
                                COMMENCER MAINTENANT
                                <ArrowRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Real Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex justify-center gap-6 md:gap-12 pt-8"
                        >
                            <div className="text-center group">
                                <p className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors">{stats.totalUsers}</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Membres</p>
                            </div>
                            <div className="w-px h-12 bg-slate-800 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-4xl font-black text-white group-hover:text-purple-400 transition-colors">{stats.activeUsers}</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Actifs</p>
                            </div>
                            <div className="w-px h-12 bg-slate-800 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-4xl font-black text-white group-hover:text-pink-400 transition-colors">{totalCoursesCount}</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Cours gratuits</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Educational Philosophy Section */}
            <div className="py-20 bg-slate-100 dark:bg-slate-900/40 relative border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <div className="flex items-center gap-3 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <BookOpen size={16} /> Notre Pédagogie
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white max-w-3xl leading-tight">
                            L'Excellence par la Maîtrise des Fondamentaux
                        </h2>
                        <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
                            Nous fuyons la surabondance. Mysterious Classroom se concentre fièrement sur 12 piliers technologiques essentiels, forgés à travers 3 niveaux d'expertise stricts.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {/* Level 1 */}
                        <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 hover:border-blue-500/50 transition-all group shadow-2xl">
                            <div className="w-16 h-16 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                <span className="text-3xl">🐣</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Niveau Débutant</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Les fondations pures. Apprenez la logique algorithmique, la syntaxe de base et les concepts clés sans aucune abstraction. 100% pratique.
                            </p>
                        </div>
                        {/* Level 2 */}
                        <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 hover:border-purple-500/50 transition-all group shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
                            <div className="w-16 h-16 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Intermédiaire</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                L'architecture et la rigueur. Structure de données avancée, programmation orientée objet, gestion mémoire et création de projets complets.
                            </p>
                        </div>
                        {/* Level 3 */}
                        <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 hover:border-orange-500/50 transition-all group shadow-2xl">
                            <div className="w-16 h-16 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all">
                                <span className="text-3xl">💻</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Expertise Avancée</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Conçu pour l'ingénierie. Algorithmes complexes, sécurité, performance système et architectures backend/frontend professionnelles.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl overflow-hidden relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[100px] pointer-events-none" />
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 relative z-10">Les 12 Piliers de l'Apprentissage</h3>
                        <div className="flex flex-wrap justify-center gap-4 relative z-10">
                            {[
                                { name: 'Algorithmique', icon: '🧠' },
                                { name: 'Langage C', icon: '⚙️' },
                                { name: 'C++', icon: '🚀' },
                                { name: 'Python', icon: '🐍' },
                                { name: 'Bash Scripts', icon: '🐧' },
                                { name: 'HTML5', icon: '🌐' },
                                { name: 'CSS3', icon: '🎨' },
                                { name: 'JavaScript', icon: '⚡' },
                                { name: 'PHP', icon: '🐘' },
                                { name: 'MySQL', icon: '🐬' },
                                { name: 'MongoDB', icon: '🍃' },
                                { name: 'ReactJS', icon: '⚛️' }
                            ].map(tech => (
                                <span key={tech.name} className="flex items-center gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 font-bold hover:text-blue-600 dark:hover:text-white hover:border-blue-500 transition-colors shadow-lg shadow-black/5 dark:shadow-black/20">
                                    <span className="text-xl">{tech.icon}</span>
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                        <div className="mt-12 relative z-10">
                            <button
                                onClick={() => navigate('/auth')}
                                className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 font-black rounded-xl transition-colors shadow-xl"
                            >
                                Commencer l'Aventure
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Creator Section (Centralized) */}
            <div className="py-32 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] -z-10" />

                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-[3rem] p-10 md:p-16 text-center space-y-10 relative"
                    >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                            <div className="w-24 h-24 p-1.5 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full shadow-2xl overflow-hidden">
                                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                                    {config?.creatorAvatar && config.creatorAvatar.length > 2 ? (
                                        <img src={config.creatorAvatar} alt="Créateur" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl font-black bg-gradient-to-tr from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            {config?.creatorAvatar || 'MF'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-blue-400">LE CRÉATEUR</h3>
                            <h2 className="text-4xl md:text-6xl font-black text-white">{config?.creatorName || 'Mouhamed FALL'}</h2>
                            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto italic">
                                "{config?.creatorBio && config.creatorBio.length > 0
                                    ? config.creatorBio[config.creatorBio.length - 1]
                                    : "Je crois en un monde où la technologie est accessible à tous. Mysterious Classroom est ma contribution pour rendre l'apprentissage du code gratuit, fun et interactif."
                                }"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Sparkles, label: "Statut", value: "Étudiant L1" },
                                { icon: Heart, label: "Passion", value: "Code & Partage" },
                                { icon: Code2, label: "Focus", value: "Apprentissage" }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800/50 group hover:border-blue-500/30 transition-colors">
                                    <item.icon size={24} className="mx-auto mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                                    <p className="text-white font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-6">
                            <a href="#" className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-400 hover:text-white hover:border-blue-500 transition-all">
                                <Github size={24} />
                            </a>
                            <a href="#" className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-400 hover:text-white hover:border-blue-500 transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:mouhamedfa2007@gmail.com" className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-400 hover:text-white hover:border-blue-500 transition-all">
                                <Mail size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>


        </div >
    );
};

export default HomePage;
