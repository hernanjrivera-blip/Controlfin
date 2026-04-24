// ControlFin SW v5
const CACHE = 'controlfin-v5';
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['./', './index.html', './manifest.json']))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname.includes('firebaseio') || url.hostname.includes('dolarapi') ||
      url.hostname.includes('unpkg') || url.hostname.includes('fonts.g')) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(r => {
        caches.open(CACHE).then(c => c.put('./index.html', r.clone()));
        return r;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(c => c || fetch(e.request)).catch(() => caches.match('./index.html'))
  );
});
