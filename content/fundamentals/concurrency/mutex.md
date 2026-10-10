---
title: "Mutex / Lock"
summary: "Ensuring only one thread enters a critical section at a time."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["mutex", "lock", "mutual exclusion"]
prereqs: ["process"]
related: ["critical-section", "atomic-operation", "deadlock", "check-then-act"]
---

A mutex, short for mutual exclusion, is a lock that only one thread can hold at a time. A thread acquires it before entering a [critical section](/t/critical-section) and releases it on the way out. Any other thread that tries to acquire it waits until the lock is free.

```python
import threading

balance_lock = threading.Lock()
balance = 100

def withdraw(amount):
    global balance
    with balance_lock:           # only one thread at a time past this line
        if balance >= amount:
            balance -= amount
```

The `with` form releases the lock even if an exception is raised, which is why it's safer than manual `acquire` and `release` calls.

Python's `threading.Lock` is not reentrant: a thread that already holds it and tries to acquire it again will wait forever. `threading.RLock` lets the same thread acquire it more than once, which helps when a locked method calls another locked method. Reentrant locks are convenient, but they can hide the fact that a function is being called while the lock is held.

The trade-off is contention. Locks serialize access, so heavily shared locks become bottlenecks, and each acquisition has a small cost. Locks also bring the risk of [deadlock](/t/deadlock) when several are involved. A single lock around a small piece of shared state is usually the simplest correct choice.

The classic mistake is protecting some accesses to a variable but not others. The unlocked read still races with the locked write, and the bug only shows up under load. Every read and write of that shared state should go through the same lock. For operations a single atomic step can handle, [atomic operations](/t/atomic-operation) avoid the lock altogether.
