---
title: "Lease"
summary: "A lock or role that expires automatically unless renewed."
levels: { backend: senior, data-engineer: senior }
aliases: ["lease", "time-bound lock", "expiring grant"]
prereqs: ["distributed-lock", "clock-skew"]
related: ["distributed-lock", "fencing-token", "heartbeat"]
---
A **lease** grants a right for a bounded time: hold this lock for 30s, serve as leader for this term, cache this config until expiry. Unlike open-ended grants, leases self-heal — crashed holders simply time out — making them the primitive under leader election, locks, caches and presence.

```text
grant(lease, TTL=30s) → holder renews periodically → expiry revokes automatically
```

Safety rests on two disciplines: holders must stop acting when the lease *might* have expired (not when they notice — clocks and pauses lie), and renewals must complete well before expiry (margin for GC pauses and network blips). The lease interval balances responsiveness (short = fast recovery) against churn (short = constant renewal traffic).

The classic mistakes:

- Acting past possible expiry. A paused holder (GC, VM stall) resuming after its lease expired but acting anyway corrupts. Fence with monotonic tokens; check validity at use, not just at acquire.
- Renewal without margin. Renewing at T-0 with 30s pauses guaranteed turns every blip into expiry. Renew at fractions (⅓ TTL typical) with headroom.
- Lease times shorter than operations. A 10s lease guarding a 60s migration expires mid-work. Lease duration must cover the protected operation plus margin — or operations must checkpoint and re-lease.
- Single-lease overloading. One lease guarding many independent resources couples their fates; expiry cascades. Scope leases narrowly.
- Clock-driven expiry across machines. Expiry judged by different clocks disagrees by the skew; use monotonic durations and generation counters, not wall-clock comparisons.
- Renewal storms. Thousands of holders renewing simultaneously (aligned TTLs) pulse the grantor. Stagger and jitter renewals.
- Forgetting the grantor's failure. If the lease service partitions, holders can't renew — design degraded behaviour (read-only, halt) rather than assuming perpetual grant.

**How to use them:** bounded grants, early renewal, validity checked at action time, fencing for the truly critical. Leases trade permanence for self-healing — the right trade wherever holders can die.
