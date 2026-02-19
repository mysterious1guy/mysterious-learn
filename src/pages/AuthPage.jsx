import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import CyberPet from '../CyberPet';

// DEBUG - Pour voir si le composant charge
console.log(' AuthPage: Component loaded');

const AuthPage = ({ setUser, API_URL, setToast, fetchProgressions }) => {
    // DEBUG - Pour voir si le composant s'initialise
    console.log(' AuthPage: Component initializing');

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

    useEffect(() => {
        console.log('🔐 AuthPage: Initialisation mode:', authMode);
        console.log('🔐 AuthPage: User actuel:', user ? 'CONNECTÉ' : 'NON CONNECTÉ');
        console.log('🔐 AuthPage: URL actuelle:', window.location.pathname);

        // Si utilisateur déjà connecté, rediriger vers dashboard
        if (user) {
            console.log('✅ AuthPage: Utilisateur déjà connecté, redirection vers /dashboard');
            navigate('/dashboard');
            return;
        }

        console.log('🔐 AuthPage: Affichage page auth');
    }, [user, navigate, authMode]);

    // Google Login - CORRECTION REDIRECT URI
    const handleGoogleLogin = () => {
        setIsLoading(true);
        console.log('🔐 AuthPage: Lancement Google OAuth');

        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
            'client_id=' + import.meta.env.VITE_GOOGLE_CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent('https://mysterious-classroom-free-courses.onrender.com/api/auth/google/callback') +
            '&response_type=code' +
            '&scope=email profile' +
            '&prompt=select_account';

        console.log('🔐 AuthPage: URL OAuth:', googleAuthUrl);
        window.location.href = googleAuthUrl;
    };

    // Connexion email - SIMPLIFIÉ
    const handleLogin = async (e) => {
        e.preventDefault();
        if (emailError) {
            setAuthError('Veuillez entrer un email valide');
            return;
        }
        setIsLoading(true);
        setAuthError('');

        console.log('🔐 AuthPage: Tentative connexion pour:', formData.email);

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });
            const data = await response.json();

            console.log('🔐 AuthPage: Réponse API:', response.ok ? 'OK' : 'ERREUR', data.message);

            if (response.ok) {
                console.log('✅ AuthPage: Connexion réussie, stockage...');

                // Stockage immédiat
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('token', data.token);

                // Mise à jour du state
                setUser(data);
                setToast({ message: 'Connexion réussie !', type: 'success' });

                console.log('✅ AuthPage: Redirection vers /dashboard');
                // Redirection directe sans délai
                navigate('/dashboard');
            } else {
                console.log('❌ AuthPage: Échec connexion:', data.message);
                setAuthError(data.message || 'Email ou mot de passe incorrect');
            }
        } catch (err) {
            console.error('❌ AuthPage: Erreur réseau:', err);
            setAuthError('Erreur réseau');
        } finally {
            setIsLoading(false);
        }
    };

    // Inscription email
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!agreedToPolicy || !agreedToTerms) {
            setAuthError('Vous devez accepter les conditions');
            return;
        }
        setIsLoading(true);
        setAuthError('');

        console.log('🔐 AuthPage: Tentative inscription pour:', formData.email);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            console.log('🔐 AuthPage: Réponse API:', response.ok ? 'OK' : 'ERREUR', data.message);

            if (response.ok) {
                console.log('✅ AuthPage: Inscription réussie, stockage...');

                // Stockage immédiat
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('token', data.token);

                // Mise à jour du state
                setUser(data);
                setToast({ message: 'Compte créé avec succès !', type: 'success' });

                console.log('✅ AuthPage: Redirection vers /dashboard');
                navigate('/dashboard');
            } else {
                console.log('❌ AuthPage: Échec inscription:', data.message);

                // Si le compte existe déjà et utilise Google
                if (data.message && data.message.includes('existe déjà')) {
                    setAuthError('Ce compte existe déjà. Utilisez Google OAuth pour vous connecter.');
                } else {
                    setAuthError(data.message || 'Erreur lors de l\'inscription');
                }
            }
        } catch (err) {
            console.error('❌ AuthPage: Erreur réseau:', err);
            setAuthError('Erreur réseau');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1e] to-black">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 p-8 rounded-[2.5rem] flex flex-col items-center shadow-2xl shadow-blue-500/5"
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
                                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-2xl py-3 pl-10 pr-4 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 outline-none transition-all duration-300"
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
                                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-2xl py-3 pl-10 pr-4 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 outline-none transition-all duration-300"
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
                            className={`w-full bg-slate-950/50 border rounded-2xl py-3 pl-10 pr-10 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 outline-none transition-all duration-300 ${formData.email && emailError ? 'border-red-500/50' : 'border-slate-700/50'
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
                            className="w-full bg-slate-950/50 border border-slate-700/50 rounded-2xl py-3 pl-10 pr-12 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 outline-none transition-all duration-300"
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
                            ? 'bg-slate-800 cursor-not-allowed opacity-50 text-slate-400'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]'
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
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-slate-900 font-bold py-3 px-4 rounded-2xl shadow-lg transition-all border border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
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