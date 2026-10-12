---
title: "Hash Table"
summary: "Key-value storage with average O(1) lookup via a hash function."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["hash map", "hashmap", "dictionary", "hash", "associative array"]
prereqs: ["array", "hash-function"]
related: ["hash-function", "hash-collision", "dictionary", "set", "big-o-notation", "lru-cache-structure"]
core: [backend]
---

A **hash table** stores **key → value** pairs and finds a value by its key in about the same
time no matter how many items there are, on average O(1).

You use one all the time: Python's `dict` and `set`, JavaScript's `Map`, `Set` and plain
objects, Java's `HashMap`.

```python
ages = {"ana": 31, "bo": 27}
ages["ana"]            # 31: found directly, without scanning
ages["cy"] = 40        # insert
"bo" in ages           # True: fast membership check
```

## How it works

1. A [hash function](/t/hash-function) turns the key into a number.
2. That number picks a slot (a "bucket") in an internal array.
3. The value is stored there. To look up a key, the same calculation takes you straight to it.

Compare with a list: finding a name means checking items one by one, O(n). A hash table
jumps to the right spot.

Sometimes two keys land in the same slot (a [collision](/t/hash-collision)). The table handles
it by storing several entries per slot or probing for another. With a good hash function and
a table that resizes as it fills, that stays rare, which is why the average is O(1). The worst
case, with many collisions, degrades toward O(n).

## Why this matters in practice

Changing a list lookup into a hash lookup is the classic way to fix a slow loop:

```python
# O(n * m): for each id, scans the whole list
[u for u in users if u.id in id_list]

# O(n + m): build a set once
wanted = set(id_list)
[u for u in users if u.id in wanted]
```

## Limits

- **Keys must be hashable.** In Python, lists can't be keys, but tuples and strings can.
  Keys should not change while stored.
- **Not sorted by key.** For ordered access use a tree or sort.
- They use extra memory for speed.

See [Big O notation](/t/big-o-notation) for what "O(1)" means.
