import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

// Piston API configuration
const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

// Mapping languages to Piston runtimes
const LANGUAGE_MAP = {
    javascript: { language: 'javascript', version: '18.15.0' },
    python: { language: 'python', version: '3.10.0' },
    cpp: { language: 'c++', version: '10.2.0' },
    c: { language: 'c', version: '10.2.0' },
    bash: { language: 'bash', version: '5.2.0' },
    php: { language: 'php', version: '8.2.3' },
};

const CodeEditor = ({ initialCode, language, expectedRegex, onRunSuccess, disabled }) => {
    const [code, setCode] = useState(initialCode || '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState(null);
    const [testPassed, setTestPassed] = useState(false);

    const monacoLanguage = language === 'c' || language === 'cpp' ? 'cpp' : language;

    const executeCode = async () => {
        setIsRunning(true);
        setError(null);
        setOutput('');
        setTestPassed(false);

        const runtime = LANGUAGE_MAP[language?.toLowerCase()] || LANGUAGE_MAP['javascript'];

        // Fallback pour le frontend (HTML/CSS) ou si Piston n'est pas adapté
        if (!LANGUAGE_MAP[language?.toLowerCase()]) {
            try {
                // Pour le code purement frontend, on se rabat sur la regex (comme avant)
                const regex = new RegExp(expectedRegex);
                if (regex.test(code)) {
                    setTestPassed(true);
                    setOutput("✓ Code validé localement.");
                    onRunSuccess(code, "✓ Code validé localement.");
                } else {
                    setError("Le code ne correspond pas au résultat attendu. Essaie encore !");
                    window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                        detail: { text: "Ton code ne compile pas ou ne contient pas ce qui est attendu. Vérifie ta syntaxe !" }
                    }));
                }
            } catch (e) {
                setError("Erreur dans l'évaluation du code.");
            }
            setIsRunning(false);
            return;
        }

        try {
            const response = await fetch(PISTON_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: runtime.language,
                    version: runtime.version,
                    files: [{ content: code }]
                })
            });

            if (!response.ok) throw new Error("Erreur de l'API d'exécution");

            const data = await response.json();
            const executionOutput = data.run ? `${data.run.stdout}${data.run.stderr}` : data.message || "Erreur interne.";

            setOutput(executionOutput);

            if (data.run && data.run.code !== 0) {
                setError(`Le code a retourné une erreur (Code ${data.run.code}).`);
                window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                    detail: { text: "Ton code a retourné une erreur lors de l'exécution. Lis le terminal pour comprendre pourquoi." }
                }));
                setIsRunning(false);
                return;
            }

            // Vérifier la regex attendue sur le code source OU sur le résultat
            // Ici on vérifie le code source comme dans l'ancienne logique pour s'assurer des bonnes pratiques
            const regex = new RegExp(expectedRegex);
            if (regex.test(code) || regex.test(executionOutput)) {
                setTestPassed(true);
                onRunSuccess(code, executionOutput);
            } else {
                setError("Le code compile, mais il ne résout pas la consigne demandée. Vérifie ce que tu as écrit.");
                window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                    detail: { text: "Le code s'exécute bien, mais le rendu ne correspond pas exactement à l'exercice. As-tu oublié quelque chose ?" }
                }));
            }

        } catch (err) {
            console.error(err);
            setError("Impossible de contacter le serveur d'exécution lointain. Réessaie plus tard.");
            window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                detail: { text: "Le terminal d'exécution semble déconnecté." }
            }));
        } finally {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        setCode(initialCode);
        setOutput('');
        setError(null);
        setTestPassed(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl bg-[#1e1e1e]">
                {/* Header Barre de l'éditeur */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-slate-800">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">{monacoLanguage}</span>
                    <button onClick={handleReset} disabled={disabled || isRunning} className="text-slate-400 hover:text-white transition">
                        <RefreshCw size={14} />
                    </button>
                </div>

                {/* Le Monaco Editor */}
                <div className="h-[300px] w-full relative">
                    <Editor
                        height="100%"
                        language={monacoLanguage}
                        theme="vs-dark"
                        value={code}
                        onChange={(val) => setCode(val)}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            roundedSelection: false,
                            padding: { top: 16 },
                            readOnly: disabled || testPassed,
                            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                        }}
                        loading={
                            <div className="flex items-center justify-center h-full text-blue-500">
                                <Loader2 className="animate-spin mr-2" /> Initialisation du moteur IDE...
                            </div>
                        }
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button
                    onClick={executeCode}
                    disabled={disabled || isRunning || testPassed || code.trim() === ''}
                    className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-blue-500 text-white font-medium rounded-xl transition flex items-center justify-center gap-2"
                >
                    {isRunning ? <Loader2 className="animate-spin w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isRunning ? "Compilation..." : "Exécuter le code"}
                </button>
            </div>

            {/* Terminal de Sortie */}
            {(output || error) && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-xl border border-slate-800 bg-[#0d1117] overflow-hidden"
                >
                    <div className="bg-[#161b22] px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        Terminal Output
                    </div>
                    <div className="p-4 font-mono text-sm overflow-x-auto">
                        {output && (
                            <pre className="text-slate-300 whitespace-pre-wrap">{output}</pre>
                        )}
                        {error && (
                            <div className="mt-2 text-red-400 flex items-start gap-2">
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {testPassed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-green-400 font-medium">Tests réussis ! Code validé avec succès.</span>
                </motion.div>
            )}
        </div>
    );
};

export default CodeEditor;
