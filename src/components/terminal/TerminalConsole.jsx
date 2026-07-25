import React from 'react';
import { RefreshCw } from 'lucide-react';

const TerminalConsole = ({
    outputContainerRef,
    inputRef,
    history,
    executingCmd,
    handleCommand,
    pendingAuth,
    sshSession,
    activeUser,
    formattedPath,
    input,
    setInput
}) => {
    return (
        <div
            ref={outputContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-6 text-xs sm:text-sm md:text-base h-[680px] lg:h-[760px] overflow-y-auto custom-scrollbar cursor-text space-y-2 leading-relaxed text-slate-200"
            style={{ backgroundColor: '#06141d' }}
        >
            {/* Historique des lignes de commande */}
            {history.map((h, i) => (
                <div key={i} className="whitespace-pre-wrap">
                    {h.type === 'user' ? (
                        <div className="flex items-center gap-2 py-0.5 font-bold text-slate-100 font-mono">
                            {h.text}
                        </div>
                    ) : h.type === 'success' ? (
                        <div className="text-emerald-400 font-bold py-1 bg-emerald-950 px-3 rounded-lg border border-emerald-500 my-1">
                            {h.text}
                        </div>
                    ) : h.type === 'error' ? (
                        <div className="text-red-400 font-medium py-0.5">
                            {h.text}
                        </div>
                    ) : h.type === 'mission' ? (
                        <div className="text-purple-300 font-semibold py-1 bg-purple-950 px-3 rounded-lg border border-purple-500 my-1">
                            {h.text}
                        </div>
                    ) : (
                        <div className="text-slate-300 font-mono py-0.5">
                            {h.text}
                        </div>
                    )}
                </div>
            ))}

            {executingCmd && (
                <div className="text-emerald-400 animate-pulse font-bold text-xs flex items-center gap-2 py-1">
                    <RefreshCw size={14} className="animate-spin" />
                    <span>[Noyau Linux] Traitement de la commande...</span>
                </div>
            )}

            {/* Ligne d'invité de commande active et fluide */}
            <form onSubmit={handleCommand} className="flex items-center gap-1.5 pt-1">
                {pendingAuth ? (
                    <span className="text-slate-300 font-bold shrink-0">{pendingAuth.promptLabel}</span>
                ) : sshSession ? (
                    <>
                        <span className="text-emerald-400 font-bold shrink-0">
                            {sshSession.user}@{sshSession.host}
                        </span>
                        <span className="text-slate-400 font-bold shrink-0">:</span>
                        <span className="text-[#38bdf8] font-bold shrink-0">{formattedPath}</span>
                        <span className="text-white font-bold shrink-0">{sshSession.user === 'root' ? '#' : '$'}</span>
                    </>
                ) : (
                    <>
                        <span className={activeUser === 'root' ? 'text-red-400 font-bold shrink-0' : 'text-[#eab308] font-bold shrink-0'}>
                            {activeUser}@mysterious-classroom
                        </span>
                        <span className="text-slate-400 font-bold shrink-0">:</span>
                        <span className="text-[#38bdf8] font-bold shrink-0">{formattedPath}</span>
                        <span className="text-white font-bold shrink-0">{activeUser === 'root' ? '#' : '$'}</span>
                    </>
                )}
                <input
                    ref={inputRef}
                    type={pendingAuth ? "password" : "text"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={executingCmd}
                    autoFocus
                    className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm md:text-base focus:outline-none border-none p-0 m-0 caret-emerald-400 disabled:opacity-50"
                />
            </form>
        </div>
    );
};

export default TerminalConsole;
