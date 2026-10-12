---
title: "Map, Filter, Reduce"
summary: "The three core operations for transforming collections."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["map filter reduce", "higher-order array methods", "fold"]
prereqs: ["function", "list"]
related: ["iteration", "higher-order-function", "lambda", "pure-function", "generator"]
---

Three operations cover most of what you do when transforming a collection.

```js
const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);                  // [2, 4, 6, 8, 10]    transform each item
nums.filter(n => n % 2 === 1);         // [1, 3, 5]           keep some items
nums.reduce((sum, n) => sum + n, 0);   // 15                  combine into one value
```

- **map**: same number of items out, each transformed.
- **filter**: keep only the items where the test is true.
- **reduce** (also called fold): walk the items with an accumulator and end with a single result.

They chain nicely:

```js
orders
  .filter(o => o.status === "paid")
  .map(o => o.total)
  .reduce((a, b) => a + b, 0);
```

In Python, you'd usually write comprehensions:

```python
[n * 2 for n in nums]
[n for n in nums if n % 2]
sum(n for n in nums)          # or functools.reduce
```

## Why they're good

They say what you want rather than how to loop, and don't change the original list ([pure functions](/t/pure-function)). That makes the code short and easy to test.

## Cautions

- **Don't use `map` just for side effects.** Use a `for` loop to do things, `map` to compute values.
- **Give `reduce` an initial value.** Without one, an empty list throws in JavaScript.
- **Complicated reducers** are hard to read. A plain loop or a named helper function may be clearer.
- **Each step creates a new list.** For huge data, lazy iterators or generators avoid that ([generators](/t/generator)).
