let CACHE_NAME = "static-cache";
let urlsToCache = [
  "../index.html",
  "../testing.html",

  "../styles/style.css",

  "../scripts/MTLLoader.js",
  "../scripts/OBJLoader.js",
  "../scripts/artList.js",

  "../assets/1.jpg",
  "../assets/2.jpg",
  "../assets/3d-model.mtl",
  "../assets/3d-model.obj",
  "../assets/camera_para.dat",
  "../assets/test_2_compress.mp4"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

addEventListener("fetch", function(event) {
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response; // if valid response is found in cache return it
      } else {
        return fetch(event.request) //fetch from internet
          .then(function(res) {
            return caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request.url, res.clone()); //save the response for future
              return res; // return the fetched data
            });
          })
          .catch(function(err) {
            // fallback mechanism
            return caches
              .open(CACHE_CONTAINING_ERROR_MESSAGES)
              .then(function(cache) {
                return cache.match("/offline.html");
              });
          });
      }
    })
  );
});
