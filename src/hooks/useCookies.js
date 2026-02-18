import Cookies from 'js-cookie';

export const useCookies = () => {
  const setCookie = (name, value, options = {}) => {
    const defaultOptions = {
      expires: 30, // 30 jours
      secure: true,
      sameSite: 'strict',
      ...options
    };
    Cookies.set(name, JSON.stringify(value), defaultOptions);
  };

  const getCookie = (name) => {
    const cookie = Cookies.get(name);
    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch (e) {
        console.error('Error parsing cookie:', e);
        return null;
      }
    }
    return null;
  };

  const removeCookie = (name) => {
    Cookies.remove(name);
  };

  const setUserCookie = (userData) => {
    setCookie('mysterious_user', userData);
  };

  const getUserCookie = () => {
    return getCookie('mysterious_user');
  };

  const removeUserCookie = () => {
    removeCookie('mysterious_user');
  };

  const setProgressCookie = (courseId, progress) => {
    const currentProgress = getCookie('mysterious_progress') || {};
    currentProgress[courseId] = progress;
    setCookie('mysterious_progress', currentProgress);
  };

  const getProgressCookie = () => {
    return getCookie('mysterious_progress') || {};
  };

  return {
    setCookie,
    getCookie,
    removeCookie,
    setUserCookie,
    getUserCookie,
    removeUserCookie,
    setProgressCookie,
    getProgressCookie
  };
};
