---
title: "SQL vs NoSQL"
summary: "Choosing a database by data shape, consistency needs and access patterns."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["SQL vs NoSQL databases", "relational vs non-relational", "choosing a database", "NoSQL vs relational"]
prereqs: ["relational-database", "nosql"]
related: ["nosql", "document-database", "key-value-store", "wide-column-store", "graph-database", "polyglot-persistence", "acid"]
core: [backend]
---

The choice is rarely "SQL or NoSQL" in the abstract. It's about **your data's shape, your consistency needs and your access patterns**. NoSQL isn't one thing. It covers several different database types.

| | **Relational (SQL)** | **NoSQL** (several families) |
|---|---|---|
| Data model | Tables with fixed schema and relations | Documents, key-value, wide-column, graph, time-series, search... |
| Schema | Defined up front, enforced | Flexible (but you still have a schema: it's just in your code) |
| Queries | Powerful, ad hoc (`JOIN`, `GROUP BY`) | Optimized for specific access patterns |
| Transactions | Strong ACID, multi-row | Varies: often per record, some now support more |
| Scaling | Vertical first, then replicas and sharding | Often designed to scale out horizontally |
| Best at | Related data, integrity, flexible querying, reporting | Specific workloads at high scale or with unusual shapes |

The NoSQL families:

- **[Document](/t/document-database)** (MongoDB, Firestore): JSON-like documents. Good for self-contained records with varied fields.
- **[Key-value](/t/key-value-store)** (Redis, DynamoDB): super-fast lookup by key. Good for caches, sessions, simple access.
- **[Wide-column](/t/wide-column-store)** (Cassandra): huge write volumes across many nodes.
- **[Graph](/t/graph-database)** (Neo4j): relationship-heavy data (social networks, recommendations).
- **[Time-series](/t/time-series-database)**, **[search](/t/search-engine)** and **[vector](/t/vector-database)** databases for specialized workloads.

## How to decide

Ask:

1. **Is the data relational?** Orders, customers, products, payments, with relationships and integrity rules? A relational database is the strong default.
2. **What are the access patterns?** If you must query many ways, SQL's flexibility wins. If you have a few known patterns at very high scale, a specialized store can fit.
3. **What consistency and transaction needs?** Money and inventory usually want ACID ([ACID](/t/acid)).
4. **What scale?** Most applications never outgrow a well-tuned relational database. Don't choose for scale you may never have.
5. **What does your team know and operate?** Operational skill matters.

## Practical advice

- **Start with a relational database** (PostgreSQL or MySQL) unless you have a clear reason not to. It handles a wide range of needs, including JSON columns for flexible data.
- **Use NoSQL where it fits**, often alongside SQL: Redis for caching, a search engine for text search, a document or time-series store for a specific need ([polyglot persistence](/t/polyglot-persistence)).
- **"Schemaless" doesn't mean "no design".** NoSQL data models are built around queries, and getting it wrong is costly ([access pattern design](/t/access-pattern-design)).
- The lines blur: SQL databases add JSON and horizontal scaling ([distributed SQL](/t/distributed-sql)), and NoSQL ones add transactions and SQL-like queries.
