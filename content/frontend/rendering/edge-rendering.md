---
title: "Edge Rendering"
summary: "Rendering close to users on CDN edge servers."
levels: { backend: senior, frontend: senior }
aliases: ["edge rendering", "edge ssr", "compute at edge"]
prereqs: ["rendering-strategies", "cdn"]
related: ["rendering-strategies", "incremental-static-regeneration", "cdn"]
---

**Edge rendering** runs page rendering on CDN points of presence — close to users, with access to request context (location, cookies, headers) for personalisation. Cached shells compose with per-request dynamic fragments: static speed where content is shared, fresh rendering where it's personal.

```text
request → nearest PoP → shell from cache + personal fragment rendered at edge
→ assembled in milliseconds, worldwide
```

It collapses the old trade (fast-but-static vs personal-but-slow) by moving compute to the data's doorstep rather than hauling users to a region. Middleware patterns (auth checks, rewrites, A/B assignment) run at the same layer.

The classic mistakes:

- Heavy rendering at the edge. CPU and duration limits punish big frameworks and serial data fetching. Edge rendering must be light — shells, fragments, middleware — with heavy work behind APIs.
- Uncacheable everything. Rendering per request with no shared cacheable parts forfeits the edge's purpose. Architect cacheable shells with dynamic islands.
- Vendor-shaped code. Edge runtimes differ (APIs, limits, cold starts); deeply coupled code complicates migration. Isolate edge adapters from app logic.
- Secrets at the edge. Broadly distributed edge code multiplies secret exposure. Minimise secrets at the edge; call back for privileged operations.
- Debugging distributed renders. Failures across hundreds of PoPs need edge-aware logging and tracing — local reproduction misses region-specific behaviour.
- Cost blindness. Per-request edge compute bills differently from origin servers; viral traffic multiplies a new cost line. Model it before the spike.
- Consistency assumptions. Edge state (KV, caches) is eventually consistent across PoPs. Personalisation reads must tolerate staleness or route to origin.

**When to use it:** global audiences with personalised content — commerce, media, SaaS marketing — where milliseconds matter and content varies per user. Light renders, cacheable shells, measured costs.
