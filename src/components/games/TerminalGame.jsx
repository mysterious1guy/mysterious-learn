import React, { useState } from 'react';
import { Terminal, CheckCircle2, HelpCircle, ShieldAlert, Sparkles, Trophy } from 'lucide-react';

const TerminalGame = () => {
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [currentMission, setCurrentMission] = useState(1);
    const [history, setHistory] = useState([
        { type: 'sys', text: '=== MYSTERIOUS TERMINAL HACKING SIMULATOR v2.4 ===' },
        { type: 'sys', text: 'Tapez "help" pour afficher la liste des commandes de piratage disponibles.' },
        { type: 'mission', text: 'MISSION 1 : Un serveur distant (192.168.1.10) a un port suspect. Utilisez "scan 192.168.1.10" pour analyser les ports.' }
    ]);

    const handleCommand = (e) => {
        e.preventDefault();
        const cmd = input.trim();
        if (!cmd) return;

        const newHistory = [...history, { type: 'user', text: `root@mysterious-terminal:~# ${cmd}` }];
        const lower = cmd.toLowerCase();

        if (lower === 'help') {
            newHistory.push({
                type: 'sys', text: `Commandes autorisées :
- scan <ip>          : Analyser les ports d'un serveur distant
- exploit <port>     : Déclencher une charge utile sur le port cible
- decode <base64>    : Décoder une chaîne secrète
- cat <fichier>      : Lire le contenu d'un fichier système
- clear              : Effacer l'écran du terminal`
            });
        } else if (lower === 'clear') {
            setHistory([]);
            setInput('');
            return;
        } else if (lower.startsWith('scan')) {
            if (currentMission === 1) {
                newHistory.push({
                    type: 'output', text: `[+] Scan de 192.168.1.10...
PORT 80/TCP  : OPEN (HTTP Nginx 1.18)
PORT 22/TCP  : CLOSED
PORT 8080/TCP: OPEN (Vulnerable Spring Boot Remote Execution)`
                });
                newHistory.push({
                    type: 'mission', text: 'MISSION 1 SUITE : Le port 8080 présente une faille d\'exécution distante. Lancez "exploit 8080".'
                });
            } else {
                newHistory.push({ type: 'output', text: '[+] Aucun port vulnérable détecté sur cette IP.' });
            }
        } else if (lower === 'exploit 8080') {
            if (currentMission === 1) {
                newHistory.push({
                    type: 'success', text: `[+] Exploitation réussie ! Obtenu shell interactif sur 192.168.1.10.
Fichier découvert : secret_hash.txt
Contenu : TXlzdGVyaW91c0NsYXNzcm9vbTIwMjY=`
                });
                newHistory.push({
                    type: 'mission', text: 'MISSION 2 : La chaîne ci-dessus est encodée en Base64. Utilisez "decode <chaîne>" pour obtenir le Flag final !'
                });
                setCurrentMission(2);
            } else {
                newHistory.push({ type: 'error', text: '[-] L\'exploitation a échoué. Vérifiez le numéro de port.' });
            }
        } else if (lower.startsWith('decode ')) {
            const hash = cmd.split(' ')[1];
            if (hash === 'TXlzdGVyaW91c0NsYXNzcm9vbTIwMjY=') {
                newHistory.push({
                    type: 'success', text: `🎉 DECODAGE REUSSI ! Flag déchiffré : FLAG{MysteriousClassroom2026}`
                });
                setScore(s => s + 500);
                setCurrentMission(3);
                newHistory.push({
                    type: 'sys', text: '🏆 FÉLICITATIONS ! Vous avez terminé toutes les missions de simulation de hacking ! (+500 XP)'
                });
            } else {
                newHistory.push({ type: 'error', text: '[-] Chaîne non reconnue ou échec du décodage Base64.' });
            }
        } else if (lower === 'cat secret_hash.txt') {
            newHistory.push({ type: 'output', text: 'TXlzdGVyaW91c0NsYXNzcm9vbTIwMjY=' });
        } else {
            newHistory.push({ type: 'error', text: `Commande inconnue: "${cmd}". Tapez "help" pour voir la liste.` });
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 text-slate-900 relative overflow-hidden shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 font-bold">
                        <Terminal size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">TERMINAL HACKING SIMULATOR</h2>
                        <p className="text-xs text-slate-500 font-medium">Infiltration & Résolution d'énigmes CLI</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-amber-600 text-xs font-bold">
                    <Trophy size={16} /> Score : {score} XP
                </div>
            </div>

            {/* Terminal Window */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-6 font-mono text-xs md:text-sm min-h-[320px] max-h-[420px] overflow-y-auto space-y-2 shadow-inner">
                {history.map((h, i) => (
                    <div key={i} className={`leading-relaxed ${h.type === 'user' ? 'text-amber-300 font-bold' : h.type === 'success' ? 'text-emerald-400 font-bold' : h.type === 'error' ? 'text-red-400' : h.type === 'mission' ? 'text-purple-300 font-semibold bg-purple-500/20 p-3 rounded-xl border border-purple-500/30' : 'text-slate-300'}`}>
                        {h.text}
                    </div>
                ))}
            </div>

            {/* Input Line */}
            <form onSubmit={handleCommand} className="flex items-center gap-3 bg-slate-100 border border-slate-300 rounded-2xl px-4 py-3">
                <span className="text-emerald-600 font-mono text-xs font-bold shrink-0">root@mysterious-terminal:~#</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Entrez une commande (ex: help, scan 192.168.1.10)..."
                    className="w-full bg-transparent text-slate-900 font-mono text-xs focus:outline-none placeholder:text-slate-500"
                />
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition">
                    Exécuter
                </button>
            </form>
        </div>
    );
};

export default TerminalGame;
