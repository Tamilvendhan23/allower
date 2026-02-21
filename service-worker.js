const CACHE_NAME = 'chennai-one-v1';
const FILES = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/assets/images/logo.png',
  '/assets/images/call.png',
  '/assets/images/bus.png',
  '/assets/images/pass.png',
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

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});