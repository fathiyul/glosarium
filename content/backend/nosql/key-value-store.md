---
title: "Key-Value Store"
summary: "Storing values by key, as in Redis or DynamoDB."
levels: { backend: junior, data-engineer: junior }
aliases: ["key-value database", "KV store"]
prereqs: ["nosql"]
related: ["redis", "nosql", "ttl", "cache-hit-miss"]
---

A key-value store keeps values addressed by a unique key. You write a value under a key, read it back by the same key, and delete it. The store doesn't look inside the value, so you can't ask it for "all users with age 30" the way you would with SQL.

```
SET session:9f2c "user_id=42; expires=..."
GET session:9f2c
DEL session:9f2c
```

Commands like these are [Redis](/t/redis) syntax. Other key-value stores, such as DynamoDB, use their own APIs with the same basic idea. Lookups by key are typically very fast, which is why these stores are common for sessions, caches and counters.

The classic mistake is choosing a key-value store for data you later need to search by its contents. You'd end up scanning every key, or maintaining a second index by hand. Plan your key names around the questions you'll ask. Some stores can also expire keys automatically, covered in [TTL](/t/ttl), and whether data survives a restart depends on how the store is configured.
