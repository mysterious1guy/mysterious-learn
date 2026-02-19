import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnimatedLogo = ({ size = "large", className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-16 h-16", 
    large: "w-24 h-24",
    xlarge: "w-32 h-32"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3B82F6' }} />
            <stop offset="50%" style={{ stopColor: '#8B5CF6' }} />
            <stop offset="100%" style={{ stopColor: '#EC4899' }} />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Cercle extérieur animé */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          animate={{
            strokeDasharray: isHovered ? "0 283" : "283 0",
            rotate: 360
          }}
          transition={{
            duration: isHovered ? 0.5 : 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Lettre M stylisée */}
        <motion.g
          animate={{
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Branche gauche du M */}
          <motion.path
            d="M 25 70 L 25 30"
            stroke="url(#logoGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            animate={{
              pathLength: [0, 1]
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          
          {/* Branche centrale du M */}
          <motion.path
            d="M 25 30 L 50 55 L 75 30"
            stroke="url(#logoGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{
              pathLength: [0, 1]
            }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          />
          
          {/* Branche droite du M */}
          <motion.path
            d="M 75 30 L 75 70"
            stroke="url(#logoGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            animate={{
              pathLength: [0, 1]
            }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
          />
        </motion.g>
        
        {/* Particules flottantes */}
        {isHovered && (
          <>
            <motion.circle
              cx="20"
              cy="20"
              r="2"
              fill="#3B82F6"
              animate={{
                y: [-10, 10],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="80"
              cy="25"
              r="1.5"
              fill="#8B5CF6"
              animate={{
                y: [-8, 8],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            />
            <motion.circle
              cx="75"
              cy="75"
              r="2.5"
              fill="#EC4899"
              animate={{
                y: [-12, 12],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, delay: 1, repeat: Infinity }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};

export default AnimatedLogo;
