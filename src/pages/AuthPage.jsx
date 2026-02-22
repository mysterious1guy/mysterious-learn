import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import CyberPet from '../CyberPet';

const AuthPage = ({ user, setUser, API_URL, setToast }) => {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState('signin'); // 'signin', 'signup', 'verification'
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [verificationKey, setVerificationKey] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [petSecret, setPetSecret] = useState(null);
    const [resendCooldown, setResendCooldown] = useState(0);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return '';
        if (!re.test(email)) return 'Format d\'email invalide';
        return '';
    };

    useEffect(() => {
        setEmailError(validateEmail(formData.email));
    }, [formData.email]);

    useEffect(() => {
        if (formData.password.length === 0) setPasswordStrength(0);
        else if (formData.password.length < 6) setPasswordStrength(1);
        else if (formData.password.length < 8) setPasswordStrength(2);
        else setPasswordStrength(3);

        if (formData.confirmPassword) {
            setPasswordsMatch(formData.password === formData.confirmPassword);
        } else {
            setPasswordsMatch(true);
        }
    }, [formData.password, formData.confirmPassword]);

    useEffect(() => {
        if (user) navigate('/dashboard');
    }, [user, navigate]);

    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        const redirectUri = import.meta.env.DEV
            ? `${window.location.origin}/api/auth/google/callback`
            : 'https://mysterious-classroom-free-courses.onrender.com/api/auth/google/callback';

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email profile&prompt=select_account`;
        window.location.href = googleAuthUrl;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
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
                setPetSecret({ type: 'excited' });
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('token', data.token);
                setUser(data);
                // Delay to see the pet reaction
                setTimeout(() => {
                    navigate(data.role === 'admin' ? '/admin' : '/dashboard');
                }, 1000);
            } else if (response.status === 403 && data.unverified) {
                setAuthMode('verification');
                setFormData({ ...formData, email: data.email });
                setToast({ message: data.message, type: 'warning' });
            } else {
                setAuthError(data.message || 'Email ou mot de passe incorrect');
            }
        } catch (err) {
            setAuthError('Erreur réseau');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setAuthError('Les mots de passe ne correspondent pas');
            return;
        }
        if (!agreedToPolicy || !agreedToTerms) {
            setAuthError('Veuillez accepter les conditions');
            return;
        }
        setIsLoading(true);
        setAuthError('');
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setAuthMode('verification');
                setToast({ message: 'Code de vérification envoyé !', type: 'info' });
            } else {
                setAuthError(data.message || 'Erreur lors de l\'inscription');
            }
        } catch (err) {
            setAuthError('Erreur réseau');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAuthError('');
        try {
            const response = await fetch(`${API_URL}/auth/verify-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, code: verificationKey }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('token', data.token);
                setUser(data);
                setToast({ message: 'Compte activé !', type: 'success' });
                navigate('/onboarding');
            } else {
                setAuthError(data.message || 'Code invalide');
            }
        } catch (err) {
            setAuthError('Erreur réseau');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (resendCooldown > 0) return;
        try {
            await fetch(`${API_URL}/auth/resend-verification`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email }),
            });
            setToast({ message: 'Nouveau code envoyé !', type: 'success' });
            setResendCooldown(60); // Start 60s cooldown
        } catch (err) {
            setToast({ message: 'Erreur lors du renvoi', type: 'error' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-transparent overflow-hidden relative">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/90 backdrop-blur-2xl border border-blue-500/20 p-8 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)]">
                    <div className="flex justify-center mb-6">
                        <CyberPet isPasswordFocused={isPasswordFocused} onSecret={petSecret} user={user} />
                    </div>

                    <h2 className="text-3xl brand-font text-slate-800 text-center mb-8 tracking-tight">
                        {authMode === 'verification' ? 'Vérification' : (authMode === 'signin' ? 'Connexion' : 'Inscription')}
                    </h2>

                    <form onSubmit={authMode === 'verification' ? handleVerifyEmail : (authMode === 'signin' ? handleLogin : handleRegister)} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {authMode === 'verification' ? (
                                <motion.div
                                    key="verify"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <p className="text-slate-500 text-center text-sm font-medium">
                                        Code envoyé à <span className="text-blue-600 font-bold">{formData.email}</span>
                                    </p>
                                    <input
                                        type="text"
                                        maxLength="6"
                                        placeholder="000000"
                                        value={verificationKey}
                                        onChange={(e) => setVerificationKey(e.target.value.replace(/\D/g, ''))}
                                        className="w-full py-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-3xl font-bold tracking-[0.3em] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || verificationKey.length !== 6}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/25"
                                    >
                                        {isLoading ? 'Vérification...' : 'Activer mon compte'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResendCode}
                                        disabled={resendCooldown > 0}
                                        className={`w-full text-slate-500 hover:text-white text-sm transition-colors ${resendCooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {resendCooldown > 0
                                            ? `Renvoyer le code (${resendCooldown}s)`
                                            : "Renvoyer le code"}
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                    {authMode === 'signup' && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Prénom"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Nom"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Mot de passe"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                            className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                                            required
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    {authMode === 'signup' && (
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Confirmer le mot de passe"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                onFocus={() => setIsPasswordFocused(true)}
                                                onBlur={() => setIsPasswordFocused(false)}
                                                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                                                required
                                            />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    )}

                                    {authMode === 'signup' && (
                                        <div className="flex flex-col gap-2">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" checked={agreedToPolicy} onChange={(e) => setAgreedToPolicy(e.target.checked)} className="w-4 h-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500" />
                                                <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors">Politique de confidentialité</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="w-4 h-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500" />
                                                <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors">Conditions d'utilisation</span>
                                            </label>
                                        </div>
                                    )}

                                    {authMode === 'signup' && !passwordsMatch && formData.confirmPassword && (
                                        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest pl-2 animate-pulse">
                                            Les mots de passe ne correspondent pas
                                        </p>
                                    )}

                                    {authError && <p className="text-red-500 text-sm text-center font-bold bg-red-500/10 py-2 rounded-xl border border-red-500/20">{authError}</p>}

                                    <button
                                        type="submit"
                                        disabled={isLoading || (authMode === 'signup' && (!agreedToPolicy || !agreedToTerms || !passwordsMatch || !formData.password || formData.password.length < 6))}
                                        className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group ${isLoading || (authMode === 'signup' && (!agreedToPolicy || !agreedToTerms || !passwordsMatch || !formData.password || formData.password.length < 6)) ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                                    >
                                        {isLoading ? 'Chargement...' : (authMode === 'signin' ? 'Connexion' : 'Créer un compte')}
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    {authMode !== 'verification' && (
                        <div className="mt-8 space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-slate-400 font-bold tracking-wider">ou avec</span></div>
                            </div>

                            <button
                                onClick={handleGoogleLogin}
                                className="w-full py-3.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-sm"
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                                Google
                            </button>

                            <p className="text-center text-sm text-slate-500 font-medium">
                                {authMode === 'signin' ? "Pas de compte ?" : "Déjà un compte ?"}
                                <button
                                    onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                                    className="ml-2 text-blue-600 font-bold hover:underline"
                                >
                                    {authMode === 'signin' ? "S'inscrire" : "Se connecter"}
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;