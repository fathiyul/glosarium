---
title: "System Call"
summary: "A program asking the kernel to do something, like read a file."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["system call", "syscall", "kernel call"]
prereqs: ["kernel-os", "user-vs-kernel-space"]
related: ["file-descriptor", "strace", "interrupt", "context-switch"]
---

A **system call** is how a program asks the [kernel](/t/kernel-os) to do something it isn't allowed to do itself: open a file, read bytes, send a network packet, start a process, get the time. User programs can't touch hardware or another process's memory directly, so every such operation goes through a system call — the formal doorway between user space and kernel space.

```c
int fd = open("/etc/hosts", O_RDONLY);   // system call: enter the kernel
ssize_t n = read(fd, buf, sizeof buf);   // system call
close(fd);                               // system call
```

Under the hood, a system call is a controlled [trap](/t/interrupt): the program executes a special instruction, the CPU switches to kernel mode, runs the kernel's handler, then switches back with a result. Common ones you'll see named in traces and error messages: `open`, `read`, `write`, `close`, `fork`, `execve`, `mmap`, `socket`, `connect`.

The classic mistakes:

- **Treating a system call as free.** Crossing the [user/kernel boundary](/t/user-vs-kernel-space) has real cost: mode switch, checks, cache effects. Thousands of tiny calls are slower than one batched call — one `read` of 64 KB beats 64 reads of 1 KB.
- Ignoring the return value. System calls report failure by return code (often `-1` with an error number), not exceptions. C code that ignores it silently proceeds with garbage.
- Confusing it with a normal function call. A library function that needs privileged work ultimately makes a system call, but not every function call is one. Understanding the difference matters for performance and for debugging.
- Reading "blocked in syscall" as hung. A process waiting in a system call (say, `read` on a socket) is normal. Tools like `strace` show exactly which call it's in.
- Assuming all languages expose them the same way. High-level runtimes wrap system calls heavily; knowing they're there helps when a bottleneck turns out to be I/O.

When something behaves oddly, `strace` shows the system calls a process makes, which is often the fastest way to see what it's actually doing. System calls are the concrete form of the user/kernel split, and the reason I/O in a process is both powerful and relatively expensive.
