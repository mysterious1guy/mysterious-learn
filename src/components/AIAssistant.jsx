import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BrainCircuit, MessageSquare, ChevronLeft, X } from 'lucide-react';
import MysteriousCopilot from './MysteriousCopilot';

const AIAssistant = ({ user, currentView, courseId, API_URL }) => {
    const [isCopilotOpen, setIsCopilotOpen] = useState(false);
    const [theaterContent, setTheaterContent] = useState(null);
    const [currentMurmur, setCurrentMurmur] = useState(null);

    // Handle external events
    useEffect(() => {
        const handleTheaterOpen = (e) => e.detail && setTheaterContent(e.detail);
        const handleTheaterClose = () => setTheaterContent(null);

        const handleMurmur = (e) => {
            if (e.detail?.text) {
                setCurrentMurmur(e.detail.text);
                // Auto-clear after 6 seconds
                const timer = setTimeout(() => setCurrentMurmur(null), 6000);
                return () => clearTimeout(timer);
            }
        };

        window.addEventListener('mysterious-ai-theater-open', handleTheaterOpen);
        window.addEventListener('mysterious-ai-theater-close', handleTheaterClose);
        window.addEventListener('mysterious-ai-murmur', handleMurmur);

        return () => {
            window.removeEventListener('mysterious-ai-theater-open', handleTheaterOpen);
            window.removeEventListener('mysterious-ai-theater-close', handleTheaterClose);
            window.removeEventListener('mysterious-ai-murmur', handleMurmur);
        };
    }, []);

    return (
        <>
            {/* AI Murmur Bubble (Floating near Brain) */}
            <AnimatePresence>
                {currentMurmur && !isCopilotOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        className="fixed top-[45%] right-20 z-[140] max-w-[250px] bg-slate-900/90 border border-blue-500/50 backdrop-blur-xl p-4 rounded-2xl rounded-tr-none shadow-2xl pointer-events-none"
                    >
                        <div className="flex items-center gap-2 mb-2 opacity-50">
                            <Sparkles size={12} className="text-blue-400" />
                            <span className="text-[10px] font-black font-mono tracking-widest text-blue-400">MURMURE OMNIPRÉSENT</span>
                        </div>
                        <p className="text-xs font-bold text-slate-200 leading-relaxed italic">
                            "{currentMurmur}"
                        </p>
                        {/* Little peak pointing to the brain button */}
                        <div className="absolute top-4 -right-2 w-4 h-4 bg-slate-900 border-r border-t border-blue-500/50 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Copilot Toggle Button (Fixed on the right edge) */}
            <motion.button
                initial={{ x: 100 }}
                animate={{ x: isCopilotOpen ? 100 : 0 }}
                transition={{ type: 'spring', damping: 20 }}
                onClick={() => setIsCopilotOpen(true)}
                className="fixed top-1/2 right-0 -translate-y-1/2 z-[140] bg-slate-900 border border-r-0 border-blue-500/50 hover:bg-slate-800 text-blue-400 p-3 rounded-l-2xl shadow-[-5px_0_20px_rgba(59,130,246,0.2)] flex items-center gap-2 group transition-colors"
            >
                <div className="flex flex-col items-center">
                    <ChevronLeft size={16} className="text-slate-500 group-hover:text-white transition-colors mb-1" />
                    <BrainCircuit size={24} className="group-hover:scale-110 transition-transform" />
                </div>
            </motion.button>

            {/* The Copilot Sidebar */}
            <MysteriousCopilot
                isOpen={isCopilotOpen}
                onClose={() => setIsCopilotOpen(false)}
                user={user}
                API_URL={API_URL}
            />

            {/* Theater Mode Overlay (Fullscreen popups from Professor) */}
            <AnimatePresence>
                {theaterContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[160] flex items-center justify-center p-2 sm:p-6 bg-black/90 sm:bg-black/80 backdrop-blur-md overflow-hidden pt-16 sm:pt-24"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 30, opacity: 0 }}
                            className="bg-gray-900 border border-blue-500/30 w-full max-w-5xl rounded-3xl sm:rounded-[3rem] shadow-[0_0_100px_rgba(59,130,246,0.2)] overflow-hidden relative flex flex-col max-h-[92vh] sm:max-h-[85vh]"
                        >
                            <button onClick={() => setTheaterContent(null)} className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/50 hover:text-white z-20 transition-colors">
                                <X size={20} className="sm:w-6 sm:h-6" />
                            </button>
                            <div className="p-6 sm:p-10 border-b border-white/5 bg-gradient-to-r from-blue-600/10 to-transparent shrink-0">
                                <h2 className="text-xl sm:text-4xl font-black text-white pr-10">{theaterContent.title}</h2>
                            </div>
                            <div className="flex-1 p-4 sm:p-10 overflow-y-auto w-full prose prose-invert max-w-none text-white custom-scrollbar scroll-smooth">
                                {theaterContent.node}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIAssistant;
