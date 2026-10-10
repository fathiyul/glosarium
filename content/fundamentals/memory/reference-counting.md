---
title: "Reference Counting"
summary: "Freeing an object when nothing refers to it anymore."
levels: { backend: senior, frontend: senior }
aliases: ["reference counting", "refcount", "reference count"]
prereqs: ["garbage-collection", "pointer"]
related: ["weak-reference", "memory-leak", "ownership-borrowing", "shallow-vs-deep-copy"]
---

**Reference counting** is a memory-management strategy that keeps a count of how many references point to each object. When you create a reference, the count goes up; when one goes away, it goes down. When the count reaches zero, the object is freed immediately.

```text
obj = new()        refcount = 1
a = obj            refcount = 2
b = obj            refcount = 3
b = null           refcount = 2
a = null           refcount = 1
obj = null         refcount = 0  → freed now
```

It's used in Python, Swift (ARC), Objective-C, and Rust's `Rc`/`Arc`. Its big advantage over a tracing [garbage collector](/t/garbage-collection) is **determinism**: an object is reclaimed the moment its last reference disappears, with no separate collection pass and no wait. For latency-sensitive systems and for resources like file handles, that immediacy is valuable.

The classic mistakes:

- Reference cycles leak. If A holds a reference to B and B holds one to A, neither count ever reaches zero, and both stay alive forever — even though nothing external can reach them. This is *the* weakness of pure reference counting, and the reason tracing collectors exist. Break cycles with [weak references](/t/weak-reference).
- Overhead on every assignment. Each pointer copy updates a counter, which for a shared object across threads means atomic operations and cache traffic. A hot loop copying references can spend real time on bookkeeping.
- Thread safety of the counter. A non-atomic refcount updated from multiple threads can corrupt and cause double-free. Shared counting needs atomics (Rust's `Arc` versus single-threaded `Rc`).
- Assuming it's free of pauses. Refcounting has no big pause, but it can free a large tree recursively at the drop of the last reference, causing a surprise delay. Releasing a huge structure isn't instant.
- Confusing it with garbage collection. They're both automatic reclamation, but by different means: counting tracks liveness continuously; tracing collectors find unreachable objects in batches.

In practice, reference counting and tracing are often combined — a tracing collector to reclaim cycles, or refcounting with cycle detection. The design question is whether you need deterministic release (counting) or freedom from cycles and per-assignment overhead (tracing). It's a middle point between [manual management](/t/manual-memory-management) and a full GC.
