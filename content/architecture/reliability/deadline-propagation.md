---
title: "Deadline Propagation"
summary: "Passing the remaining time budget down a chain of calls."
levels: { backend: senior, data-engineer: senior }
aliases: ["deadline propagation", "timeout propagation", "distributed deadlines"]
prereqs: ["timeouts", "tail-latency"]
related: ["timeouts", "hedged-requests", "load-shedding"]
---
**Deadline propagation** carries time budgets across service boundaries: each request gets an overall deadline, and every downstream call receives the *remaining* budget — so deep call chains fail fast coherently instead of each layer waiting its own full timeout while the user long gave up.

```text
user budget 2s → A (1.8s left) → B (1.2s left) → C (0.3s left → fail fast)
without: A waits 2s + B waits 2s + C waits 2s = 6s of wasted work
```

Implementation rides on context/metadata (gRPC deadlines, HTTP headers like `Deadline`/`Timeout`): frameworks enforce locally, propagate downstream, and cancel promptly. The budget math forces honesty about chain depth — ten serial hops can't fit a one-second SLO.

The classic mistakes:

- Per-hop timeouts only. Each layer waiting fully multiplies latency and wastes work long after the caller left. Propagate remaining budget, not fresh timeouts.
- No cancellation. Expired deadlines ignored by still-running work waste resources and surprise with late writes. Cancel (context, abort signals) and honour promptly.
- Deadlines too tight for depth. Budgets that can't accommodate the chain's real latency fail healthy systems. Budget from measured p99s with headroom, per layer.
- Missing propagation at boundaries. Queues, async handoffs and third-party calls dropping deadlines reset the clock silently. Propagate across every hop type, or document the gap.
- Retries ignoring budgets. Retrying within an expired deadline burns resources for results nobody reads. Check budget before each attempt, including retries.
- One deadline for all operations. Reads, writes and batch jobs need different budgets; a single global timeout misfits most. Budget per operation class.
- Unobserved expiry. Deadline breaches without metrics hide systemic slowness. Record where budgets die; fix the depths that starve.

**The practice:** budgets set per operation, propagated per hop, honoured by cancellation, measured at expiry. Time is a distributed resource — spend it with a single account, not per-layer allowances.
