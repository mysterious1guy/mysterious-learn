import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Palette, ShieldCheck, Bot, ArrowRight, Check, Moon, Sun, Volume2, VolumeX, Globe, Monitor, Zap, Cpu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const OnboardingPage = ({ user, setUser, API_URL, setToast }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setTheme } = useTheme();
    const { t, setLanguage, language } = useLanguage();

    // Local state for preferences
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        theme: user?.preferences?.theme || 'dark',
        language: user?.preferences?.language || 'fr',
        soundEnabled: user?.preferences?.soundEnabled ?? true,
        acceptedTerms: false,
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const setPreference = (key, value) => {
        setFormData({ ...formData, [key]: value });
        // Appliquer immédiatement le changement de thème ou de langue
        if (key === 'theme') {
            setTheme(value);
        } else if (key === 'language') {
            setLanguage(value);
        }
    };

    const handleNext = () => {
        if (step === 3 && !formData.acceptedTerms) {
            setToast({ message: "Vous devez accepter les conditions pour continuer.", type: "error" });
            return;
        }
        setStep((prev) => prev + 1);
    };

    const handleComplete = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    preferences: {
                        theme: formData.theme,
                        language: formData.language,
                        soundEnabled: formData.soundEnabled,
                    },
                    hasCompletedOnboarding: true,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setUser({ ...user, ...data });
                navigate('/dashboard');
            } else {
                setToast({ message: data.message || "Erreur lors de la sauvegarde", type: "error" });
            }
        } catch (error) {
            setToast({ message: "Erreur de connexion", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { id: 1, title: 'Profil', icon: <User className="w-5 h-5" /> },
        { id: 2, title: 'Préférences', icon: <Palette className="w-5 h-5" /> },
        { id: 3, title: 'Sécurité', icon: <ShieldCheck className="w-5 h-5" /> },
        { id: 4, title: 'Assistant', icon: <Bot className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">

                {/* Header - Progress */}
                <div className="mb-12">
                    <h1 className="text-3xl brand-font text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 text-center uppercase tracking-wider">
                        Bienvenue sur Mysterious Classroom
                    </h1>

                    <div className="flex justify-between items-center relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 -z-10 rounded-full"></div>
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 -z-10 rounded-full transition-all duration-500"
                            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((s) => (
                            <div key={s.id} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step >= s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-400'
                                    }`}>
                                    {step > s.id ? <Check className="w-5 h-5" /> : s.icon}
                                </div>
                                <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= s.id ? 'text-blue-400' : 'text-slate-500'}`}>{t(`onboarding.${s.title.toLowerCase()}`) || s.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <div className="min-h-[300px]">
                    <AnimatePresence mode="wait">

                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-semibold text-white mb-2">Faisons connaissance</h2>
                                    <p className="text-slate-400">Comment devons-nous t'appeler ?</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Prénom</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Jean"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Nom</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Dupont"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{t('onboarding.title')}</h2>
                                    <p className="text-slate-400 text-sm">Choisis les paramètres qui te conviennent pour ton voyage.</p>
                                </div>

                                {/* Theme Selection */}
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <Monitor size={14} /> {t('onboarding.theme')}
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setPreference('theme', 'dark')}
                                            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group ${formData.theme === 'dark' ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:border-slate-700'
                                                }`}
                                        >
                                            <Moon className={`w-8 h-8 mb-3 transition-transform group-hover:scale-110 ${formData.theme === 'dark' ? 'text-blue-400' : ''}`} />
                                            <span className="font-bold uppercase tracking-widest text-[10px]">{t('onboarding.dark')}</span>
                                        </button>
                                        <button
                                            onClick={() => setPreference('theme', 'light')}
                                            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group ${formData.theme === 'light' ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:border-slate-700'
                                                }`}
                                        >
                                            <Sun className={`w-8 h-8 mb-3 transition-transform group-hover:rotate-45 ${formData.theme === 'light' ? 'text-blue-400' : ''}`} />
                                            <span className="font-bold uppercase tracking-widest text-[10px]">{t('onboarding.light')}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                            <Globe size={14} /> {t('onboarding.language')}
                                        </label>
                                        <div className="flex bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
                                            <button
                                                onClick={() => setPreference('language', 'fr')}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${formData.language === 'fr' ? 'bg-slate-800 text-blue-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                                            >
                                                Français
                                            </button>
                                            <button
                                                onClick={() => setPreference('language', 'en')}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${formData.language === 'en' ? 'bg-slate-800 text-blue-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                                            >
                                                English
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                            <Volume2 size={14} /> {t('onboarding.sound')}
                                        </label>
                                        <div className="flex bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
                                            <button
                                                onClick={() => setPreference('soundEnabled', true)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${formData.soundEnabled === true ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                                            >
                                                <Volume2 className="w-4 h-4" /> {t('onboarding.active')}
                                            </button>
                                            <button
                                                onClick={() => setPreference('soundEnabled', false)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${formData.soundEnabled === false ? 'bg-red-500/20 text-red-500' : 'text-slate-500 hover:text-slate-300'}`}
                                            >
                                                <VolumeX className="w-4 h-4" /> {t('onboarding.mute')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-semibold text-white mb-2">Sécurité & Confidentialité</h2>
                                    <p className="text-slate-400">Dernière étape administrative.</p>
                                </div>

                                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 space-y-4">
                                    <h3 className="font-medium text-slate-200">Conditions d'utilisation et Cookies</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Chez Mysterious, nous prenons ta vie privée au sérieux. Nous utilisons des cookies essentiels pour maintenir ta session "Connecté" et enregistrer ta progression dans les cours en temps réel. Nous ne vendons jamais tes données à des tiers.
                                    </p>

                                    <label className="flex items-start gap-4 p-4 mt-4 bg-slate-900 rounded-xl border border-slate-800 cursor-pointer hover:border-blue-500/50 transition-colors group">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.acceptedTerms ? 'bg-blue-500 border-blue-500' : 'border-slate-600 group-hover:border-blue-400'}`}>
                                                {formData.acceptedTerms && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                name="acceptedTerms"
                                                checked={formData.acceptedTerms}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <p className="text-sm text-slate-300 font-medium">J'accepte les conditions d'utilisation et la politique de confidentialité.</p>
                                            <p className="text-xs text-slate-500 mt-1">J'autorise également l'utilisation de cookies essentiels pour mon apprentissage.</p>
                                        </div>
                                    </label>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center space-y-8 py-6"
                            >
                                <div className="relative w-40 h-40 mx-auto">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse blur-2xl"></div>
                                    <div className="relative w-full h-full bg-slate-900 border-2 border-blue-500/30 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.2)] overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="relative">
                                                <Cpu className="w-16 h-16 text-blue-400 animate-pulse" />
                                                <Zap className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-bounce" />
                                            </div>
                                            <div className="h-1 w-12 bg-blue-500/20 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">Rencontre le Professeur Mysterious</h2>
                                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 inline-block text-left text-sm text-slate-300 space-y-3 max-w-lg">
                                        <p>Salutations <span className="text-blue-400 font-medium">{formData.firstName || 'Aventurier'}</span> ! 🎓</p>
                                        <p>Je suis le <strong>Professeur Mysterious</strong>, ton mentor sur cette plateforme conçue par <strong>Mouhamed Fall</strong>.</p>
                                        <p>Mon rôle est de t'enseigner les secrets du code et de t'accompagner à chaque étape. Si tu as un doute ou si tu veux approfondir un sujet, je suis là pour toi.</p>
                                        <p className="text-slate-400 italic">Prêt à commencer ton apprentissage avec moi ?</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-800">
                    <button
                        onClick={() => setStep(prev => prev - 1)}
                        disabled={step === 1 || loading}
                        className={`px-6 py-2 rounded-xl font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        Retour
                    </button>

                    {step < steps.length ? (
                        <button
                            onClick={handleNext}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors flex items-center gap-2 group"
                        >
                            {t('onboarding.next')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            disabled={loading}
                            className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>{t('onboarding.start')} <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default OnboardingPage;
