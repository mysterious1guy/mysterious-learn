import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowLeft, Sparkles } from 'lucide-react';

const ComingSoon = ({ title = "Bientôt disponible", message = "Désolé, ce contenu n'est pas encore prêt. Notre assistant travaille dur pour le finaliser !" }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-8"
            >
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
                <div className="relative bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-blue-500/30 shadow-xl shadow-blue-500/10">
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white"
                    >
                        <Rocket size={40} />
                    </motion.div>
                </div>

                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2 text-yellow-400"
                >
                    <Sparkles size={24} />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-md space-y-4"
            >
                <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                    {title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                    {message}
                </p>

                <div className="pt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 mx-auto px-6 py-3 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Retour au tableau de bord
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ComingSoon;
