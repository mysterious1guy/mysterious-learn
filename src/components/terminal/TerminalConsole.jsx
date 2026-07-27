import React from 'react';
import { RefreshCw } from 'lucide-react';

const renderFormattedOutput = (item) => {
    const text = item.text || '';
    const cmd = (item.cmd || '').toLowerCase().trim();

    if (!text) return null;

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const isLs = cmd.startsWith('ls') || (lines.length > 2 && lines.every(line => !line.includes(' ') || line.startsWith("'") || line.startsWith('"')));

    if (isLs && lines.length > 0) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-1 my-1.5 font-mono text-xs sm:text-sm">
                {lines.map((entry, idx) => {
                    const cleanName = entry.replace(/^["']|["']$/g, '');
                    const isScript = cleanName.endsWith('.sh') || cleanName.endsWith('.py') || cleanName.endsWith('.js') || cleanName.endsWith('.bin') || cleanName.endsWith('.exe');
                    const isDir = !cleanName.includes('.') || ['Android', 'android-studio', 'Bureau', 'BurpSuiteCommunity', 'Documents', 'Images', 'Musique', 'Personnel', 'Projets', 'Public', 'STAGE', 'Téléchargements', 'Vidéos', 'VirtualBox VMs', 'WhiteSur-gtk-theme', 'snap', 'Gogh', 'GoogleDrive', 'EXO1', 'florence', 'flutter', 'mgp', 'MON PROJET PERSONNEL', 'pt', 'supervision', 'supervision1', 'ul'].includes(cleanName);

                    let styleClass = "text-slate-200"; // Fichier ordinaire (blanc/gris)
                    if (isScript) {
                        styleClass = "text-yellow-400 font-semibold"; // Scripts exécutables (jaune/vert)
                    } else if (isDir) {
                        styleClass = "text-sky-400 font-bold"; // Dossiers/répertoires (bleu cyan)
                    }

                    return (
                        <div key={idx} className={`truncate ${styleClass}`} title={cleanName}>
                            {cleanName.includes(' ') ? `'${cleanName}'` : cleanName}
                        </div>
                    );
                })}
            </div>
        );
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
                    ) : sshSession ? (
                        <div className="flex items-center font-bold shrink-0">
                            <span className="text-emerald-400">{sshSession.user}@{sshSession.remoteHostname || sshSession.host}</span>
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
