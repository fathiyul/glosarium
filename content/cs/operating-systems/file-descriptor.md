---
title: "File Descriptor"
summary: "A handle to an open file, socket or pipe."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["file descriptor", "fd", "open file handle"]
prereqs: ["process", "system-call"]
related: ["ulimit", "socket", "connection-pooling", "epoll-kqueue"]
---

A **file descriptor** is a small non-negative integer the operating system gives a process to refer to an open resource — a file, a socket, a pipe, a terminal. When you open a file, you get back a number; you pass that number to every subsequent read or write. It's a **handle**: an opaque token for something the kernel is managing on your behalf.

```text
open("/etc/hosts") → 3        # read/write using descriptor 3
read(3, buf, 100)
close(3)
```

Three descriptors are open from the start of every process:

- `0` — standard input
- `1` — standard output
- `2` — standard error

The kernel keeps a per-process table mapping each descriptor to the underlying open resource, so the same integer can mean different things in different processes.

The classic mistakes:

- Leaking descriptors. Every `open`, `socket` or connection you don't `close` consumes a descriptor permanently. Eventually you hit the limit and get **"too many open files"** — a failure that starts as mysterious and snowballs.
- Ignoring the limit. Each process has a cap on open descriptors (see [resource limits](/t/ulimit)). Busy servers routinely need it raised; the default is often too low for high concurrency.
- Reusing a closed number accidentally. Descriptor numbers are reused; writing to a stale number writes to whatever now owns it — a subtle, dangerous bug (a cousin of a [dangling pointer](/t/dangling-pointer)).
- Assuming the number is an index or an ID. It's just a slot in the table. It isn't stable across processes and carries no meaning beyond "handle".
- Forgetting that sockets are files too. A network connection consumes a descriptor, so connection-heavy code is really descriptor-heavy code.

Descriptors are how the Unix "everything is a file" idea stays concrete: reading a socket and reading a text file use the same interface. They underpin [epoll/kqueue](/t/epoll-kqueue) (which watch many descriptors for readiness) and [connection pooling](/t/connection-pooling) (which bounds how many are in use). Watch them with `ls /proc/<pid>/fd` and tune the limit when a service handles many connections.
