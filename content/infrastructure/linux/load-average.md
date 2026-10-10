---
title: "Load Average"
summary: "A rough measure of how busy a machine is."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["load average", "run queue", "uptime load"]
prereqs: ["process", "cpu"]
related: ["system-monitoring-tools", "monitoring", "disk-usage", "managing-processes"]
---

The **load average** is the number of processes that are either running on a CPU or waiting for one (and, on Linux, processes stuck in uninterruptible I/O), averaged over the last 1, 5 and 15 minutes. You see it in `uptime`, `top` and `/proc/loadavg`.

```text
$ uptime
 14:03:21 up 42 days,  3:11,  2 users,  load average: 3.82, 2.10, 1.05
```

It is **not a percentage**. What counts as high depends on the number of CPU cores. On a 4-core machine, a load of 4 means the CPUs are roughly fully used and 8 means work is queuing; on a 16-core machine, 4 is comfortable. A rough check is to divide the load by the core count and compare against 1.

```sh
nproc         # number of cores
cat /proc/loadavg
```

The classic mistake is reading load as CPU usage. On Linux, processes stuck in uninterruptible disk I/O also count, so a machine with load 20 and 5% CPU is not CPU-bound — it's piled up waiting on a slow disk or network mount. Compare load with CPU, disk and memory together.

Another mistake is reacting to the 1-minute value. It spikes during normal work; the 5- and 15-minute numbers show the trend, and a slowly rising 15-minute average is the real warning.

Load average tells you *how much is waiting*, not *why*. For that, look at per-process tools in [system monitoring](/t/system-monitoring-tools), at [disk usage](/t/disk-usage), and at your [monitoring](/t/monitoring) dashboards. If one process is the cause, tune its priority with [process priority](/t/process-priority).
