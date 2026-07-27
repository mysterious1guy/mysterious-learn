import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Zap, Map, ChevronRight, ChevronLeft, X, Sparkles, Target, Compass } from 'lucide-react';

const UserGuide = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Bienvenue, Aventurier !",
            content: "Le Mysterious Classroom n'est pas un simple site, c'est ton futur quartier général de développeur. Ici, on apprend par la pratique et la rigueur.",
            icon: <Compass className="text-blue-500" size={40} />,
            color: "from-blue-600 to-indigo-600"
        },
        {
            title: "L'Orientation Secrète",
            content: "Le cours d'Orientation est MANDATOIRE. Il t'explique comment s'imbriquent les briques de l'informatique avant que tu ne poses ta première ligne de code.",
            icon: <Map className="text-amber-500" size={40} />,
            color: "from-amber-600 to-orange-600"
        },
        {
            title: "XP & Progression",
            content: "Chaque chapitre terminé et chaque projet validé te rapporte des XP. Atteindre le niveau Expert débloque ton certificat d'ingénieur Mysterious.",
            icon: <Trophy className="text-yellow-500" size={40} />,
            color: "from-yellow-600 to-amber-600"
        },
        {
            title: "La Règle des 5 Blocs",
            content: "Tous nos cours suivent la même séquence : Introduction, Concept, Exemple, Pratique et Exercice. C'est la méthode Mysterious pour une mémorisation totale.",
            icon: <Target className="text-red-500" size={40} />,
            color: "from-red-600 to-pink-600"
        },
        {
            title: "Projets & Real-World",
            content: "Ne te contente pas de lire. Lance-toi dans les Projets de fin de module pour prouver que tu maîtrises le concept. C'est là que ton XP explose !",
            icon: <Zap className="text-purple-500" size={40} />,
            color: "from-purple-600 to-violet-600"
        }
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {/* Overlay plein écran */}
            <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                />

                {/* Modal — bottom sheet sur mobile, centré sur desktop */}
                <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full sm:max-w-2xl bg-[#0d1117] sm:rounded-[3rem] rounded-t-[2.5rem] border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] max-h-[92vh] flex flex-col"
                >
                    {/* Indicateur de drag mobile */}
                    <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
                        <div className="w-10 h-1 bg-white/20 rounded-full" />
                    </div>

                    {/* Barre de progression */}
                    <div className="h-1.5 bg-white/5 mx-4 sm:mx-0 rounded-full sm:rounded-none overflow-hidden shrink-0">
                        <motion.div
                            className={`h-full bg-gradient-to-r ${steps[step].color} rounded-full sm:rounded-none`}
                            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>

                    {/* Corps scrollable */}
                    <div className="overflow-y-auto flex-1">
                        <div className="p-5 sm:p-10 space-y-5 sm:space-y-8">
                            {/* Entête */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="text-blue-400 animate-pulse" size={16} />
                                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500">
                                        Guide de l'Ingénieur
                                    </span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Contenu de l'étape */}
                            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
                                <motion.div
                                    key={step}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-4 sm:p-6 bg-white/5 rounded-2xl sm:rounded-3xl"
                                >
                                    {steps[step].icon}
                                </motion.div>

                                <div className="space-y-3">
                                    <motion.h3
                                        key={`title-${step}`}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-2xl sm:text-4xl font-black text-white tracking-tighter italic leading-tight"
                                    >
                                        {steps[step].title}
                                    </motion.h3>
                                    <motion.p
                                        key={`content-${step}`}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.05 }}
                                        className="text-gray-400 text-sm sm:text-xl leading-relaxed max-w-lg mx-auto"
                                    >
                                        {steps[step].content}
                                    </motion.p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between items-center pt-2 sm:pt-6 gap-2">
                                <button
                                    onClick={() => setStep(s => Math.max(0, s - 1))}
                                    disabled={step === 0}
                                    className={`flex items-center gap-1 sm:gap-2 font-bold px-3 sm:px-4 py-2 rounded-xl transition-all text-sm sm:text-base ${
                                        step === 0 ? 'text-gray-700 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <ChevronLeft size={18} /> Précédent
                                </button>

                                {/* Points de navigation cliquables */}
                                <div className="flex gap-1.5 sm:gap-2">
                                    {steps.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setStep(i)}
                                            className={`h-2 rounded-full transition-all ${
                                                i === step ? 'bg-blue-500 w-5 sm:w-6' : 'bg-gray-700 w-2'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {step < steps.length - 1 ? (
                                    <button
                                        onClick={() => setStep(s => s + 1)}
                                        className="flex items-center gap-1 sm:gap-2 font-black text-blue-400 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-500/10 rounded-xl sm:rounded-2xl hover:bg-blue-500/20 transition-all border border-blue-500/20 text-sm sm:text-base"
                                    >
                                        Suivant <ChevronRight size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={onClose}
                                        className="flex items-center gap-1 sm:gap-2 font-black text-white px-5 sm:px-8 py-2.5 sm:py-3 bg-blue-600 rounded-xl sm:rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm sm:text-base"
                                    >
                                        C'est clair ! <Zap size={18} fill="currentColor" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default UserGuide;
