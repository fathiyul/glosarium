---
title: "Negative Caching"
summary: "Caching \"not found\" results too."
levels: { backend: senior, data-engineer: senior }
aliases: ["negative caching", "cache misses", "caching not found"]
prereqs: ["cache-hit-miss", "ttl"]
related: ["cache-aside", "ttl", "cache-consistency"]
---

**Negative caching** stores the result "this doesn't exist" — a lookup that returns not-found — so repeated requests for the same missing item don't keep hitting the expensive source. It's the caching of *misses*, not just hits.

```text
GET /users/999 → not found (after a slow lookup)
cache: "999 → not found" for 60s
GET /users/999 again → cached "not found", no lookup
```

Why it matters: a missing item is often *more* expensive to resolve than a present one, because the source has to search thoroughly to conclude it's absent (a full table scan, several checks). And missing items are disproportionately requested by attackers or crawlers probing for nonexistent IDs — exactly the traffic you don't want hitting the database each time.

The classic mistakes:

- Not caching negatives, then getting hammered. A scanner requesting thousands of missing IDs, each triggering an expensive lookup, can bring down a service. Negative caching absorbs this.
- Too-long negative TTL. A "not found" cached for an hour means a record created right after stays invisible for an hour. Use a *shorter* TTL for negatives than positives, or invalidate on creation.
- Forgetting to invalidate on creation. The classic negative-cache bug: user checks a handle (doesn't exist → cached negative), then creates it, but the cache still says "taken/absent" until it expires. Invalidate the negative on the write.
- Negative-caching errors as "not found". A lookup that *failed* (timeout, DB error) is not the same as "doesn't exist". Caching an error as a negative propagates a transient failure into a poisoned cache. Only cache genuine not-founds.
- Distinguishing not-found from forbidden. "You're not allowed to see this" and "this doesn't exist" are different outcomes; caching them together can leak information or show wrong states.
- Forgetting security. If you return "not found" instead of "forbidden" for authorization reasons, be consistent — negative caching shouldn't undermine that choice.
- Unbounded negative cache. Attackers can create unlimited distinct missing keys, filling the cache with negatives and evicting real data. Bound it, and consider rate limiting abusive patterns (see [eviction policy](/t/eviction-policy)).

**When to use it:** whenever misses are expensive or repeated — ID lookups, existence checks, DNS-style queries, username availability, and especially any endpoint an attacker might probe. Use a short TTL and invalidate on creation. It's a specific, high-value form of [cache-aside](/t/cache-aside) that protects the source from the most hostile traffic. See [TTL](/t/ttl).
