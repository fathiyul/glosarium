---
title: "Over-Fetching"
summary: "Retrieving far more data than an operation needs."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["over-fetching", "over fetching", "extraneous fetching"]
prereqs: ["rest", "graphql"]
related: ["chatty-io", "sparse-fieldsets", "rest-vs-graphql-vs-grpc"]
---
**Over-fetching** (extraneous fetching) downloads data nobody uses: full objects for a list showing two fields, nested expansions rendered nowhere, "just in case" includes that ride every response. The bytes cost latency, parsing, memory and money — multiplied by every user, every poll, every retry.

```text
list needs {id, title} → API returns 40 fields incl. history blobs (20× waste)
```

Cures target the contract: sparse fieldsets (`?fields=`), shaped endpoints per view, GraphQL selection, pagination that pages (not "all plus metadata"), and measured payload budgets per screen. The general fix is asking what each UI actually renders — usually a humbling fraction of what's fetched.

The classic mistakes:

- "Might need it" includes. Speculative fields accrete forever ("someone might use history"); nobody removes them. Fetch what renders now; add on demand.
- Unpaginated relations. Embedding full child collections per parent multiplies bytes with list size. Paginate or link relations; never embed unbounded.
- Ignoring mobile cost. Desktop-indifferent megabytes meter mobile data plans and memory; over-fetching taxes the most constrained users most.
- Caching the bloat. Cached oversized responses entrench waste (invalidation granularity suffers too). Shape before caching.
- Version-frozen fields. Deprecated fields kept "for compatibility" downloaded by clients years migrated. Sunset with metrics, not sentiment.
- Measuring requests, not bytes. Optimising call counts while payloads balloon misses the transfer cost. Budget bytes per view alongside call counts.
- Backend-shaped responses. Serialised database rows (all columns, internal ids, audit fields) served raw leak internals and bloat simultaneously. Shape deliberately at the boundary.

**The discipline:** fetch what renders, page what lists, sunset what aged, budget bytes per view. Bandwidth is user time and real money — stop shipping what nobody reads.
