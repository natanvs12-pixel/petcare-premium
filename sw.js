/* PetCare+ Premium - Service Worker v2
   - Cache network-first com fallback offline
   - Cacheia também os SDKs do Firebase (gstatic.com) para abrir offline
   - Não interfere com chamadas a firestore.googleapis.com (Firestore tem seu próprio offline) */

const CACHE = 'petcare-premium-v2';
const FIREBASE_BASE = 'https://www.gstatic.com/firebasejs/10.13.0/';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-192-maskable.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './favicon-16.png',
  './favicon.ico',
  FIREBASE_BASE + 'firebase-app-compat.js',
  FIREBASE_BASE + 'firebase-auth-compat.js',
  FIREBASE_BASE + 'firebase-firestore-compat.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(ASSETS.map(a => c.add(a)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const sameOrigin = url.origin === location.origin;
  const isFirebaseSdk = url.hostname === 'www.gstatic.com' && url.pathname.includes('/firebasejs/');
  // Não intercepta Firestore/Auth APIs (têm seu próprio offline) nem outras origens
  if (!sameOrigin && !isFirebaseSdk) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(r => r || (sameOrigin ? caches.match('./index.html') : undefined))
      )
  );
});
