const CACHE_NAME = 'shuffler';
const urlsToCache = [
  './index.html',
  './assets/apps/loosecode.js',
  './assets/apps/weather.js',
  './assets/code/core.js',
  './assets/code/files.js',
  './assets/code/idb.js',
  './assets/code/opfile.js',
  './assets/code/sw.js',
  './assets/code/ui.js',
  './assets/fonts/Poppins-Bold.ttf',
  './assets/fonts/Poppins-Medium.ttf',
  './assets/fonts/Poppins-Regular.ttf',
  './assets/img/favicon.png',
  './assets/img/lock.svg',
  './assets/img/noround.png',
  './assets/img/circle-pause.svg',
  './assets/img/circle-play.svg',
  './assets/img/skip-back.svg',
  './assets/img/skip-forward.svg',
  './assets/lib/jq.js',
  './assets/lib/tagger.js',
  './assets/other/c.mp3',
  './assets/other/h.mp3',
  './assets/other/lock.mp3',
  './assets/other/unlock.mp3',
  './assets/core.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Delete old caches that are not in use
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
