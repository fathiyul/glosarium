---
title: "CPU Scheduler"
summary: "How the OS decides which thread runs next."
levels: { backend: senior, data-engineer: senior }
aliases: ["cpu scheduler", "os scheduler", "process scheduler"]
prereqs: ["process", "thread"]
related: ["scheduling-algorithms", "context-switch", "process-priority", "load-average", "interrupt"]
---

The **CPU scheduler** is the part of the [kernel](/t/kernel-os) that decides which runnable thread gets the CPU next. On a machine with one core, only one thread truly runs at a time; the scheduler shares the core among many, switching fast enough that they appear simultaneous. On a multi-core machine, it also decides how to spread threads across cores.

Its goals pull against each other:

- Fairness — no thread should be starved ([starvation](/t/starvation)).
- Throughput — get as much total work done as possible.
- Latency — keep interactive and time-sensitive work responsive.
- Utilisation — keep the CPU busy.

A general-purpose scheduler balances all four; a specialised one might favour latency (real-time systems) or throughput (batch).

It's driven by **preemption**: a timer [interrupt](/t/interrupt) fires periodically, and the scheduler can take the CPU away from a running thread to give it to another. That's what lets a runaway CPU-bound program not lock the machine. The action of swapping one thread out for another is a [context switch](/t/context-switch).

```text
runnable threads ──▶ scheduler picks by policy ──▶ one runs
timer interrupt ──▶ maybe preempt ──▶ pick again
```

The classic mistakes:

- Assuming "more threads = faster". The scheduler runs as many as there are cores; extra runnable threads just wait their turn. CPU-bound work doesn't speed up with more threads than cores (see [Amdahl's law](/t/amdahls-law)).
- Confusing nice with a guarantee. [Priority](/t/process-priority) is a hint, not a reservation; a high-priority thread still waits if nothing is preemptible.
- Reading high load as "many running". The [load average](/t/load-average) counts *waiting* threads too — including those blocked on I/O — so it can be high with the CPU mostly idle.
- Ignoring scheduler overhead. With very many threads, switching and bookkeeping cost real CPU. Too many threads can be slower than a bounded pool.
- Confusing it with the Kubernetes scheduler. That one places *pods onto nodes*, not threads onto CPUs. Same word, different layer.

The scheduler is why a machine with one core runs hundreds of processes "at once", and why a program can hog the CPU yet still let you type. It's supported by [scheduling algorithms](/t/scheduling-algorithms), priorities, and preemption via interrupts.
