import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Zap, RefreshCw, Trophy, Flame, Server, AlertTriangle } from 'lucide-react';

const FirewallGame = () => {
    const [health, setHealth] = useState(100);
    const [score, setScore] = useState(0);
    const [wave, setWave] = useState(1);
    const [activeFilters, setActiveFilters] = useState({
        sqli: false,
        malware: false,
        ddos: false,
        xss: false
    });
    const [packets, setPackets] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [logs, setLogs] = useState(["[SYSTEM] Matrice de Pare-feu Initialisée. En attente des attaques..."]);

    const packetTypes = [
        { id: 'sqli', name: 'SQL Injection', color: 'border-red-500 text-red-400 bg-red-500/10', filter: 'sqli' },
        { id: 'malware', name: 'Trojan / Malware', color: 'border-amber-500 text-amber-400 bg-amber-500/10', filter: 'malware' },
        { id: 'ddos', name: 'DDoS SYN Flood', color: 'border-purple-500 text-purple-400 bg-purple-500/10', filter: 'ddos' },
        { id: 'xss', name: 'Cross-Site Scripting (XSS)', color: 'border-pink-500 text-pink-400 bg-pink-500/10', filter: 'xss' }
    ];

    // Spawn packets loop
    useEffect(() => {
        if (gameOver) return;

        const interval = setInterval(() => {
            if (packets.length < 5) {
                const randomType = packetTypes[Math.floor(Math.random() * packetTypes.length)];
                const newPacket = {
                    id: Math.random().toString(36).substring(7),
                    type: randomType,
                    speed: 2 + wave * 0.5,
                    progress: 0
                };
                setPackets(prev => [...prev, newPacket]);
            }
        }, Math.max(1200, 3000 - wave * 300));

        return () => clearInterval(interval);
    }, [gameOver, wave, packets.length]);

    // Packet movement & filtering check loop
    useEffect(() => {
        if (gameOver) return;

        const timer = setInterval(() => {
            setPackets(prevPackets => {
                const nextPackets = [];
                prevPackets.forEach(packet => {
                    const isFiltered = activeFilters[packet.type.filter];

                    if (isFiltered) {
                        // Packet intercepted!
                        setScore(s => s + 50);
                        setLogs(l => [`[PARE-FEU] 🛡️ Attaque ${packet.type.name} Bloquée ! (+50 XP)`, ...l.slice(0, 5)]);
                    } else if (packet.progress >= 100) {
                        // Packet breached database!
                        setHealth(h => {
                            const newH = Math.max(0, h - 15);
                            if (newH === 0) setGameOver(true);
                            return newH;
                        });
                        setLogs(l => [`[INTRUSION] 💥 La base a subi une attaque ${packet.type.name} (-15% PV)`, ...l.slice(0, 5)]);
                    } else {
                        nextPackets.push({ ...packet, progress: packet.progress + 15 });
                    }
                });
                return nextPackets;
            });
        }, 600);

        return () => clearInterval(timer);
    }, [activeFilters, gameOver]);

    // Wave advancement
    useEffect(() => {
        if (score > 0 && score % 300 === 0) {
            setWave(w => w + 1);
            setLogs(l => [`[NIVEAU ⚡] VAGUE DE CYBER-ATTAQUES NIVEAU ${wave + 1} !`, ...l.slice(0, 5)]);
        }
    }, [score]);

    const toggleFilter = (type) => {
        setActiveFilters(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const resetGame = () => {
        setHealth(100);
        setScore(0);
        setWave(1);
        setPackets([]);
        setActiveFilters({ sqli: false, malware: false, ddos: false, xss: false });
        setGameOver(false);
        setLogs(["[SYSTEM] Pare-feu réinitialisé avec succès."]);
    };

    return (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 text-slate-900 relative overflow-hidden shadow-xl space-y-6">
            {/* Header / Stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-600 font-bold">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">FIREWALL DEFENSE MATRIX</h2>
                        <p className="text-xs text-slate-500 font-medium">Défends le serveur central contre les menaces</p>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-xs font-bold">
                    <div className="flex items-center gap-2">
                        <Server size={16} className="text-emerald-600" />
                        <span>PV Serveur : <strong className={health > 50 ? 'text-emerald-600 font-black' : 'text-red-600 font-black'}>{health}%</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-amber-600" />
                        <span>Score : <strong className="text-amber-600 font-black">{score} XP</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Flame size={16} className="text-purple-600" />
                        <span>Vague : <strong className="text-purple-600 font-black">{wave}</strong></span>
                    </div>
                </div>
            </div>

            {/* Game Canvas Arena */}
            <div className="relative min-h-[320px] bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-inner">
                {/* Visual DB Target */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
                    <div className={`w-24 h-24 rounded-3xl border-2 ${health > 30 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-red-500/80 bg-red-500/20 text-red-400'} flex items-center justify-center shadow-2xl transition-all`}>
                        <Server size={40} className={health <= 30 ? 'animate-bounce' : ''} />
                    </div>
                    <span className="text-[10px] font-mono uppercase font-black tracking-wider text-slate-400">Base MongoDB</span>
                </div>

                {/* Packets Stream */}
                <div className="space-y-3 relative z-10 max-w-xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">Flux de Paquets Réseau Entrants :</span>
                    <AnimatePresence>
                        {packets.map(packet => (
                            <motion.div
                                key={packet.id}
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: `${packet.progress}%`, opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between w-64 shadow-lg ${packet.type.color}`}
                            >
                                <span className="font-bold flex items-center gap-2">
                                    <AlertTriangle size={14} /> {packet.type.name}
                                </span>
                                <span className="text-[10px] opacity-75">{packet.progress}%</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {packets.length === 0 && !gameOver && (
                        <p className="text-xs text-slate-400 font-mono italic">Analyse du trafic réseau en cours...</p>
                    )}
                </div>

                {/* Game Over Screen */}
                {gameOver && (
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-30">
                        <ShieldAlert size={56} className="text-red-500 mb-4 animate-pulse" />
                        <h3 className="text-3xl font-black text-white mb-2">DATABASE INFILTRATED</h3>
                        <p className="text-sm text-slate-400 mb-6">Le pare-feu a cédé sous les attaques réseau. Score final : <strong className="text-amber-400">{score} XP</strong></p>
                        <button
                            onClick={resetGame}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center gap-2 shadow-xl"
                        >
                            <RefreshCw size={16} /> Relancer la Matrice
                        </button>
                    </div>
                )}
            </div>

            {/* Controls / Filter Toggle Buttons */}
            <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">Activer les Filtres de Protection Active :</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                        onClick={() => toggleFilter('sqli')}
                        className={`p-4 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activeFilters.sqli ? 'bg-red-600 border-red-600 text-white shadow-md' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'}`}
                    >
                        <ShieldCheck size={16} /> Filtre SQLi {activeFilters.sqli ? '[ACTIF]' : ''}
                    </button>
                    <button
                        onClick={() => toggleFilter('malware')}
                        className={`p-4 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activeFilters.malware ? 'bg-amber-600 border-amber-600 text-white shadow-md' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'}`}
                    >
                        <ShieldCheck size={16} /> Anti-Malware {activeFilters.malware ? '[ACTIF]' : ''}
                    </button>
                    <button
                        onClick={() => toggleFilter('ddos')}
                        className={`p-4 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activeFilters.ddos ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'}`}
                    >
                        <ShieldCheck size={16} /> Anti-DDoS {activeFilters.ddos ? '[ACTIF]' : ''}
                    </button>
                    <button
                        onClick={() => toggleFilter('xss')}
                        className={`p-4 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activeFilters.xss ? 'bg-pink-600 border-pink-600 text-white shadow-md' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'}`}
                    >
                        <ShieldCheck size={16} /> Filtre XSS {activeFilters.xss ? '[ACTIF]' : ''}
                    </button>
                </div>
            </div>

            {/* Live Logs Terminal */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Logs du Serveur en Temps Réel :</span>
                {logs.map((log, idx) => (
                    <div key={idx} className="truncate">{log}</div>
                ))}
            </div>
        </div>
    );
};

export default FirewallGame;
