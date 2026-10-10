---
title: "Channel"
summary: "A typed pipe for passing values between concurrent tasks."
levels: { backend: senior, data-engineer: senior }
aliases: ["channel", "go channel", "mpmc channel"]
prereqs: ["thread", "producer-consumer"]
related: ["green-thread", "coroutine", "message", "queue", "mutex", "actor-model"]
---

A **Channel** is a typed conduit that one concurrent task writes to and another reads from — a pipe with a type. Instead of sharing memory and protecting it with a lock, tasks hand values to each other over a channel. Send and receive are the only operations; the channel carries the data and the synchronisation together.

```go
ch := make(chan int)     // unbuffered
go func() { ch <- 42 }() // send
v := <-ch                // receive (blocks until a value arrives)
```

Channels come in two flavours:

- **Unbuffered** — a send blocks until a receiver is ready, and a receive blocks until a sender arrives. This rendezvous *is* the synchronisation: the two tasks meet at the channel.
- Buffered — the channel holds up to N values; a send blocks only when the buffer is full, a receive only when it's empty. The buffer decouples the two tasks in time.

Many languages also offer a `select` (or equivalent) to wait on several channels at once, which is how you build timeouts and multiplexing.

The classic mistakes:

- Sending on a closed channel. In Go this panics. Only the *sender* should close a channel, and only when it won't send again — a receiver closing it, or a second sender closing it, causes crashes on the next send.
- Deadlock on an unbuffered channel. If a task sends but nobody ever receives (or vice versa), it blocks forever. Buffered channels reduce this but don't remove it.
- Leaking goroutines or tasks. A task blocked on a channel that will never receive stays alive forever. Always make sure every send has a receiver, or provide a cancellation path.
- Unbounded buffering. A large buffer looks like it solves throughput, but it just postpones the problem and hides missing [backpressure](/t/backpressure). Bound it.
- Using channels where a lock is simpler. Channels are excellent for passing ownership of data between tasks; a small shared counter is still often clearer with a [mutex](/t/mutex).

A common guideline captures the trade-off: *share memory by communicating, don't communicate by sharing memory.* Channels make the handoff of data explicit, which is why they're central to Go, and appear as `mpsc`/`crossbeam` in Rust and as queues in other runtimes. They pair naturally with [green threads](/t/green-thread) and the [actor model](/t/actor-model).
