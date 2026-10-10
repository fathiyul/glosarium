---
title: "User Space vs Kernel Space"
summary: "The privilege boundary between programs and the OS."
levels: { backend: senior, data-engineer: senior }
aliases: ["user space", "kernel space", "user mode kernel mode"]
prereqs: ["kernel-os", "system-call"]
related: ["virtual-memory", "interrupt", "cve", "system-call"]
---

**User space and kernel space** are the two privilege levels a modern CPU runs code in. Ordinary programs run in **user space** (user mode): restricted — they can't touch hardware, other processes' memory, or privileged instructions. The [kernel](/t/kernel-os) runs in **kernel space** (kernel mode): full access to everything. The hardware enforces the split.

```text
user space:    your app — restricted, isolated, many of these
kernel space:  the OS core — privileged, shared, one
_______|____________________________|_______
        └── crossing costs (system calls, interrupts)
```

Why the split exists: safety and stability. A buggy app running in user space can crash itself, not the machine. It can't scribble on another process's memory or reconfigure the disk. The privilege boundary is one of the main reasons a modern OS can run untrusted code at all.

Crossing the boundary is deliberate and expensive relative to plain function calls: a program enters the kernel via a [system call](/t/system-call) (or the kernel enters via an [interrupt](/t/interrupt)), with mode switches and checks. That cost is why batching work into fewer calls is faster, and why user-space networking (e.g. [epoll/kqueue](/t/epoll-kqueue) busy-polling) exists to avoid per-packet kernel crossings.

The classic mistakes:

- Assuming user code can do anything. It can't; it must ask. This is why "just write to that device" requires the right permissions and a system call.
- Ignoring the cost of crossing. A loop making millions of tiny system calls spends real time in the transitions. Reduce crossings by batching.
- Confusing kernel space with "the hardware". It's still software — privileged software. A bug in the kernel (kernel space) can crash the whole machine, which is why kernel bugs are so serious.
- Thinking the boundary is optional. You can move work between the two (user-space drivers, in-kernel services), but the boundary itself — and its protection — remains. Violating it is a [CVE](/t/cve)-class security failure.
- Conflating it with [virtual memory](/t/virtual-memory). The two are related but distinct: virtual memory is about addressing and isolation, the privilege boundary is about *who may do what to the hardware*.

The user/kernel split is the foundation of OS security and stability, and it's the reason system calls exist at all. Understanding it explains why crossing is a measurable cost and why protecting the boundary — at the cost of a little speed — is worth it.
