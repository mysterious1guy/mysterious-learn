import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import MobileMenu from '../components/MobileMenu';
import AIAssistant from '../components/AIAssistant';

const MainLayout = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleAIAction = (action, data) => {
    switch(action) {
      case 'NAVIGATE_ADMIN':
        window.location.href = '/admin';
        break;
      case 'NAVIGATE_SETTINGS':
        window.location.href = '/account';
        break;
      case 'NAVIGATE_DASHBOARD':
        window.location.href = '/dashboard';
        break;
      case 'OPEN_COURSE':
        // Logique pour ouvrir un cours spécifique
        console.log('Opening course:', data);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Navbar 
        user={user}
        onMenuClick={() => setMobileMenuOpen(true)}
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
        isAdmin={user?.email === 'cmouhamedfall@esp.sn' || user?.role === 'admin'}
      />

      <main className="relative z-10 pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
