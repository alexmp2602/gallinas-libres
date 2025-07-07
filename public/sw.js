const CACHE_NAME = "gallinas-libres-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon_192.png",
  "/icons/icon_512.png",
];

// Instalar y cachear archivos necesarios
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Instalando y cacheando...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Fuerza activación inmediata
});

// Activar y eliminar caches antiguos
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activado");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Borrando cache antiguo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Controla todas las páginas inmediatamente
});

// Interceptar fetch y servir desde cache si existe
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return; // Solo GET
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Opcional: fallback offline
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        })
      );
    })
  );
});
