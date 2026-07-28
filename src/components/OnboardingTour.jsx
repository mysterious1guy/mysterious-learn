import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useLanguage } from '../context/LanguageContext';

const OnboardingTour = ({ onFinish, onSkip, stepIndex, onStepChange }) => {
    const { t } = useLanguage();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ─── Étapes DESKTOP (navbar visible) ──────────────────────────────────────
    const desktopSteps = [
        {
            target: 'body',
            content: (
                <div className="p-2 text-center max-w-sm mx-auto">
                    <h2 className="text-2xl font-black text-blue-600 mb-3 tracking-tight">
                        {t('onboardingTour.welcome_title') || "Bienvenue dans l'Obscurité"}
                    </h2>
                    <p className="text-slate-700 text-base font-medium">
                        {t('onboardingTour.welcome_desc') || "Mysterious Classroom n'est pas une école ordinaire. Suivez ce guide interactif pour découvrir votre nouvel environnement."}
                    </p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: '#tour-dashboard',
            content: (
                <div className="p-1 max-w-sm">
                    <h3 className="text-lg font-bold text-blue-500 mb-2 uppercase tracking-wide">
                        {t('onboardingTour.dashboard_title') || "Tableau de Bord"}
                    </h3>
                    <p className="text-slate-700 text-sm font-medium">
                        {t('onboardingTour.dashboard_desc') || "C'est votre centre de contrôle. Retrouvez ici vos cours, votre progression et vos statistiques en temps réel."}
                    </p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#tour-projects',
            content: (
                <div className="p-1 max-w-sm">
                    <h3 className="text-lg font-bold text-indigo-500 mb-2 uppercase tracking-wide">
                        {t('onboardingTour.projects_title') || "Les Projets"}
                    </h3>
                    <p className="text-slate-700 text-sm font-medium">
                        {t('onboardingTour.projects_desc') || "L'apprentissage théorique ne suffit pas. C'est ici que vous débloquerez des missions pratiques concrètes."}
                    </p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#tour-leaderboard',
            content: (
                <div className="p-1 max-w-sm">
                    <h3 className="text-lg font-bold text-amber-500 mb-2 uppercase tracking-wide">
                        {t('onboardingTour.leaderboard_title') || "Le Classement"}
                    </h3>
                    <p className="text-slate-700 text-sm font-medium">
                        {t('onboardingTour.leaderboard_desc') || "Compétition ou simple motivation ? Surveillez votre position et vos XP. Relevez des défis pour grimper au sommet."}
                    </p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#tour-notifications',
            content: (
                <div className="p-1 max-w-sm">
                    <h3 className="text-lg font-bold text-purple-600 mb-2 uppercase tracking-wide">
                        {t('onboardingTour.notifications_title') || "Annonces & Notifications"}
                    </h3>
                    <p className="text-slate-700 text-sm font-medium">
                        {t('onboardingTour.notifications_desc') || "Restez informé en temps réel des nouveautés, alertes et événements importants de la plateforme."}
                    </p>
                </div>
            ),
            disableBeacon: true,
            placement: 'bottom-end',
        },
        {
            target: '#tour-account',
            content: (
                <div className="p-1 max-w-sm">
                    <h3 className="text-lg font-bold text-slate-700 mb-2 uppercase tracking-wide">
                        {t('onboardingTour.account_title') || "Votre Profil"}
                    </h3>
                    <p className="text-slate-700 text-sm font-medium">
                        {t('onboardingTour.account_desc') || "Accédez à vos paramètres, sécurisez votre compte (2FA) et modifiez vos préférences ici."}
                    </p>
                </div>
            ),
            disableBeacon: true,
            placement: 'bottom-end',
        },
        {
            target: '#tour-ai',
            content: (
                <div className="p-1 max-w-sm">
                    <h3 className="text-lg font-bold text-blue-500 mb-2 uppercase tracking-wide">
                        {t('onboardingTour.ai_title') || "Ton Mentor IA"}
                    </h3>
                    <p className="text-slate-700 text-sm font-medium">
                        {t('onboardingTour.ai_desc') || "Un doute ? Un bug ? Cliquez ici à tout moment pour parler à votre assistant personnel. Il veille sur vous !"}
                    </p>
                </div>
            ),
            disableBeacon: true,
            placement: 'top-end',
        },
    ];

    // ─── Étapes MOBILE (navbar masquée → ouvrir le menu d'abord) ──────────────
    const mobileSteps = [
        {
            target: 'body',
            content: (
                <div className="p-3 text-center">
                    <div className="text-5xl mb-4">👋</div>
                    <h2 className="text-xl font-black text-blue-600 mb-3 tracking-tight">
                        Bienvenue dans Mysterious Classroom !
                    </h2>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">
                        Laisse-moi te faire faire un tour rapide de la plateforme. C'est parti !
                    </p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: '#tour-hamburger-menu',
            content: (
                <div className="p-2 text-center">
                    <div className="text-4xl mb-3">☰</div>
                    <h3 className="text-base font-black text-blue-600 mb-2 uppercase tracking-wide">
                        Le Menu de Navigation
                    </h3>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">
                        Ces <strong>3 traits</strong> ouvrent le menu principal. Tous tes accès (Dashboard, Projets, Classement…) s'y trouvent. Appuie dessus quand tu veux naviguer !
                    </p>
                </div>
            ),
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '#tour-notifications',
            content: (
                <div className="p-2">
                    <h3 className="text-base font-black text-purple-600 mb-2 uppercase tracking-wide">
                        🔔 Notifications
                    </h3>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">
                        Reste informé des nouveautés, alertes et événements de la plateforme ici.
                    </p>
                </div>
            ),
            placement: 'bottom',
            disableBeacon: true,
        },
        {
            target: '#tour-ai',
            content: (
                <div className="p-2 text-center">
                    <div className="text-4xl mb-3">🤖</div>
                    <h3 className="text-base font-black text-blue-600 mb-2 uppercase tracking-wide">
                        Ton Mentor IA
                    </h3>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">
                        Ce bouton flottant est ton assistant personnel disponible 24h/24. Un bug ? Une question ? Il est là !
                    </p>
                </div>
            ),
            placement: 'top',
            disableBeacon: true,
        },
    ];

    const activeSteps = isMobile ? mobileSteps : desktopSteps;

    const handleJoyrideCallback = (data) => {
        const { status, index, action, type } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status) || type === 'tour:end') {
            if (status === STATUS.SKIPPED && onSkip) {
                onSkip();
            } else if (onFinish) {
                onFinish();
            }
        } else if (type === 'step:after' || type === 'target:not_found') {
            const nextStep = action === 'prev' ? Math.max(0, index - 1) : index + 1;
            if (nextStep >= activeSteps.length) {
                if (onFinish) onFinish();
            } else {
                if (onStepChange) onStepChange(nextStep);
            }
        }
    };

    return (
        <Joyride
            steps={activeSteps}
            run={true}
            continuous={true}
            stepIndex={stepIndex}
            scrollToFirstStep={true}
            showSkipButton={true}
            showProgress={true}
            disableOverlayClose={false}
            disableCloseOnEsc={false}
            hideCloseButton={false}
            callback={handleJoyrideCallback}
            locale={{
                back: t('onboarding.back') || 'Retour',
                close: 'Fermer',
                last: t('onboarding.start') || 'Terminer 🚀',
                next: t('onboarding.next') || 'Suivant →',
                skip: t('onboarding.skip') || 'Passer',
            }}
            styles={{
                options: {
                    arrowColor: '#ffffff',
                    backgroundColor: '#ffffff',
                    overlayColor: 'rgba(15, 23, 42, 0.85)',
                    primaryColor: '#2563eb',
                    textColor: '#0f172a',
                    width: isMobile ? '92vw' : 420,
                    zIndex: 10000,
                },
                tooltip: {
                    borderRadius: '1.5rem',
                    padding: isMobile ? '20px' : '24px',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                    maxWidth: '100%',
                },
                buttonNext: {
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: isMobile ? '10px 20px' : '12px 24px',
                    fontWeight: '900',
                    fontSize: isMobile ? '13px' : '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)',
                },
                buttonBack: {
                    color: '#64748b',
                    fontWeight: '800',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                },
                buttonSkip: {
                    color: '#dc2626',
                    fontWeight: '800',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                },
                spotlight: {
                    borderRadius: '1rem',
                },
            }}
        />
    );
};

export default OnboardingTour;
