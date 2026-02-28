import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const OnboardingTour = ({ user, onFinish, onSkip, targetCourseId, stepIndex, onStepChange }) => {

    const steps = [
        {
            target: 'body',
            content: (
                <div className="p-2 text-center">
                    <h2 className="text-2xl font-black text-blue-600 mb-3 tracking-tight">Bienvenue dans l'Obscurité</h2>
                    <p className="text-slate-700 font-medium">Mysterious Classroom n'est pas une école ordinaire. Suis ce guide d'initiation obligatoire pour comprendre ton environnement.</p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: '#tour-leaderboard',
            content: (
                <div className="p-1">
                    <h3 className="text-lg font-bold text-amber-500 mb-2 uppercase tracking-wide">Le Classement</h3>
                    <p className="text-slate-700 text-sm font-medium">Clique ici pour voir ton classement actuel. Tu commences avec 0 XP. Relève des défis pour grimper au sommet !</p>
                </div>
            ),
            disableBeacon: true,
            spotlightClicks: true,
        },
        {
            target: '#tour-projects',
            content: (
                <div className="p-1">
                    <h3 className="text-lg font-bold text-indigo-500 mb-2 uppercase tracking-wide">Les Projets</h3>
                    <p className="text-slate-700 text-sm font-medium">Voici les projets exclusifs à débloquer. L'apprentissage théorique ne suffit pas, il te faudra du concret.</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#tour-ai',
            content: (
                <div className="p-1">
                    <h3 className="text-lg font-bold text-blue-500 mb-2 uppercase tracking-wide">Ton Mentor IA</h3>
                    <p className="text-slate-700 text-sm font-medium">Ceci est ton Oracle. Si tu as un doute ou besoin d'une explication sur un code, clique ici pour lui parler. Il veille sur toi.</p>
                </div>
            ),
            disableBeacon: true,
        },
        {
            target: '#tour-first-course',
            content: (
                <div className="p-1">
                    <h3 className="text-lg font-bold text-emerald-500 mb-2 uppercase tracking-wide">Ta Première Quête</h3>
                    <p className="text-slate-700 text-sm font-medium">C'est ici que tout commence. Ce cours est spécialement choisi pour ton niveau. Clique sur terminer pour commencer ton aventure !</p>
                </div>
            ),
            disableBeacon: true,
            spotlightClicks: true,
        }
    ];

    // Build steps dynamically based on what's available
    const activeSteps = targetCourseId ? steps : steps.filter(s => s.target !== '#tour-first-course');

    const handleJoyrideCallback = (data) => {
        const { status, index, action } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            onFinish();
        } else if (action === 'next' || action === 'prev') {
            onStepChange(index);
        }
    };

    return (
        <Joyride
            steps={activeSteps}
            run={true}
            continuous={true}
            stepIndex={stepIndex}
            scrollToFirstStep={true}
            showSkipButton={false}
            disableOverlayClose={true}
            disableCloseOnEsc={true}
            hideCloseButton={true}
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    arrowColor: '#ffffff',
                    backgroundColor: '#ffffff',
                    overlayColor: 'rgba(0, 0, 0, 0.85)',
                    primaryColor: '#3b82f6',
                    textColor: '#1e293b',
                    width: 400,
                    zIndex: 10000,
                },
                tooltip: {
                    borderRadius: '1.5rem',
                    padding: '20px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                },
                buttonNext: {
                    backgroundColor: '#3b82f6',
                    borderRadius: '9999px',
                    padding: '10px 24px',
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
