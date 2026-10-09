---
title: "Equality vs Identity"
summary: "Same value vs same object in memory."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["== vs is", "value equality", "reference equality"]
prereqs: ["variable", "mutable-vs-immutable"]
related: ["equality-js", "mutable-vs-immutable", "shallow-vs-deep-copy", "pass-by-value-vs-reference"]
---

Two names can be equal, meaning they have the same value, or identical, meaning they're the very same object in memory.

```python
a = [1, 2]
b = [1, 2]
c = a

a == b        # True   same contents (equality)
a is b        # False  two separate lists (identity)
a is c        # True   one list, two names
```

Think of two printed copies of the same book (equal) versus one book with two bookmarks (identical).

## By language

| Language | Equality | Identity |
|---|---|---|
| Python | `==` | `is` |
| Java | `.equals()` | `==` for objects |
| JavaScript | `==`, `===` compare values for primitives | `===` on objects compares identity |

```js
[1, 2] === [1, 2]     // false: two different arrays
const x = [1, 2]; x === x   // true
```

JavaScript has no built-in deep equality for arrays and objects ([== vs ===](/t/equality-js)).

## Why it matters

- **Bugs from identity.** Comparing strings or lists with Java's `==`, or with `is` in Python, can work by accident (small numbers and strings are sometimes shared), then fail.
- **Shared mutable objects.** If two names are identical, changing one changes the other ([mutable vs immutable](/t/mutable-vs-immutable), [shallow vs deep copy](/t/shallow-vs-deep-copy)).
- **Dictionary and set keys** rely on value equality plus hashing.
- **React and similar tools** use identity checks to decide whether something changed, so mutating an object in place can hide the change.

Use `is` in Python mainly for `None` checks (`x is None`). Use `==` for values.
