import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const OAuthDebugger = () => {
  const [logs, setLogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addLog = (type, message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, type, message }]);
  };

  useEffect(() => {
    // Intercepter les erreurs Google OAuth
    const handleError = (event) => {
      if (event.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        addLog('error', 'Extension bloque Google OAuth - Désactivez ad-blocker !');
      }
    };

    window.addEventListener('error', handleError);
    
    // Log initial
    addLog('info', 'OAuth Debugger activé');
    
    return () => window.removeEventListener('error', handleError);
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50"
        title="Déboguer OAuth"
      >
        <AlertCircle size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 w-96 max-h-96 overflow-hidden z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Débogueur OAuth</h3>
        <div className="flex gap-2">
          <button
            onClick={clearLogs}
            className="text-gray-400 hover:text-white"
            title="Effacer les logs"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
            title="Fermer"
          >
            <XCircle size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <span className="text-gray-500 text-xs">{log.timestamp}</span>
            {log.type === 'error' && <XCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />}
            {log.type === 'success' && <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />}
            {log.type === 'info' && <AlertCircle size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />}
            <span className={`flex-1 ${
              log.type === 'error' ? 'text-red-400' : 
              log.type === 'success' ? 'text-green-400' : 
              'text-gray-300'
            }`}>
              {log.message}
            </span>
          </div>
        ))}
      </div>

      {logs.length === 0 && (
        <div className="text-gray-500 text-center py-4">
          Aucun log pour le moment...
        </div>
      )}
    </div>
  );
};

export default OAuthDebugger;
