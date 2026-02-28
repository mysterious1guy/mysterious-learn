import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';
import CyberPet from '../CyberPet';

const OnboardingPage = ({ user, setUser, API_URL, setToast }) => {
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

    const handleCompleteOnboarding = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

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
                        startingLevel: formData.startingLevel
                    }
                })
            });

            const data = await response.json();
            if (response.ok) {
                setUser({ ...user, ...data, token: user.token });
                setToast({ message: "Bienvenue sur l'interface !", type: 'success' });
                navigate('/dashboard');
            } else {
                setError(data.message || "Erreur lors de la sauvegarde.");
                setIsLoading(false); // Immediate reset on specific error
            }
        } catch (err) {
            setError("Erreur réseau");
            setIsLoading(false);
        } finally {
            // We only keep loading if navigating away
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-transparent overflow-hidden relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/90 backdrop-blur-2xl border border-blue-500/20 p-8 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)]">
                    <div className="flex justify-center mb-6">
                        <CyberPet isPasswordFocused={isPasswordFocused} user={user} />
                    </div>

                    <h2 className="text-3xl brand-font text-slate-800 text-center mb-2 tracking-tight">
                        Finalisation
                    </h2>
                    <p className="text-slate-500 text-center text-sm font-medium mb-8">
                        Configurez votre accès local
                    </p>

                    <form onSubmit={step === 3 ? handleCompleteOnboarding : (e) => { e.preventDefault(); setStep(step + 1) }} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                                    <div className="text-center p-4 bg-blue-50/50 rounded-2xl border border-blue-100 mb-4">
                                        <p className="text-sm text-slate-600 font-medium">Bienvenue ! Comme tu es connecté via Google, définis un mot de passe pour pouvoir te connecter directement avec <strong className="text-blue-600">{user.email}</strong> la prochaine fois.</p>
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
                                    </div>

                                    {!passwordsMatch && formData.confirmPassword && (
                                        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest pl-2 animate-pulse">
                                            Les mots de passe ne correspondent pas
                                        </p>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!formData.password || formData.password.length < 6 || !passwordsMatch) {
                                                setError("Veuillez remplir un mot de passe valide.");
                                                return;
                                            }
                                            setError('');
                                            setStep(2);
                                        }}
                                        disabled={!passwordsMatch || !formData.password || formData.password.length < 6}
                                        className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 group ${(!passwordsMatch || !formData.password || formData.password.length < 6) ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                                    >
                                        Continuer <ArrowRight size={18} />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                                    <h3 className="text-xl font-bold text-center text-slate-800">Quel est ton objectif principal ?</h3>
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
                                        <button type="button" onClick={() => setStep(1)} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition">Retour</button>
                                        <button type="button" onClick={() => setStep(3)} disabled={!formData.goal} className={`flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition ${!formData.goal ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-lg'}`}>Suivant <ArrowRight size={18} /></button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-4">
                                    <h3 className="text-xl font-bold text-center text-slate-800">Quel est ton niveau actuel ?</h3>
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
                                                <span className="text-xs text-slate-500 mt-1">J'ai quelques bases</span>
                                            </div>
                                            <span className="text-2xl ml-4">🚀</span>
                                        </button>
                                        <button type="button" onClick={() => setFormData({ ...formData, startingLevel: 'Expérimenté' })} className={`p-4 justify-between items-center rounded-xl border flex transition-all ${formData.startingLevel === 'Expérimenté' ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-slate-200 hover:bg-slate-50 hover:border-orange-300'}`}>
                                            <div className="flex flex-col text-left">
                                                <span className={`font-bold ${formData.startingLevel === 'Expérimenté' ? 'text-orange-700' : 'text-slate-700'}`}>Expérimenté</span>
                                                <span className="text-xs text-slate-500 mt-1">Je code déjà en autonomie</span>
                                            </div>
                                            <span className="text-2xl ml-4">💻</span>
                                        </button>
                                    </div>

                                    {error && <p className="text-red-500 text-sm text-center font-bold bg-red-500/10 py-2 rounded-xl border border-red-500/20">{error}</p>}

                                    <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                                        <button type="button" onClick={() => setStep(2)} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition">Retour</button>
                                        <button type="submit" disabled={!formData.startingLevel || isLoading} className={`flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition ${!formData.startingLevel || isLoading ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:scale-105'}`}>
                                            {isLoading ? 'Création...' : 'Valider & Créer 🎉'}
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
