---
title: "Conditional Request"
summary: "If-None-Match and If-Match for caching and concurrency control."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["conditional request", "conditional get", "if-none-match"]
prereqs: ["etag", "cache-control"]
related: ["etag", "cache-control", "cdn-caching"]
---

A **conditional request** carries a precondition about the resource's current state: send the body *only if* it changed (`If-None-Match`/`If-Modified-Since` for caching), or apply the write *only if* it matches (`If-Match`/`If-Unmodified-Since` for concurrency). Unmet conditions get a short status (`304`, `412`) instead of the full exchange.

```text
caching:       GET + If-None-Match: "v42"  → 304 (unchanged, no body)
concurrency:   PUT + If-Match: "v42"       → 412 (someone changed it; retry)
```

The same validator mechanism serves two masters: bandwidth (skip unchanged bodies) and correctness (optimistic locking on writes). Both depend on honest validators — ETags that actually change with content, timestamps with enough resolution.

The classic mistakes:

- Validators that lie. ETags not derived from content make conditionals wrong in both directions: stale 304s and false 412s. Generate from the bytes or a real version.
- Clock-based conditions with coarse clocks. `If-Modified-Since` at one-second resolution misses sub-second changes. Prefer ETags where precision matters.
- If-Match without handling 412. The whole point is the conflict path — merge, retry with fresh state, or surface it. A 412 nobody handles is a broken write.
- Caching the 304 wrongly. Intermediaries must update stored headers from the 304 response; mishandled, caches serve stale metadata with fresh validation.
- Assuming universal support. Some servers and CDNs ignore or strip conditionals; verify end to end rather than assuming the optimisation applies.
- Conditional writes without transactions. `If-Match` checks recency, not serialisability — the write itself still needs atomicity server-side.
- Forgetting Vary. Conditionals on negotiated resources must account for variants, or a 304 validates the wrong representation.

**How to use it:** ETag-backed conditionals on cacheable reads, `If-Match` on contested writes, with real validators and handled conflict paths. It's caching and concurrency control sharing one elegant mechanism.
