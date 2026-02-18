import React from 'react';

const MysteriousGeometricLogo = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <defs>
      <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Abstract 'M' shape constructed from geometric forms */}
    <g transform="translate(40, 40) scale(0.6)" filter="url(#glow)">
      {/* Left Pillar */}
      <path d="M40 160 L40 40 L80 80 L80 160 Z" fill="url(#mainGradient)" opacity="0.9">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Right Pillar */}
      <path d="M160 160 L160 40 L120 80 L120 160 Z" fill="url(#mainGradient)" opacity="0.9">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" delay="1.5s" />
      </path>

      {/* Center V */}
      <path d="M80 80 L100 120 L120 80 L100 60 Z" fill="#60a5fa" opacity="0.8">
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 5; 0 0" dur="4s" repeatCount="indefinite" />
      </path>
    </g>

    {/* Orbiting Elements representing 'Classroom' connection */}
    <circle cx="100" cy="100" r="85" fill="none" stroke="url(#mainGradient)" strokeWidth="1" opacity="0.3" strokeDasharray="10 10">
      <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
    </circle>

    <circle cx="100" cy="100" r="65" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.2">
      <animate attributeName="r" values="65;68;65" dur="4s" repeatCount="indefinite" />
    </circle>

    {/* Tech Nodes */}
    <circle cx="100" cy="20" r="4" fill="#3b82f6">
      <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="100" cy="180" r="4" fill="#8b5cf6">
      <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" delay="1s" />
    </circle>
  </svg>
);

export default MysteriousGeometricLogo;