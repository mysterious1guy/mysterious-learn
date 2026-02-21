import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedAIAvatar = ({ isTyping }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);

    // Eye tracking effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Calculate relative offset (-1 to 1) from center of screen
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Random blinking effect
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150); // Blink duration
        }, Math.random() * 4000 + 2000); // Random interval between 2s and 6s

        return () => clearInterval(blinkInterval);
    }, []);

    return (
        <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden group bg-[#020617] shadow-[0_0_20px_rgba(59,130,246,0.15)]">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 mix-blend-screen" />

            {/* Typing Aura */}
            <AnimatePresence>
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
                        className="absolute inset-0 bg-blue-500/20 blur-[12px] rounded-full z-0"
                    />
                )}
            </AnimatePresence>

            {/* Rotating Outer Ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: isTyping ? 3 : 10, ease: "linear" }}
                className="absolute inset-1 border-[1px] border-dashed border-blue-500/30 rounded-full z-10"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 0% 80%)' }}
            />

            {/* Counter-Rotating Inner Ring */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: isTyping ? 4 : 12, ease: "linear" }}
                className="absolute inset-3 border-[2px] border-dotted border-purple-500/40 rounded-full z-10"
            />

            {/* Core Eye / Orb */}
            <motion.div
                animate={{
                    x: mousePos.x * 3,
                    y: mousePos.y * 3,
                    scale: isBlinking ? [1, 0.9, 1] : (isTyping ? [1, 1.05, 1] : 1),
                }}
                transition={{
                    type: "spring", stiffness: 150, damping: 15,
                    scale: { repeat: isTyping ? Infinity : 0, duration: 1.5 }
                }}
                className="relative w-5 h-5 rounded-full flex items-center justify-center z-20 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                style={{
                    background: isTyping
                        ? 'radial-gradient(circle at 30% 30%, #60a5fa 0%, #3b82f6 50%, #1e3a8a 100%)'
                        : 'radial-gradient(circle at 30% 30%, #94a3b8 0%, #475569 50%, #0f172a 100%)'
                }}
            >
                {/* Pupil Light Reflection */}
                <motion.div
                    animate={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5 }}
                    className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 left-1 opacity-80 shadow-[0_0_5px_white]"
                />

                {/* Deep Core Pulse */}
                <motion.div
                    animate={{ scale: isTyping ? [1, 1.5, 1] : 1, opacity: isTyping ? [0.5, 1, 0.5] : 0.2 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className={`w-2 h-2 rounded-full blur-[1px] ${isTyping ? 'bg-cyan-300' : 'bg-slate-400'}`}
                />
            </motion.div>

            {/* Minimalist Data Stream Matrix (Only when typing) */}
            {isTyping && (
                <motion.div
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className="absolute inset-x-0 h-[10px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent blur-[2px] z-30"
                />
            )}
        </div>
    );
};

export default AnimatedAIAvatar;
