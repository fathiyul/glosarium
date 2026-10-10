---
title: "Inter-Process Communication"
summary: "Pipes, sockets and shared memory for processes to talk to each other."
levels: { backend: senior, data-engineer: senior }
aliases: ["IPC", "inter-process communication", "process communication"]
prereqs: ["process", "system-call"]
related: ["socket", "mmap", "message-queue", "file-descriptor", "thread"]
---

**Inter-process communication (IPC)** is how separate [processes](/t/process) exchange data. Because processes have isolated [virtual memory](/t/virtual-memory) — one can't peek into another's address space — they need an explicit channel to communicate. The OS provides several, each with different trade-offs.

The main options:

- **Pipes** — a one-way byte stream, ideal for connecting processes (`cmd1 | cmd2`). Simple, but limited in shape.
- Sockets — bidirectional endpoints that work locally *and* across the network, which is why they're the most general choice (see [socket](/t/socket)).
- Shared memory — a region mapped into both processes' address spaces (see [mmap](/t/mmap)). The fastest for large data, because there's no copying, but the two processes must synchronise access themselves.
- Message queues — the OS delivers discrete messages, preserving boundaries.
- Signals — tiny notifications only (see [signal](/t/signal)), not for carrying data.

```text
pipe:          A ──bytes──▶ B          (stream, one-way)
socket:        A ◀──bytes──▶ B          (bidirectional, local or networked)
shared memory: A ◀──same pages──▶ B     (fastest, needs locking)
```

The classic mistakes:

- Using shared memory without synchronisation. Shared memory is extremely fast but provides no locking; without a mutex or semaphore, you get the usual [race conditions](/t/race-condition) — and possibly across processes, which is harder to debug.
- Copying huge data through pipes or sockets when shared memory would do. Streaming large buffers through a pipe copies them; shared memory doesn't. For big transfers, the difference is large.
- Choosing threads instead of processes without considering the isolation trade-off. Threads share memory (easy communication, easy bugs); processes isolate (safe, but need IPC). Pick deliberately.
- Forgetting the size limits. Pipes have finite buffers; writing faster than the reader blocks the writer (this is [backpressure](/t/backpressure) in action).
- Ignoring the security angle. Sockets and shared segments have permissions; allowing the wrong process to attach is a real risk.

IPC is the plumbing behind shell pipelines, database clients, and microservices on one host. The choice — stream vs messages vs shared memory — is a classic trade between simplicity, generality and speed, and it echoes the [actor model](/t/actor-model) and [channels](/t/channel) at the language level.
