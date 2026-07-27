import React from 'react';

const NanoEditor = ({ activeEditor, setActiveEditor, currentPath, vfs, setVfs, displayUsername, activeUser, formattedPath, setHistory, sshSession, API_URL, user }) => {
    const handleSave = async () => {
        const savedContent = activeEditor.content;
        const fileName = activeEditor.fileName;

        if (activeEditor.isRemoteSsh || sshSession) {
            try {
                const token = user?.token || localStorage.getItem('token');
                const b64Content = btoa(unescape(encodeURIComponent(savedContent)));
                await fetch(`${API_URL}/ai/execute-terminal-command`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        command: `echo "${b64Content}" | base64 -d > "${fileName}"`,
                        currentPath: currentPath,
                        currentUser: activeUser,
                        vfs: vfs,
                        sshSession: sshSession
                    })
                });
            } catch (e) {
                console.error("Erreur sauvegarde SSH distante:", e);
            }

            const promptHost = sshSession?.remoteHostname || sshSession?.host || 'remote';
            setHistory(prev => [
                ...prev,
                { type: 'user', text: `${activeUser}@${promptHost}:${formattedPath}$ nano ${fileName}` },
                { type: 'sys', text: `[nano] Fichier '${fileName}' sauvegardé sur le serveur distant SSH (${promptHost}).` }
            ]);
            setActiveEditor(null);
            return;
        }

        // Sauvegarde VFS locale
        const rawPath = fileName.startsWith('/') ? fileName : `${currentPath}/${fileName}`;
        const filePath = '/' + rawPath.split('/').filter(Boolean).join('/');

        const updatedVfs = { ...vfs, [filePath]: savedContent };
        setVfs(updatedVfs);
        try {
            localStorage.setItem(`terminal_vfs_${displayUsername}`, JSON.stringify(updatedVfs));
        } catch (e) {}

        const nanoPromptChar = activeUser === 'root' ? '#' : '$';
        setHistory(prev => [
            ...prev,
            { type: 'user', text: activeUser + '@classroom:' + formattedPath + nanoPromptChar + ' nano ' + fileName },
            { type: 'sys', text: `[nano] Fichier '${fileName}' écrit et sauvegardé.` },
            { type: 'output', text: `CMD: cat ${fileName}\n${savedContent}` }
        ]);
        setActiveEditor(null);
    };

    return (
        <div className="flex flex-col h-[680px] lg:h-[760px] bg-[#050c14] text-slate-100 font-mono overflow-hidden">
            {/* En-tête Nano */}
            <div className="bg-slate-200 text-slate-900 px-4 py-2 font-bold text-xs flex justify-between items-center select-none shadow-md">
                <span>  GNU nano 7.2</span>
                <span>Fichier : {activeEditor.fileName} {sshSession ? '(Serveur Distant SSH)' : ''}</span>
                <span className="text-slate-600 font-normal">[ Édition de code ]</span>
            </div>

            {/* Editeur Textarea */}
            <textarea
                value={activeEditor.content}
                onChange={(e) => setActiveEditor({ ...activeEditor, content: e.target.value })}
                placeholder="Saisissez votre script Linux ici..."
                className="flex-1 w-full p-4 bg-[#030910] text-emerald-400 font-mono text-xs sm:text-sm md:text-base resize-none focus:outline-none custom-scrollbar leading-relaxed"
                autoFocus
            />

            {/* Barre de Contrôle et Raccourcis Nano */}
            <div className="bg-slate-950 border-t border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 text-slate-300">
                    <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700 font-bold">^O Ecrire (Ctrl+O)</span>
                    <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700 font-bold">^X Quitter (Ctrl+X)</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded shadow transition-all text-xs flex items-center gap-1.5"
                    >
                        💾 Enregistrer & Quitter
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveEditor(null)}
                        className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded shadow transition-all text-xs flex items-center gap-1.5"
                    >
                        ❌ Annuler
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NanoEditor;
