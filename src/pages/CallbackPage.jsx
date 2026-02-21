import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from '../config';

const CallbackPage = ({ setUser, setToast, fetchProgressions }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log('🔥 CallbackPage: Initialisation...');
        console.log('🔥 CallbackPage: URL actuelle:', window.location.href);
        console.log('🔥 CallbackPage: User actuel: NON CONNECTÉ (callback)');

        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');

        console.log('🔥 CallbackPage: Token:', token ? 'REÇU' : 'MANQUANT');
        console.log('🔥 CallbackPage: Error:', error || 'AUCUN');

        if (error) {
            console.log('❌ CallbackPage: Erreur détectée, redirection vers /auth');
            setToast({ message: 'Erreur de connexion Google', type: 'error' });
            navigate('/auth');
            return;
        }

        if (token) {
            console.log('✅ CallbackPage: Token valide, récupération profil...');
            fetch(`${API_URL}/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {
                    if (!res.ok) throw new Error('Erreur de récupération du profil');
                    return res.json();
                })
                .then(data => {
                    console.log('✅ CallbackPage: Profil récupéré, stockage...');
                    // Stocker les infos utilisateur dans localStorage pour le tracking
                    localStorage.setItem('user', JSON.stringify(data));
                    localStorage.setItem('token', data.token);

                    console.log('✅ CallbackPage: Redirection...');
                    setUser({ ...data, token });

                    if (data.role === 'admin') {
                        navigate('/admin');
                    } else if (data.hasCompletedOnboarding) {
                        navigate('/dashboard');
                    } else {
                        navigate('/onboarding');
                    }

                    if (fetchProgressions) fetchProgressions();
                })
                .catch(err => {
                    console.error('❌ CallbackPage: Erreur récupération profil:', err);
                    setToast({ message: 'Erreur de récupération du profil', type: 'error' });
                    navigate('/auth');
                });
        } else {
            navigate('/auth');
        }
    }, [location, navigate, setUser, setToast, fetchProgressions]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                    </div>
                </div>
                <h2 className="text-2xl brand-font text-white mb-2">Connexion en cours...</h2>
                <p className="text-slate-400">Nous préparons votre espace personnel</p>
            </div>
        </div>
    );
};

export default CallbackPage;