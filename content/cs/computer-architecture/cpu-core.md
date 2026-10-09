---
title: "CPU Core"
summary: "An independent processing unit; modern CPUs have several."
levels: { backend: junior, frontend: junior }
aliases: ["core", "multi-core", "CPU cores", "threads"]
prereqs: ["cpu"]
related: ["cpu", "concurrency-vs-parallelism", "thread", "process", "gil"]
---

A core is an independent processing unit inside a CPU. A chip with four cores can genuinely run four streams of instructions at the same time. Almost all modern CPUs have several: a phone might have 8, a server dozens.

```python
import os
os.cpu_count()        # logical CPUs the machine reports
```

## Cores vs threads

- A **core** is a physical processing unit.
- Some CPUs offer **hardware threads** (hyper-threading, SMT): one core presents itself as two logical CPUs, sharing its resources. Software sees twice the count, but you don't get twice the speed.
- An operating-system **[thread](/t/thread)** is a software sequence of instructions that the OS schedules onto a core. You can have far more threads than cores, and the OS takes turns.

## Why it matters

Programs only speed up on multiple cores if their work can be split and run in parallel ([concurrency vs parallelism](/t/concurrency-vs-parallelism)). A single-threaded program uses one core, however many exist.

- **Python**: because of the [GIL](/t/gil), threads can't run Python code in parallel. Use multiple [processes](/t/process) for CPU-bound work.
- **JavaScript** runs your code on one thread. Use workers for parallel work.
- **Go, Java, Rust, C#** can use many cores with threads.
- **I/O-bound work** doesn't need many cores. It needs concurrency, such as async.

## Practical points

- **Size thread and process pools** from the core count, but measure.
- **Containers and cloud instances** may be limited to a fraction of a core. A "0.5 CPU" limit throttles a busy program.
- **Shared data between threads** needs care: [race conditions](/t/race-condition), [locks](/t/mutex).
- **More cores don't fix a slow algorithm.**
- Amdahl's law says the part that can't be parallelized limits the speedup ([Amdahl's law](/t/amdahls-law)).
