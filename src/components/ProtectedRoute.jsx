import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children, redirectTo = '/auth' }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'authentification au chargement du composant
    const checkAuth = () => {
      try {
        // Vérifier localStorage
        const storedUser = localStorage.getItem('user');
        
        // Vérifier les cookies
        const userCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('user='))
          ?.split('=')[1];

        // Vérifier le token
        const token = localStorage.getItem('token') || userCookie;

        if (!token || !storedUser) {
          console.log('❌ ProtectedRoute: Token ou utilisateur manquant');
          setLoading(false);
          return false;
        }

        // Parser l'utilisateur
        const parsedUser = JSON.parse(storedUser);
        
        // Vérifier si le token est valide (basique)
        try {
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          const now = Date.now() / 1000;
          
          console.log('🔍 ProtectedRoute: Token expiré?', tokenData.exp < now);
          console.log('⏰ Token exp:', new Date(tokenData.exp * 1000));
          console.log('🕐 Maintenant:', new Date(now * 1000));
          
          if (tokenData.exp < now) {
            // Token expiré
            console.log('❌ ProtectedRoute: Token expiré, nettoyage...');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            setLoading(false);
            return false;
          }

          setUser(parsedUser);
          setLoading(false);
          console.log('✅ ProtectedRoute: Auth validé pour:', parsedUser.email);
          return true;
        } catch (tokenError) {
          // Token invalide
          console.log('❌ ProtectedRoute: Token invalide:', tokenError.message);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          setLoading(false);
          return false;
        }
      } catch (error) {
        console.error('❌ ProtectedRoute: Erreur vérification auth:', error);
        setLoading(false);
        return false;
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('🔄 ProtectedRoute: Redirection vers', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
