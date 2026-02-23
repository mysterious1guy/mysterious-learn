import { Link, useNavigate } from 'react-router-dom';
import { X, Home, User, LogOut, Briefcase, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MobileMenu = ({ isOpen, onClose, user, onLogout }) => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleLogout = () => {
        onLogout();
        onClose();
        navigate('/');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween' }}
                        className="fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 p-6"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400">
                            <X />
                        </button>

                        {user && (
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold">{user.firstName} {user.lastName}</p>
                                    <p className="text-xs text-gray-400">{user.email}</p>
                                </div>
                            </div>
                        )}

                        <nav className="flex flex-col gap-4">
                            <Link
                                to="/dashboard"
                                onClick={onClose}
                                className="text-white hover:text-blue-400 flex items-center gap-2"
                            >
                                <Home size={18} /> Tableau de bord
                            </Link>
                            <Link
                                to="/account"
                                onClick={onClose}
                                className="text-white hover:text-blue-400 flex items-center gap-2"
                            >
                                <User size={18} /> Mon compte
                            </Link>
                            <Link
                                to="/projects"
                                onClick={onClose}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold flex items-center gap-2"
                            >
                                <Briefcase size={18} className="text-indigo-400" /> {t('projects')}
                            </Link>
                            <Link
                                to="/leaderboard"
                                onClick={onClose}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-bold flex items-center gap-2"
                            >
                                <Trophy size={18} className="text-amber-400" /> {t('leaderboard')}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-red-400 text-left flex items-center gap-2"
                            >
                                <LogOut size={18} /> Déconnexion
                            </button>
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;