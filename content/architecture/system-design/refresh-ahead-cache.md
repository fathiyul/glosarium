---
title: "Refresh-Ahead Cache"
summary: "Refreshing cache entries before they expire."
levels: { backend: senior }
aliases: ["refresh-ahead cache", "proactive refresh", "read-ahead cache"]
prereqs: ["cache-hit-miss", "ttl"]
related: ["stale-while-revalidate", "cache-warming", "ttl"]
---
A **refresh-ahead cache** reloads entries *before* they expire — tracking access patterns and refreshing hot keys in the background — so users never wait on a miss for predictable content. Where TTL expiry guarantees periodic latency spikes, refresh-ahead smooths them into background work.

```text
TTL expiry:   hit…hit… EXPIRE → miss (user waits) → hit…
refresh-ahead: hit…hit… background refresh → hit… (no user-visible miss)
```

It suits hot, expensive-to-compute, moderately-changing data: homepages, leaderboards, config, ML features. Refresh triggers blend time (before expiry), events (on upstream change), and prediction (ML-timed prefetch); failures keep serving stale rather than erroring.

The classic mistakes:

- Refreshing everything. Background refresh of cold keys wastes compute on content nobody reads. Refresh by heat (access frequency × compute cost), expire the rest.
- Thundering refresh. Aligned expiries refreshing simultaneously stampede the origin; stagger and jitter refresh schedules.
- Refresh failures surfacing. A failed background refresh must not evict the good stale entry. Refresh into a side buffer; swap on success only.
- Ignoring upstream change signals. Pure time-based refresh lags real changes; combine with event-driven invalidation where freshness matters.
- Unbounded background work. Refresh loops without concurrency caps and backoff become a self-inflicted load generator. Bound, prioritise, shed.
- Stale-forever on refresh outage. If refresh breaks silently, "temporarily stale" becomes permanently stale. Monitor refresh success and age; alert on staleness.
- Redundant with SWR. Client or CDN stale-while-revalidate may already cover the need; layering both refreshes twice. Place refresh-ahead at one layer deliberately.

**When to use it:** hot expensive keys where miss latency is user-visible. Predict, refresh in background, serve stale on failure — misses become an operational choice, not a user experience.
