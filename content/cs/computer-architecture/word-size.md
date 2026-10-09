---
title: "32-bit vs 64-bit"
summary: "The size of numbers and addresses a CPU handles natively."
levels: { backend: junior, frontend: junior }
aliases: ["32-bit vs 64-bit", "word length", "architecture bits"]
prereqs: ["bits-and-bytes", "cpu"]
related: ["bits-and-bytes", "integer", "integer-overflow", "ram", "cpu"]
---

A CPU's word size is the number of bits it handles natively in one go: the size of its registers and, usually, of memory addresses. Modern computers are almost all 64-bit. Older and some embedded systems are 32-bit.

## What changes

| | 32-bit | 64-bit |
|---|---|---|
| Native integer | 32 bits (about ±2.1 billion signed) | 64 bits (about ±9.2 × 10¹⁸) |
| Memory addresses | 32 bits → up to 4 GiB addressable | 64 bits → vastly more (limited by hardware in practice) |
| Pointers | 4 bytes | 8 bytes |

The 4 GiB limit is why 32-bit systems couldn't use much RAM, and why 64-bit became standard.

## Where it shows up in your work

- **Integer overflow.** A 32-bit counter wraps or fails after about 2.1 billion. Row IDs, timestamps and byte counts can outgrow it ([integer overflow](/t/integer-overflow)). The "year 2038 problem" is a signed 32-bit seconds counter running out ([Unix timestamps](/t/unix-timestamp)).
- **Database column types**: `INT` is 32-bit, `BIGINT` is 64-bit. Use `BIGINT` for IDs that might grow.
- **Software builds**: x86 (32-bit) vs x86-64 / amd64 and ARM64 binaries. A mismatch gives "cannot execute binary file" or a wrong-architecture error. Docker images are built per architecture too.
- **Memory use**: pointers double in size, so 64-bit programs can use more memory for the same data.
- **Language integers**: Java's `int` is always 32-bit and `long` 64-bit, whatever the machine. C's `int` size depends on the platform. Python and JavaScript hide it (arbitrary-size integers, and doubles).
- **Bitwise operations** and file offsets depend on the width.

## Practical advice

- Use 64-bit types for IDs, counters and sizes unless you're sure.
- Check which architecture you're building for (Apple silicon, ARM servers, x86) when deploying.
- Don't assume a number fits in 32 bits just because it does today.
