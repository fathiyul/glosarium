---
title: "DNS TTL and Propagation"
summary: "How long DNS answers are cached, and why changes take time to spread."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["dns ttl", "dns propagation", "dns caching"]
prereqs: ["dns", "cache-control"]
related: ["dns-record-types", "load-balancer", "cdn"]
---

Every DNS record carries a **TTL** (time to live): how long resolvers and clients may cache the answer before asking again. There is no instant global update — there is only "every cache expires on its own schedule." What people call **propagation delay** is really cache expiry playing out worldwide.

```text
record TTL 3600 → change it now → some clients see the old answer for up to an hour
```

This is why migrations have a ritual: *lower the TTL* (to minutes) well in advance, wait out the old TTL, make the change, verify, then raise it back. Skipping the first step turns a 5-minute cutover into an hours-long split-brain where different clients reach different servers.

The classic mistakes:

- Changing a record without lowering TTL first. The single most common DNS outage pattern. The change "doesn't take effect" because caches still hold the old answer.
- Setting TTL absurdly low permanently. A 10-second TTL on everything means every resolution hits your authoritative servers, adding latency to every connection setup and load to your DNS. Low TTLs are a migration tool, not a default.
- Setting TTL absurdly high. A week-long TTL means a mistaken record poisons clients for a week. Balance stability against your ability to fix mistakes.
- Forgetting the layers. TTL applies at the resolver, the OS, the browser, and the application (JVMs and some runtimes cache DNS themselves). "Propagation" is only done when the *longest-lived* cache expires.
- Confusing it with HTTP caching. DNS TTL governs name resolution; [Cache-Control](/t/cache-control) governs content. Both delay visibility of changes, at different layers.
- Assuming all resolvers honour your TTL. Some cap or floor TTLs regardless of what you publish. Plan for stragglers during critical migrations.

**The rule:** TTL is a trade between lookup speed and change agility. Keep steady-state TTLs moderate (minutes to hours), drop them low *before* a planned change, and remember that during the window, old and new answers coexist — so both destinations must serve correctly.
