import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { coursesData } from '../courses/data.jsx';
import { ChevronRight, Star, Clock, Users } from 'lucide-react';

const DashboardPage = ({ user, favorites, toggleFavorite, progressions }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0f1e] to-black pb-20">
            {/* Header */}
            <div className="pt-24 pb-12 px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                        Bienvenue, {user?.firstName} ! 👋
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Prêt à continuer ton apprentissage mystérieux ?
                    </p>
                </motion.div>
            </div>

            {/* Categories avec défilement horizontal */}
            <div className="space-y-12">
                {coursesData.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="pl-6 lg:pl-12"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-gray-800 to-transparent ml-4" />
                        </div>

                        <div className="overflow-x-auto pb-8 hide-scrollbar pr-6">
                            <div className="flex gap-6 w-max">
                                {category.items.map((course) => (
                                    <motion.div
                                        key={course.id}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        onClick={() => navigate(`/course/${course.id}`)}
                                        className="w-[300px] md:w-[350px] flex-shrink-0 bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer group"
                                    >
                                        {/* Image du cours */}
                                        <div className="h-40 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                                            <img
                                                src={course.image || `https://source.unsplash.com/random/800x600/?coding,${course.id}`}
                                                alt={course.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
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
                                                    <span key={i} className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full backdrop-blur-md">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Contenu */}
                                        <div className="p-5">
                                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                                                {course.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                                                {course.desc}
                                            </p>

                                            {/* Métadonnées */}
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>{course.duration || '10h'}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users size={14} />
                                                    <span>{course.students || '1.2k'}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                                    <span>{course.rating || '4.8'}</span>
                                                </div>
                                            </div>

                                            {/* Barre de progression ou bouton */}
                                            {progressions[course.id] ? (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs text-blue-300">
                                                        <span>Progression</span>
                                                        <span>{progressions[course.id].progress}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                                                            style={{ width: `${progressions[course.id].progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <button className="w-full py-2.5 rounded-xl bg-slate-800 text-blue-400 font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-x-1">
                                                    Commencer
                                                    <ChevronRight size={16} />
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
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default DashboardPage;