---
title: "Kernel"
summary: "The core of the OS with full access to the hardware."
levels: { backend: mid-level, frontend: senior, data-engineer: mid-level }
aliases: ["kernel", "os kernel", "linux kernel"]
prereqs: ["system-call", "user-vs-kernel-space"]
related: ["virtual-memory", "scheduler", "interrupt", "signal"]
---

The **kernel** is the core of an operating system: the program with full, privileged access to the hardware. It owns the CPU, memory, storage and devices, and it decides which process uses them. Every program you run sits on top of it and asks it for anything it can't do itself.

The kernel's jobs:

- **Processes** — create, schedule, and terminate them (see [scheduler](/t/scheduler), [process lifecycle](/t/process-lifecycle)).
- Memory — give each process its own address space and map it to physical memory (see [virtual memory](/t/virtual-memory)).
- Files and storage — manage the [file system](/t/file-system) and [devices](/t/inode).
- Networking — send and receive data on the machine's behalf.
- Protection — enforce the boundary between programs and itself so one buggy programme can't corrupt the system (see [user vs kernel space](/t/user-vs-kernel-space)).

Programs reach the kernel through [system calls](/t/system-call) — `read`, `write`, `open`, `fork`, `socket` — the formal interface. It also runs `privileged` code in response to [interrupts](/t/interrupt) and [signals](/t/signal).

The classic mistakes:

- Thinking the kernel is one piece of hardware. It's software; "the OS" and "the kernel" aren't identical. Linux is a kernel; a distribution bundles it with userland tools.
- Expecting a system call to be free. Crossing into the kernel is a real cost — the user/kernel boundary, checks, and context changes. Batching (one big `read` instead of many small ones) is often faster.
- Confusing a crash in the kernel with a crash in a program. A kernel crash (panic) takes down the machine; a user program crash usually doesn't. The privilege boundary is why.
- Assuming all kernels are built alike. Monolithic kernels (Linux) run most services inside the kernel; microkernels push more into user space for isolation, trading some speed for safety.
- Ignoring that containers share the kernel. Unlike a [virtual machine](/t/virtual-machine), containers have no separate kernel; they share the host's. Strong isolation relies on the kernel's own mechanisms ([namespaces](/t/namespaces-linux), [cgroups](/t/cgroups)).

The kernel is the layer that makes hardware safe to share. Understanding it explains why system calls cost what they do, why [context switches](/t/context-switch) matter, and why containers are lighter than VMs — they reuse one kernel rather than shipping one each.
