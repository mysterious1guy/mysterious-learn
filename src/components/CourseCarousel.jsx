import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCarousel = ({ courses }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % courses.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30, restDelta: 0.5 },
                opacity: { duration: 0.3 }
            }
        })
    };

    const currentCourse = courses[currentIndex];

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[500px] mt-12 mb-20 px-4 group overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                >
                    <div className="w-full h-full bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
                        {/* Gradient Glow */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] -z-10" />

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden">
                            <img
                                src={currentCourse.image}
                                alt={currentCourse.name}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/90 hidden md:block" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent md:hidden" />
                        </div>

                        {/* Info Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex gap-2 mb-4">
                                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {currentCourse.categoryLabel}
                                </span>
                                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                    100% Gratuit
                                </span>
                            </div>

                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-5xl font-black text-white mb-4 lg:leading-tight"
                            >
                                {currentCourse.name}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-slate-400 text-base md:text-lg mb-8 line-clamp-3 leading-relaxed"
                            >
                                {currentCourse.description}
                            </motion.p>

                            <div className="grid grid-cols-3 gap-4 mb-10">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                                        <Clock size={16} />
                                        <span className="text-xs font-bold uppercase">Durée</span>
                                    </div>
                                    <span className="text-white font-semibold">{currentCourse.duration}</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                                        <Users size={16} />
                                        <span className="text-xs font-bold uppercase">Étudiants</span>
                                    </div>
                                    <span className="text-white font-semibold">{currentCourse.students.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 text-yellow-400 mb-1">
                                        <Star size={16} />
                                        <span className="text-xs font-bold uppercase">Avis</span>
                                    </div>
                                    <span className="text-white font-semibold">{currentCourse.rating}/5</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, x: 10 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/auth')}
                                className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-white/5 transition-all w-fit"
                            >
                                Explorer le cours
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden lg:block">
                <button
                    onClick={prevSlide}
                    className="p-4 bg-slate-900/50 border border-slate-700 text-white rounded-full hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden lg:block">
                <button
                    onClick={nextSlide}
                    className="p-4 bg-slate-900/50 border border-slate-700 text-white rounded-full hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {courses.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-blue-500 w-8' : 'bg-slate-700 hover:bg-slate-500'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseCarousel;
