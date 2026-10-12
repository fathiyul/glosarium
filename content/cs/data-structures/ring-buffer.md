---
title: "Ring Buffer"
summary: "A fixed-size buffer that wraps around."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["ring buffer", "circular buffer", "circular queue"]
prereqs: ["queue", "array"]
related: ["producer-consumer", "linked-list", "lock-free"]
---

A **ring buffer** (circular buffer) is a **fixed-size** buffer that reuses its space by wrapping around. You keep two positions — where the next item is written and where the next is read — and when either reaches the end, it loops back to the start. When the buffer is full, new writes overwrite the oldest data (or block, depending on the policy).

```text
size 5:  [ a b c d e ]   write f → overwrites a:  [ f b c d e ]
          ▲ read                 read moves to b, write wraps to f
```

Because the memory is allocated once and never grows, a ring buffer is extremely efficient: no allocation, no shifting, predictable memory use, and cache-friendly sequential access. The trade-off is that it holds only the most recent N items.

It's everywhere data arrives as a stream and you only care about the recent window:

- Logs and telemetry — keep the last N events in memory.
- Audio and video — a buffer between the producer and the consumer, so playback is smooth despite jitter.
- Networking — per-connection receive/transmit buffers.
- Lock-free queues — a single-producer/single-consumer ring is a classic lock-free structure (see [lock-free](/t/lock-free)).

The classic mistakes:

- Forgetting to distinguish full from empty. A naive head/tail check makes a full buffer look empty (both pointers equal). Track the count, or leave one slot unused, to tell them apart.
- Assuming it grows. It doesn't, by design. If you need unbounded growth, a ring buffer is the wrong tool — use a growable [queue](/t/queue) and add [backpressure](/t/backpressure).
- Overwriting without noticing. Silent overwrite of unread data is fine for logs and disastrous for commands. Match the overwrite policy to the use case — drop, block, or error.
- Ignoring concurrency. A shared ring buffer needs synchronisation; only carefully designed single-producer/single-consumer variants are lock-free. Don't assume.
- Off-by-one at the wrap. The wrap-around arithmetic is where bugs hide; test the boundaries.

A ring buffer is the right structure when the data is a stream and the interesting part is the recent window: constant memory, no allocation, and locality-friendly. It's a small idea — wrap the ends — that underpins a lot of streaming and I/O code. (A circular buffer is the same thing.)
