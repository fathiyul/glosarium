---
title: "Socket"
summary: "An endpoint for sending and receiving data over a network."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["socket", "sockets", "network socket"]
prereqs: ["tcp", "udp"]
related: ["connection-pooling", "inspecting-connections", "file-descriptor"]
---

A **socket** is the programming interface to the network: your code opens one, connects (or binds and listens), and reads and writes bytes. Every connection you've ever debugged — the thing in `ESTABLISHED` state, the thing your server accepts, the thing that leaks — is a socket, which is also just a file descriptor.

```text
client: socket → connect(server:port) → write request, read response
server: socket → bind(port) → listen → accept → one socket per connection
```

The two flavours mirror the transports: stream sockets (TCP — ordered, reliable bytes) and datagram sockets (UDP — independent messages, no guarantees). Options on the socket tune behaviour: non-blocking mode, timeouts, keep-alive probes, buffer sizes, `SO_REUSEADDR` for quick restarts.

The classic mistakes:

- Leaking sockets. Every accepted connection not eventually closed consumes a file descriptor; "too many open files" under load is usually leaked sockets. Close in `finally`, and monitor counts.
- Blocking the thread on a socket. A thread parked in a blocking read handles nothing else. Non-blocking I/O or a proper concurrency model keeps one slow peer from stalling the server.
- Assuming one write equals one read (TCP). Stream sockets have no message boundaries — reads return whatever's arrived. Frame messages yourself.
- Ignoring half-closed states. A peer that shut down its side isn't necessarily gone; mishandled shutdowns pile up in CLOSE-WAIT. Handle EOF and errors explicitly.
- Binding the wrong address. `localhost` vs `0.0.0.0` decides whether anyone else can reach the service — the most common "works here, refused there" cause.
- Tuning buffers blindly. Bigger socket buffers don't fix a slow consumer; they just delay backpressure. Fix the consumption rate, not the cushion.
- Forgetting sockets are fds. Limits (`ulimit`), `select`/`epoll` readiness, and `lsof` visibility all follow from "a socket is a file descriptor" (see [file descriptor](/t/file-descriptor)).

**The mental model:** sockets are where bytes meet code. States, leaks, binds and blocking behaviour at this layer explain most connection mysteries — inspect them directly before theorising higher up.
