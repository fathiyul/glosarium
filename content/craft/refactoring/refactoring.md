---
title: "Refactoring"
summary: "Changing code's structure without changing its behavior."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["refactor", "code refactoring", "restructuring code"]
prereqs: ["unit-test", "clean-code"]
related: ["extract-function", "rename-refactoring", "code-smell", "characterization-test", "legacy-code", "technical-debt"]
core: [backend, frontend, data-engineer]
---

**Refactoring** means improving the structure of code **without changing what it does**.
From the outside, nothing is different: the same inputs give the same outputs. Inside, it's
easier to read, change and extend.

```python
# Before
def price(order):
    total = 0
    for item in order.items:
        total += item.price * item.qty
    if order.customer.is_member:
        total = total * 0.9
    return total

# After: extracted and named, same behavior
def price(order):
    return apply_member_discount(order, subtotal(order))
```

## The safety rule: have tests

Because the goal is *no change in behavior*, you need a way to prove it. Run the tests before,
and after every small step. If there aren't any, write
[characterization tests](/t/characterization-test) first, to pin down what the code does today.

## How to do it safely

1. Make **one small change** at a time ([extract function](/t/extract-function),
   [rename](/t/rename-refactoring), move, inline).
2. Run the tests.
3. Commit when green.
4. Repeat.

Editors and IDEs have automatic refactorings (rename, extract) that are safer than doing them by hand.

## Don't mix hats

Refactor **or** add a feature or fix a bug, but not both in the same commit. When behavior and
structure change together, a failing test could be caused by either, and reviewers can't tell
what's what. Put refactoring in its own commit or [small PR](/t/small-prs).

## When

- Before adding a feature to messy code ("make the change easy, then make the easy change").
- When you spot a [code smell](/t/code-smell) in code you're touching.
- Not as a giant rewrite. See [big-bang rewrite](/t/big-bang-rewrite) for why that usually goes badly.
