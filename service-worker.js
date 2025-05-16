
const CACHE_NAME = 'meowlands-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/faq.html',
  '/contact.html',
  '/gallery.html',
  '/terms.html',
  '/meowland1.png',
  '/meowland2_fixed.png',
  '/meowland3.png',
  '/meowland4.png',
  '/meowland5.png',
  '/meowland_logo_ok.png',
  '/manifest.json'
];

// Instalación del service worker y caché de archivos esenciales
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación y limpieza de versiones antiguas
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(name) {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Intercepción de solicitudes para servir desde caché cuando sea posible
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
