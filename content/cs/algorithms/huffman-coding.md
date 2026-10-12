---
title: "Huffman Coding"
summary: "Compressing data by giving frequent symbols shorter codes."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["Huffman coding", "huffman code", "prefix code"]
prereqs: ["compression", "greedy-algorithm"]
related: ["priority-queue", "archives-compression"]
---

**Huffman coding** compresses data by giving common symbols shorter binary codes and rare symbols longer ones. If `e` appears far more often than `z`, `e` should take fewer bits. Huffman builds a set of **prefix codes** — no code is a prefix of another, so a stream can be decoded unambiguously — with the most frequent symbols nearest the top of the tree.

The algorithm is greedy and elegant: put every symbol in a [priority queue](/t/priority-queue) keyed by frequency; repeatedly take the two least frequent and merge them into a parent whose frequency is their sum; when one node remains, that's the root. Reading paths from root to leaves gives each symbol's code.

```text
frequencies: a:5 b:2 c:1 d:1
merge c+d=2 → {c,d}:2 ; merge b+(cd)=4 ; merge a+{bcd}=9
codes: a=0, b=10, c=110, d=111   (frequent → short)
```

The result approaches the theoretical minimum length for symbol-by-symbol coding (the entropy of the distribution), which is why Huffman is a component of many compression formats (zips, JPEG's lossless stage, DEFLATE used in gzip and PNG).

The classic mistakes:

- Expecting it to compress everything well. Huffman works when symbol frequencies are skewed. On already-compressed or uniform data there's little to gain, and you still pay overhead for the code table.
- Forgetting the code table. The decoder needs to know the codes, so the table is stored with the data — real overhead for small inputs, where Huffman can even *expand* data.
- Confusing it with entropy coding in general. Huffman assigns whole bits per symbol; arithmetic/range coding can beat it by using fractional bits, at higher complexity.
- Assuming one pass. You need the symbol frequencies before you encode, so either you scan twice or buffer. Streaming variants handle this differently.
- Hand-rolling it when a format already exists. If you're building on gzip, PNG or a zip library, Huffman is already inside; don't reimplement it.

Huffman coding is the textbook example of a greedy algorithm producing an optimal prefix code, and a core idea in data compression. It sits under [archives and compression](/t/archives-compression) and illustrates a broader theme: match the representation to the data's statistics. See [compression](/t/compression) for the field it belongs to.
