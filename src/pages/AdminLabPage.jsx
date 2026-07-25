import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Gamepad2, Terminal, BookOpen, Flag, Loader2, CheckCircle2, Lock, Cpu, Play } from 'lucide-react';
import FirewallGame from '../components/games/FirewallGame';
import TerminalGame from '../components/games/TerminalGame';

const AdminLabPage = ({ user, API_URL, setToast }) => {
    // 🔒 VERROU DE SÉCURITÉ STRICT : EXCLUSIVITÉ FONDATEUR MOUHAMED FALL
    if (!user || user.email !== 'mouhamedfall@esp.sn') {
        return <Navigate to="/dashboard" replace />;
    }

    const [activeTab, setActiveTab] = useState('games'); // 'games' | 'courseGen' | 'ctfGen'

    // AI Course Generator Test State
    const [coursePrompt, setCoursePrompt] = useState("Créer un cours d'introduction à la Cryptographie Quantique avec 2 chapitres et des exemples Python.");
    const [isGeneratingCourse, setIsGeneratingCourse] = useState(false);
    const [generatedCourse, setGeneratedCourse] = useState(null);

    // AI CTF Generator Test State
    const [ctfTopic, setCtfTopic] = useState('Injection SQL et bypass d\'authentification');
    const [isGeneratingCtf, setIsGeneratingCtf] = useState(false);
    const [generatedCtf, setGeneratedCtf] = useState(null);
    const [userFlagInput, setUserFlagInput] = useState('');
    const [flagSuccess, setFlagSuccess] = useState(null);

    // Test Course Generation Handler
    const handleTestCourseGen = async () => {
        setIsGeneratingCourse(true);
        setGeneratedCourse(null);
        try {
            const res = await fetch(`${API_URL}/ai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    message: `[MODE TEST ADMIN EXCLUSIF - MOUHAMED FALL] : Génère un cours au format JSON structuré pour le sujet : "${coursePrompt}". Réponds avec une action create_course.`
                })
            });
            if (res.ok) {
                const data = await res.json();
                setGeneratedCourse(data);
                setToast && setToast({ message: "🎉 Réponse de l'IA reçue en mode Test Admin !", type: "success" });
            }
        } catch (e) {
            console.error(e);
            setToast && setToast({ message: "Erreur de communication avec l'IA.", type: "error" });
        } finally {
            setIsGeneratingCourse(false);
        }
    };

    // Test CTF Generation Handler
    const handleTestCtfGen = async () => {
        setIsGeneratingCtf(true);
        setGeneratedCtf(null);
        setFlagSuccess(null);
        try {
            const res = await fetch(`${API_URL}/ai/generate-challenge`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    topic: ctfTopic,
                    difficulty: 'Intermédiaire'
                })
            });
            if (res.ok) {
                const data = await res.json();
                setGeneratedCtf(data.challenge);
                setToast && setToast({ message: "🚩 Challenge CTF généré avec succès par Copilot !", type: "success" });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsGeneratingCtf(false);
        }
    };

    const handleVerifyFlag = (e) => {
        e.preventDefault();
        if (!generatedCtf) return;
        if (userFlagInput.trim() === generatedCtf.flag) {
            setFlagSuccess(true);
        } else {
            setFlagSuccess(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                
                {/* Admin Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-slate-900/80 border border-purple-500/30 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
                                <Lock size={12} className="text-amber-400" /> ACCÈS RESTREINT : FONDATEUR (MOUHAMED FALL)
                            </span>
                            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-black uppercase tracking-widest rounded-full">
                                MODE TEST LAB IA
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-purple-400">
                            LABORATOIRE & JEUX CYBER
                        </h1>
                        <p className="text-sm text-slate-400 font-medium max-w-xl">
                            Espace d'expérimentation secret du futur Mysterious Classroom. Testez en direct les moteurs de jeux cyber et la génération autonome par l'IA.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
                        <Cpu className="text-purple-400 animate-pulse" size={32} />
                        <div className="text-xs font-mono">
                            <div className="text-slate-400">IA Status : <strong className="text-emerald-400">DeepSeek Online</strong></div>
                            <div className="text-slate-500">Compte : mouhamedfall@esp.sn</div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <button
                        onClick={() => setActiveTab('games')}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'games' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        <Gamepad2 size={16} /> 1. Jeux Cyber & Arcade
                    </button>
                    <button
                        onClick={() => setActiveTab('courseGen')}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'courseGen' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        <BookOpen size={16} /> 2. Testeur Générateur de Cours IA
                    </button>
                    <button
                        onClick={() => setActiveTab('ctfGen')}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'ctfGen' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        <Flag size={16} /> 3. Testeur CTF & Puzzles
                    </button>
                </div>

                {/* TAB 1: CYBER GAMES */}
                {activeTab === 'games' && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-4 font-bold flex items-center gap-2">
                                <Gamepad2 size={16} /> Aperçu des Mini-Jeux de la Plateforme (Cyber-Défense & Hacking)
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <FirewallGame />
                                <TerminalGame />
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: COURSE GENERATOR TEST LAB */}
                {activeTab === 'courseGen' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                            <Sparkles className="text-amber-400" size={24} />
                            <div>
                                <h3 className="text-xl font-bold">Studio de Test IA : Génération Automatique de Cours</h3>
                                <p className="text-xs text-slate-400">Demandez à Mysterious Copilot de composer un cours de A à Z avec métadonnées et modules interactifs.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Sujet / Consignes pour l'IA :</label>
                            <textarea
                                value={coursePrompt}
                                onChange={(e) => setCoursePrompt(e.target.value)}
                                rows={3}
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                            />
                            <button
                                onClick={handleTestCourseGen}
                                disabled={isGeneratingCourse}
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl transition flex items-center gap-2"
                            >
                                {isGeneratingCourse ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
                                {isGeneratingCourse ? "Génération par l'IA en cours..." : "Lancer le Test de Génération par l'IA"}
                            </button>
                        </div>

                        {generatedCourse && (
                            <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center justify-between text-xs font-mono text-purple-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                                    <span>Résultat du Test de Génération</span>
                                    <span>[STATUS 200 OK]</span>
                                </div>
                                <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-4 bg-slate-900/80 rounded-xl max-h-96">
                                    {JSON.stringify(generatedCourse, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: CTF GENERATOR TEST LAB */}
                {activeTab === 'ctfGen' && (
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                            <Flag className="text-red-400" size={24} />
                            <div>
                                <h3 className="text-xl font-bold">Studio de Test CTF : Génération Dynamique de Defis</h3>
                                <p className="text-xs text-slate-400">Générez un challenge de cyber-sécurité unique avec code source vulnérable et flag à capturer.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Thème du Challenge Cyber :</label>
                            <input
                                type="text"
                                value={ctfTopic}
                                onChange={(e) => setCtfTopic(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                            />
                            <button
                                onClick={handleTestCtfGen}
                                disabled={isGeneratingCtf}
                                className="px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl transition flex items-center gap-2"
                            >
                                {isGeneratingCtf ? <Loader2 className="animate-spin" size={16} /> : <Flag size={16} />}
                                {isGeneratingCtf ? "Génération du Challenge..." : "Générer le Challenge CTF par IA"}
                            </button>
                        </div>

                        {generatedCtf && (
                            <div className="bg-slate-950 border border-red-500/30 rounded-2xl p-6 space-y-4">
                                <h4 className="text-lg font-black text-white">{generatedCtf.title}</h4>
                                <p className="text-xs text-slate-300">{generatedCtf.description}</p>

                                <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
                                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Code Source Vulnérable :</span>
                                    <pre className="whitespace-pre-wrap">{generatedCtf.vulnerableCode}</pre>
                                </div>

                                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-xs font-mono text-purple-300">
                                    💡 Indice Copilot : {generatedCtf.hint}
                                </div>

                                {/* Formulaire de test de Flag */}
                                <form onSubmit={handleVerifyFlag} className="flex items-center gap-3 pt-4 border-t border-slate-800">
                                    <input
                                        type="text"
                                        value={userFlagInput}
                                        onChange={(e) => setUserFlagInput(e.target.value)}
                                        placeholder="Entrez le flag déduit (ex: FLAG{...})..."
                                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none"
                                    />
                                    <button type="submit" className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition">
                                        Soumettre Flag
                                    </button>
                                </form>

                                {flagSuccess !== null && (
                                    <div className={`p-4 rounded-xl text-xs font-bold ${flagSuccess ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                        {flagSuccess ? "🎉 BRAVO MOUHAMED ! Flag exact et validé avec succès !" : "❌ Flag incorrect. Inspectez attentivement le code vulnérable !"}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminLabPage;
