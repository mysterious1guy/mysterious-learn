import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, Terminal, Box, Cpu } from 'lucide-react';

const LogicVisualizer = ({ codeStr, steps, initialState }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Derived state from the current step
    const currentState = steps[currentStep]?.state || initialState || {};
    const activeLine = steps[currentStep]?.line || null;
    const currentExplanation = steps[currentStep]?.explanation || '';

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsPlaying(false);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
    };

    React.useEffect(() => {
        let timer;
        if (isPlaying && currentStep < steps.length - 1) {
            timer = setTimeout(() => {
                handleNext();
            }, 1500); // 1.5 seconds per step
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentStep, steps.length]);

    return (
        <div className="bg-slate-900 border border-blue-500/30 rounded-3xl overflow-hidden shadow-2xl my-8 font-mono">
            {/* Header */}
            <div className="bg-slate-950 p-4 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Cpu size={20} className="text-blue-400" />
                    <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Simulateur Logique</span>
                </div>
                {/* Controls */}
                <div className="flex gap-2">
                    <button
                        onClick={handleReset}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Réinitialiser"
                    >
                        <RotateCcw size={16} />
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`p-2 rounded-lg transition-colors ${isPlaying ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'}`}
                        title={isPlaying ? "Pause" : "Lecture Automatique"}
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentStep >= steps.length - 1 || isPlaying}
                        className="p-2 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Étape Suivante"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row h-auto md:h-80">
                {/* Code Window */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-white/10 p-4 overflow-y-auto bg-slate-900/50">
                    <pre className="text-sm">
                        {codeStr.split('\n').map((line, idx) => {
                            const isLineActive = activeLine === idx + 1;
                            return (
                                <div key={idx} className={`px-2 py-0.5 rounded transition-colors duration-300 ${isLineActive ? 'bg-blue-500/20 text-blue-300 border-l-2 border-blue-500' : 'text-slate-400 border-l-2 border-transparent'}`}>
                                    <span className="inline-block w-6 text-slate-600 select-none">{idx + 1}</span>
                                    {line}
                                </div>
                            );
                        })}
                    </pre>
                </div>

                {/* State Window */}
                <div className="w-full md:w-64 bg-slate-900 flex flex-col p-4 flex-shrink-0">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Box size={14} /> Mémoire (Variables)
                    </h4>
                    <div className="flex-1 space-y-3">
                        <AnimatePresence mode="popLayout">
                            {Object.entries(currentState).map(([key, value]) => (
                                <motion.div
                                    key={key}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 flex justify-between items-center"
                                >
                                    <span className="text-pink-400 font-bold">{key}</span>
                                    <span className="text-green-400 font-bold bg-slate-950 px-2 py-1 rounded-md border border-slate-800">
                                        {typeof value === 'boolean' ? (value ? 'VRAI' : 'FAUX') : value}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {Object.keys(currentState).length === 0 && (
                            <p className="text-slate-600 text-xs italic text-center mt-4">Mémoire vide</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Explanation Bar */}
            <div className="bg-blue-950/50 p-4 border-t border-blue-500/20 flex items-start gap-4">
                <Terminal size={20} className="text-blue-400 shrink-0 mt-0.5" />
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentStep}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-blue-200 text-sm"
                    >
                        {currentExplanation || "Appuyez sur 'Lecture' ou 'Suivant' pour démarrer."}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-slate-900">
                <motion.div
                    className="h-full bg-blue-500"
                    animate={{ width: `${(currentStep / (steps.length === 0 ? 1 : steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
};

export default LogicVisualizer;
