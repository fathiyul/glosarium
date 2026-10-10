---
title: "Total Order Broadcast"
summary: "Delivering the same messages in the same order to every node."
levels: { backend: principal, data-engineer: principal }
aliases: ["total order broadcast", "atomic broadcast", "ordered broadcast"]
prereqs: ["consensus", "message-ordering"]
related: ["consensus", "message-ordering", "message-queue"]
---
**Total order broadcast** delivers the same messages in the same order to all recipients: every node sees the identical sequence, enabling replicated state machines (apply the same ordered commands, reach the same state). It's consensus's communication face — ordering agreed before delivery, execution deterministic after.

```text
broadcast m1, m2, m3 → ALL nodes deliver [m1, m2, m3] (same order everywhere)
```

Implementations sequence via a leader (Raft log order), sequencer, or consensus per message/batch; recipients buffer gaps and deliver in order. The guarantee powers replicated logs, deterministic simulation, and any "everyone processes identically" design.

The classic mistakes:

- Assuming FIFO equals total order. Per-sender FIFO doesn't order *across* senders; total order needs agreement, not just transport. Different guarantee, different machinery.
- Gaps mishandled. A missing sequence number blocks delivery indefinitely unless retransmission/failure paths fill or skip explicitly. Buffer with timeouts and recovery.
- Leader/sequencer bottleneck. All ordering through one node caps throughput and creates the failure domain; batching and partitioning (per-shard order) scale it.
- Deterministic execution assumed. Ordered delivery plus nondeterministic handlers (random, wall-clock, local state) still diverges replicas. Determinism must cover handlers, not just delivery.
- Slow-consumer blocking. One lagging recipient stalling global delivery couples everyone to the slowest; bounded buffers with catch-up (snapshots + replay) isolate laggards.
- Confusing with causal order. Total order is stronger (one global sequence) and costlier; causal suffices where only cause-effect matters. Pay for totality only where replicas must match exactly.
- Membership changes mid-stream. Joining/leaving recipients need state transfer aligned to the order (snapshots at sequence points); ad-hoc joins see inconsistent prefixes.

**When to need it:** replicated state machines and deterministic replicas — same order, same logic, same state. Weaker orders serve everywhere exact replication isn't required.
