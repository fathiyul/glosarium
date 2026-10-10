---
title: "Preload, Prefetch, Preconnect"
summary: "Hints telling the browser what to fetch early."
levels: { frontend: mid-level }
aliases: ["resource hints", "preload", "prefetch", "preconnect"]
prereqs: ["critical-rendering-path", "cdn"]
related: ["critical-css", "render-blocking-resources", "performance-budget"]
---

**Resource hints** let the page jump the browser's discovery queue: `preconnect` (open TLS + TCP to an origin early), `preload` (fetch a critical resource now — font, hero image, CSS), `prefetch` (fetch likely-next-navigation resources at idle), `dns-prefetch` (resolve early, the cheap subset of preconnect).

```html
<link rel="preconnect" href="https://cdn.example">
<link rel="preload" as="font" href="/body.woff2" crossorigin>
<link rel="prefetch" href="/next-step.js">
```

Each hint buys a different head start: preconnect saves handshake round trips for third parties; preload promotes late-discovered critical files (fonts hiding in CSS); prefetch exploits idle time for probable futures.

The classic mistakes:

- Preloading everything. Preload is priority theft — each preloaded file jumps ahead of actually-needed resources. Hint the 1–3 critical files, not the bundle directory.
- Preconnect without use. Open idle connections cost handshakes and sockets; unconnected-to origins waste both. Preconnect only origins the page genuinely uses early.
- Wrong `as` or missing crossorigin. Mismatched `as` (or fonts without `crossorigin`) double-fetches — the preload doesn't match the real request. Mirror attributes exactly.
- Prefetching speculatively wild. Prefetching unlikely futures burns users' data and your bandwidth. Prefetch high-probability next steps; prerender only near-certain ones.
- Hints instead of fixing discovery. Preloading a font the CSS buries is a patch; inlining critical CSS or restructuring fixes the cause. Hints complement, not replace, path optimisation.
- Third-party preconnect sprawl. Ten origins preconnected for tags that may not fire wastes the startup budget. Audit which third parties matter for first paint.
- Static hints for dynamic needs. Hardcoded preloads rot as routes change. Generate hints per route from the actual critical set.

**How to use them:** preconnect critical third-party origins, preload the few late-discovered critical files, prefetch probable next navigations — measured, minimal, per-route. Hints spend credibility with the scheduler; spend it where it pays.
