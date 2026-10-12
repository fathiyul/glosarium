---
title: "Spread / Rest Syntax"
summary: "Expanding or collecting elements with ... (or * and ** in Python)."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["spread syntax", "rest parameters", "rest syntax", "unpacking operator", "star args"]
prereqs: ["array", "destructuring"]
related: ["destructuring", "shallow-vs-deep-copy", "immutability", "default-parameter"]
core: [frontend]
---

The three dots `...` do two opposite jobs in JavaScript, depending on where they appear:

- **Spread** expands a collection into separate items.
- **Rest** gathers separate items into a collection.

```js
// Spread: expand
const a = [1, 2];
const b = [...a, 3, 4];                    // [1, 2, 3, 4]
const user = { name: "Ana", role: "user" };
const admin = { ...user, role: "admin" };  // { name: "Ana", role: "admin" }
Math.max(...[3, 9, 4]);                    // 9

// Rest: gather
function sum(...nums) {                    // nums = [1, 2, 3]
  return nums.reduce((x, y) => x + y, 0);
}
const { name, ...others } = user;          // others = { role: "user" }
```

When keys repeat in an object spread, **later ones win**, which is why `{ ...user,
role: "admin" }` overrides the role. Put defaults first and overrides last.

## Why it matters

Spread is the everyday way to build a *new* array or object instead of changing the old one,
which is what UI code and [immutable](/t/immutability) updates want. But it's a **shallow**
copy: nested objects are still shared. See [shallow vs deep copy](/t/shallow-vs-deep-copy).

## In Python

Python uses `*` and `**`:

```python
b = [*a, 3, 4]                  # like [...a, 3, 4]
merged = {**defaults, **overrides}

def log(message, *args, **kwargs):   # gather extra positional and keyword arguments
    print(message, args, kwargs)

log("hi", 1, 2, level="info")   # args = (1, 2), kwargs = {'level': 'info'}
```

Rule of thumb: spread when you're building a value, rest when you're collecting leftovers.
