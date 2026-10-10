---
title: "Single-Table Design"
summary: "Storing many entity types in one DynamoDB table."
levels: { backend: senior, data-engineer: senior }
aliases: ["single-table design", "single table design", "dynamodb single table"]
prereqs: ["access-pattern-design", "key-value-store"]
related: ["access-pattern-design", "denormalization", "document-database"]
---

**Single-table design** is a NoSQL modelling technique — popularised with DynamoDB — where many different entity types live in *one* table, using generic **partition key** and **sort key** columns whose values are overloaded to represent different things. Instead of one table per entity (as in relational design), you model the *access patterns* and lay data out so each query is a single, efficient key lookup.

```text
PK                SK                attributes
USER#42           PROFILE           {name, email}
USER#42           ORDER#2024-01-01  {total, status}
ORDER#2024-01-01  ITEM#1            {sku, qty}
```

A query for a user's profile and orders is one request: `PK = USER#42`. Related items are co-located so they're fetched together, and secondary indexes cover the other patterns.

The motivation: many NoSQL stores can only query efficiently by key(s), so a one-table-per-entity model leads to unsupported queries or full scans. Single-table design uses the key structure to serve the exact access patterns directly, minimising requests and cost.

The classic mistakes:

- Doing it in a relational database. Single-table design exists because of NoSQL's query constraints. In a relational database it's needless cleverness that destroys clarity; use normal tables and joins.
- Modelling entities instead of access patterns. The whole point is to start from queries (see [access pattern design](/t/access-pattern-design)). If you model entities first, you'll miss patterns and add awkward scan-indexes.
- Overloading keys without a scheme. Generic keys work only with a disciplined naming convention; sloppy key construction makes queries impossible and debugging miserable.
- Underestimating complexity. Single-table design is hard to read and hard to change; new access patterns may need a new index or a redesign. It's a real cost.
- Forgetting secondary indexes. Real workloads need queries other than by primary key; global/local secondary indexes are part of the design, with their own cost and constraints.
- Ignoring item size and hot partitions. One big item or one heavily-accessed partition key limits throughput. Design for distribution.

**When to use it:** when a NoSQL store's query model forces it and you know the access patterns — high-scale, key-based workloads like DynamoDB. For most applications, a relational database (or a document store with sensible collections) is clearer and flexible enough. Single-table design is the extreme end of matching data layout to queries, and it rewards teams who commit to it and punishes half-measures.
