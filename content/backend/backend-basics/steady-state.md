---
title: "Steady State"
summary: "Designing systems to clean up after themselves: purging data, rotating logs."
levels: { backend: senior }
aliases: ["steady state", "stable state", "unbounded growth"]
prereqs: ["backpressure", "queue-depth"]
related: ["log-rotation", "unbounded-result-sets", "cache-invalidation", "memory-leak"]
---

A system is in **steady state** when its resource usage stays bounded over time: queues drain as fast as they fill, caches stay a fixed size, logs rotate, connections are released, memory returns to baseline. Many production problems aren't crashes but *drift* — something grows slowly until it eventually exhausts a resource.

Things that grow unboundedly if you don't bound them:

- Queues that fill faster than consumers drain (see [queue depth](/t/queue-depth)).
- Logs and files that accumulate until the disk fills (see [log rotation](/t/log-rotation)).
- Caches with no eviction, growing forever.
- Connections and file descriptors that leak (see [connection pooling](/t/connection-pooling)).
- Memory that creeps up (see [memory leak](/t/memory-leak)).
- Data — tables and result sets that only ever grow (see [unbounded result sets](/t/unbounded-result-sets)).

```text
bounded:   in-rate ≈ out-rate → queue depth, memory, disk stay flat
unbounded: in-rate > out-rate → eventual exhaustion
```

The classic mistakes:

- Assuming "it worked in testing". Short tests never reveal slow growth. Long [soak tests](/t/soak-test) and steady-state monitoring do.
- Fixing symptoms with restarts. Restarting a service resets memory and hides a leak; the growth returns. Find and bound the cause.
- Only watching the happy path. Queue backlog, disk usage, connection count and memory trend are the leading indicators. Watch the *slopes*, not snapshots.
- No limit anywhere. Every queue, cache, buffer and log should have a bound and a defined behaviour at the bound. Unbounded is a deferred outage.
- Assuming growth is always fine. A growing backlog might be legitimate (retained history) or a leak. Know which.

**How to get there:** bound every resource, monitor the trends, and confirm they flatten under sustained load. Steady state is a property you design for, not one you stumble into — the point of [backpressure](/t/backpressure), eviction policies, rotation and leak-free code. "Does it stabilise?" is one of the most useful questions to ask of any long-running service.
