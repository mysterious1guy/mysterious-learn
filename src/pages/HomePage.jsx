import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Star, BookOpen, Sparkles, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedLogo from '../components/AnimatedLogo';
import Footer from '../components/Footer';

const HomePage = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${API_URL}/courses`);
            if (response.ok) {
                const coursesData = await response.json();
                setCourses(coursesData);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des cours:', error);
        } finally {
            setLoading(false);
        }
    };

    const CourseCard = ({ course, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/course/${course._id}`)}
        >
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs backdrop-blur-sm">
                        {course.category}
                    </span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs backdrop-blur-sm">
                        {course.level}
                    </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg line-clamp-2">
                        {course.title}
                    </h3>
                </div>
            </div>
            
            <div className="p-6">
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400" />
                        <span>{course.rating}</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                        <span>100% Gratuit</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition">
                        <span className="text-sm font-medium">Commencer</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </div>
                </div>
            </div>
        </motion.div>
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">Chargement des cours...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
                    <div className="text-center space-y-8">
                        {/* Logo animé */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex justify-center"
                        >
                            <AnimatedLogo size="xlarge" />
                        </motion.div>
                        
                        {/* Titre avec typographie améliorée */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h1 className="relative">
                                <span className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 block leading-none tracking-tight">
                                    MYSTERIOUS
                                </span>
                                <span className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 block leading-none tracking-tight">
                                    CLASSROOM
                                </span>
                                
                                {/* Effet de brillance */}
                                <div className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black text-white/5 leading-none tracking-tight pointer-events-none">
                                    MYSTERIOUS CLASSROOM
                                </div>
                            </h1>
                            
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                            >
                                Découvrez une nouvelle façon d'apprendre avec des cours gratuits, 
                                interactifs et conçus par des passionnés.
                            </motion.p>
                        </motion.div>
                        
                        {/* Boutons d'action */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <motion.button
                                onClick={() => navigate('/auth')}
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="flex items-center gap-2">
                                    <Zap size={20} />
                                    Commencer l'aventure
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                                </span>
                                
                                {/* Effet de brillance */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </motion.button>
                            
                            <motion.button
                                onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white rounded-full font-semibold text-lg hover:bg-gray-800/70 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="flex items-center gap-2">
                                    <BookOpen size={20} />
                                    Explorer les cours
                                </span>
                            </motion.button>
                        </motion.div>
                        
                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                        >
                            {[
                                { icon: BookOpen, label: "Cours", value: "12+" },
                                { icon: Users, label: "Étudiants", value: "2.3K+" },
                                { icon: Star, label: "Note", value: "4.8/5" },
                                { icon: Sparkles, label: "Satisfaction", value: "98%" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <stat.icon size={20} className="text-blue-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
                
                {/* Particules flottantes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                            style={{
                                left: `${10 + i * 15}%`,
                                top: `${20 + (i % 2) * 30}%`
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0, 1, 0],
                                scale: [1, 1.5, 1]
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                delay: i * 0.5
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Courses Section */}
            <div id="courses" className="max-w-7xl mx-auto px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <BookOpen size={36} className="text-blue-400" />
                        Cours Disponibles
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Découvrez notre sélection de cours conçus par des experts pour vous aider à progresser
                    </p>
                </motion.div>

                {courses.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-gray-400 text-lg">
                            Aucun cours disponible pour le moment.
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <CourseCard key={course._id} course={course} index={index} />
                        ))}
                    </div>
                )}

                {courses.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <button
                            onClick={() => navigate('/courses')}
                            className="px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white rounded-full hover:bg-gray-700/50 transition-all duration-300 flex items-center gap-2 mx-auto"
                        >
                            <span>Voir tous les cours</span>
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
