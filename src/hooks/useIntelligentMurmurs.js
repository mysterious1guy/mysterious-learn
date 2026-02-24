import { useEffect, useRef } from 'react';

const useIntelligentMurmurs = (user, currentView, progressions) => {
    const lastViewRef = useRef(currentView);
    const hasWelcomedRef = useRef(false);

    useEffect(() => {
        if (!user || !user.uiPreferences?.showMurmurs) return;

        const interventionLevel = user.uiPreferences?.interventionLevel || 'normal';

        const dispatchMurmur = (text) => {
            window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                detail: { text }
            }));
        };

        // 1. Welcome Murmur (Always shown if first time in session)
        if (!hasWelcomedRef.current) {
            const welcomeText = user.xp === 0
                ? `Bienvenue, ${user.firstName}. Je suis ton mentor numérique. Commençons par les bases pour construire des fondations solides.`
                : `Ravi de te revoir, ${user.firstName}. Ton esprit semble affûté aujourd'hui. Prêt pour l'ascension ?`;

            setTimeout(() => dispatchMurmur(welcomeText), 3000);
            hasWelcomedRef.current = true;
        }

        // Filtering based on Intervention Level
        const totalXp = user.xp || 0;

        // Resource & Feature Announcements (Normal/High Only)
        if (interventionLevel !== 'low') {
            // Suggest projects if XP is decent
            if (totalXp >= 100 && currentView === 'dashboard') {
                const notified = sessionStorage.getItem('announcement_projects_seen');
                if (!notified) {
                    dispatchMurmur("Tu as accumulé assez d'expérience. Pourquoi ne pas jeter un œil à nos Projets Pratiques ? C'est là que la théorie devient maîtrise.");
                    sessionStorage.setItem('announcement_projects_seen', 'true');
                    return;
                }
            }

            // Interactive Lab Hint
            if (currentView === 'course') {
                const notified = sessionStorage.getItem('announcement_lab_seen');
                if (!notified) {
                    dispatchMurmur("Utilise l'Interactive Lab pour tester tes hypothèses immédiatement. L'erreur est le premier pas vers la science.");
                    sessionStorage.setItem('announcement_lab_seen', 'true');
                    return;
                }
            }
        }

        // 2. Contextual Murmurs (Always High, Normal only on view change)
        if (currentView !== lastViewRef.current) {
            if (interventionLevel === 'high' || (interventionLevel === 'normal' && Math.random() > 0.3)) {
                const contextualPool = {
                    projects: [
                        "Chaque projet terminé est une brique de ton futur empire technologique.",
                        "Le code immortel commence par un projet passionné.",
                        "Prêt à transformer tes idées en réalité architecturale ?"
                    ],
                    leaderboard: [
                        "Ta position ici reflète ton intensité. Mais rappelle-toi : ton seul vrai rival, c'est celui que tu étais hier.",
                        "L'excellence n'est pas un acte, c'est une habitude.",
                        "Regarde le sommet, pas ceux que tu as dépassés."
                    ],
                    settings: [
                        "L'optimisation de ton espace de travail est la première étape d'une exécution parfaite.",
                        "Un environnement pur, un esprit clair.",
                        "La personnalisation est le luxe du maître."
                    ],
                    dashboard: [
                        "Ton tableau de bord, ton centre de commande. Qu'allons-nous conquérir aujourd'hui ?",
                        "La progression est visible, mais la maîtrise est ce qui compte vraiment.",
                        "Chaque module est une connaissance que tu possèdes désormais."
                    ]
                };

                const picks = contextualPool[currentView];
                if (picks) {
                    const randomPick = picks[Math.floor(Math.random() * picks.length)];
                    dispatchMurmur(randomPick);
                }
            }
            lastViewRef.current = currentView;
        }

        // 3. Level-based suggestions & Deep Context (High focus)
        const checkDeepContext = () => {
            if (interventionLevel === 'low') return;

            const level = user.programmingLevel || 'beginner';
            const xp = user.xp || 0;

            // Mastery Thresholds
            if (level === 'beginner' && xp > 1000 && interventionLevel === 'high') {
                dispatchMurmur("Tes fondations sont solides. Es-tu prêt pour des concepts de complexité algorithmique plus avancés ?");
            }

            // Time-based encouragement
            const lastSessionUpdate = user.lastSessionUpdate ? new Date(user.lastSessionUpdate) : new Date();
            const now = new Date();
            const diffMinutes = Math.floor((now - lastSessionUpdate) / (1000 * 60));

            if (diffMinutes > 45 && currentView === 'course' && interventionLevel !== 'low') {
                dispatchMurmur("Tu es en pleine immersion depuis un moment. N'oublie pas de faire une pause pour laisser ton cerveau consolider ces nouvelles connexions.");
            }

            // Struggle detection (Simulated here)
            if (currentView === 'course' && interventionLevel === 'high' && Math.random() > 0.8) {
                dispatchMurmur("Ce concept est dense. Veux-tu une analogie plus simple pour mieux visualiser le flux de données ?");
            }
        };

        const interval = setInterval(checkDeepContext, 90000); // More discrete check

        return () => clearInterval(interval);
    }, [user, currentView, progressions]);
};

export default useIntelligentMurmurs;
