const version = 'v0.3.0'
const staticCacheName = `staticfiles-${version}`
const imageCacheName = `images`
const pagesCacheName = `pages-${version}`
const cacheList = [staticCacheName, imageCacheName, pagesCacheName]

const log = console.log

// https://developers.google.com/web/fundamentals/app-install-banners/
let deferredPrompt

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
          `/manifest.json`,
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
  const isScript = request.url.includes('/bundle.js')

  // log(`request`, request, `acceptHeader`, acceptHeader, `isScript`, isScript)

  if (acceptHeader.includes(`text/html`)) {
    fetchEvent.respondWith(
      fetch(request)
        .then(fetchResponse => {
          fetchEvent.waitUntil(stashInCache(request, pagesCacheName))
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
          fetchEvent.waitUntil(stashInCache(request, pagesCacheName))
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
              fetchEvent.waitUntil(stashInCache(request, imageCacheName))
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

async function stashInCache(request, cacheName) {
  const fetchResponse = await fetch(request)
  const cache = await caches.open(cacheName)
  return await cache.put(request, fetchResponse)
}
