---
title: "Virtual Memory"
summary: "Each process sees its own address space, mapped onto physical memory."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["virtual memory", "virtual address space", "address space"]
prereqs: ["ram", "kernel-os"]
related: ["paging", "mmap", "stack-vs-heap", "out-of-memory"]
---

**Virtual memory** gives every process the illusion of its own large, contiguous block of memory, starting at address zero, even though physical [RAM](/t/ram) is shared with every other process. The addresses a program uses are *virtual*; the kernel and CPU translate them to real *physical* addresses on the fly, using per-process **page tables**.

```text
program sees:      virtual addresses (its own space, from 0 up)
CPU + page tables: translate → physical frames in RAM (shared, hidden)
```

This buys three big things:

- Isolation. One process can't read or write another's memory, because its virtual addresses don't map to the other's physical frames.
- An address space bigger than RAM. Pages not in use can live on disk (see [paging](/t/paging)); a program can be written as if memory were plentiful.
- Lazy allocation. Mapping a range doesn't allocate physical memory until it's touched; the same mechanism underlies [memory-mapped files](/t/mmap).

The classic mistakes:

- Confusing virtual with physical. Seeing a process "using" gigabytes of virtual address space (VSZ) doesn't mean it occupies that much RAM (RSS). Mapping is cheap; touching pages is what costs memory.
- Assuming a pointer is an address in RAM. It's a virtual address; the mapping is hidden. Two processes' pointers aren't comparable.
- Forgetting the page-fault cost. First access to a page may trap to the kernel to map it in — invisible but not free. Huge page tables and TLB misses add overhead.
- Thinking leaks are the only way memory grows. A program can grow by touching more pages even without a "leak", because pages only become real when used.
- Ignoring the [stack vs heap](/t/stack-vs-heap) split. Both live in the same virtual space but are laid out and behave differently.

Virtual memory is why programs can be written without knowing where anything really is, and why the kernel can protect processes from each other. It underlies [paging](/t/paging), [mmap](/t/mmap), and the whole notion of a per-process address space.
