const staticCacheName = 'staticfiles'
const log = console.log

addEventListener('install', function(installEvent) {
  installEvent.waitUntil(
    caches
      .open(staticCacheName)
      .then(staticCache => {})
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
    fetch(request)
      .then(responseFromFetch => responseFromFetch)
      .catch(
        error =>
          new Response('<h1>Oops</h1><p>something went wrong</p>', {
            headers: {
              'Content-type': 'text/html;charset=utf-8',
            },
          })
      )
  )
})
