import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import MobileMenu from '../components/MobileMenu';
import AIAssistant from '../components/AIAssistant';
import Footer from '../components/Footer';
import ActivityTracker from '../components/ActivityTracker';
import UsageMonitor from '../components/UsageMonitor';
import { API_URL } from '../config';

const MainLayout = ({ user, onLogout, onSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUsageMonitor, setShowUsageMonitor] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/');
  const currentView = pathParts[1] || 'home';
  const courseId = currentView === 'course' ? pathParts[2] : null;

  const handleAIAction = (action, data) => {
    switch (action) {
      case 'NAVIGATE_ADMIN':
        window.location.href = '/admin';
        break;
      case 'NAVIGATE_SETTINGS':
        window.location.href = '/account';
        break;
      case 'NAVIGATE_DASHBOARD':
        window.location.href = '/dashboard';
        break;
      case 'OPEN_USAGE_MONITOR':
        setShowUsageMonitor(true);
        break;
      case 'OPEN_COURSE':
        navigate(`/course/${data}`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ActivityTracker user={user} API_URL={API_URL} />

      <Navbar
        user={user}
        onMenuClick={() => setMobileMenuOpen(true)}
        onShowUsageMonitor={() => setShowUsageMonitor(true)}
        onSearch={onSearch}
        API_URL={API_URL}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        onLogout={onLogout}
      />

      {location.pathname !== '/' && (
        <AIAssistant
          user={user}
          currentView={currentView}
          courseId={courseId}
          onAction={handleAIAction}
          isAdmin={user?.email === 'mouhamedfall@esp.sn' || user?.role === 'admin'}
          API_URL={API_URL}
        />
      )}

      <main className="relative z-10">
        <Outlet />
      </main>

      {currentView !== 'course' && <Footer />}

      {/* Moniteur d'utilisation */}
      <UsageMonitor
        user={user}
        API_URL={API_URL}
        isVisible={showUsageMonitor}
        onClose={() => setShowUsageMonitor(false)}
      />
    </>
  );
};

export default MainLayout;
