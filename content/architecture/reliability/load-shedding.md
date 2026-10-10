---
title: "Load Shedding"
summary: "Rejecting some requests on purpose to protect the rest."
levels: { backend: senior, data-engineer: senior }
aliases: ["load shedding", "shed load", "admission control"]
prereqs: ["backpressure", "bulkhead"]
related: ["backpressure", "bulkhead", "autoscaling"]
---
**Load shedding** deliberately drops excess work to protect the system: when demand exceeds capacity, refuse (fast errors, degraded responses) rather than queue unboundedly until everything collapses. A system shedding 20% serves 80% well; one accepting everything serves nobody — queues grow, latency explodes, cascading failure follows.

```text
overload → shed (429 + Retry-After, degraded, sampled) → serve the rest well
```

Shedding strategies vary: random drop (fair, simple), priority-based (shed background before interactive), client-cooperative (headers signalling retry behaviour), and degraded responses (cheap answers instead of errors). The best systems shed automatically at multiple layers — edges first, cores last.

The classic mistakes:

- No shedding at all. Unbounded queues turn overload into total collapse (memory, latency, cascade). Every server needs a drop policy before it needs more capacity.
- Shedding the wrong work. Dropping checkout to save telemetry inverts value. Priority order decided calmly in advance, enforced automatically.
- Silent drops. Shed requests vanishing without signals leave clients retrying blindly (amplifying load). Shed loudly: status codes, headers, metrics.
- Retry-hostile shedding. Shedding without Retry-After guidance invites immediate retries — the shed load returns instantly. Signal backoff explicitly.
- Shedding only at the edge. Edge shedding protects edges; saturated cores need their own shedding too. Layer it: CDN, gateway, service, queue — each with policy.
- Autoscaling as the only answer. Scaling takes minutes; spikes take seconds. Shed immediately, scale concurrently — shedding buys the time scaling needs.
- Never testing shed paths. Untested shedding misfires (dropping critical traffic, erroring badly) exactly when needed. Load-test past capacity deliberately.

**The posture:** accept overload as normal, shed by priority with signals, scale alongside. Survival first — a system serving 80% well outperforms one serving 100% never.
