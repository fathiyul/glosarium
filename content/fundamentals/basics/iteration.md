---
title: "Iteration"
summary: "Stepping through the items of a collection one at a time."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["iterating", "looping over a collection", "for each"]
prereqs: ["loop", "list"]
related: ["loop", "iterator", "map-filter-reduce", "generator", "off-by-one-error"]
---

Iteration means stepping through the items of a collection one at a time and doing something with each.

```python
names = ["Ana", "Bo", "Cy"]
for name in names:
    print(name)

for i, name in enumerate(names):     # when you need the position too
    print(i, name)

for key, value in {"a": 1}.items():  # dictionaries
    ...
```

```js
for (const name of names) console.log(name);
names.forEach((name, i) => console.log(i, name));
```

## Choosing a style

| Need | Use |
|---|---|
| Do something with each item | a `for` loop |
| Build a new list from an old one | a comprehension or `map` ([map, filter, reduce](/t/map-filter-reduce)) |
| One result from all items | `sum`, `reduce`, or a loop with an accumulator |
| Stop at the first match | a loop with `break`, or `any`/`find` |

## Mistakes to avoid

- **Changing a collection while looping over it.** Removing items from a list you're iterating skips elements. Loop over a copy, or build a new list.
- **Index loops with the wrong bounds** ([off-by-one errors](/t/off-by-one-error)). Prefer looping over items directly.
- **Doing slow work inside the loop**, like a database query per item ([N+1 queries](/t/n-plus-one-query)).
- **Iterating over `None`/`undefined`.** Check or default to an empty list.

Under the hood, many languages let you iterate over anything that follows an iterator protocol, including files and generators that produce items lazily ([iterators](/t/iterator)).
