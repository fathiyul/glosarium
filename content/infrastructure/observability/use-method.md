---
title: "USE Method"
summary: "Utilization, saturation and errors for resources."
levels: { backend: senior, data-engineer: senior }
aliases: ["USE method", "utilization saturation errors", "USE metrics"]
prereqs: ["metrics", "monitoring"]
related: ["red-method", "golden-signals", "load-average", "system-monitoring-tools", "capacity-planning"]
---

The **USE method** is a checklist for monitoring any *resource* — CPU, memory, disk, network interface, a thread pool. For each one, check three things:

- Utilization — how busy it is, as a percentage of capacity: CPU at 70%, disk at 40%.
- Saturation — how much work is queued waiting for it: run-queue length, I/O wait, a full connection pool. This is where trouble shows up first.
- Errors — counts of failures: disk errors, dropped packets, failed allocations.

```text
utilization:  70% busy
saturation:   queue growing        ← the early warning
errors:       non-zero            ← the hard failure
```

It complements the [RED method](/t/red-method), which is for request-driven services. Rule of thumb: **USE for resources, RED for services.** If you're staring at a disk, a network link or a database connection pool, ask utilization, saturation and errors; if you're staring at an API endpoint, ask rate, errors and duration.

The classic mistakes:

- Watching utilization and ignoring saturation. A resource at 100% utilization but with an empty queue is fine; one at 60% with a growing queue is in trouble. Saturation is the leading indicator that something is about to fall over (see [load average](/t/load-average)).
- Applying the wrong method. USE on an HTTP service, or RED on a disk, gives you numbers that don't answer the question. Match the method to the subject.
- Only the obvious resource. The bottleneck is often not CPU: it's a connection pool, a lock, a network link or a disk queue. Check each resource the request path depends on.
- Ignoring errors. Non-zero error counters on a resource are easy to overlook in an average-based graph, yet they mean failures right now.

**How to use it:** when something is slow, walk the resources the request touches and ask the three questions for each, until you find the one that's saturated. It pairs with [per-process tools](/t/system-monitoring-tools) for a single machine and with [capacity planning](/t/capacity-planning) when you're deciding whether to add more. Together, USE and RED cover resources and services — the two halves of a complete first look.
