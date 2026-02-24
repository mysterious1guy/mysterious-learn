import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, Map, Database, Trophy, BrainCircuit } from 'lucide-react';

const OnboardingTour = ({ user, onFinish, onSkip }) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Bienvenue dans l'Obscurité",
            description: "Mysterious Classroom n'est pas une école ordinaire. C'est un sanctuaire pour ceux qui veulent maîtriser les fondations réelles de l'informatique.",
            icon: <Sparkles className="text-blue-400 w-12 h-12" />,
            color: "from-blue-600 to-purple-600"
        },
        {
            title: "La Carte du Savoir",
            description: "Chaque cours est une 'Node' sur une carte interactive. Pour débloquer les niveaux Intermédiaires et Avancés, tu devras prouver ta maîtrise des bases.",
            icon: <Map className="text-emerald-400 w-12 h-12" />,
            color: "from-emerald-600 to-teal-600"
        },
        {
            title: "Le Poids de l'XP",
            description: "Ta progression est mesurée en XP. Valide des mini-projets concrets pour gagner des points et grimper dans le classement mondial.",
            icon: <Trophy className="text-yellow-400 w-12 h-12" />,
            color: "from-yellow-600 to-orange-600"
        },
        {
            title: "Intelligence Intégrée",
            description: "Sur ta droite, l'IA 'Murmure Omniprésent' t'observe. Elle te donnera des conseils contextuels basés sur ton niveau et tes hésitations.",
            icon: <BrainCircuit className="text-pink-400 w-12 h-12" />,
            color: "from-pink-600 to-rose-600"
        }
    ];

    const currentStep = steps[step];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onFinish();
        }
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                onClick={onSkip}
            />

            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="relative w-full max-w-xl bg-slate-900 border border-blue-500/30 rounded-[3rem] shadow-[0_0_100px_rgba(59,130,246,0.2)] overflow-hidden"
            >
                {/* Header with Progress dots */}
                <div className="p-8 flex justify-between items-center border-b border-white/5 bg-slate-900/50">
                    <div className="flex gap-2">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700'}`}
                            />
                        ))}
                    </div>
                    <button onClick={onSkip} className="text-slate-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-10 text-center">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col items-center"
                    >
                        <div className={`p-6 rounded-3xl bg-gradient-to-br ${currentStep.color} bg-opacity-10 mb-8 ring-1 ring-white/10 shadow-lg shadow-black/20`}>
                            {currentStep.icon}
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">{currentStep.title}</h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                            {currentStep.description}
                        </p>
                    </motion.div>
                </div>

                {/* Actions */}
                <div className="p-8 flex items-center justify-between border-t border-white/5 bg-slate-900/50">
                    <button
                        onClick={handlePrev}
                        disabled={step === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <ChevronLeft size={20} />
                        RETOUR
                    </button>

                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 transform hover:-translate-y-1 transition-all active:scale-95"
                    >
                        {step === steps.length - 1 ? 'COMMENCER' : 'SUIVANT'}
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Decorative glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/5 blur-[120px] pointer-events-none" />
            </motion.div>
        </div>
    );
};

export default OnboardingTour;
