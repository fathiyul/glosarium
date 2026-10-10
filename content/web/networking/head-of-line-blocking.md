---
title: "Head-of-Line Blocking"
summary: "One slow item holding up everything queued behind it."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["head-of-line blocking", "hol blocking", "head of line blocking"]
prereqs: ["tcp", "http-1-1"]
related: ["http-2", "quic", "http-3"]
---

**Head-of-line blocking (HOL)** is what happens when ordered delivery meets a single queue: one lost packet, one slow response, one stalled task holds up everything behind it — even work that's ready. It appears at every layer: TCP (one lost segment stalls the whole connection's stream), HTTP/1.1 (one slow response blocks the connection), and application queues (one slow job blocks the workers behind it).

```text
packets:  1 2 [3 lost] 4 5 → all wait; app sees nothing until 3 retransmits
```

Each generation of protocol design is partly a HOL story: HTTP/1.1 keep-alive still serialised per connection → HTTP/2 multiplexed streams (fixing HTTP-layer HOL) → but TCP loss still stalled *all* streams → QUIC/HTTP/3 giving each stream independent delivery. Same problem, pushed down a layer at a time.

The classic mistakes:

- Assuming h2 fixed it all. HTTP/2 fixed HTTP-layer blocking; TCP-layer blocking remains on lossy paths. The residual is exactly what HTTP/3 addresses.
- One connection for mixed priorities. Critical API calls sharing a connection with bulk downloads stall behind them. Separate priorities onto separate connections (or proper stream prioritisation).
- Application-level HOL. A single ordered work queue where one poison job blocks thousands behind it is the same bug in your code. Partition, dead-letter, and parallelise.
- Ignoring loss. HOL only bites when something stalls — on clean networks it's invisible, on lossy ones it dominates. Measure under realistic loss.
- Bufferbloat-adjacent thinking. Oversized buffers delay loss signals, stretching stalls. Size queues to detect and recover, not to hide.
- Fixing the wrong layer. Multiplexing the app while TCP HOL dominates (or vice versa) wastes effort. Identify which queue actually stalls first.

**The pattern:** wherever order is enforced over a shared channel, the slowest unit sets the pace. The fixes rhyme — independent streams, partitioning, isolation of priorities — at every layer from packets to job queues.
