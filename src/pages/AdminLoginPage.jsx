import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock, Mail, User, ArrowRight } from 'lucide-react';

const AdminLoginPage = ({ setToast }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🛡️ AdminLoginPage: Initialisation page admin sécurisée');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('🛡️ AdminLoginPage: Tentative connexion admin pour:', formData.email);

      // Vérifier les identifiants admin
      if (formData.email === 'mouhamedfall@esp.sn' && formData.password === 'Mouha2007') {
        console.log('✅ AdminLoginPage: Connexion admin réussie');

        // Créer un faux token pour l'admin
        const adminUser = {
          _id: 'admin123',
          name: 'Admin Principal',
          email: 'mouhamedfall@esp.sn',
          role: 'admin',
          avatar: null,
          isEmailVerified: true
        };

        const token = 'admin_token_' + Date.now();

        localStorage.setItem('user', JSON.stringify(adminUser));
        localStorage.setItem('token', token);
        setToast({ message: 'Connexion admin réussie !', type: 'success' });

        console.log('🛡️ AdminLoginPage: Connexion réussie, redirection vers /dashboard');
        navigate('/dashboard');
        return;
      }

      // Pour les autres admins, connexion normale
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ AdminLoginPage: Connexion admin réussie');
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        setToast({ message: 'Connexion admin réussie !', type: 'success' });

        console.log('🛡️ AdminLoginPage: Redirection vers /dashboard');
        navigate('/dashboard');
        return;
      }
      console.log('❌ AdminLoginPage: Échec connexion admin:', data.message);
      setToast({ message: data.message || 'Erreur de connexion admin', type: 'error' });
    } catch (error) {
      console.error('❌ AdminLoginPage: Erreur:', error);
      setToast({ message: 'Erreur de connexion admin', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1e] to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header Admin */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full mb-4 shadow-lg shadow-blue-500/30">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Accès Admin</h1>
          <p className="text-gray-400">Connexion sécurisée pour administrateurs</p>
        </div>

        {/* Formulaire */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl shadow-blue-500/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Admin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 bg-slate-950/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  placeholder="admin@exemple.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 bg-slate-950/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  placeholder="•••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-400" size={20} />
                  ) : (
                    <Eye className="text-gray-400" size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-transparent rounded-full animate-spin"></div>
                  <span>Vérification...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Se connecter</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Lien vers connexion normale */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">
              Admin principal : mouhamedfall@esp.sn
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Mot de passe : Mouha2007
            </p>
            <p className="text-gray-400 text-sm">
              Autres admins ?{' '}
              <button
                onClick={() => navigate('/auth')}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Connexion normale
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
