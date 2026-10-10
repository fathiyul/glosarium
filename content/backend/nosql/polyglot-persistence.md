---
title: "Polyglot Persistence"
summary: "Using different databases for different needs in one system."
levels: { backend: senior, data-engineer: senior }
aliases: ["polyglot persistence", "polyglot storage", "multiple databases"]
prereqs: ["relational-database", "document-database"]
related: ["access-pattern-design", "key-value-store", "eventual-consistency"]
---

**Polyglot persistence** is using multiple kinds of data store in one system — a relational database for transactional data, a key-value cache for sessions, a search engine for text, a time-series store for metrics — each chosen for what it's good at. Instead of forcing one database to do everything, you pick the tool per job.

```text
orders (transactions)  → relational
sessions / hot cache   → key-value
product search         → search engine
metrics                → time-series
sessions relationships → graph
```

The rationale is real: no single store is best at transactions, full-text search, caching, graphs and metrics simultaneously. Specialised stores often outperform a general one by a wide margin on their niche.

The cost is also real: every store is another thing to run, back up, monitor, secure and keep consistent with the others. **Consistency across stores** is the hard part — a write to the database and the search index aren't automatically atomic, so they can drift.

The classic mistakes:

- Reaching for many stores prematurely. One well-chosen database plus a cache handles most systems. Adding stores multiplies operational complexity for benefits you may not need yet.
- Underestimating the operational load. Each store means backups, upgrades, monitoring and on-call knowledge. Five stores can be five times the operational surface.
- Ignoring cross-store consistency. If data lives in two stores, keeping them in sync is your problem (events, outbox, rebuild jobs). Assume drift will happen and have a reconciliation.
- Duplicating the source of truth. Decide which store is authoritative per piece of data; the others are derived and can be rebuilt.
- Choosing stores for fashion. Adopting a graph or document database because it's interesting, without a workload that needs it, adds cost for no gain.
- Making it hard to operate. A small team implementing polyglot persistence often can't run it well; simplicity has real value.

**How to use it: wisely.** Start with one primary database and a cache; add a specialised store only when a concrete need (search quality, metrics scale, graph traversal) justifies the added complexity. For each addition, define the source of truth and the sync mechanism. It's the payoff of matching [access patterns](/t/access-pattern-design) to stores — but only when the match is worth it.
