import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, CheckCircle, ChevronRight, Edit2, LogOut,
  Save, Trash2, ShieldCheck, Download, BookOpen, Target, Award, Clock,
  Settings, TrendingUp, X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { formatTimeAgo } from '../utils/dateUtils';

const AccountDetails = ({ user, onUpdateUser, onLogout, progressions, favorites, onToggleFavorite, API_URL, setToast }) => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    language: user?.language || 'fr',
    notifications: user?.notifications || true,
    privacy: user?.privacy || 'public'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userStats, setUserStats] = useState({
    totalSessions: 0,
    totalTime: 0,
    exercisesCompleted: 0,
    streak: 0
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch(`${API_URL}/activity/user-stats/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (response.ok) {
          const stats = await response.json();
          setUserStats(stats);
        }
      } catch (err) {
        console.error("Erreur stats utilisateur:", err);
      }
    };

    if (user?._id) {
      fetchUserStats();
    }
  }, [user, API_URL]);

  const fileInputRef = useRef(null);

  // Fonction de suppression de compte
  const handleDeleteAccount = async () => {
    if (user?.role === 'admin') {
      setToast({ message: "Les comptes administrateurs ne peuvent pas être supprimés.", type: 'error' });
      return;
    }
    if (!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      return;
    }

    if (!confirm('Dernière confirmation : Toutes vos données seront définitivement perdues. Confirmer ?')) {
      return;
    }

    setIsLoading(true);
    try {
      console.log('🗑️ AccountDetails: Suppression du compte pour:', user.email);

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        console.log('✅ AccountDetails: Compte supprimé avec succès');
        setToast({ message: 'Compte supprimé avec succès', type: 'success' });

        // Nettoyage local
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // Redirection vers la page d'accueil
        window.location.href = '/';
      } else {
        const data = await response.json();
        console.error('❌ AccountDetails: Erreur suppression:', data.message);
        setToast({ message: data.message || 'Erreur lors de la suppression', type: 'error' });
      }
    } catch (error) {
      console.error('❌ AccountDetails: Erreur réseau:', error);
      setToast({ message: 'Erreur réseau', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const isEmailChanged = editForm.email !== user.email;

      if (isEmailChanged) {
        const res = await fetch(`${API_URL}/auth/request-email-change`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ newEmail: editForm.email })
        });

        if (res.ok) {
          setNewEmail(editForm.email);
          setShowEmailModal(true);
          setOtpSent(true);
          setToast({ message: 'Code envoyé au nouvel email', type: 'info' });
          return;
        } else {
          const errData = await res.json();
          setToast({ message: errData.message || 'Erreur email', type: 'error' });
          return;
        }
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editForm)
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

  const handleConfirmEmailChange = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/confirm-email-change`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ code: otpCode })
      });

      if (res.ok) {
        const data = await res.json();
        // Mettre à jour l'utilisateur localement
        onUpdateUser({ ...user, email: data.email });
        setToast({ message: 'Email mis à jour !', type: 'success' });
        setShowEmailModal(false);
        setIsEditing(false);
        setOtpCode('');
        setOtpSent(false);
      } else {
        const errData = await res.json();
        setToast({ message: errData.message || 'Code invalide', type: 'error' });
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
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      language: user?.language || 'fr',
      notifications: user?.notifications || true,
      privacy: user?.privacy || 'public'
    });
    setIsEditing(false);
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) { // Limite 500kb pour le Base64
        setToast({ message: 'Image trop lourde (max 500kb)', type: 'error' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        try {
          const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ avatar: base64String })
          });

          if (response.ok) {
            const updatedUser = await response.json();
            onUpdateUser(updatedUser);
            setToast({ message: 'Photo de profil mise à jour!', type: 'success' });
          } else {
            setToast({ message: 'Échec de la mise à jour', type: 'error' });
          }
        } catch (err) {
          setToast({ message: 'Erreur réseau', type: 'error' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'preferences', label: 'Préférences', icon: Settings },
    { id: 'activity', label: 'Activité', icon: TrendingUp }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Photo de profil */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            <Camera size={16} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            className="hidden"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h3>
          <p className="text-gray-400">{user?.email}</p>
          <p className="text-sm text-gray-500 mt-1">Membre depuis {new Date(user?.createdAt || Date.now()).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Informations personnelles */}
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Informations personnelles</h4>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
            >
              <Edit2 size={16} />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition disabled:opacity-50"
              >
                <Save size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Prénom</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-white">{user?.firstName || '-'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nom</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
                />
              ) : (
                <p className="text-white">{user?.lastName || '-'}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
              />
            ) : (
              <p className="text-white">{user?.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Téléphone</label>
            {isEditing ? (
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
              />
            ) : (
              <p className="text-white">{user?.phone || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Bio</label>
            {isEditing ? (
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                rows={3}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none resize-none"
              />
            ) : (
              <p className="text-white">{user?.bio || 'Aucune bio'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Localisation</label>
            {isEditing ? (
              <input
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
              />
            ) : (
              <p className="text-white">{user?.location || '-'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Site web</label>
            {isEditing ? (
              <input
                type="url"
                value={editForm.website}
                onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
              />
            ) : (
              <p className="text-white">{user?.website ? <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{user.website}</a> : '-'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-blue-400" size={20} />
            <span className="text-sm text-gray-400">Cours favoris</span>
          </div>
          <p className="text-2xl font-bold text-blue-400">{favorites?.length || 0}</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-green-400" size={20} />
            <span className="text-sm text-gray-400">Cours en cours</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{Object.keys(progressions || {}).length}</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-purple-400" size={20} />
            <span className="text-sm text-gray-400">Streak de jours</span>
          </div>
          <p className="text-2xl font-bold text-purple-400">{userStats.streak || 0} 🔥</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-orange-400" size={20} />
            <span className="text-sm text-gray-400">Minutes d'apprentissage</span>
          </div>
          <p className="text-2xl font-bold text-orange-400">{userStats.totalTime || 0}</p>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4">Sécurité du compte</h4>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            <div className="flex items-center gap-3">
              <Lock className="text-gray-400" size={20} />
              <div className="text-left">
                <p className="text-white">Changer le mot de passe</p>
                <p className="text-sm text-gray-400">Rejoint le: {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button
            disabled
            className="w-full flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-not-allowed opacity-60"
          >
            <div className="flex items-center gap-3">
              <Shield className="text-gray-500" size={20} />
              <div className="text-left">
                <p className="text-gray-400">Authentification à deux facteurs</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <p className="text-xs text-red-400 font-medium">Service SMS désactivé</p>
                </div>
              </div>
            </div>
            <Lock size={16} className="text-gray-600" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            <div className="flex items-center gap-3">
              <Globe className="text-gray-400" size={20} />
              <div className="text-left">
                <p className="text-white">Sessions actives</p>
                <p className="text-sm text-gray-400">2 sessions actives</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4">Préférences</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Notifications par email</p>
              <p className="text-sm text-gray-400">Recevoir des emails de notification</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={user?.notifications} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Langue</p>
              <p className="text-sm text-gray-400">Choisir la langue de l'interface</p>
            </div>
            <select className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none">
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Thème</p>
              <p className="text-sm text-gray-400">Apparence de l'interface</p>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
            >
              <option value="dark">Sombre</option>
              <option value="light">Clair</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4">Activité récente</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <BookOpen className="text-blue-400" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-white">Dernière connexion</p>
              <p className="text-sm text-gray-400">{formatTimeAgo(user.lastLogin)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="text-green-400" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-white">A terminé le module "Variables et Types"</p>
              <p className="text-sm text-gray-400">Il y a 1 jour</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Star className="text-purple-400" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-white">A ajouté "JavaScript Avancé" aux favoris</p>
              <p className="text-sm text-gray-400">Il y a 3 jours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Onglets */}
      <div className="flex space-x-1 mb-6 bg-gray-800/50 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
            >
              <Icon size={16} />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenu de l'onglet */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'security' && renderSecurityTab()}
          {activeTab === 'preferences' && renderPreferencesTab()}
          {activeTab === 'activity' && renderActivityTab()}
        </motion.div>
      </AnimatePresence>

      {/* Actions rapides */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={onLogout}
          className="px-6 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition flex items-center gap-2"
        >
          <LogOut size={18} />
          Déconnexion
        </button>

        <button
          onClick={() => {
            const data = {
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                joinedAt: user.joinedAt,
              },
              progressions,
              favorites
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `mysterious-classroom-data.json`;
            link.click();
            URL.revokeObjectURL(url);
            setToast({ message: 'Données exportées !', type: 'success' });
          }}
          className="px-6 py-3 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-700 transition flex items-center gap-2"
        >
          <Download size={18} />
          Exporter mes données
        </button>

        <button
          onClick={handleDeleteAccount}
          disabled={isLoading}
          className="px-6 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} />
          {isLoading ? 'Suppression...' : 'Supprimer mon compte'}
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
