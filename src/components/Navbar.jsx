import { Link } from 'react-router-dom';
import { Menu, BarChart3, Crown } from 'lucide-react';
import MysteriousGeometricLogo from '../MysteriousGeometricLogo';
import SearchBar from './SearchBar';
import NotificationBell from './NotificationBell';

const Navbar = ({ user, onMenuClick, onShowUsageMonitor, onSearch, API_URL }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md z-40">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition">
            <Menu />
          </button>

          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <MysteriousGeometricLogo className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
            <span className="font-black text-lg tracking-tighter bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MYSTERIOUS CLASSROOM
            </span>
          </Link>
        </div>

        <div className="flex-1 max-w-md mx-4 hidden md:block">
          {user && <SearchBar onSearch={onSearch} />}
        </div>

        <div className="flex items-center gap-1 sm:gap-4 ml-auto">
          {user ? (
            <>
              <NotificationBell API_URL={API_URL} />
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 p-2 sm:px-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/20 transition-all group"
                  title="Accéder au panneau d'administration"
                >
                  <Crown size={16} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-yellow-500 hidden md:block">Admin</span>
                </Link>
              )}

              <Link
                to="/account"
                className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition"
              >
                <div className="flex flex-col items-end hidden md:flex">
                  <span className="text-sm font-bold text-white leading-none">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">
                    Profil
                  </span>
                </div>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 shadow-lg shadow-blue-500/20"
                  />
                ) : (
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-sm font-black text-white shadow-lg border-2 border-slate-800">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </div>
                )}
              </Link>

              <button
                onClick={onShowUsageMonitor}
                className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition group"
                title="Statistiques d'utilisation"
              >
                <BarChart3 size={18} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm font-bold hidden md:block text-slate-300 group-hover:text-white transition-colors">
                  Moniteur
                </span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-black rounded-xl transition-all shadow-xl shadow-blue-900/20 active:scale-95 flex items-center gap-2"
            >
              SE CONNECTER
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
