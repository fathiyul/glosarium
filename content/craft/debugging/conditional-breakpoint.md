---
title: "Conditional Breakpoint"
summary: "Pausing only when a condition is true."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["breakpoint condition", "conditional break"]
prereqs: ["debugger"]
related: ["debugger", "heisenbug", "profiler", "five-whys"]
---

A conditional breakpoint pauses execution only when an expression is true. It's the way to stop inside a loop of ten thousand iterations at the one where something goes wrong, instead of stepping through every one.

Python's built-in debugger, `pdb`, supports it with `b` followed by a condition after a comma. In this example, the program stops at line 3 only when `i` equals 5:

```
b loop.py:3, i == 5
c
p i, total
```

With `loop.py` containing a loop that accumulates squares, the stop happens at `i == 5`, and `p i, total` prints the current values. Most IDEs offer the same thing through a breakpoint's condition setting.

The trade-off is cost. A condition is evaluated every time the line is reached, so a complex condition inside a hot loop can slow the program down a lot, and the slowdown can change the timing you're trying to observe. Conditions can also be wrong in a quiet way: a comparison that never matches means the breakpoint never fires, and you may conclude the code path never runs.

The classic mistake is putting a breakpoint in a loop with no condition and clicking continue dozens of times. The other is forgetting that a condition is still running on every pass. Use conditions to narrow the stop point, and remove breakpoints when you're done. For bugs that disappear when you observe them, see [heisenbugs](/t/heisenbug).
