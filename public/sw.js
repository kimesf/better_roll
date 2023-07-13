'use strict'

// TODO: automatically bump version
const VERSION = 2
const CACHE_KEY = `pwa-v${VERSION}`
const PROD_DOMAIN = 'better-roll.vercel.app'

oninstall = (_event) => {
    self.skipWaiting()
}

onactivate = (event) => {
    event.waitUntil(clients.claim(), deleteOldCaches())
}

onfetch = (event) => {
    event.respondWith(maybeCachedResponse(event.request))
}

const deleteOldCaches = async () => {
    const cacheKeys = await caches.keys()
    const cachesToDelete = cacheKeys.filter((key) => key != CACHE_KEY)

    await Promise.all(cachesToDelete.map(deleteCache))
}

const deleteCache = async (key) => {
    await caches.delete(key)
}

const maybeCachedResponse = async (request) => {
    const saved = await caches.match(request)

    if (saved) {
        return saved
    }

    const response = await fetch(request)

    if (inProduction()) {
        save(request, response.clone())
    }

    return response
}

const inProduction = () => {
    return location.hostname == PROD_DOMAIN
}

const save = async (request, response) => {
    const cache = await caches.open(CACHE_KEY)
    cache.put(request, response)
}
