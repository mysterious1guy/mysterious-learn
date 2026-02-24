import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, ChevronLeft, X, EyeOff } from 'lucide-react';
import MysteriousCopilot from './MysteriousCopilot';
import AnimatedAIAvatar from './AnimatedAIAvatar';
import useIntelligentMurmurs from '../hooks/useIntelligentMurmurs';

const AIAssistant = ({ user, currentView, progressions, API_URL }) => {
    const [isCopilotOpen, setIsCopilotOpen] = useState(false);
    const [theaterContent, setTheaterContent] = useState(null);
    const [currentMurmur, setCurrentMurmur] = useState(null);
    const murmurTimerRef = useRef(null);
    const lastMurmurTimeRef = useRef(0);
    const lastMurmurTextRef = useRef("");
    const dismissedMurmursRef = useRef(new Set());

    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimerRef = useRef(null);

    // Initialize Intelligent Murmurs Hook
    useIntelligentMurmurs(user, currentView, progressions);

    // Auto-hide during scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
            scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 1000);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        };
    }, []);

    // Handle external events
    useEffect(() => {
        const handleTheaterOpen = (e) => e.detail && setTheaterContent(e.detail);
        const handleTheaterClose = () => setTheaterContent(null);

        const handleMurmur = (e) => {
            const text = e.detail?.text;
            if (!text || dismissedMurmursRef.current.has(text)) return;

            // Don't show murmur if user disabled them in preferences
            if (user?.uiPreferences?.showMurmurs === false) return;

            const now = Date.now();
            const timeSinceLast = now - lastMurmurTimeRef.current;

            // ANTI-SPAM: 10 seconds cooldown between murmurs
            if (timeSinceLast < 10000) return;
            if (text === lastMurmurTextRef.current && timeSinceLast < 30000) return;

            if (murmurTimerRef.current) clearTimeout(murmurTimerRef.current);

            setCurrentMurmur(text);
            lastMurmurTimeRef.current = now;
            lastMurmurTextRef.current = text;

            // Auto-clear after 8 seconds
            murmurTimerRef.current = setTimeout(() => {
                setCurrentMurmur(null);
                murmurTimerRef.current = null;
            }, 8000);
        };

        window.addEventListener('mysterious-ai-theater-open', handleTheaterOpen);
        window.addEventListener('mysterious-ai-theater-close', handleTheaterClose);
        window.addEventListener('mysterious-ai-murmur', handleMurmur);

        return () => {
            window.removeEventListener('mysterious-ai-theater-open', handleTheaterOpen);
            window.removeEventListener('mysterious-ai-theater-close', handleTheaterClose);
            window.removeEventListener('mysterious-ai-murmur', handleMurmur);
            if (murmurTimerRef.current) clearTimeout(murmurTimerRef.current);
        };
    }, [user]);

    const handleDismissMurmur = (e) => {
        e.stopPropagation();
        dismissedMurmursRef.current.add(currentMurmur);
        setCurrentMurmur(null);
        if (murmurTimerRef.current) clearTimeout(murmurTimerRef.current);
    };

    return (
        <>
            {/* AI Murmur Bubble (Elegant & Discrete) */}
            <AnimatePresence>
                {(currentMurmur && !isCopilotOpen && !isScrolling) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
                        className="fixed bottom-28 right-8 z-[200] max-w-[320px] bg-slate-950/40 border border-blue-500/20 backdrop-blur-2xl p-6 rounded-[2.5rem] rounded-br-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-l-4 border-l-blue-600/50 pointer-events-auto group overflow-hidden"
                        onClick={() => setIsCopilotOpen(true)}
                    >
                        {/* Background Gradient Mesh */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent pointer-none" />

                        <button
                            onClick={handleDismissMurmur}
                            className="absolute top-4 right-4 p-2 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110 active:scale-95 z-20"
                        >
                            <X size={12} />
                        </button>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 bg-blue-500/20 rounded-lg">
                                    <Sparkles size={12} className="text-blue-400" />
                                </div>
                                <span className="text-[10px] font-black font-mono tracking-[0.2em] text-blue-400/80 uppercase">Mentor Digital</span>
                            </div>
                            <p className="text-sm font-medium text-slate-100 leading-relaxed tracking-tight italic opacity-90">
                                "{currentMurmur}"
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Minimalist Toggle (Floating Bubble) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isScrolling ? 0.2 : 1,
                    scale: isScrolling ? 0.9 : 1,
                    x: isCopilotOpen ? 400 : 0,
                    filter: isScrolling ? 'blur(2px)' : 'blur(0px)'
                }}
                transition={{ duration: 0.5 }}
                className="fixed bottom-8 right-8 z-[140]"
            >
                <motion.button
                    onClick={() => setIsCopilotOpen(true)}
                    className="relative w-16 h-16 bg-slate-950/60 border border-white/10 backdrop-blur-xl rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center justify-center group overflow-hidden transition-all duration-500 hover:border-blue-500/40"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Suggestion Halo (Ethereal) */}
                    <AnimatePresence>
                        {currentMurmur && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                    scale: [1, 1.3, 1],
                                    rotate: [0, 90, 180, 270, 360]
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-blue-400/30 blur-xl rounded-full"
                            />
                        )}
                    </AnimatePresence>

                    {/* Mask for the avatar clip */}
                    <div className="w-11 h-11 relative z-10 transition-transform duration-500 group-hover:scale-110">
                        <AnimatedAIAvatar isTyping={false} />
                    </div>

                    {/* Discrete notification dot with glow */}
                    <AnimatePresence>
                        {currentMurmur && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-4 right-4 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-20 border border-slate-950"
                            />
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.div>

            {/* The Copilot Sidebar */}
            <MysteriousCopilot
                isOpen={isCopilotOpen}
                onClose={() => setIsCopilotOpen(false)}
                user={user}
                API_URL={API_URL}
            />

            {/* Theater Mode Overlay */}
            <AnimatePresence>
                {theaterContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[160] flex items-center justify-center p-2 sm:p-6 bg-black/95 backdrop-blur-xl overflow-hidden pt-16 sm:pt-24"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 40, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 40, opacity: 0 }}
                            className="bg-slate-950 border border-blue-500/30 w-full max-w-6xl rounded-[3rem] shadow-[0_0_150px_rgba(59,130,246,0.15)] overflow-hidden relative flex flex-col max-h-[90vh]"
                        >
                            <button onClick={() => setTheaterContent(null)} className="absolute top-8 right-8 p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/50 hover:text-white z-20 transition-all border border-white/10 group">
                                <X size={24} className="group-rotate-90 transition-transform" />
                            </button>
                            <div className="p-8 sm:p-12 border-b border-white/5 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent shrink-0">
                                <h2 className="text-2xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 pr-10 tracking-tight">{theaterContent.title}</h2>
                            </div>
                            <div className="flex-1 p-6 sm:p-12 overflow-y-auto w-full prose prose-invert max-w-none text-slate-300 custom-scrollbar scroll-smooth">
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
