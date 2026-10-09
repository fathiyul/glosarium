---
title: "Guard Clause"
summary: "Returning early on invalid cases to avoid deep nesting."
levels: { backend: junior, frontend: junior }
aliases: ["early return", "guard clauses", "bouncer pattern"]
prereqs: ["conditional", "return-value"]
related: ["fail-fast", "defensive-programming", "readability", "assertion"]
core: [backend]
---

A **guard clause** checks for a bad or special case at the top of a function and returns (or
raises) right away, so the rest of the function can assume things are fine.

Compare nested conditions:

```python
def ship(order):
    if order is not None:
        if order.is_paid:
            if order.items:
                return create_shipment(order)
            else:
                raise ValueError("empty order")
        else:
            raise ValueError("not paid")
    else:
        raise ValueError("no order")
```

with guards:

```python
def ship(order):
    if order is None:
        raise ValueError("no order")
    if not order.is_paid:
        raise ValueError("not paid")
    if not order.items:
        raise ValueError("empty order")

    return create_shipment(order)       # the real work, no nesting
```

Both do the same thing. The second reads top to bottom: the checks first, then the point of
the function at the normal indentation level.

## Why it helps

- Less nesting, so fewer lines to hold in your head.
- Each failure case sits next to its error message.
- The "happy path" is easy to find: it's what's left at the bottom.

## When not to use it

A function with many `return`s in complex logic can get hard to follow. If a function needs
five guards, check whether it's doing too much or whether the inputs should be validated
earlier. Also be consistent about *what* a guard does: raise an error, or return a default
value. Guard clauses are the everyday form of [failing fast](/t/fail-fast).
