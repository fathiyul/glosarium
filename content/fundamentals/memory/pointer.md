---
title: "Pointer"
summary: "A variable that holds a memory address."
levels: { backend: mid-level }
aliases: ["pointers", "memory address"]
prereqs: ["variable"]
related: ["stack-vs-heap", "garbage-collection", "memory-leak", "reference-counting"]
---

A pointer is a variable whose value is a memory address, the location of some other value. Pointers let code refer to data without copying it, and they let a function change a caller's data. Languages such as C and C++ expose them directly. Most higher-level languages hide them behind references.

```c
#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;        /* p holds the address of x */
    *p = 99;            /* write through the pointer */
    printf("%d\n", x);  /* prints 99 */
    return 0;
}
```

The `&` takes an address and the `*` reads or writes through it. Passing `p` to a function gives the function access to `x` without copying the whole value.

The trade-off is power against safety. Pointers allow fast, direct memory access, but the compiler can't always check that the address is valid. A pointer can refer to memory that's been freed, or to a local variable whose lifetime has ended. C compilers can warn about some of these, but not all.

The classic mistake is returning a pointer to a local variable. The local is gone when the function returns, so the caller holds a pointer to memory that may be reused. Compilers often warn about this, and you should treat the warning as a bug. The same risk exists for memory on the [heap](/t/stack-vs-heap): freeing it and then using the pointer is a use-after-free. [Garbage collection](/t/garbage-collection) removes this class of bug for you, at the cost of less direct control.
