---
title: "Amdahl's Law"
summary: "The speedup from parallelism is limited by the part that stays sequential."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["Amdahl's law", "amdahls law", "speedup limit"]
prereqs: ["thread", "cpu"]
related: ["gpu", "throughput", "latency", "simd"]
---

**Amdahl's law** says that the maximum speedup from adding processors (cores, threads) is limited by the fraction of the work that *can't* be parallelised. If 20% of a job is inherently sequential, then no matter how many cores you add, you can never go faster than 5× — because the sequential 20% becomes the bottleneck.

```text
speedup(S) = 1 / ((1 - p) + p / S)
p = parallel fraction, S = number of processors
p = 0.9:  even with infinite cores, max speedup = 1/(0.1) = 10×
```

The formula tells you two things: gains from parallelism are real but bounded, and chasing more cores has rapidly diminishing returns once the sequential part dominates.

The classic mistakes:

- **Assuming more cores means proportionally more speed.** Doubling the cores doesn't usually halve the time. A small sequential fraction caps the win hard.
- Measuring speedup on a problem that got bigger. Sometimes you don't finish faster; you finish a *larger* job in the same time (Gustafson's view). Amdahl's law is about fixed problem size.
- Forgetting the serial parts everywhere. Setup, I/O, locks, coordination, and the final merge are all sequential-ish. Profile to find the real serial fraction rather than guessing.
- Parallelising the wrong layer. Compiling each of four functions in parallel, then joining them, still waits on the slowest. Sometimes a better algorithm beats any parallelism.
- Ignoring overhead. Adding threads adds [context switches](/t/context-switch) and synchronisation; beyond a point, more threads *slow things down*.

Amdahl's law is why "throw more cores at it" often disappoints, and why algorithm improvements (reducing total work) usually beat parallelism. It's the standard cautions against unbounded optimism about [SIMD](/t/simd), [GPUs](/t/gpu) and threads: they help in proportion to the parallelisable work, and no more. Measure the sequential fraction before you scale out.
