import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import MobileMenu from '../components/MobileMenu';
import AIAssistant from '../components/AIAssistant';
import Footer from '../components/Footer';
import ActivityTracker from '../components/ActivityTracker';
import UsageMonitor from '../components/UsageMonitor';

const MainLayout = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUsageMonitor, setShowUsageMonitor] = useState(false);
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
        console.log('Opening course:', data);
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
        API_URL={API_URL}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        onLogout={onLogout}
      />

      <AIAssistant
        user={user}
        currentView={location.pathname.split('/')[1] || 'home'}
        onAction={handleAIAction}
        isAdmin={user?.email === 'mouhamedfall@esp.sn' || user?.role === 'admin'}
      />

      <main className="relative z-10 pt-16">
        <Outlet />
      </main>

      <Footer />

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
