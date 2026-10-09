---
title: "CPU"
summary: "The processor that executes instructions."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["processor", "central processing unit"]
prereqs: ["bits-and-bytes"]
related: ["cpu-core", "ram", "word-size", "concurrency-vs-parallelism", "storage-devices"]
---

The CPU (central processing unit) is the chip that executes a program's instructions: arithmetic, comparisons, moving data and jumping between instructions. Everything your code does ultimately becomes a long stream of such tiny operations.

## What it does

It repeats a cycle billions of times per second: **fetch** an instruction from memory, **decode** it, **execute** it, and store the result. The clock speed (measured in GHz) is how fast that rhythm runs, though how much work gets done per tick varies between designs.

## Related parts

- **Cores**: modern CPUs contain several independent processing units, so multiple things can run at once ([CPU cores](/t/cpu-core)).
- **Registers**: a few tiny, very fast storage slots inside the chip.
- **Cache**: small, fast memory on the chip that holds recently used data, because [RAM](/t/ram) is much slower than the CPU.
- **Instruction set**: the family of instructions it understands (x86-64, ARM). A program compiled for one doesn't run on the other ([word size](/t/word-size)).

## Why it matters for developers

- **CPU-bound vs I/O-bound work.** A program that spends its time computing is limited by the CPU. One that waits for the network or disk isn't ([concurrency vs parallelism](/t/concurrency-vs-parallelism)).
- **High CPU usage** is a performance signal: infinite loops, heavy computation, inefficient algorithms ([time complexity](/t/time-complexity)).
- **Memory access patterns** matter. Arrays walk memory in order, which the cache likes. Chasing pointers doesn't.
- **Cloud sizing**: instance types list vCPUs, and you choose by workload ([capacity planning](/t/capacity-planning)).
- **Load average and utilization** tell you whether a server is busy ([system monitoring tools](/t/system-monitoring-tools)).

GPUs are specialized processors for many parallel simple operations, used for graphics and machine learning. The CPU remains the general-purpose coordinator.
