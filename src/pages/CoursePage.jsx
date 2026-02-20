import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Star, BookOpen, CheckCircle, PlayCircle } from 'lucide-react';
import AlgoCourse from '../courses/algo/AlgoCourse';

const CoursePage = ({ user, API_URL, setToast }) => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedChapter, setExpandedChapter] = useState(null);

    const normalizedCourseId = courseId?.toLowerCase();

    useEffect(() => {
        if (normalizedCourseId !== 'algo' && normalizedCourseId) {
            fetchCourse();
        } else {
            setLoading(false);
        }
    }, [normalizedCourseId]);

    const fetchCourse = async () => {
        if (normalizedCourseId === 'algo') return;
        try {
            const response = await fetch(`${API_URL}/courses/${normalizedCourseId}`);
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
        navigate(`/course/${courseId}/chapter/${chapterIndex}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">Chargement du cours...</div>
            </div>
        );
    }

    if (!course && normalizedCourseId !== 'algo') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">Cours non trouvé</div>
            </div>
        );
    }

    if (normalizedCourseId === 'algo') {
        return <AlgoCourse onClose={() => navigate('/dashboard')} user={user} API_URL={API_URL} />;
    }

    return (
        <div
            className="min-h-screen course-theme-light bg-slate-50 transition-colors duration-500 overflow-hidden relative"
            style={{
                perspective: '1000px'
            }}
        >
            {/* Animated Background Elements */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto p-6 pt-24 relative z-10">
                {/* Header */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
                    Retour aux cours
                </button>

                {/* Course Header */}
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl p-8 mb-8 shadow-sm">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                                    {course.category}
                                </span>
                                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
                                    {course.level}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold mb-4 text-slate-900">
                                {course.title}
                            </h1>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Clock size={16} />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Users size={16} />
                                    <span>{course.students.toLocaleString()} étudiants</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                    <span>{course.rating}/5</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-64 object-cover rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Chapters */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <BookOpen size={24} className="text-blue-500" />
                        Contenu du cours
                    </h2>

                    {course.chapters.map((chapter, index) => (
                        <div
                            key={index}
                            style={{
                                transform: `translateY(${expandedChapter === index ? -8 : 0}px) rotateX(${expandedChapter === index ? mousePos.y * 0.1 : 0}deg) rotateY(${expandedChapter === index ? -mousePos.x * 0.1 : 0}deg)`,
                                transition: 'transform 0.3s ease-out'
                            }}
                            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 group relative glass-reflection depth-shadow"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <div
                                className="p-6 cursor-pointer flex items-center justify-between"
                                onClick={() => toggleChapter(index)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-800">
                                            {chapter.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm">
                                            {chapter.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-400 text-sm flex items-center gap-1">
                                        <Clock size={14} />
                                        {chapter.duration}
                                    </span>
                                    <PlayCircle
                                        size={20}
                                        className={`transition-transform duration-300 ${expandedChapter === index ? 'text-blue-500' : 'text-slate-300'}`}
                                        style={{
                                            transform: expandedChapter === index ? 'rotate(90deg)' : 'rotate(0deg)'
                                        }}
                                    />
                                </div>
                            </div>

                            {expandedChapter === index && (
                                <div className="px-6 pb-6 border-t border-slate-100 bg-slate-50/30">
                                    <div className="pt-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-slate-700 font-medium">Objectifs d'apprentissage</h4>
                                            <button
                                                onClick={() => startLesson(index)}
                                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-95 flex items-center gap-2 font-medium"
                                            >
                                                <PlayCircle size={18} />
                                                Commencer
                                            </button>
                                        </div>

                                        <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                                            {chapter.objectives.map((objective, objIndex) => (
                                                <li key={objIndex} className="flex items-start gap-2 text-slate-600 bg-white/50 p-2 rounded-lg border border-slate-100">
                                                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm">{objective}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {chapter.exercises && chapter.exercises.length > 0 && (
                                            <div>
                                                <h5 className="text-slate-700 font-medium mb-3">Exercices pratiques</h5>
                                                <div className="grid gap-3">
                                                    {chapter.exercises.map((exercise, exIndex) => (
                                                        <div key={exIndex} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:border-blue-200 transition-colors">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-slate-800 text-sm font-semibold">
                                                                    {exercise.title}
                                                                </span>
                                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${exercise.difficulty === 'Facile' ? 'bg-green-100 text-green-700' :
                                                                        exercise.difficulty === 'Moyen' ? 'bg-yellow-100 text-yellow-700' :
                                                                            'bg-red-100 text-red-700'
                                                                    }`}>
                                                                    {exercise.difficulty}
                                                                </span>
                                                            </div>
                                                            <p className="text-slate-500 text-sm leading-relaxed">
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
