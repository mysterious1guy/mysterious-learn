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
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.4)]">
                    <defs>
                        <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1e293b" />
                            <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ffeecc" />
                            <stop offset="60%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1e293b" />
                            <stop offset="50%" stopColor="#334155" />
                            <stop offset="100%" stopColor="#1e293b" />
                        </linearGradient>
                        <filter id="innerShadow">
                            <feOffset dx="0" dy="1" />
                            <feGaussianBlur stdDeviation="1" result="offset-blur" />
                            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                            <feFlood floodColor="black" floodOpacity="0.2" result="color" />
                            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                        </filter>
                        <clipPath id="avatarClip">
                            <circle cx="50" cy="50" r="48" />
                        </clipPath>
                    </defs>

                    {/* Circular Border with Progress Glow */}
                    <circle cx="50" cy="50" r="48" fill="#0f172a" />
                    <motion.circle
                        cx="50" cy="50" r="46"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="1"
                        strokeDasharray="4 8"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        opacity="0.3"
                    />

                    <g clipPath="url(#avatarClip)">
                        {/* THE SUIT (Costume) */}
                        <path
                            d="M 10 90 Q 50 75 90 90 L 95 105 L 5 105 Z"
                            fill="url(#suitGrad)"
                        />
                        {/* Shirt Collar */}
                        <path d="M 38 82 L 50 95 L 62 82 Z" fill="#ffffff" />
                        <path d="M 38 82 L 45 88 L 45 80 Z" fill="#e2e8f0" />
                        <path d="M 62 82 L 55 88 L 55 80 Z" fill="#e2e8f0" />

                        {/* SILK TIE (Cravate) */}
                        <path d="M 47 85 L 53 85 L 55 92 L 50 100 L 45 92 Z" fill="#3b82f6" filter="url(#innerShadow)" />
                        <path d="M 48 85 L 52 85 L 50 89 Z" fill="#2563eb" />

                        {/* HEAD GROUP */}
                        <motion.g animate={{ x: focusX, y: focusY }}>
                            {/* Neck with anatomical shadow */}
                            <path d="M 43 70 L 57 70 L 55 85 L 45 85 Z" fill="#d97706" opacity="0.9" />
                            <path d="M 45 70 L 55 70 L 52 78 L 48 78 Z" fill="rgba(0,0,0,0.1)" />

                            {/* Ears */}
                            <circle cx="31" cy="48" r="4.5" fill="#f59e0b" />
                            <circle cx="69" cy="48" r="4.5" fill="#f59e0b" />

                            {/* Face Shape (Premium Contour) */}
                            <path
                                d="M 32 45 C 32 18 68 18 68 45 C 68 68 58 80 50 80 C 42 80 32 68 32 45"
                                fill="url(#skinGrad)"
                                filter="url(#innerShadow)"
                            />

                            {/* Cheek Highlights for "Beauty" */}
                            <ellipse cx="38" cy="58" rx="4" ry="2" fill="white" opacity="0.05" />
                            <ellipse cx="62" cy="58" rx="4" ry="2" fill="white" opacity="0.05" />

                            {/* Hair (Professional & Dynamic) */}
                            <path
                                d="M 32 42 Q 32 20 50 16 Q 68 20 68 42 L 71 38 Q 71 12 50 8 Q 29 12 29 38 Z"
                                fill="url(#hairGrad)"
                            />
                            <path d="M 34 22 Q 40 16 48 18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                            <path d="M 52 18 Q 60 16 66 22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />

                            {/* Eyes (High Res Detail) */}
                            {!isBlinking ? (
                                <>
                                    <g>
                                        <circle cx="42" cy="47" r="4" fill="#ffffff" />
                                        <circle cx="42.5" cy="47" r="2.2" fill="#0f172a" />
                                        <circle cx="41.5" cy="46" r="1" fill="#ffffff" opacity="0.8" />
                                    </g>
                                    <g>
                                        <circle cx="58" cy="47" r="4" fill="#ffffff" />
                                        <circle cx="57.5" cy="47" r="2.2" fill="#0f172a" />
                                        <circle cx="56.5" cy="46" r="1" fill="#ffffff" opacity="0.8" />
                                    </g>
                                </>
                            ) : (
                                <>
                                    <path d="M 38 47 Q 42 44 46 47" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M 54 47 Q 58 44 62 47" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                                </>
                            )}

                            {/* Semi-Transparent Glasses */}
                            <rect x="36" y="43" width="12" height="9" rx="3" fill="rgba(59, 130, 246, 0.05)" stroke="#334155" strokeWidth="1" />
                            <rect x="52" y="43" width="12" height="9" rx="3" fill="rgba(59, 130, 246, 0.05)" stroke="#334155" strokeWidth="1" />
                            <path d="M 48 47.5 L 52 47.5" fill="none" stroke="#334155" strokeWidth="1" />
                            <path d="M 36 47.5 L 31 46.5" fill="none" stroke="#334155" strokeWidth="0.6" opacity="0.5" />
                            <path d="M 64 47.5 L 69 46.5" fill="none" stroke="#334155" strokeWidth="0.6" opacity="0.5" />

                            {/* Nose Bridge */}
                            <path d="M 49 53 L 50 58 L 51 53" fill="none" stroke="#b45309" strokeWidth="0.5" opacity="0.3" />

                            {/* Mouth - Slight Confidence Smile */}
                            <path d="M 43 68 Q 50 72 57 68" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                        </motion.g>
                    </g>

                    {/* Floating Ornaments (Reduced for Focus) */}
                    {isThinking && (
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <circle cx="88" cy="35" r="2.5" fill="#3b82f6" opacity="0.5">
                                <animate attributeName="r" values="2.5;4;2.5" dur="1.8s" repeatCount="indefinite" />
                            </circle>
                        </motion.g>
                    )}
                </svg>
            </motion.div>
        </div>
    );
};

export default GuideAvatar;
