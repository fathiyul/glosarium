---
title: "UUID vs Auto-Increment IDs"
summary: "Sequential integers vs globally unique IDs, and their trade-offs."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["uuid vs auto increment", "uuid vs int", "uuid primary key"]
prereqs: ["primary-key", "sequence"]
related: ["natural-vs-surrogate-key", "db-index", "sharding"]
---

Both UUIDs and auto-increment integers are **surrogate keys** — meaningless values just for identity. The choice affects storage, index behaviour, distribution and secrecy.

- Auto-increment integer — a sequence hands out `1, 2, 3, ...`. Compact (a few bytes), write-friendly (new rows append at the end of the index), and simple. But it's guessable (you can enumerate), and only one authoritative source can issue values.
- UUID — a 128-bit random (or time-based) globally unique value. Unguessable, generatable independently on any node, ideal for distributed systems and for not leaking counts. But wider (more storage and index size), and random UUIDs insert **scattered** across the index, hurting locality and write throughput.

```text
int:  1, 2, 3, ...         compact, ordered, guessable, single source
uuid: 550e8400-...         wide, unordered (v4), unguessable, distributed
```

The classic mistakes:

- Ignoring index locality. Random UUIDs (v4) scatter inserts across the B-tree, causing page splits and cache misses; at high write rates this measurably hurts. Time-ordered UUIDs (v7) or ULIDs fix much of this by sorting roughly by creation time.
- Choosing UUIDs for secrecy alone. If you need unguessable public IDs, you can expose an opaque UUID externally while keeping an integer primary key internally (see [opaque resource identifiers](/t/resource-identifiers)).
- Assuming auto-increment scales across nodes. One sequence per table means coordination; distributed inserts with an integer key need ranges or coordination. UUIDs sidestep this (see [sharding](/t/sharding)).
- Storing UUIDs as strings inefficiently. A text-encoded UUID is large; native UUID types or binary storage are better.
- Forgetting the ordering guarantee. Auto-increment gives order of *allocation*, not commit; UUIDv4 gives none. Don't infer time from either — store a timestamp.
- Treating it as all-or-nothing. Many systems use an integer primary key internally and a UUID as the public identifier. You don't have to pick one for both roles.

**How to choose:** auto-increment for single-source, write-heavy tables where compactness and locality matter; UUIDs (preferably time-ordered) for distributed generation, client-side id creation, or opaque public ids. A hybrid — integer key plus UUID public id — is common and often the best of both. See [natural vs surrogate key](/t/natural-vs-surrogate-key) and [indexes](/t/db-index).
