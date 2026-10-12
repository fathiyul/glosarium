---
title: "Integer"
summary: "A whole-number type, usually with a fixed size and range."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["int", "whole number", "signed integer"]
prereqs: ["data-type"]
related: ["floating-point", "integer-overflow", "bits-and-bytes", "binary-number", "primitive-type"]
---

An integer is a whole number with no fractional part: `-3`, `0`, `42`. It's the type to use for counting and for anything that must be exact, like IDs, quantities and money in cents.

```python
7 // 2      # 3    integer division
7 % 2       # 1    remainder
7 / 2       # 3.5  true division gives a float
```

## Size and range

In many languages an integer has a **fixed size** in bits, so it has a limited range:

| Type | Range |
|---|---|
| 8-bit signed | -128 to 127 |
| 32-bit signed | about ±2.1 billion |
| 64-bit signed | about ±9.2 × 10¹⁸ |

Going past the limit is an [overflow](/t/integer-overflow). Python integers grow as needed, while JavaScript has only floating-point `Number`, which is exact for integers up to 2⁵³ − 1 and has `BigInt` beyond that.

## Things to watch

- **Integer division.** `7 / 2` is `3` in some languages (Java, C) and `3.5` in others (Python 3, JavaScript).
- **Negative remainders** differ between languages (`-7 % 3`).
- **Exact comparisons.** Unlike floats, integers compare reliably ([floating point](/t/floating-point)).
- **IDs are not for arithmetic.** Phone numbers and postal codes look numeric but are better as strings (leading zeros matter).
- **Pick a type with room.** A 32-bit auto-increment ID runs out at about 2.1 billion rows.

Money should be stored as integers of the smallest unit, or exact decimals ([money precision](/t/money-precision)).
