import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Flame, Loader2 } from 'lucide-react';
import axios from 'axios';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Non authentifié');

                // Assuming your backend URL configuration
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

                const { data } = await axios.get(`${API_URL}/api/users/leaderboard`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setLeaders(data);
            } catch (err) {
                console.error(err);
                setError('Impossible de charger le classement pour le moment.');
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const getRankIcon = (index) => {
        if (index === 0) return <Medal className="text-yellow-400 w-8 h-8 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />;
        if (index === 1) return <Medal className="text-gray-300 w-7 h-7 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]" />;
        if (index === 2) return <Medal className="text-amber-600 w-6 h-6 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]" />;
        return <span className="text-gray-500 font-bold text-lg w-6 text-center">{index + 1}</span>;
    };

    const getLevel = (xp) => Math.floor((xp || 0) / 500) + 1;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 pt-12 space-y-8 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 mb-12"
            >
                <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-full mb-4 ring-1 ring-yellow-500/30">
                    <Trophy className="w-12 h-12 text-yellow-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter">Temple de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Renommée</span></h1>
                <p className="text-gray-400 max-w-lg mx-auto">Découvre les meilleurs aventuriers de Mysterious Classroom. Gagne de l'XP en complétant des cours pour grimper dans le classement !</p>
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
                <div className="space-y-4">
                    {leaders.map((user, index) => (
                        <motion.div
                            key={user._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center p-4 md:p-6 rounded-2xl border transition-all ${index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/5 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)]' :
                                    index === 1 ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/5 border-gray-400/30' :
                                        index === 2 ? 'bg-gradient-to-r from-amber-700/20 to-amber-800/5 border-amber-700/30' :
                                            'bg-[#111] border-white/5 hover:bg-gray-800/50'
                                }`}
                        >
                            <div className="flex items-center justify-center w-12 mr-4">
                                {getRankIcon(index)}
                            </div>

                            <div className="relative">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="Avatar" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-700 object-cover" />
                                ) : (
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-gray-800">
                                        {(user.firstName?.[0] || user.name?.[0] || '?').toUpperCase()}
                                    </div>
                                )}
                                {index < 3 && (
                                    <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                                        👑
                                    </div>
                                )}
                            </div>

                            <div className="ml-4 md:ml-6 flex-1 min-w-0">
                                <h3 className="text-lg md:text-xl font-bold truncate">
                                    {user.firstName ? `${user.firstName} ${user.lastName || ''}` : (user.name || 'Aventurier')}
                                </h3>
                                <div className="flex items-center gap-2 md:gap-4 text-sm mt-1 text-gray-400">
                                    <span className="flex items-center gap-1 font-medium text-blue-400">
                                        <Star size={14} /> Niv {getLevel(user.xp)}
                                    </span>
                                    <span className="flex items-center gap-1 text-orange-400 font-medium">
                                        <Flame size={14} /> {user.streak || 0}j
                                    </span>
                                </div>
                            </div>

                            <div className="text-right ml-4">
                                <div className="text-2xl md:text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter">
                                    {user.xp || 0}
                                </div>
                                <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">XP</div>
                            </div>
                        </motion.div>
                    ))}

                    {leaders.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            Aucun apprenti n'est encore classé. Gagne de l'XP pour devenir le premier !
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
