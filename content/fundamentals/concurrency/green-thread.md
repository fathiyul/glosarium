---
title: "Green Threads / Goroutines"
summary: "Lightweight threads scheduled by the runtime rather than the OS."
levels: { backend: senior, data-engineer: senior }
aliases: ["green threads", "goroutines", "virtual threads"]
prereqs: ["thread", "blocking-vs-non-blocking"]
related: ["thread-pool", "coroutine", "async-await", "context-switch", "scheduler"]
---

**Green threads** (goroutines in Go, virtual threads in Java, and similar constructs elsewhere) are lightweight units of concurrent execution scheduled by the language **runtime**, not the operating system. You can create hundreds of thousands of them, where OS [threads](/t/thread) run into the thousands at most. The runtime multiplexes many green threads onto a smaller pool of OS threads.

Why they're cheap:

- Small stacks that grow as needed, instead of a fixed, large OS thread stack.
- Fast context switches — the runtime switches between them in user space, without a kernel [context switch](/t/context-switch).
- No per-thread kernel object, so creation is just an allocation.

This is what makes "spawn a goroutine per request" practical: the cost of a green thread is close to the cost of an object.

The classic mistakes:

- Assuming green threads mean parallelism. They give you concurrency — many tasks in flight — but the runtime still runs them on a limited number of OS threads (often tied to the number of CPU cores). CPU-bound work doesn't get faster from having more of them (see [Amdahl's law](/t/amdahls-law)).
- Blocking a runtime thread. If a green thread makes a blocking system call that the runtime can't intercept, it can tie up an OS thread and starve others scheduled on it. Runtimes work hard to make blocking calls smart, but this is when concurrency degrades.
- Creating them without bound. "Cheap" isn't "free". A million goroutines each with a growing stack still consume memory, and an unbounded fan-out can overwhelm a downstream service. Bound your concurrency (see [backpressure](/t/backpressure)).
- Confusing them with [coroutines](/t/coroutine). A coroutine suspends at explicit points; a green thread is scheduled more like a thread, with the runtime deciding when to switch. Related, but not the same contract.

Green threads are the engine under async runtimes that let ordinary blocking-style code scale to huge concurrency without callback hell, and they're a big reason languages like Go and newer Java feel simple to write concurrently. Compare with [thread pools](/t/thread-pool) for the older, coarser approach.
