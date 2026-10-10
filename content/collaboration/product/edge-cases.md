---
title: "Edge Cases"
summary: "Unusual inputs and situations that break naive code."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: mid-level }
aliases: ["corner cases", "boundary cases"]
prereqs: ["requirements"]
related: ["requirements", "user-empathy", "writing-clearly"]
---

An edge case is an input or situation that sits at the boundary of what the code was written for. Code that works for typical data often breaks on the unusual values: an empty list, a single item, zero, a very large number, a name with accents, a request that times out.

A small example shows the problem:

```python
def average(numbers):
    return sum(numbers) / len(numbers)

average([4, 6])   # 5.0
average([])       # ZeroDivisionError: division by zero
```

The happy path works, but an empty list crashes it. Decide what the function should return for no input, and handle that case on purpose.

Other common edge cases include duplicate submissions, two users changing the same record at once, input in another language or time zone, and a network failure partway through a multi-step action.

The classic mistake is testing only the case you imagined while writing the code. Before you call a feature finished, list the unusual inputs and ask what the product should do for each. The answers often reveal a missing [requirement](/t/requirements). For the other side of this, see [user empathy](/t/user-empathy).
