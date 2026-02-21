import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Random messages for thought bubbles
const idleMessages = [
  "Hmm... 🤔", "Du code ! 💻", "Salut ! 👋", "J'apprends ! 📚",
  "*bip boop* 🤖", "Curieux... 🧐", "Hello World! 🌍", "Go go go! 🚀",
  "Nice code! ✨", "Debugging... 🐛",
];

const CyberPet = ({ isPasswordFocused, onSecret, user }) => {
  const [mood, setMood] = useState('neutral');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [idleMessage, setIdleMessage] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [blinkState, setBlinkState] = useState(false);
  const containerRef = useRef(null);

  // --- Audio Context for Synthesis ---
  const playSound = useCallback((type) => {
    // Vérifier la préférence de l'utilisateur
    const soundEnabled = user?.preferences?.soundEnabled ?? true;
    if (!soundEnabled) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'step') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'chirp') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'shy') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(300, now + 0.3);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'type') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'excited') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1500, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.3);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  }, []);

  // --- Eye Tracking Logic ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (mood === 'shy') return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mood]);

  // --- Typing Reaction ---
  useEffect(() => {
    const handleKeyDown = () => {
      if (Math.random() > 0.7) playSound('type');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playSound]);

  // --- Random Blinking ---
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setBlinkState(true);
        setTimeout(() => setBlinkState(false), 150);
      }
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  // --- Random Idle Messages ---
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (mood === 'neutral' && Math.random() > 0.7) {
        const msg = idleMessages[Math.floor(Math.random() * idleMessages.length)];
        setIdleMessage(msg);
        setTimeout(() => setIdleMessage(null), 3000);
      }
    }, 6000);
    return () => clearInterval(messageInterval);
  }, [mood]);

  // --- Sparkle Effects ---
  const addSparkles = useCallback(() => {
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 160 - 80,
      y: Math.random() * -80 - 20,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.3,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1200);
  }, []);

  // --- Mood Logic ---
  useEffect(() => {
    if (onSecret) {
      setMood(onSecret.type);
      playSound('chirp');
      addSparkles();
      const timer = setTimeout(() => setMood('neutral'), 4000);
      return () => clearTimeout(timer);
    }
  }, [onSecret, playSound, addSparkles]);

  useEffect(() => {
    if (isPasswordFocused) {
      setMood('shy');
      playSound('shy');
    } else if (mood === 'shy') {
      setMood('neutral');
      playSound('chirp');
    }
  }, [isPasswordFocused, mood, playSound]);

  const isCatastrophic = mood === 'delete' || mood === 'magic';

  // Eye movement calculation
  const eyeRange = 10;
  const leftEyeX = mood === 'shy' ? 0 : mousePos.x * eyeRange;
  const leftEyeY = mood === 'shy' ? 6 : mousePos.y * eyeRange;
  const rightEyeX = mood === 'shy' ? 0 : mousePos.x * eyeRange;
  const rightEyeY = mood === 'shy' ? 6 : mousePos.y * eyeRange;


  // Mouth path based on mood
  const getMouthPath = () => {
    switch (mood) {
      case 'happy':
      case 'excited':
        return 'M 85 125 Q 100 140 115 125'; // smile
      case 'shy':
        return 'M 88 128 Q 100 125 112 128'; // small wavy
      case 'sleepy':
        return 'M 90 128 L 110 128'; // neutral flat
      case 'delete':
      case 'magic':
        return 'M 85 130 Q 100 120 115 130'; // wobbly shocked
      default:
        return 'M 90 127 Q 100 132 110 127'; // small smile
    }
  };

  // Walking Animation Variants
  const walkVariants = {
    idle: {
      y: [0, -8, 0],
      rotate: [0, 1, -1, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    walking: {
      x: [-20, 20, -20],
      y: [0, -5, 0, -5, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: { duration: 4, repeat: Infinity, ease: "linear" }
    },
    shy: {
      y: 10,
      scale: 0.95,
      transition: { duration: 0.5 }
    },
    happy: {
      y: [0, -15, 0],
      scale: [1, 1.05, 1],
      transition: { duration: 0.6, repeat: 3 }
    },
    excited: {
      y: [0, -20, 0, -10, 0],
      rotate: [0, -5, 5, -3, 0],
      scale: [1, 1.1, 1, 1.08, 1],
      transition: { duration: 0.8, repeat: 2 }
    },
    catastrophic: {
      x: [-5, 5, -5, 5],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.2, repeat: Infinity }
    }
  };

  const currentVariant = mood === 'shy' ? 'shy'
    : mood === 'happy' ? 'happy'
      : mood === 'excited' ? 'excited'
        : isCatastrophic ? 'catastrophic'
          : 'idle';

  // Eye color based on mood
  const getEyeColor = () => {
    switch (mood) {
      case 'happy': return '#22c55e';
      case 'excited': return '#f59e0b';
      case 'shy': return '#ec4899';
      case 'magic': return '#a855f7';
      default: return '#3b82f6';
    }
  };

  // Antenna color
  const getAntennaColor = () => {
    switch (mood) {
      case 'happy': return '#22c55e';
      case 'excited': return '#f59e0b';
      case 'magic': return '#a855f7';
      default: return '#ef4444';
    }
  };

  return (
    <div className="mb-8 md:mb-12 relative flex justify-center h-32 md:h-48 select-none pointer-events-none">
      {/* Sparkle Effects */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0, x: sparkle.x, y: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: sparkle.y, rotate: 180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: sparkle.delay }}
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{ width: sparkle.size, height: sparkle.size }}
          >
            <svg viewBox="0 0 24 24" fill="#fbbf24" className="w-full h-full">
              <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        variants={walkVariants}
        animate={currentVariant}
        className="relative w-32 md:w-48 h-32 md:h-48 cursor-pointer pointer-events-auto pet-breathe"
        onClick={() => {
          playSound('excited');
          addSparkles();
          setMood((prev) => prev === 'happy' ? 'excited' : 'happy');
          setTimeout(() => setMood('neutral'), 2500);
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Shadow */}
        <motion.div
          animate={{
            width: mood === 'shy' ? '6rem' : '8rem',
            opacity: mood === 'shy' ? 0.3 : 0.4,
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 bg-black/40 blur-md rounded-full"
        />

        {/* Robot Body Rendering */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="metalDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <radialGradient id="eyeGlow">
              <stop offset="0%" stopColor={getEyeColor()} stopOpacity="1" />
              <stop offset="100%" stopColor={getEyeColor()} stopOpacity="0" />
            </radialGradient>
            <filter id="neon">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Antenna with animated tip */}
          <motion.path
            d="M 60 50 L 50 20"
            stroke="#94a3b8"
            strokeWidth="3"
            fill="none"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="50"
            cy="20"
            r="5"
            fill={getAntennaColor()}
            filter="url(#neon)"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Second antenna */}
          <motion.path
            d="M 140 50 L 150 25"
            stroke="#94a3b8"
            strokeWidth="2.5"
            fill="none"
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.circle
            cx="150"
            cy="25"
            r="3.5"
            fill="#60a5fa"
            filter="url(#neon)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Main Head/Body Chassis */}
          <path
            d="M 40 60 Q 100 30 160 60 L 170 140 Q 100 170 30 140 Z"
            fill="url(#metal)"
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* Body detail lines */}
          <path d="M 50 145 L 60 155" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />
          <path d="M 140 145 L 150 155" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />

          {/* Screen Face */}
          <path
            d="M 50 70 Q 100 50 150 70 L 155 130 Q 100 150 45 130 Z"
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Screen scan line */}
          <motion.rect
            x="50" y="70" width="100" height="2"
            fill="rgba(59, 130, 246, 0.1)"
            rx="1"
            animate={{ y: [70, 130, 70] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Eyes Group */}
          <g>
            {/* Left Eye */}
            <motion.g
              animate={{ x: leftEyeX, y: leftEyeY }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <circle cx="75" cy="95" r="16" fill="#1e293b" />
              <motion.ellipse
                cx="75"
                cy="95"
                rx="9"
                ry="9"
                fill={getEyeColor()}
                filter="url(#neon)"
                animate={{ scaleY: blinkState ? 0.1 : 1 }}
                transition={{ duration: 0.1 }}
                style={{ transformOrigin: '75px 95px' }}
              />
              {!blinkState && (
                <>
                  <circle cx="75" cy="95" r="3" fill="white" />
                  <circle cx="71" cy="91" r="1.5" fill="white" opacity="0.6" />
                </>
              )}
            </motion.g>

            {/* Right Eye */}
            <motion.g
              animate={{ x: rightEyeX, y: rightEyeY }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <circle cx="125" cy="95" r="16" fill="#1e293b" />
              <motion.ellipse
                cx="125"
                cy="95"
                rx="9"
                ry="9"
                fill={getEyeColor()}
                filter="url(#neon)"
                animate={{ scaleY: blinkState ? 0.1 : 1 }}
                transition={{ duration: 0.1 }}
                style={{ transformOrigin: '125px 95px' }}
              />
              {!blinkState && (
                <>
                  <circle cx="125" cy="95" r="3" fill="white" />
                  <circle cx="121" cy="91" r="1.5" fill="white" opacity="0.6" />
                </>
              )}
            </motion.g>
          </g>

          {/* Mouth */}
          <motion.path
            d={getMouthPath()}
            fill="none"
            stroke={getEyeColor()}
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#neon)"
            key={mood}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Cheeks / Blush */}
          <AnimatePresence>
            {(mood === 'shy' || mood === 'happy') && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <circle cx="58" cy="115" r="8" fill="#ec4899" opacity="0.5" filter="url(#softGlow)" />
                <circle cx="142" cy="115" r="8" fill="#ec4899" opacity="0.5" filter="url(#softGlow)" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Hands (Only visible when shy) */}
          <AnimatePresence>
            {mood === 'shy' && (
              <motion.g
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <circle cx="75" cy="100" r="22" fill="url(#metal)" stroke="#64748b" strokeWidth="2" />
                <circle cx="125" cy="100" r="22" fill="url(#metal)" stroke="#64748b" strokeWidth="2" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Heart particles when happy */}
          <AnimatePresence>
            {mood === 'happy' && (
              <>
                {[0, 1, 2].map(i => (
                  <motion.text
                    key={`heart-${i}`}
                    x={80 + i * 20}
                    y={60}
                    fontSize="14"
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: [0, 1, 0], y: [80, 30 - i * 10] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                  >
                    ❤️
                  </motion.text>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Status LED on body */}
          <motion.circle
            cx="100"
            cy="145"
            r="3"
            fill={getAntennaColor()}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>

        {/* Thought Bubbles */}
        <AnimatePresence>
          {mood === 'shy' && (
            <motion.div
              initial={{ opacity: 0, scale: 0, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-10 -right-20 bg-white px-4 py-2 rounded-2xl rounded-bl-sm shadow-xl font-bold text-gray-800 text-sm border-2 border-pink-400"
            >
              C'est privé ! 🙈
            </motion.div>
          )}
          {mood === 'happy' && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl"
            >
              ❤️
            </motion.div>
          )}
          {mood === 'excited' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.2, 1] }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-10 -right-16 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1.5 rounded-xl rounded-bl-sm shadow-xl font-bold text-gray-900 text-xs border-2 border-yellow-300"
            >
              Woohoo ! 🎉
            </motion.div>
          )}
          {idleMessage && mood === 'neutral' && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-8 -right-20 bg-gray-800 border border-blue-500/30 px-3 py-1.5 rounded-xl rounded-bl-sm shadow-lg text-xs text-blue-200 font-medium whitespace-nowrap"
            >
              {idleMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CyberPet;