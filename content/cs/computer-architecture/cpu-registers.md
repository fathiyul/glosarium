---
title: "Registers"
summary: "The tiny, fastest storage inside the CPU."
levels: { backend: senior }
aliases: ["registers", "cpu register", "general-purpose register"]
prereqs: ["cpu", "how-cpu-executes"]
related: ["instruction-set", "cache-locality", "context-switch", "simd"]
---

**Registers** are the small, extremely fast storage locations inside the CPU itself. They're where the processor actually does its work: instructions add values *in registers*, load from memory into them, and store them back. There are usually only a handful — a few dozen at most — and they're measured in nanometres of silicon, not gigabytes.

Some have special roles:

- the **program counter** (instruction pointer) — the address of the next instruction;
- the **stack pointer** — the top of the current call stack;
- status/flags — results of comparisons and arithmetic (zero, carry, overflow);
- many general-purpose registers for operands and temporary values.

```text
add r1, r2, r3   # r1 = r2 + r3, all registers, no memory access
```

Because there are so few, the [compiler](/t/compiler) spends real effort on **register allocation** — deciding which values live in registers at any moment. When it runs out, values "spill" to the stack in [RAM](/t/ram), which is far slower. This is a big part of why the same algorithm can be fast or slow depending on how well the compiler can keep the hot values in registers.

The classic mistakes:

- Assuming your variables stay in registers. They may spill to memory under pressure. Hot loops with many live values can be limited by register count.
- Forgetting registers are per-thread state. On a [context switch](/t/context-switch) the CPU must save and restore them, so more in-flight state means more switching cost.
- Ignoring how they enable [SIMD](/t/simd). Wide vector registers hold several values at once; using them is how the same instruction processes multiple data items.
- Micro-managing them by hand. In most languages the compiler and CPU handle this with out-of-order execution and renaming; hand-tuning registers is rarely worth it outside hot kernels.

Registers sit at the very top of the [latency ladder](/t/latency-numbers): essentially free to access, far faster than even the closest cache. They're small and scarce by design — the CPU keeps the working set as close as physically possible, while [caches](/t/cache-locality) back them up.
