---
title: "Time to First Byte (TTFB)"
summary: "How long until the first byte of the response arrives."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["time to first byte", "ttfb", "server response time"]
prereqs: ["observability", "cdn"]
related: ["fcp", "synthetic-monitoring", "edge-rendering"]
---

**Time to First Byte (TTFB)** measures navigation start to the first response byte — DNS + connection + server thinking. It's the floor under every other metric: no paint, interaction or completion beats a slow server response, and global audiences pay wildly different TTFBs from one origin.

```text
TTFB = redirect + DNS + connect + TLS + server processing + first-byte transit
```

Good TTFB is architecture (cached responses, edge serving, fast origins, warm backends); bad TTFB is usually server work (uncached renders, cold starts, distant origins) rather than networks. CDNs and edge rendering attack the geography; caching and warm capacity attack the server side.

The classic mistakes:

- Optimising assets with 2s TTFB. No amount of minification beats a server that thinks for seconds. TTFB first — it's the foundation metric.
- Uncached dynamic everything. Rendering unchanged content per request wastes the easiest win. Cache aggressively (CDN, page cache, fragments); render dynamically only what's dynamic.
- Cold origins. Serverless cold starts and spun-down backends spike TTFB intermittently. Warm minimums, provisioned concurrency, or edge caching absorb it.
- Single-region origins. One region serving the world adds 100–300ms of geography for most users. Serve from the edge (CDN, edge rendering) where audiences spread.
- Redirect chains. Each redirect adds a full round trip before TTFB even starts. One hop maximum; audit chains regularly.
- Measuring only the homepage. TTFB varies by route (cached landing vs dynamic app). Measure per route, especially the slow dynamic ones.
- Confusing TTFB with total speed. Fast first byte with 5MB of blocking assets still paints slowly. TTFB is necessary, not sufficient — the whole path matters.

**The order:** TTFB sets the floor — cache, edge-serve, warm backends, kill redirects. Then optimise everything after the first byte arrives.
