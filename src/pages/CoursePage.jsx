import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Star, BookOpen, CheckCircle, PlayCircle } from 'lucide-react';
import AlgoCourse from '../courses/algo/AlgoCourse';
import CCourse from '../courses/c/CCourse';
import BashCourse from '../courses/bash/BashCourse';

const CoursePage = ({ user, API_URL, setToast, fetchProgressions }) => {
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
    const [showCustomTimeline, setShowCustomTimeline] = useState(false);

    const normalizedCourseId = courseId?.toLowerCase().trim();

    useEffect(() => {
        if (normalizedCourseId === 'algo') {
            setCourse({
                title: "Introduction à l'Algorithmique",
                description: "Apprenez les bases fondamentales de l'algorithmique avec des exemples concrets et des exercices pratiques.",
                category: "Théorie",
                level: "Débutant",
                students: 0,
                rating: 0,
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
                chapters: [
                    { title: "Introduction aux Algorithmes", description: "Découvrez ce qu'est un algorithme et pourquoi c'est fondamental", duration: "45min", objectives: ["Comprendre l'algorithmique"], exercises: [] },
                    { title: "Variables et Types", description: "Apprenez à stocker et manipuler des données", duration: "60min", objectives: ["Variables et types de base"], exercises: [] }
                ]
            });
            setLoading(false);
        } else if (normalizedCourseId === 'c') {
            setCourse({
                title: "Langage C pour Débutants",
                description: "Maîtrisez les fondamentaux du langage C, base de nombreux autres langages de programmation.",
                category: "Programmation",
                level: "Débutant",
                students: 0,
                rating: 0,
                image: "https://images.unsplash.com/photo-1516116216624-98e6e351d85e?w=400",
                chapters: [
                    { title: "Premiers Pas en C", description: "Installation et premier programme Hello World.", duration: "30min", objectives: ["Hello World en C"], exercises: [] }
                ]
            });
            setLoading(false);
        } else if (normalizedCourseId === 'bash') {
            setCourse({
                title: "Bash & Linux : Le Terminal",
                description: "Maîtrisez la ligne de commande et devenez le maître de votre système Linux.",
                category: "Système",
                level: "Débutant",
                students: 0,
                rating: 0,
                image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
                chapters: [
                    { title: "Bases du Terminal", description: "Ouvrir et utiliser son premier shell.", objectives: ["Usage du CLI"], exercises: [] }
                ]
            });
            setLoading(false);
        } else if (normalizedCourseId) {
            fetchCourse();
        } else {
            setLoading(false);
        }
    }, [normalizedCourseId]);

    const fetchCourse = async () => {
        try {
            const response = await fetch(`${API_URL}/courses/${normalizedCourseId}`);
            if (response.ok) {
                const courseData = await response.json();
                setCourse(courseData);
            } else {
                setToast({ message: 'Cours non trouvé', type: 'error' });
                navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
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

    if (!course && normalizedCourseId !== 'algo' && normalizedCourseId !== 'c' && normalizedCourseId !== 'bash') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">Cours non trouvé</div>
            </div>
        );
    }

    if (showCustomTimeline) {
        if (normalizedCourseId === 'algo') {
            return <AlgoCourse onClose={() => setShowCustomTimeline(false)} user={user} API_URL={API_URL} fetchProgressions={fetchProgressions} />;
        }
        if (normalizedCourseId === 'c') {
            return <CCourse onClose={() => setShowCustomTimeline(false)} user={user} API_URL={API_URL} fetchProgressions={fetchProgressions} />;
        }
        if (normalizedCourseId === 'bash') {
            return <BashCourse onClose={() => setShowCustomTimeline(false)} user={user} API_URL={API_URL} fetchProgressions={fetchProgressions} />;
        }
    }

    return (
        <div
            className="min-h-screen course-theme-light bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden relative"
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
                    onClick={() => navigate(user?.role === 'admin' ? '/admin' : '/dashboard')}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
                    Retour aux cours
                </button>

                {/* Course Header */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-8 shadow-sm">
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
                            <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                                {course.title}
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                {course.description}
                            </p>

                            {user?.email === 'mouhamedfall@esp.sn' && (
                                <div className="flex flex-wrap gap-6 text-sm">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Users size={16} />
                                        <span>{(course.students || 0).toLocaleString()} étudiants</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                        <span>{course.rating || 0}/5</span>
                                    </div>
                                </div>
                            )}

                            {(normalizedCourseId === 'algo' || normalizedCourseId === 'c' || normalizedCourseId === 'bash') && (
                                <div className="mt-8">
                                    <button
                                        onClick={() => setShowCustomTimeline(true)}
                                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-3 w-full md:w-auto transform hover:-translate-y-1"
                                    >
                                        <PlayCircle size={24} />
                                        DÉMARRER LA CARTE DU COURS
                                    </button>
                                </div>
                            )}
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

            </div>
        </div>
    );
};

export default CoursePage;
