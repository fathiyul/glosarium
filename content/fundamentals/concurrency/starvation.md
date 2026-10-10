---
title: "Starvation"
summary: "A task never gets the resources it needs to run."
levels: { backend: senior, data-engineer: senior }
aliases: ["starvation", "resource starvation", "thread starvation"]
prereqs: ["scheduler", "deadlock"]
related: ["livelock", "thread-safety", "process-priority", "rate-limiting", "mutex"]
---

**Starvation** is when a task can never get the resources it needs to run, even though the system as a whole keeps making progress. It's not stuck (like a [deadlock](/t/deadlock)) and it's not busy-spinning (like a [livelock](/t/livelock)); it's simply never chosen. Other work is always served first, and this task waits indefinitely.

```text
high-priority work arrives continuously → low-priority task never runs
lock handed repeatedly to a fast thread → slow thread never acquires it
```

Typical causes:

- **Unbounded priority.** Strict priority scheduling lets a stream of high-priority tasks starve everything below them. The higher class must have a limit or a share of time.
- Unfair locks. A lock that doesn't queue fairly can let one thread repeatedly re-acquire it while others wait forever.
- Long-held resources. One task holding a shared resource for a very long time blocks everyone behind it.
- Resource quotas. A pool of connections consumed by heavy users can leave a small user permanently waiting.

The classic mistakes:

- Confusing it with deadlock or livelock. Three different shapes: deadlock = blocked and idle; livelock = busy but no progress; starvation = progress overall, but *this* task never gets its turn. The remedy differs for each.
- Assuming lower priority means "eventually". Under strict priority, "eventually" can be "never". If a task must run, it needs a guaranteed share, not just a lower class.
- Trusting locks to be fair. Many mutexes aren't fair by design, because fairness costs throughput. If a task must make progress, add fairness or timeouts.
- Fixing it with more resources. More capacity can ease contention but doesn't solve unfairness — the same task can still be passed over.

Fixes target fairness: bound the high-priority class, use fair/queued locks, add aging (gradually raise a waiting task's priority), or give each task a guaranteed slice. It shows up plainly in [scheduling](/t/scheduler) and [process priority](/t/process-priority), and in any queue where a few producers can monopolise a shared pool. The goal is progress for *every* task, not just the system overall.
