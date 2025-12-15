const CACHE_NAME = 'finanzas-pro-v1';
const urlsToCache = [
  './',
  './Finanzas_Ultimate.html',
  './manifest.json'
  // Si tienes iconos, agrégalos aquí:
  // './icon-192.png',
  // './icon-512.png'
];

// Instalación: Guardamos los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché guardados');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación: Limpiamos cachés viejos si actualizamos la versión
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptamos peticiones: Servimos desde caché si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, lo devolvemos
        if (response) {
          return response;
        }
        // Si no, lo pedimos a internet
        return fetch(event.request);
      })
  );
});