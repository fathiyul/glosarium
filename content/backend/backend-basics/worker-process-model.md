---
title: "Worker and Process Models"
summary: "Pre-fork workers, threads or an event loop: how a server handles many requests at once."
levels: { backend: senior }
aliases: ["worker model", "process model", "concurrency model"]
prereqs: ["application-server", "process"]
related: ["green-thread", "thread-pool", "context-switch", "backpressure"]
---

A **worker and process model** is how a server organises concurrent request handling: how many OS processes or threads it runs, and how work is distributed among them. The choice shapes throughput, memory, crash isolation and how you tune the service under load.

Common models:

- One process per core (pre-fork). The server forks N workers, one per CPU core, each handling requests independently. Good CPU use and crash isolation (one worker dying doesn't kill the rest).
- Threads within a process. A process runs a [thread pool](/t-thread-pool); threads share memory so they're lighter than processes, but sharing brings [race conditions](/t/race-condition) and one bad thread can affect the process.
- Async / event loop. One process handles many connections concurrently without a thread each, using non-blocking I/O (see [epoll/kqueue](/t/epoll-kqueue) and [green threads](/t/green-thread)). Great for I/O-bound workloads and many idle connections.
- Hybrid. Several async workers, one per core — combining multi-core use with high per-worker concurrency.

```text
process-per-core: N independent workers    (CPU-bound, isolation)
async:            one loop, many connects  (I/O-bound, high concurrency)
hybrid:           async workers per core
```

The classic mistakes:

- Blocking the event loop. In an async model, one synchronous call (a blocking DB driver, a heavy computation) stalls every connection on that worker. Keep handlers non-blocking or offload the work.
- More threads than the work needs. Beyond the core count, CPU-bound threads just add [context switches](/t/context-switch) and cache churn without going faster (see [Amdahl's law](/t/amdahls-law)).
- Ignoring the downstream limit. Ten thousand concurrent workers hammering a database with 100 connections creates a queue at the database, not speed. Bound concurrency ([backpressure](/t/backpressure)).
- One worker. A single worker can't use multiple cores and is a single point of failure. Run several.
- Choosing without measuring. Whether the workload is CPU-bound or I/O-bound decides which model fits; measure before committing.

**How to size it:** match the model to the workload — process-per-core for CPU-bound, async for many I/O-bound connections — then cap concurrency to what the downstream can take. The right model plus sensible limits is most of what "handles load well" means.
