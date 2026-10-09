---
title: "Return Value"
summary: "The result a function hands back to its caller."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["return statement", "function result", "return type"]
prereqs: ["function"]
related: ["function", "parameter-vs-argument", "control-flow", "expression-vs-statement", "null"]
---

A return value is the result a function hands back to whoever called it.

```python
def area(width, height):
    return width * height

size = area(3, 4)       # size is 12
```

`return` also **ends the function immediately**. Code after it doesn't run.

```python
def sign(n):
    if n < 0:
        return "negative"
    if n == 0:
        return "zero"
    return "positive"
```

## Functions that return nothing

A function without `return` gives back a default: `None` in Python, `undefined` in JavaScript. That's usually a bug when you meant to return something:

```python
def add(a, b):
    a + b               # no return, so the caller gets None
```

## Returning more than one thing

Return a tuple or an object:

```python
def min_max(items):
    return min(items), max(items)

low, high = min_max([3, 1, 4])
```

## Habits

- **Be consistent.** If some paths return a value and others fall off the end, callers get surprises. Return the same kind of thing every time.
- **Don't use `None` as a hidden error code.** Raise an exception, or document that it can return nothing ([null](/t/null)).
- **Prefer returning over modifying inputs.** A function that returns its result is easier to test and reason about.
- **Name functions for what they return** (`get_total`, `is_valid`).
- Separate functions that **do** something from ones that **answer** something.
