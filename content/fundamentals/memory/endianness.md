---
title: "Endianness"
summary: "The byte order of multi-byte numbers in memory."
levels: { backend: senior }
aliases: ["endianness", "little endian", "big endian"]
prereqs: ["serialization", "bitwise-operation"]
related: ["integer-overflow", "pointer", "cpu"]
---

**Endianness** is the order in which the bytes of a multi-byte number are stored. Take the 32-bit value `0x01020304`:

- **Big-endian** stores the most significant byte first: `01 02 03 04`.
- Little-endian stores the least significant byte first: `04 03 02 01`.

Both are the same number; they just lay it out differently. Most modern CPUs are little-endian, and some can do both. The trouble starts whenever bytes cross a boundary between systems that might disagree — a network packet, a file format, a memory-mapped device, or data written on one machine and read on another.

```text
value 0x01020304 in memory (increasing address):
big-endian:    01 02 03 04
little-endian: 04 03 02 01
```

In practice you rarely think about it, because a few rules handle most cases:

- Network protocols use big-endian ("network byte order"), and libraries provide conversions between host order and network order. Use them; don't send raw multi-byte integers.
- Serialization formats define their own order. JSON, Protocol Buffers and the like specify byte order, so they're portable. Writing a raw struct to a file is not.
- Endianness only matters at the boundary. Within one process on one machine, it's consistent and invisible.

The classic mistakes:

- Writing a struct's raw bytes to a file or socket. It works until the reader is on the other byte order. Serialize field by field, or use a defined format.
- Assuming "network order" is automatic. You have to convert; sends don't do it for you.
- Confusing byte order with bit order. Endianness is about *bytes*; bit numbering within a byte is a separate concern.
- Forgetting it in binary formats. Parsing a file whose spec says little-endian while your code assumes host order silently produces garbage numbers (see [serialization](/t/serialization)).

Endianness is a small detail with an outsized effect on portability and interoperability. The safe habit: never assume, always convert at the boundary, and prefer formats that specify their own layout. It's adjacent to [integer overflow](/t/integer-overflow), another place where the numeric representation bites.
