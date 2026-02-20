export const formatTimeAgo = (date) => {
    if (!date) return "Jamais";
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now - past;
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHrs = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHrs / 24);

    if (diffInSec < 60) return "À l'instant";
    if (diffInMin < 60) return `Il y a ${diffInMin} min`;
    if (diffInHrs < 24) return `Il y a ${diffInHrs} heure${diffInHrs > 1 ? 's' : ''}`;
    if (diffInDays < 30) return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;

    return past.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};
