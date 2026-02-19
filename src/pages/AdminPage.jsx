import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Mail, Bell, BookOpen, Settings, Crown, Eye, Edit, Trash2, Send,
  BarChart3, UserPlus, UserMinus, Camera, Upload, AlertTriangle, TrendingUp,
  Activity, LayoutDashboard, Database, Shield, LogOut, Search, Filter,
  CheckCircle, XCircle, RefreshCw, ChevronRight, Menu, X
} from 'lucide-react';

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
  const [notificationContent, setNotificationContent] = useState({ title: '', message: '', type: 'info' });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const fileInputRef = useRef(null);

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
      const [usersRes, statsRes, coursesRes] = await Promise.all([
        fetch(`${API_URL}/admin/users`, { headers }),
        fetch(`${API_URL}/admin/stats`, { headers }),
        fetch(`${API_URL}/courses`, { headers })
      ]);

      if (usersRes.ok) setUsers(await usersRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
      if (coursesRes.ok) setCourses(await coursesRes.json());
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
      if (res.ok) {
        setToast({ message: 'Emails envoyés !', type: 'success' });
        setEmailContent({ subject: '', body: '', recipients: 'all', specificEmail: '' });
      }
    } catch (err) {
      setToast({ message: "Échec de l'envoi", type: 'error' });
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
        setToast({ message: 'Notification diffusée !', type: 'success' });
        setNotificationContent({ title: '', message: '', type: 'info' });
      }
    } catch (err) {
      setToast({ message: "Échec de la diffusion", type: 'error' });
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Supprimer définitivement cet utilisateur ?')) return;
    try {
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) {
        setUsers(users.filter(u => u._id !== id));
        setToast({ message: 'Utilisateur supprimé', type: 'success' });
      }
    } catch (err) {
      setToast({ message: 'Erreur suppression', type: 'error' });
    }
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
        setToast({ message: 'Avatar mis à jour !', type: 'success' });
      }
    } catch (err) {
      setToast({ message: "Erreur lors de l'envoi", type: 'error' });
    }
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
                  </form>
                </div>
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-[3rem] text-slate-600">
                <BookOpen size={48} className="mb-4 opacity-20" />
                <p className="font-bold">Module de gestion des cours en développement</p>
              </div>
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
    </div>
  );
};

const Megaphone = ({ size, className }) => <TrendingUp size={size} className={className} />; // Placeholder as Lucide Megaphone might be missing or different

export default AdminPage;
