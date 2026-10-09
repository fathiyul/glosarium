---
title: "Shallow vs Deep Copy"
summary: "Copying only the top level vs copying everything nested inside."
levels: { backend: junior, frontend: junior }
aliases: ["shallow copy", "deep copy", "cloning objects"]
prereqs: ["mutable-vs-immutable", "pass-by-value-vs-reference"]
related: ["spread-operator", "structured-clone", "immutability", "equality-vs-identity"]
core: [frontend]
---

Copying a value that contains other values has two levels:

- A **shallow copy** makes a new outer container, but the items inside are still the *same*
  objects as in the original.
- A **deep copy** copies everything nested inside too, so the two share nothing.

```python
import copy

original = {"name": "Ana", "tags": ["a", "b"]}

shallow = copy.copy(original)       # also: dict(original), original.copy()
deep = copy.deepcopy(original)

shallow["tags"].append("c")
print(original["tags"])   # ['a', 'b', 'c']  <- changed through the shallow copy!
print(deep["tags"])       # ['a', 'b']
```

Changing `shallow["name"]` would be safe (strings are immutable), but the `tags` list is
shared. This is the classic surprise: you copied, edited the copy, and the original changed.

## How to copy in each language

| | Shallow | Deep |
|---|---|---|
| Python | `list(x)`, `x[:]`, `x.copy()`, `copy.copy(x)` | `copy.deepcopy(x)` |
| JavaScript | `{ ...obj }`, `[...arr]`, `Object.assign({}, obj)` | `structuredClone(obj)` |

`JSON.parse(JSON.stringify(obj))` is a common deep-copy trick, but it silently drops
`undefined` and functions and turns dates into strings. Prefer `structuredClone` in modern
runtimes (see [structuredClone](/t/structured-clone)).

## Which do you need?

Usually a shallow copy is enough, **if you only replace values at the top level**. If you
change something nested, either deep copy first or copy each level you touch:

```js
const next = { ...state, user: { ...state.user, name: "Bo" } };
```

Deep copies cost time and memory on big structures, so don't reach for them by reflex.
Equal-looking copies are still different objects; see
[equality vs identity](/t/equality-vs-identity).
