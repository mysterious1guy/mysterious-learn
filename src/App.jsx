import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AuthPage from './pages/AuthPage';
import CallbackPage from './pages/CallbackPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import AccountPage from './pages/AccountPage';
import CoursePage from './pages/CoursePage';
import ChapterPage from './pages/ChapterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import TwoFactorSetupPage from './pages/TwoFactorSetupPage';
import Leaderboard from './pages/Leaderboard';
import ProjectsList from './pages/ProjectsList';

// Hooks et composants
import { useLocalStorage } from './hooks/useLocalStorage';
import { useCookies } from './hooks/useCookies';
import { Toast } from './components/Toast';
import Particles from './Particles';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import UserGuide from './components/UserGuide';

import { API_URL } from './config';
import { SoundProvider } from './context/SoundContext';

function App() {
  const [user, setUser] = useLocalStorage('user', null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [progressions, setProgressions] = useState({});
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const { setUserCookie, getUserCookie, removeUserCookie, setProgressCookie, getProgressCookie } = useCookies();

  // Synchroniser les cookies avec le localStorage
  useEffect(() => {
    if (user) {
      setUserCookie(user);
    } else {
      removeUserCookie();
    }
  }, [user, setUserCookie, removeUserCookie]);

  const handleUpdateUser = (updatedData) => {
    if (!updatedData) return;

    // Support either derivation or direct fields
    const name = updatedData.name || user?.name || '';
    const firstName = updatedData.firstName || (name.split(' ')[0] !== 'Agent' ? name.split(' ')[0] : '') || user?.firstName || '';
    const lastName = updatedData.lastName || (name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : '') || user?.lastName || '';

    if (updatedData.favorites) {
      setFavorites(updatedData.favorites);
    }

    const updatedUser = {
      ...user,
      ...updatedData,
      firstName: firstName || user?.firstName,
      lastName: lastName || user?.lastName,
      name: name || user?.name
    };

    setUser(updatedUser);
  };

  const handleLogout = () => {
    setUser(null);
    setProgressions({});
    removeUserCookie();
    window.location.href = '/'; // Redirect to home on logout
  };

  const fetchUserProfile = async () => {
    if (!user || !user.token) return;
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response.ok) {
        const data = await response.json();
        handleUpdateUser(data);
      }
    } catch (err) {
      console.error('Erreur fetch profile:', err);
    }
  };

  const fetchProgressions = async () => {
    if (!user || !user.token) return;
    try {
      const response = await fetch(`${API_URL}/courses/progress/all`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const progObj = {};
        data.forEach(p => {
          progObj[p.courseId] = {
            completedLessons: p.completedLessons,
            progress: p.progress,
          };
        });
        setProgressions(progObj);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchUserProfile();
      fetchProgressions();
    }
  }, [user?.token]);

  // Intercepteur global pour les erreurs 401 (compte supprimé ou token expiré)
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (response.status === 401 && user) {
          console.warn('⚠️ Session expirée ou compte supprimé. Déconnexion...');
          handleLogout();
        }
        return response;
      } catch (error) {
        throw error;
      }
    };
    return () => { window.fetch = originalFetch; };
  }, [user]);

  // Heartbeat pour vérifier l'existence du compte périodiquement
  useEffect(() => {
    if (!user?.token) return;

    const checkSession = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        // Si 401, l'intercepteur ci-dessus gérera la déconnexion
      } catch (err) {
        console.error('Erreur heartbeat session:', err);
      }
    };

    const interval = setInterval(checkSession, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, [user, API_URL]);

  // Global logging pour diagnostic
  useEffect(() => {
    console.log('🌐 App: Initialisation globale');
    console.log('🌐 App: User actuel:', user ? 'CONNECTÉ' : 'NON CONNECTÉ');
    console.log('🌐 App: URL actuelle:', window.location.pathname);

    // Logger chaque changement de route
    const handleRouteChange = () => {
      console.log('🔄 App: Changement de route vers:', window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [user]);

  useEffect(() => {
    const handleOpenGuide = () => setShowGuide(true);
    window.addEventListener('open-user-guide', handleOpenGuide);
    return () => window.removeEventListener('open-user-guide', handleOpenGuide);
  }, []);

  const handleToggleFavorite = (id) => {
    const newFavs = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavs);
  };

  return (
    <ThemeProvider>
      <SoundProvider>
        <LanguageProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
              <Particles />

              <AnimatePresence>
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
                {user && <UserGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />}
              </AnimatePresence>

              <Routes>
                <Route element={<AuthLayout />}>
                  <Route path="/" element={<HomePage API_URL={API_URL} />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/auth" element={
                    user ? <Navigate to={user.hasCompletedOnboarding ? "/dashboard" : "/onboarding"} replace /> :
                      <AuthPage user={user} setUser={handleUpdateUser} API_URL={API_URL} setToast={setToast} />
                  } />
                  {/* ✅ Nouvelle route pour le callback Google */}
                  <Route path="/auth/callback" element={
                    <CallbackPage
                      setUser={handleUpdateUser}
                      setToast={setToast}
                      fetchProgressions={fetchProgressions}
                    />
                  } />
                  {/* Route Onboarding Google */}
                  <Route path="/onboarding" element={
                    user ? (user.hasCompletedOnboarding ? <Navigate to="/dashboard" replace /> : <OnboardingPage user={user} setUser={handleUpdateUser} API_URL={API_URL} setToast={setToast} />) : <Navigate to="/auth" replace />
                  } />
                  {/* Route Admin Login */}
                  <Route path="/admin/login" element={<AdminLoginPage setToast={setToast} />} />
                </Route>

                <Route element={<MainLayout user={user} progressions={progressions} onLogout={handleLogout} onSearch={setSearchQuery} />}>
                  <Route index element={user ? <Navigate to="/dashboard" replace /> : <HomePage API_URL={API_URL} />} />
                  <Route path="/admin" element={<AdminPage user={user} onUpdateUser={handleUpdateUser} API_URL={API_URL} setToast={setToast} />} />
                  <Route path="dashboard" element={
                    user ? (
                      <DashboardPage
                        user={user}
                        onUpdateUser={handleUpdateUser}
                        favorites={favorites}
                        toggleFavorite={handleToggleFavorite}
                        progressions={progressions}
                        API_URL={API_URL}
                        setToast={setToast}
                        searchQuery={searchQuery}
                      />
                    ) : (
                      <Navigate to="/auth" replace />
                    )
                  } />

                  <Route path="/account" element={
                    user ? (
                      user.hasCompletedOnboarding ? (
                        <AccountPage
                          user={user}
                          onUpdateUser={handleUpdateUser}
                          onLogout={handleLogout}
                          progressions={progressions}
                          favorites={favorites}
                          onToggleFavorite={handleToggleFavorite}
                          API_URL={API_URL}
                          setToast={setToast}
                        />
                      ) : (
                        <Navigate to="/dashboard" replace />
                      )
                    ) : (
                      <Navigate to="/auth" replace />
                    )
                  } />

                  <Route path="/leaderboard" element={
                    user ? (
                      user.hasCompletedOnboarding ? (
                        <Leaderboard user={user} API_URL={API_URL} setToast={setToast} />
                      ) : (
                        <Navigate to="/dashboard" replace />
                      )
                    ) : (
                      <Navigate to="/auth" replace />
                    )
                  } />

                  <Route path="/projects" element={
                    user ? (
                      user.hasCompletedOnboarding ? (
                        <ProjectsList user={user} setUser={handleUpdateUser} API_URL={API_URL} setToast={setToast} />
                      ) : (
                        <Navigate to="/dashboard" replace />
                      )
                    ) : (
                      <Navigate to="/auth" replace />
                    )
                  } />

                  <Route path="/course/:courseId" element={
                    user ? (
                      user.hasCompletedOnboarding ? (
                        <CoursePage
                          user={user}
                          API_URL={API_URL}
                          setToast={setToast}
                          fetchProgressions={fetchProgressions}
                          progressions={progressions}
                        />
                      ) : (
                        <Navigate to="/dashboard" replace />
                      )
                    ) : (
                      <Navigate to="/auth" replace />
                    )
                  } />

                  <Route path="/course/:courseId/chapter/:chapterIndex" element={
                    user ? (
                      user.hasCompletedOnboarding ? (
                        <ChapterPage
                          user={user}
                          API_URL={API_URL}
                          setToast={setToast}
                          fetchProgressions={fetchProgressions}
                          progressions={progressions}
                        />
                      ) : (
                        <Navigate to="/dashboard" replace />
                      )
                    ) : (
                      <Navigate to="/auth" replace />
                    )
                  } />

                  {/* Route 2FA Setup */}
                  <Route path="/two-factor-setup" element={
                    user ? (
                      user.hasCompletedOnboarding ? (
                        <TwoFactorSetupPage
                          user={user}
                          API_URL={API_URL}
                          setToast={setToast}
                        />
                      ) : (
                        <Navigate to="/dashboard" replace />
                      )
                    ) : (
                      <Navigate to="/auth" replace />
                    )
                  } />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </Router>
        </LanguageProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;