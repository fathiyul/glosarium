---
title: "Thread"
summary: "An execution path within a process that shares its memory."
levels: { backend: mid-level, frontend: senior, data-engineer: mid-level }
aliases: ["OS thread", "threading"]
prereqs: ["process"]
related: ["process", "thread-pool", "thread-safety", "mutex"]
---

A thread is one path of execution inside a process. A process can run several threads at once, and they all share the same memory: the same variables, objects and open files. That sharing is cheap and convenient, and it's also where most concurrency bugs come from.

```python
import threading

def job(name):
    print(f"{name} running on {threading.current_thread().name}")

threads = [threading.Thread(target=job, args=(f"job-{i}",)) for i in range(2)]
for t in threads:
    t.start()
for t in threads:
    t.join()   # wait for each thread to finish
```

Threads are cheaper to create than processes, and they can share data without copying it. That suits work that spends most of its time waiting, such as network calls or disk reads, because one thread can wait while others make progress.

The trade-off is that shared memory has no built-in rules. Two threads that write to the same object can interleave their steps, which is why [thread safety](/t/thread-safety) and [mutexes](/t/mutex) exist. Creating a thread also has a cost, so starting one per request doesn't scale. For CPU-heavy Python work, the [GIL](/t/gil) limits what threads can do, and separate processes may be the better choice.

The classic mistake is starting an unbounded number of threads, one for every incoming task. The machine runs out of memory or spends its time switching between threads. Use a [thread pool](/t/thread-pool) with a fixed size, and keep the shared state small and well protected.
