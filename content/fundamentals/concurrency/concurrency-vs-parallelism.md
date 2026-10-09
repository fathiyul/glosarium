---
title: "Concurrency vs Parallelism"
summary: "Dealing with many things at once vs doing many things at once."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["concurrency and parallelism", "concurrent vs parallel", "parallel vs concurrent"]
prereqs: ["thread", "process"]
related: ["event-loop", "gil", "thread-pool", "async-await", "blocking-vs-non-blocking", "coroutine"]
core: [backend]
---

These two words are often mixed up, and the distinction is useful.

- **Concurrency** is about **structure**: dealing with several tasks at once, with their progress interleaved. A single cook switching between chopping, stirring
  and checking the oven is concurrent.
- **Parallelism** is about **execution**: literally running several things at the **same instant**, on multiple CPU cores. Two cooks working at the same time is parallel.

```
Concurrent (one core, interleaved):   A──B──A──B──A──B
Parallel (two cores, simultaneous):   core 1: A──A──A
                                      core 2: B──B──B
```

You can have concurrency without parallelism: a JavaScript program or a Python `asyncio` program runs on one thread, yet can have thousands of requests in flight, because while one
waits for the network, another proceeds ([event loop](/t/event-loop)). And you can have parallelism without a concurrent design: the same calculation split across
cores.

## Two kinds of work

| Work | Examples | What helps |
|---|---|---|
| **I/O-bound**: spends its time waiting | Network calls, disk, database queries | **Concurrency**: async/await, threads. While one task waits, run another |
| **CPU-bound**: spends its time computing | Image processing, encryption, big calculations | **Parallelism**: more cores, using multiple processes |

Adding concurrency to CPU-bound work on one core doesn't make it faster. Adding more threads to I/O-bound work often does.

## Language details matter

- **Python**: the [GIL](/t/gil) means threads can't run Python bytecode in parallel in the standard implementation. Threads still help with I/O, but for CPU-bound parallelism
  use multiple [processes](/t/process).
- **JavaScript**: one thread for your code. Use [web workers](/t/web-worker) or worker threads for CPU-heavy work.
- **Go, Java, Rust, C#**: real thread-level parallelism.

## Why it matters

Parallelism and concurrency both introduce [race conditions](/t/race-condition) and need care with shared state ([thread safety](/t/thread-safety)). Pick the
model that matches your workload: concurrency to wait efficiently, parallelism to compute faster.
