import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GuideAvatar = ({ isOpen, isThinking, size = "w-16 h-16" }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);
    const [headTilt, setHeadTilt] = useState(0);
    const [eyePattern, setEyePattern] = useState('standard');
    const containerRef = useRef(null);

    // Track mouse and global clicks
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };

        const handleGlobalClick = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setClickPos({ x, y });

            setEyePattern('curious');
            setTimeout(() => setEyePattern('standard'), 1500);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleGlobalClick);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleGlobalClick);
        };
    }, []);

    // Autonomous Life
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            if (Math.random() > 0.6) {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 120);
            }
        }, 3500);

        const tiltInterval = setInterval(() => {
            if (!isOpen && !isThinking) {
                setHeadTilt((Math.random() - 0.5) * 20);
            } else {
                setHeadTilt(0);
            }
        }, 3000);

        return () => {
            clearInterval(blinkInterval);
            clearInterval(tiltInterval);
        };
    }, [isOpen, isThinking]);

    const focusX = (mousePos.x * 0.7 + clickPos.x * 0.3) * 10;
    const focusY = (mousePos.y * 0.7 + clickPos.y * 0.3) * 8;

    return (
        <div className={`relative ${size} flex items-center justify-center pointer-events-none select-none`}>
            {/* VIBRANT HALO / AURA BACKGROUND */}
            <motion.div
                className="absolute inset-[-20%] rounded-full opacity-40 blur-2xl"
                style={{ background: 'radial-gradient(circle, #fbbf24 0%, #3b82f6 50%, transparent 100%)' }}
                animate={{
                    scale: isThinking ? [1, 1.4, 1] : [1, 1.15, 1],
                    opacity: isThinking ? [0.4, 0.7, 0.4] : [0.3, 0.5, 0.3]
                }}
                transition={{ duration: isThinking ? 0.8 : 3, repeat: Infinity }}
            />

            <motion.div
                animate={{
                    y: [0, -8, 0],
                    rotate: headTilt
                }}
                transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 2.5, ease: "softBezier" }
                }}
                className="w-full h-full relative z-10"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        {/* Golden Neon Gradient */}
                        <linearGradient id="goldNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fde047" />
                            <stop offset="50%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#b45309" />
                        </linearGradient>

                        {/* Cyan Digital Gradient */}
                        <linearGradient id="cyanNeon" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#0891b2" />
                        </linearGradient>

                        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        <radialGradient id="eyeRef">
                            <stop offset="0%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* MAIN BODY - Polished Gold Shell */}
                    <path
                        d="M 20 80 Q 50 100 80 80 L 88 40 Q 88 10 50 10 Q 12 10 12 40 Z"
                        fill="url(#goldNeon)"
                        stroke="#b45309"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 0 5px rgba(251, 191, 36, 0.5))"
                    />

                    {/* VISOR - High Contrast Black/Cyan */}
                    <rect
                        x="18" y="32" width="64" height="38" rx="14"
                        fill="#0c0a09"
                        stroke="#22d3ee"
                        strokeWidth="2"
                    />

                    {/* INTERACTIVE EYES */}
                    <motion.g
                        animate={{ x: focusX, y: focusY }}
                        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                    >
                        {isBlinking ? (
                            <g filter="url(#neonGlow)">
                                <rect x="32" y="48" width="14" height="2" rx="1" fill="#22d3ee" />
                                <rect x="54" y="48" width="14" height="2" rx="1" fill="#22d3ee" />
                            </g>
                        ) : (
                            <g filter="url(#neonGlow)">
                                {eyePattern === 'standard' && (
                                    <>
                                        {/* Stylized Hexagonal Eyes */}
                                        <path d="M 32 45 L 42 45 L 45 50 L 42 55 L 32 55 L 29 50 Z" fill="#22d3ee" />
                                        <path d="M 55 45 L 65 45 L 68 50 L 65 55 L 55 55 L 52 50 Z" fill="#22d3ee" />
                                        {/* Eye Shine */}
                                        <circle cx="36" cy="48" r="2" fill="url(#eyeRef)" opacity="0.8" />
                                        <circle cx="59" cy="48" r="2" fill="url(#eyeRef)" opacity="0.8" />
                                    </>
                                )}
                                {eyePattern === 'curious' && (
                                    <>
                                        <circle cx="37" cy="50" r="6" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                                        <circle cx="60" cy="50" r="6" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                                        <circle cx="37" cy="50" r="2" fill="#22d3ee" />
                                        <circle cx="60" cy="50" r="2" fill="#22d3ee" />
                                    </>
                                )}
                            </g>
                        )}
                    </motion.g>

                    {/* INTERNAL SCAN GRID (Cyber style) */}
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(34, 211, 238, 0.05)" strokeWidth="0.5" />
                    </pattern>
                    <rect x="22" y="36" width="56" height="30" fill="url(#grid)" rx="10" />

                    {/* CHEST CORE - Pulsing Heart of the AI */}
                    <motion.g
                        animate={{
                            scale: isThinking ? [0.8, 1.2, 0.8] : [1, 1.1, 1],
                            opacity: isThinking ? [0.5, 1, 0.5] : [0.7, 0.9, 0.7]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <circle cx="50" cy="82" r="10" fill="rgba(34, 211, 238, 0.2)" filter="blur(4px)" />
                        <circle cx="50" cy="82" r="5" fill="#22d3ee" filter="url(#neonGlow)" />
                        <circle cx="50" cy="82" r="2" fill="white" />
                    </motion.g>

                    {/* VIBRANT ORNAMENT - Floating Rings */}
                    <motion.circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="rgba(251, 191, 36, 0.2)"
                        strokeWidth="1"
                        strokeDasharray="20 40"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
            </motion.div>
        </div>
    );
};

export default GuideAvatar;
