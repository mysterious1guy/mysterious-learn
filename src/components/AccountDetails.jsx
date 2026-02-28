import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, Lock, Shield, Globe, Bell,
  Camera, CheckCircle, ChevronRight, Edit2, LogOut,
  Save, Trash2, ShieldCheck, Download, BookOpen, Target, Award, Clock,
  Settings, TrendingUp, X, Star
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { formatTimeAgo } from '../utils/dateUtils';
import { useCookies } from '../hooks/useCookies';

const AccountDetails = ({ user, onUpdateUser, onLogout, progressions, favorites, onToggleFavorite, API_URL, setToast }) => {
  const { theme, setTheme } = useTheme();
  const { removeUserCookie, removeCookie } = useCookies();
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
    location: user?.location || '',
    language: user?.language || 'fr',
    notifications: user?.notifications || true,
    privacy: user?.privacy || 'public',
    programmingLevel: user?.programmingLevel || 'Débutant'
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
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

    // Déclencher l'affichage du modal au lieu du confirm()
    setShowDeleteModal(true);
    setDeleteStep(1);
  };

  const confirmAccountDeletion = async () => {
    setIsLoading(true);
    setShowDeleteModal(false);
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

        // Nettoyage local total
        localStorage.clear();
        removeUserCookie();
        removeCookie('mysterious_progress');
        removeCookie('two_factor_verified'); // Au cas où

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
      // 1. D'abord, sauvegarder les autres informations du profil (nom, bio, etc.)
      // On retire l'email du corps de la requête pour updateProfile car il est géré à part
      const { email, ...otherFields } = editForm;

      const profileResponse = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(otherFields)
      });

      if (!profileResponse.ok) {
        const error = await profileResponse.json();
        setToast({ message: error.message || 'Erreur lors de la mise à jour du profil', type: 'error' });
        setIsLoading(false);
        return;
      }

      const updatedUser = await profileResponse.json();
      onUpdateUser(updatedUser);

      // 2. Ensuite, si l'email a été changé, lancer la procédure de vérification
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
          setToast({ message: 'Code de vérification envoyé au nouvel email', type: 'info' });
        } else {
          const errData = await res.json();
          setToast({ message: `Profil mis à jour mais erreur email: ${errData.message}`, type: 'error' });
        }
      } else {
        setIsEditing(false);
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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setToast({ message: 'Les nouveaux mots de passe ne correspondent pas', type: 'error' });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ message: 'Mot de passe modifié avec succès', type: 'success' });
        setShowPasswordChange(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setToast({ message: data.message || 'Échec de la modification', type: 'error' });
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
      location: user?.location || '',
      language: user?.language || 'fr',
      notifications: user?.notifications || true,
      privacy: user?.privacy || 'public',
      programmingLevel: user?.programmingLevel || 'Débutant'
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

  const renderTabButton = (tab) => {
    const isActive = activeTab === tab.id;
    return (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${isActive
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
          : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800'
          }`}
      >
        <tab.icon size={16} />
        {tab.label}
      </button>
    );
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Photo de profil */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName || 'U')}+${encodeURIComponent(user.lastName || '')}&background=8B5CF6&color=fff&size=256`;
                }}
              />
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
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user?.firstName} {user?.lastName}</h3>
          <p className="text-slate-500 dark:text-gray-400">{user?.email}</p>
          <p className="text-xs text-slate-400 dark:text-gray-500 mt-1 uppercase tracking-wider font-bold">Membre depuis {new Date(user?.createdAt || Date.now()).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Informations personnelles */}
      <div className="bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight">Informations personnelles</h4>
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
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-2">Prénom</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all"
                />
              ) : (
                <p className="text-slate-900 dark:text-white font-medium">{user?.firstName || '-'}</p>
              )}
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-2">Nom</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all"
                />
              ) : (
                <p className="text-slate-900 dark:text-white font-medium">{user?.lastName || '-'}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-2">Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={editForm.email}
                disabled={!isEditing}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className={`w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none transition-all ${!isEditing ? 'opacity-60 cursor-not-allowed' : 'focus:border-blue-500'}`}
                placeholder="Votre email"
              />
            </div>
            {isEditing && editForm.email !== user?.email && (
              <p className="text-[10px] text-blue-500 mt-1">* Une vérification sera envoyée à cette nouvelle adresse.</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-2">Téléphone</label>
            {isEditing ? (
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all"
              />
            ) : (
              <p className="text-slate-900 dark:text-white font-medium">{user?.phone || '-'}</p>
            )}
          </div>



          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-2">Localisation</label>
            {isEditing ? (
              <input
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all"
              />
            ) : (
              <p className="text-slate-900 dark:text-white font-medium">{user?.location || '-'}</p>
            )}
          </div>



          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-2">Niveau d'expertise</label>
            {isEditing ? (
              <select
                value={editForm.programmingLevel}
                onChange={(e) => setEditForm({ ...editForm, programmingLevel: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all"
              >
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
              </select>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-slate-900 dark:text-white uppercase tracking-wider font-black text-sm">
                  {editForm.programmingLevel === 'Débutant' ? 'Débutant' :
                    editForm.programmingLevel === 'Intermédiaire' ? 'Intermédiaire' : 'Avancé'}
                </p>
                <span className={`w-2 h-2 rounded-full ${editForm.programmingLevel === 'Débutant' ? 'bg-blue-400' :
                  editForm.programmingLevel === 'Intermédiaire' ? 'bg-yellow-400' : 'bg-purple-400'
                  }`}></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-blue-500 dark:text-blue-400" size={20} />
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500 tracking-widest">Favoris</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{favorites?.length || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-green-500 dark:text-green-400" size={20} />
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500 tracking-widest">En cours</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{Object.keys(progressions || {}).length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-purple-500 dark:text-purple-400" size={20} />
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500 tracking-widest">Série</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{userStats.streak || 0} jours</p>
        </div>
        <div className="bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-orange-500 dark:text-orange-400" size={20} />
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500 tracking-widest">Temps</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{userStats.totalTime || 0}m</p>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm dark:shadow-none">
        <h4 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight mb-6">Sécurité du compte</h4>
        <div className="space-y-4">
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="w-full flex items-center justify-between p-5 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 hover:border-blue-500/30 transition-all group"
          >
            <div className="flex items-center gap-4">
              <Lock className="text-slate-400 dark:text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800 dark:text-white">Changer le mot de passe</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500 tracking-wider">Sécurité renforcée</p>
              </div>
            </div>
            <ChevronRight className={`text-slate-400 dark:text-gray-400 transition-transform ${showPasswordChange ? 'rotate-90' : ''}`} size={20} />
          </button>

          <AnimatePresence>
            {showPasswordChange && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <form onSubmit={handleChangePassword} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4 mt-2">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Mot de passe actuel</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Nouveau mot de passe</label>
                      <input
                        type="password"
                        required
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Confirmer le nouveau</label>
                      <input
                        type="password"
                        required
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Mettre à jour le mot de passe
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => navigate('/two-factor-setup')}
            className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <Shield className="text-blue-500" size={20} />
              <div className="text-left">
                <p className="text-white">Authentification à deux facteurs</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${user.twoFactorEnabled ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <p className={`text-xs ${user.twoFactorEnabled ? 'text-green-400' : 'text-red-400'} font-medium`}>
                    {user.twoFactorEnabled ? 'Activée' : 'Service SMS désactivé (Mode test dispo)'}
                  </p>
                </div>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
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
      <div className="bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-[2.5rem] p-8 shadow-sm dark:shadow-none space-y-8">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white uppercase tracking-tight">
          <Settings size={20} className="text-blue-500" /> Préférences du Compte
        </h4>

        <div className="space-y-6">
          <div
            onClick={async () => {
              const val = !(user?.preferences?.notifications ?? true);
              try {
                const res = await fetch(`${API_URL}/auth/profile`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                  },
                  body: JSON.stringify({ preferences: { ...user.preferences, notifications: val } })
                });
                if (res.ok) {
                  const updated = await res.json();
                  onUpdateUser(updated);
                  setToast({ message: 'Préférences mises à jour', type: 'success' });
                }
              } catch (err) {
                console.error(err);
              }
            }}
            className="flex items-center justify-between p-5 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-200 dark:border-gray-700/50 cursor-pointer hover:border-blue-500/30 transition-colors"
          >
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-800 dark:text-white">Notifications par email</p>
              <p className="text-xs text-slate-500 dark:text-gray-400">Recevoir des emails de notification importants.</p>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-all ${(user?.preferences?.notifications ?? true) ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-gray-700'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${(user?.preferences?.notifications ?? true) ? 'right-1' : 'left-1'}`} />
            </div>
          </div>

          <div
            onClick={async () => {
              const val = !(user?.preferences?.soundEnabled ?? true);
              try {
                const res = await fetch(`${API_URL}/auth/profile`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                  },
                  body: JSON.stringify({ preferences: { ...user.preferences, soundEnabled: val } })
                });
                if (res.ok) {
                  const updated = await res.json();
                  onUpdateUser(updated);
                  setToast({ message: 'Préférences sonores mises à jour', type: 'success' });
                }
              } catch (err) {
                console.error(err);
              }
            }}
            className="flex items-center justify-between p-5 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-200 dark:border-gray-700/50 cursor-pointer hover:border-blue-500/30 transition-colors"
          >
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-800 dark:text-white">Effets Sonores (CyberPet)</p>
              <p className="text-xs text-slate-500 dark:text-gray-400">Activer ou désactiver les bruitages au survol.</p>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-all ${(user?.preferences?.soundEnabled ?? true) ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-gray-700'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${(user?.preferences?.soundEnabled ?? true) ? 'right-1' : 'left-1'}`} />
            </div>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-200 dark:border-gray-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-800 dark:text-white">Langue de l'interface</p>
              <p className="text-xs text-slate-500 dark:text-gray-400">Choisir la langue d'affichage du site.</p>
            </div>
            <select
              value={user?.preferences?.language || 'fr'}
              onChange={async (e) => {
                const val = e.target.value;
                try {
                  const res = await fetch(`${API_URL}/auth/profile`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({ preferences: { ...user.preferences, language: val } })
                  });
                  if (res.ok) {
                    const updated = await res.json();
                    onUpdateUser(updated);
                    setToast({ message: 'Langue mise à jour', type: 'success' });
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-sm font-bold text-white focus:border-blue-500 outline-none transition-colors"
            >
              <option value="fr">Français 🇫🇷</option>
              <option value="en">English 🇬🇧</option>
              <option value="es">Español 🇪🇸</option>
            </select>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-200 dark:border-gray-700/50">
            <div className="space-y-1 mb-4">
              <p className="text-sm font-bold text-slate-800 dark:text-white">Thème Dynamique</p>
              <p className="text-xs text-slate-500 dark:text-gray-400">Gérer l'apparence visuelle pour plus de confort.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={async () => {
                  setTheme('light');
                  try {
                    await fetch(`${API_URL}/auth/profile`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                      body: JSON.stringify({ preferences: { ...user.preferences, theme: 'light' } })
                    });
                  } catch (err) { console.error(err); }
                }}
                className={`py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${theme === 'light' ? 'bg-white dark:bg-gray-700 text-slate-900 dark:text-white border-2 border-blue-500 shadow-md' : 'bg-slate-200 dark:bg-gray-900/50 text-slate-600 dark:text-gray-400 border border-slate-300 dark:border-gray-800 hover:bg-slate-300 dark:hover:bg-gray-800'}`}
              >
                Clair ☀️
              </button>
              <button
                onClick={async () => {
                  setTheme('dark');
                  try {
                    await fetch(`${API_URL}/auth/profile`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                      body: JSON.stringify({ preferences: { ...user.preferences, theme: 'dark' } })
                    });
                  } catch (err) { console.error(err); }
                }}
                className={`py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${theme === 'dark' ? 'bg-white dark:bg-gray-700 text-slate-900 dark:text-white border-2 border-blue-500 shadow-md' : 'bg-slate-200 dark:bg-gray-900/50 text-slate-600 dark:text-gray-400 border border-slate-300 dark:border-gray-800 hover:bg-slate-300 dark:hover:bg-gray-800'}`}
              >
                Sombre 🌙
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm dark:shadow-none">
        <h4 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight mb-6">Activités récentes</h4>
        <div className="space-y-4 text-center py-12">
          <div className="w-16 h-16 bg-slate-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 grayscale opacity-50">
            <TrendingUp size={32} className="text-slate-400 dark:text-gray-600" />
          </div>
          <p className="text-slate-500 dark:text-gray-500 font-medium">Aucune activité enregistrée pour le moment.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Onglets */}
      <div className="flex bg-slate-100 dark:bg-gray-900/50 rounded-2xl p-1 mb-8 border border-slate-200 dark:border-gray-800 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => renderTabButton(tab))}
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
                password: "[Masqué pour votre sécurité - Haché en base de données]",
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

      {/* Modal de confirmation de suppression */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Effet de fond */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 blur-[60px] rounded-full" />

              <div className="relative z-10 text-center space-y-6">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2 group">
                  <Trash2 className="text-red-500 transition-transform group-hover:scale-110" size={32} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white brand-font">
                    {deleteStep === 1 ? 'Action irréversible' : 'Dernière chance'}
                  </h3>
                  <p className="text-gray-400">
                    {deleteStep === 1
                      ? 'Êtes-vous absolument sûr de vouloir supprimer votre compte "Mysterious Classroom" ?'
                      : 'Toutes vos progressions, favoris et données personnelles seront supprimés pour toujours.'}
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  {deleteStep === 1 ? (
                    <button
                      onClick={() => setDeleteStep(2)}
                      className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-500/25"
                    >
                      Oui, je comprends
                    </button>
                  ) : (
                    <button
                      onClick={confirmAccountDeletion}
                      className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-500/25"
                    >
                      Confirmer la suppression
                    </button>
                  )}

                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white font-bold rounded-2xl transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de vérification d'email */}
      <AnimatePresence>
        {showEmailModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10 text-center space-y-6">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Mail className="text-blue-500" size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Vérification de l'email</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Un code à 6 chiffres a été envoyé à <br />
                    <strong className="text-slate-800 dark:text-white">{newEmail}</strong>
                  </p>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    maxLength="6"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full text-center text-3xl tracking-[1em] font-black bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-gray-800 rounded-2xl py-4 focus:border-blue-500 outline-none text-slate-900 dark:text-white"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowEmailModal(false)}
                      className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-300 font-bold rounded-xl transition-all"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleConfirmEmailChange}
                      disabled={otpCode.length !== 6 || isLoading}
                      className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                    >
                      Confirmer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountDetails;
