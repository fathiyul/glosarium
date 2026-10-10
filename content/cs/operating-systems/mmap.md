---
title: "Memory-Mapped Files"
summary: "Mapping a file directly into a process's memory."
levels: { backend: senior, data-engineer: senior }
aliases: ["mmap", "memory-mapped file", "memory mapping"]
prereqs: ["virtual-memory", "system-call"]
related: ["paging", "ipc", "file-descriptor", "out-of-memory"]
---

**`mmap`** maps a file (or a chunk of anonymous memory) directly into a process's [virtual address space](/t/virtual-memory). After that, the process reads and writes the *file* using ordinary memory access — no `read`/`write` calls, no explicit buffer management. The kernel handles loading and saving pages in the background.

```c
void *p = mmap(NULL, len, PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0);
char c = ((char *)p)[0];      // reads from the mapped file
((char *)p)[0] = 'X';         // writes into it (per the flags)
```

Key variations:

- **Shared vs private** — a shared mapping's writes go back to the file and are visible to other mappers; a private mapping gets copy-on-write, so writes are local and discarded.
- File-backed vs anonymous — file-backed maps a file; anonymous maps zero-filled memory (used for large allocations, sometimes IPC).

Why it's used: it lets the OS page data in on demand (lazy loading), avoids copying between kernel and user buffers (for large reads), and gives an easy way to share memory between processes ([IPC](/t/ipc)). Loaders map executables this way; databases map files; some languages allocate through `mmap`.

The classic mistakes:

- Assuming writes are flushed immediately. The OS writes dirty pages back lazily. To be sure data is on disk before a crash, you need to sync (`msync`/`fsync`).
- Mapping a huge file and forgetting it's lazy. The mapping isn't the memory; touching pages brings them in. Stray access patterns can fault heavily.
- Sharing without synchronisation. A shared mapping across processes is fast but lock-free by itself — you still need a [mutex or semaphore](/t/semaphore) to avoid races.
- File size changing underneath the map. If the file shrinks, accessing unmapped pages triggers a fault (often SIGBUS), not a clean error.
- Ignoring portability. `mmap` semantics and flags vary across platforms; what works on Linux may not on Windows.

`mmap` trades explicit I/O calls for memory access, letting the OS manage the loading. It's a lower-level tool — most code should use regular file APIs — but it's foundational for loaders, databases and high-performance I/O, and it's part of how [virtual memory](/t/virtual-memory) is used in practice.
