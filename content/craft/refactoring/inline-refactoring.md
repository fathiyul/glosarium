---
title: "Inline Function / Variable"
summary: "Replacing an unnecessary indirection with its body."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["inline function", "inline variable", "inline method"]
prereqs: ["refactoring"]
related: ["extract-function", "refactoring", "automated-refactoring", "readability", "rename-refactoring"]
---

Inlining is the opposite of [extracting](/t/extract-function): you replace a function call or a variable with its body or value, because the indirection isn't helping.

## Inline a variable

```python
# before
base = order.price * order.quantity
return base

# after
return order.price * order.quantity
```

A temporary variable that's used once and adds no explanation can go.

## Inline a function

```python
# before
def is_adult(user):
    return user.age >= 18

def can_vote(user):
    return is_adult(user)         # a pointless wrapper

# after
def can_vote(user):
    return user.age >= 18
```

## When to inline

- The body is **as clear as the name**, or clearer.
- A function is a **thin wrapper** that only calls another.
- You've gone too far with extraction, and tracing the code means jumping through many tiny functions.
- It's a **first step** before restructuring: inline everything into one place, then re-extract better pieces.
- The variable name adds nothing (`result = x; return result`).

## When not to

- **The name explains something** the code doesn't. `is_eligible_for_discount(user)` can hide a complicated condition.
- **The function is used in many places**, or part of a public interface.
- **Overridden methods** in subclasses, or functions passed as callbacks, can't simply be inlined.

## Safety

- Inline with your editor's tool, which updates every call ([automated refactoring](/t/automated-refactoring)).
- Beware of **side effects** and evaluation order: inlining an expression with side effects into several places changes how often it runs.
- Run the tests before and after ([refactoring](/t/refactoring)).

Extract and inline are two tools for the same goal: code that's easy to read ([readability](/t/readability)).
