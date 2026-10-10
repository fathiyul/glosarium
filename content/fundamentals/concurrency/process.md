---
title: "Process"
summary: "A running program with its own memory space."
levels: { backend: mid-level, frontend: senior, data-engineer: mid-level }
aliases: ["OS process", "child process"]
prereqs: ["thread"]
related: ["thread", "gil", "mutex", "coroutine"]
---

A process is a running program with its own memory space. The operating system keeps each process separate, so one process can't read or write another's variables by accident. That isolation makes processes safer than threads, which share one memory space within a process.

Python's `multiprocessing` runs work in separate processes, each with its own interpreter:

```python
from multiprocessing import Pool

def square(x):
    return x * x

if __name__ == "__main__":        # required on platforms that start new processes by re-importing
    with Pool(2) as pool:
        print(pool.map(square, [1, 2, 3]))   # [1, 4, 9]
```

Because each process has separate memory, data has to be passed between them, usually by copying it through pipes or queues. Nothing is shared by default, which is why the code above needs no locks.

The trade-off is cost against isolation. Starting a process is heavier than starting a thread, and moving data between processes costs time. Each process also uses its own memory. In return, a crash in one process doesn't corrupt the others, and CPU-heavy work can use several cores without fighting over the interpreter lock (see the [GIL](/t/gil) concept).

The classic mistake is starting a process pool for tiny tasks, where the setup and copying cost more than the work itself. Pool size should match the cores or the work available, and the work per task should be large enough to justify the overhead. Shared state between processes needs explicit mechanisms, and [mutexes](/t/mutex) don't protect memory that isn't shared.
