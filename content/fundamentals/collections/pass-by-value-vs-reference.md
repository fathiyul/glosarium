---
title: "Pass by Value vs Reference"
summary: "Whether a function receives a copy or a reference to the caller's data."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["call by value", "call by reference", "pass by reference", "call by sharing"]
prereqs: ["variable", "function", "mutable-vs-immutable"]
related: ["mutable-vs-immutable", "shallow-vs-deep-copy", "equality-vs-identity", "pointer"]
core: [backend]
---

When you pass a variable into a function, does the function get its own copy, or access to
the caller's original?

- **Pass by value:** the function gets a copy. Changing it has no effect outside.
- **Pass by reference:** the function gets an alias to the caller's variable. Changing it
  changes the caller's data.

Languages differ. C++ has both. Go passes copies. Python, JavaScript and Java do something
in between that's often called **call by sharing**: the function receives a copy of the
*reference*, so both names point at the same object.

## What call by sharing means in practice

```python
def add_item(items):
    items.append("x")      # changes the caller's list

def replace(items):
    items = ["y"]          # rebinds the local name only

my = ["a"]
add_item(my)    # my == ["a", "x"]
replace(my)     # my is still ["a", "x"]
```

Two rules cover it:

1. **Mutating** the object through the parameter is visible to the caller.
2. **Reassigning** the parameter is not.

Immutable values (numbers, strings, tuples) can't be mutated, so they behave as if they
were passed by value.

## The bug to avoid

A function that quietly edits its input:

```python
def top_three(scores):
    scores.sort(reverse=True)      # reorders the caller's list!
    return scores[:3]

def top_three_safe(scores):
    return sorted(scores, reverse=True)[:3]   # new list; input untouched
```

Prefer returning a new value over modifying arguments. If you must keep a private copy, make
one explicitly, and remember a plain copy is [shallow](/t/shallow-vs-deep-copy): nested
objects are still shared.

Rule of thumb: check your language's rule once, then assume a function can change any
mutable argument unless it says otherwise.
