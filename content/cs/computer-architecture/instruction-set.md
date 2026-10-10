---
title: "Instruction Set (x86, ARM)"
summary: "The machine instructions a CPU family understands."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["instruction set", "ISA", "x86 ARM"]
prereqs: ["cpu", "how-cpu-executes"]
related: ["cpu-registers", "compiler", "cross-compilation", "simd"]
---

An **instruction set** (or ISA, instruction set architecture) is the vocabulary of machine instructions a CPU family understands: how to add and move values, load and store, compare, branch, and call. It's the interface between software and hardware — the contract a compiler targets and the CPU implements.

Two broad styles have competed for decades:

- CISC (complex instruction set, historically x86) — many instructions, some doing quite a lot in one step, with variable-length encodings.
- RISC (reduced instruction set, e.g. ARM) — a smaller set of simple, fixed-length instructions, with more done by the compiler.

The line has blurred: modern x86 chips translate complex instructions into simpler micro-operations internally, so the practical differences are smaller than the textbook split suggests.

The key consequence of an ISA is **binary compatibility**. A program compiled for one instruction set doesn't run on a CPU with another — an ARM binary won't run on x86. That's why the same app ships as separate builds per architecture, and why [cross-compilation](/t/cross-compilation) and multi-architecture [container images](/t/image-tags) exist. It's also why emulation (running another ISA's instructions in software) is slower.

The classic mistakes:

- Thinking "compiled" means portable. It doesn't; the target ISA is baked in. Plan for per-architecture builds and tests.
- Assuming source-level benchmarks transfer across architectures. Performance characteristics differ; code tuned for one may not suit another.
- Ignoring the SIMD extensions. Most ISAs include [SIMD](/t/simd) instructions that operate on several values at once — the compiler may use them, and data layout affects whether it can.
- Over-indexing on RISC vs CISC. For application developers the differences usually don't matter; the compiler and the microarchitecture do.

For most people the ISA is invisible, handled by the [compiler](/t/compiler) and the OS. It becomes visible when you ship binaries to multiple platforms, debug at the assembly level, or care about [cross-compilation](/t/cross-compilation) and low-level performance.
