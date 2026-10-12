---
title: "Command-Query Separation"
summary: "A method should either change state or return data, not both."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["CQS", "command query separation"]
prereqs: ["function"]
related: ["cqrs", "side-effect", "pure-function", "encapsulate-what-varies"]
---

Command-query separation (CQS) is the principle that a method should either change state, which makes it a command, or return information, which makes it a query, but not both. Bertrand Meyer described it in his work on object-oriented design. Queries can be called freely without changing anything, and commands are clearly marked as the places where state changes.

```python
stack = []

def push(stack, item):      # command: changes state, returns nothing
    stack.append(item)

def peek(stack):            # query: returns data, changes nothing
    return stack[-1]
```

A query that quietly changes state surprises callers. A `pop` that both removes and returns an item is a common, practical exception, and many libraries accept it. CQS is a guideline for keeping the two kinds of operation easy to reason about, not a law.

The trade-off is convenience against clarity. Separating the two can mean two calls where one would do, and an extra call adds a chance for a race if other code changes state in between. In concurrent code, a combined operation may be needed for correctness.

The classic mistake is a getter that logs, caches, or updates a counter, so calling it has effects the reader doesn't expect. Keep queries free of side effects, and name commands so their effect is clear. The same idea, applied to whole systems, appears in [CQRS](/t/cqrs), and the [pure function](/t/pure-function) is the extreme case of a query.
