let CACHE_NAME = "static-cache";
let urlsToCache = [
  "../index.html",

  "../styles/style.css",

  "../scripts/MTLLoader.js",
  "../scripts/OBJLoader.js",
  "../scripts/artList.js",

  "../assets/3d-model.mtl",
  "../assets/3d-model.obj",
  "../assets/camera_para.dat",

  "../assets/Studentbb copy.jpg",
  "../assets/Maddie1 copy.jpg",
  "../assets/All_Our_Own_Crafts copy.jpg",
  "../assets/iPad_1 2 copy.jpg",
  "../assets/Scream_iPad copy.jpg",
  "../assets/When_Robots_Attack_-_Proteus copy.jpg",
  "../assets/Emily_Mcbrayne 3 copy.jpg",
  "../assets/Student1a copy.jpg",
  "../assets/Annabel1 copy.jpg",
  "../assets/ThatGallery copy.jpg",
  "../assets/Students copy.jpg",
  "../assets/Student2a copy.jpg",
  "../assets/Studentdd_ copy.jpg",
  "../assets/BasingstokeArtClass copy.jpg",
  "../assets/Lissie_ 2 copy.jpg",
  "../assets/Studentcc_ copy.jpg",
  "../assets/Willis_Museum.jpg",
  "../assets/Helena_iPad copy.jpg",
  "../assets/Lillian-_Let's_Make_A_Deal 2 copy.jpg",
  "../assets/Viable copy.jpg"
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
