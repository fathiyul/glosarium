---
title: "Browser Cache"
summary: "The browser storing responses so it doesn't download them again."
levels: { backend: mid-level, frontend: junior }
aliases: ["HTTP cache in browser", "disk cache", "hard refresh"]
prereqs: ["http-caching"]
related: ["http-caching", "cache-control", "cdn-caching", "service-worker", "browser-storage"]
---

The browser cache is the browser storing copies of responses (pages, scripts, stylesheets, images) so it doesn't have to download them again. It makes repeat visits faster and saves bandwidth.

It follows the caching rules the server sends in headers ([HTTP caching](/t/http-caching), [Cache-Control](/t/cache-control)):

- **Fresh copy**: use it straight away, with no request.
- **Stale copy**: ask the server "has it changed?", and use the cached copy if it hasn't (a `304 Not Modified`).
- **No copy or not cacheable**: download it.

In DevTools' [network tab](/t/network-tab), cached responses show "(disk cache)" or "(memory cache)".

## Why developers meet it constantly

- **"My change isn't showing up."** The browser is using an old file. Do a hard reload (`Ctrl+Shift+R`), or open DevTools and tick "Disable cache" while it's open.
- **Users stuck on an old version** after a deploy: long `max-age` on files whose names didn't change.

## The standard solution

- **Fingerprint static assets**: put a content hash in the filename (`app.8f3a2c.js`). A new build gets a new URL, so there's nothing stale to clear. Cache these for a very long time.
- **Don't cache the HTML** (or revalidate it each time), so users receive the new asset names ([asset hashing](/t/asset-hashing)).

## Related but different

- **[Service workers](/t/service-worker)** can implement their own caching and offline behavior.
- **[Browser storage](/t/browser-storage)** (localStorage, IndexedDB) holds data your code writes, not responses.
- **CDN and server caches** are shared, and sit elsewhere ([CDN caching](/t/cdn-caching)).

## Cautions

- **Sensitive pages** shouldn't be cached: use `Cache-Control: no-store` ([HTTP caching](/t/http-caching)).
- **Shared computers** and back-button behavior can expose cached private pages if headers are lax.
- Clearing the cache fixes symptoms. Fix the headers.
