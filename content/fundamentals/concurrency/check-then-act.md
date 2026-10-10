---
title: "Check-Then-Act Race (TOCTOU)"
summary: "Checking a condition and acting on it as two steps, so something changes in between."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["TOCTOU", "time of check to time of use", "check-then-act"]
prereqs: ["atomic-operation"]
related: ["atomic-operation", "critical-section", "mutex", "race-condition"]
---

A check-then-act race happens when code checks a condition, then acts on it, but another thread or process changes the condition between the two steps. The check was true when it ran, and the action runs on a world that no longer matches it. This is also called a time-of-check to time-of-use (TOCTOU) bug.

A bank balance shows it clearly:

```python
import threading, time

balance = 100

def withdraw(amount):
    global balance
    if balance >= amount:      # check
        time.sleep(0)          # another thread can run here
        balance -= amount      # act, on a balance that may have changed

threads = [threading.Thread(target=withdraw, args=(60,)) for _ in range(2)]
for t in threads: t.start()
for t in threads: t.join()
print(balance)                 # e.g. -20: both checks passed before either withdrawal
```

Both threads see 100, both pass the check, and the account goes negative. The fix is to make the check and the act one unit, usually with a lock around both:

```python
lock = threading.Lock()

def withdraw_safe(amount):
    global balance
    with lock:
        if balance >= amount:
            balance -= amount
```

The trade-off is that holding a lock across the check and the act serializes that code. For a short update, that's cheap. If the critical block includes slow I/O, you've turned a rare bug into a bottleneck. Keep the locked section small.

The same bug appears outside memory, such as checking whether a file exists and then creating it, or checking a seat is free and then booking it in a database. In those cases, use an atomic operation provided by the system, such as an exclusive create or a conditional update, rather than a separate check. [Critical sections](/t/critical-section) explain how to choose the code to lock.
