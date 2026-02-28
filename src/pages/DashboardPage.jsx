import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Clock, Users, Lock, BookOpen, ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';
import PlacementTestModal from '../components/PlacementTestModal';
import OnboardingTour from '../components/OnboardingTour';

const DashboardPage = ({ user, onUpdateUser, favorites = [], toggleFavorite, progressions = {}, API_URL }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLockedCourse, setSelectedLockedCourse] = useState(null);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [recentlyUnlocked, setRecentlyUnlocked] = useState(null);
    const [courseStats, setCourseStats] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showTour, setShowTour] = useState(!user?.seenGuides?.includes('main_onboarding'));

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${API_URL}/courses`);
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/stats/courses`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (res.ok) {
                const data = await res.json();
                const stats = {};
                data.forEach(s => stats[s._id] = s.count);
                setCourseStats(stats);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCourses();
        if (user?.role === 'admin') fetchStats();
    }, [API_URL, user]);

    const handleUnlockTargetCourse = async (courseToUnlock) => {
        try {
            const res = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    unlockedCourses: [...(user.unlockedCourses || []), courseToUnlock._id || courseToUnlock.id]
                })
            });
            if (res.ok) {
                const data = await res.json();
                if (onUpdateUser) onUpdateUser(data);
                setRecentlyUnlocked(courseToUnlock);
                fetchCourses();
            }
        } catch (err) {
            console.error('Erreur déblocage:', err);
        }
    };

    const handlePremiumCheckout = async (e, courseId) => {
        e.stopPropagation();
        try {
            const res = await fetch(`${API_URL}/payment/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ courseId })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.url) {
                    window.location.href = data.url;
                }
            } else {
                const errData = await res.json();
                alert(`Erreur: ${errData.message || 'Impossible de créer la session de paiement'}`);
            }
        } catch (err) {
            console.error('Erreur Stripe Checkout:', err);
        }
    };

    const isCourseUnlocked = (item) => {
        if (!item) return true;
        if (user?.role === 'admin') return true;
        const itemId = item._id || item.id;
        if (user?.unlockedCourses?.includes(itemId)) return true;
        if (item.isPremium) return false;

        // Unified level check
        const userLevel = (user?.programmingLevel || user?.onboardingProfile?.startingLevel || 'Débutant');

        // Débutant / beginner -> can access Débutant
        if (item.level === 'Débutant') return true;

        // Avancé -> can access everything
        if (userLevel === 'Avancé') return true;

        // Amateur / intermediate -> can access Intermédiaire
        if (userLevel === 'Intermédiaire' && item.level === 'Intermédiaire') return true;

        // Final check based on prerequisites
        let targetLevelToCheck = '';
        if (item.level === 'Intermédiaire') targetLevelToCheck = 'Débutant';
        if (item.level === 'Avancé') targetLevelToCheck = 'Intermédiaire';
        const subjectName = item.title.split(' - ')[0];
        const reqCourse = courses.find(c => c.level === targetLevelToCheck && c.title.split(' - ')[0] === subjectName);
        if (reqCourse) {
            const reqId = reqCourse._id || reqCourse.id;
            const reqProgress = progressions?.[reqId]?.progress || 0;
            return reqProgress >= 100;
        }
        return false;
    };

    const handleOnboardingFinish = async () => {
        setShowTour(false);
        if (!user?.seenGuides?.includes('main_onboarding')) {
            const updatedSeenGuides = [...(user.seenGuides || []), 'main_onboarding'];
            try {
                const response = await fetch(`${API_URL}/auth/profile`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({ seenGuides: updatedSeenGuides })
                });
                if (response.ok) {
                    onUpdateUser({ seenGuides: updatedSeenGuides });
                    window.dispatchEvent(new CustomEvent('mysterious-ai-murmur', {
                        detail: { text: "Félicitations pour avoir complété ton initiation. L'aventure commence vraiment maintenant." }
                    }));
                }
            } catch (err) {
                console.error("Erreur persistence onboarding:", err);
            }
        }
    };

    // Définir les palettes de couleurs par macro-catégorie
    const categoryColors = {
        'Programmation': 'from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300',
        'Web': 'from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300',
        'Data': 'from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300',
        'DevOps': 'from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-300',
        'Théorie': 'from-rose-600 to-pink-500 dark:from-rose-400 dark:to-pink-300',
        'default': 'from-slate-600 to-slate-500 dark:from-slate-400 dark:to-slate-300',
        'Mes Cours Favoris': 'from-yellow-500 to-amber-500 dark:from-yellow-400 dark:to-amber-300',
        "Reprendre l'apprentissage": 'from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300'
    };

    // Regrouper les cours par Macro-Catégorie puis par Sujet
    const categoriesMap = {};

    courses.forEach(course => {
        if (!course || !course.category) return;
        const categoryName = course.category;
        const subjectName = course.title.split(' - ')[0] || course.title;

        if (!categoriesMap[categoryName]) {
            categoriesMap[categoryName] = {
                id: categoryName.toLowerCase().replace(/\s+/g, '-'),
                category: categoryName,
                colorClass: categoryColors[categoryName] || categoryColors['default'],
                subjects: {}
            };
        }

        if (!categoriesMap[categoryName].subjects[subjectName]) {
            categoriesMap[categoryName].subjects[subjectName] = {
                id: subjectName.toLowerCase().replace(/\s+/g, '-'),
                title: subjectName,
                items: []
            };
        }

        categoriesMap[categoryName].subjects[subjectName].items.push(course);
    });

    // Trier les items à l'intérieur de chaque sujet par niveau (Débutant -> Intermédiaire -> Avancé)
    const levelOrder = { 'Débutant': 1, 'Intermédiaire': 2, 'Avancé': 3 };
    Object.values(categoriesMap).forEach(category => {
        Object.values(category.subjects).forEach(subject => {
            subject.items.sort((a, b) => (levelOrder[a.level] || 99) - (levelOrder[b.level] || 99));
        });
    });

    const groupedCategories = Object.values(categoriesMap);

    // Apply explicit priority ordering to the categories
    const categoryPriority = {
        'Théorie': 1,
        'Programmation': 2,
        'Web': 3,
        'Data': 4,
        'DevOps & SI': 5
    };

    groupedCategories.sort((a, b) => {
        const orderA = categoryPriority[a.category] || 99;
        const orderB = categoryPriority[b.category] || 99;
        return orderA - orderB;
    });

    const filteredCategories = groupedCategories.map(cat => ({
        ...cat,
        subjects: Object.values(cat.subjects).map(sub => ({
            ...sub,
            items: sub.items.filter(course =>
                (course.title && course.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
            )
        })).filter(sub => sub.items.length > 0)
    })).filter(cat => cat.subjects.length > 0);

    const userCategories = [];

    // 1. Reprendre l'apprentissage
    if (progressions) {
        const inProgressCoursesIds = Object.entries(progressions)
            .filter(([id, data]) => data.progress > 0 && data.progress < 100)
            .sort((a, b) => new Date(b[1].lastAccessed || 0) - new Date(a[1].lastAccessed || 0))
            .slice(0, 3)
            .map(([id]) => id);

        const inProgressCourses = inProgressCoursesIds
            .map(id => courses.find(c => (c._id === id || c.id === id)))
            .filter(Boolean); // Defensive: filter out undefined results

        if (inProgressCourses.length > 0) {
            userCategories.push({
                id: 'resume',
                category: "Reprendre l'apprentissage",
                colorClass: categoryColors["Reprendre l'apprentissage"],
                items: inProgressCourses
            });
        }
    }

    // 2. Favoris
    if (favorites && favorites.length > 0) {
        const favoriteCourses = favorites.map(id => {
            return courses.find(c => (c._id === id || c.id === id));
        }).filter(Boolean);

        if (favoriteCourses.length > 0) {
            userCategories.push({
                id: 'favorites',
                category: 'Mes Cours Favoris',
                colorClass: categoryColors['Mes Cours Favoris'],
                items: favoriteCourses
            });
        }
    }

    const finalCategories = [...userCategories, ...filteredCategories];

    // Identify the first beginner course for the onboarding tour
    let firstBeginnerCourseId = null;
    for (const cat of finalCategories) {
        if (cat.id === 'resume' || cat.id === 'favorites') continue;
        for (const sub of cat.subjects || []) {
            for (const course of sub.items) {
                if (course.level === 'Débutant') {
                    firstBeginnerCourseId = course.id || course._id;
                    break;
                }
            }
            if (firstBeginnerCourseId) break;
        }
        if (firstBeginnerCourseId) break;
    }

    return (
        <div className="min-h-screen transition-colors duration-500 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 dark:from-gray-900 dark:via-[#0a0f1e] dark:to-black pb-20">
            <PlacementTestModal
                isOpen={isTestModalOpen}
                onClose={() => setIsTestModalOpen(false)}
                course={selectedLockedCourse}
                onUnlock={handleUnlockTargetCourse}
            />

            {/* Onboarding Tour Modal */}
            <AnimatePresence>
                {showTour && (
                    <OnboardingTour
                        user={user}
                        onFinish={handleOnboardingFinish}
                        onSkip={() => setShowTour(false)}
                        targetCourseId={firstBeginnerCourseId}
                    />
                )}
            </AnimatePresence>

            {/* Floating Help Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setShowTour(true)}
                className="fixed bottom-8 left-8 z-[150] p-4 bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 rounded-full text-blue-400 hover:text-white hover:border-blue-500 shadow-2xl transition-all group"
                title="Besoin d'aide ?"
            >
                <HelpCircle size={24} className="group-hover:rotate-12 transition-transform" />
            </motion.button>

            {/* Modal Félicitations Déblocage */}
            {recentlyUnlocked && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setRecentlyUnlocked(null)}></div>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 text-center shadow-2xl z-[210]"
                    >
                        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                            <BookOpen size={48} className="text-white drop-shadow-md" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">Accès Autorisé</h2>
                        <p className="text-slate-600 dark:text-gray-400 mb-8 font-medium">
                            Tes compétences ont été validées. Tu as débloqué : <br />
                            <strong className="text-blue-500 dark:text-blue-400 mt-3 block text-xl bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">{recentlyUnlocked.title || recentlyUnlocked.name}</strong>
                        </p>
                        <button
                            onClick={() => {
                                setRecentlyUnlocked(null);
                                navigate(`/course/${recentlyUnlocked._id || recentlyUnlocked.id}`);
                            }}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-500/25 transform hover:-translate-y-1"
                        >
                            Démarrer maintenant
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Header */}
            <div className="pt-6 pb-20 px-6 lg:px-12 relative overflow-hidden">
                <motion.div
                    style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
                    className="absolute top-10 right-[10%] w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -z-10"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto flex flex-col items-center text-center"
                >
                    <div className="relative group cursor-default mb-6">
                        <div className="flex items-center gap-2 mb-4 justify-center opacity-40">
                            <div className="w-8 h-px bg-blue-500" />
                            <span className="text-[10px] font-black font-mono tracking-[0.3em] text-blue-400 uppercase">Système d'Apprentissage</span>
                            <div className="w-8 h-px bg-blue-500" />
                        </div>
                        <motion.h1
                            className="text-center font-black tracking-tighter leading-none flex flex-col items-center"
                        >
                            <span className="block text-5xl md:text-8xl text-slate-900 dark:text-white mb-2 opacity-100">
                                BIENVENUE,
                            </span>
                            <span className="inline-block text-4xl md:text-7xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm pb-4 tracking-tighter">
                                {user?.firstName?.toUpperCase() || 'AGENT'}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto mt-6 leading-relaxed italic"
                        >
                            "La maîtrise n'est pas une destination, mais une quête perpétuelle." <br />
                            Prêt à continuer ton ascension vers l'élite ?
                        </motion.p>
                    </div>

                    <div className="flex items-center gap-4 mt-8 opacity-20">
                        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-blue-500" />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-blue-500" />
                    </div>
                </motion.div>
            </div>

            {/* Categories */}
            <div className="space-y-12">
                {finalCategories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-full"
                    >
                        <div className="flex flex-col items-center justify-center gap-3 mb-8 text-center px-6 lg:px-12">
                            <h2 className={`text-xl md:text-2xl brand-font-secondary text-transparent bg-clip-text bg-gradient-to-r ${category.colorClass || 'from-slate-800 to-slate-500 dark:from-white dark:to-white/40'} uppercase tracking-[0.2em] font-black`}>
                                {category.category}
                            </h2>
                            <div className={`h-px w-32 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 text-transparent bg-clip-text ${category.colorClass || 'from-blue-500'}`} />
                        </div>

                        <div className="space-y-8">
                            {(category.subjects || [category]).map((subject, subIndex) => (
                                <div key={subject.id || `sub-${subIndex}`} className="w-full">
                                    {category.subjects && (
                                        <div className="px-6 lg:px-12 mb-3">
                                            <h3 className={`text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400`}>
                                                &gt; {subject.title}
                                            </h3>
                                        </div>
                                    )}
                                    <div className="overflow-x-auto pb-4 custom-horizontal-scrollbar scroll-smooth">
                                        <div className={`flex gap-6 w-full ${subject.items.length === 1 ? 'justify-center mx-auto max-w-5xl' : 'w-max'} px-6 lg:px-12`}>
                                            {subject.items.map((course) => {
                                                const unlocked = isCourseUnlocked(course);
                                                return (
                                                    <motion.div
                                                        key={course.id || course._id}
                                                        id={(course.id || course._id) === firstBeginnerCourseId ? 'tour-first-course' : undefined}
                                                        whileHover={unlocked ? { scale: 1.01, y: -5 } : { scale: 1 }}
                                                        onClick={() => {
                                                            if (unlocked) {
                                                                navigate(`/course/${course._id || course.id}`);
                                                            }
                                                        }}
                                                        className={`${subject.items.length === 1 ? 'w-full max-w-5xl' : 'w-[300px] md:w-[400px]'} flex-shrink-0 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl transition-all group relative ${unlocked ? 'hover:shadow-blue-500/10 cursor-pointer' : 'cursor-default grayscale'}`}
                                                    >
                                                        {!unlocked && (
                                                            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                                                                {course.isPremium ? (
                                                                    <>
                                                                        <Lock size={40} className="text-yellow-400 mb-3 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                                                                        <span className="text-sm font-bold text-yellow-300 drop-shadow-md px-4 text-center mb-4 uppercase tracking-wider">Premium</span>
                                                                        <button
                                                                            onClick={(e) => handlePremiumCheckout(e, course.id || course._id)}
                                                                            className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-yellow-500/30 transform hover:-translate-y-0.5"
                                                                        >
                                                                            Débloquer (1€)
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Lock size={40} className="text-gray-400 mb-3 drop-shadow-lg" />
                                                                        <span className="text-sm font-bold text-gray-300 drop-shadow-md px-4 text-center mb-4">Niveau {course.level} Verrouillé</span>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setSelectedLockedCourse(course);
                                                                                setIsTestModalOpen(true);
                                                                            }}
                                                                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5"
                                                                        >
                                                                            Passer le test
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}

                                                        <div className={`${subject.items.length === 1 ? 'h-80' : 'h-48'} relative overflow-hidden`}>
                                                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-900 z-10" />
                                                            <img
                                                                src={course.image || `https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80`}
                                                                alt={course.title || course.name}
                                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    // Fallback esthétique plutôt que des lettres (demande utilisateur)
                                                                    e.target.src = `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80`;
                                                                }}
                                                            />
                                                            <div className="absolute top-3 right-3 z-20">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleFavorite(course.id || course._id);
                                                                    }}
                                                                    className="p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-colors"
                                                                >
                                                                    <Star
                                                                        size={16}
                                                                        className={favorites.includes(course.id || course._id) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className={`p-6 md:p-8 ${subject.items.length === 1 ? 'md:flex md:flex-col md:justify-center' : ''}`}>
                                                            <h3 className={`${subject.items.length === 1 ? 'text-3xl' : 'text-xl'} font-black text-slate-900 dark:text-white mb-3 line-clamp-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors tracking-tight`}>
                                                                {course.title || course.name}
                                                            </h3>
                                                            <p className={`${subject.items.length === 1 ? 'text-base' : 'text-xs'} text-slate-600 dark:text-gray-400 font-medium mb-6 line-clamp-2 min-h-[40px] leading-relaxed`}>
                                                                {course.description || course.desc}
                                                            </p>

                                                            {progressions[course._id || course.id] ? (
                                                                <div className="space-y-2 pt-2">
                                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-blue-400">
                                                                        <span>Progression</span>
                                                                        <span>{progressions[course._id || course.id].progress}%</span>
                                                                    </div>
                                                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                                                        <div
                                                                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                                                            style={{ width: `${progressions[course._id || course.id].progress}%` }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <button className="w-full py-3 rounded-xl bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-white/5 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 flex items-center justify-center gap-2">
                                                                    Commencer <ChevronRight size={14} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
                .custom-horizontal-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-horizontal-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 10px;
                }
                .custom-horizontal-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to right, #3b82f6, #9333ea);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </div>
    );
};

export default DashboardPage;