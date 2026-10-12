---
title: "Base Case"
summary: "The condition that stops recursion."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["recursion base case", "terminating condition", "stopping condition"]
prereqs: ["function", "recursion"]
related: ["recursion", "tail-recursion", "stack-overflow", "iteration"]
---

Every [recursive](/t/recursion) function needs a **base case**: an input simple enough to answer **directly**, without calling itself again. It's what makes the recursion **stop**.

```python
def factorial(n):
    if n <= 1:               # base case: no more recursion
        return 1
    return n * factorial(n - 1)   # recursive case: a smaller problem
```

Without the base case, the function calls itself forever, until the program runs out of stack space ([stack overflow](/t/stack-overflow)).

## Two rules

1. **There must be a base case**, and it must handle the simplest input (an empty list, `0`, a leaf node).
2. **Every recursive call must move toward it.** `factorial(n - 1)` gets closer to 1. A call like `factorial(n)` or `factorial(n + 1)` never arrives.

## Typical bugs

- **Missing or unreachable base case**: the input skips past it. `factorial(0)` with `if n == 1` recurses into negative numbers forever.
- **Wrong base-case value**: the stopping answer is wrong (`return 0` for factorial), so every result is wrong.
- **Forgetting the empty case**: recursing over a list without handling `[]`.

```python
def total(items):
    if not items:            # base case: empty list sums to 0
        return 0
    return items[0] + total(items[1:])
```

When writing a recursive function, **write the base case first**. Then ask: *if I trust the function to solve a smaller version, how do I combine that with this step?*
