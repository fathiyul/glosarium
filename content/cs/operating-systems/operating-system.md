---
title: "Operating System"
summary: "Software that manages hardware and runs programs."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["OS", "Linux", "Windows", "macOS", "kernel"]
prereqs: ["cpu", "ram"]
related: ["process-lifecycle", "kernel-os", "file-system", "scheduler", "virtual-memory"]
---

An operating system (OS) is the software that manages a computer's hardware and runs other programs. It stands between your programs and the machine, so each program doesn't have to know how to talk to every disk, network card and screen.

Common ones: Linux (servers, Android, most of the cloud), Windows, macOS, iOS.

## What it does

- **Runs programs as processes** and shares the CPU between them with a scheduler ([processes](/t/process-lifecycle), [scheduler](/t/scheduler)).
- **Manages memory**, giving each process its own address space and protecting them from one another ([virtual memory](/t/virtual-memory)).
- **Provides a file system** ([file systems](/t/file-system)).
- **Handles devices and networking**: disks, keyboards, network cards, through drivers.
- **Enforces security**: users, permissions and isolation ([file permissions](/t/file-permissions), [users and groups](/t/users-groups)).
- **Offers services to programs** through system calls: open a file, create a thread, send data ([system calls](/t/system-call)).

```
Your program ─► system call ─► kernel ─► hardware
```

The **kernel** is the core of the OS that runs with full privileges ([kernel](/t/kernel-os), [user vs kernel space](/t/user-vs-kernel-space)).

## Why developers should care

- **Most backend software runs on Linux**, so you meet it constantly: processes, signals, ports, file descriptors, limits.
- **Behavior differs between OSes**: file paths, line endings, case sensitivity, process and signal handling. "Works on my Mac" can fail on Linux.
- **Resource limits** (memory, open files, CPU) come from the OS and containers ([cgroups](/t/cgroups), [ulimit](/t/ulimit)).
- **Debugging tools** (`top`, `strace`, logs) are OS tools ([system monitoring tools](/t/system-monitoring-tools)).
- **Containers** share the host's kernel, which is lighter than virtual machines ([container vs VM](/t/container-vs-vm)).

Learning how your OS handles processes, memory and files makes many mysterious bugs understandable.
