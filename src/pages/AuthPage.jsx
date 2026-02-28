import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import CyberPet from '../CyberPet';

const AuthPage = ({ user, setUser, API_URL, setToast }) => {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState('signin'); // 'signin', 'signup', 'verification'
    const [signupStep, setSignupStep] = useState(1);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', goal: '', startingLevel: '' });
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
                if (data.twoFactorRequired) {
                    setAuthMode('two-factor');
                    setFormData({ ...formData, email: data.email });
                    setToast({ message: data.message, type: 'info' });
                } else {
                    setPetSecret({ type: 'excited' });
                    localStorage.setItem('user', JSON.stringify(data));
                    localStorage.setItem('token', data.token);
                    setUser(data);
                    // Delay to see the pet reaction
                    setTimeout(() => {
                        navigate(data.role === 'admin' ? '/admin' : '/dashboard');
                    }, 1000);
                }
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

    const handleVerifyTwoFactor = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAuthError('');
        try {
            const response = await fetch(`${API_URL}/2fa/login-verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, code: verificationKey }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                setUser(data.user);
                setToast({ message: 'Authentification réussie !', type: 'success' });
                navigate('/dashboard');
            } else {
                setAuthError(data.message || 'Code invalide');
            }
        } catch (err) {
            setAuthError('Erreur réseau');
        } finally {
            setIsLoading(false);
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

                    <form onSubmit={authMode === 'verification' ? handleVerifyEmail : (authMode === 'two-factor' ? handleVerifyTwoFactor : (authMode === 'signin' ? handleLogin : handleRegister))} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {(authMode === 'verification' || authMode === 'two-factor') ? (
                                <motion.div
                                    key="verify"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <p className="text-slate-500 text-center text-sm font-medium">
                                        {authMode === 'two-factor' ? "Saisis le code 2FA envoyé à ton téléphone" : `Code envoyé à ${formData.email}`}
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
                                        {isLoading ? 'Vérification...' : (authMode === 'two-factor' ? 'Vérifier' : 'Activer mon compte')}
                                    </button>
                                    {authMode === 'verification' && (
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
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                    {(authMode === 'signin' || (authMode === 'signup' && signupStep === 1)) && (
                                        <AnimatePresence mode="wait">
                                            <motion.div key="step1" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                                                {authMode === 'signup' && (
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <input
                                                            type="text"
                                                            placeholder="Prénom"
                                                            value={formData.firstName}
                                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                                                            required={authMode === 'signup'}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Nom"
                                                            value={formData.lastName}
                                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                                                            required={authMode === 'signup'}
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
                                                            required={authMode === 'signup'}
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

                                                {authMode === 'signin' ? (
                                                    <button
                                                        type="submit"
                                                        disabled={isLoading}
                                                        className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group ${isLoading ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                                                    >
                                                        {isLoading ? 'Chargement...' : 'Connexion'}
                                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || formData.password.length < 6 || !passwordsMatch || !agreedToPolicy || !agreedToTerms) {
                                                                setAuthError("Veuillez remplir correctement tous les champs.");
                                                                return;
                                                            }
                                                            setAuthError('');
                                                            setSignupStep(2);
                                                        }}
                                                        disabled={(!agreedToPolicy || !agreedToTerms || !passwordsMatch || !formData.password || formData.password.length < 6)}
                                                        className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group ${(!agreedToPolicy || !agreedToTerms || !passwordsMatch || !formData.password || formData.password.length < 6) ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                                                    >
                                                        Suivant
                                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    )}

                                    {authMode === 'signup' && signupStep === 2 && (
                                        <AnimatePresence mode="wait">
                                            <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                                                <h3 className="text-xl font-bold text-center text-slate-800">Quel est ton objectif principal ?</h3>
                                                <p className="text-center text-sm text-slate-500 mb-4">Cela nous aide à personnaliser ton parcours.</p>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['Découvrir le code', 'Créer des sites web', 'Devenir développeur', 'Passer des examens'].map(goal => (
                                                        <button
                                                            key={goal}
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, goal })}
                                                            className={`p-4 rounded-xl border text-left font-semibold transition-all ${formData.goal === goal ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-blue-300'}`}
                                                        >
                                                            {goal}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                                                    <button type="button" onClick={() => setSignupStep(1)} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition">Retour</button>
                                                    <button type="button" onClick={() => setSignupStep(3)} disabled={!formData.goal} className={`flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition ${!formData.goal ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-lg'}`}>Suivant <ArrowRight size={18} /></button>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    )}

                                    {authMode === 'signup' && signupStep === 3 && (
                                        <AnimatePresence mode="wait">
                                            <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-4">
                                                <h3 className="text-xl font-bold text-center text-slate-800">Quel est ton niveau actuel ?</h3>
                                                <p className="text-center text-sm text-slate-500 mb-4">Nous adapterons la difficulté de tes leçons.</p>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <button type="button" onClick={() => setFormData({ ...formData, startingLevel: 'Débutant' })} className={`p-4 justify-between items-center rounded-xl border flex transition-all ${formData.startingLevel === 'Débutant' ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-slate-200 hover:bg-slate-50 hover:border-purple-300'}`}>
                                                        <div className="flex flex-col text-left">
                                                            <span className={`font-bold ${formData.startingLevel === 'Débutant' ? 'text-purple-700' : 'text-slate-700'}`}>Total Débutant</span>
                                                            <span className="text-xs text-slate-500 mt-1">Je n'ai jamais codé de ma vie</span>
                                                        </div>
                                                        <span className="text-2xl ml-4">🐣</span>
                                                    </button>
                                                    <button type="button" onClick={() => setFormData({ ...formData, startingLevel: 'Amateur' })} className={`p-4 justify-between items-center rounded-xl border flex transition-all ${formData.startingLevel === 'Amateur' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-200 hover:bg-slate-50 hover:border-blue-300'}`}>
                                                        <div className="flex flex-col text-left">
                                                            <span className={`font-bold ${formData.startingLevel === 'Amateur' ? 'text-blue-700' : 'text-slate-700'}`}>Amateur</span>
                                                            <span className="text-xs text-slate-500 mt-1">J'ai quelques bases en programmation</span>
                                                        </div>
                                                        <span className="text-2xl ml-4">🚀</span>
                                                    </button>
                                                    <button type="button" onClick={() => setFormData({ ...formData, startingLevel: 'Expérimenté' })} className={`p-4 justify-between items-center rounded-xl border flex transition-all ${formData.startingLevel === 'Expérimenté' ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-slate-200 hover:bg-slate-50 hover:border-orange-300'}`}>
                                                        <div className="flex flex-col text-left">
                                                            <span className={`font-bold ${formData.startingLevel === 'Expérimenté' ? 'text-orange-700' : 'text-slate-700'}`}>Expérimenté</span>
                                                            <span className="text-xs text-slate-500 mt-1">Je code déjà de façon autonome</span>
                                                        </div>
                                                        <span className="text-2xl ml-4">💻</span>
                                                    </button>
                                                </div>

                                                {authError && <p className="text-red-500 text-sm text-center font-bold bg-red-500/10 py-2 rounded-xl border border-red-500/20">{authError}</p>}

                                                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                                                    <button type="button" onClick={() => setSignupStep(2)} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition">Retour</button>
                                                    <button type="submit" disabled={!formData.startingLevel || isLoading} className={`flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition ${!formData.startingLevel || isLoading ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:scale-105'}`}>
                                                        {isLoading ? 'Création...' : 'Valider & Créer 🎉'}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    )}

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
                                    onClick={() => {
                                        setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                                        if (authMode === 'signin') setSignupStep(1);
                                    }}
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