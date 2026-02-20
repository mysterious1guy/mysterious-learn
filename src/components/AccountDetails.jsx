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
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
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
            <div className="flex gap-2">
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                disabled={!isEditing}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500 ${!isEditing ? 'opacity-60' : ''}`}
                placeholder="Votre email"
              />
              {isEditing && (
                <div className="flex items-center text-xs text-yellow-500 bg-yellow-500/10 px-2 rounded-lg border border-yellow-500/20">
                  <Shield size={12} className="mr-1" />
                  Nécessite vérification
                </div>
              )}
            </div>
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
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <Lock className="text-gray-400" size={20} />
              <div className="text-left">
                <p className="text-white">Changer le mot de passe</p>
                <p className="text-sm text-gray-400">Dernière modification: Inconnue</p>
              </div>
            </div>
            <ChevronRight className={`text-gray-400 transition-transform ${showPasswordChange ? 'rotate-90' : ''}`} size={20} />
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
            onClick={() => navigate('/2fa-setup')}
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
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4">Préférences</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Notifications par email</p>
              <p className="text-sm text-gray-400">Recevoir des emails de notification</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={user?.preferences?.notifications ?? true}
                onChange={async (e) => {
                  const val = e.target.checked;
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
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Langue</p>
              <p className="text-sm text-gray-400">Choisir la langue de l'interface</p>
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
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 outline-none"
            >
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
              onChange={async (e) => {
                const val = e.target.value;
                setTheme(val);
                try {
                  await fetch(`${API_URL}/auth/profile`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({ preferences: { ...user.preferences, theme: val } })
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
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
              <p className="text-sm text-gray-400">{user?.lastLogin ? formatTimeAgo(user.lastLogin) : 'Première connexion'}</p>
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
              className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
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
    </div>
  );
};

export default AccountDetails;
