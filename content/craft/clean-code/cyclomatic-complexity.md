---
title: "Cyclomatic Complexity"
summary: "A count of independent paths through code; a rough complexity measure."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["McCabe complexity", "cyclomatic number"]
prereqs: ["conditional"]
related: ["code-smell", "unit-test", "feature-envy", "broken-windows"]
---

Cyclomatic complexity is a count of the independent paths through a piece of code. A straight-line function has one path. Each decision, such as an `if`, a loop or a case in a `switch`, adds another, so the number grows with the number of branches. Thomas McCabe proposed it in 1976 as a way to estimate how hard code is to test and understand.

```python
def shipping(total, express, zone):
    if total >= 100 and express:   # decision 1 (and some tools count `and` too)
        cost = 0
    elif express:                  # decision 2
        cost = 20
    elif zone == "remote":         # decision 3
        cost = 15
    else:
        cost = 5
    return cost                    # roughly 4 paths here; counting rules vary by tool
```

Each path needs at least one test to cover it, so the number gives a rough minimum for thorough testing. High values flag functions that are likely to be hard to read and easy to get wrong.

The trade-off is that the number is a rough signal, not a verdict. A long function with a simple table lookup can score low, and a short one with clever logic can score high. Different tools count `and`, `or` and early returns differently, so compare numbers only within one tool.

The classic mistake is splitting a function just to lower the number, which can scatter its logic across helpers that are harder to follow. Use the score to find functions worth a second look, then ask whether a rule, a lookup table or an early return would make the logic clearer. Code with many branches also often reads as a case for [moving behaviour to the data it depends on](/t/feature-envy).
