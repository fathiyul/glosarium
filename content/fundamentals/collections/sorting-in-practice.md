---
title: "Sorting with a Key or Comparator"
summary: "Sorting by a custom key or comparison function."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["sort by key", "custom sort", "comparator"]
prereqs: ["list"]
related: ["list", "big-o-notation", "sorting-algorithms", "stable-sort", "lambda"]
---

Sorting a list of numbers or strings is one call. Real data is usually objects, so you tell the sort what to sort by, using a key function or a comparator.

```python
users = [{"name": "Bo", "age": 31}, {"name": "Ana", "age": 25}]

sorted(users, key=lambda u: u["age"])                    # by age
sorted(users, key=lambda u: u["age"], reverse=True)      # descending
sorted(users, key=lambda u: (u["age"], u["name"]))       # by age, then name
users.sort(key=...)                                      # in place; returns None
```

```js
users.sort((a, b) => a.age - b.age);          // comparator: negative, zero or positive
users.sort((a, b) => a.name.localeCompare(b.name));
```

A **key function** returns the value to compare. A **comparator** takes two items and says which comes first.

## Gotchas

- **JavaScript sorts as strings by default.** `[10, 9, 1].sort()` gives `[1, 10, 9]`. Always pass a comparator for numbers.
- **`sort()` changes the array** in JavaScript, and in Python `list.sort()` returns `None`. `sorted()` returns a new list.
- **Stability.** A stable sort keeps equal items in their original order, so sorting by name and then by age gives a name-sorted list within each age ([stable sort](/t/stable-sort)). Python's sort is stable, and modern JavaScript's is too.
- **Case, accents and languages.** Plain string comparison orders by character codes (`"Z" < "a"`). Use locale-aware comparison for people-facing lists.
- **Missing values** (`None`, `null`) can raise errors or sort oddly. Handle them in the key.
- **Comparators must be consistent**, or results are unpredictable.
- Sorting costs about n log n. Don't re-sort inside a loop ([big O](/t/big-o-notation)).

For huge data, sort in the database (`ORDER BY`) instead of in your program.
