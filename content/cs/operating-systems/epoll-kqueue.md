---
title: "epoll / kqueue"
summary: "OS mechanisms for watching many sockets efficiently."
levels: { backend: senior, data-engineer: senior }
aliases: ["epoll", "kqueue", "io multiplexing"]
prereqs: ["file-descriptor", "socket"]
related: ["event-loop", "async-await", "context-switch", "system-call"]
---

**epoll** (Linux) and **kqueue** (BSD/macOS) let one thread watch many [file descriptors](/t/file-descriptor) at once and be told which have data ready. Instead of a thread per connection — each blocking on its own socket — a single event loop waits on thousands of descriptors and only wakes for the ones that need attention. They're the foundation of high-concurrency servers and the runtimes behind [async-await](/t/async-await).

```text
register sockets with epoll → by system call, get "these 20 are ready"
→ handle just those → wait again
```

The problem they solve is scale. Older APIs (`select`, `poll`) make the kernel scan the whole set of descriptors each time, which gets slower as connections grow. epoll/kqueue maintain the set in the kernel, so waiting is roughly proportional to the *active* descriptors, not the total. That's why a node can handle tens of thousands of idle connections cheaply.

The model is **readiness**, not completion: the OS tells you a descriptor *is ready to be read without blocking*, and your code does the read. It's not the same as asynchronous I/O that copies data for you in the background.

The classic mistakes:

- Thinking it makes I/O faster per request. It doesn't speed up a single operation; it lets one thread manage *many* without blocking, avoiding a thread per connection and its [context-switch](/t/context-switch) cost.
- Doing blocking work in the event loop. If a handler blocks (a slow synchronous call), the whole loop stalls and every connection waits. Keep handlers non-blocking and push slow work elsewhere.
- Confusing readiness with async I/O. epoll says "ready"; you still call `read`. True async I/O (`io_uring`, IOCP) is a different, newer model with different trade-offs.
- Forgetting the edge vs level trigger subtlety. Edge-triggered mode only notifies on changes, so you must drain until `EAGAIN` or you'll miss data; level-triggered re-notifies while ready. Mixing them up causes mysterious stalls.
- Assuming it's portable. `epoll` and `kqueue` are different APIs; libraries abstract them (the "event loop" you see in runtimes).

epoll/kqueue are why a single-threaded runtime can hold tens of thousands of connections, and why the synchronous "one thread per connection" model breaks down at scale. They're a load-bearing part of [event loops](/t/event-loop), non-blocking servers, and the async model generally.
