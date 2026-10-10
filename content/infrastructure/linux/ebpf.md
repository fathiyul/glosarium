---
title: "eBPF"
summary: "Running safe, sandboxed programs inside the Linux kernel for tracing and networking."
levels: { backend: principal, data-engineer: principal }
aliases: ["eBPF", "extended Berkeley Packet Filter", "bpf"]
prereqs: ["linux", "system-call"]
related: ["observability", "profiler", "distributed-tracing", "attack-surface"]
---

**eBPF** lets you run small, **sandboxed** programs *inside* the Linux **kernel** without changing the kernel or loading a custom module. A program attaches to a hook — a system call, a network packet, a function entry — and runs when that event happens, with access to kernel data. A verifier checks each program before it loads to ensure it terminates and can't crash or corrupt the kernel, which is what makes running code in the kernel safe.

```text
event (syscall, packet, kprobe) → eBPF program → observe / filter / aggregate
```

Its uses fall into three areas:

- Observability — trace system calls, collect per-process metrics, profile CPU usage, see network connections, all with low overhead and without modifying the application.
- Networking — implement load balancing, packet filtering and routing in the kernel, fast and programmable.
- Security — enforce or monitor behaviour at the kernel boundary (see [attack surface](/t/attack-surface)).

The appeal is visibility without recompiling anything. Conventional tools can see a process from the outside; eBPF can see *inside the kernel's view* — which file descriptors, which connections, which latency — for the whole system at once, not one process at a time.

The classic mistakes:

- Assuming it's universal. eBPF needs a reasonably modern kernel and the right privileges to load programs. Older kernels or locked-down environments may not support it, and distributions differ.
- Treating it as risk-free. The verifier makes it *safe from crashing the kernel*, not risk-free: a badly designed program can still add overhead or mis-observe. Test before production.
- Expecting it to replace application instrumentation. eBPF sees kernel-level events; it can't know your business logic. It complements [application-level tracing](/t/distributed-tracing), not replaces it.
- Ignoring the privilege. Loading eBPF generally requires elevated rights. Who can run programs affects your [attack surface](/t/attack-surface), so treat the capability as privileged.
- Naming specific tooling versions. The ecosystem moves quickly; the concept is stable, the tools change.

**When it matters:** when you need deep, low-overhead, system-wide insight — performance analysis, security monitoring, or high-performance networking — that normal tooling can't provide. It's a powerful, advanced part of the Linux [observability](/t/observability) and networking toolbox, and increasingly the engine behind modern tooling.
