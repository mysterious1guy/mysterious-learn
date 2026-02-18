import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Flame, Target, ArrowRight, Play, Star, Zap } from 'lucide-react';
import MysteriousGeometricLogo from '../MysteriousGeometricLogo';

const Dashboard = ({ user, courses, favorites, onSelectCourse, toggleFavorite, progressions, lastSelectedCourse }) => {

    // Calcul du niveau global
    const totalProgress = Object.values(progressions || {}).reduce((acc, curr) => acc + curr.progress, 0);
    const userLevel = Math.floor(totalProgress / 100) + 1;

    return (
        <div className="max-w-7xl mx-auto p-6 pt-12 space-y-12">
            {/* Hero Section / Welcome */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-[#0a0c10] p-8 md:p-16 shadow-2xl border border-white/5 group"
            >
                {/* Dynamic Background Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent opacity-50" />
                <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                {/* Decorative Grid or Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                    <div className="space-y-8 max-w-2xl text-center md:text-left">
                        {/* Premium Level Tag */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 rounded-xl md:rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-500/30 text-amber-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                        >
                            <Trophy size={12} className="animate-bounce" />
                            <span>Maître du Code • Niveau {userLevel}</span>
                        </motion.div>

                        <div className="space-y-3 md:space-y-4">
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic italic-shadow leading-tight text-center md:text-left">
                                <span className="block text-white">Bonjour,</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-sm">
                                    {user?.firstName || 'Aventurier'} !
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-400 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed px-4 md:px-0 text-center md:text-left">
                                Prêt à repousser les limites du code aujourd'hui ?
                                <span className="text-blue-400/80 block md:inline"> L'univers numérique n'attend que ton génie.</span>
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                            <motion.button
                                onClick={() => {
                                    let foundCourse = null;
                                    const searchCourse = (id) => {
                                        for (const cat of courses) {
                                            const item = cat.items.find(i => i.id === id);
                                            if (item) return item;
                                        }
                                        return null;
                                    };

                                    if (lastSelectedCourse) foundCourse = searchCourse(lastSelectedCourse);
                                    if (!foundCourse && progressions) {
                                        const unfinishedId = Object.keys(progressions).find(id => progressions[id].progress < 100);
                                        if (unfinishedId) foundCourse = searchCourse(unfinishedId);
                                    }
                                    if (!foundCourse && favorites?.length > 0) foundCourse = searchCourse(favorites[0]);
                                    if (!foundCourse && courses[0]?.items[0]) foundCourse = courses[0].items[0];

                                    if (foundCourse) onSelectCourse(foundCourse);
                                }}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl md:rounded-[2rem] font-black text-base md:text-lg flex items-center gap-3 transition-all ring-4 ring-blue-500/10"
                            >
                                <Play size={18} fill="currentColor" /> Reprendre l'aventure
                            </motion.button>
                        </div>
                    </div>

                    {/* Enhanced Stats Card */}
                    <motion.div
                        whileHover={{ y: -10, rotate: 1 }}
                        className="w-full md:w-80 bg-white/5 backdrop-blur-[40px] border border-white/10 p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-[2.5rem] md:rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg shadow-orange-500/30 rotate-3 group-hover:rotate-0 transition-transform">
                                <Flame size={28} />
                            </div>

                            <div className="space-y-1 mb-6 md:mb-8">
                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">Série actuelle</p>
                                <p className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">1 JOUR</p>
                            </div>

                            <div className="w-full space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Objectif</span>
                                    <span className="text-orange-400 font-black text-base md:text-lg">100%</span>
                                </div>
                                <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Continue Learning Section - Dynamic */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Target className="text-blue-500" /> Continuons ta progression
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(progressions || {})
                        .filter(([, data]) => data.progress > 0 && data.progress < 100)
                        .slice(0, 2)
                        .map(([courseId, data]) => {
                            let courseItem = null;
                            courses.forEach(cat => {
                                const item = cat.items.find(i => i.id === courseId);
                                if (item) courseItem = item;
                            });
                            if (!courseItem) return null;

                            return (
                                <div key={courseId} onClick={() => onSelectCourse(courseItem)} className="group p-1 rounded-[2rem] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent hover:via-blue-500/50 transition-all duration-500">
                                    <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-[1.9rem] h-full border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-4 bg-blue-900/50 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
                                                <Zap size={24} />
                                            </div>
                                            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium">En cours</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">{courseItem.name}</h3>
                                        <p className="text-gray-400 mb-6">{courseItem.desc}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${data.progress}%` }} />
                                            </div>
                                            <span className="text-sm font-bold text-blue-400">{data.progress}%</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    {/* Fallback if no specific progress, show a recommendation */}
                    {(!progressions || Object.values(progressions).filter(p => p.progress > 0 && p.progress < 100).length === 0) && (
                        <div onClick={() => courses[0] && courses[0].items[0] && onSelectCourse(courses[0].items[0])} className="group p-1 rounded-[2rem] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent hover:via-purple-500/50 transition-all duration-500">
                            <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-[1.9rem] h-full border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 bg-purple-900/50 rounded-2xl text-purple-400 group-hover:scale-110 transition-transform">
                                        <Star size={24} />
                                    </div>
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-medium">Recommandé</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Commencer l'aventure</h3>
                                <p className="text-gray-400 mb-6">Découvre les bases de la programmation.</p>
                                <div className="flex items-center text-purple-400 font-bold gap-2 group-hover:gap-4 transition-all">
                                    C'est parti <ArrowRight size={20} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section >

            {/* All Courses Grid */}
            < div className="space-y-16" >
                {
                    courses.map((cat, idx) => (
                        <section key={idx}>
                            <div className="flex items-center gap-4 mb-8">
                                <h3 className="text-3xl font-black flex items-center gap-3 tracking-tighter uppercase italic">
                                    <span className="not-italic">{cat.category.split(' ')[0]}</span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                                        {cat.category.split(' ').slice(1).join(' ')}
                                    </span>
                                </h3>
                                <div className="h-px bg-gradient-to-r from-gray-700 to-transparent flex-1 mb-1"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cat.items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => onSelectCourse(item)}
                                        className={`relative p-6 rounded-3xl bg-gray-800/40 backdrop-blur-sm border border-white/5 hover:bg-gray-800/60 transition-all cursor-pointer overflow-hidden group`}
                                    >
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${item.color.split('-')[1]}-500/20 to-transparent rounded-bl-full -mr-8 -mt-8`} />

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`p-4 rounded-2xl bg-gray-900/50 ${item.color} shadow-lg`}>
                                                    {item.icon}
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                                                    className={`p-2 rounded-full hover:bg-white/10 transition-colors ${favorites.includes(item.id) ? 'text-pink-500' : 'text-gray-600'}`}
                                                >
                                                    <Heart size={20} fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                                                </button>
                                            </div>

                                            <h4 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{item.name}</h4>
                                            <p className="text-sm text-gray-400 line-clamp-2 mb-6 h-10">{item.desc}</p>

                                            <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                                                <span className="bg-gray-900/50 px-3 py-1 rounded-full border border-white/5">{item.level}</span>
                                                <span>{item.students} étudiants</span>
                                            </div>

                                            {progressions?.[item.id] && progressions[item.id].progress > 0 && (
                                                <div className="mt-6">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-blue-400">Progression</span>
                                                        <span className="text-white">{progressions?.[item.id]?.progress}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progressions?.[item.id]?.progress || 0}%` }} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    ))
                }
            </div >

            <div className="py-12 text-center">
                <div className="inline-block p-4 rounded-2xl bg-gray-900 border border-gray-800 text-gray-500 font-mono text-xs tracking-widest">
                    ↑ ↑ ↓ ↓ ← → ← → B A
                </div>
            </div>
        </div >
    );
};

// Helper Icon component for the Dashboard
function Heart({ size, fill, className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={fill}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}

export default Dashboard;
