---
title: "Context Switch"
summary: "The CPU switching between threads or processes, and what it costs."
levels: { backend: senior, data-engineer: senior }
aliases: ["context switch", "thread switch", "task switch"]
prereqs: ["scheduler", "thread"]
related: ["process", "cpu-registers", "cache-locality", "interrupt", "thread-pool"]
---

A **context switch** is the act of taking the CPU away from one task and giving it to another. The scheduler saves the outgoing task's state — [registers](/t/cpu-registers), program counter, stack pointer — and loads the incoming task's saved state, so each resumes where it left off. It's what makes many threads and processes appear to run at once on limited cores.

```text
task A running → save A's registers → pick B → load B's registers → B runs
```

There are two costs, and the second is the usually-underestimated one:

- **The direct cost** — saving and restoring state, and the scheduler's own bookkeeping. Measurable but modest.
- The indirect cost — the incoming task finds the CPU caches full of the *other* task's data, so its first accesses miss. A process switch also reloads page-table state (and can flush TLB entries), which is costlier than a thread switch within a process. This "cold cache" effect is often far bigger than the switch itself.

That's why "just use more threads" isn't free: beyond the number of cores, extra threads add switching and cache disruption without adding parallel work.

The classic mistakes:

- Assuming a context switch is cheap. It isn't free, and its main cost is the cache pollution that follows. Heavy switching shows up as high CPU with low useful work.
- Over-subscribing threads. Thousands of runnable threads on a few cores spend their time switching rather than computing. Bound concurrency to roughly the core count for CPU-bound work.
- Confusing threads with [green threads](/t/green-thread). A runtime-scheduled green-thread switch is cheaper than an OS context switch because it stays in user space — but the cache effect remains.
- Ignoring it in latency budgets. Frequent switching adds jitter to response times; a thread can wait behind others before running.
- Thinking blocking is free. A thread blocked on I/O is switched out and later back in; the scheduler's work is the price of the block-and-wake model (see [async-await](/t/async-await) and [epoll/kqueue](/t/epoll-kqueue) for ways to avoid per-connection threads).

Context switching is the mechanism behind concurrency on shared CPUs, and its cost — especially cold caches — is a key reason that scheduling and thread-pool sizing matter. See the [scheduler](/t/scheduler) and [cache locality](/t/cache-locality).
