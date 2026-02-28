import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, ChevronRight } from 'lucide-react';
import InteractiveModule from '../components/InteractiveModule';
import Confetti from 'react-confetti';
import ComingSoon from '../components/ComingSoon';
import { coursesData } from '../courses/data.jsx';

const ChapterPage = ({ user, API_URL, setToast, fetchProgressions, progressions }) => {
    const { courseId, chapterIndex } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    // Learning flow state
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [chapterCompleted, setChapterCompleted] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        fetchCourse();
    }, [courseId]);

    useEffect(() => {
        const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!course || !user || !progressions) return;

        // 🚀 God-mode for Admins
        if (user?.role === 'admin') return;

        // Tous les débutants sont débloqués par défaut
        if (course.level === 'Débutant') return;

        // Si l'utilisateur l'a débloqué individuellement
        if (user?.unlockedCourses?.includes(course.id)) return;

        let targetLevelToCheck = '';
        if (course.level === 'Intermédiaire') targetLevelToCheck = 'Débutant';
        if (course.level === 'Avancé') targetLevelToCheck = 'Intermédiaire';

        if (!targetLevelToCheck) return;

        let unlocked = false;
        for (const cat of coursesData) {
            if (cat.items.some(i => i.id === course.id)) {
                const reqCourse = cat.items.find(i => i.level === targetLevelToCheck);
                if (reqCourse) {
                    const reqProgress = progressions?.[reqCourse.id]?.progress || 0;
                    if (reqProgress >= 100) unlocked = true;
                } else {
                    unlocked = true;
                }
            }
        }

        if (!unlocked) {
            if (setToast) setToast({ message: "Vous devez terminer le niveau précédent pour accéder à ce cours.", type: 'warning' });
            navigate('/dashboard', { replace: true });
        }
    }, [course, user, progressions, navigate, setToast]);

    const fetchCourse = async () => {
        try {
            const response = await fetch(`${API_URL}/courses/${courseId}`);
            if (response.ok) {
                const courseData = await response.json();
                setCourse(courseData);
            } else {
                setCourse(null);
            }
        } catch (error) {
            console.error('Erreur:', error);
            setToast({ message: 'Erreur réseau', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">Chargement...</div>;
    if (!course) return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center">
            <ComingSoon />
        </div>
    );

    const chapter = course.chapters[parseInt(chapterIndex)];
    if (!chapter || !chapter.modules) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center">
                <ComingSoon
                    title="Chapitre en construction"
                    message="Désolé ! Ce chapitre n'est pas encore interactif. Nos équipes travaillent pour le rendre disponible très bientôt."
                />
            </div>
        );
    }

    const currentModule = chapter.modules[currentModuleIndex];
    const progressPercent = ((currentModuleIndex) / chapter.modules.length) * 100;

    const handleModuleComplete = async () => {
        if (currentModuleIndex < chapter.modules.length - 1) {
            setCurrentModuleIndex(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setChapterCompleted(true);
            // Save progress to backend
            try {
                await fetch(`${API_URL}/courses/${courseId}/progress`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        lessonId: chapter.id || chapter.title,
                        // totalLessons could be course.chapters.length normally
                        totalLessons: course.chapters.length
                    })
                });
                if (fetchProgressions) fetchProgressions();
            } catch (e) {
                console.error("Impossible de sauvegarder la progression", e);
            }
        }
    };

    return (
        <div className="min-h-screen course-theme-light bg-slate-50 text-slate-900 relative flex flex-col transition-colors duration-500">
            {chapterCompleted && <Confetti width={windowDimensions.width} height={windowDimensions.height} recycle={false} numberOfPieces={500} />}

            {/* Navbar Minimaliste */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4 md:px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/course/${courseId}`)}
                        className="p-2 hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="hidden md:block">
                        <h2 className="text-sm font-bold text-slate-300">{course.title}</h2>
                        <p className="text-xs text-slate-500">{chapter.title}</p>
                    </div>
                </div>

                {/* Progress bar logic */}
                <div className="flex items-center gap-6">
                    {user?.role === 'admin' && (
                        <button
                            onClick={handleModuleComplete}
                            className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all shadow-[0_0_10px_rgba(245,158,11,0.1)] flex items-center gap-2"
                        >
                            <ChevronRight size={12} /> Passer l'étape
                        </button>
                    )}
                    <div className="flex items-center gap-3 w-32 md:w-48">
                        <span className="text-xs font-semibold text-slate-400">{currentModuleIndex + (chapterCompleted ? 1 : 0)} / {chapter.modules.length}</span>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                                style={{ width: `${chapterCompleted ? 100 : progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-4 py-8 md:py-16">
                <AnimatePresence mode="wait">
                    {!chapterCompleted ? (
                        <motion.div
                            key={currentModule.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-8 font-medium text-blue-400 text-sm tracking-wider uppercase">
                                Étape {currentModuleIndex + 1}
                            </div>
                            <InteractiveModule
                                moduleData={currentModule}
                                onComplete={handleModuleComplete}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="completed"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6 bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-xl"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-yellow-500/20 mb-6">
                                <Trophy className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Chapitre Terminé !</h2>
                            <p className="text-slate-600 text-lg max-w-md mx-auto font-medium">
                                Quel talent ! Tu as débloqué de nouvelles connaissances indispensables. Prêt(e) pour le prochain défi ?
                            </p>

                            <button
                                onClick={() => navigate(`/course/${courseId}`)}
                                className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center mx-auto gap-2 group transform hover:-translate-y-1"
                            >
                                Retour au plan du cours <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChapterPage;
