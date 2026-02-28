import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Star, BookOpen, CheckCircle, PlayCircle } from 'lucide-react';
import GenericCourse from '../components/GenericCourse';
import ComingSoon from '../components/ComingSoon';
import VideoPlayer from '../components/VideoPlayer';
import { coursesData } from '../courses/data.jsx';

const CoursePage = ({ user, API_URL, setToast, fetchProgressions, progressions }) => {
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
        if (!course || !user || !progressions) return;

        // 🚀 God-mode for Admins
        if (user?.role === 'admin') return;

        let targetLevelToCheck = '';
        if (course.level === 'Intermédiaire') targetLevelToCheck = 'Débutant';
        if (course.level === 'Avancé') targetLevelToCheck = 'Intermédiaire';

        if (!targetLevelToCheck || course.level === 'Débutant' || user?.unlockedCourses?.includes(course.id)) return;

        let unlocked = false;
        for (const cat of coursesData) {
            if (cat.items.some(i => i.id === course.id)) {
                const reqCourse = cat.items.find(i => i.level === targetLevelToCheck);
                if (reqCourse) {
                    const reqProgress = progressions?.[reqCourse.id]?.progress || 0;
                    if (reqProgress >= 100) unlocked = true;
                } else {
                    unlocked = true;
                }
            }
        }

        if (!unlocked) {
            if (setToast) setToast({ message: "Vous devez terminer le niveau précédent pour accéder à ce cours.", type: 'warning' });
            navigate('/dashboard', { replace: true });
        }
    }, [course, user, progressions, navigate, setToast, normalizedCourseId]);

    useEffect(() => {
        if (normalizedCourseId) {
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
                setCourse(null);
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

    if (!course) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center">
                <ComingSoon
                    title="Cours introuvable"
                    message="Oups ! Ce cours n'existe pas ou a été retiré."
                />
            </div>
        );
    }

    if (showCustomTimeline) {
        const handleLessonComplete = async (courseId, lessonId) => {
            try {
                const token = user?.token || localStorage.getItem('token');
                if (!token) {
                    setToast({ message: 'Session expirée. Reconnecte-toi.', type: 'error' });
                    return;
                }

                const response = await fetch(`${API_URL}/courses/${courseId}/progress`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        lessonId,
                        totalLessons: course.chapters.length
                    })
                });

                if (response.ok) {
                    setToast({ message: 'Leçon validée ! Bravo 🚀', type: 'success' });
                    if (fetchProgressions) fetchProgressions(); // Refresh UI
                } else {
                    const data = await response.json();
                    setToast({ message: data.message || 'Erreur lors de la validation', type: 'error' });
                }
            } catch (error) {
                console.error('Error validating lesson:', error);
                setToast({ message: 'Erreur réseau', type: 'error' });
            }
        };

        const completedForThisCourse = progressions[course.id]?.completedLessons || [];

        return (
            <GenericCourse
                course={course}
                onClose={() => setShowCustomTimeline(false)}
                user={user}
                completedLessons={completedForThisCourse}
                onLessonComplete={handleLessonComplete}
                API_URL={API_URL}
            />
        );
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

            <div className="max-w-6xl mx-auto p-6 pt-4 relative z-10">
                {/* Header */}
                <button
                    onClick={() => navigate(-1)}
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

                            {course.motivationVideo && (
                                <VideoPlayer
                                    videoId={course.motivationVideo}
                                    title={`Motivation - ${course.title}`}
                                    courseId={course._id || course.id}
                                    chapterId="motivation"
                                    API_URL={API_URL}
                                />
                            )}

                            <div className="mt-8">
                                <button
                                    onClick={() => setShowCustomTimeline(true)}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-3 w-full md:w-auto transform hover:-translate-y-1"
                                >
                                    <PlayCircle size={24} />
                                    DÉMARRER LA CARTE DU COURS
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
                            <img
                                src={course.image || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80"}
                                alt={course.title}
                                className="w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-500"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80";
                                }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CoursePage;
