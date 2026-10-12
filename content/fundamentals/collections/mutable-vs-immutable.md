---
title: "Mutable vs Immutable"
summary: "Whether a value can be changed after it's created."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["mutability", "immutable", "mutable"]
prereqs: ["variable", "data-type"]
related: ["immutability", "pass-by-value-vs-reference", "shallow-vs-deep-copy", "equality-vs-identity", "tuple"]
core: [backend, frontend]
---

A **mutable** value can be changed in place after it's created. An **immutable** value
can't: any "change" produces a new value and leaves the original alone.

| | Python | JavaScript |
|---|---|---|
| Immutable | `int`, `float`, `str`, `tuple`, `frozenset`, `bool`, `None` | numbers, strings, booleans, `null`, `undefined` |
| Mutable | `list`, `dict`, `set`, most objects | objects, arrays, `Map`, `Set` |

```python
name = "ana"
name.upper()         # returns "ANA"; name is still "ana"

items = [1, 2]
items.append(3)      # items itself is now [1, 2, 3]
```

## Why it matters: shared references

When two variables point to the same mutable value, changing it through one changes it for
the other:

```python
a = [1, 2]
b = a              # not a copy: both names point to the same list
b.append(3)
print(a)           # [1, 2, 3]
```

This causes bugs in two classic places:

- **Function arguments.** A function that modifies a list you passed in changes your list
  too. See [pass by value vs reference](/t/pass-by-value-vs-reference).
- **Python's mutable default argument.** In `def add(x, items=[])`, the same list is
  created once and shared by every call. Use `items=None` and create a new list inside.

## `const` is not immutability

In JavaScript, `const` stops you *reassigning* the variable, not changing the object:

```js
const user = { name: "Ana" };
user.name = "Bo";      // allowed
user = {};             // TypeError
```

`Object.freeze` blocks changes, but only at the top level.

## Working with immutable data

In UI code especially, prefer making a new value over editing the old one:

```js
const next = { ...user, name: "Bo" };      // new object
const added = [...items, newItem];         // new array
```

Frameworks like React rely on spotting a *new* object to know something changed. See
[immutability](/t/immutability) for the design idea, and
[shallow vs deep copy](/t/shallow-vs-deep-copy) for what copying does and doesn't protect.
