---
title: "Panic"
summary: "An unrecoverable error that aborts the program or thread."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["panic!", "unrecoverable error"]
prereqs: ["exception"]
related: ["fail-fast", "error-codes-vs-exceptions", "checked-vs-unchecked-exception"]
---

A panic is an error the program treats as unrecoverable. It stops the current thread or the whole program, and unwinds the stack, instead of returning an error the caller is expected to handle. Go and Rust both have a `panic` mechanism, and it's meant for bugs and broken invariants, not for ordinary failures.

```go
func mustPositive(n int) int {
    if n <= 0 {
        panic("expected a positive number")  // a bug in the caller, not bad user input
    }
    return n
}
```

Rust works similarly with `panic!`. Its standard library uses panics for things like indexing past the end of a vector, because that's a bug in the code that should be fixed, not a case to handle at runtime.

Python doesn't have a separate panic mechanism. An uncaught exception ends the program in much the same way, and an `assert` that fails is the closest everyday equivalent for internal invariants.

The trade-off is that panics are blunt. They're useful for states that should never happen, where continuing would corrupt data. In Go, an unrecovered panic in any goroutine crashes the whole program. A deferred `recover` in that same goroutine can stop it. Go's standard `net/http` server already recovers panics inside a handler so one bad request doesn't take the server down, but a goroutine you start yourself from that handler has no such protection.

The classic mistake is using panic for expected errors, such as a missing file or a bad user input. Callers then have no normal way to handle the problem. Use returned errors for failures the caller can recover from, and panic only for broken assumptions. [Fail fast](/t/fail-fast) explains why stopping early is often right.
