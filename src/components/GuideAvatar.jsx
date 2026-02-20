import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GuideAvatar = ({ isOpen, isThinking, size = "w-16 h-16" }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Track mouse
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Subtle life
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            if (Math.random() > 0.8) {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 150);
            }
        }, 4000);
        return () => clearInterval(blinkInterval);
    }, []);

    const focusX = mousePos.x * 5;
    const focusY = mousePos.y * 3;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative ${size} flex items-center justify-center pointer-events-auto cursor-pointer select-none`}
        >
            {/* Halo / Aura */}
            <motion.div
                className="absolute inset-[-40%] rounded-full opacity-40 blur-3xl shadow-[0_0_100px_rgba(59,130,246,0.3)]"
                style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)' }}
                animate={{
                    scale: isThinking || isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
                    opacity: isThinking ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative z-10"
            >
                {/* ADVANCED PROFESSOR SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)]">
                    <defs>
                        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1e293b" />
                            <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fef3c7" />
                            <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        <clipPath id="avatarClip">
                            <circle cx="50" cy="50" r="48" />
                        </clipPath>
                    </defs>

                    {/* Circular Border with Progress Glow */}
                    <circle cx="50" cy="50" r="48" fill="#1e293b" />
                    <motion.circle
                        cx="50" cy="50" r="46"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="10 20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    <g clipPath="url(#avatarClip)">
                        {/* THE SUIT (Costume) */}
                        <path
                            d="M 10 90 Q 50 70 90 90 L 90 100 L 10 100 Z"
                            fill="url(#suitGrad)"
                        />
                        {/* V-Neck opening */}
                        <path d="M 40 85 L 50 100 L 60 85 Z" fill="#ffffff" />
                        {/* SILK TIE (Cravate) */}
                        <path d="M 48 88 L 52 88 L 54 95 L 50 100 L 46 95 Z" fill="#3b82f6" />
                        <path d="M 48 88 L 52 88 L 50 92 Z" fill="#2563eb" />

                        {/* HEAD */}
                        <motion.g animate={{ x: focusX, y: focusY }}>
                            {/* Neck */}
                            <rect x="42" y="70" width="16" height="15" fill="#f59e0b" opacity="0.8" />
                            {/* Face Shape */}
                            <path d="M 30 45 Q 30 20 50 20 Q 70 20 70 45 Q 70 75 50 75 Q 30 75 30 45" fill="url(#skinGrad)" />

                            {/* Hair (Professional Style) */}
                            <path d="M 30 45 Q 30 25 50 20 Q 70 25 70 45 L 72 40 Q 72 15 50 12 Q 28 15 28 40 Z" fill="#1e293b" />

                            {/* Eyes */}
                            {!isBlinking ? (
                                <>
                                    <g>
                                        <circle cx="43" cy="48" r="3" fill="#0f172a" />
                                        <circle cx="44" cy="47" r="1" fill="#ffffff" opacity="0.6" />
                                    </g>
                                    <g>
                                        <circle cx="57" cy="48" r="3" fill="#0f172a" />
                                        <circle cx="58" cy="47" r="1" fill="#ffffff" opacity="0.6" />
                                    </g>
                                </>
                            ) : (
                                <>
                                    <line x1="40" y1="48" x2="46" y2="48" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="54" y1="48" x2="60" y2="48" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                                </>
                            )}

                            {/* Glasses (Optional but makes him look wise) */}
                            <path d="M 38 48 Q 43 42 48 48" fill="none" stroke="#2563eb" strokeWidth="0.5" opacity="0.5" />
                            <path d="M 52 48 Q 57 42 62 48" fill="none" stroke="#2563eb" strokeWidth="0.5" opacity="0.5" />
                            <line x1="48" y1="48" x2="52" y2="48" stroke="#2563eb" strokeWidth="0.5" opacity="0.5" />

                            {/* Mouth - Slight Smile */}
                            <path d="M 45 65 Q 50 68 55 65" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
                        </motion.g>
                    </g>

                    {/* Floating Tech Ornaments */}
                    {isThinking && (
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <circle cx="85" cy="30" r="3" fill="#3b82f6">
                                <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="15" cy="40" r="2" fill="#60a5fa">
                                <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
                            </circle>
                        </motion.g>
                    )}
                </svg>
            </motion.div>
        </div>
    );
};

export default GuideAvatar;
