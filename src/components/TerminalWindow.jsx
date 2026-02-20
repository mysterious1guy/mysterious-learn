import React from 'react';
import { motion } from 'framer-motion';

const TerminalWindow = ({ title, children, showCursor = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="terminal-window my-8"
        >
            <div className="terminal-header">
                <div className="flex gap-1.5">
                    <div className="terminal-dot bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                    <div className="terminal-dot bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                    <div className="terminal-dot bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                </div>
                <div className="flex-1 text-center">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        {title || 'Mysterious Terminal'}
                    </span>
                </div>
                <div className="w-12 text-right">
                    <span className="text-[10px] font-mono text-slate-600">v1.0.42</span>
                </div>
            </div>
            <div className="terminal-content">
                {children}
                {showCursor && <span className="terminal-cursor" />}
            </div>
        </motion.div>
    );
};

export default TerminalWindow;
