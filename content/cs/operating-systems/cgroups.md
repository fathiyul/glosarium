---
title: "cgroups"
summary: "Linux control groups that limit resources; one basis of containers."
levels: { backend: senior, data-engineer: senior }
aliases: ["cgroups", "control groups", "cgroup limits"]
prereqs: ["process", "kernel-os"]
related: ["namespaces-linux", "container", "out-of-memory", "ulimit", "requests-limits"]
---

**cgroups** (control groups) are the Linux mechanism for limiting and accounting a group of processes' use of resources: CPU, memory, disk I/O, and the number of processes. You put processes into a cgroup, set limits on the group, and the kernel enforces them — capping what the group can consume and tracking what it uses.

```text
cgroup "web":
  memory.max = 512M     # exceed → OOM within the group
  cpu.max    = 50%      # capped CPU time
  pids.max   = 256      # max processes
```

It's one of the two kernel features that make [containers](/t/container) work: [namespaces](/t/namespaces-linux) isolate *what a container can see*, and cgroups limit *what it can use*. When you set a container's memory or CPU limits, you're really setting cgroup limits on its processes.

This is also how Kubernetes [requests and limits](/t/requests-limits) are enforced: a container's memory limit becomes a cgroup memory cap, and exceeding it triggers the [OOM killer](/t/out-of-memory) *for that container*.

The classic mistakes:

- **Confusing cgroups with [ulimit](/t/ulimit).** ulimit caps a single process; cgroups cap a whole group. Containers use cgroups; the two solve different scopes.
- Setting a memory limit with no headroom. A cgroup memory cap just above normal usage kills the container's process under any burst — a recurring reason a service restarts in a [CrashLoopBackOff](/t/crashloopbackoff) while the host is fine.
- Forgetting CPU throttling. A cgroup CPU limit throttles the group even when the host has idle cores, which can hurt latency-sensitive services. This is why many teams set CPU requests but not CPU limits.
- Assuming limits are also reservations. A cgroup limit is a *ceiling*; it doesn't guarantee the group gets that much. Guarantees are about scheduling (requests), not caps.
- Ignoring accounting. cgroups also report usage, which is where container metrics come from — useful for rightsizing.

cgroups are the enforcement layer under container resource limits: quotas, OOM decisions and CPU throttling all happen through them. Together with namespaces they define the Linux container, and understanding them explains those "the host has memory but the container was killed" surprises.
