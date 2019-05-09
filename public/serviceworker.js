const version = 'v0.1.7'
const staticCacheName = `staticfiles-${version}`
const imageCacheName = `images`
const pagesCacheName = `pages`
const cacheList = [staticCacheName, imageCacheName, pagesCacheName]

const log = console.log

addEventListener('install', function(installEvent) {
  skipWaiting()

  installEvent.waitUntil(
    caches
      .open(staticCacheName)
      .then(staticCache => {
        // nice to haves..

        const optionalCaches = [
          `/images/icons/apple-touch-icon.png`,
          `/images/icons/favicon-32x32.png`,
          `/images/icons/favicon-16x16.png`,
          `/images/icons/site.webmanifest`,
          ,
        ]
        staticCache.addAll(optionalCaches)

        // must haves...
        const mustCaches = [
          `bundle.js`,
          `/offline.html`,
          `/images/svg/fallback.svg`,
        ]
        return staticCache.addAll(mustCaches)
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
            if (!cacheList.includes(cacheName)) return caches.delete(cacheName)
          })
        )
      })
      .then(() => clients.claim())
  )
})

addEventListener('fetch', function(fetchEvent) {
  const request = fetchEvent.request

  if (
    request.headers.get(`Accept`).includes(`text/html`) ||
    request.headers.get(`Accept`).includes(`application/javascript`)
  ) {
    fetchEvent.respondWith(
      fetch(request)
        .then(fetchResponse => {
          const copy = fetchResponse.clone()
          fetchEvent.waitUntil(
            caches
              .open(pagesCacheName)
              .then(pagesCache => pagesCache.put(request, copy))
          )

          return fetchResponse
        })
        .catch(error => {
          return caches
            .match(request)
            .then(
              cacheResponse => cacheResponse || caches.match(`/offline.html`)
            )
        })
    )
  } else if (request.headers.get(`Accept`).includes(`image`)) {
    fetchEvent.respondWith(
      caches.match(request).then(cacheResponse => {
        return (
          cacheResponse ||
          fetch(request)
            .then(fetchResponse => {
              const copy = fetchResponse.clone()
              fetchEvent.waitUntil(
                caches
                  .open(imageCacheName)
                  .then(imageCache => imageCache.put(request, copy))
              )
              return fetchResponse
            })
            .catch(error => caches.match(`/images/svg/fallback.svg`))
        )
      })
    )
  } else {
    fetchEvent.respondWith(
      caches
        .match(request)
        .then(
          cacheResponse =>
            cacheResponse ||
            fetch(request).catch(error => caches.match(`/offline.html`))
        )
    )
  }
})
