---
title: "Array"
summary: "An ordered, indexed collection of elements."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["arrays", "array data structure"]
prereqs: ["variable", "data-type"]
related: ["list", "indexing", "slicing", "tuple", "dictionary", "iteration"]
---

An array is an ordered collection of elements, each reached by its position (index). Elements sit next to each other in memory, so jumping to any position is fast.

```js
const scores = [90, 72, 85];
scores[0];            // 90
scores.length;        // 3
scores.push(60);      // add at the end
scores.map(s => s + 5);
```

```python
scores = [90, 72, 85]       # Python's list plays this role
```

## What's cheap and what isn't

| Operation | Cost |
|---|---|
| Read or write `a[i]` | constant time |
| Add at the end | usually constant time |
| Insert or remove in the middle or at the start | slow: elements must shift (linear time) |
| Search for a value | linear time, unless sorted ([big O](/t/big-o-notation)) |

If you search by value often, a set or dictionary is faster ([hash tables](/t/hash-table)).

## Details

- **Indexes start at 0**, and the last one is `length - 1`. Going past the end is an error or `undefined` ([indexing](/t/indexing), [off-by-one errors](/t/off-by-one-error)).
- **Arrays are mutable** in most languages, and variables share them ([mutable vs immutable](/t/mutable-vs-immutable)).
- **Copying** an array with `b = a` doesn't copy it. Both names refer to one array ([shallow vs deep copy](/t/shallow-vs-deep-copy)).
- **Fixed vs dynamic.** In C and Java, a plain array has a fixed size. JavaScript and Python arrays grow automatically.
- **Mixed types** are allowed in JavaScript and Python, though mixing is usually a bad idea.

Use arrays for ordered sequences. Use a [dictionary](/t/dictionary) when you look things up by key.
