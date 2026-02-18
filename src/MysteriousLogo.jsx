import React from 'react';

const MysteriousLogo = ({ className }) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Effet de halo lumineux */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
      
      {/* Le Logo SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="relative w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
        <defs>
          <linearGradient id="neon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        </defs>
        
        {/* Triangle arrière-plan */}
        <path d="M256 32L32 416h448L256 32z" fill="none" stroke="url(#neon-grad)" strokeWidth="8" strokeLinejoin="round" filter="url(#glow)" opacity="0.5"/>
        
        {/* Personnage à capuche */}
        <path d="M256 64c-64 0-115 40-128 96-13 56 0 112 32 144s80 48 96 48 64-16 96-48 45-88 32-144c-13-56-64-96-128-96z" fill="none" stroke="url(#neon-grad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"/>
        <path d="M160 416c0-32 32-64 64-64h64c32 0 64 32 64 64" fill="none" stroke="url(#neon-grad)" strokeWidth="12" strokeLinecap="round" filter="url(#glow)"/>
        
        {/* Lunettes */}
        <g transform="translate(176, 160)" fill="none" stroke="#22d3ee" strokeWidth="8" filter="url(#glow)">
          <rect x="0" y="0" width="64" height="32" rx="8" />
          <rect x="96" y="0" width="64" height="32" rx="8" />
          <line x1="64" y1="16" x2="96" y2="16" />
        </g>
        
        {/* Ordinateur Portable */}
        <g transform="translate(96, 320)">
          <rect x="0" y="0" width="320" height="160" rx="16" fill="#0f172a" stroke="url(#neon-grad)" strokeWidth="8" filter="url(#glow)"/>
          <rect x="32" y="32" width="256" height="96" rx="4" fill="#1e293b"/>
          <circle cx="160" cy="80" r="24" fill="none" stroke="#22d3ee" strokeWidth="6" filter="url(#glow)"/>
          <path d="M0 160L32 192h256l32-32" fill="none" stroke="url(#neon-grad)" strokeWidth="8" strokeLinejoin="round" filter="url(#glow)"/>
        </g>
      </svg>
    </div>
  );
};

export default MysteriousLogo;