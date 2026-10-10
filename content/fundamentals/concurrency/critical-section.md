---
title: "Critical Section"
summary: "Code that must not run concurrently with itself."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["critical region"]
prereqs: ["mutex"]
related: ["mutex", "atomic-operation", "check-then-act", "deadlock"]
---

A critical section is a piece of code that touches shared state and must not run in two threads at the same time. Two threads running inside it can read and write the same data in an order that gives wrong results. Protecting the section means letting only one thread inside at a time.

The usual way is a [mutex](/t/mutex) around the code:

```python
import threading

lock = threading.Lock()
counter = 0

def add_one():
    global counter
    with lock:                   # the critical section: read and write as one unit
        value = counter
        counter = value + 1
```

Two things decide whether a section is critical. It must touch state that other threads can reach, and at least one of those accesses must write. Code that works only on its own local variables doesn't need a lock.

The trade-off is that a critical section serializes the work inside it. Keep it short. Doing slow I/O, network calls or heavy computation while holding the lock makes every other thread wait, which can erase the benefit of having threads at all.

The classic mistake is drawing the boundary too narrowly, locking one line of a multi-step update, so the other steps can still interleave. The opposite mistake is drawing it too widely and holding the lock across I/O. Lock the whole update that must stay consistent, and nothing else. [Check-then-act races](/t/check-then-act) show what happens when the boundary is wrong.
