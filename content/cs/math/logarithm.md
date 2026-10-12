---
title: "Logarithms"
summary: "Why repeatedly halving something gives O(log n)."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["log", "log base 2", "logarithms"]
prereqs: ["big-o-notation"]
related: ["big-o-notation", "binary-search", "complexity-classes", "binary-number"]
---

A logarithm answers: how many times must I multiply (or divide) to get here? The base-2 logarithm of 8 is 3, because 2 × 2 × 2 = 8.

```
log₂(8)    = 3     (2³ = 8)
log₂(1024) = 10    (2¹⁰ = 1024)
log₂(1,000,000) ≈ 20
```

It's the inverse of an exponent: if 2³ = 8, then log₂(8) = 3.

## Why programmers care

Anything that **repeatedly halves** the problem takes about log₂(n) steps.

- **[Binary search](/t/binary-search)**: each comparison discards half the data. A million items need about 20 steps, and a billion need about 30.
- **Balanced trees and database indexes**: the height grows with log n ([balanced trees](/t/balanced-tree), [database indexes](/t/db-index)).
- **Divide and conquer** sorts like merge sort: n log n.
- **Number of bits** needed for n values: about log₂(n) ([binary and hexadecimal](/t/binary-number)).

That's why O(log n) is described as "barely grows" ([complexity classes](/t/complexity-classes)):

| n | log₂ n |
|---|---|
| 1,000 | 10 |
| 1,000,000 | 20 |
| 1,000,000,000 | 30 |

A thousand times more data adds only ten steps.

```python
import math
math.log2(1024)     # 10.0
math.log(100, 10)   # 2.0 (base 10)
math.log(math.e)    # 1.0 (natural log)
```

## Bases don't matter in Big O

log₂ n, log₁₀ n and ln n differ only by a constant factor, so people write just O(log n).

## Also seen in

Logarithmic scales (decibels, Richter, charts with a log axis, where equal steps mean multiplying), and in compounding, entropy and information theory.
