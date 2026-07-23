import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, XCircle, ArrowRight, ShieldCheck, FileText, X } from 'lucide-react';
import CyberPet from '../CyberPet';
import { useLanguage } from '../context/LanguageContext';

const AuthPage = ({ user, setUser, API_URL, setToast }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const [authMode, setAuthMode] = useState(location.state?.register ? 'signup' : 'signin'); // 'signin', 'signup', 'verification'
    const [signupStep, setSignupStep] = useState(1);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', goal: '', startingLevel: '' });
    const [verificationKey, setVerificationKey] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'policy', 'terms', or null
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
                        <CyberPet isPasswordFocused={isPasswordFocused || showPassword} onSecret={petSecret} user={user} />
                    </div>

                    <h2 className="text-3xl brand-font text-slate-800 text-center mb-8 tracking-tight">
                        {authMode === 'verification' ? t('authPage.verification') || 'Vérification' : (authMode === 'signin' ? t('authPage.signin') || 'Connexion' : t('authPage.signup') || 'Inscription')}
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
                                        {authMode === 'two-factor' ? t('authPage.two_factor_prompt') || "Saisis le code 2FA envoyé à ton téléphone" : `${t('authPage.code_sent_to') || "Code envoyé à"} ${formData.email}`}
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
                                        {isLoading ? t('authPage.loading') || 'Chargement...' : (authMode === 'two-factor' ? t('authPage.verify') || 'Vérifier' : t('authPage.activate_account') || 'Activer mon compte')}
                                    </button>
                                    {authMode === 'verification' && (
                                        <button
                                            type="button"
                                            onClick={handleResendCode}
                                            disabled={resendCooldown > 0}
                                            className={`w-full text-slate-500 hover:text-white text-sm transition-colors ${resendCooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {resendCooldown > 0
                                                ? `${t('authPage.resend_code') || "Renvoyer le code"} (${resendCooldown}s)`
                                                : t('authPage.resend_code') || "Renvoyer le code"}
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
                                                            placeholder={t('authPage.firstname') || "Prénom"}
                                                            value={formData.firstName}
                                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors"
                                                            required={authMode === 'signup'}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder={t('authPage.lastname') || "Nom"}
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
                                                        placeholder={t('authPage.email') || "Email"}
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
                                                        placeholder={t('authPage.password') || "Mot de passe"}
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
                                                            placeholder={t('authPage.confirm_password') || "Confirmer le mot de passe"}
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
                                                    <div className="flex flex-col gap-2.5 pt-1">
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="checkbox"
                                                                id="policy-check"
                                                                checked={agreedToPolicy}
                                                                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                                                                className="w-4 h-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                            />
                                                            <div className="text-xs text-slate-500 flex-1">
                                                                {t('authPage.accept_policy') || "J'accepte la "}{' '}
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setActiveModal('policy');
                                                                    }}
                                                                    className="text-blue-600 font-semibold hover:underline cursor-pointer"
                                                                >
                                                                    {t('authPage.policy') || "politique de confidentialité"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="checkbox"
                                                                id="terms-check"
                                                                checked={agreedToTerms}
                                                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                                                className="w-4 h-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                            />
                                                            <div className="text-xs text-slate-500 flex-1">
                                                                {t('authPage.accept_terms') || "J'accepte les "}{' '}
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setActiveModal('terms');
                                                                    }}
                                                                    className="text-blue-600 font-semibold hover:underline cursor-pointer"
                                                                >
                                                                    {t('authPage.terms') || "conditions d'utilisation"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {authMode === 'signup' && !passwordsMatch && formData.confirmPassword && (
                                                    <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest pl-2 animate-pulse">
                                                        {t('authPage.passwords_mismatch') || "Les mots de passe ne correspondent pas"}
                                                    </p>
                                                )}

                                                 {authMode === 'signin' && (
                                                     <div className="text-right -mt-2 mb-2">
                                                         <button
                                                             type="button"
                                                             onClick={async () => {
                                                                 if (!formData.email) {
                                                                     setAuthError('Veuillez saisir votre adresse email pour réinitialiser le mot de passe.');
                                                                     return;
                                                                 }
                                                                 setIsLoading(true);
                                                                 setAuthError('');
                                                                 try {
                                                                     const res = await fetch(`${API_URL}/auth/forgot-password`, {
                                                                         method: 'POST',
                                                                         headers: { 'Content-Type': 'application/json' },
                                                                         body: JSON.stringify({ email: formData.email }),
                                                                     });
                                                                     const data = await res.json();
                                                                     if (res.ok) {
                                                                         setToast({ message: 'Email de réinitialisation envoyé ! Consultez votre boîte mail.', type: 'success' });
                                                                     } else {
                                                                         setAuthError(data.message || 'Erreur lors de l\'envoi');
                                                                     }
                                                                 } catch (err) {
                                                                     setAuthError('Erreur réseau');
                                                                 } finally {
                                                                     setIsLoading(false);
                                                                 }
                                                             }}
                                                             className="text-xs text-blue-600 hover:underline font-semibold"
                                                         >
                                                             {t('authPage.forgot_password') || "Mot de passe oublié ?"}
                                                         </button>
                                                     </div>
                                                 )}

                                                 {authError && (
                                                     <div className="space-y-2">
                                                         <p className="text-red-500 text-sm text-center font-bold bg-red-500/10 py-2.5 px-4 rounded-xl border border-red-500/20">
                                                             {authError}
                                                         </p>
                                                         {authError.includes("existe déjà") && (
                                                             <button
                                                                 type="button"
                                                                 onClick={() => {
                                                                     setAuthMode('signin');
                                                                     setAuthError('');
                                                                 }}
                                                                 className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                                                             >
                                                                 <ArrowRight size={14} /> {t('authPage.direct_login') || "Se connecter directement avec cet email"}
                                                             </button>
                                                         )}
                                                         {authError.includes("lié à Google") && (
                                                             <div className="flex flex-col gap-2 pt-1">
                                                                 <button
                                                                     type="button"
                                                                     onClick={handleGoogleLogin}
                                                                     className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                                                                 >
                                                                     <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                                                                     {t('authPage.google_login') || "Se connecter avec Google"}
                                                                 </button>
                                                                 <button
                                                                     type="button"
                                                                     onClick={async () => {
                                                                         if (!formData.email) return;
                                                                         setIsLoading(true);
                                                                         try {
                                                                             const res = await fetch(`${API_URL}/auth/forgot-password`, {
                                                                                 method: 'POST',
                                                                                 headers: { 'Content-Type': 'application/json' },
                                                                                 body: JSON.stringify({ email: formData.email }),
                                                                             });
                                                                             const data = await res.json();
                                                                             if (res.ok) {
                                                                                 setToast({ message: t('authPage.email_sent_local') || 'Email envoyé ! Suivez le lien pour créer un mot de passe local.', type: 'success' });
                                                                                 setAuthError('');
                                                                             } else {
                                                                                 setToast({ message: data.message || t('authPage.error') || 'Erreur', type: 'error' });
                                                                             }
                                                                         } catch (err) {
                                                                             setToast({ message: t('authPage.network_error') || 'Erreur réseau', type: 'error' });
                                                                         } finally {
                                                                             setIsLoading(false);
                                                                         }
                                                                     }}
                                                                     className="text-xs text-blue-600 font-semibold hover:underline text-center py-1"
                                                                 >
                                                                     {t('authPage.set_local_password') || "🔑 Définir un mot de passe local pour ce compte"}
                                                                 </button>
                                                             </div>
                                                         )}
                                                     </div>
                                                 )}

                                                {authMode === 'signin' ? (
                                                    <button
                                                        type="submit"
                                                        disabled={isLoading}
                                                        className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group ${isLoading ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                                                    >
                                                        {isLoading ? t('authPage.loading') || 'Chargement...' : t('authPage.signin') || 'Connexion'}
                                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="submit"
                                                        disabled={isLoading || !formData.firstName || !formData.lastName || !!emailError || !formData.password || !passwordsMatch || !agreedToPolicy || !agreedToTerms}
                                                        className={`w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 group ${(isLoading || !formData.firstName || !formData.lastName || !!emailError || !formData.password || !passwordsMatch || !agreedToPolicy || !agreedToTerms) ? 'opacity-50 grayscale cursor-not-allowed' : 'shadow-blue-500/25 hover:scale-[1.02] active:scale-95'}`}
                                                    >
                                                        {isLoading ? t('authPage.creating') || 'Création...' : t('authPage.signup') || "S'inscrire"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    )}

                                    {/* Onboarding steps removed from here, moved to OnboardingPage after verification */}

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    {authMode !== 'verification' && (
                        <div className="mt-8 space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-slate-400 font-bold tracking-wider">{t('authPage.or_with') || "ou avec"}</span></div>
                            </div>

                            <button
                                onClick={handleGoogleLogin}
                                className="w-full py-3.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-sm"
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                                Google
                            </button>

                            <p className="text-center text-sm text-slate-500 font-medium">
                                {authMode === 'signin' ? t('authPage.no_account') || "Pas de compte ?" : t('authPage.already_account') || "Déjà un compte ?"}
                                <button
                                    onClick={() => {
                                        setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                                        if (authMode === 'signin') setSignupStep(1);
                                    }}
                                    className="ml-2 text-blue-600 font-bold hover:underline"
                                >
                                    {authMode === 'signin' ? t('authPage.signup') || "S'inscrire" : t('authPage.signin') || "Se connecter"}
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Modal Politique de confidentialité & Conditions d'utilisation */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden text-left"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
                                        {activeModal === 'policy' ? <ShieldCheck size={24} /> : <FileText size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">
                                            {activeModal === 'policy' ? t('authPage.policy_title') || 'Politique de Confidentialité' : t('authPage.terms_title') || "Conditions d'Utilisation"}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-medium">Mysterious Classroom</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setActiveModal(null)}
                                    className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body Content */}
                            <div className="overflow-y-auto pr-2 space-y-4 text-sm text-slate-600 leading-relaxed flex-1 custom-scrollbar">
                                {activeModal === 'policy' ? (
                                    <>
                                        <section className="space-y-1.5">
                                            <h4 className="font-bold text-slate-800 mb-2">{t('authPage.collection_title') || "🛡️ 1. Collecte des données"}</h4>
                                            <p className="text-slate-600 leading-relaxed mb-4">
                                                {t('authPage.collection_desc') || "Sur Mysterious Classroom, nous recueillons uniquement les informations essentielles pour créer votre espace d'apprentissage : prénom, nom, adresse email et votre niveau initial."}
                                            </p>

                                            <h4 className="font-bold text-slate-800 mb-2">{t('authPage.usage_title') || "🎯 2. Utilisation des données"}</h4>
                                            <p className="text-slate-600 leading-relaxed mb-2">
                                                {t('authPage.usage_desc') || "Vos données sont utilisées exclusivement pour :"}
                                            </p>
                                            <ul className="list-disc pl-5 text-slate-600 space-y-1 mb-4">
                                                <li>{t('authPage.usage_list1') || "Sauvegarder votre progression dans les cours et exercices."}</li>
                                                <li>{t('authPage.usage_list2') || "Calculer votre score XP, vos streaks et vos badges de réussite."}</li>
                                                <li>{t('authPage.usage_list3') || "Adapter les recommandations et l'assistance de notre IA pédagogique."}</li>
                                            </ul>

                                            <h4 className="font-bold text-slate-800 mb-2">{t('authPage.security_title') || "🔒 3. Sécurité & Confidentialité"}</h4>
                                            <p className="text-slate-600 leading-relaxed mb-4">
                                                {t('authPage.security_desc') || "Vos mots de passe sont chiffrés avec bcrypt. Nous ne revendons ni ne partageons jamais vos données personnelles à des tiers."}
                                            </p>

                                            <h4 className="font-bold text-slate-800 mb-2">{t('authPage.rights_title') || "⚙️ 4. Vos Droits"}</h4>
                                            <p className="text-slate-600 leading-relaxed">
                                                {t('authPage.rights_desc') || "Vous disposez d'un droit d'accès, d'exportation et de suppression définitive de votre compte à tout moment depuis les paramètres de votre profil."}
                                            </p>
                                        </section>
                                    </>
                                ) : (
                                    <>
                                        <section className="space-y-1.5">
                                            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                                📚 1. Accès à la plateforme
                                            </h4>
                                            <p className="text-xs text-slate-600">
                                                <strong>Mysterious Classroom</strong> met à votre disposition un accès libre aux parcours de formation, quiz et environnements d'apprentissage interactifs.
                                            </p>
                                        </section>

                                        <section className="space-y-1.5">
                                            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                                🤝 2. Engagements de l'utilisateur
                                            </h4>
                                            <p className="text-xs text-slate-600">
                                                En créant un compte, vous vous engagez à :
                                            </p>
                                            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500">
                                                <li>Fournir des informations exactes lors de votre inscription.</li>
                                                <li>Préserver la confidentialité de vos identifiants.</li>
                                                <li>Respecter la communauté et faire une utilisation loyale des ressources.</li>
                                            </ul>
                                        </section>

                                        <section className="space-y-1.5">
                                            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                                💡 3. Propriété Intellectuelle
                                            </h4>
                                            <p className="text-xs text-slate-600">
                                                Les cours, exercices, illustrations et mascottes sont la propriété exclusive de Mysterious Classroom.
                                            </p>
                                        </section>

                                        <section className="space-y-1.5">
                                            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                                ⚡ 4. Évolution du service
                                            </h4>
                                            <p className="text-xs text-slate-600">
                                                Des mises à jour régulières peuvent enrichir ou ajuster le contenu des cours pour garantir la meilleure qualité d'apprentissage.
                                            </p>
                                        </section>
                                    </>
                                )}
                            </div>

                            {/* Footer Action */}
                            <div className="pt-4 mt-4 border-t border-slate-100 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (activeModal === 'policy') setAgreedToPolicy(true);
                                        if (activeModal === 'terms') setAgreedToTerms(true);
                                        setActiveModal(null);
                                    }}
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm"
                                >
                                    <CheckCircle size={18} />
                                    J'ai lu et j'accepte
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AuthPage;