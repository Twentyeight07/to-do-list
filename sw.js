//Asignar un nombre y versión al caché

const CACHE_NAME = "v1_cache_todo_list",
  urlsToCache = [
    "https://twentyeight07.github.io/to-do-list/index.html",
    "https://twentyeight07.github.io/to-do-list/style.css",
    "https://twentyeight07.github.io/to-do-list/js/script.js",
    "https://twentyeight07.github.io/to-do-list/assets/favicon.png",
  ];

const preCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(urlsToCache);
};

//Durante la fase de instalación, se almacena en caché los archivos estáticos
self.addEventListener("install", (e) => {
  console.log("SW installed");
  self.skipWaiting();
  e.waitUntil(preCache());
});

const cleanUpCaches = async () => {
  const keys = await caches.keys();
  const keysToDelete = keys.map((key) => {
    if (key !== CACHE_NAME) {
      return caches.delete(key);
    }
  });

  return Promise.all(keysToDelete);
};

//Una vez que se instala el SW, se activa y busca los recursos para hacer que funcionen sin conexión
self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];
  console.log("SW activate");

  e.waitUntil(
    caches
      .keys()
      .then((cachesNames) => {
        cachesNames.map((cacheName) => {
          //Eliminamos lo que ya no se necesita en cache
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        });
      })
      //Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  );
});

const fetchAssets = async (e) => {
  try {
    const res = await fetch(e.request);
    return res;
  } catch (err) {
    const cache = await caches.open(CACHE_NAME);
    return cache.match(e.request);
  }
};

//Cuando el navegador recupera una url
self.addEventListener("fetch", (e) => {
  console.log("SW fetched");
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(fetchAssets(e));
});
