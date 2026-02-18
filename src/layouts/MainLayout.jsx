import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import MobileMenu from '../components/MobileMenu';

const MainLayout = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      <main className="relative z-10 pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
