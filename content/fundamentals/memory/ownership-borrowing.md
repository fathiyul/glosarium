---
title: "Ownership and Borrowing"
summary: "Rust's compile-time rules that prevent memory bugs without a GC."
levels: { backend: senior }
aliases: ["ownership and borrowing", "rust ownership", "borrow checker"]
prereqs: ["manual-memory-management", "pointer"]
related: ["reference-counting", "garbage-collection", "dangling-pointer", "memory-leak", "immutability"]
---

**Ownership and borrowing** are Rust's rules for memory safety without a [garbage collector](/t/garbage-collection) and without manual `free`. They're checked by the compiler, so programs that would have a [dangling pointer](/t/dangling-pointer) or a use-after-free are rejected before they ever run.

The rules are small:

- Every value has a single **owner**.
- There is only one owner at a time; assigning or passing the value **moves** ownership.
- When the owner goes out of scope, the value is freed — automatically, deterministically.
- You can **borrow** the value with a reference instead of moving it, but: you may have either many shared (immutable) borrows *or* one mutable borrow, never both at once.

```rust
let s = String::from("hi");   // s owns the string
let r = &s;                   // r borrows it (shared)
println!("{r}");              // fine
// let m = &mut s;            // would be rejected while r is in use
```

That "shared XOR mutable" rule is what makes Rust's references safe without locks: the compiler guarantees no data race on borrowed data, and no reference outlives the value it points to (the "lifetimes" it checks).

The classic mistakes:

- Thinking it's a garbage collector. It isn't. Memory is freed exactly when the owner leaves scope — no background collector, no pause. That deterministic release is the selling point.
- Fighting the borrow checker with `.clone()`. Cloning silences the error by copying data, but doing it everywhere gives you an expensive, unidiomatic program. Usually a small restructuring — a narrower borrow scope, or passing a reference — is the real answer.
- Holding a borrow too long. Keeping a mutable borrow alive while you also need to read is the most common beginner error; the fix is to shorten the borrow's scope.
- Expecting it for every shared value. Single ownership can't express shared, cyclic data. That's what [`Rc`/`Arc` and reference counting](/t/reference-counting) and [weak references](/t/weak-reference) are for — you opt into runtime checks only where you need them.

Ownership is a third answer to "who frees the memory?", alongside manual management and garbage collection: the compiler proves it, so there's no runtime cost for the common case. It has a learning curve, but the classes of bugs it eliminates — use-after-free, double free, data races — are exactly the ones that plague systems code.
