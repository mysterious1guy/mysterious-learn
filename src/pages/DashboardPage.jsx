import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { coursesData } from '../courses/data.jsx';

const DashboardPage = ({ user, favorites, toggleFavorite, progressions }) => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto p-6 pt-20">
            <h1 className="text-3xl font-bold mb-8">Bienvenue, {user?.firstName} !</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesData.flatMap(cat => cat.items).map((course) => (
                    <motion.div
                        key={course.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => navigate(`/course/${course.id}`)}
                        className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer"
                    >
                        <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{course.desc}</p>

                        <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                style={{ width: `${progressions[course.id]?.progress || 0}%` }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;