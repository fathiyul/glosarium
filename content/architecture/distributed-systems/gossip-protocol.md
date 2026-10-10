---
title: "Gossip Protocol"
summary: "Nodes spreading information by talking to random peers."
levels: { backend: senior, data-engineer: senior }
aliases: ["gossip protocol", "epidemic protocol", "gossip dissemination"]
prereqs: ["cap-theorem", "eventual-consistency"]
related: ["service-discovery", "eventual-consistency", "heartbeat"]
---
A **gossip protocol** spreads information epidemically: each node periodically shares state with a few random peers, who share onward — reaching the whole cluster in logarithmic rounds with no centre, no broadcast storm, and graceful degradation under churn and partitions.

```text
round 1: A tells B, C tells D → round 2: B tells E… → all know within O(log n)
```

Uses cluster around membership (who's alive — see SWIM-style failure detectors), metadata propagation (schema versions, config), and anti-entropy (comparing and repairing divergent replicas). Delivery is probabilistic and unordered — perfect for "everyone roughly knows soon," useless for "exactly this value now."

The classic mistakes:

- Gossip for consensus. Agreement needs majorities, not rumours; gossip disseminates, consensus decides. Different problems, different protocols.
- Unbounded payload gossip. Full state per round explodes bandwidth; gossip digests and deltas, fetching full state only on difference.
- Ignoring convergence time. "Eventually" spans seconds to minutes depending on fanout and interval; systems needing faster convergence need direct channels alongside.
- No suspicion mechanism. Binary alive/dead from missed gossip flaps constantly; suspicion levels with timeouts (SWIM) distinguish slowness from death.
- Partition blindness. Gossip within a partitioned side converges locally and diverges globally — correct behaviour, but consumers must know which side they're hearing.
- Security vacuum. Unauthenticated gossip lets anyone inject membership and metadata. Sign and authenticate peer traffic.
- Tuning defaults forever. Interval, fanout and timeout suit the cluster's size and network; defaults fit the median, not your tail.

**When to use it:** membership, failure detection and metadata dissemination at scale — decentralised, robust, eventually consistent. For decisions and exact values, pair with consensus, not gossip.
