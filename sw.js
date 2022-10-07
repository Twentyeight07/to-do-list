//Asignar un nombre y versión al caché

const CACHE_NAME = "v1_cache_todo_list",
  urlsToCache = [
    "https://twentyeight07.github.io/to-do-list/",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,400;1,300&display=swap",
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0",
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0",
    "https://twentyeight07.github.io/to-do-list/style.css",
    "https://twentyeight07.github.io/to-do-list/js/script.js",
    "https://twentyeight07.github.io/to-do-list/assets/favicon.png",
  ];

//Durante la fase de instalación, se almacena en caché los archivos estáticos
self.addEventListener("install", (e) => {
  e.waitUntil(
    cahes
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .cath((err) => console.log(err))
  );
});

//Una vez que se instala el SW, se activa y busca los recursos para hacer que funcionen sin conexión
self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];

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

//Cuando el navegador recupera una url
self.addEventListener("fetch", (e) => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        //recuperamos del cache
        return res;
      }

      //recuperar la petición de url
      return fetch(e.request);
    })
  );
});
