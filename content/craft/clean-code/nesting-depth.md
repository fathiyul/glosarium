---
title: "Deep Nesting"
summary: "Too many levels of ifs and loops; flatten them with guard clauses."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["deep nesting", "arrow code", "nested ifs"]
prereqs: ["conditional", "loop"]
related: ["guard-clause", "cyclomatic-complexity", "readability", "long-method", "extract-function"]
---

Deep nesting means too many levels of `if`s and loops inside one another. Code drifts to the right, and you have to hold several conditions in your head to know when a line runs.

```python
def ship(order):
    if order is not None:
        if order.is_paid:
            if order.items:
                for item in order.items:
                    if item.in_stock:
                        send(item)
```

Five levels deep. Which condition does the last line depend on?

## Flatten it

**Use [guard clauses](/t/guard-clause)**: handle the bad cases first, and return.

```python
def ship(order):
    if order is None or not order.is_paid or not order.items:
        return
    for item in order.items:
        if item.in_stock:
            send(item)
```

**Extract a function** for the inner part ([extract function](/t/extract-function)):

```python
def ship(order):
    if not can_ship(order):
        return
    for item in in_stock_items(order):
        send(item)
```

**Use `continue`** inside loops to skip cases early:

```python
for item in order.items:
    if not item.in_stock:
        continue
    send(item)
```

## A rough guide

Two or three levels are normal. More than three is a signal to refactor. Deeply nested code also tends to have high [cyclomatic complexity](/t/cyclomatic-complexity), many paths to test.

## Other causes

- Handling errors with nested `try` blocks, or a pyramid of callbacks ([callback hell](/t/callback-hell)).
- A function doing too much ([long method](/t/long-method)).

Linters can warn when nesting passes a limit. See [readability](/t/readability).
