import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, AlertCircle, ArrowRight, X, BrainCircuit, ShieldCheck, ShieldAlert } from 'lucide-react';

const GlobalPlacementTest = ({ level, onPass, onFail }) => {
    const [step, setStep] = useState('intro'); // 'intro', 'testing', 'failed', 'success'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const questions = {
        'Intermédiaire': [
            {
                question: "Quelle est la différence fondamentale entre 'let' et 'var' en JavaScript moderne ?",
                options: [
                    "Var est pour les nombres, Let pour les textes",
                    "Let a une portée de bloc {}, Var a une portée de fonction",
                    "Let est plus lent que Var",
                    "Var est obligatoire pour utiliser Google"
                ],
                answer: 1
            },
            {
                question: "Que permet de définir la propriété CSS 'display: flex' ?",
                options: [
                    "Une animation fluide",
                    "Un système de mise en page unidimensionnel",
                    "Le changement de police de caractères",
                    "La couleur de fond adaptative"
                ],
                answer: 1
            },
            {
                question: "Quelle commande Git permet d'envoyer vos commits vers un serveur distant ?",
                options: ["git pull", "git pull --force", "git push", "git commit -m"],
                answer: 2
            },
            {
                question: "En algorithmique, que signifie '!(true && false)' ?",
                options: ["true", "false", "undefined", "error"],
                answer: 0
            },
            {
                question: "Quel protocole est utilisé pour naviguer de manière sécurisée sur le web ?",
                options: ["FTP", "HTTP", "HTTPS", "SMTP"],
                answer: 2
            }
        ],
        'Avancé': [
            {
                question: "Dans React, quel hook est principalement utilisé pour gérer les effets de bord (lifecycle) ?",
                options: ["useState", "useContext", "useEffect", "useReducer"],
                answer: 2
            },
            {
                question: "Qu'est-ce qu'une 'Closure' en JavaScript ?",
                options: [
                    "La fermeture d'une fenêtre de navigateur",
                    "Une fonction liée à son environnement lexical",
                    "Un fichier JSON compressé",
                    "La fin d'une boucle 'for'"
                ],
                answer: 1
            },
            {
                question: "Quelle est la complexité temporelle d'une recherche binaire dans un tableau trié ?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                answer: 2
            },
            {
                question: "Laquelle de ces bases de données est de type NoSQL (orientée documents) ?",
                options: ["MySQL", "PostgreSQL", "Oracle DB", "MongoDB"],
                answer: 3
            },
            {
                question: "Que retourne 'typeof null' en JavaScript ?",
                options: ["'null'", "'undefined'", "'object'", "'number'"],
                answer: 2
            }
        ]
    };

    const activeQuestions = questions[level] || [];

    const handleAnswer = (idx) => {
        if (idx !== activeQuestions[currentQuestionIndex].answer) {
            setStep('failed');
            return;
        }

        if (currentQuestionIndex < activeQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setStep('success');
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
            >
                <div className="p-10 text-center">
                    <AnimatePresence mode="wait">
                        {step === 'intro' && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
                                    <BrainCircuit size={48} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">Évaluation de Niveau</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                                    Tu as choisi le niveau <span className="text-blue-500 font-bold">{level}</span>. <br />
                                    Prouve tes compétences via ce test technique rapide. Une seule erreur et tu devras commencer en tant que Débutant.
                                </p>
                                <button
                                    onClick={() => setStep('testing')}
                                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1 flex items-center justify-center gap-3"
                                >
                                    Démarrer l'Examen <ArrowRight size={20} />
                                </button>
                                <button
                                    onClick={onFail}
                                    className="mt-6 text-sm font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                                >
                                    Finalement, je préfère le niveau Débutant
                                </button>
                            </motion.div>
                        )}

                        {step === 'testing' && (
                            <motion.div
                                key="testing"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-left"
                            >
                                <div className="flex justify-between items-center mb-10">
                                    <span className="px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-xs font-black uppercase tracking-widest">
                                        Question {currentQuestionIndex + 1} / {activeQuestions.length}
                                    </span>
                                    <div className="flex gap-2">
                                        {activeQuestions.map((_, i) => (
                                            <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i === currentQuestionIndex ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : i < currentQuestionIndex ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                                        ))}
                                    </div>
                                </div>

                                <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tight">
                                    {activeQuestions[currentQuestionIndex].question}
                                </h4>

                                <div className="grid grid-cols-1 gap-4">
                                    {activeQuestions[currentQuestionIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className="p-5 text-left bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 transition-all group"
                                        >
                                            <span className="text-slate-700 dark:text-slate-300 font-bold group-hover:text-blue-500 transition-colors">
                                                {option}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 'failed' && (
                            <motion.div
                                key="failed"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="mx-auto w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                                    <ShieldAlert size={48} className="text-red-500" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">Accès Refusé</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                                    Tes connaissances actuelles ne semblent pas correspondre au niveau <span className="font-bold text-red-500">{level}</span>. <br />
                                    Il est préférable de commencer par les bases.
                                </p>
                                <button
                                    onClick={onFail}
                                    className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg hover:opacity-90"
                                >
                                    Commencer en tant que Débutant
                                </button>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
                                    <ShieldCheck size={48} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">Niveau Validé 🎉</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                                    Tu as brillamment réussi l'examen technique. <br />
                                    Le niveau <span className="text-emerald-500 font-bold">{level}</span> t'est désormais ouvert.
                                </p>
                                <button
                                    onClick={onPass}
                                    className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-1"
                                >
                                    Finaliser l'Inscription
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default GlobalPlacementTest;
