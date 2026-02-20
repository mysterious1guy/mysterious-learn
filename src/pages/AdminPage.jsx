import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Mail, Bell, BookOpen, Settings, Crown, Eye, Edit, Trash2, Send,
  BarChart3, UserPlus, UserMinus, Camera, Upload, AlertTriangle, TrendingUp,
  Activity, LayoutDashboard, Database, Shield, LogOut, Search, Filter,
  CheckCircle, XCircle, RefreshCw, ChevronRight, Menu, X, Megaphone, Save
} from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [config, setConfig] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => { } });
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
    try {
      const headers = { Authorization: `Bearer ${user.token}` };
      const [usersRes, statsRes, coursesRes, notificationsRes, configRes] = await Promise.all([
        fetch(`${API_URL}/admin/users`, { headers }),
        fetch(`${API_URL}/admin/stats`, { headers }),
        fetch(`${API_URL}/courses`, { headers }),
        fetch(`${API_URL}/admin/notifications`, { headers }),
        fetch(`${API_URL}/site-config`, { headers })
      ]);

      if (usersRes.ok) setUsers(await usersRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
      if (coursesRes.ok) setCourses(await coursesRes.json());
      if (notificationsRes.ok) setNotifications(await notificationsRes.json());
      if (configRes.ok) setConfig(await configRes.json());
    } catch (err) {
      setToast({ message: 'Erreur de connexion au serveur', type: 'error' });
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

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'notifications', label: 'Communications', icon: Bell },
    { id: 'courses', label: 'Gestion des cours', icon: BookOpen },
    { id: 'config', label: 'Configuration Site', icon: LayoutDashboard },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col z-50`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-black text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ADMIN</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
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
                <p className="text-xs font-bold text-white truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
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
                    <h1 className="text-4xl font-black text-white">Bonjour, Mouhamed ! 👋</h1>
                    <p className="text-slate-400 mt-2">Voici ce qu'il se passe sur Mysterious Classroom aujourd'hui.</p>
                  </div>
                  <button onClick={fetchData} className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 text-slate-400 transition-colors">
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
                    <div key={i} className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl overflow-hidden relative group">
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-${s.color}-600/10 blur-3xl -mr-12 -mt-12 transition-transform group-hover:scale-150`} />
                      <div className={`p-3 bg-${s.color}-600/20 text-${s.color}-400 rounded-2xl w-fit mb-4`}>
                        <s.icon size={24} />
                      </div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{s.label}</p>
                      <p className="text-3xl font-black text-white mt-1">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Utilisateurs Récents</h2>
                    <div className="space-y-4">
                      {users.slice(-5).reverse().map(u => (
                        <div key={u._id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl hover:bg-slate-800/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold">{u.firstName?.[0]}</div>
                            <div>
                              <p className="text-sm font-bold text-white">{u.firstName} {u.lastName}</p>
                              <p className="text-xs text-slate-500">{u.email}</p>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-slate-600" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Activité Système</h2>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-sm"><span className="font-bold text-white">Serveur :</span> Opérationnel (100%)</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <p className="text-sm"><span className="font-bold text-white">Base de données :</span> Connectée</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <p className="text-sm"><span className="font-bold text-white">Email Service :</span> Prêt</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black text-white">Gestion des Utilisateurs</h2>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950/50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-6">Utilisateur</th>
                        <th className="px-8 py-6">Rôle</th>
                        <th className="px-8 py-6">Vérifié</th>
                        <th className="px-8 py-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredUsers.map(u => (
                        <tr key={u._id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-blue-400">
                                {u.firstName?.[0]}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white">{u.firstName} {u.lastName}</p>
                                <p className="text-[10px] text-slate-500">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${u.role === 'admin' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            {u.isEmailVerified ? <CheckCircle size={18} className="text-green-500" /> : <XCircle size={18} className="text-slate-600" />}
                          </td>
                          <td className="px-8 py-6">
                            <button onClick={() => handleDeleteUser(u._id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredUsers.length === 0 && <div className="p-20 text-center text-slate-500">Aucun utilisateur trouvé</div>}
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div key="notif" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Email Panel */}
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-purple-600/20 text-purple-400 rounded-2xl"><Mail size={32} /></div>
                    <h2 className="text-2xl font-black text-white">Email Marketing</h2>
                  </div>
                  <form onSubmit={handleSendEmail} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-tighter">Destinataires</label>
                      <select
                        value={emailContent.recipients}
                        onChange={(e) => setEmailContent({ ...emailContent, recipients: e.target.value })}
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-purple-600 transition-colors"
                      >
                        <option value="all">Tous les utilisateurs</option>
                        <option value="verified">Vérifiés uniquement</option>
                        <option value="unverified">Non-vérifiés</option>
                        <option value="specific">Email spécifique</option>
                      </select>
                    </div>
                    {emailContent.recipients === 'specific' && (
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={emailContent.specificEmail}
                        onChange={(e) => setEmailContent({ ...emailContent, specificEmail: e.target.value })}
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none"
                      />
                    )}
                    <input
                      type="text"
                      placeholder="Sujet du message"
                      value={emailContent.subject}
                      onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none"
                    />
                    <textarea
                      placeholder="Contenu HTML ou texte brut..."
                      rows="6"
                      value={emailContent.body}
                      onChange={(e) => setEmailContent({ ...emailContent, body: e.target.value })}
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none resize-none"
                    ></textarea>
                    <button className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                      <Send size={20} /> ENVOYER MAINTENANT
                    </button>
                  </form>
                </div>

                {/* Broadcast Panel */}
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-orange-600/20 text-orange-400 rounded-2xl"><Bell size={32} /></div>
                    <h2 className="text-2xl font-black text-white">Annonce Site</h2>
                  </div>
                  <form onSubmit={handleSendNotification} className="space-y-6">
                    <input
                      type="text"
                      placeholder="Titre de l'alerte"
                      value={notificationContent.title}
                      onChange={(e) => setNotificationContent({ ...notificationContent, title: e.target.value })}
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none"
                    />
                    <select
                      value={notificationContent.type}
                      onChange={(e) => setNotificationContent({ ...notificationContent, type: e.target.value })}
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none"
                    >
                      <option value="info">💡 Information (Bleu)</option>
                      <option value="announcement">📢 Annonce (Violet)</option>
                      <option value="warning">⚠️ Alerte (Orange)</option>
                      <option value="success">✅ Succès (Vert)</option>
                    </select>
                    <textarea
                      placeholder="Message court pour la cloche..."
                      rows="4"
                      value={notificationContent.message}
                      onChange={(e) => setNotificationContent({ ...notificationContent, message: e.target.value })}
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none resize-none"
                    ></textarea>
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
                        <div className="w-10 h-5 bg-slate-800 rounded-full peer peer-checked:bg-orange-600 transition-colors"></div>
                        <div className="absolute left-1 top-1 w-3 h-3 bg-slate-400 rounded-full peer-checked:translate-x-5 peer-checked:bg-white transition-all"></div>
                      </div>
                      <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Diffuser aussi par Email</span>
                    </label>
                  </form>

                  {/* Liste des annonces */}
                  <div className="mt-12 space-y-4">
                    <h3 className="text-sm font-black uppercase text-slate-500 tracking-widest pl-2">Annonces Actives</h3>
                    <div className="space-y-3">
                      {notifications.map(n => (
                        <div key={n._id} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-2xl group transition-all hover:border-slate-700">
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-sm font-bold text-white truncate">{n.title}</p>
                            <p className="text-[10px] text-slate-500 truncate">{n.message}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteNotification(n._id)}
                            className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      {notifications.length === 0 && (
                        <p className="text-center py-8 text-xs text-slate-600 italic">Aucune annonce active</p>
                      )}
                    </div>
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
                    <div key={course._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 group hover:border-blue-500 transition-all flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">{course.category}</span>
                        </div>
                        <button onClick={() => navigate(`/course/${course._id}`)} className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition" title="Voir le cours">
                          <Eye size={16} />
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-sm text-slate-400 mb-6 line-clamp-2 flex-grow">{course.description}</p>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-1"><BookOpen size={14} /> {course.chapters?.length || 0} chap.</div>
                        <div className="flex items-center gap-1"><Users size={14} /> {course.level || 'Tous'}</div>
                      </div>
                    </div>
                  ))}

                  {/* Card for AlgoCourse specifically as it might not be in the Mongo DB depending on the seed */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 group hover:border-purple-500 transition-all flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">Fondamentaux</span>
                      </div>
                      <button onClick={() => navigate(`/course/algo`)} className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition" title="Voir le cours">
                        <Eye size={16} />
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 relative z-10">Algorithmique</h3>
                    <p className="text-sm text-slate-400 mb-6 line-clamp-2 flex-grow relative z-10">Mondial Algo Grimoire - Le cours interactif ultime pour comprendre la logique.</p>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-4 border-t border-slate-800 relative z-10">
                      <div className="flex items-center gap-1"><BookOpen size={14} /> 7 modules</div>
                      <div className="flex items-center gap-1"><Users size={14} /> Débutant</div>
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
              <motion.div key="config" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-black text-white">Configuration du Site</h2>
                  <button onClick={handleUpdateConfig} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                    <Save size={18} /> ENREGISTRER
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Infos Site */}
                  <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-blue-400">
                      <LayoutDashboard size={20} /> Identité du Site
                    </h3>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Nom du Site</label>
                      <input
                        type="text"
                        value={config.siteName}
                        onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Texte du Pied de Page</label>
                      <textarea
                        value={config.footerText}
                        onChange={(e) => setConfig({ ...config, footerText: e.target.value })}
                        rows="3"
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-blue-600 resize-none"
                      />
                    </div>
                  </div>

                  {/* Infos Créateur */}
                  <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-purple-400">
                      <Database size={20} /> Infos Créateur
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative group">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-700">
                          {config.creatorAvatar?.length <= 2 ? (
                            <span className="text-xl font-bold">{config.creatorAvatar}</span>
                          ) : (
                            <img src={config.creatorAvatar} alt="Creator" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <button onClick={() => configAvatarRef.current.click()} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity">
                          <Camera size={16} />
                        </button>
                        <input ref={configAvatarRef} type="file" hidden accept="image/*" onChange={handleConfigAvatarChange} />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Avatar (Initiales ou Image)</label>
                        <input
                          type="text"
                          value={config.creatorAvatar}
                          onChange={(e) => setConfig({ ...config, creatorAvatar: e.target.value })}
                          placeholder="MF ou URL..."
                          className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl outline-none mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Nom</label>
                        <input
                          type="text"
                          value={config.creatorName}
                          onChange={(e) => setConfig({ ...config, creatorName: e.target.value })}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Titre</label>
                        <input
                          type="text"
                          value={config.creatorTitle}
                          onChange={(e) => setConfig({ ...config, creatorTitle: e.target.value })}
                          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio & Bio lines */}
                  <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 space-y-4 md:col-span-2">
                    <h3 className="text-lg font-bold text-yellow-500">Parcours Créateur (Points listés)</h3>
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

            {activeTab === 'settings' && (
              <div className="max-w-xl bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800">
                <h2 className="text-2xl font-black text-white mb-8">Paramètres Admin</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-slate-800/20 rounded-2xl border border-slate-800">
                    <div>
                      <p className="font-bold text-white">Maintenance Site</p>
                      <p className="text-xs text-slate-500">Désactiver l'accès aux cours</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-slate-600 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-slate-800/20 rounded-2xl border border-slate-800">
                    <div>
                      <p className="font-bold text-white">Inscriptions</p>
                      <p className="text-xs text-slate-500">Autoriser les nouveaux comptes</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

// Final check of components
export default AdminPage;
