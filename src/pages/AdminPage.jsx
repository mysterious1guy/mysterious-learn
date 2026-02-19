import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Bell, 
  BookOpen, 
  Settings, 
  Crown,
  Eye,
  Edit,
  Trash2,
  Send,
  BarChart3,
  UserPlus,
  UserMinus,
  Camera,
  Upload,
  AlertTriangle,
  TrendingUp,
  Activity
} from 'lucide-react';

const AdminPage = ({ user, API_URL, setToast }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [emailContent, setEmailContent] = useState({ subject: '', body: '', recipients: 'all' });
  const [notificationContent, setNotificationContent] = useState({ title: '', message: '', type: 'info' });
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0, activeUsers: 0 });
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);

  useEffect(() => {
    console.log('👑 AdminPage: Initialisation pour', user?.email);
    
    if (!user) {
      console.log('❌ AdminPage: Aucun utilisateur - déjà géré par App.jsx');
      return;
    }

    if (user.email !== 'cmouhamedfall@esp.sn' && user.role !== 'admin') {
      console.log('❌ AdminPage: Utilisateur non-admin - déjà géré par App.jsx');
      return;
    }

    console.log('✅ AdminPage: Accès autorisé pour', user.email);
    fetchAdminData();
  }, [user]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Récupérer les stats
      const [usersRes, coursesRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/users`),
        fetch(`${API_URL}/api/courses`)
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
        setStats(prev => ({ ...prev, totalUsers: usersData.length, activeUsers: usersData.filter(u => u.lastLogin).length }));
      }

      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        setCourses(coursesData);
        setStats(prev => ({ ...prev, totalCourses: coursesData.length }));
      }
    } catch (error) {
      console.error('Erreur:', error);
      setToast({ message: 'Erreur de chargement', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const sendEmailToUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailContent)
      });

      if (response.ok) {
        setToast({ message: 'Email envoyé avec succès', type: 'success' });
        setEmailContent({ subject: '', body: '', recipients: 'all' });
      }
    } catch (error) {
      setToast({ message: "Erreur lors de l'envoi de l'email", type: 'error' });
    }
  };

  const sendNotification = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/send-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationContent)
      });

      if (response.ok) {
        setToast({ message: 'Notification envoyée', type: 'success' });
        setNotificationContent({ title: '', message: '', type: 'info' });
      }
    } catch (error) {
      setToast({ message: 'Erreur notification', type: 'error' });
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setUsers(users.filter(u => u._id !== userId));
        setToast({ message: 'Utilisateur supprimé', type: 'success' });
      }
    } catch (error) {
      setToast({ message: 'Erreur suppression', type: 'error' });
    }
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setToast({ message: 'Image trop volumineuse (max 5MB)', type: 'error' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await fetch(`${API_URL}/api/admin/profile-image`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setProfileImage(data.profileImage);
        setToast({ message: 'Photo de profil mise à jour', type: 'success' });
      }
    } catch (error) {
      setToast({ message: 'Erreur upload image', type: 'error' });
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 backdrop-blur-sm border border-blue-600/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm">Total Utilisateurs</p>
              <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
            </div>
            <Users className="text-blue-400" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-600/20 to-green-700/20 backdrop-blur-sm border border-green-600/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm">Utilisateurs Actifs</p>
              <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
            </div>
            <Activity className="text-green-400" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 backdrop-blur-sm border border-purple-600/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm">Total Cours</p>
              <p className="text-3xl font-bold text-white">{stats.totalCourses}</p>
            </div>
            <BookOpen className="text-purple-400" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 backdrop-blur-sm border border-yellow-600/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm">Taux Croissance</p>
              <p className="text-3xl font-bold text-white">+24%</p>
            </div>
            <TrendingUp className="text-yellow-400" size={32} />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users size={20} />
            Utilisateurs Récents
          </h3>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user._id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.firstName?.[0] || user.email?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  user.verified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {user.verified ? 'Vérifié' : 'En attente'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen size={20} />
            Cours Populaires
          </h3>
          <div className="space-y-3">
            {courses.slice(0, 5).map((course) => (
              <div key={course._id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">{course.title}</p>
                  <p className="text-gray-400 text-sm">{course.students} étudiants</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <span>{course.rating}</span>
                  <span>⭐</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users size={24} />
          Gestion des Utilisateurs
        </h2>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition flex items-center gap-2">
          <UserPlus size={16} />
          Ajouter Utilisateur
        </button>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Inscription</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-700/30 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.firstName?.[0] || user.email?.[0]?.toUpperCase()}
                      </div>
                      <span className="text-white font-medium">{user.firstName} {user.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.verified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {user.verified ? 'Vérifié' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300 transition">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-yellow-400 hover:text-yellow-300 transition">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteUser(user._id)}
                        className="p-1 text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Bell size={24} />
        Notifications Globales
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Envoyer une Notification</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
              <input
                type="text"
                value={notificationContent.title}
                onChange={(e) => setNotificationContent({...notificationContent, title: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="Titre de la notification"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                value={notificationContent.message}
                onChange={(e) => setNotificationContent({...notificationContent, message: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none h-32"
                placeholder="Contenu de la notification"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={notificationContent.type}
                onChange={(e) => setNotificationContent({...notificationContent, type: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="info">Information</option>
                <option value="success">Succès</option>
                <option value="warning">Attention</option>
                <option value="error">Erreur</option>
              </select>
            </div>
            <button
              onClick={sendNotification}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Envoyer la Notification
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Envoyer un Email</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Destinataires</label>
              <select
                value={emailContent.recipients}
                onChange={(e) => setEmailContent({...emailContent, recipients: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Tous les utilisateurs</option>
                <option value="verified">Utilisateurs vérifiés</option>
                <option value="unverified">Utilisateurs non vérifiés</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sujet</label>
              <input
                type="text"
                value={emailContent.subject}
                onChange={(e) => setEmailContent({...emailContent, subject: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="Sujet de l'email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contenu</label>
              <textarea
                value={emailContent.body}
                onChange={(e) => setEmailContent({...emailContent, body: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none h-32"
                placeholder="Contenu de l'email"
              />
            </div>
            <button
              onClick={sendEmailToUsers}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              Envoyer l'Email
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-7xl mx-auto p-6 pt-24">
        {/* Header Admin */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <Crown size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Panneau d'Administration</h1>
                <p className="text-gray-400">Bienvenue, {user?.firstName} {user?.lastName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'notifications' && renderNotifications()}
        {activeTab === 'courses' && (
          <div className="text-center text-gray-400 py-20">
            Gestion des cours - Bientôt disponible
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="text-center text-gray-400 py-20">
            Paramètres système - Bientôt disponible
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
