---
title: "Slicing"
summary: "Taking a sub-range of a sequence."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["slice", "sublist", "substring"]
prereqs: ["indexing"]
related: ["indexing", "list", "string", "off-by-one-error", "array"]
---

Slicing takes a range of elements from a sequence (a list, string or array) and gives you a new one.

```python
nums = [10, 20, 30, 40, 50]
nums[1:4]      # [20, 30, 40]    from index 1 up to, but not including, 4
nums[:2]       # [10, 20]        the first two
nums[3:]       # [40, 50]        from index 3 to the end
nums[-2:]      # [40, 50]        the last two
nums[::2]      # [10, 30, 50]    every second item
nums[::-1]     # [50, 40, 30, 20, 10]   reversed

"hello"[1:3]   # "el"
```

The rule: `[start:stop]` includes `start` and excludes `stop`. That makes `stop - start` the length, and `a[:n] + a[n:]` the whole list again ([off-by-one errors](/t/off-by-one-error)).

## In JavaScript

```js
nums.slice(1, 4);       // [20, 30, 40]
nums.slice(-2);         // [40, 50]
"hello".slice(1, 3);    // "el"
```

Don't confuse `slice` (returns a copy of a part) with `splice` (changes the array in place).

## Good to know

- **Out-of-range slices don't fail.** In Python, `nums[10:20]` is just `[]`, which can hide bugs.
- **A slice is a copy** in Python lists (shallow). Changing the slice doesn't change the original, but nested objects are shared ([shallow vs deep copy](/t/shallow-vs-deep-copy)).
- **`nums[:]` makes a shallow copy.**
- **Slicing strings by position** can cut a character in half when text has combining marks or emoji ([Unicode](/t/unicode)).
- **Pagination** is slicing: `items[(page - 1) * size : page * size]`.
