---
title: "RAM"
summary: "Fast, temporary memory for running programs."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["memory", "main memory", "random access memory"]
prereqs: ["bits-and-bytes"]
related: ["cpu", "storage-devices", "stack-vs-heap", "garbage-collection", "memory-leak"]
---

RAM (random access memory) is the computer's fast, temporary memory. Running programs and the data they're working on live here, because RAM is far faster than disk. When the power goes off, RAM is emptied.

```
CPU cache (tiny, fastest)  →  RAM (large, fast)  →  SSD / HDD (huge, slower, persistent)
```

## RAM vs storage

| | RAM | Disk (SSD or HDD) |
|---|---|---|
| Speed | very fast (nanoseconds) | much slower (microseconds to milliseconds) |
| Persistence | lost at power-off | kept |
| Size | gigabytes | hundreds of gigabytes to terabytes |
| Cost per GB | higher | lower |

A file on disk is loaded into RAM to be used, and saving writes it back ([storage devices](/t/storage-devices)).

## What uses it

- Your program's variables and objects: the [stack and heap](/t/stack-vs-heap).
- Caches, buffers and loaded files.
- The operating system itself.

## What happens when it runs out

- **Swapping**: the OS moves memory to disk, which is far slower, so everything crawls.
- **The OOM killer / out-of-memory errors**: the system or runtime kills a process. A container hitting its memory limit gets killed, a very common production problem ([requests and limits](/t/requests-limits)).
- **MemoryError / heap out of memory** exceptions in your language.

## Developer concerns

- **Memory leaks**: memory that's never released grows until something dies ([memory leak](/t/memory-leak)).
- **Garbage collection** reclaims unused objects automatically in many languages ([garbage collection](/t/garbage-collection)).
- **Loading everything at once.** Reading a huge file or query result into a list can exhaust memory. Stream or batch it ([generators](/t/generator), [database cursors](/t/database-cursor)).
- **Estimate sizes** before designing: a million objects of 1 KB is a gigabyte ([back-of-the-envelope](/t/back-of-envelope)).
- **Monitor** memory use, not just CPU.
