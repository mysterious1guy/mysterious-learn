import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Terminal, BrainCircuit, Send, Loader, ChevronRight, Minimize2, Maximize2, Copy, Check } from 'lucide-react';
import { safeGetUserName } from '../utils/userUtils';
import AnimatedAIAvatar from './AnimatedAIAvatar';

const TerminalBlock = ({ code, lang }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-4 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl group/term">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <span className="ml-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">{lang || 'code'}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                    title="Copier"
                >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
            </div>
            <div className="p-4 overflow-x-auto custom-scrollbar">
                <pre className="font-mono text-xs text-blue-100 leading-relaxed">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

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
            let endpoint = '';
            let method = 'POST';
            let body = JSON.stringify(actionData.payload);

            if (actionData.action === 'send_email') endpoint = '/admin/send-email';
            else if (actionData.action === 'send_notification') endpoint = '/admin/send-notification';
            else if (actionData.action === 'add_knowledge') {
                endpoint = '/ai/knowledge';
                method = 'POST';
                body = JSON.stringify(actionData.payload);
            }
            else if (actionData.action === 'delete_user') {
                endpoint = `/admin/users/${actionData.payload.userId}`;
                method = 'DELETE';
                body = null;
            } else if (actionData.action === 'update_role') {
                endpoint = `/admin/users/${actionData.payload.userId}/role`;
                method = 'PUT';
                body = JSON.stringify({ role: actionData.payload.role });
            } else {
                throw new Error("Action non reconnue.");
            }

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || localStorage.getItem('token')}`
                },
                body: body
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

        const parts = [];
        let lastIndex = 0;

        // Regex to find Code blocks and JSON actions
        const combinedRegex = /(```(?:json)?\s*[\s\S]*?```)/g;
        let match;

        while ((match = combinedRegex.exec(msg)) !== null) {
            // Add preceding text
            if (match.index > lastIndex) {
                parts.push({ type: 'text', content: msg.substring(lastIndex, match.index) });
            }

            const rawBlock = match[0];
            if (rawBlock.startsWith('```json') && rawBlock.includes('"type": "admin_action"')) {
                parts.push({ type: 'action', content: rawBlock });
            } else {
                parts.push({ type: 'code', content: rawBlock });
            }
            lastIndex = combinedRegex.lastIndex;
        }

        if (lastIndex < msg.length) {
            parts.push({ type: 'text', content: msg.substring(lastIndex) });
        }

        return (
            <div className="space-y-4">
                {parts.map((part, pIdx) => {
                    if (part.type === 'text') {
                        // Simple Markdown-like parsing for text segments
                        const lines = part.content.split('\n');
                        return lines.map((line, lIdx) => {
                            if (!line.trim()) return <div key={lIdx} className="h-2" />;

                            // Check for list items
                            const isListItem = line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*');

                            // Check for bold text
                            const boldParsed = line.split(/(\*\*.*?\*\*)/g).map((seg, sIdx) => {
                                if (seg.startsWith('**') && seg.endsWith('**')) {
                                    return <strong key={sIdx} className="text-blue-400 font-bold">{seg.slice(2, -2)}</strong>;
                                }
                                return seg;
                            });

                            return (
                                <p key={lIdx} className={`text-sm font-medium leading-relaxed ${isListItem ? 'pl-4 relative' : ''}`} style={{ wordBreak: 'break-word' }}>
                                    {isListItem && <span className="absolute left-0 text-blue-500">•</span>}
                                    {boldParsed}
                                </p>
                            );
                        });
                    }

                    if (part.type === 'code') {
                        const codeMatch = part.content.match(/```(\w+)?\n?([\s\S]*?)```/);
                        const lang = codeMatch?.[1] || '';
                        const code = codeMatch?.[2]?.trim() || '';
                        return <TerminalBlock key={pIdx} code={code} lang={lang} />;
                    }

                    if (part.type === 'action') {
                        const jsonContent = part.content.match(/```json\s*(\{[\s\S]*?\})\s*```/)?.[1];
                        let actionData = null;
                        try {
                            actionData = JSON.parse(jsonContent);
                        } catch (e) { return null; }

                        return (
                            <div key={pIdx} className="bg-slate-950 border border-blue-500/30 rounded-xl p-4 my-2 shadow-inner">
                                <div className="flex items-center gap-2 mb-3 text-blue-400">
                                    <BrainCircuit size={14} />
                                    <span className="font-mono text-[10px] uppercase font-black tracking-widest">
                                        ACTION REQUISE : {actionData.action.replace('_', ' ')}
                                    </span>
                                </div>

                                <div className="text-xs text-slate-300 space-y-2 mb-4">
                                    {actionData.action === 'send_email' && (
                                        <>
                                            <p><span className="text-slate-500">Action:</span> Envoi d'Email</p>
                                            <p><span className="text-slate-500">Sujet:</span> {actionData.payload.subject}</p>
                                        </>
                                    )}
                                    {actionData.action === 'send_notification' && (
                                        <>
                                            <p><span className="text-slate-500">Action:</span> Notification In-App</p>
                                            <p><span className="text-slate-500">Titre:</span> {actionData.payload.title}</p>
                                        </>
                                    )}
                                    {actionData.action === 'add_knowledge' && (
                                        <>
                                            <p><span className="text-slate-500">Action:</span> MÉMORISATION</p>
                                            <p><span className="text-slate-500">Sujet:</span> <span className="text-blue-400">{actionData.payload.title}</span></p>
                                        </>
                                    )}
                                    {actionData.action === 'delete_user' && <p className="text-red-400">⚠️ SUPPRESSION : {actionData.payload.userId}</p>}
                                    {actionData.action === 'update_role' && <p>Rôle → <span className="text-amber-400">{actionData.payload.role}</span></p>}
                                </div>

                                <button
                                    onClick={() => executeAdminAction(actionData)}
                                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Send size={12} /> Confirmer l'Action
                                </button>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
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
