---
title: "Atomic Operation"
summary: "An operation that completes entirely or not at all, with no interleaving."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["atomic", "atomicity"]
prereqs: ["critical-section"]
related: ["mutex", "check-then-act", "critical-section", "race-condition"]
---

An atomic operation is one that other threads can't observe half-done. Either the whole change happens, or none of it does, and no other thread sees an in-between value. Atomicity is a property of the specific operation a language or library provides, not of a line of code that looks simple.

Here's the difference in practice. A plain increment reads a value, adds one, and writes it back. Two threads can read the same value and both write back the same result, losing one update:

```python
import threading, time

counter = 0
def unsafe_increment():
    global counter
    value = counter
    time.sleep(0)            # lets other threads run between read and write
    counter = value + 1
```

A lock makes the sequence one unit. A language may also offer atomic operations directly. JavaScript's `Atomics.add` on a `SharedArrayBuffer` adds to a shared integer in one indivisible step and returns the previous value:

```javascript
const shared = new Int32Array(new SharedArrayBuffer(4));
Atomics.add(shared, 0, 5);   // returns 0; the stored value is now 5
```

The trade-off is that atomic operations are fast and narrow. They cover single values and a few operations, so anything involving several fields still needs a lock or a different design. Using them correctly also takes care with memory ordering, which is subtle.

The classic mistake is assuming `counter += 1` is atomic because it's one line. In most languages it isn't: it's a read, an add and a write, and the same race can happen. Use a lock or an atomic type where the language provides one, and check the documentation for the specific operation. See [mutex](/t/mutex) for the locking option.
