import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MysteriousGeometricLogo = ({ className, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 700);
    if (onClick) onClick(e);
  };

  return (
    <div className="relative inline-block select-none" onClick={handleClick}>
      <motion.svg
        viewBox="0 0 200 200"
        className={`${className} cursor-pointer filter drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]`}
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.12, rotate: 6 }}
        whileTap={{ scale: 0.88, rotate: -12 }}
        animate={isClicked ? { rotate: [0, 360], scale: [1, 1.25, 1] } : {}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>

          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>

          <filter id="logoGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="ringGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Tech Ring 1 (Vibrant Cyber Radar / Loading Spinner) */}
        <circle
          cx="100" cy="100" r="88"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="4"
          strokeDasharray="30 18 12 18"
          strokeLinecap="round"
          filter="url(#ringGlow)"
          opacity="0.95"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 100 100"
            to="360 100 100"
            dur={isClicked ? "1s" : "7s"}
            repeatCount="indefinite"
          />
        </circle>

        {/* Counter-rotating Inner Tech Ring */}
        <circle
          cx="100" cy="100" r="76"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeDasharray="45 25 15 25"
          opacity="0.8"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 100 100"
            to="0 100 100"
            dur={isClicked ? "0.8s" : "10s"}
            repeatCount="indefinite"
          />
        </circle>

        {/* Modern Minimalist 'M' Hexagon Based */}
        <g filter="url(#logoGlow)">
          {/* Left Part of M */}
          <path
            d="M60 140V60L100 90V170L60 140Z"
            fill="url(#logoGradient)"
            className="transition-all duration-300"
          >
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite" />
          </path>

          {/* Right Part of M */}
          <path
            d="M140 140V60L100 90V170L140 140Z"
            fill="url(#logoGradient)"
            opacity="0.85"
          >
            <animate attributeName="opacity" values="0.75;1;0.75" dur="2s" repeatCount="indefinite" delay="1s" />
          </path>

          {/* Decorative Diamond Core */}
          <path
            d="M100 75L115 90L100 105L85 90L100 75Z"
            fill="#FFFFFF"
            opacity="0.95"
          >
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.25;1"
              dur="2s"
              repeatCount="indefinite"
              additive="sum"
            />
          </path>
        </g>
      </motion.svg>

      {/* Click Shockwave Energy Pulse Ring */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-4 border-blue-400 pointer-events-none shadow-[0_0_35px_#3B82F6]"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MysteriousGeometricLogo;