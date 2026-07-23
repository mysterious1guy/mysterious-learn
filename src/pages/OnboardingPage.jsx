import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Eye, EyeOff, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
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

    // Determine initial step
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
                    message: forcedLevel ? (t('onboardingFlow.forced_beginner') || "On t'a mis en Débutant pour commencer sereinement !") : (t('onboardingFlow.welcome_interface') || "Bienvenue sur l'interface !"),
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

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 overflow-hidden relative text-slate-100">
            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[130px] pointer-events-none" />

            {showPlacementTest && (
                <GlobalPlacementTest
                    level={formData.startingLevel}
                    onPass={() => handleCompleteOnboarding()}
                    onFail={() => handleCompleteOnboarding('Débutant')}
                />
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`w-full max-w-md relative z-10 ${showPlacementTest ? 'blur-md pointer-events-none' : ''}`}
            >
                <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="flex justify-center mb-6">
                        <CyberPet isPasswordFocused={isPasswordFocused} user={user} />
                    </div>

                    <h2 className="text-2xl font-black text-white text-center mb-1 tracking-tight uppercase flex items-center justify-center gap-2">
                        <Sparkles size={22} className="text-blue-500" />
                        {t('onboardingFlow.title') || "Finalisation"}
                    </h2>
                    <p className="text-slate-400 text-center text-xs font-semibold mb-6">
                        {t('onboardingFlow.subtitle') || "Configurez votre accès et vos préférences"}
                    </p>

                    <form onSubmit={step === 3 ? handleOnboardingSubmit : (e) => { e.preventDefault(); setStep(step + 1) }} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-5">
                                    <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-4">
                                        <p className="text-xs text-blue-300 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: (t('onboardingFlow.google_pwd_info') || "Bienvenue ! Comme tu es connecté via Google, définis un mot de passe pour pouvoir te connecter directement avec <strong class=\"text-blue-400 font-bold\">{email}</strong> la prochaine fois.").replace('{email}', user.email) }} />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder={t('onboardingFlow.pwd_placeholder') || "Nouveau mot de passe"}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                            className="w-full pl-11 pr-12 py-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                            required
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder={t('onboardingFlow.confirm_pwd_placeholder') || "Confirmer le mot de passe"}
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                            className="w-full pl-11 pr-12 py-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                            required
                                        />
                                    </div>

                                    {!passwordsMatch && formData.confirmPassword && (
                                        <p className="text-red-400 text-[11px] font-bold uppercase tracking-widest pl-1 flex items-center gap-1.5">
                                            <ShieldAlert size={14} />
                                            {t('onboardingFlow.pwd_mismatch') || "Les mots de passe ne correspondent pas"}
                                        </p>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!formData.password || formData.password.length < 6 || !passwordsMatch) {
                                                setError(t('onboardingFlow.invalid_pwd') || "Veuillez remplir un mot de passe valide.");
                                                return;
                                            }
                                            setError('');
                                            setStep(2);
                                        }}
                                        disabled={!passwordsMatch || !formData.password || formData.password.length < 6}
                                        className={`w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 ${(!passwordsMatch || !formData.password || formData.password.length < 6) ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                                    >
                                        {t('onboardingFlow.continue') || "Continuer"} <ArrowRight size={18} />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                                    <h3 className="text-lg font-bold text-center text-white">{t('onboardingFlow.goal_question') || "Quel est ton objectif principal ?"}</h3>
                                    <div className="grid grid-cols-1 gap-2.5">
                                        {[{ key: 'goal_1', def: 'Découvrir le code' }, { key: 'goal_2', def: 'Créer des sites web' }, { key: 'goal_3', def: 'Devenir développeur' }, { key: 'goal_4', def: 'Passer des examens' }].map(g => {
                                            const goal = t(`onboardingFlow.${g.key}`) || g.def;
                                            const isSelected = formData.goal === goal;
                                            return (
                                                <button
                                                    key={goal}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, goal })}
                                                    className={`p-3.5 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${isSelected ? 'border-blue-500 bg-blue-600/20 text-white shadow-lg shadow-blue-500/20 scale-[1.01]' : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'}`}
                                                >
                                                    <span>{goal}</span>
                                                    {isSelected && <CheckCircle2 size={18} className="text-blue-400" />}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className="flex gap-3 mt-4 pt-4 border-t border-slate-800">
                                        <button type="button" onClick={() => setStep(1)} className="px-5 py-3 font-bold text-xs uppercase tracking-wider text-slate-400 hover:text-white transition">{t('onboardingFlow.back') || "Retour"}</button>
                                        <button type="button" onClick={() => setStep(3)} disabled={!formData.goal} className={`flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/30 ${!formData.goal ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}>{t('onboardingFlow.next') || "Suivant"} <ArrowRight size={18} /></button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-4">
                                    <h3 className="text-lg font-bold text-center text-white">{t('onboardingFlow.level_question') || "Quel est ton niveau actuel ?"}</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <button type="button" onClick={() => setFormData({ ...formData, startingLevel: 'Débutant' })} className={`p-4 justify-between items-center rounded-2xl border flex transition-all ${formData.startingLevel === 'Débutant' ? 'border-purple-500 bg-purple-600/20 text-white shadow-lg shadow-purple-500/20 scale-[1.01]' : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'}`}>
                                            <div className="flex flex-col text-left">
                                                <span className="font-black text-white">{t('onboardingFlow.level_beginner_title') || "Total Débutant"}</span>
                                                <span className="text-xs text-slate-400 mt-0.5">{t('onboardingFlow.level_beginner_desc') || "Je n'ai jamais codé de ma vie"}</span>
                                            </div>
                                            <span className="text-2xl ml-4">🐣</span>
                                        </button>
                                        <button type="button" onClick={() => setFormData({ ...formData, startingLevel: 'Intermédiaire' })} className={`p-4 justify-between items-center rounded-2xl border flex transition-all ${formData.startingLevel === 'Intermédiaire' ? 'border-blue-500 bg-blue-600/20 text-white shadow-lg shadow-blue-500/20 scale-[1.01]' : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'}`}>
                                            <div className="flex flex-col text-left">
                                                <span className="font-black text-white">{t('onboardingFlow.level_inter_title') || "Intermédiaire"}</span>
                                                <span className="text-xs text-slate-400 mt-0.5">{t('onboardingFlow.level_inter_desc') || "J'ai déjà quelques bases solides"}</span>
                                            </div>
                                            <span className="text-2xl ml-4">🚀</span>
                                        </button>
                                        <button type="button" onClick={() => setFormData({ ...formData, startingLevel: 'Avancé' })} className={`p-4 justify-between items-center rounded-2xl border flex transition-all ${formData.startingLevel === 'Avancé' ? 'border-amber-500 bg-amber-600/20 text-white shadow-lg shadow-amber-500/20 scale-[1.01]' : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'}`}>
                                            <div className="flex flex-col text-left">
                                                <span className="font-black text-white">{t('onboardingFlow.level_adv_title') || "Avancé"}</span>
                                                <span className="text-xs text-slate-400 mt-0.5">{t('onboardingFlow.level_adv_desc') || "Je code déjà en autonomie complète"}</span>
                                            </div>
                                            <span className="text-2xl ml-4">💻</span>
                                        </button>
                                    </div>

                                    {error && <p className="text-red-400 text-xs text-center font-bold bg-red-500/10 py-2.5 rounded-xl border border-red-500/30">{error}</p>}

                                    <div className="flex gap-3 mt-4 pt-4 border-t border-slate-800">
                                        <button type="button" onClick={() => setStep(2)} className="px-5 py-3 font-bold text-xs uppercase tracking-wider text-slate-400 hover:text-white transition">{t('onboardingFlow.back') || "Retour"}</button>
                                        <button type="submit" disabled={!formData.startingLevel || isLoading} className={`flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/30 ${!formData.startingLevel || isLoading ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02]'}`}>
                                            {isLoading ? (t('onboardingFlow.creating') || 'Création...') : (t('onboardingFlow.validate_create') || 'Valider & Créer 🎉')}
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
