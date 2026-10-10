---
title: "Queue-Based Load Leveling"
summary: "A queue absorbing traffic spikes so a service sees steady load."
levels: { backend: senior }
also: [messaging]
aliases: ["queue-based load leveling", "load leveling", "buffering bursts"]
prereqs: ["message-queue", "autoscaling"]
related: ["message-queue", "competing-consumers", "backpressure"]
---
**Queue-based load leveling** absorbs bursts between producers and consumers: a queue buffers spikes, consumers work at sustainable pace, autoscaling follows depth — peak demand decoupled from peak capacity. Flash sales, batch uploads and viral moments flatten into manageable flow.

```text
spike ×100 → [queue absorbs] → consumers steady ×2 → autoscale gradually → drain
```

The queue is a shock absorber with limits: bounded depth (shed past it), age monitoring (old messages signal sustained overload, not bursts), and consumer scaling driven by backlog. Leveling trades immediacy for stability — latency rises during spikes instead of availability collapsing.

The classic mistakes:

- Unbounded queues. Infinite buffering converts spikes into ever-growing latency and memory collapse. Bound depth; shed past it loudly.
- No age tracking. Depth alone hides staleness (a million fresh messages vs a thousand hour-old ones differ critically). Monitor oldest-message age as the SLO signal.
- Autoscaling too slow. Ten-minute scale-up against two-minute spikes arrives after the pain. Pre-warmed minimums plus fast triggers plus shedding for the gap.
- Ordering needs ignored. Leveled queues reorder and delay; order-sensitive flows need partitioning or sequencing preserved explicitly.
- Poison amplification. Bursts include failures; retried poison at high volume multiplies load precisely when capacity strains. Dead-letter fast during spikes.
- Leveling writes that must be synchronous. Payments and bookings needing immediate confirmation can't queue indefinitely. Level deferrable work; confirm critical synchronously.
- Draining unplanned. Post-spike backlogs draining for hours delay normal traffic behind stale surge. Prioritise fresh work post-peak; expire or shed the hopelessly stale.

**How to deploy it:** bounded queues, age-monitored, consumers autoscaled on depth, shedding past bounds, priorities preserved. Bursts become backlogs, not outages — by absorption designed, not luck.
