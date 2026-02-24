import React, { useState } from 'react';
import YouTube from 'react-youtube';
import VideoFallback from './VideoFallback';

const VideoPlayer = ({ videoId, title, courseId, chapterId, API_URL }) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const reportError = async (errorType) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/admin/report-video-error`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    courseId,
                    chapterId,
                    videoId,
                    errorType,
                    url: window.location.href
                })
            });
        } catch (err) {
            console.error('Failed to report video error:', err);
        }
    };

    const onError = (event) => {
        console.error('YouTube Player Error:', event.data);
        setHasError(true);
        reportError(event.data);
    };

    const onReady = () => {
        setIsLoaded(true);
    };

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0,
        },
    };

    if (hasError) {
        return (
            <VideoFallback
                lessonTitle={title}
                onReadContent={() => {
                    // Scroll to content or just dismiss
                    const contentElement = document.getElementById('lesson-content');
                    if (contentElement) contentElement.scrollIntoView({ behavior: 'smooth' });
                }}
                onSkip={() => {
                    // This logic would ideally be handled by the parent
                    const nextBtn = document.querySelector('[data-type="next-lesson"]');
                    if (nextBtn) nextBtn.click();
                }}
            />
        );
    }

    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5">
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 animate-pulse">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Initialisation du flux...</span>
                    </div>
                </div>
            )}
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={onReady}
                onError={onError}
                className="absolute inset-0 w-full h-full"
                containerClassName="w-full h-full"
            />
        </div>
    );
};

export default VideoPlayer;
