---
title: "Stack vs Heap"
summary: "Short-lived call frames vs dynamically allocated, longer-lived memory."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["the stack", "the heap"]
prereqs: ["variable"]
related: ["pointer", "garbage-collection", "memory-leak", "virtual-machine-runtime"]
---

A program's memory is mainly divided into two regions. The stack holds call frames: the arguments and local variables of each function call. It grows and shrinks as calls start and return, in last-in, first-out order. The heap holds memory the program asks for at runtime, which can outlive the function that created it.

```c
#include <stdlib.h>

int main(void) {
    int local = 5;                    /* on the stack: freed when main returns */
    int *data = malloc(100 * sizeof(int));   /* on the heap: lives until freed */
    if (data == NULL) return 1;
    data[0] = local;
    free(data);                       /* the heap needs an explicit release */
    return 0;
}
```

Stack allocation is very fast, because it's just moving a pointer, and cleanup happens automatically when a function returns. Heap allocation is more flexible, but it's slower, and the memory has to be released somehow, either by your code or by the [garbage collector](/t/garbage-collection).

The trade-off is size and lifetime. The stack has a fixed limit, so deep recursion or very large local arrays can overflow it. The heap is much larger, but leftover allocations accumulate if they're never released, which is a [memory leak](/t/memory-leak).

The classic mistake is putting something on the stack that has to outlive its function, such as returning a pointer to a local. The stack memory is reused after the return. The fix is to allocate on the heap, or to return the value itself. In managed languages, you rarely choose directly, but the same lifetime questions still apply to the objects you create. See [pointers](/t/pointer) for how a program refers to memory in either region.
