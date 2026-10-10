---
title: "Resource Limits (ulimit)"
summary: "Per-process caps on open files, memory and processes."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["ulimit", "resource limits", "rlimit"]
prereqs: ["process", "file-descriptor"]
related: ["cgroups", "system-call", "connection-pooling", "out-of-memory"]
---

**ulimit** sets per-process resource limits on Unix: how many [file descriptors](/t/file-descriptor) a process may open, how much memory or stack it may use, how many processes a user may run, core dump size, and more. They're the kernel's guardrails against a single process consuming a resource without bound.

```sh
ulimit -n          # current limit on open file descriptors
ulimit -n 65535    # raise it (up to the hard limit) for this shell
ulimit -a          # show all limits
```

Each limit has a **soft** value (the current one, which a process may raise) and a **hard** value (the ceiling, changeable only by privileged processes). A process inherits its limits from whatever launched it, so a service started by [systemd](/t/systemd) gets the limits systemd sets, not the ones in your interactive shell.

The classic mistakes:

- Mysterious "too many open files" errors. A server handling many connections eventually has thousands of sockets open. If `ulimit -n` is still at a low default, it fails under load. Raise it for the service — and remember it's per-process, not global.
- Raising it in the wrong place. Setting `ulimit` in your interactive shell doesn't affect a service managed by systemd or launched elsewhere. Set it where the process is actually started.
- Confusing ulimit with [cgroups](/t/cgroups). ulimit caps per *process*; cgroups cap a whole *group* (all processes in a container or slice) on CPUs, memory and I/O. Containers use cgroups, not ulimits, for their memory and CPU limits.
- Setting limits too low. An overly tight limit causes failures that look like bugs — a process can't fork, or can't open one more file, and dies for no visible reason.
- Forgetting that limits are inherited. A too-low limit propagates to every child process until something explicitly raises it.

Limits are a safety mechanism, not a capacity plan. Set them high enough for real load, low enough to catch runaway behaviour, and raise the ones that matter (open files, processes) for network-heavy services. For grouped limits and container isolation, reach for [cgroups](/t/cgroups) instead.
