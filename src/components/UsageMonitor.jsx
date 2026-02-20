import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Calendar, Award, Target, BarChart3, Activity } from 'lucide-react';

const UsageMonitor = ({ user, API_URL, isVisible, onClose }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('24h');

  useEffect(() => {
    if (isVisible && user) {
      fetchUserStats();
    }
  }, [isVisible, period, user]);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/activity/user-stats/${user._id}?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erreur stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity size={24} className="text-blue-400" />
            Moniteur d'Utilisation
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
          >
            ×
          </button>
        </div>

        {/* Sélecteur de période */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['24h', '7days', '30days', '90days', 'all'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${period === p
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {p === '24h' ? '24 heures' : p === '7days' ? '7 jours' : p === '30days' ? '30 jours' : p === '90days' ? '90 jours' : 'Tout'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Chargement des statistiques...</p>
          </div>
        ) : stats ? (
          <div className="space-y-6">
            {/* Stats principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-600/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-blue-400" />
                  <span className="text-blue-400 text-sm">Temps total</span>
                </div>
                <p className="text-2xl font-bold text-white">{formatTime(stats.totalTime)}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-green-600/20 to-green-700/20 border border-green-600/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-green-400" />
                  <span className="text-green-400 text-sm">Sessions</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.totalSessions}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 border border-purple-600/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target size={16} className="text-purple-400" />
                  <span className="text-purple-400 text-sm">Cours vus</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.coursesViewed}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 border border-yellow-600/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} className="text-yellow-400" />
                  <span className="text-yellow-400 text-sm">Exercices</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.exercisesCompleted}</p>
              </motion.div>
            </div>

            {/* Stats détaillées */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-4"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="text-blue-400" />
                  Statistiques détaillées
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temps moyen par session</span>
                    <span className="text-white font-medium">{formatTime(stats.averageSessionTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dernière connexion</span>
                    <span className="text-white font-medium">
                      {stats.lastLogin ? formatDate(stats.lastLogin) : 'Jamais'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Série actuelle</span>
                    <span className="text-white font-medium">{stats.streak} jours</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-4"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-green-400" />
                  Activité récente
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">
                      {stats.lastLogin ? `Dernière session: ${formatDate(stats.lastLogin)}` : 'Aucune session'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">
                      Progression: {stats.coursesViewed} cours explorés
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">
                      Engagement: {stats.exercisesCompleted} exercices complétés
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Message d'encouragement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <Award size={24} className="text-yellow-400" />
                <div>
                  <h4 className="text-white font-semibold">Continuez comme ça !</h4>
                  <p className="text-gray-300 text-sm">
                    Vous avez passé {formatTime(stats.totalTime)} sur la plateforme cette période.
                    Votre engagement est excellent !
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucune statistique disponible</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UsageMonitor;
