---
title: "Incremental Static Regeneration"
summary: "Rebuilding static pages in the background after deploy."
levels: { frontend: senior }
aliases: ["incremental static regeneration", "isr", "static revalidation"]
prereqs: ["rendering-strategies", "stale-while-revalidate"]
related: ["rendering-strategies", "stale-while-revalidate", "cdn"]
---

**Incremental Static Regeneration (ISR)** serves prebuilt static pages and rebuilds them in the background — per page, on demand or on interval — when content changes. Visitors always get instant static responses; freshness converges without full-site rebuilds.

```text
request → serve static (instant) → trigger revalidate (interval/on-demand)
→ next visitors get the rebuilt page
```

It applies stale-while-revalidate to whole pages: build what you can upfront, generate the long tail on first request (with fallbacks), and revalidate by time or by CMS webhook. Catalogues with millions of SKUs and content sites with frequent edits are the canonical wins.

The classic mistakes:

- Stale-forever misconfiguration. Revalidation intervals longer than content volatility serve yesterday's prices and news indefinitely. Match intervals (or on-demand hooks) to edit cadence.
- On-demand without auth. Revalidation endpoints that rebuild arbitrary paths need authentication — open rebuild URLs are a cache-poisoning and compute-abuse vector.
- Fallback UX gaps. On-demand-generated pages need loading states for first visitors; blocking fallbacks stall, non-blocking ones flash. Design both.
- Personalised content in static pages. ISR pages are shared — user-specific data baked in leaks across visitors. Personalise client-side over static shells.
- Build-error staleness. Failed revalidations should keep serving last-good, not 500. Handle rebuild failure as a first-class path.
- CDN interplay. Platform revalidation and CDN caching layer — misaligned TTLs serve stale-behind-stale. Coordinate the two clocks.
- Assuming it replaces SSR. Real-time, per-request data (carts, auth-gated content) still needs server rendering. ISR covers fresh-*ish* public content.

**When to use it:** large static-leaning sites with changing content — docs, blogs, catalogues, marketing. Static speed, background freshness, rebuilds scoped to changed pages.
