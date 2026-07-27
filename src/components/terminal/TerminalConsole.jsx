import React from 'react';
import { RefreshCw } from 'lucide-react';

const renderFormattedOutput = (item) => {
    const text = item.text || '';
    const cmd = (item.cmd || '').toLowerCase().trim();

    if (!text) return null;

    const isLs = cmd === 'ls' || cmd.startsWith('ls ') || cmd.startsWith('ls\t');

    if (isLs) {
        // Découper les éléments renvoyés par la commande ls (par saut de ligne, tabulations ou espaces)
        let rawTokens = [];
        if (text.includes('\n')) {
            rawTokens = text.split('\n').flatMap(line => line.split(/\t|\s{2,}/)).filter(Boolean);
        } else {
            rawTokens = text.split(/\s+/).filter(Boolean);
        }

        const knownDirs = ['Android', 'android-studio', 'Bureau', 'BurpSuiteCommunity', 'Documents', 'Images', 'Musique', 'Personnel', 'Projets', 'Public', 'STAGE', 'Téléchargements', 'Vidéos', 'VirtualBox VMs', 'WhiteSur-gtk-theme', 'snap', 'Gogh', 'GoogleDrive', 'EXO1', 'florence', 'flutter', 'mgp', 'MON PROJET PERSONNEL', 'pt', 'supervision', 'supervision1', 'ul'];

        if (rawTokens.length > 0) {
            return (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-1 my-2 font-mono text-xs sm:text-sm">
                    {rawTokens.map((entry, idx) => {
                        let name = entry.trim().replace(/^["']|["']$/g, '');
                        if (!name) return null;

                        const isExplicitDir = name.endsWith('/');
                        const isExplicitExec = name.endsWith('*');

                        if (isExplicitDir) name = name.slice(0, -1);
                        if (isExplicitExec) name = name.slice(0, -1);

                        const isScript = isExplicitExec || name.endsWith('.sh') || name.endsWith('.py') || name.endsWith('.js') || name.endsWith('.bin') || name.endsWith('.run');
                        const isDir = isExplicitDir || knownDirs.includes(name) || (!name.includes('.') && !isScript);

                        let styleClass = "text-slate-200 font-normal"; // Fichier simple (gris clair)
                        let prefix = "";

                        if (isDir) {
                            styleClass = "text-cyan-400 font-bold flex items-center gap-1"; // Dossier (Bleu Cyan très visible)
                            prefix = "📁 ";
                        } else if (isScript) {
                            styleClass = "text-emerald-400 font-semibold flex items-center gap-1"; // Script exécutable (Vert Émeraude)
                            prefix = "⚡ ";
                        }

                        return (
                            <div key={idx} className={`truncate ${styleClass}`} title={name}>
                                <span>{prefix}</span>
                                <span>{name.includes(' ') ? `'${name}'` : name}</span>
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    return (
        <div className="text-slate-300 font-mono py-0.5 whitespace-pre-wrap">
            {text}
        </div>
    );
};

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
    setInput,
    isFullscreen = false
}) => {
    return (
        <div
            ref={outputContainerRef}
            onClick={() => inputRef.current?.focus()}
            className={`p-4 sm:p-6 text-xs sm:text-sm md:text-base ${isFullscreen ? 'flex-1 h-full' : 'h-[680px] lg:h-[760px]'} overflow-y-auto custom-scrollbar cursor-text space-y-2 leading-relaxed text-slate-200`}
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
                        renderFormattedOutput(h)
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
                        <div className="flex items-center font-bold shrink-0">
                            <span className={sshSession.user === 'root' ? 'text-red-400' : 'text-emerald-400'}>
                                {sshSession.user}@{sshSession.remoteHostname || sshSession.host}
                            </span>
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
