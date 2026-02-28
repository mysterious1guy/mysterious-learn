import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const OnboardingTour = ({ user, onFinish, onSkip, targetCourseId }) => {

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
            target: '#tour-first-course',
            content: (
                <div className="p-1">
                    <h3 className="text-lg font-bold text-emerald-500 mb-2 uppercase tracking-wide">Ta Première Quête</h3>
                    <p className="text-slate-700 text-sm font-medium">Voici ton premier cours de niveau Débutant. Pour l'instant, concentre-toi sur cette étape. Clique sur terminer, puis accède à ce cours !</p>
                </div>
            ),
            disableBeacon: true,
            spotlightClicks: true, // Allow clicking the target!
        }
    ];

    // Fallback if the first course isn't found in the DOM (e.g. user has no beginner courses mapped)
    const validSteps = targetCourseId ? steps : steps.slice(0, 3);

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            onFinish();
        }
    };

    return (
        <Joyride
            steps={validSteps}
            run={true}
            continuous={true}
            scrollToFirstStep={true}
            showSkipButton={false} // Force reading
            disableOverlayClose={true} // Force reading
            disableCloseOnEsc={true} // Force reading
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
