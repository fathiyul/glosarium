---
title: "Suffix Array"
summary: "A sorted array of a string's suffixes for fast substring search."
levels: { backend: principal, data-engineer: principal }
aliases: ["suffix array", "suffix array and lcp", "substring index"]
prereqs: ["string", "string-algorithms"]
related: ["binary-search-tree", "regular-expression"]
---

A **suffix array** is the array of all suffixes of a string, sorted alphabetically. Since every substring is a prefix of some suffix, sorting the suffixes puts equal and adjacent substrings next to each other — which turns substring search into binary search over the array.

```text
string "banana"
suffixes: banana, anana, nana, ana, na, a
sorted:   a, ana, anana, banana, na, nana
          ↑ substring "ana" occupies a contiguous block
```

To find a pattern, binary-search the sorted suffixes: if the pattern appears, all matches form a contiguous range. That gives O(m log n) search for a pattern of length m, without scanning the text. A companion structure, the **LCP array** (longest common prefix between adjacent suffixes), makes it faster still and enables applications like finding the longest repeated substring.

Why it exists alongside suffix trees: a suffix *tree* supports similar queries but uses a lot more memory and is fiddly to build. A suffix array is a compact array plus (optionally) the LCP array, so it's the practical choice for large texts. It's used in full-text search, bioinformatics (genome indexing), data compression, and Burrows-Wheeler transforms.

The classic mistakes:

- Confusing it with a sorted list of substrings. It's suffixes — one per position — not every substring. That's what makes it n entries rather than O(n²).
- Forgetting you often need the LCP array too. Search works with the suffix array alone, but many applications (longest repeated substring, fast matching) rely on LCP.
- Assuming naive construction is fine at scale. Naively sorting all suffixes is O(n² log n); real implementations use O(n log n) or O(n) construction algorithms. Use a library.
- Ignoring the memory trade. It's compact compared to a suffix tree, but still O(n) — significant for enormous texts; there are compressed variants.
- Reaching for it when a simpler index works. For small texts, or when you can afford a full scan or a hash index, a suffix array is overkill.

A suffix array is a compact, powerful index over a string: sort the suffixes, binary search, and find any substring fast. It's the memory-friendly cousin of the suffix tree and a staple of text-heavy fields — full-text search, compression and genomics — where you index a large body of text once and query it many times.
