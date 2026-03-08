const CACHE_NAME = 'chennai-one-v2';
const FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/assets/fonts/PixelCaps.ttf',
  '/assets/images/logo.png',
  '/assets/images/call.png',
  '/assets/images/bus.png',
  '/assets/images/pass.jpeg',
  '/assets/images/qr_code.png',
  '/assets/images/qr_code2.png',
  '/assets/images/activated_pass.png',
  '/assets/images/home.png',
  '/assets/images/pass_bar.png',
  '/assets/images/flag.png',
  '/assets/images/ticket.png',
  '/assets/images/user.png',
  '/assets/images/pages/home_page.png',
  '/assets/images/pages/live_page.png',
  '/assets/images/pages/ticket_page.png',
  '/assets/images/pages/profile_page.png',
  '/assets/videos/intro.mp4'
];

// Install — cache all files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

// Activate — delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
      .catch(() => caches.match('/index.html'))
  );
});