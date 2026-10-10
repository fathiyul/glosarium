---
title: "Lock-Free Data Structures"
summary: "Concurrent structures built from atomic operations instead of locks."
levels: { backend: principal, data-engineer: principal }
aliases: ["lock-free", "lock free data structures", "non-blocking algorithm"]
prereqs: ["atomic-operation", "thread-safety"]
related: ["mutex", "race-condition", "memory-model", "deadlock", "cpu"]
---

A **lock-free** data structure is one that multiple threads can use concurrently *without* a lock, built instead from **atomic operations** — most importantly **compare-and-swap (CAS)**, which atomically sets a value only if it still holds an expected old value. The defining property is progress: if one thread is delayed or paused, the others can still make progress. A lock can't promise that; if the lock owner stalls, everyone waiting on the lock stalls too.

```text
CAS(address, expected, new):
  if *address == expected: *address = new; return success
  else: return failure   (someone changed it first)

# update by retrying until your CAS succeeds
loop:
  old = load(counter)
  if CAS(counter, old, old + 1): break
```

That retry loop is the shape of most lock-free code: read, compute, attempt CAS, retry if someone beat you. Queues, stacks and counters are commonly implemented this way.

The classic mistakes:

- Assuming lock-free means faster. It usually doesn't in the common case — a correct lock-free structure is more complex, touches shared cache lines heavily, and can be *slower* than a simple lock under low contention. Its value is progress and predictability under contention, not raw speed.
- The ABA problem. CAS checks a value, but a value can change from A to B and back to A between the read and the CAS; the CAS "succeeds" even though the world changed. Solutions use version tags or hazard pointers. This bug is subtle and dangerous.
- Ignoring memory ordering. Atomicity isn't the same as visibility. Without the right ordering, other threads may not see your writes when you think they should (see the [memory model](/t/memory-model)).
- Memory reclamation is hard. Knowing when it's safe to free a node another thread might still be reading is one of the hardest parts. Garbage-collected languages dodge it; manual ones use epoch or hazard-pointer schemes.
- Reaching for it too early. For most code, a [mutex](/t/mutex) is correct and clear. Lock-free is a specialist tool for hot paths and real contention.

Use lock-free structures via well-tested libraries, not hand-rolled attempts. Getting them right requires understanding atomics, ordering and reclamation together — which is exactly what makes them an advanced, error-prone area rather than a default choice.
