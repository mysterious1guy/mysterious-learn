import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { coursesData } from '../courses/data.jsx';
import { ChevronRight, Star, Clock, Users } from 'lucide-react';
import { useEffect } from 'react';

const DashboardPage = ({ user, favorites, toggleFavorite, progressions, API_URL, searchQuery = '' }) => {
    const navigate = useNavigate();
    const [courseStats, setCourseStats] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 15;
            const y = (clientY / window.innerHeight - 0.5) * 15;
            setMousePosition({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/courses/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setCourseStats(data);
                }
            } catch (err) {
                console.error('Erreur fetch stats cours:', err);
            }
        };
        fetchStats();

        const timer = setTimeout(() => {
            const completedCount = Object.values(progressions).filter(p => p.progress === 100).length;
            let text = `Bon retour, ${user?.firstName}. Prêt à continuer ton apprentissage de l'algorithmique ?`;

            if (completedCount > 0) {
                text = `Bravo pour tes ${completedCount} leçons terminées ! Tu progresses bien en logique.`;
            } else if (Object.keys(progressions).length > 0) {
                text = "Tu as commencé ton parcours. Continue comme ça pour maîtriser les bases.";
            }

            window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                detail: { text }
            }));
        }, 2500);

        return () => clearTimeout(timer);
    }, [API_URL, progressions, user]);

    const filteredCourses = coursesData.map(category => ({
        ...category,
        items: category.items.filter(course =>
            course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
        )
    })).filter(category => category.items.length > 0);

    const userCategories = [];

    // 1. Reprendre l'apprentissage
    if (progressions) {
        const inProgressCoursesIds = Object.entries(progressions)
            .filter(([id, data]) => data.progress > 0 && data.progress < 100)
            .sort((a, b) => new Date(b[1].lastAccessed || 0) - new Date(a[1].lastAccessed || 0))
            .slice(0, 3)
            .map(([id]) => id);

        const inProgressCourses = inProgressCoursesIds.map(id => {
            for (const cat of coursesData) {
                const c = cat.items.find(item => item.id === id);
                if (c) return c;
            }
            return null;
        }).filter(Boolean);

        if (inProgressCourses.length > 0) {
            userCategories.push({
                id: 'resume',
                category: "Reprendre l'apprentissage",
                items: inProgressCourses
            });
        }
    }

    // 2. Favoris
    if (favorites && favorites.length > 0) {
        const favoriteCourses = favorites.map(id => {
            for (const cat of coursesData) {
                const c = cat.items.find(item => item.id === id);
                if (c) return c;
            }
            return null;
        }).filter(Boolean);

        if (favoriteCourses.length > 0) {
            userCategories.push({
                id: 'favorites',
                category: 'Mes Cours Favoris',
                items: favoriteCourses
            });
        }
    }

    const finalCategories = [...userCategories, ...filteredCourses];

    return (
        <div className="min-h-screen transition-colors duration-500 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 dark:from-gray-900 dark:via-[#0a0f1e] dark:to-black pb-20">
            {/* Header */}
            <div className="pt-24 pb-12 px-6 lg:px-12 relative overflow-hidden">
                {/* Background Blobs */}
                <motion.div
                    style={{ x: mousePosition.x * 0.8, y: mousePosition.y * 0.8 }}
                    className="absolute top-10 right-[10%] w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -z-10"
                />
                <motion.div
                    style={{ x: mousePosition.x * -0.5, y: mousePosition.y * -0.5 }}
                    className="absolute top-20 left-[5%] w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full -z-10"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto flex flex-col items-center text-center"
                >
                    <div className="relative group cursor-default mb-2">
                        <motion.h1
                            className="text-center font-black tracking-tighter leading-[0.8] flex flex-col items-center"
                        >
                            <span className="block text-6xl md:text-[10rem] text-slate-900 dark:text-white mb-2 opacity-100">
                                BIENVENUE,
                            </span>
                            <span className="inline-block text-5xl md:text-8xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm pb-4 mt-2">
                                {user?.firstName?.toUpperCase() || 'MYSTÉRIEUX'} !
                            </span>
                            <motion.div
                                animate={{ rotate: [0, 20, -10, 20, -10, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 3,
                                    ease: 'easeInOut'
                                }}
                                whileHover={{
                                    scale: 1.2,
                                    rotate: [0, 25, -15, 25, -15, 0],
                                    transition: { duration: 0.8, repeat: Infinity }
                                }}
                                whileTap={{ scale: 0.9 }}
                                className="inline-block ml-4 origin-bottom-right cursor-pointer drop-shadow-lg"
                                title="Coucou !"
                            >
                                👋
                            </motion.div>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-lg md:text-xl text-slate-600 dark:text-gray-400 font-medium max-w-2xl mx-auto opacity-90 leading-relaxed"
                        >
                            Prêt à continuer ton apprentissage mystérieux ? <br className="hidden md:block" />
                            Ta quête vers la maîtrise technologique continue ici.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="mt-8 flex items-center gap-4 justify-center"
                    >
                        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full" />
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Categories avec défilement horizontal */}
            <div className="space-y-12">
                {finalCategories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="pl-6 lg:pl-12"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-xl md:text-2xl brand-font-secondary text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-white/40 uppercase tracking-[0.2em] font-black">{category.category}</h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent ml-6" />
                        </div>

                        <div className="overflow-x-auto pb-8 custom-horizontal-scrollbar pr-6 scroll-smooth">
                            <div className={`flex gap-6 w-full ${category.items.length === 1 ? '' : 'w-max'}`}>
                                {category.items.map((course) => (
                                    <motion.div
                                        key={course.id}
                                        whileHover={{ scale: 1.01, y: -5 }}
                                        onClick={() => navigate(`/course/${course.id}`)}
                                        className={`${category.items.length === 1 ? 'w-full max-w-5xl' : 'w-[300px] md:w-[400px]'} flex-shrink-0 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer group`}
                                    >
                                        {/* Image du cours */}
                                        <div className={`${category.items.length === 1 ? 'h-80' : 'h-48'} relative overflow-hidden`}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-900 z-10" />
                                            <img
                                                src={course.image || `https://source.unsplash.com/random/800x600/?coding,${course.id}`}
                                                alt={course.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80'; // Fallback image
                                                }}
                                            />
                                            <div className="absolute top-3 right-3 z-20">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(course.id);
                                                    }}
                                                    className="p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-colors"
                                                >
                                                    <Star
                                                        size={16}
                                                        className={favorites.includes(course.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                                    />
                                                </button>
                                            </div>
                                            <div className="absolute top-3 left-3 z-20 flex gap-2">
                                                {course.tags?.slice(0, 2).map((tag, i) => (
                                                    <span key={i} className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full backdrop-blur-md ${category.items.length === 1 ? 'text-xs px-3 py-1' : ''}`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Contenu */}
                                        <div className={`p-6 md:p-8 ${category.items.length === 1 ? 'md:flex md:flex-col md:justify-center' : ''}`}>
                                            <h3 className={`${category.items.length === 1 ? 'text-3xl' : 'text-xl'} font-black text-slate-900 dark:text-white mb-3 line-clamp-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors tracking-tight`}>
                                                {course.name}
                                            </h3>
                                            <p className={`${category.items.length === 1 ? 'text-base' : 'text-xs'} text-slate-600 dark:text-gray-400 font-medium mb-6 line-clamp-2 min-h-[40px] leading-relaxed`}>
                                                {course.desc}
                                            </p>

                                            {/* Métadonnées - Admin Only */}
                                            {user?.email === 'mouhamedfall@esp.sn' && (
                                                <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <Users size={12} className="text-purple-500/50" />
                                                        <span>{courseStats[course.id] || 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Star size={12} className="text-yellow-500 fill-yellow-500/20" />
                                                        <span>{course.rating || '4.8'}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Barre de progression ou bouton */}
                                            {progressions[course.id] ? (
                                                <div className="space-y-2 pt-2">
                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-blue-400">
                                                        <span>Progression</span>
                                                        <span>{progressions[course.id].progress}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                                            style={{ width: `${progressions[course.id].progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <button className="w-full py-3 rounded-xl bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-white/5 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all duration-300 flex items-center justify-center gap-2">
                                                    Commencer
                                                    <ChevronRight size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
                .custom-horizontal-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-horizontal-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 10px;
                }
                .custom-horizontal-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to right, #3b82f6, #9333ea);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .custom-horizontal-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to right, #60a5fa, #a855f7);
                }
            `}</style>
        </div>
    );
};

export default DashboardPage;