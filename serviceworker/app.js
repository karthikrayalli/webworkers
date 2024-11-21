let SW = null;
let cacheName = 'assetCashe1';
function init() {
  // Register the service worker
  registerSW();
  startCaching();
  // getCacheSize();
  // Add event listener to h2 element for adding images
  document.querySelector('h2').addEventListener('click', addImage);
}

// Register the Service Worker
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(
      (registration) => {
        SW = registration.installing || registration.waiting || registration.active;
      },
      (error) => {
        console.log('Service worker registration failed:', error);
      }
    );
  } else {
    console.log('Service workers are not supported.');
  }
}

function startCaching() {
  caches.open(cacheName).then((cache) => {
    console.log(`Cache ${cacheName} opened`);
  });
}
// Function to dynamically add an image
function addImage(ev) {
  let img = document.createElement('img');
  img.src = './images/image1.jpg';
  img.alt = 'dynamically added image';

  let p = document.createElement('p');
  p.append(img);

  document.querySelector('main').append(p);
}

function getCacheSize() {
  if ('storage' in navigator) {
    if ('estimate' in navigator.storage) {
      navigator.storage.estimate().then(({ usage, quota }) => {
        let usedKb = parseInt(usage / 1024);
        let quotaKb = parseInt(quota / 1024);
        console.log(`Using ${usedKb} KB of ${quotaKb} KB`);
      });
      navigator.storage.persist().then((isPer) => {
        console.log(`Browser grants persistent permission:${isPer}`);
      });
    } else {
      console.log('No supporter for Storagemanager methods');
    }
  }
  caches.open('imageCache-2').then((cache) => {
    cache.matchAll().then((matches) => {
      let total = 0;
      matches.forEach((response) => {
        if (response.headers.has('content-length')) {
          total += parseInt(response.headers.get('content-length'));
          console.log(`Adding size for ${response.url}`);
        }
      });
      console.log(`Total size in imgcache-2 is ${total}`);
    });
  });
}

// Attach init to DOMContentLoaded event
document.addEventListener('DOMContentLoaded', init);
