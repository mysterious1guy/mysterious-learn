import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Terminal, BrainCircuit, Send, Loader, ChevronRight, Minimize2, Maximize2, Copy, Check, Image as ImageIcon, Trash2, Monitor, Paperclip } from 'lucide-react';
import { safeGetUserName } from '../utils/userUtils';
import AnimatedAIAvatar from './AnimatedAIAvatar';
import { useLanguage } from '../context/LanguageContext';

const getRandomThought = (lang, name) => {
    const frThoughts = [
        `🌐 *Cryptanalyse active.* Prêt à disséquer des paquets ou élever des privilèges aujourd'hui, ${name} ?`,
        `🛡️ *Noyau d'Hacking Éthique initialisé.* Quel challenge CTF ou concept veux-tu explorer ?`,
        `🐧 *Terminal Bash prêt.* Des scripts Python à créer ou une faille Web à analyser ?`,
        `🔍 *Investigation numérique en cours.* Pose-moi ta question, je te donnerai les indices sans gâcher la réponse !`,
        `⚡ *Système réactif.* Statut : En attente de tes directives opérationnelles.`,
        `🕵️ *Analyseur de code & vision prêt.* Tu peux m'envoyer des captures d'écran de code ou d'erreurs !`
    ];
    const enThoughts = [
        `🌐 *Cryptanalysis online.* Ready to dissect packets or analyze an exploit today, ${name}?`,
        `🛡️ *Ethical Hacking Core active.* Which CTF challenge or concept shall we explore?`,
        `🐧 *Terminal initialized.* Need to optimize Bash scripts or analyze web vulnerabilities?`,
        `🔍 *Digital Forensics active.* Ask your question, I will provide structured hints!`,
        `⚡ *System operational.* Status: Awaiting operational commands.`,
        `🕵️ *Code & Vision Analyzer ready.* Feel free to send screenshots of code or error logs!`
    ];
    const pool = (lang === 'en') ? enThoughts : frThoughts;
    return pool[Math.floor(Math.random() * pool.length)];
};

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
    const { t, language } = useLanguage();
    const userName = safeGetUserName(user, 'Voyageur');
    
    const [messages, setMessages] = useState([
        { role: 'system', content: getRandomThought(language, userName) }
    ]);
    const [input, setInput] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Auto-focus input when AI modal opens
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Initial Greeting Dynamic Murmur
    useEffect(() => {
        const timer = setTimeout(() => {
            window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                detail: { text: getRandomThought(language, userName) }
            }));
        }, 2000);
        return () => clearTimeout(timer);
    }, [user, language]);

    useEffect(() => {
        const handleSuggest = (e) => {
            if (e.detail?.text) {
                setMessages(prev => [...prev, { role: 'system', content: e.detail.text, type: 'suggestion' }]);
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

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert(language === 'en' ? 'Image file size must be under 5MB.' : 'La taille de l\'image doit être inférieure à 5 Mo.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim() && !selectedImage) return;

        const userMsg = input.trim();
        const imageToSend = selectedImage;
        setInput('');
        setSelectedImage(null);

        setMessages(prev => [...prev, { 
            role: 'user', 
            content: userMsg || (language === 'en' ? '[Attached Screenshot Analysis]' : '[Analyse de la capture d\'écran]'),
            image: imageToSend
        }]);
        setIsTyping(true);

        try {
            const historyPayload = messages
                .filter((m, idx) => !(idx === 0 && m.role === 'system'))
                .map(m => ({
                    role: m.role === 'system' ? 'assistant' : m.role,
                    text: m.content
                }));

            const response = await fetch(`${API_URL}/ai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    message: userMsg || (language === 'en' ? 'Analyze this image.' : 'Analyse cette image.'),
                    history: historyPayload,
                    language: language || 'fr',
                    image: imageToSend
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || `${t('copilot.error') || 'Erreur serveur'} : ${response.status}`);
            }

            const aiResponse = data.response || "Désolé, j'ai eu un trou de mémoire.";
            setMessages(prev => [...prev, { role: 'system', content: aiResponse }]);

            window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                detail: { text: getRandomThought(language, userName) }
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

        let cleanMsg = msg || '';
        // Auto-close unclosed code blocks if necessary
        const backtickMatches = cleanMsg.match(/```/g);
        if (backtickMatches && backtickMatches.length % 2 !== 0) {
            cleanMsg += '\n```';
        }

        const parts = [];
        let lastIndex = 0;

        // Regex to find Code blocks and JSON actions
        const combinedRegex = /(```(?:json)?\s*[\s\S]*?```)/g;
        let match;

        while ((match = combinedRegex.exec(cleanMsg)) !== null) {
            // Add preceding text
            if (match.index > lastIndex) {
                parts.push({ type: 'text', content: cleanMsg.substring(lastIndex, match.index) });
            }

            const rawBlock = match[0];
            if (rawBlock.includes('"type": "admin_action"') || (rawBlock.startsWith('```json') && rawBlock.includes('"action":'))) {
                parts.push({ type: 'action', content: rawBlock });
            } else {
                parts.push({ type: 'code', content: rawBlock });
            }
            lastIndex = combinedRegex.lastIndex;
        }

        if (lastIndex < cleanMsg.length) {
            parts.push({ type: 'text', content: cleanMsg.substring(lastIndex) });
        }

        return (
            <div className="space-y-4">
                {parts.map((part, pIdx) => {
                    if (part.type === 'text') {
                        // Simple Markdown-like parsing for text segments
                        const sanitizedContent = part.content.replace(/\\'/g, "'");
                        const lines = sanitizedContent.split('\n');
                        return lines.map((line, lIdx) => {
                            if (!line.trim()) return <div key={lIdx} className="h-2" />;

                            const trimmed = line.trim();
                            // Check for list items (only if symbol is followed by a space)
                            const isListItem = /^[•\-\*]\s+/.test(trimmed);
                            
                            let cleanLine = line;
                            if (isListItem) {
                                cleanLine = trimmed.replace(/^[•\-\*]\s+/, '');
                            }

                            // Check for bold text
                            const boldParsed = cleanLine.split(/(\*\*.*?\*\*)/g).map((seg, sIdx) => {
                                if (seg.startsWith('**') && seg.endsWith('**') && seg.length > 4) {
                                    return <strong key={sIdx} className="text-blue-400 font-bold">{seg.slice(2, -2)}</strong>;
                                }
                                // Remove orphan backslashes or asterisks
                                return seg.replace(/\*\*/g, '').replace(/\*/g, '');
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
                                            <p><span className="text-slate-500">Destinataires:</span> <span className={actionData.payload.recipients === 'specific' ? 'text-blue-400 font-bold' : 'text-amber-400 font-bold'}>{actionData.payload.recipients === 'specific' ? 'Email Ciblé' : 'TOUS LES UTILISATEURS'}</span></p>
                                            {actionData.payload.recipients === 'specific' && actionData.payload.specificEmail && (
                                                <p><span className="text-slate-500">Pour:</span> {actionData.payload.specificEmail}</p>
                                            )}
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
                    onClick={() => inputRef.current?.focus()}
                    className={`fixed top-0 right-0 h-full transition-all duration-300 bg-slate-950/95 border-l border-blue-500/20 backdrop-blur-2xl z-[150] shadow-[-10px_0_50px_rgba(0,0,0,0.5)] flex flex-col ${
                        isFullScreen 
                            ? 'w-full left-0' 
                            : isExpanded 
                                ? 'w-full sm:w-[850px] lg:w-[1000px]' 
                                : 'w-full sm:w-[540px] md:w-[640px]'
                    }`}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/60 shadow-xl relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                                <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full animate-pulse" />
                                <AnimatedAIAvatar isTyping={isTyping} />
                                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-950 z-10"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono font-black text-white tracking-[0.2em] text-xs uppercase opacity-90">
                                    Oracle Mentor
                                </span>
                                <span className="text-[10px] text-blue-400 font-bold opacity-60">
                                    {t('copilot.advanced_logic') || 'Système de Logique Avancé'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Expand / Normal Mode Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsExpanded(!isExpanded);
                                    if (isFullScreen) setIsFullScreen(false);
                                }}
                                className={`px-3 py-1.5 rounded-xl border transition-all active:scale-95 flex items-center gap-1.5 font-mono text-xs ${
                                    isExpanded && !isFullScreen
                                        ? 'bg-blue-600/30 text-blue-300 border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                                }`}
                                title={isExpanded ? "Mode Standard" : "Élargir la fenêtre"}
                            >
                                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-wider">{isExpanded ? 'Normal' : 'Élargir'}</span>
                            </button>

                            {/* FullScreen Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsFullScreen(!isFullScreen);
                                }}
                                className={`px-3 py-1.5 rounded-xl border transition-all active:scale-95 flex items-center gap-1.5 font-mono text-xs ${
                                    isFullScreen
                                        ? 'bg-purple-600/40 text-purple-300 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                                }`}
                                title={isFullScreen ? "Quitter Plein Écran" : "Mode Plein Écran"}
                            >
                                <Monitor size={16} />
                                <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-wider">{isFullScreen ? 'Réduire' : 'Plein Écran'}</span>
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                className="p-2 text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/40 border border-transparent rounded-xl transition-all active:scale-90"
                                title="Fermer"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} w-full max-w-[90%]`}>
                                    {/* Avatar Column */}
                                    <div className="shrink-0 mt-1">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center overflow-hidden border shadow-lg ${msg.role === 'user' ? 'border-blue-500/30' : 'border-slate-800 bg-slate-900'}`}>
                                            {msg.role === 'user' ? (
                                                (user?.avatar || user?.picture) ? (
                                                    <img
                                                        src={user.avatar || user.picture}
                                                        alt="Me"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName || 'U')}&background=2563EB&color=fff&size=64`;
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xs font-black text-white uppercase">
                                                        {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                                                    </div>
                                                )
                                            ) : (
                                                <div className="w-full h-full scale-110">
                                                    <AnimatedAIAvatar isTyping={false} />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Message Column */}
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className={`px-5 py-4 rounded-[1.5rem] shadow-2xl relative overflow-hidden ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none border border-blue-400/30'
                                            : msg.type === 'suggestion'
                                                ? 'bg-gradient-to-br from-amber-500/10 to-amber-900/20 text-amber-100 border border-amber-500/20 rounded-tl-none'
                                                : 'bg-gradient-to-br from-slate-900/80 to-slate-950/90 text-slate-200 border border-white/5 rounded-tl-none'
                                            }`}>
                                            {/* Subtile background patterns for AI */}
                                            {msg.role !== 'user' && (
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] pointer-events-none" />
                                            )}

                                            {msg.role !== 'user' && (
                                                <div className="flex items-center gap-2 mb-3 opacity-60">
                                                    {msg.type === 'suggestion' ? <Sparkles size={12} className="text-amber-400" /> : <Terminal size={12} className="text-blue-400" />}
                                                    <span className="text-[10px] font-black font-mono tracking-widest uppercase">
                                                        {msg.type === 'suggestion' ? 'Suggestion' : t('copilot.assistant') || 'Assistant'}
                                                    </span>
                                                </div>
                                            )}

                                            {/* User Attached Image Display */}
                                            {msg.image && (
                                                <div className="mb-3 rounded-xl overflow-hidden border border-white/20 shadow-md max-w-xs">
                                                    <img src={msg.image} alt="Capture attachée" className="w-full h-auto max-h-56 object-cover" />
                                                </div>
                                            )}

                                            {renderMessageContent(msg.content, msg.role)}
                                        </div>

                                        {/* Timestamp/Status (Subtle) */}
                                        <span className={`text-[9px] font-mono opacity-30 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start pl-14">
                                <div className="bg-slate-900/60 border border-white/5 rounded-full px-5 py-3 flex justify-center items-center gap-1.5 shadow-xl">
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-black/40 border-t border-white/10 backdrop-blur-3xl" onClick={(e) => e.stopPropagation()}>
                        {/* Selected Image Chip */}
                        {selectedImage && (
                            <div className="mb-3 flex items-center gap-3 bg-blue-950/70 border border-blue-500/40 rounded-xl p-2 max-w-xs shadow-lg animate-fadeIn">
                                <img src={selectedImage} alt="Aperçu" className="w-12 h-12 object-cover rounded-lg border border-blue-400/30" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-blue-200 truncate">Image attachée</p>
                                    <p className="text-[10px] text-blue-400">Prête pour l'analyse IA</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedImage(null)}
                                    className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!isTyping && (input.trim() || selectedImage)) handleSend(e);
                            }}
                            className="relative flex items-center group"
                        >
                            <div className="absolute inset-0 bg-blue-500/5 blur-xl group-focus-within:bg-blue-500/10 transition-all rounded-2xl" />

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />

                            {/* Image Upload Button */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute left-3 z-20 p-2 text-slate-400 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all"
                                title="Attacher une capture d'écran / image"
                            >
                                <Paperclip size={18} />
                            </button>

                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={selectedImage ? "Ajoute une question sur cette image..." : (t('copilot.ask_placeholder') || "Pose ta question au mentor...")}
                                className="w-full bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 rounded-2xl py-4 pl-12 pr-14 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all font-medium text-sm shadow-2xl relative z-10"
                            />

                            <button
                                type="submit"
                                disabled={(!input.trim() && !selectedImage) || isTyping}
                                className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800/50 disabled:text-slate-600 text-white rounded-xl transition-all group/btn active:scale-95 shadow-lg relative z-20"
                            >
                                <Send size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                        </form>

                        {/* Highly Visible Window Controls Bar */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setIsFullScreen(false);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${
                                        !isExpanded && !isFullScreen
                                            ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30'
                                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                                    }`}
                                >
                                    <Minimize2 size={13} /> Mode Normal
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsExpanded(!isExpanded);
                                        setIsFullScreen(false);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${
                                        isExpanded && !isFullScreen
                                            ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30'
                                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                                    }`}
                                >
                                    <Maximize2 size={13} /> {isExpanded ? 'Réduire Largeur' : 'Élargir Fenêtre'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsFullScreen(!isFullScreen)}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${
                                        isFullScreen
                                            ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/30'
                                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                                    }`}
                                >
                                    <Monitor size={13} /> {isFullScreen ? 'Quitter Plein Écran' : 'Plein Écran'}
                                </button>
                            </div>

                            <div className="flex items-center gap-1.5 text-[11px] text-blue-400/90 font-mono font-semibold bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                                <Sparkles size={13} className="text-amber-400" />
                                <span>Vision & IA Multimodale Actives</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MysteriousCopilot;
