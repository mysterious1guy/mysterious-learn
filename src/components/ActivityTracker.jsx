import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ActivityTracker = ({ user, API_URL }) => {
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [currentPage, setCurrentPage] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (!user || !user._id) return;

    // Démarrer le tracking quand l'utilisateur se connecte
    startTracking();
  }, [user]);

  const startTracking = async () => {
    try {
      const response = await fetch(`${API_URL}/api/activity/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSessionId(data.sessionId);
        setStartTime(Date.now());
        setIsTracking(true);
        
        // Stocker l'ID de session pour le tracking
        localStorage.setItem('activitySessionId', data.sessionId);
      }
    } catch (error) {
      console.error('Erreur démarrage tracking:', error);
    }
  };

  const trackPageView = (page) => {
    if (!sessionId || !isTracking) return;

    setCurrentPage(page);
    
    // Envoyer l'activité de page au backend
    fetch(`${API_URL}/api/activity/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user._id,
        sessionId,
        page,
        action: 'page_view',
        metadata: {
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        }
      })
    }).catch(error => console.error('Erreur tracking page:', error));
  };

  const trackInteraction = (action, target, metadata = {}) => {
    if (!sessionId || !isTracking) return;

    fetch(`${API_URL}/api/activity/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user._id,
        sessionId,
        page: currentPage,
        action,
        target,
        metadata: {
          ...metadata,
          timestamp: Date.now()
        }
      })
    }).catch(error => console.error('Erreur tracking interaction:', error));
  };

  const trackCourseProgress = (courseId, exerciseId, timeSpent, score, completed) => {
    if (!sessionId || !isTracking) return;

    fetch(`${API_URL}/api/activity/course-progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user._id,
        sessionId,
        courseId,
        exerciseId,
        timeSpent,
        score,
        completed
      })
    }).catch(error => console.error('Erreur tracking progress:', error));
  };

  const endTracking = async () => {
    if (!sessionId || !isTracking) return;

    try {
      const endTime = Date.now();
      const duration = Math.round((endTime - startTime) / (1000 * 60)); // en minutes

      await fetch(`${API_URL}/api/activity/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          sessionId,
          duration
        })
      });

      setIsTracking(false);
      setSessionId(null);
      localStorage.removeItem('activitySessionId');
    } catch (error) {
      console.error('Erreur fin tracking:', error);
    }
  };

  // Tracker les changements de page
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      trackPageView(path);
    };

    // Écouter les changements de route
    window.addEventListener('popstate', handleRouteChange);
    
    // Tracker la page initiale
    handleRouteChange();

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [sessionId, isTracking]);

  // Tracker les clics
  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;
      const tagName = target.tagName.toLowerCase();
      const className = target.className;
      const text = target.textContent?.substring(0, 50);

      trackInteraction('click', `${tagName}.${className}`, {
        text,
        href: target.href,
        id: target.id
      });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [sessionId, isTracking]);

  // Tracker le scroll
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        trackInteraction('scroll', 'page', {
          scrollY: window.scrollY,
          scrollX: window.scrollX
        });
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sessionId, isTracking]);

  // Nettoyer le tracking à la déconnexion
  useEffect(() => {
    const handleBeforeUnload = () => {
      endTracking();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sessionId, isTracking]);

  return null; // Ce composant n'affiche rien, il fait juste le tracking en arrière-plan
};

export default ActivityTracker;
