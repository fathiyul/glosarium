---
title: "Deadlock"
summary: "Two or more tasks waiting on each other forever."
levels: { backend: mid-level, frontend: senior, data-engineer: mid-level }
aliases: ["deadly embrace"]
prereqs: ["mutex"]
related: ["mutex", "critical-section", "cancellation", "race-condition"]
---

A deadlock happens when two or more tasks each hold a resource the other needs, and each waits for the other to release it. Neither can move on, so the program stalls, often with no error message.

The classic shape takes two locks acquired in opposite orders:

```python
import threading, time

lock_a = threading.Lock()
lock_b = threading.Lock()

def worker1():
    with lock_a:
        time.sleep(0.1)          # give worker2 time to take lock_b
        with lock_b:             # waits forever if worker2 holds it
            pass

def worker2():
    with lock_b:
        time.sleep(0.1)
        with lock_a:             # waits forever if worker1 holds it
            pass
```

Run it and both threads hang. A reliable fix is a global rule: every task acquires locks in the same order, such as always `lock_a` before `lock_b`. Then no cycle of waiting can form.

The trade-off is that avoiding deadlocks takes discipline across the codebase, and lock order is easy to break in a new feature. Timeouts help detect a deadlock instead of hanging forever: `lock.acquire(timeout=...)` returns `False` when it gives up, so you can log the problem and recover. A timeout doesn't fix the design, though, and retrying the same order will hang again.

The classic mistake is calling into code you don't control while holding a lock, such as a callback or a method that takes another lock. You can't see the order it uses. Keep locked sections small and avoid calling out of them. [Critical sections](/t/critical-section) should contain only the work that needs the lock.
