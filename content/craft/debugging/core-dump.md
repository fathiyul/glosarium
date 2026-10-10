---
title: "Core Dump"
summary: "A snapshot of a crashed process's memory for later analysis."
levels: { backend: senior, data-engineer: senior }
aliases: ["core dump", "coredump", "crash dump"]
prereqs: ["debugging", "process-lifecycle"]
related: ["stack-trace", "debugger", "signal", "ulimit"]
---

A **core dump** is a file containing a snapshot of a process's memory and CPU state at the moment it crashed. When a program dies from a fatal fault — a segmentation fault, an abort — the operating system can write this snapshot so you can inspect it *after* the fact, in a debugger, instead of trying to catch the crash live. It's especially valuable for failures that are hard to reproduce.

```sh
ulimit -c unlimited          # allow core dumps for this shell
# ... program crashes, producing a core file ...
gdb ./program core           # load the dump and inspect
(gdb) bt                     # backtrace: where it crashed
```

In the debugger, `bt` (backtrace) is usually the first thing you run: it shows the **stack trace** at the point of failure — the chain of function calls that led there, and the exact line that faulted if symbols are available.

The classic mistakes:

- Core dumps are disabled. Many systems set the core size limit to zero by default, so a crash produces nothing to analyse. If you need dumps, raise the limit (or set the kernel's core pattern to a managed location) *before* the crash.
- Stripped binaries. A dump is useless without **symbols** that map addresses to function names and lines. Ship debug symbols (or keep the exact build) alongside any binary you expect to debug.
- Huge files. A core dump can be as large as the process's memory. On a big service that's gigabytes; configure where they go, how many to keep, and clean them up.
- Secrets in the dump. The snapshot is raw memory and can contain passwords, tokens and personal data. Treat core dumps as sensitive; restrict access and delete them when done.
- Expecting it to explain a logic bug. A core dump shows *where* it crashed, not *why* the program did the wrong thing. For a `null` dereference it's gold; for a wrong result, you need other tools.

Core dumps are a post-mortem tool: capture the crash once, then analyse at leisure. On systems where enabling them everywhere is impractical, a crash-reporting service does the same job by collecting the dump centrally — the same idea applied at fleet scale. See [signals](/t/signal) for what kills a process and [ulimit](/t/ulimit) for the limits that govern dumps.
