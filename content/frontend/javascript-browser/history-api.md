---
title: "History API"
summary: "Changing the URL without reloading; the basis of client-side routing."
levels: { frontend: mid-level }
aliases: ["history api", "pushstate", "client-side routing"]
prereqs: ["javascript", "single-page-application"]
related: ["single-page-application", "accessibility", "canonical-url"]
---

The **History API** lets scripts change the URL without navigation: `pushState()` adds an entry, `replaceState()` edits in place, and `popstate` fires on back/forward — the foundation of client-side routing. SPAs update views and URLs independently, keeping shareable addresses without server round trips.

```js
history.pushState({page: 2}, '', '/items?page=2');  // URL changes, no reload
window.addEventListener('popstate', render);        // back/forward renders
```

The URL stays meaningful (bookmarkable, shareable, server-renderable in principle) while navigation feels instant. The server must cooperate — deep links need serving the app shell — or refreshes 404.

The classic mistakes:

- pushState without server fallback. Client routes that 404 on refresh or for crawlers break sharing and SEO. Serve the shell (or pre-render) for app routes.
- Breaking back/forward. Hijacking clicks without pushing state (or pushing duplicates per keystroke) makes back skip or trap. Every view change that matters gets exactly one entry.
- No scroll restoration. Client navigation that leaves scroll mid-page disorients. Manage scroll per route (top on new views, restore on back).
- Ignoring focus. Route changes must move focus and announce (screen readers don't know the "page" changed). Treat routing as navigation for assistive tech too.
- State in history objects. Stuffing large state into pushState bloats memory and breaks on reload. URLs carry address; stores carry state.
- Hash-routing by default. Hash fragments (`#/page`) dodge server config but break anchors, SEO and server rendering. Prefer real paths with proper fallback.
- Forgetting canonical URLs. Client routes need canonical tags or search indexes fragment. Coordinate with [canonical URL](/t/canonical-url) discipline.

**How to use it:** pushState per meaningful view, server fallback for deep links, scroll and focus managed per navigation, URLs kept shareable. The address bar is a UI — route like it matters.
