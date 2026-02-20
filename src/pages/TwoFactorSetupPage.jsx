import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  Copy,
  Eye,
  EyeOff,
  ArrowLeft,
  Lock,
  Key,
  RefreshCw
} from 'lucide-react';

const TwoFactorSetupPage = ({ user, API_URL, setToast }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [twoFactorStatus, setTwoFactorStatus] = useState(null);

  useEffect(() => {
    fetchTwoFactorStatus();
  }, []);

  const fetchTwoFactorStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/2fa/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const status = await response.json();
        setTwoFactorStatus(status);
        if (status.enabled) {
          setStep(4); // Déjà configuré
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleEnableTwoFactor = async () => {
    if (!phoneNumber) {
      setToast({ message: 'Veuillez entrer un numéro de téléphone', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/2fa/enable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ phoneNumber })
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
      } else {
        setToast({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Erreur lors de l\'envoi du SMS', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setToast({ message: 'Veuillez entrer un code à 6 chiffres', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/2fa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code: verificationCode })
      });

      const data = await response.json();

      if (response.ok) {
        setBackupCodes(data.backupCodes);
        setStep(3);
      } else {
        setToast({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Erreur de vérification', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDisableTwoFactor = async () => {
    if (!password) {
      setToast({ message: 'Veuillez entrer votre mot de passe', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/2fa/disable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok) {
        setStep(1);
        fetchTwoFactorStatus();
      } else {
        setToast({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Erreur lors de la désactivation', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateCodes = async () => {
    if (!password) {
      setToast({ message: 'Veuillez entrer votre mot de passe', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/2fa/regenerate-backup-codes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok) {
        setBackupCodes(data.backupCodes);
      } else {
        setToast({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Erreur de régénération', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToast({ message: 'Copié dans le presse-papiers', type: 'success' });
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-[2.5rem] p-12 text-center shadow-2xl">
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertTriangle size={36} className="text-red-500" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Service SMS Désactivé</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          L'authentification par SMS (2FA) n'est pas encore disponible sur cette plateforme. Nous travaillons à l'intégration de services sécurisés.
        </p>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-8">
          <p className="text-sm text-blue-400 font-medium italic">
            "Priorisez la vérification par Email déjà active sur votre compte pour une sécurité optimale."
          </p>
        </div>

        <button
          onClick={() => navigate('/account')}
          className="w-full px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-2xl transition-all active:scale-95"
        >
          Retour aux réglages
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-6"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Vérifiez votre téléphone</h2>
        <p className="text-gray-400">Entrez le code à 6 chiffres reçu par SMS</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Code de vérification
          </label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            maxLength={6}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-center text-2xl font-mono focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleVerifyCode}
          disabled={loading || verificationCode.length !== 6}
          className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <CheckCircle size={16} />
              Vérifier le code
            </>
          )}
        </button>

        <button
          onClick={() => setStep(1)}
          className="w-full px-4 py-2 text-gray-400 hover:text-white transition"
        >
          Retour
        </button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-6"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Sauvegardez ces codes !</h2>
        <p className="text-gray-400">Codes de secours - à conserver précieusement</p>
      </div>

      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <AlertTriangle size={16} className="text-yellow-400 mt-0.5" />
          <p className="text-sm text-yellow-400">
            Ces codes vous permettront d'accéder à votre compte si vous perdez l'accès à votre téléphone.
            Sauvegardez-les dans un endroit sécurisé.
          </p>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Codes de secours</h3>
          <button
            onClick={() => setShowBackupCodes(!showBackupCodes)}
            className="p-2 text-gray-400 hover:text-white transition"
          >
            {showBackupCodes ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {backupCodes.map((code, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-700/50 rounded border border-gray-600"
            >
              <span className="font-mono text-sm text-white">
                {showBackupCodes ? code.code : '••••••••'}
              </span>
              <button
                onClick={() => copyToClipboard(code.code)}
                className="p-1 text-gray-400 hover:text-white transition"
              >
                <Copy size={12} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/account')}
          className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition"
        >
          Terminer la configuration
        </button>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-6"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">2FA Activée</h2>
        <p className="text-gray-400">Votre compte est protégé par l'authentification 2FA</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-400" />
            <div>
              <p className="text-white font-medium">2FA Active</p>
              <p className="text-gray-400 text-sm">{twoFactorStatus?.phoneNumber}</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mot de passe pour désactiver
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <button
            onClick={handleDisableTwoFactor}
            disabled={loading || !password}
            className="w-full px-4 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock size={16} />
                Désactiver 2FA
              </>
            )}
          </button>

          <button
            onClick={handleRegenerateCodes}
            disabled={loading || !password}
            className="w-full px-4 py-2 text-gray-400 hover:text-white transition flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Régénérer les codes de secours
          </button>
        </div>

        <button
          onClick={() => navigate('/account')}
          className="w-full px-4 py-2 text-blue-400 hover:text-blue-300 transition"
        >
          Retour au compte
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate('/account')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} />
          Retour au compte
        </button>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default TwoFactorSetupPage;
