import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, AlertCircle, ArrowRight } from 'lucide-react';

const PlacementTestModal = ({ isOpen, onClose, course, onUnlock }) => {
    const [step, setStep] = useState('intro'); // 'intro', 'testing', 'failed', 'success'
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [testQuestions, setTestQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Reset state every time the modal opens
    useEffect(() => {
        if (isOpen) {
            setStep('intro');
            setCurrentQuestionIndex(0);
            setTestQuestions([]);
            setIsUnlocking(false);
        }
    }, [isOpen]);

    if (!isOpen || !course) return null;

    const getQuestionsForCourse = (courseObj) => {
        const courseNameStr = courseObj?.title || courseObj?.name || '';
        const isAvance = courseNameStr.includes('Avancé');

        const genericInter = [
            { question: "En C, que fait l'opérateur '&' appliqué devant une variable (&valeur) ?", options: ["Il multiplie la valeur par deux", "Il retourne l'adresse mémoire RAM de la variable", "Il libère la mémoire de la variable", "Il convertit la variable en chaîne de caractères"], answer: 1 },
            { question: "Quelle fonction de la bibliothèque standard <stdlib.h> permet de réserver de la mémoire sur le Tas (Heap) ?", options: ["printf()", "malloc()", "scanf()", "free()"], answer: 1 },
            { question: "Que se passe-t-il si vous allouez de la mémoire avec malloc() sans appeler free() à la fin ?", options: ["Une fuite mémoire (Memory Leak)", "Le processeur s'arrête immédiatement", "Le code se recompile automatiquement", "La variable devient globale"], answer: 0 }
        ];

        const genericAvance = [
            { question: "Si 'int *ptr' pointe sur un tableau d'entiers, à quoi équivaut la notation *(ptr + i) ?", options: ["ptr[i]", "&ptr[i]", "i * sizeof(ptr)", "ptr + i"], answer: 0 },
            { question: "Comment accède-t-on au membre 'age' d'une structure via un pointeur 'struct Etudiant *p' ?", options: ["p.age", "p->age", "*p.age", "p&age"], answer: 1 },
            { question: "Quel est le rôle du caractère '\0' dans une chaîne de caractères en C ?", options: ["Indiquer la fin de la chaîne en mémoire", "Afficher un espace dans la console", "Représenter le chiffre zéro", "Effacer le tampon de saisie"], answer: 0 }
        ];

        return isAvance ? genericAvance : genericInter;
    };

    const handleStart = (e) => {
        e.stopPropagation();
        const questions = getQuestionsForCourse(course);
        setTestQuestions(questions);
        setCurrentQuestionIndex(0);
        setStep('testing');
    };

    const handleAnswer = (selectedIndex) => {
        if (selectedIndex !== testQuestions[currentQuestionIndex].answer) {
            setStep('failed');
            return;
        }

        if (currentQuestionIndex < testQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setStep('success');
        }
    };

    const handleUnlock = async (e) => {
        e.stopPropagation();
        setIsUnlocking(true);
        await onUnlock(course);
        setIsUnlocking(false);
        setStep('intro');
        onClose();
    };

    return (
        <AnimatePresence>
            {/* Backdrop - closes modal when clicked */}
            <div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                onClick={onClose}
            >
                {/* Modal card - stops clicks from bubbling to backdrop */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-800/50">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Trophy className="text-amber-500" size={24} />
                            Test de Niveau
                        </h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 text-center min-h-[300px] flex flex-col justify-center">
                        {step === 'intro' && (
                            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="mb-6 inline-flex p-4 rounded-full bg-blue-500/10 text-blue-400">
                                    <AlertCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">Modalité d'Évaluation Rigoureuse</h3>
                                <p className="text-slate-400 text-sm mb-8">
                                    Prouve tes connaissances pour le cours <strong className="text-white">{course?.title || course?.name}</strong>. Une seule erreur aux questions techniques et l'accès te sera refusé.
                                </p>
                                <button
                                    onClick={handleStart}
                                    className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 group"
                                >
                                    Démarrer l'Examen <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        )}

                        {step === 'testing' && testQuestions.length > 0 && currentQuestionIndex < testQuestions.length && (
                            <motion.div key="testing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-left w-full">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Question {currentQuestionIndex + 1}/{testQuestions.length}</span>
                                    <div className="flex gap-1">
                                        {testQuestions.map((_, i) => (
                                            <div key={i} className={`h-1.5 w-6 rounded-full ${i === currentQuestionIndex ? 'bg-blue-500' : i < currentQuestionIndex ? 'bg-green-500' : 'bg-slate-700'}`} />
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">
                                    {testQuestions[currentQuestionIndex].question}
                                </h3>

                                <div className="space-y-3">
                                    {testQuestions[currentQuestionIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => { e.stopPropagation(); handleAnswer(idx); }}
                                            className="w-full p-4 text-left border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-800 transition-colors text-slate-300 font-medium"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'failed' && (
                            <motion.div key="failed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="mb-6 inline-flex p-4 rounded-full bg-red-500/10 text-red-500">
                                    <X size={48} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">Test Échoué</h3>
                                <p className="text-slate-400 text-sm mb-8">
                                    Tes connaissances analytiques ne sont pas encore suffisantes pour ce niveau. Reprends la formation classique.
                                </p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                                    className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all"
                                >
                                    Fermer et étudier
                                </button>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="mb-6 inline-flex p-4 rounded-full bg-green-500/10 text-green-400">
                                    <Trophy size={48} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">Certification Validée 🎉</h3>
                                <p className="text-slate-400 text-sm mb-8">
                                    Excellente maîtrise technique démontrée. Le badge et le niveau sont maintenant débloqués.
                                </p>
                                <button
                                    onClick={handleUnlock}
                                    disabled={isUnlocking}
                                    className={`w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 ${isUnlocking ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isUnlocking ? 'Déblocage...' : 'Accéder au cours'}
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PlacementTestModal;
