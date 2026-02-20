import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Terminal, BrainCircuit, Send, Loader, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';
import { safeGetUserName } from '../utils/userUtils';

const MysteriousCopilot = ({ isOpen, onClose, user }) => {
    const [messages, setMessages] = useState([
        { role: 'system', content: `Initialisation du Système Core... Bonjour ${safeGetUserName(user, 'Voyageur')}. Je suis l'Oracle. Prêt à décoder les mystères de l'algorithmique ?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        // Listeners for proactive suggestions (like the old hudMurmur)
        const handleSuggest = (e) => {
            if (e.detail?.text) {
                setMessages(prev => [...prev, { role: 'system', content: e.detail.text, type: 'suggestion' }]);
                if (!isOpen) {
                    // Optional: trigger a notification dot on the collapsed sidebar
                }
            }
        };

        window.addEventListener('mysterious-ai-suggest', handleSuggest);
        return () => window.removeEventListener('mysterious-ai-suggest', handleSuggest);
    }, [isOpen]);


    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsTyping(true);

        try {
            // Use the same endpoint the app currently uses for AI chat
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ message: userMsg, context: "Copilot mode" })
            });

            if (!response.ok) throw new Error('Erreur réseau');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'system', content: data.reply }]);
        } catch (error) {
            console.error('Erreur Copilot:', error);
            setMessages(prev => [...prev, { role: 'system', content: "Erreur de connexion au Cœur du Système. Vérifie ta connexion temporelle." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-0 right-0 h-full w-[400px] bg-slate-950/95 border-l border-blue-500/20 backdrop-blur-2xl z-[150] shadow-[-10px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <BrainCircuit className="text-blue-400" size={24} />
                                <div className="absolute inset-0 bg-blue-400/20 blur-md rounded-full"></div>
                                {/* Online indicator pulse */}
                                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-black animate-pulse"></div>
                            </div>
                            <span className="font-mono font-bold text-white tracking-widest text-sm">
                                L'ORACLE <span className="text-blue-500 text-xs ml-1">v2.0</span>
                            </span>
                        </div>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-sm border border-blue-500/50'
                                        : msg.type === 'suggestion'
                                            ? 'bg-amber-900/40 text-amber-100 border border-amber-500/30 rounded-tl-sm'
                                            : 'bg-slate-900/80 text-slate-200 border border-white/5 rounded-tl-sm'
                                    }`}>
                                    {msg.role !== 'user' && (
                                        <div className="flex items-center gap-2 mb-2 opacity-70">
                                            {msg.type === 'suggestion' ? <Sparkles size={12} className="text-amber-400" /> : <Terminal size={12} className="text-blue-400" />}
                                            <span className="text-[10px] font-mono tracking-wider uppercase">
                                                {msg.type === 'suggestion' ? 'Proactif' : 'Système Core'}
                                            </span>
                                        </div>
                                    )}
                                    <p className="text-sm font-medium leading-relaxed" style={{ wordBreak: 'break-word' }}>
                                        {msg.content}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                <div className="bg-slate-900/80 border border-white/5 rounded-2xl rounded-tl-sm p-4 w-20 flex justify-center items-center gap-1 shadow-lg">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-slate-950/80 border-t border-white/10 backdrop-blur-md">
                        <form onSubmit={handleSend} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Pose ta question à l'Oracle..."
                                className="w-full bg-slate-900 border border-slate-700/50 text-white placeholder-slate-500 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium text-sm shadow-inner"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg transition-colors group"
                            >
                                <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </form>
                        <div className="mt-2 text-center">
                            <p className="text-[10px] text-slate-500 font-mono">Appuie sur ↵ pour envoyer</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MysteriousCopilot;
