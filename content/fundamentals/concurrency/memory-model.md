---
title: "Memory Model"
summary: "The rules for when writes by one thread become visible to others."
levels: { backend: principal, data-engineer: principal }
aliases: ["memory model", "happens-before", "memory consistency"]
prereqs: ["thread-safety", "atomic-operation"]
related: ["race-condition", "mutex", "lock-free", "cpu", "cpu-cache"]
---

A **memory model** is the set of rules a language or hardware defines for how memory operations by one thread become visible to another. It's the answer to a question that seems obvious and isn't: if thread A writes a variable, when can thread B be sure to see the new value?

The reason it's not obvious is that real machines and compilers reorder and cache. For performance, the CPU may execute instructions out of program order, keep values in per-core caches, and defer writes. The compiler may likewise reorder. Without a defined model, "A wrote, then B read" could behave in ways your source code never suggested.

The central concept is **happens-before**: a partial ordering that says when one operation is guaranteed to be visible to another. A few common sources of happens-before:

- releasing a lock and then another thread acquiring it (see [mutex](/t/mutex));
- an atomic operation with the right ordering (acquire/release);
- a thread starting or joining another.

```text
thread A: x = 42;  release(lock)
thread B: acquire(lock); read(x)   → guaranteed to see 42
```

The classic mistakes:

- Assuming program order is visible order. One thread's writes aren't visible to another just because they came first in the source. You need synchronisation to establish happens-before.
- Using a plain (non-atomic) variable for sharing. A data race on a non-atomic variable is undefined behaviour in languages like C++ and Java — the compiler is allowed to do surprising things. Share state through locks or atomics.
- Atomic without ordering. Making an operation atomic stops it tearing, but doesn't necessarily make surrounding writes visible. You still need the correct memory ordering (acquire/release/seq-cst), which differ in strength and cost.
- Reasoning about the hardware you know. x86 is fairly strong; other architectures reorder more aggressively. Write to the language's model, not to one CPU's habits.
- Testing to find races. Data races are timing-dependent and can hide for years. Use the model and tools (thread sanitisers), not luck.

The memory model is why [lock-free](/t/lock-free) code is hard, why [mutexes](/t/mutex) and atomics exist, and why "it worked on my machine" is meaningless for concurrent code. Understand the model of your language before sharing data across threads.
