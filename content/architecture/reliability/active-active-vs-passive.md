---
title: "Active-Active vs Active-Passive"
summary: "All nodes serving traffic vs standbys waiting."
levels: { backend: senior, data-engineer: senior }
aliases: ["active-active vs active-passive", "active active", "active passive"]
prereqs: ["failover", "multi-region"]
related: ["failover", "multi-leader", "rpo-rto"]
---
**Active-active vs active-passive** describes whether standby capacity serves traffic: active-active runs all sites live (sharing load, all warm, no failover event — but concurrent writes need conflict design); active-passive idles standbys until failure (simpler consistency, but cold standbys, failover procedures, and wasted capacity).

```text
active-active:  A + B serving (failover = stop sending to the dead one)
active-passive: A serving, B waiting (failover = promote B, redirect, verify)
```

Active-active shines where writes partition cleanly (regional ownership, CRDT-friendly data) or traffic is read-mostly; active-passive suits strong-consistency workloads and tight budgets. The standby's honesty (data freshness, config parity, capacity headroom) decides whether failover works — in both models, untested standbys fail.

The classic mistakes:

- Active-active without conflict design. Concurrent writers diverge; discovered at heal-time with no resolution plan. Partition ownership or merge semantics first.
- Passive standbys rotting. Untested, stale, undersized standbys fail on promotion. Active-passive demands rehearsal discipline proportional to its coldness.
- Assuming instant failover. Detection, DNS propagation, client redirection and warm-up take minutes; "seamless" needs engineering (anycast, pre-warmed, rehearsed), not adjectives.
- Capacity elsewhere missing. Passive sites sized for idle can't absorb the surge; active-active sites need headroom for neighbour failure. Failover capacity is real capacity.
- Split-brain promotion. Both sides promoting (partition + eagerness) creates dual primaries. Quorum-gated promotion, always.
- Cost blindness either way. Active-active pays continuous multi-site operations; active-passive pays idle capacity plus failover risk. Price both honestly.

**How to choose:** partitionable writes and read scale → active-active; strong consistency and simplicity → active-passive with rehearsed promotion. Either way, standbys prove themselves before they're needed.
