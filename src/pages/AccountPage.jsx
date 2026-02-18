import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, LogOut, User, Mail } from 'lucide-react';

const AccountPage = ({ user, onLogout }) => {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto p-6 pt-20">
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
                Retour
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-3xl p-8"
            >
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
                        <p className="text-gray-400">{user?.email}</p>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className="px-6 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition flex items-center gap-2"
                >
                    <LogOut size={18} />
                    Déconnexion
                </button>
            </motion.div>
        </div>
    );
};

export default AccountPage;