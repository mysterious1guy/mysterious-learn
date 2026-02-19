import { Link, useNavigate } from 'react-router-dom';
import { Menu, BarChart3 } from 'lucide-react';
import MysteriousGeometricLogo from '../MysteriousGeometricLogo';
import SearchBar from './SearchBar';

const Navbar = ({ user, onMenuClick, onShowUsageMonitor }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md z-40">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition">
            <Menu />
          </button>
          
          <Link
            to="/dashboard"
            className="hidden md:flex items-center gap-3 cursor-pointer group"
          >
            <MysteriousGeometricLogo className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
            <span className="font-black text-lg tracking-tighter bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MYSTERIOUS CLASSROOM
            </span>
          </Link>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <SearchBar onSearch={(query) => console.log('Search:', query)} />
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/account"
            className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition"
          >
            <span className="text-sm font-medium hidden md:block">
              {user?.firstName} {user?.lastName}
            </span>
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full object-cover border-2 border-blue-500" 
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
            )}
          </Link>
          
          {/* Bouton moniteur d'utilisation */}
          <button
            onClick={onShowUsageMonitor}
            className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition"
            title="Voir mes statistiques d'utilisation"
          >
            <BarChart3 size={16} className="text-gray-400" />
            <span className="text-sm font-medium hidden md:block">
              Moniteur
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
