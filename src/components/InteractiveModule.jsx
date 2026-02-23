import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Play, ChevronRight, Terminal } from 'lucide-react';
import TerminalWindow from './TerminalWindow';
import CodeEditor from './CodeEditor';

const InteractiveModule = ({ moduleData, onComplete }) => {
    const [completed, setCompleted] = useState(false);

    // --- RENDU TEXTE ---
    if (moduleData.type === 'text') {
        return (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Terminal className="text-blue-500" size={24} />
                    {moduleData.title}
                </h3>

                <TerminalWindow title="Théorie et Concepts">
                    <div
                        className="prose prose-slate max-w-none text-slate-300 leading-relaxed font-mono text-sm"
                        dangerouslySetInnerHTML={{ __html: moduleData.content.replace(/\n/g, '<br/>') }}
                    />
                </TerminalWindow>

                {!completed ? (
                    <button
                        onClick={() => { setCompleted(true); onComplete(); }}
                        className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition flex items-center gap-2"
                    >
                        J'ai compris, suivant <ChevronRight size={18} />
                    </button>
                ) : (
                    <div className="mt-8 flex items-center gap-2 text-green-400 font-medium">
                        <CheckCircle size={20} /> Lu et validé
                    </div>
                )}
            </div>
        );
    }

    // --- RENDU QUIZ ---
    if (moduleData.type === 'quiz') {
        const [selectedOption, setSelectedOption] = useState(null);
        const [showCorrection, setShowCorrection] = useState(false);

        const handleSelect = (index) => {
            if (showCorrection) return;
            setSelectedOption(index);
        };

        const handleValidate = () => {
            if (selectedOption === null) return;
            setShowCorrection(true);
            if (selectedOption === moduleData.answerIndex) {
                setCompleted(true);
                setTimeout(() => onComplete(), 1500); // give time to read explanation
            } else {
                // Notifier l'IA d'une erreur
                window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                    detail: { text: "Hmm... Es-tu sûr de cette réponse ? Relis bien nos exemples précédents !" }
                }));
            }
        };

        return (
            <div className="space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">?</span>
                    {moduleData.title}
                </h3>
                <p className="text-lg text-slate-300">{moduleData.question}</p>

                <div className="space-y-3 mt-6">
                    {moduleData.options.map((option, index) => {
                        let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-300 ";
                        if (!showCorrection) {
                            btnClass += selectedOption === index
                                ? "bg-blue-600/20 border-blue-500 text-white"
                                : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800";
                        } else {
                            if (index === moduleData.answerIndex) {
                                btnClass += "bg-green-600/20 border-green-500 text-white"; // Correct answer
                            } else if (index === selectedOption) {
                                btnClass += "bg-red-600/20 border-red-500 text-slate-300"; // Wrong selected
                            } else {
                                btnClass += "bg-slate-950 border-slate-800 opacity-50"; // Others
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleSelect(index)}
                                className={btnClass}
                                disabled={showCorrection}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {!showCorrection ? (
                    <button
                        onClick={handleValidate}
                        disabled={selectedOption === null}
                        className="mt-6 w-full py-3 bg-blue-600 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-500 text-white font-medium rounded-xl transition"
                    >
                        Valider ma réponse
                    </button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-4 rounded-xl border ${selectedOption === moduleData.answerIndex ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}
                    >
                        <div className="flex items-start gap-3">
                            {selectedOption === moduleData.answerIndex ? (
                                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            )}
                            <div>
                                <p className={`font-medium ${selectedOption === moduleData.answerIndex ? 'text-green-400' : 'text-red-400'}`}>
                                    {selectedOption === moduleData.answerIndex ? 'Bonne réponse !' : 'Oups...'}
                                </p>
                                <p className="text-slate-300 text-sm mt-1">{moduleData.explanation}</p>

                                {selectedOption !== moduleData.answerIndex && (
                                    <button onClick={() => { setShowCorrection(false); setSelectedOption(null); }} className="mt-3 text-sm text-blue-400 hover:underline">
                                        Réessayer
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        );
    }

    // --- RENDU CODE ---
    if (moduleData.type === 'code') {
        const [testsPassed, setTestsPassed] = useState(false);

        const handleRunSuccess = (codeSource, output) => {
            setTestsPassed(true);
            setCompleted(true);
            setTimeout(() => onComplete(), 2000);
        };

        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono text-sm">&lt;&gt;</span>
                        {moduleData.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{moduleData.description}</p>
                </div>

                {/* Integration of the new CodeEditor with Piston API */}
                <CodeEditor
                    initialCode={moduleData.initialCode}
                    language={moduleData.language || 'javascript'}
                    expectedRegex={moduleData.testRegex}
                    onRunSuccess={handleRunSuccess}
                    disabled={testsPassed}
                />
            </div>
        );
    }

    return <div>Type de module non supporté.</div>;
};

export default InteractiveModule;
