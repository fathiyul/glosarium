---
title: "Set"
summary: "An unordered collection of unique values."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["hash set", "unordered collection"]
prereqs: ["list"]
related: ["dictionary", "hash-table", "list", "set-theory", "deduplication"]
---

A set is a collection of unique values with no particular order. Adding something that's already there changes nothing.

```python
tags = {"python", "sql", "python"}      # {"python", "sql"}
tags.add("git")
"sql" in tags                           # True, and fast
tags.discard("sql")

a = {1, 2, 3}
b = {3, 4}
a | b      # union         {1, 2, 3, 4}
a & b      # intersection  {3}
a - b      # difference    {1, 2}
```

```js
const tags = new Set(["python", "sql", "python"]);
tags.has("sql");
```

## Why use one

- **Fast membership checks.** `x in my_set` takes about the same time however big the set is, thanks to [hashing](/t/hash-table). `x in my_list` scans the whole list.
- **Removing duplicates**: `list(set(items))`.
- **Comparing groups**: who's in A but not B? Which users appear in both lists?

```python
wanted = set(ids)                         # build once
[u for u in users if u.id in wanted]      # fast lookups
```

## Things to remember

- **No order, no indexing.** You can't ask for the third element. (Python sets don't promise order. JavaScript's `Set` remembers insertion order.)
- **Items must be hashable.** In Python, lists and dicts can't go in a set, but tuples and strings can.
- **`{}` is an empty dictionary in Python**, not a set. Use `set()`.
- Converting a list to a set to remove duplicates **loses the original order**. To keep order, use `dict.fromkeys(items)`.
