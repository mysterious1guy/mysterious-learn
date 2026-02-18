import { useNavigate } from 'react-router-dom';
import { motion, useState } from 'framer-motion';
import { ArrowLeft, LogOut, User, Mail, Edit2, Save, X } from 'lucide-react';

const AccountPage = ({ user, onUpdateUser, onLogout, progressions, favorites, onToggleFavorite, API_URL, setToast }) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    name: `${editForm.firstName} ${editForm.lastName}`.trim(),
                    firstName: editForm.firstName,
                    lastName: editForm.lastName,
                    email: editForm.email
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                onUpdateUser(updatedUser);
                setToast({ message: 'Profil mis à jour avec succès!', type: 'success' });
                setIsEditing(false);
            } else {
                const error = await response.json();
                setToast({ message: error.message || 'Erreur lors de la mise à jour', type: 'error' });
            }
        } catch (err) {
            setToast({ message: 'Erreur réseau', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setEditForm({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || ''
        });
        setIsEditing(false);
    };

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
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </div>
                        <div>
                            {!isEditing ? (
                                <>
                                    <h2 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h2>
                                    <p className="text-gray-400">{user?.email}</p>
                                </>
                            ) : (
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Prénom"
                                        value={editForm.firstName}
                                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                                        className="bg-gray-900/50 border border-gray-600 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        value={editForm.lastName}
                                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                                        className="bg-gray-900/50 border border-gray-600 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="bg-gray-900/50 border border-gray-600 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition"
                            >
                                <Edit2 size={18} />
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="p-3 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition disabled:opacity-50"
                                >
                                    <Save size={18} />
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="p-3 bg-gray-500/20 text-gray-400 rounded-xl hover:bg-gray-500/30 transition"
                                >
                                    <X size={18} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Statistiques et progression */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                        <h3 className="text-lg font-semibold mb-2">Cours favoris</h3>
                        <p className="text-3xl font-bold text-blue-400">{favorites?.length || 0}</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                        <h3 className="text-lg font-semibold mb-2">Cours en cours</h3>
                        <p className="text-3xl font-bold text-green-400">{Object.keys(progressions || {}).length}</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                        <h3 className="text-lg font-semibold mb-2">Membre depuis</h3>
                        <p className="text-lg font-bold text-purple-400">
                            {new Date(user?.createdAt || Date.now()).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                        </p>
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