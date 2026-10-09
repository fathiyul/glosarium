---
title: "Extract Function"
summary: "Pulling a block of code into a well-named function."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["extract method", "extract function refactoring"]
prereqs: ["function", "refactoring"]
related: ["long-method", "refactoring", "automated-refactoring", "naming", "nesting-depth"]
---

Extract function is a refactoring where you take a block of code, move it into a new function, and replace the original with a call. It's the most used refactoring there is, and the standard cure for [long methods](/t/long-method).

Before:

```python
def print_invoice(order):
    total = 0
    for item in order.items:
        total += item.price * item.qty
    if order.customer.is_member:
        total *= 0.9
    print(f"{order.customer.name}: {total}")
```

After:

```python
def calculate_total(order):
    total = sum(i.price * i.qty for i in order.items)
    return total * 0.9 if order.customer.is_member else total

def print_invoice(order):
    print(f"{order.customer.name}: {calculate_total(order)}")
```

## When to do it

- A block needs a **comment to explain it**: turn the comment into a function name.
- A function does **several things**.
- The same code appears in **two places** ([DRY](/t/dry)).
- Deeply nested code could use a named inner step ([deep nesting](/t/nesting-depth)).

## How to do it safely

1. Make sure you have tests (or write a quick one) ([refactoring](/t/refactoring)).
2. Select the block and use your editor's extract function command ([IDE refactoring tools](/t/automated-refactoring)). It figures out parameters and return values.
3. **Name it for what it does**, not how ([naming](/t/naming)): `calculate_total`, not `loop_items`.
4. Run the tests.

By hand, check what the block reads (it becomes parameters) and what it changes (it becomes return values).

## Pitfalls

- **Too many parameters.** If the new function needs six arguments, the extraction cut across a boundary. Consider extracting a class or grouping values ([introduce parameter object](/t/introduce-parameter-object)).
- **Meaningless names** like `part2`.
- **Tiny functions that each need the others' details** can scatter the logic.
- **Behavior changes.** Extraction should not change what the code does.
