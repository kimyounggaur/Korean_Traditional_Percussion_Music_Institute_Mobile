"use strict";

const CACHE_NAME = "korean-percussion-app-v3";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./support.js",
  "./css/style.css",
  "./js/data.js",
  "./js/views.js",
  "./js/router.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./logo/logo-horizontal.png",
  "./logo/logo-square.png",
  "./icons/icon-nanta.png",
  "./icons/icon-spoon.png",
  "./icons/icon-cupta.png",
  "./icons/icon-janggu.png",
  "./players/player-nanta.png",
  "./players/player-spoon.png",
  "./players/player-cupta.png",
  "./players/player-janggu.png",
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

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
