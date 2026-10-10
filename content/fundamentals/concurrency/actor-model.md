---
title: "Actor Model"
summary: "Concurrency through isolated actors that communicate by messages."
levels: { backend: senior, data-engineer: senior }
aliases: ["actor model", "actors", "message passing concurrency"]
prereqs: ["thread", "message"]
related: ["channel", "race-condition", "mutex", "producer-consumer", "event-bus"]
---

The **Actor model** is a way to do concurrency without shared memory. Instead of threads reading and writing the same variables under locks, you have **actors**: independent units, each with its own private state and a mailbox. Actors only interact by sending **messages**. Each actor processes the messages in its mailbox one at a time.

```text
Actor A ──message──▶ [mailbox] ──▶ Actor B (handles one at a time)
```

Two consequences make it attractive:

- No data races, because actors never share mutable state. An actor's state is touched only by its own message handler, so no lock is needed *inside* it. The classic [race conditions](/t/race-condition) of shared-memory threading simply don't apply between actors.
- Location transparency. Because communication is just messages, an actor doesn't care whether the target is in the same process or on another machine. This is what frameworks like Erlang/Elixir and Akka build on for distributing work.

The classic mistakes:

- Assuming it eliminates all races. It removes shared-memory races, but messages still have ordering questions, and an actor can't assume the world is consistent across a message boundary.
- Unbounded mailboxes. If an actor receives messages faster than it processes them, its mailbox grows without limit and memory blows up — the actor version of missing [backpressure](/t/backpressure). Bound mailboxes and slow producers.
- Request/reply deadlock. The commonest bug: actor A waits for a reply from B while B waits for one from A. Message passing doesn't remove deadlock; it moves it to the message graph.
- Tight coupling by blast. Sending messages to thousands of actors and expecting synchronous, ordered results. The model is asynchronous; design for that.
- Reinventing actors. You rarely implement this by hand; languages and libraries provide actors, [channels](/t/channel) or process supervision.

The actor model is a strong fit for systems that are naturally many independent, stateful entities — chat, game sessions, IoT devices — and it's one of the two big answers to concurrency, alongside shared-memory threads with locks.
