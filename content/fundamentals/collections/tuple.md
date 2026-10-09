---
title: "Tuple"
summary: "A fixed-size, ordered group of values, often of different types."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["tuples", "immutable list"]
prereqs: ["list"]
related: ["list", "array", "mutable-vs-immutable", "destructuring", "dictionary"]
---

A tuple is a fixed-size, ordered group of values, often of different types. In Python it's immutable: once created, it can't change.

```python
point = (3, 4)
person = ("Ana", 30, "Jakarta")

point[0]               # 3
x, y = point           # unpacking
point[0] = 5           # TypeError: tuples can't be modified

def min_max(items):
    return min(items), max(items)      # a function returning two values

low, high = min_max([3, 1, 4])
```

## Tuple or list?

| | Tuple | List |
|---|---|---|
| Can change | no | yes |
| Typical contents | a few values with different meanings (a record) | many values of the same kind |
| Can be a dictionary key | yes (if its contents are hashable) | no |

A tuple says "this group belongs together and is fixed" (coordinates, a row from a database, a key made of two parts). A list says "a sequence that may grow".

```python
cache = {}
cache[("ana", 2026)] = 42        # a tuple as a compound key
```

## Details

- **One-item tuples need a comma**: `(5,)`. `(5)` is just the number 5.
- **Immutable, but not deeply.** A tuple holding a list can still have that list changed.
- **Other languages**: JavaScript has no tuple, so people use arrays. TypeScript has tuple types (`[string, number]`), and Rust, Swift and C# have real tuples.
- When you want named fields, a `namedtuple`, dataclass or object is clearer than `person[2]`.
- Unpack them ([destructuring](/t/destructuring)) rather than indexing.
