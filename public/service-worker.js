const CACHE_NAME = 'mysterious-classroom-v1';

// Fichiers statiques minimaux à mettre en cache pour le mode hors-ligne
const urlsToCache = [
    '/',
    '/index.html',
    '/favicon.svg',
    '/manifest.json'
];

// Installation du Service Worker et mise en cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Interception des requêtes : Network First, Fallback to Cache
self.addEventListener('fetch', event => {
    // Ignorer les requêtes non GET (API POST/PUT/DELETE)
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Mettre à jour le cache avec la nouvelle réponse
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                // En cas d'échec du réseau (hors-ligne), retourner le cache
                return caches.match(event.request);
            })
    );
});

// Nettoyage des anciens caches lors de l'activation
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
