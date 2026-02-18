import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import CyberPet from '../CyberPet';

const AuthPage = ({ setUser, API_URL, setToast, fetchProgressions }) => {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState('signin');
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [authError, setAuthError] = useState('');
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [petSecret, setPetSecret] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setAuthError('');
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    password: formData.password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                setToast({ message: 'Inscription réussie !', type: 'success' });
                navigate('/dashboard');
                fetchProgressions();
            } else {
                setAuthError(data.message || 'Erreur lors de l\'inscription');
            }
        } catch (err) {
            setAuthError('Erreur réseau');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError('');
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                setToast({ message: 'Connexion réussie !', type: 'success' });
                navigate('/dashboard');
                fetchProgressions();
            } else {
                setAuthError(data.message || 'Email ou mot de passe incorrect');
            }
        } catch (err) {
            setAuthError('Erreur réseau');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#0f172a]">
            <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-8 rounded-[2.5rem] flex flex-col items-center shadow-2xl">
                <CyberPet isPasswordFocused={isPasswordFocused} onSecret={petSecret} />

                <h2 className="text-2xl font-bold text-white mb-6">
                    {authMode === 'signin' ? 'Connexion' : 'Inscription'}
                </h2>

                <form onSubmit={authMode === 'signin' ? handleLogin : handleRegister} className="w-full space-y-4">
                    {authMode === 'signup' && (
                        <>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    placeholder="Prénom"
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none transition"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    onFocus={() => setIsPasswordFocused(false)}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none transition"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    onFocus={() => setIsPasswordFocused(false)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none transition"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onFocus={() => setIsPasswordFocused(false)}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            required
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl py-3 pl-10 pr-12 text-white focus:border-blue-500 outline-none transition"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-3 text-gray-500 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {authMode === 'signup' && (
                        <div className="flex items-start gap-3 mt-4">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    required
                                    checked={agreedToPolicy}
                                    onChange={(e) => setAgreedToPolicy(e.target.checked)}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-600 bg-gray-900/50 transition-all checked:border-blue-500 checked:bg-blue-500"
                                    id="privacy-check"
                                />
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                    <CheckCircle size={12} />
                                </span>
                            </div>
                            <label htmlFor="privacy-check" className="text-sm text-gray-400 cursor-pointer select-none">
                                J'accepte la <a href="/privacy" className="text-blue-400 hover:underline font-bold">politique de confidentialité</a>
                            </label>
                        </div>
                    )}

                    {authError && <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg">{authError}</p>}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className={`w-full font-bold py-3 rounded-2xl shadow-lg transition-all ${authMode === 'signup' && !agreedToPolicy
                                ? 'bg-gray-600 cursor-not-allowed opacity-50 text-gray-400'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/30'
                            }`}
                        disabled={authMode === 'signup' && !agreedToPolicy}
                    >
                        {authMode === 'signin' ? 'Se connecter' : 'S\'inscrire'}
                    </motion.button>
                </form>

                <p className="mt-4 text-sm text-gray-500">
                    {authMode === 'signin' ? "Pas encore de compte ?" : "Déjà un compte ?"}
                    <button
                        onClick={() => { setAuthMode(authMode === 'signin' ? 'signup' : 'signin'); setAuthError(''); }}
                        className="ml-1 text-blue-400 hover:underline"
                    >
                        {authMode === 'signin' ? 'Inscris-toi' : 'Connecte-toi'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;