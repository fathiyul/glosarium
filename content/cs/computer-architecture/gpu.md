---
title: "GPU"
summary: "A processor for massively parallel work like graphics and ML."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["graphics processing unit", "graphics card"]
prereqs: ["cpu-cache"]
related: ["cpu-cache", "dynamic-programming", "thread-pool", "process"]
---

A GPU, or graphics processing unit, is a processor built to run many simple operations at the same time. A CPU has a few powerful cores that handle varied tasks quickly, while a GPU has thousands of smaller cores that apply the same operation across a large amount of data. That design suits graphics, where each pixel is computed independently, and it also suits the matrix arithmetic used in machine learning.

```
CPU: a few cores, each fast on any task, good at sequential logic
GPU: many cores, each simpler, good at the same operation over large arrays
```

Programs usually send data to the GPU, run a kernel that applies a function to every element, and read the results back. The data transfer is a real cost, so the speedup depends on doing enough work per transfer.

The trade-off is that GPU work is only fast when it's parallel. Code full of branches, dependencies between steps, or small amounts of work will often run slower on a GPU than on a CPU, because the transfers and coordination take longer than the computation.

The classic mistake is moving a small or sequential job to the GPU and expecting a speedup. Measure both versions on realistic data, and count the transfer time, not only the kernel time. The idea of work running in parallel also applies to CPU [thread pools](/t/thread-pool) and to [processes](/t/process), though the scale and the trade-offs differ.
