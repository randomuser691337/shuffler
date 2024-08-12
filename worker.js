const CACHE_NAME = 'shuffler-v4';
const OFFLINE_URL = 'index.html';

const FILES_TO_CACHE = [
    OFFLINE_URL,
    'assets/style.css',
    'assets/lib/tagger.js',
    'assets/code/core.js',
    'assets/apps/weather.js',
    'assets/apps/loosecode.js',
    'assets/code/color.js',
    'assets/code/files.js',
    'assets/code/idb.js',
    'assets/code/locker.js',
    'assets/code/opfile.js',
    'assets/code/send.js',
    'assets/code/sw.js',
    'assets/code/ui.js',
    'assets/fonts/Poppins-Bold.ttf',
    'assets/fonts/Poppins-Medium.ttf',
    'assets/fonts/Poppins-Regular.ttf',
    'assets/img/circle-pause.svg',
    'assets/img/circle-play.svg',
    'assets/img/favicon.png',
    'assets/img/kibby.jpg',
    'assets/img/launch.svg',
    'assets/img/lock.svg',
    'assets/img/noround.png',
    'assets/img/silly.jpg',
    'assets/img/skip-back.svg',
    'assets/img/skip-forward.svg',
    'assets/lib/jq.js',
    'assets/lib/peer.js',
    'assets/other/c.mp3',
    'assets/other/h.mp3',
    'assets/other/idbo.js',
    'assets/other/lock.mp3',
    'assets/other/unlock.mp3'
];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(function() {
                return caches.match(OFFLINE_URL);
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});
