---
title: "How a CPU Executes Programs"
summary: "Fetch, decode, execute: how instructions actually run."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["cpu execution", "fetch decode execute", "instruction cycle"]
prereqs: ["cpu", "instruction-set"]
related: ["cpu-registers", "pipelining", "cache-locality", "interrupt", "context-switch"]
---

A CPU runs a program by repeating one small cycle, billions of times a second:

1. Fetch — read the next instruction from memory, at the address in the program counter.
2. Decode — work out what the instruction is and which operands it uses.
3. Execute — do it: add two values, load from memory, jump to another address.
4. Write back / advance — store the result and move the program counter on.

That's **fetch-decode-execute**. Everything from a web page to a database ultimately reduces to this loop, one instruction at a time.

Modern CPUs don't literally do one instruction at a time, though. They use a **pipeline**: while one instruction is executing, the next is being decoded and the one after is being fetched. Like an assembly line, this raises throughput — more instructions finished per second — without making any single instruction faster.

The classic mistakes:

- Thinking the CPU talks to RAM directly for every value. Registers are the CPU's working surface; memory access is *far* slower. That gap is why [caches](/t/cache-locality) and the [registers](/t/cpu-registers) matter so much.
- Assuming instructions run strictly in source order. Pipelining and out-of-order execution mean the CPU may run later instructions early, as long as the visible result is the same. This is also why multithreaded code needs a [memory model](/t/memory-model).
- Ignoring the cost of a branch. Every `if` is a decision the pipeline must guess at to keep flowing; a badly predicted branch flushes work. This is a reason hot loops are often rewritten to be branch-light.
- Reading the clock speed as the whole story. Instructions per cycle matter as much as GHz; a higher clock doesn't guarantee more work done.

This loop is the ground floor under the [instruction set](/t/instruction-set) the CPU understands, the [interrupts](/t/interrupt) that pause it for events, and the [context switches](/t/context-switch) that let many programs share it. Understanding it explains why "close to the metal" code is written the way it is.
