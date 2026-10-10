---
title: "Thread Pool"
summary: "A fixed set of reusable worker threads."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["worker pool", "ThreadPoolExecutor"]
prereqs: ["thread"]
related: ["thread", "thread-safety", "process", "deadlock"]
---

A thread pool is a fixed set of worker threads that stay alive and take tasks from a queue. Instead of creating a thread for each task, you submit the task to the pool, and a free worker runs it. Creating threads is costly, so reusing them is faster and keeps the number of threads under control.

Python's `concurrent.futures` provides one:

```python
from concurrent.futures import ThreadPoolExecutor

def fetch(n):
    return n * 10

with ThreadPoolExecutor(max_workers=3) as pool:
    results = list(pool.map(fetch, [1, 2, 3]))

print(results)   # [10, 20, 30]
```

The `max_workers` value is the main setting. It caps how many tasks run at once, which protects the database, the network or the memory from being overwhelmed.

The trade-off is sizing and waiting. Too few workers leaves work queued. Too many brings back the cost of unbounded threads. A pool also makes tasks depend on each other: if a task submits another task to the same pool and then waits for it, every worker can end up waiting, and the program stalls. That's a form of [deadlock](/t/deadlock).

The classic mistake is treating the pool as an unlimited queue. If tasks arrive faster than they finish, the queue grows without bound and memory climbs. Bound the queue, or reject work when it's full, and measure how long tasks wait. For CPU-heavy work in Python, a process pool is usually the better fit, as described in [processes](/t/process).
