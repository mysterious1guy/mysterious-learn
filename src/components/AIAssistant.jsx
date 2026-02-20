import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Info, ChevronLeft, Volume2, Mic, MicOff } from 'lucide-react';
import { safeGetUserName } from '../utils/userUtils';
import GuideAvatar from './GuideAvatar';

// Configuration de l'onboarding
const ONBOARDING_STEPS = [
    { title: "Bienvenue, Voyageur du Code ! 🎓", content: "Je suis le Professeur Mysterious. Je vais te montrer comment dompter cette plateforme." },
    { title: "Ton Tableau de Bord 📊", content: "C'est ici que tu peux suivre ta progression, voir tes séries de jours consécutifs." },
    { title: "Le Grimoire des Savoirs 📚", content: "Explore nos cours premium. Chaque module est conçu pas à pas." },
    { title: "Ton Compte & Favoris ❤️", content: "Gère ton profil dans ton espace personnel en haut à droite." }
];

const AIAssistant = ({ user, currentView, courseId }) => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Avatar States: 'spawning', 'idle', 'thinking', 'speaking', 'dancing'
    const [avatarState, setAvatarState] = useState('spawning');
    const [avatarPosition, setAvatarPosition] = useState({ bottom: 32, right: 32 }); // absolute coords

    const [hudMurmur, setHudMurmur] = useState(null);
    const [theaterContent, setTheaterContent] = useState(null);
    const [showPoster, setShowPoster] = useState(false);
    const [currentPoster, setCurrentPoster] = useState(null);

    const synthRef = window.speechSynthesis;

    useEffect(() => {
        // Init spawning sequence
        setTimeout(() => setAvatarState('idle'), 2000);
    }, []);

    // Random idle movement (disabled if user drags it)
    const [isDragged, setIsDragged] = useState(false);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            if (avatarState === 'idle' && !isDragged) {
                // Determine a random safe position on screen (mostly bottom/right quadrant)
                const newBottom = Math.max(32, Math.floor(Math.random() * 200));
                const newRight = Math.max(32, Math.floor(Math.random() * 200));
                setAvatarPosition({ bottom: newBottom, right: newRight });
            }
        }, 15000);
        return () => clearInterval(moveInterval);
    }, [avatarState, isDragged]);

    // Handle external events sent to AI
    useEffect(() => {
        const handleSuggest = (e) => {
            if (e.detail?.text) {
                setHudMurmur(e.detail.text);
                speakText(e.detail.text);
            }
        };

        const handleMurmur = (e) => {
            if (e.detail?.text) {
                setHudMurmur(e.detail.text);
                speakText(e.detail.text);
            }
        };

        const handleTheaterOpen = (e) => {
            if (e.detail) {
                setTheaterContent(e.detail);
                speakText("Voici ce que j'ai préparé pour toi. Analyse-le avec soin.");
            }
        };

        const handleTheaterClose = () => {
            setTheaterContent(null);
        };

        window.addEventListener('mysterious-ai-theater-open', handleTheaterOpen);
        window.addEventListener('mysterious-ai-theater-close', handleTheaterClose);
        window.addEventListener('mysterious-ai-suggest', handleSuggest);
        window.addEventListener('mysterious-ai-murmur', handleMurmur);

        return () => {
            window.removeEventListener('mysterious-ai-theater-open', handleTheaterOpen);
            window.removeEventListener('mysterious-ai-theater-close', handleTheaterClose);
            window.removeEventListener('mysterious-ai-suggest', handleSuggest);
            window.removeEventListener('mysterious-ai-murmur', handleMurmur);
        };
    }, []);

    const speakText = (text) => {
        if (!synthRef) return;
        synthRef.cancel();
        const cleanText = text.replace(/[\u{1F000}-\u{1F9FF}]/gu, '').replace(/\*\*|__/g, '').trim();
        if (!cleanText) return;

        setAvatarState('speaking');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'fr-FR';
        const voices = synthRef.getVoices();
        const maleVoice = voices.find(v => v.lang.startsWith('fr') && (v.name.includes('Thomas') || v.name.includes('Paul') || v.name.includes('Daniel') || v.name.includes('Google français')));
        if (maleVoice) utterance.voice = maleVoice;
        utterance.rate = 1.05;
        utterance.pitch = 0.9;

        utterance.onend = () => {
            setAvatarState('idle');
            setTimeout(() => setHudMurmur(null), 3000);
        };
        utterance.onerror = () => setAvatarState('idle');

        synthRef.speak(utterance);
    };

    // Auto tips
    useEffect(() => {
        if (currentView !== 'home') {
            const interval = setInterval(() => {
                if (Math.random() > 0.5 && !theaterContent && avatarState === 'idle') {
                    const tips = [
                        { title: "💡 Inspiration", text: "Le code est comme la poésie, chaque ligne a son importance." },
                        { title: "🚀 Motivation", text: "N'abandonne jamais. Chaque erreur est une leçon." },
                        { title: "🎯 Focus", text: "Prends ton temps pour bien comprendre les bases de l'algorithmique." }
                    ];
                    setCurrentPoster(tips[Math.floor(Math.random() * tips.length)]);
                    setShowPoster(true);
                    setAvatarState('dancing');
                    setTimeout(() => setAvatarState('idle'), 5000);
                }
            }, 60000);
            return () => clearInterval(interval);
        }
    }, [currentView, theaterContent, avatarState]);

    const triggerDance = () => {
        setAvatarState('dancing');
        setTimeout(() => setAvatarState('idle'), 5000);
    };

    return (
        <>
            {/* HUD / Proactive Posters / Avatar Container */}
            <motion.div
                className="fixed z-[120] pointer-events-none flex flex-col items-end gap-4"
                animate={{ bottom: avatarPosition.bottom, right: avatarPosition.right }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
                {/* HUD Dialogue Bubble (Appears above Professor) */}
                <AnimatePresence>
                    {hudMurmur && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-slate-900/95 backdrop-blur-xl border-2 border-blue-500/50 p-6 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.5)] w-80 pointer-events-auto relative mb-4 origin-bottom-right"
                        >
                            {/* Speech bubble tail */}
                            <div className="absolute -bottom-3 right-8 w-6 h-6 bg-slate-900 border-b-2 border-r-2 border-blue-500/50 transform rotate-45" />

                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    <Sparkles size={16} className="text-blue-400 animate-pulse" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">LE PROFESSEUR DIT :</p>
                                    <p className="text-sm font-bold text-white leading-relaxed">{hudMurmur}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Proactive Poster */}
                <AnimatePresence>
                    {showPoster && currentPoster && (
                        <motion.div
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 50, scale: 0.9 }}
                            className="bg-slate-950/90 backdrop-blur-md border hover:border-amber-500/50 border-amber-500/30 p-5 rounded-3xl shadow-xl w-72 pointer-events-auto relative group mb-4 origin-bottom-right"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2 text-amber-500 font-bold">
                                    <Info size={14} />
                                    <span className="text-[10px] uppercase tracking-widest">{currentPoster.title}</span>
                                </div>
                                <button onClick={() => setShowPoster(false)} className="text-slate-500 hover:text-white">
                                    <X size={14} />
                                </button>
                            </div>
                            <p className="text-xs font-bold text-slate-200 leading-relaxed italic mb-4">"{currentPoster.text}"</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* The Living Avatar - Draggable */}
                <motion.div
                    drag
                    dragMomentum={false}
                    onDragStart={() => setIsDragged(true)}
                    onClick={triggerDance}
                    className="pointer-events-auto hover:scale-110 transition-transform cursor-grab active:cursor-grabbing"
                    whileDrag={{ scale: 1.2, filter: 'brightness(1.5)' }}
                >
                    <GuideAvatar state={avatarState} size="w-32 h-32" />
                </motion.div>
            </motion.div>

            {/* Theater Mode Overlay (Fullscreen popups from Professor) */}
            <AnimatePresence>
                {theaterContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md overflow-y-auto pt-24"
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
                            <div className="p-10 border-b border-white/5 bg-gradient-to-r from-blue-600/10 to-transparent">
                                <h2 className="text-4xl font-black text-white">{theaterContent.title}</h2>
                            </div>
                            <div className="p-10 max-h-[70vh] overflow-y-auto">
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
