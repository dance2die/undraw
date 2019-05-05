const version = 'v0.0.6'
const staticCacheName = `staticfiles-${version}`
const log = console.log

addEventListener('install', function(installEvent) {
  skipWaiting()

  installEvent.waitUntil(
    caches
      .open(staticCacheName)
      .then(staticCache => {
        // nice to haves..

        // must haves...
        const favicons = [
          `/images/icons/apple-touch-icon.png`,
          `/images/icons/favicon-32x32.png`,
          `/images/icons/favicon-16x16.png`,
          `/images/icons/site.webmanifest`,
        ]
        return staticCache.addAll(favicons)
      })
      .catch(error => log(`Error retrieving ${staticCacheName}`))
  )
})

addEventListener('activate', function(activateEvent) {
  activateEvent.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== staticCacheName) return caches.delete(cacheName)
          })
        )
      })
      .then(() => clients.claim())
  )
})

addEventListener('fetch', function(fetchEvent) {
  const request = fetchEvent.request
  //   log(request)
  fetchEvent.respondWith(
    caches.match(request).then(cacheResponse => cacheResponse || fetch(request))
  )
})
