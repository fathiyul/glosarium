---
title: "Manual Memory Management"
summary: "Allocating and freeing memory yourself, as in C."
levels: { backend: senior }
aliases: ["manual memory management", "malloc and free", "explicit allocation"]
prereqs: ["pointer", "stack-vs-heap"]
related: ["memory-leak", "garbage-collection", "ownership-borrowing", "dangling-pointer", "reference-counting"]
---

**Manual memory management** means *you* decide when memory is allocated and when it's released, as in C and C++. You ask the allocator for a block (`malloc` in C, `new` in C++), use it, and give it back (`free` / `delete`). The language does nothing behind your back.

```c
int *buf = malloc(100 * sizeof(int));   // allocate
if (!buf) { /* handle failure */ }
/* ... use buf ... */
free(buf);                              // release
buf = NULL;                             // avoid a dangling pointer
```

The upside is control and predictability: no background collector pausing your program, exact knowledge of when memory is returned, and the ability to use arenas and custom allocators tuned to a workload. That's why systems-level and latency-critical code still works this way.

The downside is that every one of the classic memory bugs is now yours to avoid:

- **[Memory leaks](/t/memory-leak)** — allocate and forget to free; memory grows until the process dies.
- [Dangling pointers](/t/dangling-pointer) — use after free, or double free, both undefined behaviour.
- Failure handling — allocation can fail; forgetting to check the result is a crash waiting to happen.
- Mismatched pairing — allocating with one allocator and freeing with another corrupts the heap.

The classic mistakes:

- freeing on one path only. With early returns, error branches and exceptions, it's easy to miss a `free`. This is why C++ uses RAII: a destructor frees automatically when the owning object goes out of scope.
- Losing the only pointer. If the last reference to a block goes out of scope before you free it, the block leaks with no way to reach it.
- Freeing too early. Releasing memory another part of the program still holds.

Modern practice narrows manual management to a minimum: use owning smart pointers or RAII in C++, and prefer languages with [garbage collection](/t/garbage-collection) or [ownership rules](/t/ownership-borrowing) elsewhere. Manual management remains valuable when you need deterministic latency and full control — but it's a sharp tool, and the bugs it invites are exactly what the alternatives exist to remove.
