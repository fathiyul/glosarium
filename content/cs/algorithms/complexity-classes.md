---
title: "Common Complexity Classes"
summary: "O(1), O(log n), O(n), O(n log n), O(n\u00b2), O(2\u207f) and what they feel like in practice."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["O(n) classes", "growth rates", "Big O classes"]
prereqs: ["big-o-notation"]
related: ["big-o-notation", "time-complexity", "space-complexity", "np-complete", "sorting-algorithms"]
---

Big O notation groups algorithms into classes by how their cost grows as the input size n grows. Knowing the common ones tells you what scales and what doesn't.

| Class | Name | Feels like | Example |
|---|---|---|---|
| O(1) | constant | instant, regardless of size | array access, dictionary lookup |
| O(log n) | logarithmic | barely grows | [binary search](/t/binary-search) |
| O(n) | linear | doubles when n doubles | scanning a list |
| O(n log n) | linearithmic | a bit over linear | good sorts ([sorting](/t/sorting-algorithms)) |
| O(n²) | quadratic | n doubles, work quadruples | nested loops over the same data |
| O(2ⁿ) | exponential | unusable past ~30 | trying every subset |
| O(n!) | factorial | unusable past ~12 | trying every ordering |

## What it means with numbers

Roughly how many steps for n items:

| n | log n | n | n log n | n² |
|---|---|---|---|---|
| 10 | 3 | 10 | 33 | 100 |
| 1,000 | 10 | 1,000 | 10,000 | 1,000,000 |
| 1,000,000 | 20 | 1,000,000 | 20,000,000 | 10¹² |

At a million items, n² is a trillion steps, which is hours. n log n is a fraction of a second.

## Rules of thumb

- **Nested loops** over the same data usually mean O(n²).
- **Halving** the problem each time gives log n.
- **Loop plus a lookup in a list** hides O(n²): `for x in a: if x in b` where `b` is a list. Make `b` a set ([hash tables](/t/hash-table)).
- **Drop constants and smaller terms**: 3n + 10 is O(n).
- The classes describe growth, not speed. For small n, an O(n²) algorithm can beat an O(n log n) one.

Exponential and factorial algorithms are the territory of hard problems ([NP-complete](/t/np-complete)). See [Big O notation](/t/big-o-notation).
