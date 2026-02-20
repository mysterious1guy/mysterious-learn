import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Star, BookOpen, CheckCircle, PlayCircle } from 'lucide-react';
import AlgoCourse from '../courses/algo/AlgoCourse';

const CoursePage = ({ user, API_URL, setToast }) => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedChapter, setExpandedChapter] = useState(null);

    useEffect(() => {
        if (courseId !== 'algo') {
            fetchCourse();
        } else {
            setLoading(false);
        }
    }, [courseId]);

    const fetchCourse = async () => {
        try {
            const response = await fetch(`${API_URL}/courses/${courseId}`);
            if (response.ok) {
                const courseData = await response.json();
                setCourse(courseData);
            } else {
                setToast({ message: 'Cours non trouvé', type: 'error' });
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setToast({ message: 'Erreur de chargement', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const toggleChapter = (chapterIndex) => {
        setExpandedChapter(expandedChapter === chapterIndex ? null : chapterIndex);
    };

    const startLesson = (chapterIndex) => {
        // Navigation vers la page de leçon spécifique
        navigate(`/course/${courseId}/chapter/${chapterIndex}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">Chargement du cours...</div>
            </div>
        );
    }

    if (!course && courseId !== 'algo') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">Cours non trouvé</div>
            </div>
        );
    }

    if (courseId === 'algo') {
        return <AlgoCourse onClose={() => navigate('/dashboard')} user={user} API_URL={API_URL} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
            <div className="max-w-6xl mx-auto p-6 pt-24">
                {/* Header */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
                    Retour aux cours
                </button>

                {/* Course Header */}
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                                    {course.category}
                                </span>
                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                    {course.level}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {course.title}
                            </h1>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Clock size={16} />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Users size={16} />
                                    <span>{course.students.toLocaleString()} étudiants</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Star size={16} className="text-yellow-400" />
                                    <span>{course.rating}/5</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Chapters */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <BookOpen size={24} />
                        Contenu du cours
                    </h2>

                    {course.chapters.map((chapter, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-600"
                        >
                            <div
                                className="p-6 cursor-pointer flex items-center justify-between"
                                onClick={() => toggleChapter(index)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {chapter.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            {chapter.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-400 text-sm flex items-center gap-1">
                                        <Clock size={14} />
                                        {chapter.duration}
                                    </span>
                                    <PlayCircle
                                        size={20}
                                        className="text-gray-400 transition-transform duration-300"
                                        style={{
                                            transform: expandedChapter === index ? 'rotate(90deg)' : 'rotate(0deg)'
                                        }}
                                    />
                                </div>
                            </div>

                            {expandedChapter === index && (
                                <div className="px-6 pb-6 border-t border-gray-700">
                                    <div className="pt-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-white font-medium">Objectifs d'apprentissage</h4>
                                            <button
                                                onClick={() => startLesson(index)}
                                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition flex items-center gap-2"
                                            >
                                                <PlayCircle size={16} />
                                                Commencer
                                            </button>
                                        </div>

                                        <ul className="space-y-2 mb-4">
                                            {chapter.objectives.map((objective, objIndex) => (
                                                <li key={objIndex} className="flex items-start gap-2 text-gray-300">
                                                    <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm">{objective}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {chapter.exercises && chapter.exercises.length > 0 && (
                                            <div>
                                                <h5 className="text-white font-medium mb-2">Exercices pratiques</h5>
                                                <div className="space-y-2">
                                                    {chapter.exercises.map((exercise, exIndex) => (
                                                        <div key={exIndex} className="bg-gray-700/50 rounded-lg p-3">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-white text-sm font-medium">
                                                                    {exercise.title}
                                                                </span>
                                                                <span className={`px-2 py-1 rounded text-xs ${exercise.difficulty === 'Facile' ? 'bg-green-500/20 text-green-400' :
                                                                    exercise.difficulty === 'Moyen' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                        'bg-red-500/20 text-red-400'
                                                                    }`}>
                                                                    {exercise.difficulty}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-400 text-xs">
                                                                {exercise.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursePage;