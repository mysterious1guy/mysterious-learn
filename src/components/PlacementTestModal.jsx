import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, AlertCircle, ArrowRight } from 'lucide-react';

const PlacementTestModal = ({ isOpen, onClose, course, onUnlock }) => {
    const [step, setStep] = useState('intro'); // 'intro', 'testing', 'failed', 'success'
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [testQuestions, setTestQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    if (!isOpen || !course) return null;

    const getQuestionsForCourse = (courseObj) => {
        const courseNameStr = courseObj?.title || courseObj?.name || '';
        const isAvance = courseNameStr.includes('Avancé');

        const genericInter = [
            { question: "Quelle est la complexité temporelle moyenne d'un algorithme de tri rapide (QuickSort) ?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1 },
            { question: "Que signifie le concept d'encapsulation en programmation orientée objet ?", options: ["Rendre le code plus rapide à l'exécution", "Cacher les détails d'implémentation et restreindre l'accès", "Permettre à une classe d'avoir plusieurs parents", "Déployer le code sur un registre"], answer: 1 },
            { question: "Parmi ces structures de données, laquelle fonctionne sur le principe LIFO (Last In, First Out) ?", options: ["File (Queue)", "Liste chaînée", "Pile (Stack)", "Arbre binaire de recherche"], answer: 2 }
        ];

        const genericAvance = [
            { question: "Quel est le problème principal lié à l'utilisation répétée de références croisées ou circulaires dans les langages utilisant le comptage de références ?", options: ["La surcharge du cache CPU", "L'impossibilité absolue de compiler", "Les fuites de mémoire (Memory Leaks)", "La corruption du disque (Disk Swap)"], answer: 2 },
            { question: "Dans le contexte des bases de données de production, que garantit la propriété 'Atomicité' (dans le théorème ACID) ?", options: ["Les données sont chiffrées de bout en bout", "Une transaction s'exécute entièrement ou pas du tout", "Les temps de réponse sont prédictifs", "Les données sont répliquées en temps réel"], answer: 1 },
            { question: "Quelle structure de données est mathématiquement la plus optimale pour implémenter un dictionnaire (clé-valeur) avec un accès en temps constant O(1) en moyenne ?", options: ["Arbre binaire de recherche équilibré", "Table de hachage (Hash Table)", "Liste doublement chaînée", "Graphe orienté acyclique"], answer: 1 }
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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            >
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
                        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-slate-400 hover:text-white transition-colors">
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
            </motion.div>
        </AnimatePresence>
    );
};

export default PlacementTestModal;
