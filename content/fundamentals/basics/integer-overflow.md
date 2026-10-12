---
title: "Integer Overflow"
summary: "A value exceeding its type's range and wrapping around or failing."
levels: { backend: mid-level, frontend: senior, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["overflow", "integer wraparound"]
prereqs: ["data-type"]
related: ["data-type", "bitwise-operation", "sql-data-types", "truthy-falsy"]
---

An integer type has a fixed range of values. An 8-bit signed integer holds -128 to 127. When arithmetic produces a result outside that range, the value overflows. What happens next depends on the language: some wrap around silently, some raise an error, and some keep the full value.

Here's what wrapping looks like for an 8-bit signed integer, where 127 is the largest value:

```
127 + 1  ->  -128     (wraps around to the bottom of the range)
```

For 32-bit signed integers, the same thing happens at 2147483647 + 1, which becomes -2147483648. Languages differ in how they handle it:

- **Wrap silently:** Java's `int` and Go's fixed-size integers wrap on overflow, and so do JavaScript's bitwise operators. Check your language's documentation for the exact rule.
- **Undefined:** in C and C++, signed integer overflow is undefined behaviour, so the compiler may assume it never happens.
- **Arbitrary precision:** Python's `int` has no fixed size, so `2**63 + 1` gives the exact result. Other languages offer big-integer types for the same purpose.

JavaScript's ordinary numbers are a different case again. They're 64-bit floats, and above 9007199254740991 (`Number.MAX_SAFE_INTEGER`) they lose exact integer precision, so `Number.MAX_SAFE_INTEGER + 2` is not what you'd expect.

The classic mistake is assuming a number will always fit. It works in tests with small values, then fails in production with an ID, a total in cents, or a timestamp in milliseconds. Use a wider type where the values can grow, and check the limit of the type you chose. [Bitwise operations](/t/bitwise-operation) follow the same rules, which matters when you shift or mask values.
