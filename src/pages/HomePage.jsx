import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, User, Clock, Users, Star, ChevronRight } from 'lucide-react';
import MysteriousGeometricLogo from '../MysteriousGeometricLogo';
import Particles from '../Particles';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Données des cours (à remplacer par un appel API)
  const courses = [
    {
      id: 1,
      title: "Introduction à Python",
      description: "Apprenez les bases de Python, le langage parfait pour débuter",
      level: "Débutant",
      duration: "4h",
      rating: 4.8,
      students: 1234,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
      category: "Programmation"
    },
    {
      id: 2,
      title: "JavaScript Moderne",
      description: "Maîtrisez JavaScript ES6+ et construisez des applications web",
      level: "Intermédiaire",
      duration: "6h",
      rating: 4.9,
      students: 892,
      image: "https://images.unsplash.com/photo-1579468458835-cd73b7b7dfd5?w=400",
      category: "Web"
    },
    {
      id: 3,
      title: "Algorithmes et Structures",
      description: "Comprenez les algorithmes fondamentaux et structures de données",
      level: "Intermédiaire",
      duration: "8h",
      rating: 4.7,
      students: 567,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      category: "Théorie"
    },
    {
      id: 4,
      title: "React Avancé",
      description: "Construisez des applications complexes avec React et Hooks",
      level: "Avancé",
      duration: "10h",
      rating: 4.9,
      students: 445,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee5?w=400",
      category: "Web"
    },
    {
      id: 5,
      title: "Bases de Données SQL",
      description: "Apprenez à concevoir et interroger des bases de données relationnelles",
      level: "Intermédiaire",
      duration: "7h",
      rating: 4.6,
      students: 723,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      category: "Data"
    },
    {
      id: 6,
      title: "Développement Web Full-Stack",
      description: "Devenez développeur complet avec MERN stack",
      level: "Avancé",
      duration: "15h",
      rating: 4.8,
      students: 334,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
      category: "Web"
    }
  ];
  
  const stats = [
    { label: 'Cours disponibles', value: '24', icon: <BookOpen /> },
    { label: 'Utilisateurs actifs', value: '12k+', icon: <User /> },
    { label: 'Heures de contenu', value: '150+', icon: <Clock /> },
    { label: 'Communauté', value: '5k+', icon: <Users /> },
  ];

  const CourseCard = ({ course, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
      onClick={() => navigate('/dashboard')}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full">
          <span className="text-xs font-semibold text-white">{course.category}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-2 py-1 bg-gray-900/80 backdrop-blur-sm rounded text-xs text-gray-300">
            {course.level}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-300">{course.rating}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {course.students.toLocaleString()} étudiants
          </span>
          <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen bg-[#0f172a]">
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center w-full pt-20 pb-16">
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
            className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-8 text-center px-4 tracking-tighter"
            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '-0.05em' }}
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
        </div>

        {/* Courses Section */}
        <div className="px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Explorez Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Cours Premium</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Des formations complètes conçues par des experts pour vous transformer en professionnel du code
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg flex items-center gap-3 mx-auto"
              >
                <BookOpen size={20} />
                Voir Tous les Cours
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
