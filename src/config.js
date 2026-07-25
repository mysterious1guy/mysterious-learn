/**
 * Centralized API configuration to ensure consistency across the app.
 * In production (Render), we use relative paths (/api).
 * In development, we use the local server URL.
 */
export const API_URL = import.meta.env.PROD
    ? '/api'
    : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');
