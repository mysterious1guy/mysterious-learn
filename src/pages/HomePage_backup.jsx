import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, User, Clock, Users, Star, ChevronRight } from 'lucide-react';
import MysteriousGeometricLogo from '../MysteriousGeometricLogo';
import Particles from '../Particles';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Données des cours (à remplacer par un appel API)

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${API_URL}/api/courses`);
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
