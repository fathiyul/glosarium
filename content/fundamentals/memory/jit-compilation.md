---
title: "JIT Compilation"
summary: "Compiling hot code to machine code while the program runs."
levels: { backend: senior, frontend: senior }
aliases: ["JIT compilation", "just-in-time compilation", "JIT"]
prereqs: ["interpreter", "bytecode"]
related: ["compiler", "virtual-machine-runtime", "garbage-collection", "lazy-evaluation"]
---

**JIT compilation** (just-in-time) compiles code to machine code *while the program is running*, rather than ahead of time. A runtime starts by interpreting [bytecode](/t/bytecode) or an intermediate form, watches which parts run often (the "hot" code), and compiles those to optimized machine code on the fly. It's how JavaScript engines, the JVM, and .NET turn portable intermediate code into fast native execution.

```text
start:   interpret everything (fast to begin, slower to run)
watch:   profile which methods/paths are hot
compile: send hot code to the JIT → optimized machine code
```

The appeal is a combination you can't get from a pure interpreter or a pure [compiler](/t/compiler): fast startup (you don't compile everything up front) *and* high throughput (hot code gets optimized). Because the JIT sees the program's actual behaviour, it can optimize differently than an ahead-of-time compiler could — for example, specialising code paths based on the types it actually observes.

The classic mistakes:

- Benchmarking without warmup. A JIT'd program is slow for the first seconds while it interprets and compiles. A benchmark that measures only the first runs makes it look terrible; one that ignores warmup entirely hides real costs. Measure steady state *and* startup.
- Assuming it's always faster. For short-lived programs, the compile time never pays off — an interpreter or ahead-of-time build can win. JIT shines for long-running, hot workloads.
- Forgetting deoptimization. A JIT optimizes based on assumptions (e.g. "this argument is always an integer"); if that changes, it must **deoptimize** and fall back, which causes a sudden performance dip. These "deopt cliffs" explain odd latency spikes.
- Confusing JIT with interpretation. They're different stages of the same runtime; an interpreter runs code as-is, the JIT produces machine code. Most modern runtimes do both.
- Assuming it in the browser is free. Client-side JIT means startup and optimization happen on the user's device, competing with everything else. See [virtual machine runtimes](/t/virtual-machine-runtime).

JIT is a trade: compilation cost and complexity, paid at run time, for portability plus high peak performance. It's a core piece of the runtime story alongside [garbage collection](/t/garbage-collection), which also runs concurrently with your code.
