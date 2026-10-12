---
title: "Functional Programming"
summary: "Building programs from pure functions and immutable data."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["FP", "functional style"]
prereqs: ["immutability"]
related: ["immutability", "function-composition", "pure-function", "memoization", "option-type"]
---

Functional programming is a style where you build programs mainly from functions, with a preference for pure functions, which return the same output for the same input and change nothing outside themselves. It also favours immutable data and passing functions as values. Many mainstream languages support this style alongside other ones.

```python
prices = [12.0, 3.5, 8.0]

# Imperative: changes a running total step by step
total = 0
for p in prices:
    total += p

# Functional: builds the result from a pure expression
total = sum(p for p in prices)
```

The functional version is easier to test, since it depends only on its inputs. It also suits parallel work and makes it easier to reason about what can change.

The trade-offs are real. Creating new values instead of changing old ones costs memory and time, which is usually fine but can matter in tight loops. Real programs have side effects too, such as reading files, calling APIs and writing to databases, so a purely functional program is rarely possible. The practical approach is to keep the core logic pure and push side effects to the edges.

The classic mistake is following the style rigidly, writing convoluted chains of maps and reduces where a short loop would be clearer. Use the style where it simplifies the code, such as transforming data, and stop where it doesn't. For a specific idea, see [immutability](/t/immutability) and [memoization](/t/memoization).
