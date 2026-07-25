import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, ShieldAlert } from 'lucide-react';

export const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: {
      bg: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-emerald-950/50',
      iconColor: 'text-emerald-400',
      icon: CheckCircle
    },
    error: {
      bg: 'bg-rose-950/90 border-rose-500/50 text-rose-100 shadow-rose-950/50',
      iconColor: 'text-rose-400',
      icon: ShieldAlert
    },
    warning: {
      bg: 'bg-amber-950/90 border-amber-500/50 text-amber-100 shadow-amber-950/50',
      iconColor: 'text-amber-400',
      icon: AlertTriangle
    },
    info: {
      bg: 'bg-slate-900/90 border-blue-500/50 text-blue-100 shadow-blue-950/50',
      iconColor: 'text-blue-400',
      icon: Info
    }
  };

  const current = config[type] || config.info;
  const IconComponent = current.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.9 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ zIndex: 9999999 }}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 ${current.bg} border backdrop-blur-xl px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold max-w-lg w-auto select-none pointer-events-auto`}
    >
      <IconComponent size={20} className={`flex-shrink-0 ${current.iconColor}`} />
      <span className="leading-snug">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-3 p-1.5 rounded-xl hover:bg-white/10 transition-colors flex-shrink-0 text-white/70 hover:text-white"
        aria-label="Fermer"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};
