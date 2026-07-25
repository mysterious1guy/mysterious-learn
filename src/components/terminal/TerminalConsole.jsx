import React from 'react';
import { RefreshCw } from 'lucide-react';

const TerminalConsole = ({
    outputContainerRef,
    inputRef,
    history,
    executingCmd,
    handleCommand,
    handleKeyDown,
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

            {executingCmd ? (
                <div className="text-emerald-400 animate-pulse font-bold text-xs flex items-center gap-2 py-1">
                    <RefreshCw size={14} className="animate-spin" />
                    <span>[Noyau Linux] Traitement de la commande en cours...</span>
                </div>
            ) : (
                /* Ligne d'invité de commande active et fluide */
                <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
                    {pendingAuth ? (
                        <span className="text-slate-300 font-bold shrink-0">{pendingAuth.promptLabel}</span>
                    ) : sshSession ? (
                        <div className="flex items-center font-bold shrink-0">
                            <span className="text-emerald-400">{sshSession.user}@{sshSession.host}</span>
                            <span className="text-slate-400">:</span>
                            <span className="text-[#38bdf8]">{formattedPath}</span>
                            <span className="text-white ml-0.5">{sshSession.user === 'root' ? '#' : '$'}</span>
                        </div>
                    ) : (
                        <div className="flex items-center font-bold shrink-0">
                            <span className={activeUser === 'root' ? 'text-red-400' : 'text-[#eab308]'}>
                                {activeUser}@classroom
                            </span>
                            <span className="text-slate-400">:</span>
                            <span className="text-[#38bdf8]">{formattedPath}</span>
                            <span className="text-white ml-0.5">{activeUser === 'root' ? '#' : '$'}</span>
                        </div>
                    )}
                    <input
                        ref={inputRef}
                        type={pendingAuth ? "password" : "text"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={executingCmd}
                        autoFocus
                        className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm md:text-base focus:outline-none border-none p-0 m-0 caret-emerald-400 disabled:opacity-50"
                    />
                </form>
            )}
        </div>
    );
};

export default TerminalConsole;
