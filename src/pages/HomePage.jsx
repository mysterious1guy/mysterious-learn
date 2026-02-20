import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Star, BookOpen, Sparkles, Zap, Code2, Heart, Mail, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';
import CourseCarousel from '../components/CourseCarousel';

// Use local data for showcasing on landing
import { coursesData } from '../courses/data';

const HomePage = ({ API_URL }) => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });
    const [courseStats, setCourseStats] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            setMousePosition({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeMouseMoveListener?.() || window.removeEventListener('mousemove', handleMouseMove);
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
                console.error('Erreur fetch stats:', err);
            }
        };
        fetchStats();
    }, [API_URL]);

    // Extracting courses to showcase
    const featuredCourses = [];
    if (coursesData && coursesData.length > 0) {
        coursesData.forEach(category => {
            category.items.forEach(item => {
                featuredCourses.push({
                    ...item,
                    categoryLabel: category.category,
                    students: courseStats[item.id] || 0
                });
            });
        });
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <motion.div
                    style={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"
                />
                <motion.div
                    style={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            </div>

            {/* Hero Section */}
            <div className="relative pt-20 pb-16 px-6">
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
                                    className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 leading-[0.8]"
                                >
                                    MYSTERIOUS
                                </motion.span>
                                <motion.span
                                    style={{ x: mousePosition.x * -0.5, y: mousePosition.y * -0.5 }}
                                    className="text-4xl md:text-7xl lg:text-8xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mt-2 drop-shadow-[0_0_30px_rgba(147,51,234,0.3)]"
                                >
                                    CLASSROOM
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
                                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xl rounded-2xl shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                            >
                                <Zap size={24} className="group-hover:text-yellow-400 transition-colors" />
                                COMMENCER MAINTENANT
                                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Real Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex justify-center gap-12 pt-8"
                        >
                            <div className="text-center group">
                                <p className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors">{stats.totalUsers}+</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Membres</p>
                            </div>
                            <div className="w-px h-12 bg-slate-800 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-4xl font-black text-white group-hover:text-purple-400 transition-colors">{stats.activeUsers}</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Actifs</p>
                            </div>
                            <div className="w-px h-12 bg-slate-800 hidden md:block" />
                            <div className="text-center group">
                                <p className="text-4xl font-black text-white group-hover:text-pink-400 transition-colors">25+</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Cours gratuits</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Course Carousel Section */}
            <div className="py-20 bg-slate-900/40 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-12">
                        <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <Sparkles size={16} /> Aperçu du Catalogue
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white text-center">Explorez nos Univers</h2>
                    </div>

                    <CourseCarousel courses={featuredCourses.slice(0, 6)} />
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
                            <div className="w-24 h-24 p-1.5 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full shadow-2xl">
                                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                                    <span className="text-3xl font-black bg-gradient-to-tr from-blue-400 to-purple-400 bg-clip-text text-transparent">MF</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-blue-400">LE CRÉATEUR</h3>
                            <h2 className="text-4xl md:text-6xl font-black text-white">Mouhamed FALL</h2>
                            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto">
                                "Je crois en un monde où la technologie est accessible à tous. Mysterious Classroom est ma contribution pour rendre l'apprentissage du code gratuit, fun et interactif."
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


        </div>
    );
};

export default HomePage;
