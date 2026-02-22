import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, AlertCircle, ArrowRight } from 'lucide-react';

const PlacementTestModal = ({ isOpen, onClose, course, onUnlock }) => {
    const [step, setStep] = useState('intro'); // 'intro', 'testing', 'success'
    const [isUnlocking, setIsUnlocking] = useState(false);

    if (!isOpen || !course) return null;

    const handleStart = (e) => {
        e.stopPropagation();
        setStep('testing');
        // Simulate a quick test wait before success (in future, real questions would go here)
        setTimeout(() => {
            setStep('success');
        }, 2000);
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
                                <h3 className="text-2xl font-black text-white mb-2">Connais-tu déjà les bases ?</h3>
                                <p className="text-slate-400 text-sm mb-8">
                                    Prouve tes connaissances pour le cours <strong className="text-white">{course.name}</strong> et débloque ce niveau instantanément.
                                </p>
                                <button
                                    onClick={handleStart}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group"
                                >
                                    Passer le test <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        )}

                        {step === 'testing' && (
                            <motion.div key="testing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-white mb-2">Analyse de tes compétences...</h3>
                                <p className="text-slate-400 text-sm">Prépare-toi à répondre aux questions.</p>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="mb-6 inline-flex p-4 rounded-full bg-green-500/10 text-green-400">
                                    <Trophy size={48} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">Test Réussi ! 🎉</h3>
                                <p className="text-slate-400 text-sm mb-8">
                                    Tu as prouvé que tu maîtrises les pré-requis. Le niveau est maintenant débloqué.
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
