import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, User, Clock, Users } from 'lucide-react';
import MysteriousGeometricLogo from '../MysteriousGeometricLogo';
import Particles from '../Particles';

const HomePage = () => {
  const navigate = useNavigate();
  
  const stats = [
    { label: 'Cours disponibles', value: '24', icon: <BookOpen /> },
    { label: 'Utilisateurs actifs', value: '12k+', icon: <User /> },
    { label: 'Heures de contenu', value: '150+', icon: <Clock /> },
    { label: 'Communauté', value: '5k+', icon: <Users /> },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full pt-20">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        >
          <MysteriousGeometricLogo className="w-48 h-48 mb-10 drop-shadow-[0_0_35px_rgba(59,130,246,0.5)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-8 text-center px-4"
        >
          MYSTERIOUS CLASSROOM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-blue-200 font-medium tracking-[0.3em] text-xs md:text-sm mb-12 uppercase text-center max-w-lg leading-loose"
        >
          Le code n'a jamais été aussi fascinant.
          <br />
          <span className="text-purple-400">Plongez dans l'expérience immersive.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 px-6"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-blue-400 flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 font-mono mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/auth')}
          className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-2xl flex items-center gap-3 text-lg"
        >
          <Play fill="currentColor" /> COMMENCER L'AVENTURE
        </motion.button>

        <footer className="w-full py-8 border-t border-white/10 mt-12">
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-blue-400 transition">Politique de confidentialité</a>
            <a href="/terms" className="hover:text-blue-400 transition">Conditions d'utilisation</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
