import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import AnimatedAIAvatar from '../components/AnimatedAIAvatar';

const OnboardingPage = ({ user, setUser, API_URL, setToast }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const { t, setLanguage, language } = useLanguage();
    const { soundEnabled, setSoundEnabled } = useSound();

    // Local state for preferences
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        theme: theme || 'dark',
        language: language || 'fr',
        soundEnabled: soundEnabled ?? true,
        acceptedTerms: false,
        programmingLevel: user?.programmingLevel || 'beginner',
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const setPreference = (key, value) => {
        setFormData({ ...formData, [key]: value });
        // Appliqué immédiatement au contexte global
        if (key === 'theme') setTheme(value);
        if (key === 'language') setLanguage(value);
        if (key === 'soundEnabled') setSoundEnabled(value);
    };

    // ... rest of the logic remains same until return ...
    const handleNext = () => {
        if (step === 4 && !formData.acceptedTerms) {
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
                        theme: theme,
                        language: language,
                        soundEnabled: soundEnabled,
                    },
                    programmingLevel: formData.programmingLevel,
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
        { id: 2, title: 'Niveau', icon: <TrendingUp className="w-5 h-5" /> },
        { id: 3, title: 'Préférences', icon: <Palette className="w-5 h-5" /> },
        { id: 4, title: 'Sécurité', icon: <ShieldCheck className="w-5 h-5" /> },
        { id: 5, title: 'Assistant', icon: <Bot className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden transition-colors duration-500">

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 transition-all duration-500">

                {/* Header - Progress */}
                <div className="mb-12">
                    <h1 className="text-3xl brand-font text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8 text-center uppercase tracking-wider">
                        Bienvenue sur Mysterious Classroom
                    </h1>

                    <div className="flex justify-between items-center relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full"></div>
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 -z-10 rounded-full transition-all duration-500"
                            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((s) => (
                            <div key={s.id} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step >= s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                                    }`}>
                                    {step > s.id ? <Check className="w-5 h-5" /> : s.icon}
                                </div>
                                <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= s.id ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>{s.title}</span>
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
                                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Faisons connaissance</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Comment devons-nous t'appeler ?</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest text-[10px]">Prénom</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Jean"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest text-[10px]">Nom</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
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
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Quel est ton niveau ?</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Cela aidera l'Oracle à adapter son langage.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'beginner', label: 'Débutant', desc: 'Je découvre les bases du code.', icon: <Monitor className="text-blue-500" /> },
                                        { id: 'intermediate', label: 'Intermédiaire', desc: 'Je maîtrise la syntaxe de base.', icon: <Zap className="text-yellow-500" /> },
                                        { id: 'advanced', label: 'Avancé', desc: 'Je crée des projets complexes.', icon: <Cpu className="text-purple-500" /> },
                                        { id: 'expert', label: 'Expert', desc: 'Le code est ma langue maternelle.', icon: <ShieldCheck className="text-emerald-500" /> },
                                    ].map((level) => (
                                        <button
                                            key={level.id}
                                            onClick={() => setFormData({ ...formData, programmingLevel: level.id })}
                                            className={`p-6 rounded-2xl border-2 text-left transition-all group ${formData.programmingLevel === level.id
                                                ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                                                : 'bg-white dark:bg-slate-950/40 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                {level.icon}
                                                <span className={`font-black uppercase tracking-widest text-[10px] ${formData.programmingLevel === level.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                                    {level.label}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">{level.desc}</p>
                                        </button>
                                    ))}
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
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tight">{t('onboarding.title')}</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Choisis les paramètres qui te conviennent pour ton voyage.</p>
                                </div>

                                {/* Theme Selection */}
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                        <Monitor size={14} /> {t('onboarding.theme')}
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setPreference('theme', 'dark')}
                                            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group ${theme === 'dark' ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                                                }`}
                                        >
                                            <Moon className={`w-8 h-8 mb-3 transition-transform group-hover:scale-110 ${theme === 'dark' ? 'text-blue-400' : ''}`} />
                                            <span className="font-bold uppercase tracking-widest text-[10px]">{t('onboarding.dark')}</span>
                                        </button>
                                        <button
                                            onClick={() => setPreference('theme', 'light')}
                                            className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group ${theme === 'light' ? 'bg-blue-600/5 border-blue-600 text-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                                                }`}
                                        >
                                            <Sun className={`w-8 h-8 mb-3 transition-transform group-hover:rotate-45 ${theme === 'light' ? 'text-blue-600' : ''}`} />
                                            <span className="font-bold uppercase tracking-widest text-[10px]">{t('onboarding.light')}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                            <Globe size={14} /> {t('onboarding.language')}
                                        </label>
                                        <div className="flex bg-slate-50 dark:bg-slate-950/60 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                                            <button
                                                onClick={() => setPreference('language', 'fr')}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${language === 'fr' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-700' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                            >
                                                Français
                                            </button>
                                            <button
                                                onClick={() => setPreference('language', 'en')}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${language === 'en' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-700' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                            >
                                                English
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                            <Volume2 size={14} /> {t('onboarding.sound')}
                                        </label>
                                        <div className="flex bg-slate-50 dark:bg-slate-950/60 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                                            <button
                                                onClick={() => setPreference('soundEnabled', true)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${soundEnabled === true ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                            >
                                                <Volume2 className="w-4 h-4" /> {t('onboarding.active')}
                                            </button>
                                            <button
                                                onClick={() => setPreference('soundEnabled', false)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${soundEnabled === false ? 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-500 border border-red-100 dark:border-red-900/40 shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                            >
                                                <VolumeX className="w-4 h-4" /> {t('onboarding.mute')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Sécurité & Confidentialité</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Dernière étape administrative.</p>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/50 space-y-4">
                                    <h3 className="font-bold uppercase tracking-widest text-xs text-slate-700 dark:text-slate-200">Conditions d'utilisation et Cookies</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Chez Mysterious, nous prenons ta vie privée au sérieux. Nous utilisons des cookies essentiels pour maintenir ta session "Connecté" et enregistrer ta progression dans les cours en temps réel. Nous ne vendons jamais tes données à des tiers.
                                    </p>

                                    <label className="flex items-start gap-4 p-4 mt-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-500/50 transition-colors group">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.acceptedTerms ? 'bg-blue-500 border-blue-500' : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-600 group-hover:border-blue-400'}`}>
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
                                            <p className="text-sm text-slate-700 dark:text-slate-300 font-bold uppercase tracking-tight">J'accepte les conditions d'utilisation et la politique de confidentialité.</p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">J'autorise également l'utilisation de cookies essentiels pour mon apprentissage.</p>
                                        </div>
                                    </label>
                                </div>
                            </motion.div>
                        )}

                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center space-y-8 py-6"
                            >
                                <div className="relative w-40 h-40 mx-auto">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse blur-2xl"></div>
                                    <div className="relative w-full h-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-blue-500/30 rounded-[2.5rem] flex items-center justify-center shadow-xl dark:shadow-[0_0_50px_rgba(59,130,246,0.2)] overflow-hidden transition-colors duration-500">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                                        <div className="w-24 h-24">
                                            <AnimatedAIAvatar isTyping={true} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight text-center">Ton Mysterious Assistant</h2>
                                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/50 inline-block text-left text-sm text-slate-600 dark:text-slate-300 space-y-3 max-w-lg shadow-sm">
                                        <p>Salutations <span className="text-blue-600 dark:text-blue-400 font-bold">{formData.firstName || 'Aventurier'}</span> ! 🎓</p>
                                        <p>Je suis ton <strong>Mysterious Assistant</strong>, ton copilote sur cette plateforme conçue par <strong>Mouhamed Fall</strong>.</p>
                                        <p>Mon rôle est de t'accompagner, de répondre à tes questions et de t'aider à percer les mystères du code à chaque étape.</p>
                                        <p className="text-slate-400 dark:text-slate-500 italic font-medium">Prêt à commencer l'aventure avec moi ?</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => setStep(prev => prev - 1)}
                        disabled={step === 1 || loading}
                        className={`px-6 py-2 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                    >
                        Retour
                    </button>

                    {step < steps.length ? (
                        <button
                            onClick={handleNext}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 group"
                        >
                            {t('onboarding.next')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            disabled={loading}
                            className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
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
