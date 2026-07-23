import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';

const OnboardingTour = ({ onFinish, onSkip, stepIndex, onStepChange }) => {
    // Add a state to handle window width to disable tooltips that could overflow too much on mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const steps = [
        {
            target: 'body',
            content: (
                <div className="p-2 text-center max-w-sm mx-auto">
                    <h2 className="text-xl sm:text-2xl font-black text-blue-600 mb-3 tracking-tight">Bienvenue dans l'Obscurité</h2>
                    <p className="text-slate-700 text-sm sm:text-base font-medium">Mysterious Classroom n'est pas une école ordinaire. Suivez ce guide interactif pour découvrir votre nouvel environnement.</p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: '#tour-dashboard',
            content: (
                <div className="p-1 max-w-[280px] sm:max-w-sm">
                    <h3 className="text-base sm:text-lg font-bold text-blue-500 mb-2 uppercase tracking-wide">Tableau de Bord</h3>
                    <p className="text-slate-700 text-xs sm:text-sm font-medium">C'est votre centre de contrôle. Retrouvez ici vos cours, votre progression et vos statistiques en temps réel.</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#tour-projects',
            content: (
                <div className="p-1 max-w-[280px] sm:max-w-sm">
                    <h3 className="text-base sm:text-lg font-bold text-indigo-500 mb-2 uppercase tracking-wide">Les Projets</h3>
                    <p className="text-slate-700 text-xs sm:text-sm font-medium">L'apprentissage théorique ne suffit pas. C'est ici que vous débloquerez des missions pratiques concrètes.</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#tour-leaderboard',
            content: (
                <div className="p-1 max-w-[280px] sm:max-w-sm">
                    <h3 className="text-base sm:text-lg font-bold text-amber-500 mb-2 uppercase tracking-wide">Le Classement</h3>
                    <p className="text-slate-700 text-xs sm:text-sm font-medium">Compétition ou simple motivation ? Surveillez votre position et vos XP. Relévez des défis pour grimper au sommet.</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#tour-account',
            content: (
                <div className="p-1 max-w-[280px] sm:max-w-sm">
                    <h3 className="text-base sm:text-lg font-bold text-slate-700 mb-2 uppercase tracking-wide">Votre Profil</h3>
                    <p className="text-slate-700 text-xs sm:text-sm font-medium">Accédez à vos paramètres, sécurisez votre compte (2FA) et modifiez vos préférences ici.</p>
                </div>
            ),
            disableBeacon: true,
            placement: isMobile ? 'bottom' : 'bottom-end',
        },
        {
            target: '#tour-ai',
            content: (
                <div className="p-1 max-w-[280px] sm:max-w-sm">
                    <h3 className="text-base sm:text-lg font-bold text-emerald-500 mb-2 uppercase tracking-wide">Ton Mentor IA</h3>
                    <p className="text-slate-700 text-xs sm:text-sm font-medium">Un doute ? Un bug ? Cliquez ici à tout moment pour parler à votre assistant personnel. Il veille sur vous !</p>
                </div>
            ),
            disableBeacon: true,
            placement: isMobile ? 'top' : 'left',
        }
    ];

    // Ne garder que les étapes dont l'élément cible existe dans le DOM au moment du rendu
    const activeSteps = steps.filter(step => step.target === 'body' || document.querySelector(step.target));

    const handleJoyrideCallback = (data) => {
        const { status, index, action, type } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status) || type === 'tour:end') {
            if (status === STATUS.SKIPPED && onSkip) {
                onSkip();
            } else if (onFinish) {
                onFinish();
            }
        } else if (action === 'next' || action === 'prev') {
            if (onStepChange) onStepChange(index);
        }
    };

    return (
        <Joyride
            steps={activeSteps}
            run={true}
            continuous={true}
            stepIndex={stepIndex}
            scrollToFirstStep={true}
            showSkipButton={true}          /* Autoriser à passer le guide */
            showProgress={true}            /* Montrer la progression (1/6 etc) */
            disableOverlayClose={false}    /* Autoriser à fermer en cliquant à côté */
            disableCloseOnEsc={false}      /* Autoriser à fermer avec Echap */
            hideCloseButton={false}        /* Afficher la croix de fermeture */
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    arrowColor: '#ffffff',
                    backgroundColor: '#ffffff',
                    overlayColor: 'rgba(0, 0, 0, 0.75)',
                    primaryColor: '#3b82f6',
                    textColor: '#1e293b',
                    width: isMobile ? '90%' : 400,
                    zIndex: 10000,
                },
                tooltip: {
                    borderRadius: '1.5rem',
                    padding: isMobile ? '15px' : '20px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    maxWidth: '100%',
                },
                buttonNext: {
                    backgroundColor: '#3b82f6',
                    borderRadius: '9999px',
                    padding: isMobile ? '8px 16px' : '10px 24px',
                    fontWeight: '900',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                },
                buttonBack: {
                    color: '#64748b',
                    fontWeight: '700',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                },
                buttonSkip: {
                    color: '#ef4444',
                    fontWeight: '700',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                },
                spotlight: {
                    borderRadius: '1.5rem',
                }
            }}
            locale={{
                back: 'Retour',
                close: 'Fermer',
                last: 'Terminer',
                next: 'Suivant',
                skip: 'Passer'
            }}
        />
    );
};

export default OnboardingTour;
