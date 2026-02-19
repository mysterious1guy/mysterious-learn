import { useState, useEffect } from 'react';
import { Terminal, Activity, Database, Globe, Cpu, Eye, Play, Square } from 'lucide-react';

const LiveMonitor = ({ API_URL }) => {
  const [data, setData] = useState(null);
  const [actions, setActions] = useState([]);
  const [terminal, setTerminal] = useState([]);
  const [command, setCommand] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Récupérer les données
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/live-monitor`);
      const result = await response.json();
      
      if (result.status === 'success') {
        setData(result.data);
        setActions(result.actions || []);
        setTerminal(result.terminal || []);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Erreur monitoring:', error);
      setIsConnected(false);
    }
  };

  // Exécuter une commande
  const executeCommand = async () => {
    if (!command.trim()) return;

    try {
      const response = await fetch(`${API_URL}/live-monitor/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setCommand('');
        fetchData(); // Rafraîchir les données
      }
    } catch (error) {
      console.error('Erreur commande:', error);
    }
  };

  useEffect(() => {
    fetchData();
    
    if (autoRefresh) {
      const interval = setInterval(fetchData, 2000); // Rafraîchir toutes les 2 secondes
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  if (!data) {
    return (
      <div className="fixed top-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl z-50">
        <div className="flex items-center gap-2 text-white">
          <Activity className="animate-spin" size={16} />
          <span>Chargement du monitoring...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 w-96 max-h-[80vh] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Eye size={16} className={isConnected ? 'text-green-400' : 'text-red-400'} />
          <span className="text-white font-semibold text-sm">Live Monitor</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-2 py-1 text-xs rounded ${autoRefresh ? 'bg-green-600' : 'bg-gray-600'} text-white`}
          >
            {autoRefresh ? 'Auto' : 'Manual'}
          </button>
          <button
            onClick={fetchData}
            className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 max-h-[60vh] overflow-y-auto">
        {/* System Status */}
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2 text-sm">System Status</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Database size={12} className={data.mongodb.connected ? 'text-green-400' : 'text-red-400'} />
              <span className="text-gray-300">MongoDB: {data.mongodb.connected ? 'OK' : 'KO'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe size={12} className="text-blue-400" />
              <span className="text-gray-300">Node: {data.environment.node_version}</span>
            </div>
            <div className="flex items-center gap-1">
              <Cpu size={12} className="text-yellow-400" />
              <span className="text-gray-300">RAM: {Math.round(data.environment.memory.heapUsed / 1024 / 1024)}MB</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity size={12} className="text-purple-400" />
              <span className="text-gray-300">Uptime: {Math.floor(data.environment.uptime / 60)}m</span>
            </div>
          </div>
        </div>

        {/* Recent Actions */}
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2 text-sm">Recent Actions</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {actions.slice(0, 5).map((action, index) => (
              <div key={action.id} className="text-xs text-gray-300 border-l-2 border-blue-500 pl-2">
                <span className="text-gray-500">
                  {new Date(action.timestamp).toLocaleTimeString()}
                </span>
                <span className="ml-2 text-blue-400">
                  [{action.type.toUpperCase()}]
                </span>
                <span className="ml-1">{action.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal */}
        <div className="mb-4">
          <h4 className="text-white font-semibold mb-2 text-sm">Terminal</h4>
          <div className="bg-black rounded p-2 text-xs font-mono max-h-32 overflow-y-auto">
            {terminal.slice(0, 3).map((cmd, index) => (
              <div key={index} className="mb-1">
                <span className="text-green-400">$</span> {cmd.command}
                {cmd.stdout && <div className="text-gray-300 ml-2">{cmd.stdout}</div>}
                {cmd.error && <div className="text-red-400 ml-2">{cmd.error}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Command Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
            placeholder="Entrez une commande..."
            className="flex-1 bg-gray-800 text-white px-2 py-1 rounded text-xs border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={executeCommand}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 flex items-center gap-1"
          >
            <Play size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitor;
