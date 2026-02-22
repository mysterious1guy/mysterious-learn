import React, { createContext, useContext, useState, useEffect } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const [soundEnabled, setSoundEnabled] = useState(() => {
        const saved = localStorage.getItem('soundEnabled');
        return saved === null ? true : saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('soundEnabled', soundEnabled);
    }, [soundEnabled]);

    return (
        <SoundContext.Provider value={{ soundEnabled, setSoundEnabled }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};
