---
title: "Scheduling Algorithms"
summary: "Round robin, priority and fair scheduling for sharing the CPU."
levels: { backend: senior, data-engineer: senior }
aliases: ["scheduling algorithms", "round robin", "cpu scheduling policy"]
prereqs: ["scheduler", "process"]
related: ["context-switch", "process-priority", "starvation", "thread"]
---

A **scheduling algorithm** is the policy the [scheduler](/t/scheduler) uses to choose the next thread. The choice trades off responsiveness, throughput and fairness, and different algorithms favour different goals.

Common policies:

- First-come, first-served (FCFS) — run in arrival order. Simple, but a long job at the front delays everyone (the convoy effect).
- Round robin — each thread runs for a fixed **time slice**, then goes to the back of the queue. Good responsiveness for interactive work; the slice length trades switching overhead against latency.
- Priority — higher-priority threads run first. Good for urgency, but risks [starvation](/t/starvation) of low-priority work if high-priority work is constant.
- Fair / weighted-fair (like Linux's CFS) — give each thread a proportional share of CPU over time, so nothing starves while still weighting by priority. This is the modern general-purpose default.
- Real-time — guarantees a thread runs within a deadline; used when missing a deadline is a failure (audio, control systems).

```text
round robin:  A B C A B C ...        (equal slices)
priority:     high → high → high ... (low may never run)
weighted-fair: shares met over time  (no starvation, still weighted)
```

The classic mistakes:

- Assuming a smaller time slice is always better. Shorter slices improve responsiveness but increase [context-switch](/t/context-switch) overhead and cache disruption. There's a sweet spot.
- Using strict priority without aging. With constant high-priority work, low-priority threads can starve forever. Fair scheduling or priority aging prevents it.
- Thinking the scheduler is the whole story of performance. Poor algorithm choice in your own code (see [cache locality](/t/cache-locality)) often matters more than which scheduling policy is in play.
- Expecting real-time guarantees from a general-purpose scheduler. A desktop/server scheduler makes no deadline promises; hard real-time needs a specialised system.
- Confusing CPU scheduling with [process priority](/t/process-priority). Nice values *influence* the policy but aren't the policy; the algorithm decides how the hint is used.

Scheduling algorithms are a study in trade-offs: simplicity vs fairness, throughput vs latency, urgency vs starvation. For most applications the OS's default is good; the algorithms matter most when you're designing the OS, tuning a real-time system, or reasoning about why one workload can starve another.
