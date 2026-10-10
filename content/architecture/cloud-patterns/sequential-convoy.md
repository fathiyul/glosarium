---
title: "Sequential Convoy"
summary: "Processing related messages in order while unrelated ones run in parallel."
levels: { backend: senior }
aliases: ["sequential convoy", "convoy effect", "head-of-line convoy"]
prereqs: ["head-of-line-blocking", "message-queue"]
related: ["head-of-line-blocking", "priority-queue-pattern", "bulkhead"]
---
The **sequential convoy** (convoy effect) forms when slow tasks block everyone behind them in a shared ordered queue: one long job stalls thousands of quick ones, throughput collapses to the slowest member's pace, latency explodes for work that needed milliseconds. FIFO fairness becomes collective punishment.

```text
[10ms][10ms][10s][10ms][10ms]… → everyone waits behind the 10s job
```

Cures separate by duration: priority lanes (fast vs slow queues), work-stealing (idle workers take from busy), preemption (pause long tasks for short ones where feasible), and slow-task isolation (dedicated workers for the heavy). Detection is queue-age analysis — old messages behind young ones signal convoying.

The classic mistakes:

- Strict FIFO for mixed durations. Fair ordering with 1000× duration variance punishes the quick universally. Separate lanes by expected duration.
- No timeout on queue residence. Tasks waiting hours silently instead of alerting hide systemic slowness. Age thresholds with alerts and shedding.
- Slow tasks unidentified. Without duration tracking, nobody knows which jobs convoy. Measure per-task durations; classify and route accordingly.
- Preemption assumed impossible. Long tasks checkpointed periodically can yield to short ones (cooperative preemption); design checkpointing into heavy work.
- Adding workers blindly. More consumers behind one ordered queue don't parallelise order — they idle or duplicate. Fix the queue structure, not the worker count.
- Priority without preemption. High-priority arrivals queueing behind running long tasks still wait. Priorities need preemption (or short quanta) to matter.
- Ignoring convoy in design reviews. Mixed-duration workloads sharing queues should trigger lane-separation questions in every review. Ask explicitly.

**The fix:** separate lanes by duration, preempt cooperatively, alert on queue age. FIFO is fair only among equals — mixed work needs lanes, not lines.
