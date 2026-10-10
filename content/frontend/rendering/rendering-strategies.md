---
title: "Rendering Strategies"
summary: "Where and when HTML gets generated."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["rendering strategies", "ssr vs csr", "ssg isr"]
prereqs: ["hydration", "cdn"]
related: ["hydration", "suspense", "edge-rendering"]
---

**Rendering strategies** answer "where and when does HTML get made": CSR (browser renders from JS — rich interactivity, empty first paint), SSR (server renders per request — fast first paint, server cost), SSG (build-time static — fastest, CDN-cached, stale until rebuild), ISR (static with background revalidation — static speed, bounded staleness), edge (render at CDN PoPs — personal + fast).

```text
CSR:  empty shell → JS fetches → renders (slow paint, cheap serve)
SSR:  server renders each request (fast paint, server load)
SSG:  prebuilt HTML from CDN (fastest, rebuild to update)
ISR:  static + revalidate in background (fast + fresh-ish)
edge: render near the user (personalised + fast)
```

Choice is per-route, not per-app: marketing pages static, feeds ISR, dashboards SSR/CSR, personalised content at the edge. Hybrids dominate because content varies in freshness needs.

The classic mistakes:

- One strategy everywhere. CSR for content pages (SEO/paint suffer) or SSR for everything (servers render static marketing per request) wastes each tool's strength. Match strategy to route.
- SSR without hydration discipline. Server HTML the client can't adopt (mismatches, double data fetching) costs both sides. Streamline data flow and hydration (see [hydration](/t/hydration)).
- SSG staleness surprises. "Deploys update content" breaks when content changes between builds. Rebuild hooks or ISR where editors expect immediacy.
- Edge for everything. Edge compute costs and limits (CPU, duration) punish heavy rendering. Edge suits light personalisation over cached shells.
- Ignoring data waterfalls. Any strategy fetching serially (page → component → subcomponent) delays paint equally. Parallelise data regardless of where rendering happens.
- Caching mismatches. Personalised SSR cached as static leaks users' data; static strategies need strictly public content or keyed variants.
- Measuring locally. Strategy differences show on slow networks and distant users — lab tests on localhost hide them. Measure field conditions.

**How to choose:** freshness need × personalisation × traffic shape, per route. Static where possible, revalidate where fresh-ish suffices, server-render where dynamic, edge where personal and global.
