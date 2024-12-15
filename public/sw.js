const CACHE_NAME = "gallinas-libres-v1";
const urlsToCache = [
  "/",
  "/img/hero.webp",
  "/img/producto1.webp",
  "/img/producto2.webp",
  "/styles/main.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
