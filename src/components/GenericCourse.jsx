import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft, ChevronRight, ChevronDown, BookOpen,
    CheckCircle, Circle, Play, Check
} from 'lucide-react';

const GenericCourse = ({ course, onClose, completedLessons = [], onLessonComplete }) => {

    const [activeLesson, setActiveLesson] = useState(course.lessons && course.lessons.length > 0 ? course.lessons[0] : null);

    const handleFinishLesson = () => {
        if (activeLesson) {
            onLessonComplete(course.id, activeLesson.id);
        }
    };

    const isLessonCompleted = (id) => completedLessons && completedLessons.includes(id);

    if (!course) return null;

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
            {/* Sidebar de navigation */}
            <div className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-lg transition text-white/80 hover:text-white"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="font-bold truncate">{course.name}</h1>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Programme</h3>
                        <div className="space-y-1">
                            {course.lessons && course.lessons.map((lesson) => (
                                <button
                                    key={lesson.id}
                                    onClick={() => setActiveLesson(lesson)}
                                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition ${activeLesson?.id === lesson.id ? 'bg-blue-600/20 text-blue-400 border border-blue-600/50' : 'hover:bg-gray-900 text-white/80'}`}
                                >
                                    {isLessonCompleted(lesson.id) ? (
                                        <CheckCircle size={16} className="text-green-500" />
                                    ) : (
                                        <Circle size={16} />
                                    )}
                                    <span className="text-sm font-medium">{lesson.title}</span>
                                    <span className="text-xs ml-auto opacity-50">{lesson.duration}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Zone de contenu principal */}
            <div className="flex-1 flex flex-col min-w-0 bg-gray-900 relative">
                {/* Header du contenu */}
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900/50 backdrop-blur-sm z-10">
                    <h2 className="text-xl font-bold">{activeLesson ? activeLesson.title : 'Sélectionnez une leçon'}</h2>

                    <div className="flex items-center gap-4">
                        <div className="text-sm text-white/80">
                            Progression: {Math.round((completedLessons.length / (course.lessons?.length || 1)) * 100)}%
                        </div>
                    </div>
                </header>

                {/* Contenu défilable */}
                <main className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
                    {activeLesson ? (
                        <motion.div
                            key={activeLesson.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            <div className="prose prose-invert max-w-none">
                                <h1>{activeLesson.title}</h1>
                                <p className="lead text-xl text-white">
                                    {course.desc}
                                </p>

                                <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl my-8">
                                    <h3 className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                                        <BookOpen size={20} /> À propos de cette leçon
                                    </h3>
                                    <p className="text-white">
                                        Cette leçon fait partie du cursus <strong>{course.name}</strong>.
                                        Dans ce module, nous allons explorer les concepts fondamentaux de "{activeLesson.title}".
                                    </p>
                                </div>

                                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-bold mb-4">Contenu en construction 🚧</h3>
                                    <p className="text-white/80">
                                        Le contenu détaillé de cette leçon est en cours de rédaction par nos experts.
                                        Revenez bientôt pour découvrir la théorie, les exercices et les quiz !
                                    </p>
                                    <div className="mt-4 p-4 bg-black/30 rounded-lg font-mono text-sm text-green-400">
                                        {course.code || '// Code exemple à venir...'}
                                    </div>
                                </div>
                            </div>

                            {/* Zone de validation */}
                            <div className="flex items-center justify-between pt-8 border-t border-gray-800 mt-12">
                                <button
                                    className="px-6 py-3 rounded-xl border border-gray-700 text-white/80 hover:text-white hover:border-gray-500 transition"
                                    disabled // Placeholder for now
                                >
                                    <ChevronRight className="rotate-180 inline mr-2" size={16} />
                                    Précédent
                                </button>

                                <button
                                    onClick={handleFinishLesson}
                                    disabled={isLessonCompleted(activeLesson.id)}
                                    className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition ${isLessonCompleted(activeLesson.id)
                                        ? 'bg-green-600/20 text-green-400 cursor-default'
                                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
                                        }`}
                                >
                                    {isLessonCompleted(activeLesson.id) ? (
                                        <>
                                            <Check size={20} /> Leçon terminée
                                        </>
                                    ) : (
                                        <>
                                            Terminer la leçon <ChevronRight size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <BookOpen size={48} className="mb-4 opacity-50" />
                            <p>Sélectionnez une leçon dans le menu pour commencer.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default GenericCourse;
