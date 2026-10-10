---
title: "strace"
summary: "Watching the system calls a process makes."
levels: { backend: senior, data-engineer: senior }
aliases: ["strace", "syscall tracing", "trace system calls"]
prereqs: ["system-call", "linux"]
related: ["debugging", "profiler", "process", "container"]
---

**strace** shows the [system calls](/t/system-call) a process makes: opening files, reading and writing, network calls, memory mapping, and the errors it gets back. It answers questions the program's own logs can't — "which file is it failing to open?", "is it even reaching the network?", "why is it hanging?" — because the boundary between a program and the kernel is usually where the mystery is.

```sh
strace ./app                      # trace a program from the start
strace -p 1234                    # attach to a running process
strace -f -p 1234                 # follow child processes too
strace -e trace=openat,connect ./app   # only these calls
strace -c ./app                   # summary: counts and time per call
```

The `-e` filter keeps the output readable; without it, a busy process produces thousands of lines a second. `-c` is often the fastest way to spot the expensive call.

The classic mistakes:

- Running it on a busy production process without thinking. Tracing adds real overhead and can slow the process significantly. Attach briefly, filter, and detach — don't leave it running on a hot service.
- Overwhelming yourself with output. Unfiltered traces are unreadable. Filter by call type or filter out the noisy calls (`-e trace=!epoll_wait`).
- Reading it as application logic. strace shows syscalls, not your code. It tells you *what the kernel was asked to do*, not *why the program decided that*.
- Forgetting containers. In a container, strace sees the container's calls, and permissions or capabilities may limit what you can trace. It has to run where the process actually is.

**When to use it:** when a process fails in a way its logs don't explain — a missing file, a permission error, a stalled socket, a suspicious exit. It's a complement to a [profiler](/t/profiler), which shows where *time* goes inside the program; strace shows where the program talks to the system. Both are part of [debugging](/t/debugging) a process you can't easily instrument.
