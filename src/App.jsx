import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AuthPage from './pages/AuthPage';
import CallbackPage from './pages/CallbackPage'; // ← AJOUTÉ
import DashboardPage from './pages/DashboardPage';
import AccountPage from './pages/AccountPage';
import CoursePage from './pages/CoursePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import TwoFactorSetupPage from './pages/TwoFactorSetupPage';

// Hooks et composants
import { useLocalStorage } from './hooks/useLocalStorage';
import { useCookies } from './hooks/useCookies';
import { Toast } from './components/Toast';
import Particles from './Particles';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import DebugMonitor from './components/DebugMonitor';
import OAuthDebugger from './components/OAuthDebugger';
import LiveMonitor from './components/LiveMonitor';

function App() {
  const [user, setUser] = useLocalStorage('user', null);
  const [toast, setToast] = useState(null);
  const [progressions, setProgressions] = useState({});
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const { setUserCookie, getUserCookie, removeUserCookie, setProgressCookie, getProgressCookie } = useCookies();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    const name = updatedData.name || '';
    const firstName = updatedData.firstName || name.split(' ')[0] || '';
    const lastName = updatedData.lastName || (name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : '') || '';

    if (updatedData.favorites) {
      setFavorites(updatedData.favorites);
    }

    const updatedUser = {
      ...user,
      ...updatedData,
      firstName,
      lastName
    };

    setUser(updatedUser);
  };

  const handleLogout = () => {
    setUser(null);
    setProgressions({});
    removeUserCookie();
    setToast({ message: 'Déconnexion réussie', type: 'info' });
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
      fetchProgressions();
    }
  }, [user]);

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

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
        <Particles theme="dark" />

        <AnimatePresence>
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </AnimatePresence>

        {/* Debug Monitor - Uniquement en développement */}
        {import.meta.env.DEV && <DebugMonitor API_URL={API_URL} />}

        {/* OAuth Debugger - Toujours visible */}
        <OAuthDebugger />

        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<HomePage API_URL={API_URL} />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/auth" element={<AuthPage user={user} setUser={handleUpdateUser} API_URL={API_URL} setToast={setToast} />} />
            {/* ✅ Nouvelle route pour le callback Google */}
            <Route path="/auth/callback" element={
              <CallbackPage
                setUser={handleUpdateUser}
                setToast={setToast}
                fetchProgressions={fetchProgressions}
              />
            } />
            {/* Route Admin Login */}
            <Route path="/admin/login" element={<AdminLoginPage setToast={setToast} />} />
          </Route>

          <Route element={<MainLayout user={user} onLogout={handleLogout} />}>
            {/* Route Admin - Dashboard */}
            <Route path="/admin" element={<AdminPage user={user} API_URL={API_URL} setToast={setToast} />} />

            {/* Routes protégées - nécessitent une connexion */}
            <Route path="/dashboard" element={
              user ? (
                <DashboardPage user={user} favorites={favorites} toggleFavorite={(id) => {
                  const newFavs = favorites.includes(id)
                    ? favorites.filter(f => f !== id)
                    : [...favorites, id];
                  setFavorites(newFavs);
                }}
                  progressions={progressions}
                  API_URL={API_URL}
                  setToast={setToast}
                />
              ) : (
                <Navigate to="/auth" replace />
              )
            } />

            <Route path="/account" element={
              user ? (
                <AccountPage
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  onLogout={handleLogout}
                  onToggleFavorite={(id) => {
                    const newFavs = favorites.includes(id)
                      ? favorites.filter(f => f !== id)
                      : [...favorites, id];
                    setFavorites(newFavs);
                  }}
                  API_URL={API_URL}
                  setToast={setToast}
                />
              ) : (
                <Navigate to="/auth" replace />
              )
            } />

            <Route path="/course/:courseId" element={
              user ? (
                <CoursePage
                  user={user}
                  API_URL={API_URL}
                  setToast={setToast}
                />
              ) : (
                <Navigate to="/auth" replace />
              )
            } />

            {/* Route 2FA Setup */}
            <Route path="/two-factor-setup" element={
              user ? (
                <TwoFactorSetupPage
                  user={user}
                  API_URL={API_URL}
                  setToast={setToast}
                />
              ) : (
                <Navigate to="/auth" replace />
              )
            } />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;