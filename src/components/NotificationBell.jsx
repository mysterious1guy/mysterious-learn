import { useState, useEffect, useRef } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, Megaphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBell = ({ user, API_URL }) => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [proactiveNotif, setProactiveNotif] = useState(null);
    const dropdownRef = useRef(null);

    const fetchNotifications = async () => {
        if (!user?.token) return;
        try {
            const response = await fetch(`${API_URL}/notifications`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            if (response.ok && Array.isArray(data)) {
                setNotifications(data);

                // Proactive logic: Show the latest one if it's new
                if (data.length > 0) {
                    const latest = data[0];
                    const lastSeenId = localStorage.getItem('mysterious_last_seen_notif');
                    if (lastSeenId !== latest._id) {
                        setProactiveNotif(latest);
                        localStorage.setItem('mysterious_last_seen_notif', latest._id);
                    }
                }
            }
        } catch (err) {
            console.error('Erreur notifications:', err);
        }
    };

    useEffect(() => {
        if (user?.token) {
            fetchNotifications();
        }
        const interval = setInterval(() => {
            if (user?.token) fetchNotifications();
        }, 120000);
        return () => clearInterval(interval);
    }, [API_URL, user?.token]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'warning': return <AlertTriangle size={18} className="text-orange-400" />;
            case 'success': return <CheckCircle size={18} className="text-green-400" />;
            case 'announcement': return <Megaphone size={18} className="text-purple-400" />;
            default: return <Info size={18} className="text-blue-400" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                title="Notifications"
            >
                <Bell size={20} />
                {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-slate-900 rounded-full animate-pulse" />
                )}
            </button>

            {/* Proactive Modal Overlay */}
            <AnimatePresence>
                {proactiveNotif && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-slate-900 border border-blue-500/30 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-blue-600/10 to-transparent flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Megaphone className="text-blue-400" />
                                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">Nouvelle Annonce</h2>
                                </div>
                                <button onClick={() => setProactiveNotif(null)} className="p-2 hover:bg-white/5 rounded-full text-slate-400">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-2xl">{getIcon(proactiveNotif.type)}</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{proactiveNotif.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{proactiveNotif.message}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setProactiveNotif(null)}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-900/40"
                                >
                                    J'AI COMPRIS
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Normal Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 mt-3 sm:w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-[100]"
                    >
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Megaphone size={16} className="text-blue-400" />
                                Annonces
                            </h3>
                            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto scrollbar-hide">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Bell size={32} className="mx-auto text-slate-700 mb-3 opacity-20" />
                                    <p className="text-slate-500 text-sm">Aucune nouvelle annonce</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-800">
                                    {notifications.map((notif) => (
                                        <div key={notif._id} className="p-5 hover:bg-slate-800/50 transition-colors group cursor-default">
                                            <div className="flex gap-4">
                                                <div className="mt-1 flex-shrink-0">{getIcon(notif.type)}</div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-white leading-tight mb-1">{notif.title}</p>
                                                    <p className="text-xs text-slate-400 leading-relaxed mb-2">{notif.message}</p>
                                                    <span className="text-[10px] text-slate-600 font-medium">
                                                        {new Date(notif.createdAt).toLocaleDateString()} • {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="p-4 bg-slate-950/30 text-center">
                                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">Fin des annonces</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationBell;
