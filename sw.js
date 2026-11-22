// PWA offline cache — schimbă versiunea când actualizezi fișierele aplicației.
const CACHE_VERSION = 'ture-app-pwa-v49';
const REQUIRED_OFFLINE_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './sounds/wood1.mp3',
  './sounds/wood2.mp3',
  './sounds/wood3.mp3',
  './sounds/wood4.mp3',
  './sounds/wood5.mp3',
  './sounds/wood6.mp3',
  './sounds/wood7.mp3',
  './sounds/felt1.mp3',
  './sounds/felt2.mp3',
  './sounds/felt3.mp3',
  './sounds/felt4.mp3',
  './sounds/felt5.mp3',
  './sounds/felt6.mp3',
  './sounds/felt7.mp3',
  './sounds/hit1.mp3',
  './sounds/hit2.mp3',
  './sounds/hit3.mp3',
  './sounds/hit4.mp3',
  './sounds/hit5.mp3',
  './sounds/hit6.mp3',
  './sounds/hit7.mp3',
  './sounds/hit8.mp3',
  './sounds/hit9.mp3',
  './sounds/hit10.mp3',
  './sounds/hit11.mp3',
  './sounds/hit12.mp3',
  './sounds/hit13.mp3',
  './sounds/hit14.mp3',
  './sounds/hit15.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(REQUIRED_OFFLINE_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(name => name.startsWith('ture-app-pwa-') && name !== CACHE_VERSION)
        .map(name => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.put('./index.html', copy)));
        }
        return response;
      }).catch(async () => {
        return await caches.match(request) || await caches.match('./index.html') || Response.error();
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.put(request, copy)));
      }
      return response;
    }))
  );
});
