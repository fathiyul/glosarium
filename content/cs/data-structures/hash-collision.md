---
title: "Hash Collision"
summary: "Two keys hashing to the same slot, and how tables handle it."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["hash collision", "collision resolution"]
prereqs: ["hash-table"]
related: ["hash-table", "adjacency-list", "big-o-notation", "trie"]
---

A hash collision happens when two different keys map to the same slot in a hash table. A hash function turns a key into a number, and the table takes that number modulo its size. With more keys than slots, collisions are unavoidable, so every hash table needs a way to handle them.

The two common approaches are chaining, where each slot holds a list of entries, and open addressing, where a colliding key is placed in another free slot. Python's built-in dictionary uses a form of open addressing with probing.

The cost depends on how many keys share a slot. Looking up a key in a table with few collisions takes O(1) time on average. In the worst case, when every key lands in the same slot, lookup falls back to scanning every entry, which is O(n).

```python
class Bad:
    def __init__(self, v): self.v = v
    def __hash__(self): return 1          # every key collides
    def __eq__(self, other): return isinstance(other, Bad) and self.v == other.v

d = {Bad(i): i for i in range(5)}
d[Bad(3)]   # 3: still correct, but every lookup now compares against several keys
```

The table still returns correct results, which is why collisions are easy to overlook. Only the speed suffers, and the slowdown can be large.

The trade-off is between memory and speed. A table with more slots collides less but uses more space. Resizing keeps the load factor, the ratio of keys to slots, within a range where operations stay fast.

The classic mistake is using keys whose hash values are poorly distributed, such as objects that hash only one field, or mutable keys whose hash changes after insertion. Choose keys with good hash functions, and never mutate a key that is stored in a hash table. For the structure that avoids hashing altogether, see the [trie](/t/trie).
