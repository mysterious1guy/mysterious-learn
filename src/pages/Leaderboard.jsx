import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, Flame, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Leaderboard = ({ user, API_URL, setToast }) => {
    const { t, language } = useLanguage();
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAll, setShowAll] = useState(false);

    const INITIAL_VISIBLE = 5;

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const token = user?.token || localStorage.getItem('token');
                if (!token) throw new Error(t('leaderboard.auth_error') || 'Non authentifié');

                const response = await fetch(`${API_URL}/users/leaderboard`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.message || t('leaderboard.load_error') || 'Erreur lors du chargement du classement');
                }

                const data = await response.json();
                setLeaders(data);
            } catch (err) {
                console.error('❌ Leaderboard Error:', err);
                setError(`${t('leaderboard.load_failed') || 'Impossible de charger le classement :'} ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [API_URL]);

    const getRankIcon = (index) => {
        if (index === 0) return <Medal className="text-yellow-400 w-8 h-8 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />;
        if (index === 1) return <Medal className="text-gray-300 w-7 h-7 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]" />;
        if (index === 2) return <Medal className="text-amber-600 w-6 h-6 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]" />;
        return <span className="text-gray-500 font-bold text-lg w-6 text-center">{index + 1}</span>;
    };

    const getLevel = (xp) => Math.floor((xp || 0) / 500) + 1;

    const visibleLeaders = showAll ? leaders : leaders.slice(0, INITIAL_VISIBLE);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 pt-12 space-y-8 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 mb-8"
            >
                <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-full mb-2 ring-1 ring-yellow-500/30">
                    <Trophy className="w-12 h-12 text-yellow-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter">
                    {t('leaderboard.title1') || "Temple de la"}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        {t('leaderboard.title2') || "Renommée"}
                    </span>
                </h1>
                <p className="text-gray-400 max-w-lg mx-auto">
                    {t('leaderboard.desc') || "Découvre les meilleurs aventuriers de Mysterious Classroom. Gagne de l'XP en complétant des cours pour grimper dans le classement !"}
                </p>

                {/* Community Stats Bar */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-blue-400 font-mono">12,840+</span> Agents Inscrits
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-emerald-400 font-mono">1,420+</span> Opérationnels
                    </div>
                </div>
            </motion.div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
                </div>
            ) : error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-center">
                    {error}
                </div>
            ) : (
                <div className="space-y-3">
                    <AnimatePresence>
                        {visibleLeaders.map((entry, index) => {
                            const displayName = entry.firstName
                                ? `${entry.firstName} ${entry.lastName || ''}`.trim()
                                : (entry.name || t('leaderboard.adventurer') || 'Aventurier');
                            return (
                                <motion.div
                                    key={entry._id}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ delay: index < INITIAL_VISIBLE ? index * 0.07 : 0, duration: 0.25 }}
                                    whileHover={{ scale: 1.012 }}
                                    className={`flex items-center gap-3 p-4 md:p-5 rounded-2xl border transition-all ${
                                        index === 0
                                            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/5 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)]'
                                            : index === 1
                                            ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/5 border-gray-400/30'
                                            : index === 2
                                            ? 'bg-gradient-to-r from-amber-700/20 to-amber-800/5 border-amber-700/30'
                                            : 'bg-[#111] border-white/5 hover:bg-gray-800/50'
                                    }`}
                                >
                                    {/* Rang */}
                                    <div className="flex items-center justify-center w-9 shrink-0">
                                        {getRankIcon(index)}
                                    </div>

                                    {/* Avatar */}
                                    <div className="relative shrink-0">
                                        {entry.avatar ? (
                                            <img
                                                src={entry.avatar}
                                                alt={displayName}
                                                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-700 object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=F59E0B&color=fff&size=128`;
                                                }}
                                            />
                                        ) : (
                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-gray-800">
                                                {(displayName[0] || '?').toUpperCase()}
                                            </div>
                                        )}
                                        {index < 3 && (
                                            <div className="absolute -top-2 -right-2 text-base animate-bounce">👑</div>
                                        )}
                                    </div>

                                    {/* Nom & infos — flex-1 avec overflow hidden sur le container */}
                                    <div className="flex-1 min-w-0 overflow-hidden">
                                        <p className="text-base md:text-lg font-bold text-white truncate leading-tight">
                                            {displayName}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs mt-0.5 text-gray-400">
                                            <span className="flex items-center gap-1 font-semibold text-blue-400">
                                                <Star size={11} /> {t('leaderboard.lvl') || 'Niv'} {getLevel(entry.xp)}
                                            </span>
                                            <span className="flex items-center gap-1 text-orange-400 font-semibold">
                                                <Flame size={11} /> {entry.streak || 0}{language === 'en' ? 'd' : 'j'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* XP */}
                                    <div className="text-right shrink-0 ml-2">
                                        <div className="text-xl md:text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter">
                                            {(entry.xp || 0).toLocaleString('fr-FR')}
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">XP</div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {leaders.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            {t('leaderboard.empty') || "Aucun apprenti n'est encore classé. Gagne de l'XP pour devenir le premier !"}
                        </div>
                    )}

                    {/* Bouton Voir plus / Réduire */}
                    {leaders.length > INITIAL_VISIBLE && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-center pt-2"
                        >
                            <button
                                onClick={() => setShowAll(prev => !prev)}
                                className="flex items-center gap-2 px-7 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-yellow-500/40 text-slate-300 hover:text-yellow-400 font-bold text-sm uppercase tracking-widest rounded-2xl transition-all duration-300 group shadow-lg"
                            >
                                {showAll ? (
                                    <>
                                        <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                                        Réduire le classement
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                                        Voir les {leaders.length - INITIAL_VISIBLE} autres agents
                                    </>
                                )}
                            </button>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
