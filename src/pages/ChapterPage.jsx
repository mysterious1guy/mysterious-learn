import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy } from 'lucide-react';
import InteractiveModule from '../components/InteractiveModule';
import Confetti from 'react-confetti';

const ChapterPage = ({ user, API_URL, setToast }) => {
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

        const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [courseId]);

    const fetchCourse = async () => {
        try {
            const response = await fetch(`${API_URL}/courses/${courseId}`);
            if (response.ok) {
                const courseData = await response.json();
                setCourse(courseData);
            } else {
                setToast({ message: 'Cours non trouvé', type: 'error' });
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setToast({ message: 'Erreur réseau', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Chargement...</div>;
    if (!course) return <div className="min-h-screen flex items-center justify-center text-white">Cours introuvable</div>;

    const chapter = course.chapters[parseInt(chapterIndex)];
    if (!chapter || !chapter.modules) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
                <p>Ce chapitre n'est pas encore interactif.</p>
                <button onClick={() => navigate(`/course/${courseId}`)} className="px-4 py-2 bg-blue-600 rounded-lg">Retour</button>
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
                        lessonId: chapter.id,
                        // totalLessons could be course.chapters.length normally
                        totalLessons: course.chapters.length
                    })
                });
            } catch (e) {
                console.error("Impossible de sauvegarder la progression", e);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white relative flex flex-col">
            {chapterCompleted && <Confetti width={windowDimensions.width} height={windowDimensions.height} recycle={false} numberOfPieces={500} />}

            {/* Navbar Minimaliste */}
            <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-4 md:px-8 flex items-center justify-between">
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
                            className="text-center space-y-6 bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-3xl"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-yellow-500/20 mb-6">
                                <Trophy className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Chapitre Terminé !</h2>
                            <p className="text-slate-400 text-lg max-w-md mx-auto">
                                Excellent travail ! Tu as débloqué de nouvelles connaissances. Prêt pour la suite ?
                            </p>

                            <button
                                onClick={() => navigate(`/course/${courseId}`)}
                                className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-500 font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25"
                            >
                                Retour au plan du cours
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChapterPage;
