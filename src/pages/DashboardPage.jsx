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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0f1e] to-black pb-20">
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
                    className="max-w-7xl mx-auto"
                >
                    <div className="flex items-center flex-wrap gap-3 mb-4">
                        <h1 className="text-4xl md:text-5xl brand-font text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Bienvenue, {user?.firstName} !
                        </h1>
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
                            className="text-4xl md:text-5xl inline-block origin-bottom-right cursor-pointer drop-shadow-lg"
                            title="Coucou !"
                        >
                            👋
                        </motion.div>
                    </div>
                    <p className="text-gray-400 text-lg font-medium opacity-80">
                        Prêt à continuer ton apprentissage mystérieux ?
                    </p>
                </motion.div>
            </div>

            {/* Categories avec défilement horizontal */}
            <div className="space-y-12">
                {filteredCourses.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="pl-6 lg:pl-12"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-xl md:text-2xl brand-font-secondary text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 uppercase tracking-[0.2em] font-black">{category.category}</h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent ml-6" />
                        </div>

                        <div className="overflow-x-auto pb-8 custom-horizontal-scrollbar pr-6 scroll-smooth">
                            <div className="flex gap-6 w-max">
                                {category.items.map((course) => (
                                    <motion.div
                                        key={course.id}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        onClick={() => navigate(`/course/${course.id}`)}
                                        className="w-[280px] md:w-[350px] flex-shrink-0 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer group"
                                    >
                                        {/* Image du cours */}
                                        <div className="h-40 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
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
                                                    <span key={i} className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full backdrop-blur-md">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Contenu */}
                                        <div className="p-5">
                                            <h3 className="text-xl font-black text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors tracking-tight">
                                                {course.name}
                                            </h3>
                                            <p className="text-gray-400 text-xs font-medium mb-5 line-clamp-2 min-h-[32px] leading-relaxed">
                                                {course.desc}
                                            </p>

                                            {/* Métadonnées */}
                                            <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={12} className="text-blue-500/50" />
                                                    <span>{course.duration || '10h'}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users size={12} className="text-purple-500/50" />
                                                    <span>{courseStats[course.id] || 0}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Star size={12} className="text-yellow-500 fill-yellow-500/20" />
                                                    <span>{course.rating || '4.8'}</span>
                                                </div>
                                            </div>

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
                                                <button className="w-full py-3 rounded-xl bg-white/5 text-blue-400 text-xs font-black uppercase tracking-widest border border-white/5 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all duration-300 flex items-center justify-center gap-2">
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