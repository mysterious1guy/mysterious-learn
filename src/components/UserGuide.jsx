import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Zap, Map, ChevronRight, ChevronLeft, X, Sparkles, Target, Compass } from 'lucide-react';

const UserGuide = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Bienvenue, Aventurier !",
            content: "Le Mysterious Classroom n'est pas un simple site, c'est ton futur quartier général de développeur. Ici, on apprend par la pratique et la rigueur.",
            icon: <Compass className="text-blue-500" size={48} />,
            color: "from-blue-600 to-indigo-600"
        },
        {
            title: "L'Orientation Secrète",
            content: "Le cours d'Orientation est MANDATOIRE. Il t'explique comment s'imbriquent les briques de l'informatique avant que tu ne poses ta première ligne de code.",
            icon: <Map className="text-amber-500" size={48} />,
            color: "from-amber-600 to-orange-600"
        },
        {
            title: "XP & Progression",
            content: "Chaque chapitre terminé et chaque projet validé te rapporte des XP. Atteindre le niveau Expert débloque ton certificat d'ingénieur Mysterious.",
            icon: <Trophy className="text-yellow-500" size={48} />,
            color: "from-yellow-600 to-amber-600"
        },
        {
            title: "La Règle des 5 Blocs",
            content: "Tous nos cours suivent la même séquence : Introduction, Concept, Exemple, Pratique et Exercice. C'est la méthode Mysterious pour une mémorisation totale.",
            icon: <Target className="text-red-500" size={48} />,
            color: "from-red-600 to-pink-600"
        },
        {
            title: "Projets & Real-World",
            content: "Ne te contente pas de lire. Lance-toi dans les Projets de fin de module pour prouver que tu maîtrises le concept. C'est là que ton XP explose !",
            icon: <Zap className="text-purple-500" size={48} />,
            color: "from-purple-600 to-violet-600"
        }
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ scale: 0.9, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 50, opacity: 0 }}
                    className="relative w-full max-w-2xl bg-[#0d1117] rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]"
                >
                    {/* Header Gradient */}
                    <div className={`h-2 bg-gradient-to-r ${steps[step].color} transition-all duration-500`} style={{ width: `${((step + 1) / steps.length) * 100}%` }} />

                    <div className="p-8 md:p-12 space-y-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Sparkles className="text-blue-400 animate-pulse" size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Guide de l'Ingénieur</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <motion.div
                                key={step}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="p-6 bg-white/5 rounded-3xl"
                            >
                                {steps[step].icon}
                            </motion.div>

                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter italic">
                                    {steps[step].title}
                                </h3>
                                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                                    {steps[step].content}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-8">
                            <button
                                onClick={() => setStep(s => Math.max(0, s - 1))}
                                disabled={step === 0}
                                className={`flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all ${step === 0 ? 'text-gray-700 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <ChevronLeft size={20} /> Précédent
                            </button>

                            <div className="flex gap-2">
                                {steps.map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-blue-500 w-6' : 'bg-gray-700'}`} />
                                ))}
                            </div>

                            {step < steps.length - 1 ? (
                                <button
                                    onClick={() => setStep(s => s + 1)}
                                    className="flex items-center gap-2 font-black text-blue-400 px-6 py-3 bg-blue-500/10 rounded-2xl hover:bg-blue-500/20 transition-all border border-blue-500/20"
                                >
                                    Suivant <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={onClose}
                                    className="flex items-center gap-2 font-black text-white px-8 py-3 bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                                >
                                    C'est clair ! <Zap size={20} fill="currentColor" />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default UserGuide;
