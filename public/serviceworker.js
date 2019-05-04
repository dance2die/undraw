// "version" should follow the "package.json" version
const version = 'v0.0.3'
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
        const allCSS = [
          ...document.querySelectorAll('link[rel="stylesheet"][href$="css"]'),
        ].map(css => css.href.replace(css.baseURI, ''))
        return staticCache.addAll(allCSS)
      })
      .catch(error => log(`Error retrieving ${staticCacheName}`))
  )
})

addEventListener('activate', function(event) {
  log(`Service worker is ACTIVATing...`, event)
})

addEventListener('fetch', function(fetchEvent) {
  const request = fetchEvent.request
  //   log(request)
  fetchEvent.respondWith(
    caches.match(request).then(cacheResponse => cacheResponse || fetch(request))
  )
})
