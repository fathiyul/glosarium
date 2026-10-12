---
title: "Bucketing"
summary: "Hashing rows into a fixed number of files by key to speed joins."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["hash bucketing", "clustered by", "bucket join"]
prereqs: ["partitioning", "shuffle"]
related: ["hive-partitioning", "key-range-vs-hash-partitioning", "shuffle", "broadcast-join", "clustering-zorder"]
---

Bucketing hashes a column into a fixed number of buckets and writes each bucket to its own file. Rows with the same value of the bucketed column always land in the same bucket, which lets engines co-locate matching rows. In Hive and Spark you declare it with something like `CLUSTERED BY (user_id) INTO 16 BUCKETS`.

Bucketing is not the same as [partitioning](/t/partitioning). Partitioning splits a table by a column's values into directories (`dt=2026-01-01`); you get one folder per distinct value. Bucketing hashes into a **fixed number of files** regardless of how many distinct values exist. Partitioning helps when you filter by the column; bucketing helps when you join or group by it.

The classic win: join `orders` and `customers` on `user_id`, with both tables bucketed by `user_id` into the same number of buckets. Matching rows already sit together, so the engine can skip the big [shuffle](/t/shuffle) that normally moves data across the network. See [JOIN](/t/join) and [broadcast join](/t/broadcast-join) for the alternatives.

## The catches

- The bucket count is fixed when the table is created. If the data grows, you may end up with too few buckets (large files) or too many (small files).
- The optimization usually requires both sides to be bucketed on the join key with the same bucket count; otherwise it is ignored.
- Not every engine implements or benefits from bucketing. Hive and Spark do; many newer engines use other techniques or decide at query time. Support and behavior have changed across versions, so check your engine.
- Append and overwrite can leave buckets uneven if the writer does not respect the scheme.

When not to use it: for small tables, or when you rarely join on the bucketed key, [clustering and Z-ordering](/t/clustering-zorder) or ordinary partitioning may be simpler. Bucketing adds write-time complexity for a specific join pattern.
