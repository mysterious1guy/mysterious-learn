import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CallbackPage = ({ setUser, setToast, fetchProgressions }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (error) {
            setToast({ message: 'Erreur de connexion Google', type: 'error' });
            navigate('/auth');
            return;
        }

        if (token) {
            // Itu dois avoir l'API_URL accessible, soit via props soit via import.meta.env
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            fetch(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    setToast({ message: 'Connexion réussie !', type: 'success' });
                    navigate('/dashboard');
                    if (fetchProgressions) fetchProgressions();
                })
                .catch(() => {
                    setToast({ message: 'Erreur de récupération du profil', type: 'error' });
                    navigate('/auth');
                });
        } else {
            // Si pas de token, rediriger vers auth
            navigate('/auth');
        }
    }, [location, navigate, setUser, setToast, fetchProgressions]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white">Connexion en cours...</p>
            </div>
        </div>
    );
};

export default CallbackPage;