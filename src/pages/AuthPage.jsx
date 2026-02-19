import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import CyberPet from '../CyberPet';

const AuthPage = ({ setUser, API_URL, setToast, fetchProgressions }) => {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState('signin');
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [authError, setAuthError] = useState('');
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [petSecret, setPetSecret] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Validation email améliorée
    const [emailError, setEmailError] = useState('');
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return '';
        if (!re.test(email)) return 'Format d\'email invalide';
        
        // Validation plus stricte pour éviter les faux emails
        const domain = email.split('@')[1];
        if (!domain || domain.length < 4) return 'Domaine invalide';
        if (!domain.includes('.')) return 'Domaine doit contenir un point';
        if (domain.endsWith('@gmail.com') && email.split('@')[0].length < 3) return 'Nom d\'utilisateur Gmail trop court';
        
        return '';
    };
    useEffect(() => {
        setEmailError(validateEmail(formData.email));
    }, [formData.email]);

    // Vérification si l'email existe déjà (mode inscription)
    const [emailExists, setEmailExists] = useState(false);
    const checkEmailExists = async (email) => {
        if (!email || emailError) return;
        try {
            const response = await fetch(`${API_URL}/auth/check-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            setEmailExists(data.exists);
        } catch (err) {
            console.error('Erreur vérification email:', err);
        }
    };

    useEffect(() => {
        if (authMode === 'signup' && formData.email && !emailError) {
            const timer = setTimeout(() => {
                checkEmailExists(formData.email);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setEmailExists(false);
        }
    }, [formData.email, authMode, emailError]);

    // Force mot de passe
    const [passwordStrength, setPasswordStrength] = useState(0);
    useEffect(() => {
        if (formData.password.length === 0) setPasswordStrength(0);
        else if (formData.password.length < 6) setPasswordStrength(1);
        else if (formData.password.length < 8) setPasswordStrength(2);
        else setPasswordStrength(3);
    }, [formData.password]);

    // Google Login - REDIRECTION CORRECTE
    const handleGoogleLogin = () => {
        setIsLoading(true);
        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
            'client_id=' + import.meta.env.VITE_GOOGLE_CLIENT_ID +
            '&redirect_uri=' + window.location.origin + '/auth/callback' + // URL CORRECTE
            '&response_type=code' +
            '&scope=email profile' +
            '&prompt=select_account';
        window.location.href = googleAuthUrl;
    };

    // Connexion email
    const handleLogin = async (e) => {
        e.preventDefault();
        if (emailError) {
            setAuthError('Veuillez entrer un email valide');
            return;
        }
        setIsLoading(true);
        setAuthError('');
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Stocker les infos utilisateur dans localStorage pour le tracking
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('token', data.token);
                
                setUser(data);
                setToast({ message: 'Connexion réussie !', type: 'success' });
                
                // Redirection immédiate vers le dashboard pour éviter le conflit avec le tracking
                navigate('/dashboard');
                
                // Initialiser le tracking après un court délai
                setTimeout(() => {
                    if (fetchProgressions) fetchProgressions();
                }, 100);
            } else {
                setAuthError(data.message || 'Email ou mot de passe incorrect');
            }
        } catch (err) {
            setAuthError('Erreur réseau');
        } finally {
            setIsLoading(false);
        }
    };

    // Inscription email
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!agreedToPolicy || !agreedToTerms) {
            setAuthError('Vous devez accepter les conditions et la politique de confidentialité');
            return;
        }
        if (emailError) {
            setAuthError('Veuillez entrer un email valide');
            return;
        }
        if (emailExists) {
            setAuthError('Un compte existe déjà avec cet email. Connectez-vous plutôt.');
            return;
        }
        setIsLoading(true);
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
                navigate('/account'); // Redirection vers la page compte
                if (fetchProgressions) fetchProgressions();
            } else {
                setAuthError(data.message || 'Erreur lors de l\'inscription');
            }
        } catch (err) {
            setAuthError('Erreur réseau');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-[#0f172a] to-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-8 rounded-[2.5rem] flex flex-col items-center shadow-2xl"
            >
                <CyberPet isPasswordFocused={isPasswordFocused} onSecret={petSecret} />

                <motion.h2
                    key={authMode}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold text-white mb-6"
                >
                    {authMode === 'signin' ? '🔐 Connexion' : '✨ Inscription'}
                </motion.h2>

                <form onSubmit={authMode === 'signin' ? handleLogin : handleRegister} className="w-full space-y-4">
                    <AnimatePresence mode="wait">
                        {authMode === 'signup' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4 overflow-hidden"
                            >
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
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className={`w-full bg-gray-900/50 border rounded-2xl py-3 pl-10 pr-10 text-white focus:border-blue-500 outline-none transition ${formData.email && emailError ? 'border-red-500' : 'border-gray-700'
                                }`}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onFocus={() => setIsPasswordFocused(false)}
                        />
                        {formData.email && (
                            <div className="absolute right-3 top-3">
                                {emailError ? (
                                    <XCircle className="text-red-500" size={20} />
                                ) : emailExists ? (
                                    <XCircle className="text-orange-500" size={20} />
                                ) : (
                                    <CheckCircle className="text-green-500" size={20} />
                                )}
                            </div>
                        )}
                    </div>
                    {emailError && <p className="text-red-500 text-xs -mt-2">{emailError}</p>}
                    {emailExists && !emailError && <p className="text-orange-500 text-xs -mt-2">Un compte existe déjà avec cet email</p>}

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

                    {formData.password && (
                        <div className="space-y-1">
                            <div className="flex gap-1">
                                {[1, 2, 3].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= level
                                            ? level === 1 ? 'bg-red-500' : level === 2 ? 'bg-yellow-500' : 'bg-green-500'
                                            : 'bg-gray-700'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-gray-500">
                                {passwordStrength === 1 && '🔴 Faible'}
                                {passwordStrength === 2 && '🟡 Moyen'}
                                {passwordStrength === 3 && '🟢 Fort'}
                            </p>
                        </div>
                    )}

                    {authMode === 'signup' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 mt-4">
                            <div className="flex items-start gap-3">
                                <div className="relative flex items-center mt-1">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={agreedToPolicy}
                                        onChange={(e) => setAgreedToPolicy(e.target.checked)}
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-600 bg-gray-900/50 transition-all checked:border-blue-500 checked:bg-blue-500"
                                        id="privacy-check"
                                    />
                                    <CheckCircle className="absolute text-white opacity-0 peer-checked:opacity-100" size={12} />
                                </div>
                                <label htmlFor="privacy-check" className="text-sm text-gray-400 cursor-pointer select-none">
                                    J'accepte la <Link to="/privacy" className="text-blue-400 hover:underline font-bold">politique de confidentialité</Link>
                                </label>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="relative flex items-center mt-1">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-600 bg-gray-900/50 transition-all checked:border-blue-500 checked:bg-blue-500"
                                        id="terms-check"
                                    />
                                    <CheckCircle className="absolute text-white opacity-0 peer-checked:opacity-100" size={12} />
                                </div>
                                <label htmlFor="terms-check" className="text-sm text-gray-400 cursor-pointer select-none">
                                    J'accepte les <Link to="/terms" className="text-blue-400 hover:underline font-bold">conditions d'utilisation</Link>
                                </label>
                            </div>
                        </motion.div>
                    )}

                    {authError && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg"
                        >
                            {authError}
                        </motion.p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading || (authMode === 'signup' && (!agreedToPolicy || !agreedToTerms || emailExists)) || !!emailError}
                        className={`w-full font-bold py-3 rounded-2xl shadow-lg transition-all ${isLoading || (authMode === 'signup' && (!agreedToPolicy || !agreedToTerms || emailExists)) || emailError
                            ? 'bg-gray-600 cursor-not-allowed opacity-50 text-gray-400'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/30'
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Chargement...
                            </div>
                        ) : (
                            authMode === 'signin' ? 'Se connecter' : 'Créer mon compte'
                        )}
                    </motion.button>
                </form>

                <div className="relative w-full my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-800/50 text-gray-500">ou</span>
                    </div>
                </div>

                {/* Bouton Google avec vrai logo */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-4 rounded-2xl shadow-lg transition-all border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google logo"
                        className="w-5 h-5"
                    />
                    <span>Continuer avec Google</span>
                </button>

                <p className="mt-4 text-sm text-gray-500">
                    {authMode === 'signin' ? "Pas encore de compte ?" : "Déjà un compte ?"}
                    <button
                        onClick={() => {
                            setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                            setAuthError('');
                            setEmailError('');
                        }}
                        className="ml-1 text-blue-400 hover:underline font-medium"
                    >
                        {authMode === 'signin' ? 'Inscris-toi' : 'Connecte-toi'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default AuthPage;