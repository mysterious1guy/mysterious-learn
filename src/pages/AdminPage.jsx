import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Mail, Bell, BookOpen, Settings, Crown, Eye, Edit, Trash2, Send,
  BarChart3, UserPlus, UserMinus, Camera, Upload, AlertTriangle, TrendingUp,
  Activity, LayoutDashboard, Database, Shield, LogOut, Search, Filter,
  CheckCircle, XCircle, RefreshCw, ChevronRight, Menu, X, Megaphone, Save,
  Sparkles, Bot, Globe, User
} from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import { formatTimeAgo } from '../utils/dateUtils';

const AdminPage = ({ user, onUpdateUser, API_URL, setToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0, verifiedUsers: 0, unverifiedUsers: 0,
    totalCourses: 0, activeUsers: 0, growthRate: '0%'
  });
  const [emailContent, setEmailContent] = useState({ subject: '', body: '', recipients: 'all', specificEmail: '' });
  const [notificationContent, setNotificationContent] = useState({ title: '', message: '', type: 'info', sendEmail: false });
  const [notifications, setNotifications] = useState([]);
  const [aiKnowledge, setAiKnowledge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [config, setConfig] = useState({
    creatorName: '',
    siteName: '',
    maintenanceMode: false,
    creatorBio: [],
    creatorAvatar: '',
    creatorTitle: '',
    footerText: ''
  });
  const [showAIBrainModal, setShowAIBrainModal] = useState(false);
  const [aiBrainFormData, setAIBrainFormData] = useState({ title: '', content: '', category: 'general', tags: '', source: '' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => { } });
  const [selectedUserStats, setSelectedUserStats] = useState(null);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const fileInputRef = useRef(null);
  const configAvatarRef = useRef(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    console.log('AdminPage: Fetching initial data...');
    try {
      const headers = { Authorization: `Bearer ${user.token}` };
      const endpoints = [
        { key: 'users', url: `${API_URL}/admin/users` },
        { key: 'stats', url: `${API_URL}/admin/stats` },
        { key: 'courses', url: `${API_URL}/courses` },
        { key: 'notifications', url: `${API_URL}/admin/notifications` },
        { key: 'config', url: `${API_URL}/site-config` },
        { key: 'ai', url: `${API_URL}/ai/knowledge` }
      ];

      const results = await Promise.allSettled(
        endpoints.map(e => fetch(e.url, { headers }))
      );

      // Process results individually
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const endpoint = endpoints[i];

        if (result.status === 'fulfilled' && result.value.ok) {
          const data = await result.value.json();
          switch (endpoint.key) {
            case 'users': setUsers(data); break;
            case 'stats': setStats(data); break;
            case 'courses': setCourses(data); break;
            case 'notifications': setNotifications(data); break;
            case 'config': setConfig(data); break;
            case 'ai': setAiKnowledge(data); break;
            default: break;
          }
        } else {
          console.warn(`AdminPage: Failed to fetch ${endpoint.key}`, result.reason || 'Status not OK');
        }
      }
    } catch (err) {
      console.error('AdminPage: Critical fetch error', err);
      setToast({ message: 'Erreur de connexion partielle au serveur', type: 'warning' });
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/admin/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(emailContent)
      });
      const data = await res.json();
      if (res.ok) {
        setEmailContent({ subject: '', body: '', recipients: 'all', specificEmail: '' });
      } else {
        setToast({ message: data.message || "Échec de l'envoi", type: 'error' });
      }
    } catch (err) {
      setToast({ message: "Erreur réseau lors de l'envoi", type: 'error' });
    }
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/admin/send-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(notificationContent)
      });
      if (res.ok) {
        setNotificationContent({ title: '', message: '', type: 'info', sendEmail: false });
        fetchData(); // Rafraîchir la liste
      }
    } catch (err) {
      setToast({ message: "Échec de la diffusion", type: 'error' });
    }
  };

  const handleDeleteNotification = async (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Supprimer l'annonce",
      message: "Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est immédiate.",
      onConfirm: async () => {
        try {
          const res = await fetch(`${API_URL}/admin/notifications/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${user.token}` }
          });
          if (res.ok) {
            setNotifications(notifications.filter(n => n._id !== id));
            setConfirmModal({ ...confirmModal, isOpen: false });
          }
        } catch (err) {
          setToast({ message: 'Erreur suppression', type: 'error' });
        }
      }
    });
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        setToast({ message: 'Rôle mis à jour !', type: 'success' });
      } else {
        const data = await res.json();
        setToast({ message: data.message || "Erreur de mise à jour", type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Erreur réseau', type: 'error' });
    }
  };

  const handleDeleteUser = async (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Supprimer l'utilisateur",
      message: "Voulez-vous vraiment supprimer cet utilisateur ? Toutes ses données seront perdues.",
      onConfirm: async () => {
        try {
          const target = users.find(u => u._id === id);
          if (target?.role === 'admin') {
            setToast({ message: 'Impossible de supprimer un admin', type: 'error' });
            setConfirmModal({ ...confirmModal, isOpen: false });
            return;
          }

          const res = await fetch(`${API_URL}/admin/users/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${user.token}` }
          });
          if (res.ok) {
            setUsers(users.filter(u => u._id !== id));
            setConfirmModal({ ...confirmModal, isOpen: false });
          }
        } catch (err) {
          setToast({ message: 'Erreur suppression', type: 'error' });
        }
      }
    });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch(`${API_URL}/user/avatar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        onUpdateUser({ avatar: data.avatar });
      }
    } catch (err) {
      setToast({ message: "Erreur lors de l'envoi", type: 'error' });
    }
  };

  const handleUpdateConfig = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/site-config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        setToast({ message: 'Configuration mise à jour !', type: 'success' });
      } else {
        setToast({ message: 'Échec de la mise à jour', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Erreur réseau', type: 'error' });
    }
  };

  const handleConfigAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setConfig({ ...config, creatorAvatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAIKnowledge = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...aiBrainFormData,
        id: aiBrainFormData._id,
        tags: aiBrainFormData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
      };

      const res = await fetch(`${API_URL}/ai/knowledge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(formattedData)
      });

      if (res.ok) {
        setToast({ message: 'Cerveau mis à jour ! 🧠', type: 'success' });
        setShowAIBrainModal(false);
        fetchData();
      }
    } catch (err) {
      setToast({ message: 'Erreur mise à jour cerveau', type: 'error' });
    }
  };

  const handleDeleteAIKnowledge = async (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Oublier cette connaissance ?",
      message: "L'IA n'aura plus accès à ces informations.",
      onConfirm: async () => {
        try {
          const res = await fetch(`${API_URL}/ai/knowledge/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${user.token}` }
          });
          if (res.ok) {
            setAiKnowledge(aiKnowledge.filter(k => k._id !== id));
            setConfirmModal({ ...confirmModal, isOpen: false });
          }
        } catch (err) {
          setToast({ message: 'Erreur suppression', type: 'error' });
        }
      }
    });
  };

  const handleViewUserStats = async (userId) => {
    setLoadingStats(true);
    setIsStatsModalOpen(true);
    setSelectedUserStats(null);
    try {
      const res = await fetch(`${API_URL}/activity/user-stats/${userId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const targetUser = users.find(u => u._id === userId);
        setSelectedUserStats({ ...data, user: targetUser });
      } else {
        setToast({ message: "Erreur récupération stats", type: 'error' });
      }
    } catch (err) {
      setToast({ message: "Erreur réseau", type: 'error' });
    } finally {
      setLoadingStats(false);
    }
  };

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    ...(user?.adminTier === 'owner' || user?.email === 'mouhamedfall@esp.sn' ? [
      { id: 'users', label: 'Utilisateurs', icon: Users },
      { id: 'notifications', label: 'Communications', icon: Bell }
    ] : []),
    { id: 'courses', label: 'Gestion des cours', icon: BookOpen },
    { id: 'ai-brain', label: 'Cerveau de l\'IA', icon: Sparkles },
    ...(user?.adminTier === 'owner' || user?.email === 'mouhamedfall@esp.sn' ? [
      { id: 'config', label: 'Configuration Site', icon: LayoutDashboard },
      { id: 'settings', label: 'Paramètres', icon: Settings }
    ] : [])
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-300">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col z-50`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-black text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ADMIN</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative group">
              {user?.avatar ? (
                <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer" />
              ) : (
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">{user?.firstName?.[0]}</div>
              )}
              <button onClick={() => fileInputRef.current.click()} className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                <Camera size={12} />
              </button>
              <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleAvatarChange} />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] text-slate-500 dark:text-white/60 truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 pt-24">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white">Bonjour, Mouhamed ! 👋</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Voici ce qu'il se passe sur Mysterious Classroom aujourd'hui.</p>
                  </div>
                  <button onClick={fetchData} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors shadow-sm dark:shadow-none">
                    <RefreshCw size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Utilisateurs', value: stats.totalUsers, icon: Users, color: 'blue' },
                    { label: 'Vérifiés', value: stats.verifiedUsers, icon: CheckCircle, color: 'green' },
                    { label: 'Cours', value: stats.totalCourses, icon: BookOpen, color: 'purple' },
                    { label: 'Actifs', value: stats.activeUsers, icon: Activity, color: 'orange' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl overflow-hidden relative group">
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-${s.color}-600/5 dark:bg-${s.color}-600/10 blur-3xl -mr-12 -mt-12 transition-transform group-hover:scale-150`} />
                      <div className={`p-3 bg-${s.color}-500/10 dark:bg-${s.color}-600/20 text-${s.color}-600 dark:text-${s.color}-400 rounded-2xl w-fit mb-4`}>
                        <s.icon size={24} />
                      </div>
                      <p className="text-slate-500 dark:text-white/60 text-xs font-bold uppercase tracking-widest">{s.label}</p>
                      <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm dark:shadow-none">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Utilisateurs Récents</h2>
                    <div className="space-y-4">
                      {users.slice(-5).reverse().map(u => (
                        <div
                          key={u._id}
                          onClick={() => handleViewUserStats(u._id)}
                          className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">
                              {u.firstName?.[0]}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800 dark:text-white">{u.firstName} {u.lastName}</p>
                              <p className="text-[10px] text-slate-400 dark:text-white/40 uppercase tracking-widest">{u.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity size={10} className={u.lastLogin && (new Date() - new Date(u.lastLogin)) < 300000 ? "text-green-500 animate-pulse" : "text-slate-600 dark:text-slate-400"} />
                            <p className="text-[10px] text-slate-500 dark:text-white/60">Actif {formatTimeAgo(u.lastLogin)}</p>
                          </div>
                          <ChevronRight size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm dark:shadow-none">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Annonces Systèmes</h2>
                    <div className="space-y-4">
                      {notifications.slice(0, 5).map(n => (
                        <div key={n._id} className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                          <p className="text-sm font-bold text-slate-800 dark:text-white">{n.title}</p>
                          <p className="text-xs text-slate-500 dark:text-white/40 line-clamp-1">{n.message}</p>
                        </div>
                      ))}
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-sm"><span className="font-bold text-slate-800 dark:text-white">Serveur :</span> Opérationnel (100%)</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <p className="text-sm"><span className="font-bold text-slate-800 dark:text-white">Base de données :</span> Connectée</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <p className="text-sm"><span className="font-bold text-slate-800 dark:text-white">Email Service :</span> Prêt</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <Users size={32} className="text-blue-600 dark:text-blue-400" /> Gestion des Utilisateurs
                  </h2>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm dark:shadow-2xl">
                  <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row gap-6 justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" size={18} />
                      <input
                        type="text"
                        placeholder="Rechercher par nom ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white transition-all shadow-inner dark:shadow-none"
                      />
                    </div>
                  </div>

                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                      <tr>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500">Utilisateur</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500">Rôle</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500">Status</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500">Inscrit</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredUsers.map(u => (
                        <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-5 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-blue-600/10 dark:bg-blue-600 text-blue-600 dark:text-white rounded-full flex items-center justify-center font-black transition-colors">
                                {u.firstName?.[0]}{u.lastName?.[0]}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-white">{u.firstName} {u.lastName}</p>
                                <p className="text-xs text-slate-400 dark:text-gray-500">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-center">
                              <select
                                value={u.role}
                                onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                                disabled={u._id === user.id} // Don't allow self-demotion easily here
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer outline-none appearance-none text-center min-w-[100px]
                                  ${u.role === 'admin'
                                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                                  } ${u._id === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                <option value="user">USER</option>
                                <option value="admin">ADMIN</option>
                              </select>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-center">
                              {u.isEmailVerified ? (
                                <div className="p-1.5 bg-green-500/10 text-green-600 dark:text-green-500 rounded-lg" title="Email Vérifié">
                                  <CheckCircle size={18} />
                                </div>
                              ) : (
                                <div className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-lg" title="Non Vérifié">
                                  <XCircle size={18} />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleViewUserStats(u._id)}
                                className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-blue-600 dark:text-blue-400 transition-all hover:scale-110 active:scale-90 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none"
                                title="Statistiques d'apprentissage"
                              >
                                <TrendingUp size={16} />
                              </button>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              disabled={u.role === 'admin'}
                              className={`p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm dark:shadow-none 
                                ${u.role === 'admin' ? 'opacity-20 cursor-not-allowed' : 'text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:border-red-500/30 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/5'}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredUsers.length === 0 && (
                    <div className="p-24 text-center">
                      <Users size={48} className="mx-auto text-slate-800 mb-4" />
                      <p className="text-white/40 font-bold">Aucun voyageur ne correspond à cette recherche.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'email' && (
              <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-3xl shadow-sm dark:shadow-none"><Mail size={32} /></div>
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white">Diffusion d'E-mails</h2>
                </div>

                <form onSubmit={handleSendEmail} className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase text-slate-500 dark:text-white/60 tracking-wider">Destinataires</label>
                      <select
                        value={emailContent.recipients}
                        onChange={(e) => setEmailContent({ ...emailContent, recipients: e.target.value })}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white transition-all shadow-inner dark:shadow-none"
                      >
                        <option value="all">Tous les utilisateurs</option>
                        <option value="verified">Verified uniquement</option>
                        <option value="unverified">Non-vérifiés</option>
                        <option value="specific">Un utilisateur spécifique</option>
                      </select>
                    </div>
                    {emailContent.recipients === 'specific' && (
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase text-slate-500 dark:text-white/60 tracking-wider">Email spécifique</label>
                        <input
                          type="email"
                          list="user-emails"
                          placeholder="email@example.com"
                          value={emailContent.specificEmail}
                          onChange={(e) => setEmailContent({ ...emailContent, specificEmail: e.target.value })}
                          className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white transition-all shadow-inner dark:shadow-none"
                        />
                        <datalist id="user-emails">
                          {users.map(u => (
                            <option key={u._id} value={u.email}>{u.firstName} {u.lastName}</option>
                          ))}
                        </datalist>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-slate-500 dark:text-white/60 tracking-wider">Objet du message</label>
                    <input
                      type="text"
                      required
                      value={emailContent.subject}
                      onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white transition-all shadow-inner dark:shadow-none"
                      placeholder="Ex: Nouvelle mise à jour disponible !"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-slate-500 dark:text-white/60 tracking-wider">Contenu (HTML supporté)</label>
                    <textarea
                      required
                      rows="10"
                      value={emailContent.body}
                      onChange={(e) => setEmailContent({ ...emailContent, body: e.target.value })}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 resize-none text-slate-900 dark:text-white transition-all shadow-inner dark:shadow-none font-mono text-sm"
                      placeholder="Écrivez votre message ici..."
                    />
                  </div>

                  <button className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-blue-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    <Send size={20} /> ENVOYER L'EMAIL
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div key="notif" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-orange-600/20 text-orange-600 dark:text-orange-400 rounded-3xl shadow-sm dark:shadow-none"><Bell size={32} /></div>
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white">Diffusion d'Annonces Site</h2>
                </div>

                <form onSubmit={handleSendNotification} className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-slate-500 dark:text-white/60 tracking-wider">Titre de l'alerte</label>
                    <input
                      type="text"
                      placeholder="Titre de l'alerte"
                      value={notificationContent.title}
                      onChange={(e) => setNotificationContent({ ...notificationContent, title: e.target.value })}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-orange-500 text-slate-900 dark:text-white transition-all shadow-inner dark:shadow-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-slate-500 dark:text-white/60 tracking-wider">Type d'annonce</label>
                    <select
                      value={notificationContent.type}
                      onChange={(e) => setNotificationContent({ ...notificationContent, type: e.target.value })}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-orange-500 text-slate-900 dark:text-white transition-all shadow-inner dark:shadow-none"
                    >
                      <option value="info">💡 Information (Bleu)</option>
                      <option value="announcement">📢 Annonce (Violet)</option>
                      <option value="warning">⚠️ Alerte (Orange)</option>
                      <option value="success">✅ Succès (Vert)</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-slate-500 dark:text-white/60 tracking-wider">Message court</label>
                    <textarea
                      placeholder="Message court pour la cloche..."
                      rows="4"
                      value={notificationContent.message}
                      onChange={(e) => setNotificationContent({ ...notificationContent, message: e.target.value })}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-orange-500 resize-none text-slate-900 dark:text-white transition-all shadow-inner dark:shadow-none"
                    ></textarea>
                  </div>

                  <button className="w-full py-5 bg-gradient-to-r from-orange-600 to-red-600 text-white font-black rounded-2xl shadow-xl shadow-orange-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    <Megaphone size={20} /> DIFFUSER L'ANNONCE
                  </button>

                  <label className="flex items-center gap-3 cursor-pointer group mt-4">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={notificationContent.sendEmail}
                        onChange={(e) => setNotificationContent({ ...notificationContent, sendEmail: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:bg-orange-600 transition-colors"></div>
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 peer-checked:bg-white transition-all"></div>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">Diffuser aussi par Email</span>
                  </label>
                </form>

                {/* Liste des annonces */}
                <div className="mt-12 space-y-4">
                  <h3 className="text-sm font-black uppercase text-slate-500 dark:text-white/60 tracking-widest pl-2">Annonces Actives</h3>
                  <div className="space-y-3">
                    {notifications.map(n => (
                      <div key={n._id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl group transition-all hover:border-slate-300 dark:hover:border-slate-700">
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{n.title}</p>
                          <p className="text-[10px] text-slate-500 dark:text-white/60 truncate">{n.message}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNotification(n._id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <p className="text-center py-8 text-xs text-slate-400 italic">Aucune annonce active</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div key="courses" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black text-white">Gestion des Cours</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map(course => (
                    <div key={course._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm dark:shadow-xl group hover:border-blue-500/50 transition-all flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-500/20">{course.category}</span>
                        <button onClick={() => navigate(`/course/${course._id}`)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm" title="Voir le cours">
                          <Eye size={18} />
                        </button>
                      </div>
                      <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3">{course.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 line-clamp-2 flex-grow leading-relaxed">{course.description}</p>
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2"><BookOpen size={14} className="text-blue-500" /> {course.chapters?.length || 0} chapitres</div>
                        <div className="flex items-center gap-2"><Users size={14} className="text-purple-500" /> {course.level || 'Tous'}</div>
                      </div>
                    </div>
                  ))}

                  {/* Card for AlgoCourse specifically as it might not be in the Mongo DB depending on the seed */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm dark:shadow-xl group hover:border-purple-500/50 transition-all flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-3xl rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-100 dark:border-purple-500/20">Fondamentaux</span>
                      <button onClick={() => navigate(`/course/algo`)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all shadow-sm" title="Voir le cours">
                        <Eye size={18} />
                      </button>
                    </div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3">Algorithmique</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 line-clamp-2 flex-grow leading-relaxed">Mondial Algo Grimoire - Le cours interactif ultime pour comprendre la logique.</p>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2"><BookOpen size={14} className="text-purple-500" /> 7 modules</div>
                      <div className="flex items-center gap-2"><Users size={14} className="text-blue-500" /> Débutant</div>
                    </div>
                  </div>

                  {courses.length === 0 && (
                    <div className="col-span-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-[3rem] text-slate-600">
                      <BookOpen size={48} className="mb-4 opacity-20" />
                      <p className="font-bold">Aucun cours trouvé dans la base de données.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'config' && config && (
              <motion.div key="config" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 max-w-5xl">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-4">
                    <Globe size={32} className="text-blue-600 dark:text-blue-400" /> Configuration du Site
                  </h2>
                  <button onClick={handleUpdateConfig} className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-all flex items-center gap-3">
                    <Save size={20} /> ENREGISTRER L'ÉTAT
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Infos Site */}
                  <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl space-y-8">
                    <h3 className="text-sm font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest flex items-center gap-2">
                      <LayoutDashboard size={20} /> Identité Digitale
                    </h3>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 dark:text-white/40 tracking-wider">Nom de la Plateforme</label>
                      <input
                        type="text"
                        value={config.siteName}
                        onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white shadow-inner dark:shadow-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 dark:text-white/40 tracking-wider">Note de Bas de Page</label>
                      <textarea
                        value={config.footerText}
                        onChange={(e) => setConfig({ ...config, footerText: e.target.value })}
                        rows="3"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white shadow-inner dark:shadow-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Infos Créateur */}
                  <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl space-y-8">
                    <h3 className="text-sm font-black uppercase text-purple-600 dark:text-purple-400 tracking-widest flex items-center gap-2">
                      <User size={20} /> Profil du Maître
                    </h3>
                    <div className="flex items-center gap-6 mb-4">
                      <div className="relative group">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner group-hover:border-purple-500/50 transition-all">
                          {config.creatorAvatar?.length <= 2 ? (
                            <span className="text-2xl font-black text-purple-600 dark:text-white">{config.creatorAvatar}</span>
                          ) : (
                            <img src={config.creatorAvatar} alt="Creator" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <button onClick={() => configAvatarRef.current.click()} className="absolute -bottom-1 -right-1 p-2 bg-purple-600 text-white rounded-lg shadow-lg hover:scale-110 transition-all">
                          <Camera size={14} />
                        </button>
                        <input ref={configAvatarRef} type="file" hidden accept="image/*" onChange={handleConfigAvatarChange} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 dark:text-white/40 tracking-wider">Identifiant Visuel</label>
                        <input
                          type="text"
                          value={config.creatorAvatar}
                          onChange={(e) => setConfig({ ...config, creatorAvatar: e.target.value })}
                          placeholder="Initiales ou URL..."
                          className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-purple-500 text-slate-900 dark:text-white transition-all text-xs"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 dark:text-white/40 tracking-wider">Nom Complet</label>
                        <input
                          type="text"
                          value={config.creatorName}
                          onChange={(e) => setConfig({ ...config, creatorName: e.target.value })}
                          className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-purple-500 text-slate-900 dark:text-white shadow-inner dark:shadow-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 dark:text-white/40 tracking-wider">Profession / Titre</label>
                        <input
                          type="text"
                          value={config.creatorTitle}
                          onChange={(e) => setConfig({ ...config, creatorTitle: e.target.value })}
                          className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-purple-500 text-slate-900 dark:text-white shadow-inner dark:shadow-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio & Bio lines */}
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl space-y-8 md:col-span-2">
                  <h3 className="text-sm font-black uppercase text-amber-600 dark:text-amber-500 tracking-widest flex items-center gap-2">
                    <Database size={20} /> Parcours & Expertise (Points listés)
                  </h3>
                  <div className="space-y-4">
                    {config.creatorBio.map((line, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => {
                            const newBio = [...config.creatorBio];
                            newBio[index] = e.target.value;
                            setConfig({ ...config, creatorBio: newBio });
                          }}
                          className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-2xl outline-none"
                        />
                        <button
                          onClick={() => {
                            const newBio = config.creatorBio.filter((_, i) => i !== index);
                            setConfig({ ...config, creatorBio: newBio });
                          }}
                          className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setConfig({ ...config, creatorBio: [...config.creatorBio, 'Nouveau point...'] })}
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                    >
                      <UserPlus size={16} /> Ajouter une ligne
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai-brain' && (
              <motion.div key="ai" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <Database size={32} className="text-blue-600 dark:text-blue-400" /> Cerveau de l'IA
                  </h2>
                  <button
                    onClick={() => {
                      setAIBrainFormData({ title: '', content: '', category: 'general', tags: '', source: '' });
                      setShowAIBrainModal(true);
                    }}
                    className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40"
                  >
                    <UserPlus size={20} /> NOUVELLE CONNAISSANCE
                  </button>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm dark:shadow-2xl">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                      <tr>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500">Document / Titre</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500">Catégorie</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500">Mise à jour</th>
                        <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {aiKnowledge.map(k => (
                        <tr key={k._id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6">
                            <div>
                              <p className="text-sm font-bold text-slate-800 dark:text-white">{k.title}</p>
                              <div className="flex gap-1 mt-1">
                                {k.tags?.split(',').map((t, idx) => (
                                  <span key={idx} className="text-[9px] font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded uppercase">
                                    {t.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <span className="text-[10px] font-black uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                              {k.category}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <p className="text-[10px] font-mono text-slate-400 dark:text-white/20">{new Date(k.updatedAt).toLocaleDateString()}</p>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setAIBrainFormData({ ...k });
                                  setShowAIBrainModal(true);
                                }}
                                className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteAIKnowledge(k._id)}
                                className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {aiKnowledge.length === 0 && (
                    <div className="p-20 text-center text-slate-400 dark:text-slate-600">
                      <Sparkles size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Aucun document dans le cerveau central.</p>
                    </div>
                  )}
                </div>

                {/* AI Knowledge Modal */}
                {showAIBrainModal && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-3xl p-10 max-h-[90vh] overflow-y-auto shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -mr-32 -mt-32" />
                      <div className="relative z-10 flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Document de Connaissance</h2>
                        <button onClick={() => setShowAIBrainModal(false)} className="text-slate-400 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors"><X size={24} /></button>
                      </div>

                      <form onSubmit={handleSaveAIKnowledge} className="relative z-10 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-500 dark:text-white/60 tracking-wider pl-1">Titre</label>
                            <input
                              type="text"
                              required
                              value={aiBrainFormData.title}
                              onChange={(e) => setAIBrainFormData({ ...aiBrainFormData, title: e.target.value })}
                              className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white shadow-inner dark:shadow-none transition-all"
                              placeholder="Ex: Les bases de la récursivité"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-500 dark:text-white/60 tracking-wider pl-1">Catégorie</label>
                            <select
                              value={aiBrainFormData.category}
                              onChange={(e) => setAIBrainFormData({ ...aiBrainFormData, category: e.target.value })}
                              className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white shadow-inner dark:shadow-none transition-all"
                            >
                              <option value="general">Général</option>
                              <option value="pedagogy">Pédagogie</option>
                              <option value="research">Recherche / Documentation</option>
                              <option value="documentation">Documentation Technique</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-500 dark:text-white/60 tracking-wider pl-1">Tags (séparés par des virgules)</label>
                          <input
                            type="text"
                            value={aiBrainFormData.tags}
                            onChange={(e) => setAIBrainFormData({ ...aiBrainFormData, tags: e.target.value })}
                            className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white shadow-inner dark:shadow-none transition-all"
                            placeholder="algorithme, récursivité, base"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-500 dark:text-white/40 tracking-wider pl-1">Contenu Systémique (Base de Connaissance)</label>
                          <textarea
                            required
                            rows="8"
                            value={aiBrainFormData.content}
                            onChange={(e) => setAIBrainFormData({ ...aiBrainFormData, content: e.target.value })}
                            className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white shadow-inner dark:shadow-none transition-all resize-none font-mono text-xs"
                            placeholder="Indiquez ici les informations que l'IA doit posséder..."
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-500 dark:text-white/40 tracking-wider pl-1">Source de Validation</label>
                          <input
                            type="text"
                            value={aiBrainFormData.source}
                            onChange={(e) => setAIBrainFormData({ ...aiBrainFormData, source: e.target.value })}
                            className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-slate-900 dark:text-white shadow-inner dark:shadow-none transition-all"
                            placeholder="Ex: Documentation MDN, Livre de l'auteur..."
                          />
                        </div>

                        <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40">
                          ENREGISTRER DANS LE CERVEAU
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-5xl space-y-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-3xl shadow-sm dark:shadow-none"><Settings size={32} /></div>
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white">Paramètres Avancés du Système</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* AI Engine Behavior */}
                  <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors transition-all" />
                    <h3 className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[0.2em] flex items-center gap-2">
                      <Bot size={18} /> Cerveau de l'IA (LLM)
                    </h3>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <label className="text-xs font-black text-slate-600 dark:text-white/60 uppercase tracking-widest">Créativité (Température)</label>
                          <span className="text-[10px] font-black font-mono text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded">
                            {config.aiTemperature} ({config.aiTemperature < 0.4 ? 'Précis' : config.aiTemperature < 0.8 ? 'Équilibré' : 'Créatif'})
                          </span>
                        </div>
                        <input
                          type="range"
                          className="w-full accent-blue-600 cursor-pointer"
                          min="0"
                          max="100"
                          value={config.aiTemperature * 100}
                          onChange={(e) => setConfig({ ...config, aiTemperature: e.target.value / 100 })}
                        />
                        <p className="text-[9px] text-slate-400 dark:text-white/30 italic">Une valeur plus haute rend l'Assistant plus imprévisible mais plus "humain".</p>
                      </div>

                      <div
                        onClick={() => setConfig({ ...config, aiMemory: !config.aiMemory })}
                        className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800/50 cursor-pointer hover:border-blue-500/30 transition-all group/toggle"
                      >
                        <div className="space-y-1">
                          <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">Mémoire Multi-Session</p>
                          <p className="text-[10px] text-slate-400 dark:text-white/40">L'IA se souvient des discussions passées.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${config.aiMemory ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-slate-200 dark:bg-slate-800'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${config.aiMemory ? 'right-1' : 'left-1'}`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gamification & Logic */}
                  <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-3xl -mr-16 -mt-16 group-hover:bg-purple-600/10 transition-all" />
                    <h3 className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 tracking-[0.2em] flex items-center gap-2">
                      <Sparkles size={18} /> Gamification & Engagement
                    </h3>

                    <div className="space-y-6">
                      <div
                        onClick={() => setConfig({ ...config, gamificationStreaks: !config.gamificationStreaks })}
                        className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800/50 cursor-pointer hover:border-purple-500/30 transition-all group/toggle"
                      >
                        <div className="space-y-1">
                          <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">Système de Streaks</p>
                          <p className="text-[10px] text-slate-400 dark:text-white/40">Encourager la connexion quotidienne.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${config.gamificationStreaks ? 'bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.4)]' : 'bg-slate-200 dark:bg-slate-800'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${config.gamificationStreaks ? 'right-1' : 'left-1'}`} />
                        </div>
                      </div>

                      <div
                        onClick={() => setConfig({ ...config, gamificationBadges: !config.gamificationBadges })}
                        className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800/50 cursor-pointer hover:border-purple-500/30 transition-all group/toggle"
                      >
                        <div className="space-y-1">
                          <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">Badges Dynamiques</p>
                          <p className="text-[10px] text-slate-400 dark:text-white/40">Génération de succès via l'IA.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${config.gamificationBadges ? 'bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.4)]' : 'bg-slate-200 dark:bg-slate-800'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${config.gamificationBadges ? 'right-1' : 'left-1'}`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UI & Theme Force */}
                  <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl space-y-8 md:col-span-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 blur-[100px] -mr-32 -mt-32" />
                    <h3 className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-500 tracking-[0.2em] flex items-center gap-2">
                      <LayoutDashboard size={18} /> Expérience Visuelle Globale
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="p-6 bg-slate-50 dark:bg-slate-950/50 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 space-y-4">
                        <p className="text-[10px] font-black uppercase text-slate-500 dark:text-white/40 tracking-widest pl-1">Configuration du Thème</p>
                        <div className="grid grid-cols-2 gap-2">
                          {['AUTO', 'DARK'].map(mode => (
                            <button
                              key={mode}
                              onClick={() => setConfig({ ...config, themeForce: mode })}
                              className={`py-2.5 rounded-xl text-[10px] font-black transition-all border ${config.themeForce === mode ? 'bg-amber-500 border-amber-400 text-white shadow-lg' : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-amber-500/50'}`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div
                        onClick={() => setConfig({ ...config, ultraImmersiveMode: !config.ultraImmersiveMode })}
                        className="p-6 bg-slate-50 dark:bg-slate-950/50 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 space-y-5 cursor-pointer hover:border-amber-500/30 transition-all group/toggle"
                      >
                        <p className="text-[10px] font-black uppercase text-slate-500 dark:text-white/40 tracking-widest pl-1">Mode Immersion</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-800 dark:text-white">Filtres CRT/FX</p>
                          <div className={`w-10 h-5 rounded-full relative transition-all duration-300 ${config.ultraImmersiveMode ? 'bg-amber-500 shadow-lg' : 'bg-slate-200 dark:bg-slate-800'}`}>
                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${config.ultraImmersiveMode ? 'right-1' : 'left-1'}`} />
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => setConfig({ ...config, maintenanceMode: !config.maintenanceMode })}
                        className={`p-6 rounded-[1.5rem] border transition-all cursor-pointer group/toggle ${config.maintenanceMode ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-red-500/30'}`}
                      >
                        <p className={`text-[10px] font-black uppercase tracking-widest pl-1 mb-5 transition-colors ${config.maintenanceMode ? 'text-red-500' : 'text-slate-500 dark:text-white/40'}`}>Mode Maintenance</p>
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-black uppercase transition-colors ${config.maintenanceMode ? 'text-red-500' : 'text-slate-400 dark:text-slate-600'}`}>ALERTE ROUGE</p>
                          <div className={`w-10 h-5 rounded-full relative transition-all duration-300 ${config.maintenanceMode ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-slate-200 dark:bg-slate-800'}`}>
                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${config.maintenanceMode ? 'right-1' : 'left-1'}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-900/40 border border-white/10 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-150" />
                    <div className="relative z-10 space-y-3">
                      <h3 className="text-3xl font-black italic tracking-tighter">"Le contrôle est une illusion, la maîtrise est un art."</h3>
                      <p className="text-blue-100/70 text-sm font-bold uppercase tracking-widest">Réglages Système Expérimentaux</p>
                    </div>
                    <button onClick={handleUpdateConfig} className="relative z-10 px-12 py-5 bg-white text-blue-700 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 flex items-center gap-3">
                      <Save size={20} /> APPLIQUER LES CHANGEMENTS
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />

      {/* User Activity Modal */}
      <AnimatePresence>
        {isStatsModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStatsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-2xl">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800 dark:text-white">Analyse du Voyageur</h2>
                    <p className="text-sm font-bold text-slate-400 dark:text-white/40">{selectedUserStats?.user?.firstName} {selectedUserStats?.user?.lastName}</p>
                  </div>
                </div>
                <button onClick={() => setIsStatsModalOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 dark:text-white/40 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                {loadingStats ? (
                  <div className="py-20 flex flex-col items-center gap-4 text-slate-400 dark:text-white/40">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="font-bold animate-pulse uppercase tracking-widest text-xs">Extraction des données...</p>
                  </div>
                ) : selectedUserStats ? (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
                      <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest mb-2">Sessions Totales</p>
                      <p className="text-3xl font-black text-slate-800 dark:text-white">{selectedUserStats.totalSessions}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
                      <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest mb-2">Temps Appris</p>
                      <p className="text-3xl font-black text-slate-800 dark:text-white">{selectedUserStats.totalTime} <span className="text-sm">min</span></p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
                      <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest mb-2">Cours Consultés</p>
                      <p className="text-3xl font-black text-slate-800 dark:text-white">{selectedUserStats.coursesViewed}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-inner">
                      <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest mb-2">Série (Streak)</p>
                      <p className="text-3xl font-black text-orange-500 flex items-center gap-3">
                        {selectedUserStats.streak} <span className="text-lg">🔥</span>
                      </p>
                    </div>

                    <div className="col-span-2 bg-blue-600/5 dark:bg-blue-600/10 p-6 rounded-3xl border border-blue-500/10 dark:border-blue-500/20 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 mb-1">Expertise Déclarée</p>
                        <p className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
                          {selectedUserStats.user?.programmingLevel
                            ? { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé', expert: 'Expert' }[selectedUserStats.user.programmingLevel] || selectedUserStats.user.programmingLevel
                            : "Non défini"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 dark:text-white/40 mb-1">Dernière activité</p>
                        <p className="text-sm font-black text-slate-600 dark:text-white">{formatTimeAgo(selectedUserStats.lastLogin)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center text-slate-400 italic">
                    <Database size={48} className="mx-auto mb-4 opacity-10" />
                    Impossible de charger les données du voyageur.
                  </div>
                )}
              </div>

              <div className="p-8 bg-slate-50/50 dark:bg-slate-950/30 text-center border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setIsStatsModalOpen(false)}
                  className="w-full py-4 bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-slate-900/20"
                >
                  FERMER LE RAPPORT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div >
  );
};

export default AdminPage;
