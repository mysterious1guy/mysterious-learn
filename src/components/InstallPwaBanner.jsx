import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, X, Sparkles } from 'lucide-react';
import MysteriousGeometricLogo from '../MysteriousGeometricLogo';

const InstallPwaBanner = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Vérifier si l'app est déjà installée
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        if (isStandalone) return;

        // Vérifier si l'utilisateur l'a masqué récemment (7 jours)
        const dismissedAt = localStorage.getItem('pwa_banner_dismissed');
        if (dismissedAt) {
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - parseInt(dismissedAt, 10) < sevenDays) {
                return;
            }
        }

        // Détection iOS Safari
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        if (isIosDevice && !isStandalone) {
            setIsIOS(true);
            setIsVisible(true);
        }

        // Intercepter l'événement avant l'installation standard (Chrome, Android, Edge, Brave)
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (isIOS) {
            alert("Pour installer l'application sur iOS :\n1. Cliquez sur le bouton de Partage (icône carré avec flèche vers le haut)\n2. Sélectionnez 'Sur l'écran d'accueil' 📲");
            return;
        }

        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('✅ App PWA installée avec succès !');
        }
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const handleDismiss = () => {
        localStorage.setItem('pwa_banner_dismissed', Date.now().toString());
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl bg-slate-900/95 dark:bg-gray-900/95 backdrop-blur-xl border border-blue-500/30 shadow-[0_10px_35px_rgba(37,99,235,0.25)] text-white"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-400/40">
                            <MysteriousGeometricLogo className="w-8 h-8" />
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                        </div>

                        <div>
                            <div className="flex items-center gap-1.5">
                                <h4 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                                    Mysterious App
                                </h4>
                                <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                                    Gratuit
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 font-medium leading-snug mt-0.5">
                                Installez l'application d'élite sur votre écran d'accueil pour un accès rapide & hors-ligne.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleDismiss}
                        className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
                        title="Fermer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="mt-3.5 flex items-center justify-end gap-2">
                    <button
                        onClick={handleDismiss}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                        Plus tard
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleInstallClick}
                        className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 border border-blue-400/30"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>Installer l'App</span>
                    </motion.button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default InstallPwaBanner;
