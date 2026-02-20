import { useState, useEffect, useRef } from 'react';
import { Bell, Info, AlertTriangle, CheckCircle, Megaphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBell = ({ user, API_URL }) => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
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
            if (response.ok) {
                setNotifications(data);
            }
        } catch (err) {
            console.error('Erreur notifications:', err);
        }
    };

    useEffect(() => {
        if (user?.token) {
            fetchNotifications();
        }
        // Refresh notifications every 2 minutes
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

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-[100]"
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

                        <div className="max-h-96 overflow-y-auto scrollbar-hide">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Bell size={32} className="mx-auto text-slate-700 mb-3 opacity-20" />
                                    <p className="text-slate-500 text-sm">Aucune nouvelle annonce</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-800">
                                    {notifications.map((notif) => (
                                        <div key={notif._id} className="p-4 hover:bg-slate-800/50 transition-colors group cursor-default">
                                            <div className="flex gap-3">
                                                <div className="mt-1 flex-shrink-0">{getIcon(notif.type)}</div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-white leading-tight mb-1">{notif.title}</p>
                                                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-2">{notif.message}</p>
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
                            <div className="p-3 bg-slate-950/30 text-center">
                                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Fin des annonces</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationBell;
