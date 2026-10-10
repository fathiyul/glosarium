---
title: "Out of Memory (OOM)"
summary: "Running out of memory, and the OOM killer that ends processes."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["out of memory", "OOM", "OOM killer"]
prereqs: ["ram", "virtual-memory"]
related: ["memory-leak", "paging", "cgroups", "ulimit", "heap"]
---

**Out of memory (OOM)** is what happens when a program — or the machine — needs more memory than is available. A single allocation can fail outright; more dramatically, the system as a whole can run out of physical memory, and something has to give. On Linux, that "something" is decided by the **OOM killer**, which picks a process to terminate to free memory and keep the system alive.

```text
memory exhausted → OOM killer scores processes → kills the worst offender
(container)      → cgroup limit hit → kills inside the container
```

On Linux, applications usually request memory and the kernel overcommits — it hands out address space optimistically, expecting that not all of it will be touched. When pages are actually used and there's no free memory, the kernel must reclaim: it evicts file cache, then swaps (see [paging](/t/paging)), and if that's not enough, it kills a process. The victim is chosen by a score based on how much memory it uses.

The classic mistakes:

- Confusing "virtual" and "resident" memory. A process can "use" a lot of virtual address space without actually occupying RAM. Seeing huge VSZ in `top` doesn't mean it's about to OOM; check RSS (resident).
- Not knowing the difference between host and container OOM. In a container, hitting a [cgroup](/t/cgroups) memory limit kills the process *inside* the container, often restarting it repeatedly (a [CrashLoopBackOff](/t/crashloopbackoff)) without the host ever being short of memory.
- Treating OOM as a random event. It's usually a [memory leak](/t/memory-leak) or a load spike. Auto-restarting hides it; find why memory grows.
- Setting a memory limit with no headroom. A container memory limit just above steady-state usage will OOM under any burst. Leave margin above the real peak.
- Assuming swap saves you. Swapping helps briefly but is very slow and can thrash; it postpones rather than solves the shortage.

The healthy approach is to understand each service's real memory profile, bound it (limits, [ulimits](/t/ulimit)), watch it over time (see [soak testing](/t/soak-test)), and fix leaks rather than rely on the OOM killer as a cleanup mechanism.
