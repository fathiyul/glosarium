---
title: "Function"
summary: "A named, reusable block of code that takes inputs and returns an output."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["method", "subroutine", "procedure"]
prereqs: ["variable"]
related: ["parameter-vs-argument", "return-value", "scope", "default-parameter", "first-class-function"]
---

A function is a named, reusable block of code. You give it inputs, it does some work, and it hands back a result.

```python
def total_price(price, quantity, tax_rate=0.2):
    subtotal = price * quantity
    return subtotal * (1 + tax_rate)

total_price(10, 3)        # 36.0
```

Defining the function writes the recipe. **Calling** it runs it. The same function can be called from many places with different [arguments](/t/parameter-vs-argument), which is how you avoid copying code.

## What makes a good one

- **One job, and a name that says it.** `calculate_tax` is clear. `process` isn't ([naming](/t/naming)).
- **Inputs in, result out.** Prefer returning a value over changing things behind the scenes ([return values](/t/return-value)).
- **Short enough to read at once.** If you need to scroll, or a comment to mark sections, split it.
- **Variables stay inside.** Names created in a function exist only there ([scope](/t/scope)).

## A common mistake

Forgetting to return:

```python
def add(a, b):
    a + b          # computed, then thrown away; the caller gets None
```

In most languages a function without `return` gives back nothing (`None`, `undefined`).

## Also called

Methods are functions attached to an object (`user.save()`). Many languages treat functions as values you can pass around ([first-class functions](/t/first-class-function)).
