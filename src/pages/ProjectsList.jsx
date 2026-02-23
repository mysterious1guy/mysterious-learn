import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, Award, CheckCircle, ArrowRight, Lock, Loader2, Plus, Calendar, X } from 'lucide-react';
import axios from 'axios';
import AIAssistant from '../components/AIAssistant';

const ProjectsList = ({ user, setUser, setToast }) => {
    const [projects, setProjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeProject, setActiveProject] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Non authentifié');

                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

                const [projectsRes, coursesRes] = await Promise.all([
                    axios.get(`${API_URL}/api/projects`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${API_URL}/api/courses`, { headers: { Authorization: `Bearer ${token}` } })
                ]);

                setProjects(projectsRes.data);
                setCourses(coursesRes.data);
            } catch (err) {
                console.error(err);
                setError('Impossible de charger les projets pour le moment.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Helper pour savoir si on peut débloquer le projet
    // L'utilisateur doit avoir débloqué le cours Avancé du langage cible (ou être Admin, ou déjà l'avoir complété)
    const canAccessProject = (project) => {
        if (user?.role === 'admin' || user?.adminTier === 'owner') return true;

        // Is it already completed?
        if (user?.completedQuests?.some(q => q.projectId === project._id)) return true;

        // Trouver le cours "Avancé" correspondant au langage du projet
        const requiredCourse = courses.find(c =>
            c.title.toLowerCase().includes(project.language.toLowerCase()) &&
            (c.level === 'Avancé' || c.level === 'Expert')
        );

        if (!requiredCourse) return false; // Par sécurité si le cours n'existe pas

        return user?.unlockedCourses?.includes(requiredCourse._id || requiredCourse.id);
    };

    const isCompleted = (projectId) => {
        return user?.completedQuests?.some(quest => quest.projectId === projectId);
    };

    const handleSubmitProject = async (projectId) => {
        try {
            setSubmitting(true);
            const token = localStorage.getItem('token');
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const { data } = await axios.post(`${API_URL}/api/projects/${projectId}/submit`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setToast({ message: data.message || `Projet validé ! +${data.xpGained} XP`, type: 'success' });

            // Mettre à jour l'utilisateur localement
            setUser(prev => ({
                ...prev,
                xp: data.totalXp,
                completedQuests: [...(prev.completedQuests || []), { projectId, completedAt: new Date().toISOString() }]
            }));

            setActiveProject(null);
        } catch (err) {
            console.error(err);
            setToast({ message: err.response?.data?.message || 'Erreur lors de la soumission', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const getDifficultyColor = (diff) => {
        switch (diff) {
            case 'Facile': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Moyen': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Difficile': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            case 'Extrême': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <div className="flex-1 min-w-0 bg-white dark:bg-[#0B1120] relative flex flex-col">

            <div className="flex-1 overflow-y-auto p-4 lg:p-12 mt-16 lg:mt-0 pb-32">
                <div className="max-w-6xl mx-auto space-y-12">

                    {/* Hero Section Projects */}
                    <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-900 to-slate-900 p-10 lg:p-16 text-white border border-indigo-500/20 shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full -ml-10 -mb-10"></div>

                        <div className="relative z-10 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6">
                                <Code size={16} className="text-indigo-300" />
                                <span className="text-sm font-bold text-indigo-100 tracking-wide">LABORATOIRE PRATIQUE</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
                                Projets <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Finaux</span>
                            </h1>
                            <p className="text-lg text-indigo-100/80 mb-8 leading-relaxed font-medium">
                                Construisez de véritables applications pour valider vos acquis. Ces projets complets remplacent les exercices basiques par des défis d'ingénierie réels.
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                                        <Briefcase size={24} className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white/50 uppercase">Projets Dispos</p>
                                        <p className="text-xl font-black">{projects.length}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                        <Award size={24} className="text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white/50 uppercase">Validés</p>
                                        <p className="text-xl font-black">{user?.completedQuests?.length || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Listing */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white">Défis Disponibles</h2>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="animate-spin text-indigo-500" size={48} />
                            </div>
                        ) : error ? (
                            <div className="p-6 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-center font-bold">
                                {error}
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
                                <Code size={48} className="mx-auto mb-4 text-slate-400 opacity-50" />
                                <p className="text-slate-500 font-bold">Aucun projet n'est disponible pour le moment.</p>
                                <p className="text-slate-400 text-sm mt-2">Le serveur va être mis à jour prochainement.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.isArray(projects) && projects.map((project) => {
                                    const hasAccess = canAccessProject(project);
                                    const completed = isCompleted(project._id);

                                    return (
                                        <motion.div
                                            key={project._id}
                                            whileHover={hasAccess ? { y: -5 } : {}}
                                            onClick={() => hasAccess ? setActiveProject(project) : null}
                                            className={`relative overflow-hidden rounded-3xl border transition-all ${hasAccess
                                                ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl cursor-pointer'
                                                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-75 cursor-not-allowed'
                                                }`}
                                        >
                                            <div className="p-6 lg:p-8 flex flex-col h-full">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getDifficultyColor(project.difficulty)}`}>
                                                        {project.difficulty}
                                                    </span>
                                                    {completed && (
                                                        <div className="bg-green-500 text-white rounded-full p-1.5 shadow-lg shadow-green-500/30">
                                                            <CheckCircle size={16} />
                                                        </div>
                                                    )}
                                                    {!hasAccess && !completed && (
                                                        <div className="bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-full p-1.5">
                                                            <Lock size={16} />
                                                        </div>
                                                    )}
                                                </div>

                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                                                    {project.title}
                                                </h3>

                                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">
                                                    {project.description}
                                                </p>

                                                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Langage:</span>
                                                        <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{project.language}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-amber-500 font-black">
                                                        <span>+{project.xpReward}</span>
                                                        <span className="text-xs">XP</span>
                                                    </div>
                                                </div>

                                                {!hasAccess && (
                                                    <div className="absolute inset-0 bg-slate-100/40 dark:bg-slate-950/40 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                        <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 max-w-[80%] text-center">
                                                            <Lock size={16} className="text-slate-400 shrink-0" />
                                                            <span>Validez "{project.language} - Avancé" pour débloquer.</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Projet */}
            <AnimatePresence>
                {activeProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800"
                        >
                            <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 p-6 flex items-center justify-between z-10">
                                <div>
                                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-1">{activeProject.language} PROJECT</span>
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white">{activeProject.title}</h2>
                                </div>
                                <button
                                    onClick={() => setActiveProject(null)}
                                    className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">Contexte</h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {activeProject.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                        <p className="text-xs font-bold uppercase text-slate-400 mb-1">Niveau Cible</p>
                                        <p className="text-slate-800 dark:text-white font-bold">{activeProject.level}</p>
                                    </div>
                                    <div className="bg-amber-50 dark:bg-amber-500/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-500/20">
                                        <p className="text-xs font-bold uppercase text-amber-600/70 dark:text-amber-500/70 mb-1">Récompense XP</p>
                                        <p className="text-amber-600 dark:text-amber-400 font-black text-lg">+{activeProject.xpReward} XP</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                        <CheckCircle size={20} className="text-green-500" />
                                        Cahier des charges
                                    </h3>
                                    <ul className="space-y-3">
                                        {activeProject.requirements?.map((req, i) => (
                                            <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300">
                                                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-slate-400">
                                                    {i + 1}
                                                </div>
                                                <span className="leading-snug">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                        <Award size={20} className="text-blue-500" />
                                        Objectifs pédagogiques
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.objectives?.map((obj, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold border border-blue-100 dark:border-blue-500/20 rounded-lg">
                                                {obj}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                    {isCompleted(activeProject._id) ? (
                                        <div className="w-full py-4 bg-green-500/10 text-green-600 dark:text-green-400 font-bold rounded-2xl border border-green-500/20 text-center flex items-center justify-center gap-2">
                                            <CheckCircle size={20} />
                                            Projet déjà validé
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleSubmitProject(activeProject._id)}
                                            disabled={submitting}
                                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-2xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 group"
                                        >
                                            {submitting ? (
                                                <Loader2 className="animate-spin" size={20} />
                                            ) : (
                                                <>
                                                    Valider ce projet
                                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                    <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed max-w-sm mx-auto">
                                        En validant, vous certifiez avoir réalisé ce projet en autonomie en respectant le cahier des charges expresse.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AIAssistant />
        </div>
    );
};

export default ProjectsList;
