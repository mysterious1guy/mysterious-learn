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

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
        <Particles theme="dark" />

        <AnimatePresence>
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </AnimatePresence>

        {/* Debug Monitor - Uniquement en développement */}
        {import.meta.env.DEV && <DebugMonitor API_URL={API_URL} />}

        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<HomePage API_URL={API_URL} />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/auth" element={
              <AuthPage
                setUser={handleUpdateUser}
                API_URL={API_URL}
                setToast={setToast}
                fetchProgressions={fetchProgressions}
              />
            } />
            {/* ✅ Nouvelle route pour le callback Google */}
            <Route path="/auth/callback" element={
              <CallbackPage
                setUser={handleUpdateUser}
                setToast={setToast}
                fetchProgressions={fetchProgressions}
              />
            } />
          </Route>

          <Route element={<MainLayout user={user} onLogout={handleLogout} />}>
            {/* Route Admin - uniquement pour cmouhamedfall@esp.sn */}
            <Route path="/admin" element={
              <ProtectedRoute>
                {user && (user.email === 'cmouhamedfall@esp.sn' || user.role === 'admin') ? (
                  <AdminPage
                    user={user}
                    API_URL={API_URL}
                    setToast={setToast}
                  />
                ) : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage
                  user={user}
                  favorites={favorites}
                  toggleFavorite={(id) => {
                    const newFavs = favorites.includes(id)
                      ? favorites.filter(f => f !== id)
                      : [...favorites, id];
                    setFavorites(newFavs);
                  }}
                  progressions={progressions}
                  API_URL={API_URL}
                  setToast={setToast}
                />
              </ProtectedRoute>
            } />

            <Route path="/account" element={
              <ProtectedRoute>
                <AccountPage
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  onToggleFavorite={(id) => {
                    const newFavs = favorites.includes(id)
                      ? favorites.filter(f => f !== id)
                      : [...favorites, id];
                    setFavorites(newFavs);
                  }}
                  API_URL={API_URL}
                  setToast={setToast}
                />
              </ProtectedRoute>
            } />

            <Route path="/course/:courseId" element={
              <ProtectedRoute>
                <CoursePage
                  user={user}
                  API_URL={API_URL}
                  setToast={setToast}
                />
              </ProtectedRoute>
            } />

            {/* Route 2FA Setup */}
            <Route path="/two-factor-setup" element={
              <ProtectedRoute>
                <TwoFactorSetupPage
                  user={user}
                  API_URL={API_URL}
                  setToast={setToast}
                />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;