import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BrainCircuit, MessageSquare, ChevronLeft, X } from 'lucide-react';
import MysteriousCopilot from './MysteriousCopilot';

const AIAssistant = ({ user, currentView, courseId, API_URL }) => {
    const [isCopilotOpen, setIsCopilotOpen] = useState(false);
    const [theaterContent, setTheaterContent] = useState(null);

    // Handle external events to open theater mode
    useEffect(() => {
        const handleTheaterOpen = (e) => {
            if (e.detail) {
                setTheaterContent(e.detail);
            }
        };

        const handleTheaterClose = () => {
            setTheaterContent(null);
        };

        window.addEventListener('mysterious-ai-theater-open', handleTheaterOpen);
        window.addEventListener('mysterious-ai-theater-close', handleTheaterClose);

        return () => {
            window.removeEventListener('mysterious-ai-theater-open', handleTheaterOpen);
            window.removeEventListener('mysterious-ai-theater-close', handleTheaterClose);
        };
    }, []);

    return (
        <>
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
                        className="fixed inset-0 z-[160] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md overflow-y-auto pt-24"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, y: 50, opacity: 0 }}
                            className="bg-gray-900/90 border border-blue-500/30 w-full max-w-5xl rounded-[3rem] shadow-[0_0_100px_rgba(59,130,246,0.3)] overflow-hidden relative"
                        >
                            <button onClick={() => setTheaterContent(null)} className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/50 hover:text-white z-20">
                                <X size={24} />
                            </button>
                            <div className="p-6 md:p-10 border-b border-white/5 bg-gradient-to-r from-blue-600/10 to-transparent">
                                <h2 className="text-2xl md:text-4xl font-black text-white">{theaterContent.title}</h2>
                            </div>
                            <div className="p-4 md:p-10 max-h-[70vh] overflow-y-auto w-full prose prose-invert max-w-none text-white">
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
