---
title: "BASE"
summary: "Basically Available, Soft state, Eventual consistency: the counterpart to ACID."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["BASE model", "basically available", "BASE vs ACID"]
prereqs: ["cap-theorem", "eventual-consistency"]
related: ["cap-theorem", "eventual-consistency", "acid"]
---
**BASE** (Basically Available, Soft state, Eventually consistent) is the optimistic counterpart to ACID: prioritise availability and partition tolerance, accept that state converges *eventually* rather than instantly. Where ACID transactions promise immediate consistency, BASE systems promise the system stays up and agrees soon.

```text
ACID: consistent now, possibly unavailable (wait or refuse)
BASE: available now, consistent soon (serve, converge)
```

"Soft state" acknowledges replicas may disagree transiently; "eventually consistent" promises convergence given quiet. DNS, shopping carts, social feeds and caches live here comfortably — the user experience tolerates (or never notices) the lag.

The classic mistakes:

- BASE for money and inventory. Balances that must never disagree need coordination, not convergence. Match the model to the harm of temporary wrongness.
- "Eventual" without a bound. Convergence in minutes vs hours changes the design (and the support load). Measure and bound the lag; alert past it.
- Assuming convergence is automatic. Replicas need anti-entropy (read repair, gossip, version vectors) — "eventual" is engineered, not emergent.
- Hiding inconsistency from users. Showing disagreeing numbers without acknowledgement erodes trust. Design UI for convergence (timestamps, "updating…", session consistency).
- No conflict story. Concurrent writes to the same key need resolution rules; BASE without them is just divergence. Define merge semantics per type.
- Testing only the converged state. Bugs live in the transient window — flapping UI, double charges, phantom items. Test during convergence, not just after.

**When to choose it:** availability-first workloads where temporary disagreement is harmless — the CAP theorem's A-side made practical. For the rest, ACID keeps its crown. See [ACID](/t/acid) for the other half of the trade.
