const version = 'v0.1.15'
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
        const mustCaches = [`/offline.html`, `/images/svg/fallback.svg`]
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
  const acceptHeader = request.headers.get('Accept')
  const isScript = request.destination === 'script'
  // log(
  //   `contentTypeHeader=${contentTypeHeader}, request.headers.get('Accept')=${request.headers.get(
  //     'Accept'
  //   )} request`,
  //   request
  // )

  if (acceptHeader.includes(`text/html`)) {
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
  } else if (isScript) {
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
  } else if (acceptHeader.includes(`image`)) {
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
