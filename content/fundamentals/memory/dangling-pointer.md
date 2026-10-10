---
title: "Dangling Pointer"
summary: "A pointer to memory that has already been freed."
levels: { backend: senior }
aliases: ["dangling pointer", "use-after-free", "stale pointer"]
prereqs: ["pointer", "manual-memory-management"]
related: ["memory-leak", "stack-vs-heap", "reference-counting", "ownership-borrowing"]
---

A **dangling pointer** points at memory that is no longer valid — usually because it was freed, or because it pointed at a variable that has gone out of scope. The pointer still holds an address, but that address no longer belongs to you. Reading or writing through it is **use-after-free**: undefined behaviour.

```c
int *p = malloc(sizeof(int));
*p = 42;
free(p);
printf("%d\n", *p);   // p is dangling: undefined behaviour
```

What actually happens is unpredictable. The memory may still hold the old value (and the bug hides), may have been reused for something else (silent corruption), or may be unmapped (a crash). Because it can be exploited — the freed memory may be reallocated with attacker-controlled data — use-after-free is a common security vulnerability, not just a stability bug.

The classic mistakes:

- Using a pointer after `free`. The fix is discipline: null the pointer or restructure ownership so nothing holds it after release.
- Returning a pointer to a local variable. A pointer to a stack local becomes dangling the moment the function returns; the memory is reused by the next call.
- Use after `realloc`. `realloc` may move the block; the old pointer is now dangling. Always use the returned pointer.
- Double free. Freeing the same block twice corrupts the allocator's bookkeeping and often leads to exploitation.
- Assuming it will crash. The dangerous cases are the ones that *don't* crash — they corrupt data quietly.

Defences: memory-safe languages, `unique_ptr`/`shared_ptr` and RAII in C++, or owning types like [Rust's ownership](/t/ownership-borrowing) that make the compiler reject use-after-free statically. Where you must manage memory by hand, keep allocation and freeing close together and null pointers after release. It's the flip side of a [memory leak](/t/memory-leak): one holds memory too long, the other frees it too early.
