import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Eye, EyeOff, Sparkles, CheckCircle2, ShieldAlert, Terminal, ShieldCheck, Cpu, Globe } from 'lucide-react';
import CyberPet from '../CyberPet';
import GlobalPlacementTest from '../components/GlobalPlacementTest';
import { useLanguage } from '../context/LanguageContext';

const OnboardingPage = ({ user, setUser, API_URL, setToast }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        password: '',
        confirmPassword: '',
        goal: '',
        startingLevel: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPlacementTest, setShowPlacementTest] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/auth');
        } else if (user.hasCompletedOnboarding) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (formData.confirmPassword) {
            setPasswordsMatch(formData.password === formData.confirmPassword);
        } else {
            setPasswordsMatch(true);
        }
    }, [formData.password, formData.confirmPassword]);

    // Determine initial step: skip step 1 if Google user already has password or doesn't need password setup
    useEffect(() => {
        if (user && !user.googleId && step === 1) {
            setStep(2);
        }
    }, [user, step]);

    const handleCompleteOnboarding = async (forcedLevel = null) => {
        setIsLoading(true);
        setError('');

        const finalLevel = forcedLevel || formData.startingLevel;

        try {
            const response = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    password: formData.password,
                    hasCompletedOnboarding: true,
                    onboardingProfile: {
                        goal: formData.goal,
                        startingLevel: finalLevel
                    }
                })
            });

            const data = await response.json();
            if (response.ok) {
                setUser({ ...user, ...data, token: user.token });
                setToast({
                    message: forcedLevel 
                        ? (t('onboardingFlow.forced_beginner') || "On t'a mis en Débutant pour commencer sereinement !") 
                        : (t('onboardingFlow.welcome_interface') || "Bienvenue dans l'Académie Mysterious Classroom !"),
                    type: forcedLevel ? 'info' : 'success'
                });
                navigate('/dashboard');
            } else {
                setError(data.message || t('onboardingFlow.save_error') || "Erreur lors de la sauvegarde.");
                setIsLoading(false);
                setShowPlacementTest(false);
            }
        } catch (err) {
            setError(t('onboardingFlow.network_error') || "Erreur réseau");
            setIsLoading(false);
            setShowPlacementTest(false);
        }
    };

    const handleOnboardingSubmit = (e) => {
        e.preventDefault();
        if (formData.startingLevel === 'Débutant') {
            handleCompleteOnboarding();
        } else {
            setShowPlacementTest(true);
        }
    };

    if (!user) return null;

    const goals = [
        {
            id: 'goal_ethical_hacking',
            title: t('onboardingFlow.goal_1_title') || '🛡️ Hacking Éthique & Pentest',
            desc: t('onboardingFlow.goal_1_desc') || 'Infiltration Web, XSS, Injection SQL, CSRF & Failles Web',
            icon: ShieldCheck
        },
        {
            id: 'goal_linux_admin',
            title: t('onboardingFlow.goal_2_title') || '🐧 Administration Linux & Terminal',
            desc: t('onboardingFlow.goal_2_desc') || 'Commandes Bash, Privilèges Root, Shell & Automation',
            icon: Terminal
        },
        {
            id: 'goal_network_recon',
            title: t('onboardingFlow.goal_3_title') || '🌐 Analyse Réseau & Web Recon',
            desc: t('onboardingFlow.goal_3_desc') || 'Port Scanning Nmap, Footprinting, Audit & Wireshark',
            icon: Globe
        },
        {
            id: 'goal_python_dev',
            title: t('onboardingFlow.goal_4_title') || '💻 Développement & Code Sécurisé',
            desc: t('onboardingFlow.goal_4_desc') || 'Scripts Python, Exploits Custom & Algorithmique',
            icon: Cpu
        },
        {
            id: 'goal_other',
            title: t('onboardingFlow.goal_5_title') || '✨ Autre / Exploration Globale',
            desc: t('onboardingFlow.goal_5_desc') || 'Découverte générale et exploration de tous les modules de formation',
            icon: Sparkles
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-transparent overflow-hidden relative">
            {showPlacementTest && (
                <GlobalPlacementTest
                    level={formData.startingLevel}
                    onPass={() => handleCompleteOnboarding()}
                    onFail={() => handleCompleteOnboarding('Débutant')}
                />
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full max-w-md relative z-10 ${showPlacementTest ? 'blur-md pointer-events-none' : ''}`}
            >
                <div className="bg-white/90 backdrop-blur-2xl border border-blue-500/20 p-8 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)]">
                    <div className="flex justify-center mb-6">
                        <CyberPet isPasswordFocused={isPasswordFocused || showPassword} user={user} />
                    </div>

                    <h2 className="text-3xl brand-font text-slate-800 text-center mb-1 tracking-tight flex items-center justify-center gap-2">
                        <Sparkles size={24} className="text-blue-600" />
                        {t('onboardingFlow.title') || "FINALISATION"}
                    </h2>
                    <p className="text-slate-500 text-center text-xs font-semibold mb-6">
                        {t('onboardingFlow.subtitle') || "Configurez vos identifiants et votre profil d'apprentissage"}
                    </p>

                    <form onSubmit={step === 3 ? handleOnboardingSubmit : (e) => { e.preventDefault(); setStep(step + 1); }} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                                    <div className="text-center p-4 bg-blue-50 border border-blue-200/80 rounded-2xl mb-4">
                                        <p className="text-xs text-blue-900 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: (t('onboardingFlow.google_pwd_info') || "Bienvenue ! Comme vous êtes connecté via Google, définissez un mot de passe local pour pouvoir vous connecter avec <strong class=\"text-blue-600 font-bold\">{email}</strong> à tout moment.").replace('{email}', user.email) }} />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder={t('onboardingFlow.pwd_placeholder') || "Nouveau mot de passe"}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                            className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors font-medium text-sm"
                                            required
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder={t('onboardingFlow.confirm_pwd_placeholder') || "Confirmer le mot de passe"}
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                            className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors font-medium text-sm"
                                            required
                                        />
                                    </div>

                                    {!passwordsMatch && formData.confirmPassword && (
                                        <p className="text-red-500 text-[11px] font-bold uppercase tracking-widest pl-1 flex items-center gap-1.5">
                                            <ShieldAlert size={14} />
                                            {t('onboardingFlow.pwd_mismatch') || "Les mots de passe ne correspondent pas"}
                                        </p>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!formData.password || formData.password.length < 6 || !passwordsMatch) {
                                                setError(t('onboardingFlow.invalid_pwd') || "Veuillez remplir un mot de passe valide (min 6 caractères).");
                                                return;
                                            }
                                            setError('');
                                            setStep(2);
                                        }}
                                        disabled={!passwordsMatch || !formData.password || formData.password.length < 6}
                                        className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group ${(!passwordsMatch || !formData.password || formData.password.length < 6) ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                                    >
                                        {t('onboardingFlow.continue') || "Continuer"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                                    <h3 className="text-base font-extrabold text-center text-slate-800 tracking-tight">
                                        {t('onboardingFlow.goal_question') || "Quelle est votre spécialité cible ?"}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {goals.map(g => {
                                            const isSelected = formData.goal === g.title;
                                            const Icon = g.icon;
                                            return (
                                                <button
                                                    key={g.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, goal: g.title })}
                                                    className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between group ${isSelected ? 'border-2 border-blue-600 bg-blue-50/90 text-blue-900 shadow-md shadow-blue-500/10 scale-[1.01]' : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200/80 text-slate-600 group-hover:bg-slate-300'}`}>
                                                            <Icon size={18} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-sm text-slate-900">{g.title}</span>
                                                            <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">{g.desc}</span>
                                                        </div>
                                                    </div>
                                                    {isSelected && <CheckCircle2 size={20} className="text-blue-600 shrink-0 ml-2" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                                        <button type="button" onClick={() => setStep(1)} className="px-5 py-3 font-bold text-xs uppercase tracking-wider text-slate-400 hover:text-slate-700 transition">{t('onboardingFlow.back') || "Retour"}</button>
                                        <button type="button" onClick={() => setStep(3)} disabled={!formData.goal} className={`flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/20 group ${!formData.goal ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}>{t('onboardingFlow.next') || "Suivant"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-4">
                                    <h3 className="text-base font-extrabold text-center text-slate-800 tracking-tight">
                                        {t('onboardingFlow.level_question') || "Quel est votre niveau actuel en sécurité ?"}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, startingLevel: 'Débutant' })}
                                            className={`p-4 justify-between items-center rounded-2xl border flex transition-all ${formData.startingLevel === 'Débutant' ? 'border-2 border-blue-600 bg-blue-50/90 text-blue-900 shadow-md shadow-blue-500/10 scale-[1.01]' : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'}`}
                                        >
                                            <div className="flex flex-col text-left">
                                                <span className="font-bold text-slate-900">{t('onboardingFlow.level_beginner_title') || "🐣 Total Débutant"}</span>
                                                <span className="text-xs text-slate-500 font-medium mt-0.5">{t('onboardingFlow.level_beginner_desc') || "Je démarre de zéro et je veux apprendre les bases"}</span>
                                            </div>
                                            {formData.startingLevel === 'Débutant' && <CheckCircle2 size={20} className="text-blue-600 shrink-0 ml-2" />}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, startingLevel: 'Intermédiaire' })}
                                            className={`p-4 justify-between items-center rounded-2xl border flex transition-all ${formData.startingLevel === 'Intermédiaire' ? 'border-2 border-blue-600 bg-blue-50/90 text-blue-900 shadow-md shadow-blue-500/10 scale-[1.01]' : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'}`}
                                        >
                                            <div className="flex flex-col text-left">
                                                <span className="font-bold text-slate-900">{t('onboardingFlow.level_inter_title') || "🚀 Intermédiaire"}</span>
                                                <span className="text-xs text-slate-500 font-medium mt-0.5">{t('onboardingFlow.level_inter_desc') || "J'ai déjà des notions de réseau, Linux ou programmation"}</span>
                                            </div>
                                            {formData.startingLevel === 'Intermédiaire' && <CheckCircle2 size={20} className="text-blue-600 shrink-0 ml-2" />}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, startingLevel: 'Avancé' })}
                                            className={`p-4 justify-between items-center rounded-2xl border flex transition-all ${formData.startingLevel === 'Avancé' ? 'border-2 border-blue-600 bg-blue-50/90 text-blue-900 shadow-md shadow-blue-500/10 scale-[1.01]' : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'}`}
                                        >
                                            <div className="flex flex-col text-left">
                                                <span className="font-bold text-slate-900">{t('onboardingFlow.level_adv_title') || "💻 Avancé"}</span>
                                                <span className="text-xs text-slate-500 font-medium mt-0.5">{t('onboardingFlow.level_adv_desc') || "Je pratique déjà et souhaite passer le test de positionnement"}</span>
                                            </div>
                                            {formData.startingLevel === 'Avancé' && <CheckCircle2 size={20} className="text-blue-600 shrink-0 ml-2" />}
                                        </button>
                                    </div>

                                    {error && <p className="text-red-500 text-xs text-center font-bold bg-red-500/10 py-2.5 rounded-xl border border-red-500/20">{error}</p>}

                                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                                        <button type="button" onClick={() => setStep(2)} className="px-5 py-3 font-bold text-xs uppercase tracking-wider text-slate-400 hover:text-slate-700 transition">{t('onboardingFlow.back') || "Retour"}</button>
                                        <button type="submit" disabled={!formData.startingLevel || isLoading} className={`flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/20 ${!formData.startingLevel || isLoading ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}>
                                            {isLoading ? (t('onboardingFlow.creating') || 'Création...') : (t('onboardingFlow.validate_create') || 'Valider & Accéder au Tableau de Bord 🚀')}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default OnboardingPage;
