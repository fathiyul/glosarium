---
title: "Dictionary / Map"
summary: "A collection of key-value pairs with fast lookup by key."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["dict", "map", "hash map", "associative array"]
prereqs: ["array", "variable"]
related: ["hash-table", "set", "array", "json", "indexing"]
---

A dictionary (also called a map, hash map or object) stores key-value pairs and finds a value fast by its key.

```python
user = {"name": "Ana", "age": 30}
user["name"]                 # "Ana"
user["email"] = "a@x.com"    # add
user.get("phone")            # None, instead of an error
"age" in user                # True
for key, value in user.items():
    ...
```

```js
const user = { name: "Ana", age: 30 };
const lookup = new Map([["a", 1]]);       // a Map allows any type as a key
```

Lookups take roughly constant time however many entries there are, because dictionaries use a [hash table](/t/hash-table).

## Common uses

- Records with named fields (a user, a config).
- Counting things: `counts[word] = counts.get(word, 0) + 1`.
- Lookup tables and caches.
- Grouping items by a key.
- It's the shape of [JSON](/t/json) objects.

## Gotchas

- **Missing keys.** `d["x"]` raises `KeyError` (Python) or gives `undefined` (JavaScript). Use `.get()` with a default when absence is normal.
- **Keys must be hashable and unique.** In Python, lists can't be keys, but tuples and strings can. Setting a key again overwrites the old value.
- **Order.** Python 3.7+ keeps insertion order. Don't rely on order in languages that don't promise it.
- **Mutating while iterating** causes errors. Loop over a copy of the keys.
- **Keys are compared exactly**: `"Name"` and `"name"` are different.
- **Don't use a dictionary as a database.** It lives in memory only.

If you only need to know whether something is present, a [set](/t/set) is simpler.
