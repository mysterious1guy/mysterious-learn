import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import MysteriousGeometricLogo from '../MysteriousGeometricLogo';
import { useLanguage } from '../context/LanguageContext';

const ResetPasswordPage = ({ API_URL, setToast }) => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (password.length < 6) {
            setErrorMessage(t('resetPasswordPage.password_too_short') || "Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage(t('resetPasswordPage.passwords_mismatch') || "Les mots de passe ne correspondent pas.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                if (setToast) {
                    setToast({
                        message: t('resetPasswordPage.success_title') || "Mot de passe modifié avec succès !",
                        type: 'success'
                    });
                }
            } else {
                setErrorMessage(data.message || t('resetPasswordPage.invalid_token') || "Token invalide ou expiré.");
            }
        } catch (err) {
            console.error('Erreur reset password:', err);
            setErrorMessage("Erreur de connexion au serveur.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden text-slate-100">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl relative z-10"
            >
                {/* Logo & Header */}
                <div className="flex flex-col items-center text-center mb-8">
                    <MysteriousGeometricLogo className="w-24 h-24 mb-4 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <KeyRound className="text-blue-500" size={24} />
                        {t('resetPasswordPage.title') || "Réinitialisation du mot de passe"}
                    </h1>
                    <p className="text-sm text-slate-400 font-medium mt-2">
                        {t('resetPasswordPage.subtitle') || "Choisissez votre nouveau mot de passe sécurisé"}
                    </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-medium"
                    >
                        <AlertCircle size={20} className="shrink-0" />
                        <span>{errorMessage}</span>
                    </motion.div>
                )}

                {/* Success View */}
                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6 py-4"
                    >
                        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                            <CheckCircle2 size={36} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold text-white">
                                {t('resetPasswordPage.success_title') || "Mot de passe modifié avec succès !"}
                            </h2>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {t('resetPasswordPage.success_desc') || "Votre mot de passe a été mis à jour en base de données. Vous pouvez maintenant vous connecter."}
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/auth')}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-blue-600/30"
                        >
                            {t('resetPasswordPage.go_to_login') || "SE CONNECTER"}
                        </button>
                    </motion.div>
                ) : (
                    /* Password Input Form */
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                                {t('resetPasswordPage.new_password') || "Nouveau mot de passe"}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-11 pr-12 py-3.5 text-white font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                                {t('resetPasswordPage.confirm_password') || "Confirmer le mot de passe"}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-11 pr-12 py-3.5 text-white font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !password || !confirmPassword}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {isLoading
                                ? (t('resetPasswordPage.submitting') || "Mise à jour en cours...")
                                : (t('resetPasswordPage.submit_btn') || "RÉINITIALISER LE MOT DE PASSE")}
                        </button>

                        <div className="pt-2 text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/auth')}
                                className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={14} />
                                {t('resetPasswordPage.go_to_login') || "Retour à la connexion"}
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;
