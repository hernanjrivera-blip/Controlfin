// ControlFin SW v6 — fuerza limpieza total
const CACHE = 'controlfin-v6';
self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
// Sin cache — siempre red
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request));
  }
});
