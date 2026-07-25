import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Gamepad2, Terminal, BookOpen, Flag, Loader2, CheckCircle2, Lock, Cpu, Play, ArrowRight } from 'lucide-react';
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
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 md:p-10 font-sans relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                
                {/* Admin Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl">
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                                <Lock size={13} className="text-amber-600" /> ACCÈS RESTREINT : FONDATEUR (MOUHAMED FALL)
                            </span>
                            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-700 text-[11px] font-bold uppercase tracking-wider rounded-full">
                                🧪 ESPACE EXPERIMENTAL & TEST LAB
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                            Laboratoire IA & Jeux Cyber
                        </h1>
                        <p className="text-sm text-slate-600 font-normal max-w-2xl">
                            Voici ton espace privé de test. Tu peux essayer ici les futurs jeux interactifs (Firewall & Terminal CLI) ainsi que les outils de génération automatique de cours et de challenges CTF propulsés par l'IA.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-inner shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                            <Cpu size={22} className="animate-pulse" />
                        </div>
                        <div className="text-xs">
                            <div className="text-slate-500">Moteur IA : <strong className="text-emerald-600 font-bold">DeepSeek Actif</strong></div>
                            <div className="text-slate-700 font-medium">Session : mouhamedfall@esp.sn</div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white p-2 border border-slate-200 rounded-2xl shadow-sm">
                    <button
                        onClick={() => setActiveTab('games')}
                        className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'games' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <Gamepad2 size={16} /> 1. Jeux & Simulations Cyber
                    </button>
                    <button
                        onClick={() => setActiveTab('courseGen')}
                        className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'courseGen' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <BookOpen size={16} /> 2. Générateur de Cours IA
                    </button>
                    <button
                        onClick={() => setActiveTab('ctfGen')}
                        className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'ctfGen' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <Flag size={16} /> 3. Générateur de Defis CTF
                    </button>
                </div>

                {/* TAB 1: CYBER GAMES */}
                {activeTab === 'games' && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="space-y-2 max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-emerald-100 border border-white/20">
                                    <Terminal size={14} /> MODE PLEIN ÉCRAN
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-black">
                                    Terminal & Hacking Simulator (Plein Écran)
                                </h2>
                                <p className="text-emerald-100 text-sm leading-relaxed font-medium">
                                    Découvrez le nouveau simulateur CLI grand format pour maîtriser les commandes Linux et Cybersécurité avec des défis générés en temps réel par l'IA.
                                </p>
                            </div>
                            <Link
                                to="/terminal-simulator"
                                className="px-6 py-4 bg-white hover:bg-emerald-50 text-emerald-900 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl flex items-center gap-2 transition shrink-0 group"
                            >
                                Ouvrir le Simulateur Plein Écran
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-5 text-blue-950 text-sm">
                            <strong className="font-bold flex items-center gap-2 text-blue-900 mb-1">
                                🎮 Mode d'emploi des Jeux :
                            </strong>
                            Ces mini-jeux permettent aux étudiants d'apprendre la cybersécurité en s'amusant. Le <strong>Firewall Matrix</strong> teste les réflexes de défense en bloquant les paquets suspects, tandis que le <strong>Terminal CLI</strong> permet de s'entraîner aux commandes Linux de piratage.
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <FirewallGame />
                            <TerminalGame />
                        </div>
                    </div>
                )}

                {/* TAB 2: COURSE GENERATOR TEST LAB */}
                {activeTab === 'courseGen' && (
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                                <Sparkles size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Générateur Automatique de Cours par IA</h3>
                                <p className="text-xs text-slate-500">Donne simplement un sujet à l'IA, elle composera le cours structuré complet.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Sujet du cours souhaité :</label>
                            <textarea
                                value={coursePrompt}
                                onChange={(e) => setCoursePrompt(e.target.value)}
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-sm font-sans text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                                placeholder="Entrez le titre ou sujet du cours..."
                            />
                            <button
                                onClick={handleTestCourseGen}
                                disabled={isGeneratingCourse}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center gap-2"
                            >
                                {isGeneratingCourse ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
                                {isGeneratingCourse ? "Génération par l'IA en cours..." : "Générer le Cours par IA"}
                            </button>
                        </div>

                        {generatedCourse && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center justify-between text-xs font-mono text-blue-600 font-bold uppercase tracking-wider border-b border-slate-200 pb-2">
                                    <span>Résultat du Cours Généré</span>
                                    <span>[PRÊT À L'INTEGRATION]</span>
                                </div>
                                <pre className="text-xs font-mono text-slate-800 overflow-x-auto p-4 bg-white border border-slate-200 rounded-xl max-h-96">
                                    {JSON.stringify(generatedCourse, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: CTF GENERATOR TEST LAB */}
                {activeTab === 'ctfGen' && (
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold">
                                <Flag size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Générateur de Puzzles CTF</h3>
                                <p className="text-xs text-slate-500">Créez en un clic des défis de hacking avec code vulnérable et drapeau (flag) à trouver.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Thème de la vulnérabilité :</label>
                            <input
                                type="text"
                                value={ctfTopic}
                                onChange={(e) => setCtfTopic(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-sm font-sans text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                            />
                            <button
                                onClick={handleTestCtfGen}
                                disabled={isGeneratingCtf}
                                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center gap-2"
                            >
                                {isGeneratingCtf ? <Loader2 className="animate-spin" size={16} /> : <Flag size={16} />}
                                {isGeneratingCtf ? "Génération du Challenge..." : "Générer le Challenge CTF par IA"}
                            </button>
                        </div>

                        {generatedCtf && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                                <h4 className="text-lg font-bold text-slate-900">{generatedCtf.title}</h4>
                                <p className="text-sm text-slate-600">{generatedCtf.description}</p>

                                <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
                                    <span className="text-[10px] text-slate-400 uppercase block mb-1">Code Source Vulnérable :</span>
                                    <pre className="whitespace-pre-wrap">{generatedCtf.vulnerableCode}</pre>
                                </div>

                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs font-mono text-blue-900">
                                    💡 Indice Copilot : {generatedCtf.hint}
                                </div>

                                {/* Formulaire de test de Flag */}
                                <form onSubmit={handleVerifyFlag} className="flex items-center gap-3 pt-4 border-t border-slate-200">
                                    <input
                                        type="text"
                                        value={userFlagInput}
                                        onChange={(e) => setUserFlagInput(e.target.value)}
                                        placeholder="Entrez le flag déduit (ex: FLAG{...})..."
                                        className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500"
                                    />
                                    <button type="submit" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition">
                                        Soumettre Flag
                                    </button>
                                </form>

                                {flagSuccess !== null && (
                                    <div className={`p-4 rounded-xl text-xs font-bold ${flagSuccess ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-red-50 text-red-800 border border-red-300'}`}>
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
