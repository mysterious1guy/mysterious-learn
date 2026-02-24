import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, BookOpen, ArrowRight, Play } from 'lucide-react';

const VideoFallback = ({ onReadContent, onSkip, lessonTitle }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full aspect-video bg-slate-900 border-2 border-dashed border-blue-500/20 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-md">
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-6 border border-blue-500/20">
                    <AlertTriangle size={40} className="text-blue-400" />
                </div>

                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
                    Contenu en cours de maintenance
                </h3>

                <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                    Cette vidéo pour <span className="text-blue-400 font-bold italic">"{lessonTitle}"</span> est momentanément indisponible.
                    Pas d'inquiétude, l'apprentissage continue ! Les connaissances sont accessibles ci-dessous.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button
                        onClick={onReadContent}
                        className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all flex items-center justify-center gap-2 group"
                    >
                        <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
                        Lire le texte
                    </button>

                    <button
                        onClick={onSkip}
                        className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
                    >
                        Passer à la suite
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Subtle corner elements */}
            <div className="absolute top-6 left-6 flex items-center gap-2 opacity-30">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Failover Pédagogique v1.0</span>
            </div>
        </motion.div>
    );
};

export default VideoFallback;
