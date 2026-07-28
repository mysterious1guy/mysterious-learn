import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, Code, Award, CheckCircle, Trophy, Medal, Star, Flame, 
    Loader2, ArrowRight, Lock, Plus, Calendar, X, Terminal, Play, Sparkles, Check 
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';
import { useLanguage } from '../context/LanguageContext';
import { ALL_PROJECT_MISSIONS } from './TerminalSimulatorPage';

const ProjectsList = ({ user, setUser, setToast, API_URL }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeProject, setActiveProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = user?.token || localStorage.getItem('token');
                if (!token) throw new Error(t('projectsList.auth_error') || 'Non authentifié');

                const [projectsRes, coursesRes] = await Promise.all([
                    fetch(`${API_URL}/projects`, { headers: { Authorization: `Bearer ${token}` } }),
                    fetch(`${API_URL}/courses`, { headers: { Authorization: `Bearer ${token}` } })
                ]);

                if (projectsRes.ok && coursesRes.ok) {
                    const projectsData = await projectsRes.json();
                    const coursesData = await coursesRes.json();
                    setProjects(projectsData);
                    setCourses(coursesData);
                }
            } catch (err) {
                console.error('❌ ProjectsList Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [API_URL, t, user?.token]);

    const getDifficultyColor = (diff) => {
        switch (diff?.toLowerCase()) {
            case 'débutant':
            case 'facile':
                return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30';
            case 'intermédiaire':
            case 'moyen':
                return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
            case 'avancé':
            case 'difficile':
                return 'bg-red-500/10 text-red-600 border-red-500/30';
            default:
                return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
        }
    };

    const isAdmin = user?.role === 'admin' || user?.adminTier === 'owner' || user?.email === 'mouhamedfall@esp.sn';

    // Si l'utilisateur n'est pas administrateur, afficher l'écran de maintenance/préparation
    if (!isAdmin) {
        return (
            <div className="flex-1 min-w-0 bg-slate-900 dark:bg-[#070C14] text-white relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="max-w-3xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden my-auto">
                    {/* Effets de lueur en arrière-plan */}
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/30 rounded-3xl flex items-center justify-center text-indigo-400 mx-auto shadow-inner">
                        <Lock size={38} className="animate-pulse" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} /> MODULE EN COURS DE PRÉPARATION
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                        Laboratoire de Projets & Quêtes
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto font-medium">
                        Le module de <strong className="text-white">Projets Pratiques & Missions Hacking</strong> est actuellement en cours de finalisation et d'optimisation par l'Architecte Système.
                    </p>

                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 max-w-lg mx-auto text-left space-y-3 shadow-inner">
                        <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-bold">
                            <CheckCircle size={18} />
                            <span>Prochainement disponibles :</span>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-2 font-medium">
                            <li className="flex items-center gap-2">
                                <span className="text-indigo-400 font-bold">⚡</span> Missions de code concrètes guidées par Copilot
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-indigo-400 font-bold">⚡</span> Exercices pratiques d'infrastructures & sécurité
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-indigo-400 font-bold">⚡</span> Défis interactifs pour débloquer vos badges d'expert
                            </li>
                        </ul>
                    </div>

                    <div className="pt-2 flex justify-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 hover:scale-105 active:scale-95"
                        >
                            Retour au Tableau de bord
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 min-w-0 bg-slate-50 dark:bg-[#0B1120] relative flex flex-col min-h-screen">
            <div className="flex-1 overflow-y-auto p-4 lg:p-12 mt-16 lg:mt-0 pb-32">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Banner Administrateur */}
                    {isAdmin && (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between text-amber-400 text-xs font-bold shadow-sm">
                            <div className="flex items-center gap-2">
                                <Lock size={16} className="shrink-0" />
                                <span>MODE PREVIEW ADMINISTRATEUR : Le module Projets est fermé pour les utilisateurs standard (page "En cours de préparation" affichée).</span>
                            </div>
                        </div>
                    )}

                    {/* Hero Section Projects */}
                    <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 p-10 lg:p-16 text-white border border-blue-400/30 shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
                        <div className="relative z-10 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 mb-6">
                                <Code size={16} className="text-yellow-300" />
                                <span className="text-sm font-black text-white tracking-wide uppercase">HUB DES PROJETS & INFILTRATION</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
                                Projets Pratiques <span className="text-yellow-300">& Missions Hacking</span>
                            </h1>
                            <p className="text-lg text-blue-100 mb-8 leading-relaxed font-medium">
                                Accomplissez ces quêtes guidées par **Mysterious Copilot**. Chaque projet validé vous attribue vos XP et débloque votre progression dans la plateforme.
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-md">
                                        <Briefcase size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Projets Disponibles</p>
                                        <p className="text-2xl font-black text-white">{ALL_PROJECT_MISSIONS.length + projects.length}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/30 flex items-center justify-center border border-emerald-400/40 backdrop-blur-md">
                                        <Award size={24} className="text-emerald-300" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Mon Score XP</p>
                                        <p className="text-2xl font-black text-white">{user?.xp || 0} XP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section : Cartes des Projets */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
                                <Sparkles size={16} /> APERÇU RESERVÉ AUX ADMINISTRATEURS
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                                Projets & Quêtes Pratiques
                            </h2>
                        </div>

                        {/* Grille des Cartes de Projets */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ALL_PROJECT_MISSIONS.map((m, index) => {
                                const savedCompleted = JSON.parse(localStorage.getItem('completed_missions') || '[]');
                                const userCompletedIds = (user?.completedQuests || []).map(q => typeof q === 'string' ? q : (q.projectId || q._id || q.id));
                                const isCompleted = savedCompleted.includes(m.id) || userCompletedIds.includes(m.id);

                                const isAdminOrAI = user?.role === 'admin' || user?.adminTier === 'owner' || user?.email === 'mouhamedfall@esp.sn' || user?.isAI;
                                const isUnlocked = index === 0 || isAdminOrAI || (savedCompleted.includes(ALL_PROJECT_MISSIONS[index - 1]?.id) || userCompletedIds.includes(ALL_PROJECT_MISSIONS[index - 1]?.id));

                                return (
                                    <motion.div
                                        key={m.id}
                                        whileHover={isUnlocked ? { y: -4 } : { scale: 1 }}
                                        className={`bg-white dark:bg-slate-900 border ${isCompleted ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-800'} rounded-3xl p-6 shadow-xl flex flex-col justify-between transition relative overflow-hidden group ${isUnlocked ? 'hover:border-indigo-500/40' : ''}`}
                                    >
                                        {!isUnlocked && (
                                            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center space-y-3">
                                                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
                                                    <Lock size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-black text-white uppercase tracking-wider">Projet Verrouillé 🔒</h4>
                                                    <p className="text-xs text-slate-300 font-medium mt-1">Validez le projet précédent pour débloquer cette mission.</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="px-3.5 py-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                                                    ⚡ {m.category}
                                                </span>
                                                {isCompleted && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                                                        <Check size={12} /> VALIDÉ
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-indigo-500 transition-colors">
                                                {m.title}
                                            </h3>

                                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                                {m.scenario}
                                            </p>

                                            {/* Objectifs du projet */}
                                            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Objectifs du Projet :</p>
                                                <ul className="space-y-2">
                                                    {m.objectives.map((obj, i) => (
                                                        <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 font-medium">
                                                            <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                                                            <span>{obj}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-1.5 text-amber-500 font-black text-sm">
                                                <Trophy size={18} />
                                                <span>+{m.xpReward} XP</span>
                                            </div>

                                            <button
                                                onClick={() => setToast && setToast({ type: 'info', message: `Projet "${m.title}" (Aperçu Admin)` })}
                                                disabled={!isUnlocked}
                                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition shadow-indigo-600/20"
                                            >
                                                <Play size={14} />
                                                Aperçu Admin ⚡
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>

            <AIAssistant />
        </div>
    );
};

export default ProjectsList;
