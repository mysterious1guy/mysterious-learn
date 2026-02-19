import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Activity, Database, Globe, Settings } from 'lucide-react';

const DebugMonitor = ({ API_URL }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/debug/status`);
        const data = await response.json();
        setStatus(data);
        setLastUpdate(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Erreur monitoring:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Refresh toutes les 30s

    return () => clearInterval(interval);
  }, [API_URL]);

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center gap-2 text-white">
          <Activity className="animate-spin" size={16} />
          <span>Chargement du monitoring...</span>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-900 p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center gap-2 text-white">
          <AlertCircle size={16} />
          <span>Erreur de monitoring</span>
        </div>
      </div>
    );
  }

  const isHealthy = status.mongodb.connected && 
                   status.environment_vars.CLIENT_URL !== 'NOT_SET' &&
                   status.environment_vars.GOOGLE_CLIENT_ID !== 'NOT_SET';

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-md ${
      isHealthy ? 'bg-green-900' : 'bg-red-900'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-white">
          {isHealthy ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span className="font-semibold">
            {isHealthy ? 'Système Sain' : 'Problèmes Détectés'}
          </span>
        </div>
        <div className="text-xs text-gray-300">
          {lastUpdate}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {/* MongoDB Status */}
        <div className="flex items-center gap-2 text-gray-300">
          <Database size={14} />
          <span>MongoDB:</span>
          <span className={`font-medium ${
            status.mongodb.connected ? 'text-green-400' : 'text-red-400'
          }`}>
            {status.mongodb.connected ? 'Connecté' : 'Déconnecté'}
          </span>
        </div>

        {/* Environment Variables */}
        <div className="flex items-center gap-2 text-gray-300">
          <Settings size={14} />
          <span>Variables:</span>
          <span className={`font-medium ${
            status.environment_vars.CLIENT_URL !== 'NOT_SET' ? 'text-green-400' : 'text-red-400'
          }`}>
            {status.environment_vars.CLIENT_URL !== 'NOT_SET' ? 'OK' : 'MANQUANTES'}
          </span>
        </div>

        {/* Google OAuth */}
        <div className="flex items-center gap-2 text-gray-300">
          <Globe size={14} />
          <span>Google OAuth:</span>
          <span className={`font-medium ${
            status.environment_vars.GOOGLE_CLIENT_ID !== 'NOT_SET' ? 'text-green-400' : 'text-red-400'
          }`}>
            {status.environment_vars.GOOGLE_CLIENT_ID !== 'NOT_SET' ? 'Configuré' : 'Non configuré'}
          </span>
        </div>

        {/* Memory Usage */}
        <div className="flex items-center gap-2 text-gray-300">
          <Activity size={14} />
          <span>Mémoire:</span>
          <span className="text-blue-400">
            {Math.round(status.memory_usage.heapUsed / 1024 / 1024)}MB
          </span>
        </div>
      </div>

      {/* Debug Actions */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={() => window.open(`${API_URL}/debug/status`, '_blank')}
            className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Voir Status
          </button>
          <button
            onClick={() => window.open(`${API_URL}/debug/paths`, '_blank')}
            className="px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
          >
            Voir Paths
          </button>
          <button
            onClick={() => window.open(`${API_URL}/debug/google-oauth`, '_blank')}
            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
          >
            Test OAuth
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugMonitor;
