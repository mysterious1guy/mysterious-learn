import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, BookOpen, User, Star } from 'lucide-react';

const CourseClassroom = ({ courseTitle, courseDescription, onEnter }) => {
    // Proactive trigger on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            const event = new CustomEvent('mysterious-ai-suggest', {
                detail: { text: "Initialisation... Connexion au réseau neuronal établie. L'Oracle t'attend." }
            });
            window.dispatchEvent(event);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#020617] flex items-center justify-center overflow-hidden"
        >
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-purple-900/20 blur-[100px] rounded-full" />

                {/* Desk/Board illusion */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90%] max-w-6xl h-[400px] bg-slate-900/50 border border-white/5 rounded-[3rem] shadow-[-10px_-10px_30px_rgba(255,255,255,0.02),20px_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <Sparkles size={14} className="animate-pulse" />
                            Réseau Neuronal Global
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] uppercase italic">
                            {courseTitle || "L'Art de l'Algorithmique"}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            {courseDescription || "Plonge dans les fondations du code. Oublie les langages éphémères, apprends la pure logique machine."}
                        </p>
                    </motion.div>
                </div>

                {/* Light particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.8, 0.2]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            {/* Interactive Entrance Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, type: "spring" }}
                className="relative z-10 mt-[450px]"
            >
                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                <button
                    onClick={() => {
                        const event = new CustomEvent('mysterious-ai-suggest', {
                            detail: { text: "Analyse des algorithmes en cours. Suis les noeuds d'apprentissage." }
                        });
                        window.dispatchEvent(event);
                        onEnter();
                    }}
                    className="relative px-12 py-6 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-[2rem] text-white font-black text-xl tracking-[0.2em] uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(16,185,129,0.3)] hover:shadow-[0_0_80px_rgba(16,185,129,0.5)] group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center gap-4">
                        <Play size={24} className="fill-white" />
                        Initier le scan
                    </span>
                </button>
            </motion.div>

            {/* Hint text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-12 text-emerald-500/60 font-mono text-xs tracking-[0.3em] uppercase flex items-center gap-2"
            >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                L'Oracle est en ligne
            </motion.p>
        </motion.div>
    );
};

export default CourseClassroom;
