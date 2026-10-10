---
title: "Designing for Access Patterns"
summary: "Modeling NoSQL data around the queries you'll run."
levels: { backend: senior, data-engineer: senior }
aliases: ["access pattern design", "access patterns", "query-first design"]
prereqs: ["document-database", "denormalization"]
related: ["single-table-design", "key-value-store", "polyglot-persistence"]
---

**Designing for access patterns** means deciding the queries first and shaping the data model to serve them, rather than normalising data and hoping the queries are efficient. It's the core mindset of NoSQL modelling, and it flips the relational instinct: instead of "one true shape, many queries", it's "the queries I have, and a shape optimised for each".

Why it's needed: key-value, document and wide-column stores generally can't join, and often can only query efficiently by their primary key (and maybe a few secondary indexes). So an unplanned query either isn't supported or scans everything. You design the keys and document layout around how the data is read and written.

```text
relational: design schema → write any query (joins/indexes make it work)
NoSQL:      list access patterns → design keys/documents per pattern
```

The classic mistakes:

- Modelling relationally, then querying relationally. A normalised document store that needs joins has lost the point; if you need ad-hoc joins, use a relational database (see [polyglot persistence](/t/polyglot-persistence)).
- Not knowing the queries up front. Without the access patterns, you can't design good keys, and you'll hit unsupported queries later. Inventory them before modelling.
- Designing for one pattern only. New queries appear; a model keyed for exactly one access pattern is rigid. Anticipate the main ones and accept that some will need a secondary index or a duplicate.
- Ignoring writes. Denormalising for reads is common, but duplicating data means every write updates multiple places (and risks drift). Weigh read vs write patterns.
- Forgetting the costs. A query that "works" via a full scan defeats the store's design. Understand what each query hits.
- Applying it to a relational database. SQL databases are flexible by design; forcing a query-first model onto them over-constrains. Match the technique to the technology.

**How to apply it:** list the operations (get by id, list a user's orders, find recent items), then design keys, partitions and documents that serve them directly — accepting denormalisation and duplication where reads demand it. This is the heart of [single-table design](/t/single-table-design) in stores like DynamoDB, and it's why choosing the right database for a workload matters. Get the access patterns wrong and no query tuning saves you.
