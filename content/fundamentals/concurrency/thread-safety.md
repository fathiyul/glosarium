---
title: "Thread Safety"
summary: "Code that behaves correctly when called from many threads."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["thread-safe", "concurrency safety"]
prereqs: ["thread"]
related: ["thread", "mutex", "atomic-operation", "check-then-act", "immutability"]
---

Code is thread-safe when it gives correct results no matter how many threads call it at the same time, and in whatever order they run. Correctness here means the data stays consistent: no lost updates, no half-written values, no broken invariants.

Python's `queue.Queue` is designed for this. It's documented as thread-safe, so a producer and a consumer can share it without any extra locking:

```python
import queue, threading

q = queue.Queue()

def producer():
    for i in range(3):
        q.put(i)
    q.put(None)              # signal that there's no more work

results = []
def consumer():
    while (item := q.get()) is not None:
        results.append(item)

threads = [threading.Thread(target=producer), threading.Thread(target=consumer)]
for t in threads: t.start()
for t in threads: t.join()
print(sorted(results))       # [0, 1, 2]
```

Immutable data is thread-safe by nature, because nothing can change it. That's one reason to prefer [immutability](/t/immutability) for values shared between threads.

The trade-off is cost. Locks and other synchronization make code safe but slower, and they add the risk of [deadlock](/t/deadlock). Making every method of a class lock itself isn't always enough either.

The classic mistake is assuming a class is thread-safe because each of its methods is. Two safe methods called in sequence can still race, as in a check followed by an update. That's a [check-then-act](/t/check-then-act) bug. Decide which operations must be atomic together, and protect that whole sequence, not each call on its own.
