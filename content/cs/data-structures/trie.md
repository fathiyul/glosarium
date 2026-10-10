---
title: "Trie"
summary: "A tree of characters for fast prefix lookups."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["prefix tree", "digital tree"]
prereqs: ["tree-traversal"]
related: ["hash-collision", "tree-traversal", "binary-search-tree", "big-o-notation"]
---

A trie, also called a prefix tree, stores strings by their characters. Each path from the root spells out a prefix, and a marker at a node shows that a complete word ends there. Words that share a prefix share the same nodes near the top of the tree.

```python
class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["$"] = True                 # marks the end of a word

    def starts_with(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node:
                return []
            node = node[ch]
        found = []
        def walk(n, acc):
            if "$" in n:
                found.append(acc)
            for ch, child in n.items():
                if ch != "$":
                    walk(child, acc + ch)
        walk(node, prefix)
        return sorted(found)

t = Trie()
for w in ["car", "cart", "cat", "dog"]:
    t.insert(w)
t.starts_with("ca")   # ['car', 'cart', 'cat']
```

Looking up a word or checking a prefix takes time proportional to the length of the string, which doesn't grow with the number of words stored.

The trade-off is memory. Each character is a node, and a trie can use far more memory than a hash set of the same words, especially with many unique characters. Compact variants reduce this, but they're more complex to write.

The classic mistake is reaching for a trie when a sorted list with binary search, or a hash set for exact matches, would do. Use a trie when prefix queries are central, such as autocomplete or routing tables. A missing end marker is also a common bug: `car` and `cart` must both be marked, or one of them won't be found. For exact-match lookups, a [hash table](/t/hash-collision) is simpler.
