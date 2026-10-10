---
title: "Buffer Overflow"
summary: "Writing past the end of a buffer and corrupting memory; a classic vulnerability."
levels: { backend: senior }
aliases: ["buffer overflow", "buffer overrun", "stack smashing"]
prereqs: ["pointer", "manual-memory-management"]
related: ["stack-vs-heap", "cve", "integer-overflow", "bitwise-operation"]
---

A **Buffer overflow** happens when a program writes more data into a fixed-size buffer than it holds, so the extra bytes spill into neighbouring memory. In a language without bounds checking, nothing stops the write: the bytes land wherever the buffer's memory ends, silently corrupting whatever is there.

```c
char buf[8];
strcpy(buf, "this string is far too long");  // writes past buf[7]
```

This is more than a crash. The adjacent memory might be another variable, saved registers, or a function's **return address**. If an attacker controls the overflowing input, they can overwrite the return address so that when the function returns, execution jumps to code they chose. That's **stack smashing**, historically one of the most exploited classes of bug.

The classic mistakes:

- Off-by-one. `buf[8]` holds indices 0–7; writing `buf[8]` is already one past the end — the boundary that a loop or a string length gets wrong.
- Unsafe string functions. `strcpy`, `strcat` and `sprintf` copy until a null byte with no regard for the destination size. Bounded versions (`strncpy`, `snprintf`) exist for a reason.
- Trusting input length. Assuming a field will never be longer than expected is exactly the assumption an attacker breaks.
- Thinking managed languages are immune. Safe languages prevent overflows in their own code, but any native extension, FFI call, or unsafe block can reintroduce them.

Defences: languages with bounds checking, careful use of safe functions, validating and limiting input length, and — at the operating-system level — stack canaries, address-space layout randomisation and non-executable stacks, which make exploitation harder (see [integer overflow](/t/integer-overflow) for a related, subtler class). A buffer overflow is a memory-safety bug; the durable fix is to use a memory-safe language where you can.
