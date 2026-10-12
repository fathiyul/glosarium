---
title: "HyperLogLog"
summary: "Estimating the number of distinct items with tiny memory."
levels: { backend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["HyperLogLog", "HLL", "distinct count estimation"]
prereqs: ["cardinality", "hash-function"]
related: ["bloom-filter", "metrics", "set-operations"]
---

**HyperLogLog** estimates the number of **distinct** items in a stream — its [cardinality](/t/cardinality) — using a tiny, fixed amount of memory. Counting distinct values exactly means remembering every value seen, which is expensive for millions or billions of items. HyperLogLog instead watches the hash patterns of incoming values and estimates the count, typically within a small percentage error, in kilobytes regardless of how many items pass through.

```text
stream of 10,000,000 user IDs → HLL (a few KB) → "≈ 9.98 million distinct"
```

The trick: hash each item, and track the longest run of leading zeros observed in those hashes. Rare patterns (long runs of zeros) tell you how many distinct values are likely present. Combining many such registers and applying a correction gives a good estimate. Crucially, the estimate uses a fixed size no matter how large the input.

Why it's useful: "how many unique visitors today?", "how many distinct query terms?", "how many unique IPs?" — questions where an approximate answer is fine and exactness is prohibitively expensive. It's built into analytics systems and available as a function in several databases.

The classic mistakes:

- Expecting exact counts. HyperLogLog is approximate by design; the error is small but real. If you need exact distinct counts, store the values or use a different structure.
- Assuming memory scales with items. The opposite is the point: it's fixed-size. That's why it's affordable at scale.
- Forgetting its mergeability. HLL sketches can be combined to estimate distinct counts across sets (e.g. per-shard counts merged into a global unique count) — a big advantage over storing raw values.
- Confusing it with a [Bloom filter](/t/bloom-filter). A Bloom filter answers membership ("is this item present?"); HyperLogLog estimates a *count* of distinct items. Different questions, different structures.
- Using it where you need the items. Like a Bloom filter, it keeps no values — just an estimate. You can't get the set back out.

HyperLogLog is a flagship probabilistic data structure: exchange exactness for a fixed, tiny memory footprint on a question (distinct count) that's otherwise expensive. It's how analytics dashboards can report unique counts across enormous streams without storing the streams.
