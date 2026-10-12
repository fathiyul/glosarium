---
title: "DataLoader / N+1 in GraphQL"
summary: "Batching resolver lookups so nested queries don't explode."
levels: { backend: senior, frontend: senior , data-scientist: junior }
aliases: ["dataloader", "graphql n+1", "n+1 in graphql"]
prereqs: ["graphql-schema", "graphql"]
related: ["graphql-schema", "eager-vs-lazy-loading", "graphql"]
---

GraphQL's resolver model invites the **N+1** problem: `users { orders }` runs one query for users, then one *per user* for orders — a hundred users, a hundred and one queries. **DataLoader** (the pattern, and the library) fixes it by **batching**: resolvers enqueue keys during a tick, and one batched load fetches them all at once, with per-request caching so repeated keys hit memory.

```text
naive:    100 users → 100 SELECT … WHERE user_id = ?  (N+1)
batched:  100 users → 1 SELECT … WHERE user_id IN (…100…) (2 queries total)
```

The batch function receives all keys requested in the tick and returns values in key order; the per-request cache also dedupes the same object loaded twice in one query. Batching composes across nesting levels — each level batches independently.

The classic mistakes:

- No batching at all. The default resolver-per-object behavior is N+1 by construction. Assume every nested field needs a loader until proven otherwise.
- Global (cross-request) caching. DataLoader caches must live *per request* — a shared cache serves one user's data to another. Scope strictly.
- Batch functions that don't preserve order. Returning values in non-key order silently misattributes data. Order contract is load-bearing.
- Batching without limits. A 100k-key batch is its own outage. Cap batch sizes and split overlarge ones.
- Caching writes. Loaders cache reads; mutations must invalidate the request cache or subsequent reads in the same request go stale.
- One loader per resolver shape. Different filters need different loaders (or parameterized keys); a single "orders" loader can't serve "recent orders" and "all orders" correctly.
- Treating it as a substitute for joins. Sometimes one joined query beats batched many. Use loaders as the default, joins where the shape is fixed.

**The rule:** every nested resolver batches through a per-request loader. It's the difference between GraphQL that flies and GraphQL that fires ten thousand queries per page.
