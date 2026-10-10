---
title: "Heartbeat"
summary: "Periodic \"I'm alive\" signals used to detect failed nodes."
levels: { backend: senior, data-engineer: senior }
aliases: ["heartbeat", "heartbeats", "liveness signal"]
prereqs: ["gossip-protocol", "failover"]
related: ["service-discovery", "lease", "gossip-protocol"]
---
A **heartbeat** is a periodic "I'm alive" signal: processes, replicas and devices emit them; watchers declare death after silence exceeds a threshold. Load balancers, cluster managers, leader leases and presence systems all run on heartbeats — liveness inferred from continued arrival.

```text
beat…beat…beat…(silence > timeout)… → presumed dead → failover/replace
```

The threshold trades detection speed against false positives: tight timeouts fail over fast and flap on every GC pause; loose ones ride out blips while users wait. Adaptive thresholds (phi-accrual, suspicion levels) split the difference by modelling arrival distribution instead of fixed cutoffs.

The classic mistakes:

- Fixed aggressive timeouts. Declaring death after one missed beat turns every pause into failover churn. Timeouts must exceed worst-case pauses (GC, network blips, deploys).
- Heartbeats on the data path. Sharing fate with traffic means congestion kills liveness signals first — exactly when accurate detection matters. Separate control channels where feasible.
- No authentication. Spoofed or replayed heartbeats keep dead nodes "alive" or kill live ones. Sign liveness traffic.
- Cascading failure detection. A slow detector triggering mass failover (thundering herd to standbys) converts one failure into many. Damp detection (hold-downs, staged failover).
- Confusing silence with death. Partitioned-but-alive nodes keep beating unheard; fencing (not just detection) prevents their continued action.
- Missing heartbeats as the only signal. Complement with active probes and application-level checks — a beating process can still serve errors.
- Unmonitored monitor. The watcher itself failing silently freezes all detection. Watch the watchers (quorum, mutual checks).

**How to tune it:** thresholds from measured pause distributions, suspicion before conviction, fencing after detection, watchers watched. Liveness is inference — engineer its uncertainty explicitly.
