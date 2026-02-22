import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AccountDetails from '../components/AccountDetails';

const AccountPage = ({ user, onUpdateUser, onLogout, progressions, favorites, onToggleFavorite, API_URL, setToast }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
                        Retour au tableau de bord
                    </button>
                </motion.div>

                <AccountDetails
                    user={user}
                    onUpdateUser={onUpdateUser}
                    onLogout={onLogout}
                    progressions={progressions}
                    favorites={favorites}
                    onToggleFavorite={onToggleFavorite}
                    API_URL={API_URL}
                    setToast={setToast}
                />
            </div>
        </div>
    );
};

export default AccountPage;