import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Star, BookOpen, Sparkles, Zap, Code2, Heart, Mail, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';

const HomePage = ({ API_URL }) => {
    const navigate = useNavigate();
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme('light');
    }, [setTheme]);
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
            <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 px-4 md:px-6 overflow-hidden">
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
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    MYSTERIOUS
                                </motion.span>
                                <motion.span
                                    style={{ x: mousePosition.x * -0.5, y: mousePosition.y * -0.5 }}
                                    className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl brand-font text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mt-2 md:mt-4 text-glow-purple leading-[0.85] flex"
                                    animate={{
                                        y: [0, 10, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }}
                                >
                                    CLASSROOM
                                </motion.span>
                            </h1>

                            <p className="text-slate-600 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                                <strong className="text-slate-800">MYSTERIOUS CLASSROOM</strong> est une plateforme d'apprentissage en ligne 100% gratuite dédiée à la formation aux métiers du numérique et de la programmation.
                            </p>

                            {/* Section Objectif de l'Application (Requise pour la validation Google OAuth) */}
                            <div className="max-w-3xl mx-auto mt-6 p-6 md:p-8 bg-blue-50/90 backdrop-blur-md rounded-3xl border border-blue-200/80 shadow-md text-left space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-600 text-white rounded-2xl">
                                        <Sparkles size={22} />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">
                                        Objectif de l'application MYSTERIOUS CLASSROOM
                                    </h2>
                                </div>
                                <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                                    <strong>MYSTERIOUS CLASSROOM</strong> a pour objectif de démocratiser l'enseignement de l'informatique en offrant un accès libre et gratuit à des cours interactifs de haut niveau (Algorithmique, Python, Langage C, C++, JavaScript, React, DevOps). L'application permet à chaque apprenant d'évaluer ses compétences, d'exécuter du code, de suivre sa progression et d'obtenir des certifications.
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
                                className="px-6 py-4 md:px-10 md:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg md:text-xl rounded-2xl shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                            >
                                <Zap size={20} className="md:w-6 md:h-6 group-hover:text-yellow-400 transition-colors" />
                                COMMENCER MAINTENANT
                                <ArrowRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex justify-center gap-6 md:gap-12 pt-8"
                        >
                            <div className="text-center group">
                                <p className="text-4xl font-black text-slate-900 group-hover:text-blue-400 transition-colors">
                                    {(12840 + (stats.totalUsers || 0)).toLocaleString('fr-FR')}+
                                </p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Membres</p>
                            </div>
                            <div className="w-px h-12 bg-slate-300 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-4xl font-black text-slate-900 group-hover:text-purple-400 transition-colors">
                                    {(1420 + (stats.activeUsers || 0)).toLocaleString('fr-FR')}+
                                </p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Actifs</p>
                            </div>
                            <div className="w-px h-12 bg-slate-300 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-4xl font-black text-slate-900 group-hover:text-pink-400 transition-colors">{totalCoursesCount}</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Cours gratuits</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Educational Philosophy Section */}
            <div className="py-20 bg-slate-100  relative border-t border-slate-200 ">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <div className="flex items-center gap-3 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600  text-sm font-bold tracking-widest uppercase mb-4">
                            <BookOpen size={16} /> Notre Pédagogie
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900  max-w-3xl leading-tight">
                            L'Excellence par la Maîtrise des Fondamentaux
                        </h2>
                        <p className="mt-6 text-xl text-slate-600 max-w-2xl font-medium">
                            Table rase sur le superflu. Mysterious Classroom se consacre à 100% à la maîtrise absolue du <b>Langage C</b>, la pierre angulaire de l'informatique moderne et des systèmes d'exploitation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {/* Level 1 */}
                        <div className="bg-white border border-slate-200/90 rounded-[2.5rem] p-8 group hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 blur-3xl rounded-full" />
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                                <span className="text-3xl">⚙️</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">1. Compilation & RAM</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                                Les fondations pures. Chaîne de compilation GCC, gestion des octets, types stricts, préprocesseur et entrées/sorties standard.
                            </p>
                        </div>
                        {/* Level 2 */}
                        <div className="bg-white border border-slate-200/90 rounded-[2.5rem] p-8 group hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 blur-3xl rounded-full" />
                            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-md">
                                <span className="text-3xl">📍</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">2. Pointeurs & Références</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                                Adressage mémoire direct, arithmétique de pointeurs, déréférencement, passage par référence et chaînes de caractères.
                            </p>
                        </div>
                        {/* Level 3 */}
                        <div className="bg-white border border-slate-200/90 rounded-[2.5rem] p-8 group hover:border-orange-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/10 blur-3xl rounded-full" />
                            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-md">
                                <span className="text-3xl">🧠</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">3. Allocation & Systèmes</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                                Gestion du Tas (Heap) avec `malloc` / `free`, structures de données complexes, listes chaînées et entrées/sorties fichiers.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl overflow-hidden relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[100px] pointer-events-none" />
                        <h3 className="text-3xl font-black text-slate-900 mb-8 relative z-10">Les Piliers du C Masterclass</h3>
                        <div className="flex flex-wrap justify-center gap-4 relative z-10">
                            {[
                                { name: 'Compilateur GCC', icon: '⚙️' },
                                { name: 'Gestion RAM & Octets', icon: '💻' },
                                { name: 'Pointeurs & Adresses', icon: '🎯' },
                                { name: 'Passage par Référence', icon: '🔄' },
                                { name: 'Arithmétique Mémoire', icon: '📐' },
                                { name: 'Chaînes char*', icon: '🔤' },
                                { name: 'Allocation Malloc/Free', icon: '🧪' },
                                { name: 'Structures & Typedef', icon: '📦' },
                                { name: 'Listes Chaînées', icon: '🔗' },
                                { name: 'Fichiers & I/O', icon: '📁' }
                            ].map(tech => (
                                <span key={tech.name} className="flex items-center gap-2 px-6 py-3 bg-slate-50  border border-slate-200  rounded-xl text-slate-700  font-bold hover:text-blue-600 :text-white hover:border-blue-500 transition-colors shadow-lg shadow-black/5 ">
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
                        className="bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-[3rem] p-10 md:p-16 text-center space-y-10 relative"
                    >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                            <div className="w-24 h-24 p-1.5 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full shadow-2xl overflow-hidden">
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
                                        <span className="text-3xl font-black bg-gradient-to-tr from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            {config?.creatorAvatar || 'MF'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-blue-400">LE CRÉATEUR</h3>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900">{config?.creatorName || 'Mouhamed FALL'}</h2>
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
                                <div key={i} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-200 group hover:border-blue-500/30 transition-colors">
                                    <item.icon size={24} className="mx-auto mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                                    <p className="text-slate-800 font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-6">
                            <a href="#" className="p-4 bg-white border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all">
                                <Github size={24} />
                            </a>
                            <a href="#" className="p-4 bg-white border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:mouhamedfa2007@gmail.com" className="p-4 bg-white border-slate-200 rounded-2xl text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all">
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
