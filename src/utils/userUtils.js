// Utilitaire pour gérer les références à user en toute sécurité
export const safeUserAccess = (user, defaultValue = null) => {
  return user || defaultValue;
};

export const safeGetUserProperty = (user, property, defaultValue = '') => {
  if (!user) return defaultValue;
  return user[property] || defaultValue;
};

export const safeGetUserName = (user, defaultName = 'Utilisateur') => {
  if (!user) return defaultName;
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user.firstName || user.lastName || defaultName;
};

export const safeGetUserInitials = (user, defaultInitials = 'U') => {
  if (!user) return defaultInitials;
  const first = user.firstName ? user.firstName.charAt(0) : '';
  const last = user.lastName ? user.lastName.charAt(0) : '';
  return (first + last).toUpperCase() || defaultInitials;
};
