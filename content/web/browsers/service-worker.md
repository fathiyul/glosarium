---
title: "Service Worker"
summary: "A script between the page and the network, for offline support and caching."
levels: { frontend: mid-level }
aliases: ["service worker", "service workers", "sw"]
prereqs: ["pwa", "https"]
related: ["pwa", "push-notifications", "indexeddb"]
---

A **service worker** is a script the browser runs in the background, independent of any page, that intercepts the site's network requests. Installed on first visit and versioned explicitly, it enables **offline-first** experiences (serve cached app shell and data), push notifications, and background sync — the engine room of progressive web apps.

```text
page request → service worker (cache? network? race?) → respond
```

Its power is interception: every fetch for its scope passes through code you control, so caching strategy is yours to define (cache-first for assets, network-first for data, stale-while-revalidate as the middle path). Its constraints are scope (HTTPS only, same-origin, path-scoped) and lifecycle (install → activate, with explicit cache versioning).

The classic mistakes:

- Caching everything forever. An install cache never invalidated serves ancient app shells. Version caches and clean old ones on activate.
- Breaking updates. A new worker waits until all tabs close by default; users run stale code indefinitely. Manage update flow (`skipWaiting` deliberately, notify users).
- Caching what shouldn't cache. Authenticated responses, personalised pages and POSTs in a shared cache leak or corrupt. Scope caching to safe, versioned resources.
- No offline fallback. A cache strategy without a fallback page turns offline into a browser error. Design the degraded experience.
- Scope mistakes. A worker registered at `/app/sw.js` controls only `/app/*`. Register at the right path with the intended scope.
- DevTools confusion. A stale worker makes "my change isn't showing" the default debugging state. Know how to bypass, update and unregister during development.
- Assuming it runs constantly. Workers wake for events and die; they're not a background compute host. Keep handlers short and stateless.

**How to use it:** precache the shell, runtime-cache with versioned invalidation, handle updates explicitly, and design offline as a feature rather than an accident. It's a proxy you program — powerful exactly where the network is unreliable.
