import React from 'react';

const MysteriousGeometricLogo = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Modern Minimalist 'M' Hexagon Based */}
    <g filter="url(#logoGlow)">
      {/* Left Part of M */}
      <path
        d="M60 140V60L100 90V170L60 140Z"
        fill="url(#logoGradient)"
        className="transition-all duration-500"
      >
        <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Right Part of M */}
      <path
        d="M140 140V60L100 90V170L140 140Z"
        fill="url(#logoGradient)"
        opacity="0.7"
      >
        <animate attributeName="opacity" values="0.6;0.9;0.6" dur="4s" repeatCount="indefinite" delay="2s" />
      </path>

      {/* Decorative Diamond Core */}
      <path
        d="M100 75L115 90L100 105L85 90L100 75Z"
        fill="#FFFFFF"
        opacity="0.9"
      >
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1;1.2;1"
          dur="3s"
          repeatCount="indefinite"
          additive="sum"
        />
      </path>
    </g>

    {/* Outer Tech Ring (Dashed) */}
    <circle
      cx="100" cy="100" r="85"
      fill="none"
      stroke="url(#logoGradient)"
      strokeWidth="1.5"
      strokeDasharray="8 6"
      opacity="0.2"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 100 100"
        to="360 100 100"
        dur="30s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default MysteriousGeometricLogo;