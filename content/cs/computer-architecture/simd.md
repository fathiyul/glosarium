---
title: "SIMD"
summary: "One instruction operating on multiple data values at once."
levels: { backend: principal }
aliases: ["SIMD", "single instruction multiple data", "vectorization"]
prereqs: ["cpu", "how-cpu-executes"]
related: ["cpu-registers", "cache-locality", "pipelining", "gpu"]
---

**SIMD** (single instruction, multiple data) is a CPU capability where one instruction operates on several values at once. Instead of adding two numbers per instruction, a SIMD instruction adds eight, sixteen, or more packed into wide **vector registers**. It's the same idea as a GPU's parallelism, scaled down and built into ordinary CPUs.

```text
scalar:   c0 = a0 + b0;  c1 = a1 + b1;  c2 = a2 + b2;  ...   # one add each
SIMD:     [c0 c1 c2 c3] = [a0 a1 a2 a3] + [b0 b1 b2 b3]     # one add
```

It's used everywhere performance matters: media codecs, cryptography, scientific computing, database engines scanning columns, and the matrix math behind machine learning.

The classic mistakes:

- Hand-writing intrinsics too early. Compilers can often **auto-vectorise** loops for you, and modern JITs and optimisers do it well. Measure first; hand-written SIMD is hard to read, non-portable and easy to get wrong.
- Ignoring data layout. SIMD needs the values *packed together* in memory. A structure-of-arrays layout vectorises; an array-of-structures with scattered fields often can't. Layout is as important as the instruction.
- Assuming it always speeds things up. Gathering scattered data into vectors costs time; for irregular work, the packing overhead can cancel the benefit.
- Forgetting alignment and tails. Vector loads may need alignment, and loops rarely divide evenly by the vector width — the leftover "tail" must be handled.
- Confusing it with [multi-threading](/t/thread). SIMD is one thread doing more per instruction (data-level parallelism); multiple threads are several streams of instructions (thread-level parallelism). They compose.

SIMD is one of the main reasons **how you lay out data** dominates performance in hot code, alongside [cache locality](/t/cache-locality). It sits between scalar CPUs and [GPUs](/t/gpu) on the parallelism spectrum: modest width, present in every core. Reach for it when profiling shows a tight, regular, numeric loop is the bottleneck — and let the compiler try first.
