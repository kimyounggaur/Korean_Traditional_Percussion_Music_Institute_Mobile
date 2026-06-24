"use strict";

const CACHE_NAME = "korean-percussion-app-v2";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/data.js",
  "./js/views.js",
  "./js/router.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./assets/logo/logo-horizontal.png",
  "./assets/logo/logo-square.png",
  "./assets/icons/icon-nanta.png",
  "./assets/icons/icon-spoon.png",
  "./assets/icons/icon-cupta.png",
  "./assets/icons/icon-janggu.png",
  "./assets/players/player-nanta.png",
  "./assets/players/player-spoon.png",
  "./assets/players/player-cupta.png",
  "./assets/players/player-janggu.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => (
      cached || fetch(event.request).catch(() => caches.match("./index.html"))
    ))
  );
});
