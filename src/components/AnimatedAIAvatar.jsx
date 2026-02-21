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
        <div className="relative w-full h-full rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden group">
            {/* Outer Glow when typing */}
            <AnimatePresence>
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                        className="absolute inset-0 bg-blue-500/30 blur-md rounded-full"
                    />
                )}
            </AnimatePresence>

            {/* The Eye Container */}
            <motion.div
                animate={{
                    x: mousePos.x * 4,
                    y: mousePos.y * 4,
                    scale: isBlinking ? [1, 1, 1] : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden shadow-inner"
            >
                {/* The Iris */}
                <motion.div
                    animate={{
                        x: mousePos.x * 2,
                        y: mousePos.y * 2,
                        scaleY: isBlinking ? 0.1 : 1,
                        backgroundColor: isTyping ? '#3b82f6' : '#60a5fa' // Blue colors
                    }}
                    transition={{
                        scaleY: { duration: 0.1 },
                        backgroundColor: { duration: 0.3 }
                    }}
                    className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                >
                    {/* The Pupil */}
                    <motion.div
                        animate={{
                            scale: isTyping ? [1, 1.5, 1] : 1
                        }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5"
                    />
                </motion.div>
            </motion.div>

            {/* Ambient scanning line when typing */}
            {isTyping && (
                <motion.div
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-x-0 h-0.5 bg-blue-400/50 shadow-[0_0_5px_rgba(59,130,246,0.8)] z-10"
                />
            )}
        </div>
    );
};

export default AnimatedAIAvatar;
