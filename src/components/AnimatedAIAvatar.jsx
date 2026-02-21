import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

const AnimatedAIAvatar = ({ isTyping }) => {
    return (
        <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-slate-900 border border-slate-700 shadow-sm border-b-slate-600">
            {/* Ambient Background Glow when typing */}
            <AnimatePresence>
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "reverse" }}
                        className="absolute inset-0 bg-blue-500/20 blur-md z-0"
                    />
                )}
            </AnimatePresence>

            {/* Minimalist Icon */}
            <motion.div
                animate={{
                    scale: isTyping ? [1, 1.1, 1] : 1,
                }}
                transition={{
                    scale: { repeat: isTyping ? Infinity : 0, duration: 1.5 }
                }}
                className="relative z-10 text-slate-300 group-hover:text-white transition-colors flex items-center justify-center p-1"
            >
                <Bot size={22} strokeWidth={2} className={isTyping ? "text-blue-400" : "text-slate-300"} />
            </motion.div>

            {/* Typing indicator sparkle */}
            <AnimatePresence>
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0, rotate: 45 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute top-[2px] right-[2px] text-blue-300 z-20 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]"
                    >
                        <Sparkles size={8} className="fill-blue-300" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnimatedAIAvatar;
