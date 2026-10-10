---
title: "Autoscaling"
summary: "Adding and removing capacity automatically as load changes."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["autoscaling", "auto-scaling", "elastic scaling"]
prereqs: ["scalability", "observability"]
related: ["scalability", "load-shedding", "capacity-planning"]
---
**Autoscaling** adjusts capacity to demand automatically: add instances as load rises, remove them as it falls — driven by metrics (CPU, queue depth, latency, custom business signals) with cooldowns preventing oscillation. Done well it absorbs diurnal curves and viral spikes without human intervention or idle waste.

```text
load ↑ past threshold (sustained) → add capacity → verify → repeat
load ↓ (sustained + cooldown) → remove gradually → verify
```

Scaling dimensions differ: horizontal (more instances — needs statelessness), vertical (bigger instances — needs restarts), and scheduled/predictive (known patterns beat reactive lag). Reactive scaling always lags — provisioning takes minutes — so buffers, shedding and predictive schedules cover the gap.

The classic mistakes:

- Scaling stateful tiers. New database replicas don't absorb writes and take ages to warm; autoscale stateless tiers, provision stateful ones deliberately.
- Thrashing thresholds. Tight add/remove bands oscillate (scale out, scale in, repeat), churning deploys and connections. Hysteresis gaps plus cooldowns calm the loop.
- Vanity metrics. CPU-based scaling misses queue-backed or latency-bound saturation. Scale on the constraint (queue depth, p99, backlog) — the signal closest to user pain.
- Cold-start blindness. New instances serving before warm (JIT, caches, pools) stumble under the surge they joined to absorb. Warm-up periods and gradual traffic ramps.
- Limits untested. Max-instance caps, quota ceilings and downstream capacity (database connections per instance!) bind before autoscaling saves. Load-test the scaled shape, not just the trigger.
- Scale-in data loss. Terminating instances mid-request or mid-queue drains work into errors. Drain connections, finish in-flight, then terminate.
- Autoscaling as architecture. Reactive counts can't fix stateful design, slow starts or downstream ceilings. Design scalable first; automate second.

**How to run it:** stateless scalable tiers, constraint-based metrics, hysteresis plus cooldowns, warmed gradual ramp-up, downstream limits verified. Autoscaling handles the predictable variation — shedding and buffers handle the rest.
