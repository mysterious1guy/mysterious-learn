import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

const AnimatedAIAvatar = ({ isTyping }) => {
    return (
        <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-slate-900 border border-slate-700/50 shadow-2xl">
            {/* Multi-layered Ambient Background Glow */}
            <AnimatePresence>
                {(isTyping) && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
                            className="absolute inset-0 bg-blue-500/30 blur-xl z-0"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", repeatType: "reverse" }}
                            className="absolute inset-2 bg-blue-400/20 blur-md z-0"
                        />
                    </>
                )}
            </AnimatePresence>

            {/* Breathing / Alive Animation */}
            <motion.div
                animate={{
                    scale: isTyping ? [1, 1.05, 1] : [1, 1.02, 1],
                    y: isTyping ? 0 : [0, -1, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: isTyping ? 1.5 : 3,
                    ease: "easeInOut"
                }}
                className="relative z-10 text-slate-300 flex items-center justify-center p-1"
            >
                <div className="relative">
                    <Bot
                        size={24}
                        strokeWidth={1.5}
                        className={`transition-colors duration-500 ${isTyping ? "text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]" : "text-slate-400"}`}
                    />

                    {/* Floating Sparkles around the bot */}
                    <AnimatePresence>
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute -top-1 -right-1"
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                >
                                    <Sparkles size={8} className="text-blue-300 fill-blue-300/30" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Subtle Inner Glow */}
            <div className={`absolute inset-0 rounded-full transition-opacity duration-1000 ${isTyping ? 'opacity-40' : 'opacity-10'} bg-gradient-to-t from-blue-500/20 to-transparent pointer-events-none`} />
        </div>
    );
};

export default AnimatedAIAvatar;
