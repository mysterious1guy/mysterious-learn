import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Terminal, BrainCircuit, Send, Loader, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';
import { safeGetUserName } from '../utils/userUtils';
import AnimatedAIAvatar from './AnimatedAIAvatar';

const MysteriousCopilot = ({ isOpen, onClose, user, API_URL }) => {
    const [messages, setMessages] = useState([
        { role: 'system', content: `Bonjour ${safeGetUserName(user, 'Voyageur')}. Prêt à apprendre l'algorithmique aujourd'hui ?` }
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

    // Initial Greeting Murmur
    useEffect(() => {
        const timer = setTimeout(() => {
            window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                detail: { text: `Bonjour ${safeGetUserName(user, 'Voyageur')}. Prêt à apprendre la logique des algorithmes ?` }
            }));
        }, 2000);
        return () => clearTimeout(timer);
    }, [user]);

    useEffect(() => {
        // Listeners for proactive suggestions (like the old hudMurmur)
        const handleSuggest = (e) => {
            if (e.detail?.text) {
                setMessages(prev => [...prev, { role: 'system', content: e.detail.text, type: 'suggestion' }]);
                // Ensure suggestions also murmur if sidebar is closed
                if (!isOpen) {
                    window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                        detail: { text: e.detail.text }
                    }));
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
            // Use the API_URL for AI chat
            const response = await fetch(`${API_URL}/ai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages
                        // Exclude the very first hardcoded initialization greeting to save tokens
                        .filter((m, idx) => !(idx === 0 && m.role === 'system'))
                        .map(m => ({
                            role: m.role === 'system' ? 'assistant' : m.role,
                            text: m.content
                        }))
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || `Erreur serveur : ${response.status}`);
            }

            const aiResponse = data.response || "Désolé, j'ai eu un trou de mémoire.";
            setMessages(prev => [...prev, { role: 'system', content: aiResponse }]);

            // Dispatch murmur for real-time visibility outside the sidebar
            window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                detail: { text: "Nouvelle réponse prête." }
            }));
        } catch (error) {
            console.error('Erreur Assistant:', error);
            const errorMsg = error.name === 'TypeError' && error.message === 'Failed to fetch'
                ? "Impossible de joindre le serveur. Vérifie si le backend est bien démarré."
                : error.message;
            setMessages(prev => [...prev, {
                role: 'system',
                content: `ERREUR SYSTÈME : ${errorMsg}.`
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const executeAdminAction = async (actionData) => {
        try {
            const endpoint = actionData.action === 'send_email' ? '/admin/send-email' : '/admin/send-notification';
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || localStorage.getItem('token')}`
                },
                body: JSON.stringify(actionData.payload)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Erreur lors de l\'exécution');
            }

            setMessages(prev => [...prev, {
                role: 'system',
                content: `✅ Action administratives confirmée et exécutée avec succès !`
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'system',
                content: `❌ Échec de l'action: ${error.message}`
            }]);
        }
    };

    const renderMessageContent = (msg, role) => {
        if (role === 'user') return <p className="text-sm font-medium leading-relaxed" style={{ wordBreak: 'break-word' }}>{msg}</p>;

        // Look for our specific JSON block
        const jsonMatch = msg.match(/```json\s*(\{[\s\S]*?"type":\s*"admin_action"[\s\S]*?\})\s*```/);

        if (jsonMatch) {
            const preText = msg.substring(0, jsonMatch.index).trim();
            const postText = msg.substring(jsonMatch.index + jsonMatch[0].length).trim();
            let actionData = null;

            try {
                actionData = JSON.parse(jsonMatch[1]);
            } catch (e) {
                console.error("Failed to parse admin action JSON", e);
            }

            return (
                <div className="space-y-3">
                    {preText && <p className="text-sm font-medium leading-relaxed" style={{ wordBreak: 'break-word' }}>{preText}</p>}

                    {actionData && (
                        <div className="bg-slate-950 border border-blue-500/30 rounded-xl p-4 my-2 shadow-inner">
                            <div className="flex items-center gap-2 mb-3 text-blue-400">
                                <Terminal size={14} />
                                <span className="font-mono text-xs uppercase font-bold tracking-wider">Demande d'Action Admin</span>
                            </div>

                            <div className="text-xs text-slate-300 space-y-2 mb-4">
                                {actionData.action === 'send_email' && (
                                    <>
                                        <p><span className="text-slate-500">Action:</span> Envoi d'Email Brut</p>
                                        <p><span className="text-slate-500">Sujet:</span> {actionData.payload.subject}</p>
                                    </>
                                )}
                                {actionData.action === 'send_notification' && (
                                    <>
                                        <p><span className="text-slate-500">Action:</span> Envoi de Notification</p>
                                        <p><span className="text-slate-500">Titre:</span> {actionData.payload.title}</p>
                                        <p><span className="text-slate-500">Message:</span> {actionData.payload.message}</p>
                                    </>
                                )}
                            </div>

                            <button
                                onClick={() => executeAdminAction(actionData)}
                                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Send size={14} /> Confirmer & Exécuter
                            </button>
                        </div>
                    )}

                    {postText && <p className="text-sm font-medium leading-relaxed" style={{ wordBreak: 'break-word' }}>{postText}</p>}
                </div>
            );
        }

        return <p className="text-sm font-medium leading-relaxed" style={{ wordBreak: 'break-word' }}>{msg}</p>;
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
                            <div className="relative w-12 h-12">
                                <AnimatedAIAvatar isTyping={isTyping} />
                                {/* Online indicator pulse */}
                                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-black animate-pulse z-10"></div>
                            </div>
                            <span className="font-mono font-bold text-white tracking-widest text-sm">
                                Mysterious Assistant
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
                                <div className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} w-full`}>
                                    {/* Avatar Column */}
                                    <div className="shrink-0 mb-1">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border ${msg.role === 'user' ? 'border-blue-400/30' : 'border-slate-700'}`}>
                                            {msg.role === 'user' ? (
                                                (user?.avatar || user?.picture) ? (
                                                    <img src={user.avatar || user.picture} alt="Me" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                                        {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                                                    </div>
                                                )
                                            ) : (
                                                <div className="w-full h-full">
                                                    <AnimatedAIAvatar isTyping={false} />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Message Column */}
                                    <div className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none border border-blue-500/50'
                                        : msg.type === 'suggestion'
                                            ? 'bg-amber-900/40 text-amber-100 border border-amber-500/30 rounded-bl-none'
                                            : 'bg-slate-900/80 text-slate-200 border border-white/5 rounded-bl-none'
                                        }`}>
                                        {msg.role !== 'user' && (
                                            <div className="flex items-center gap-2 mb-2 opacity-70">
                                                {msg.type === 'suggestion' ? <Sparkles size={12} className="text-amber-400" /> : <Terminal size={12} className="text-blue-400" />}
                                                <span className="text-[10px] font-mono tracking-wider uppercase">
                                                    {msg.type === 'suggestion' ? 'Proactif' : 'Système'}
                                                </span>
                                            </div>
                                        )}

                                        {renderMessageContent(msg.content, msg.role)}
                                    </div>
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
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!isTyping && input.trim()) handleSend(e);
                            }}
                            className="relative flex items-center"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Pose ta question..."
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
