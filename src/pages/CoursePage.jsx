import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { coursesData } from '../courses/data.jsx';

const CoursePage = ({ user, progressions, setProgressions, API_URL, setToast }) => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const course = coursesData.flatMap(cat => cat.items).find(c => c.id === courseId);

    if (!course) {
        return <div className="p-20 text-center">Cours non trouvé</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 pt-20">
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
                Retour au tableau de bord
            </button>

            <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
            <p className="text-gray-400 mb-8">{course.desc}</p>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-4">Leçons</h2>
                <p className="text-gray-400">Contenu du cours à implémenter...</p>
            </div>
        </div>
    );
};

export default CoursePage;