---
title: "Interrupt"
summary: "A signal that makes the CPU pause and handle an event."
levels: { backend: senior }
aliases: ["interrupt", "interrupt handler", "hardware interrupt"]
prereqs: ["kernel-os", "cpu"]
related: ["system-call", "context-switch", "user-vs-kernel-space", "how-cpu-executes"]
---

An **interrupt** is a signal that tells the CPU to stop what it's doing and handle an event now. Instead of the CPU endlessly asking "has the disk finished? has a key been pressed?", devices and timers can *raise their hand* and let the processor work until it's needed. Handling it means jumping to an **interrupt handler** (a small routine in the OS), doing the minimum, and returning to whatever was running.

Interrupts come in a few flavours:

- Hardware interrupts — a device (network card, disk, timer) signals the CPU.
- Software interrupts / traps — the running program raises one deliberately, which is how a [system call](/t/system-call) enters the kernel.
- Exceptions/faults — the CPU itself detects something (a page fault, a divide by zero).

```text
running code ──interrupt──▶ save context → run handler → restore context → resume
```

The pattern — pause, save state, handle, resume — is the same machinery as a [context switch](/t/context-switch), and the boundary crossed is the [user/kernel](/t/user-vs-kernel-space) one. Interrupts are also how the OS gets control back from a runaway program: a periodic timer interrupt lets the scheduler preempt it.

The classic mistakes:

- Thinking the CPU polls everything. Polling wastes cycles; interrupts exist to avoid it. (High-throughput networking may deliberately switch back to polling in user space — `epoll` busy loops — to cut interrupt overhead, a flag that the trade-off runs both ways.)
- Doing too much in a handler. Handlers run in a privileged, delicate context; long work there delays everything. Real handlers defer heavy work to be done later.
- Assuming interrupts are free. Each one has overhead: saving state, cache effects, the handler itself. A flood of interrupts (say, one per packet) can dominate CPU time, which is why interfaces batch them.
- Forgetting the privilege angle. Interrupts are how control transfers into the [kernel](/t/kernel-os); they're part of why user code can't do everything directly.
- Confusing them with signals. An OS [signal](/t/signal) is a process-level notification; an interrupt is a CPU-level one. Related in spirit, different in layer.

Interrupts are a foundational OS mechanism: they make the system *reactive* rather than busy-waiting, and they're the mechanism that hands the CPU control from programs to the kernel. See [how a CPU executes](/t/how-cpu-executes) for where they fit in the cycle.
