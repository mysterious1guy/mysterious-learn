import { Link, useLocation } from 'react-router-dom';
import { Menu, BarChart3, Crown, Briefcase, Trophy } from 'lucide-react';
import MysteriousGeometricLogo from '../MysteriousGeometricLogo';
import SearchBar from './SearchBar';
import NotificationBell from './NotificationBell';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ user, onMenuClick, onShowUsageMonitor, onSearch, API_URL }) => {
  const location = useLocation();
  const { t } = useLanguage();
  const isCoursePage = location.pathname.startsWith('/course/') || location.pathname.startsWith('/chapter/');
  return (
    <nav className="relative w-full p-2 sm:p-4 border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-[60] transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition shrink-0 text-slate-600 dark:text-gray-300">
            <Menu size={20} />
          </button>

          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0"
          >
            <MysteriousGeometricLogo className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 group-hover:rotate-180 transition-transform duration-700 shrink-0" />
            <span className="font-black text-[11px] sm:text-xl md:text-2xl tracking-tighter bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate">
              MYSTERIOUS CLASSROOM
            </span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center gap-2 sm:gap-6 hidden md:flex">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${location.pathname === '/dashboard' ? 'bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20' : 'text-slate-600 dark:text-gray-400 hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <BarChart3 size={18} />
            {t('dashboard')}
          </Link>
          <Link
            to="/projects"
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${location.pathname === '/projects' ? 'bg-indigo-500/10 text-indigo-500 ring-1 ring-indigo-500/20' : 'text-slate-600 dark:text-gray-400 hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <Briefcase size={18} />
            {t('projects')}
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
          </Link>
          <Link
            to="/leaderboard"
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${location.pathname === '/leaderboard' ? 'bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20' : 'text-slate-600 dark:text-gray-400 hover:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <Trophy size={18} />
            {t('leaderboard')}
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-4 ml-auto">
          {user ? (
            <>
              <NotificationBell user={user} API_URL={API_URL} />
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 p-2 sm:px-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/20 transition-all group"
                  title={t('admin')}
                >
                  <Crown size={16} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-yellow-500 hidden md:block">{t('admin')}</span>
                </Link>
              )}

              <Link
                to="/account"
                className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition"
              >
                <div className="flex flex-col items-end hidden md:flex">
                  <span className="text-sm font-bold text-slate-800 dark:text-white leading-none">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">
                    {t('account')}
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
            </>
          ) : (
            <Link
              to="/auth"
              className="px-3 py-1.5 sm:px-6 sm:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[10px] sm:text-sm font-black rounded-lg sm:rounded-xl transition-all shadow-xl shadow-blue-900/20 active:scale-95 flex items-center gap-2 shrink-0"
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
