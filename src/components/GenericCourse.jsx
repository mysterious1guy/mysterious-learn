import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft, ChevronRight, BookOpen,
    CheckCircle, Circle, Play, Check, CheckSquare, Target, Lightbulb, Code
} from 'lucide-react';
import CourseTerminal from '../courses/CourseTerminal';

const GenericCourse = ({ course, onClose, user, completedLessons = [], onLessonComplete }) => {
    // Dans la nouvelle DB, les leçons s'appellent "chapters"
    const lessons = course?.chapters || course?.lessons || [];
    const [activeLesson, setActiveLesson] = useState(lessons.length > 0 ? lessons[0] : null);
    const [showSolutionFor, setShowSolutionFor] = useState(null);

    const handleFinishLesson = () => {
        if (activeLesson) {
            onLessonComplete(course._id || course.id, activeLesson._id || activeLesson.id || activeLesson.title);
        }
    };

    const isLessonCompleted = (id) => completedLessons && completedLessons.includes(id);
    const isAdmin = user?.role === 'admin';

    if (!course || lessons.length === 0) return (
        <div className="flex flex-col items-center justify-center p-12 text-white">
            <h2 className="text-xl">Ce cours ne contient pas encore de chapitres.</h2>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 rounded">Retour</button>
        </div>
    );

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
                    <h1 className="font-bold truncate">{course.title || course.name}</h1>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Programme</h3>
                        <div className="space-y-1">
                            {lessons.map((lesson, idx) => {
                                const lessonId = lesson._id || lesson.id || lesson.title;
                                return (
                                    <button
                                        key={lessonId || idx}
                                        onClick={() => {
                                            setActiveLesson(lesson);
                                            setShowSolutionFor(null);
                                        }}
                                        className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition ${activeLesson?.title === lesson.title ? 'bg-blue-600/20 text-blue-400 border border-blue-600/50' : 'hover:bg-gray-900 text-white/80'}`}
                                    >
                                        {isLessonCompleted(lessonId) ? (
                                            <CheckCircle size={16} className="text-green-500" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center">
                                                {idx + 1}
                                            </div>
                                        )}
                                        <span className="text-sm font-medium w-full truncate">{lesson.title}</span>
                                        <span className="text-xs ml-auto opacity-50 whitespace-nowrap">{lesson.duration}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Zone de contenu principal */}
            <div className="flex-1 flex flex-col min-w-0 bg-gray-900 relative">
                {/* Header du contenu */}
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900/50 backdrop-blur-sm z-10 shrink-0">
                    <h2 className="text-xl font-bold truncate">{activeLesson ? activeLesson.title : 'Sélectionnez une leçon'}</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-white/80 whitespace-nowrap">
                            Progression: {Math.round((completedLessons.length / lessons.length) * 100)}%
                        </div>
                    </div>
                </header>

                {/* Contenu défilable */}
                <main className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
                    {activeLesson ? (
                        <motion.div
                            key={activeLesson.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8 pb-20"
                        >
                            <div className="prose prose-invert max-w-none">
                                <h1 className="text-3xl font-black mb-4">{activeLesson.title}</h1>
                                <p className="lead text-xl text-blue-300 mb-8 border-l-4 border-blue-500 pl-4 py-1 bg-blue-900/10 rounded-r-lg">
                                    {activeLesson.description}
                                </p>

                                {/* Objectifs */}
                                {activeLesson.objectives && activeLesson.objectives.length > 0 && (
                                    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-8">
                                        <h3 className="flex items-center gap-2 text-white font-bold mb-4 mt-0">
                                            <Target size={20} className="text-purple-400" /> Objectifs de la leçon
                                        </h3>
                                        <ul className="list-disc pl-5 mt-0 space-y-2 text-slate-300">
                                            {activeLesson.objectives.map((obj, i) => (
                                                <li key={i}>{obj}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Vidéos ou Ressources */}
                                {activeLesson.resources && activeLesson.resources.length > 0 && (
                                    <div className="space-y-6 mb-8">
                                        {activeLesson.resources.filter(r => r.type === 'video').map((video, idx) => (
                                            <div key={idx} className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-black aspect-video relative">
                                                <iframe
                                                    src={video.url}
                                                    className="w-full h-full absolute inset-0"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title={video.title}
                                                ></iframe>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Contenu principal TEXT / HTML */}
                                <div className="text-slate-200 text-lg leading-relaxed space-y-4 mb-10 whitespace-pre-line bg-gray-800/30 p-8 rounded-3xl border border-gray-800">
                                    {activeLesson.content}
                                </div>

                                {/* Terminaux ou Sandbox injectés si présents en ressources code */}
                                {activeLesson.resources && activeLesson.resources.some(r => r.type === 'code') && (
                                    <div className="mb-10">
                                        <h3 className="flex items-center gap-2 font-bold mb-4 text-green-400">
                                            <Code size={20} /> Terminal Interactif
                                        </h3>
                                        {/* On simule un terminal pour l'interaction. Pour de vrai on lierait CourseTerminal */}
                                        <CourseTerminal lang={{ name: course.title, code: "Essaye tes lignes de codes ici..." }} theme="dark" onCompleteLesson={() => { }} />
                                    </div>
                                )}

                                {/* Exercices avec Solutions */}
                                {activeLesson.exercises && activeLesson.exercises.length > 0 && (
                                    <div className="space-y-6 mt-12 border-t border-gray-800 pt-8">
                                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                                            <CheckSquare size={28} className="text-green-500" />
                                            À vous de jouer !
                                        </h2>

                                        {activeLesson.exercises.map((exo, idx) => (
                                            <div key={idx} className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700 shadow-lg">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h4 className="font-bold text-xl text-white m-0">{exo.title}</h4>
                                                        <span className={`text-xs px-2 py-1 rounded inline-block mt-2 ${exo.difficulty === 'Facile' ? 'bg-green-500/20 text-green-400' : exo.difficulty === 'Moyen' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                                            Difficulté : {exo.difficulty}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-slate-300 mb-6">{exo.description}</p>

                                                {exo.hints && exo.hints.length > 0 && (
                                                    <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-xl mb-6">
                                                        <h5 className="flex items-center gap-2 text-blue-400 font-bold mb-2 m-0 text-sm">
                                                            <Lightbulb size={16} /> Indices
                                                        </h5>
                                                        <ul className="list-disc pl-5 m-0 text-sm text-blue-200">
                                                            {exo.hints.map((hint, hIdx) => <li key={hIdx}>{hint}</li>)}
                                                        </ul>
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => setShowSolutionFor(showSolutionFor === idx ? null : idx)}
                                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold transition"
                                                >
                                                    {showSolutionFor === idx ? 'Cacher la correction' : 'Voir la correction'}
                                                </button>

                                                <AnimatePresence>
                                                    {showSolutionFor === idx && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="mt-4 p-5 bg-black rounded-xl border border-green-500/30 font-mono text-sm text-green-400 whitespace-pre">
                                                                {exo.solution}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Zone de validation footer */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800 mt-12">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <button
                                        disabled={lessons.indexOf(activeLesson) === 0}
                                        onClick={() => {
                                            const currentIndex = lessons.indexOf(activeLesson);
                                            if (currentIndex > 0) {
                                                setActiveLesson(lessons[currentIndex - 1]);
                                                setShowSolutionFor(null);
                                            }
                                        }}
                                        className={`px-6 py-3 rounded-xl border border-gray-700 text-white/80 hover:text-white hover:border-gray-500 transition ${lessons.indexOf(activeLesson) === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <ChevronRight className="rotate-180 inline mr-2" size={16} />
                                        Précédent
                                    </button>
                                    <button
                                        onClick={() => {
                                            const currentIndex = lessons.indexOf(activeLesson);
                                            if (currentIndex < lessons.length - 1) {
                                                setActiveLesson(lessons[currentIndex + 1]);
                                                setShowSolutionFor(null);
                                            }
                                        }}
                                        disabled={lessons.indexOf(activeLesson) === lessons.length - 1}
                                        className={`px-6 py-3 bg-gray-800 rounded-xl border border-gray-700 text-white hover:bg-gray-700 transition ${lessons.indexOf(activeLesson) === lessons.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Suivant <ChevronRight className="inline ml-2" size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={handleFinishLesson}
                                    disabled={!isAdmin && isLessonCompleted(activeLesson._id || activeLesson.id || activeLesson.title)}
                                    className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition w-full sm:w-auto ${(isLessonCompleted(activeLesson._id || activeLesson.id || activeLesson.title) && !isAdmin)
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-default'
                                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
                                        }`}
                                >
                                    {(isLessonCompleted(activeLesson._id || activeLesson.id || activeLesson.title) && !isAdmin) ? (
                                        <>
                                            <Check size={20} /> Terminée
                                        </>
                                    ) : (
                                        <>
                                            {isAdmin && isLessonCompleted(activeLesson._id || activeLesson.id || activeLesson.title) ? 'Revalider' : 'Valider la leçon'} <ChevronRight size={20} />
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
