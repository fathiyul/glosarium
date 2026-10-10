---
title: "System Monitoring (top, htop, vmstat, iotop)"
summary: "Seeing CPU, memory and disk activity on a machine."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["top", "htop", "vmstat", "iotop"]
prereqs: ["monitoring", "process"]
related: ["load-average", "disk-usage", "apm", "profiler", "uptime-monitoring"]
---

Before you open a dashboard, a few tools on the box tell you what it's doing right now. Knowing which resource is the bottleneck is the core skill.

**CPU and processes** — `top` (or the friendlier `htop`) shows per-process CPU and memory, sorted live. Press `P` to sort by CPU, `M` by memory, and `1` to show each core separately. `ps aux` gives a one-shot snapshot for scripts.

**System-wide** — `vmstat 1` prints a line every second: runnable processes (`r`), memory, swap, and disk blocks (`bi`/`bo`). `iostat -x 1` breaks disk activity down per device, including how long requests wait.

```sh
top            # live per-process view
vmstat 1 5     # five samples, one per second
iostat -x 1     # per-disk throughput and latency
free -h         # memory and swap
df -h           # filesystem space
iotop           # per-process disk I/O (needs root)
```

The classic mistake is trusting a single snapshot. A process at 100% CPU for one `top` refresh might just be a normal burst; watch for a few seconds and look at trends.

Another is misreading `top`'s CPU column. `%CPU` can exceed 100% for a multi-threaded process, while overall usage is a share of all cores, so compare against `nproc`.

Diagnose in order. Is the pressure in the [load average](/t/load-average)? Then is it CPU, memory (including swap), or disk? `iotop` and `iostat` separate an I/O-hungry process from a CPU-bound one.

These tools show *this machine, right now*. For many machines and history you need [monitoring](/t/monitoring) and [APM](/t/apm); to dig into one slow code path, use a [profiler](/t/profiler).
