---
title: "Relational Model"
summary: "The theory behind SQL: relations, tuples, attributes and keys."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["relational model", "relational theory", "codds model"]
prereqs: ["sql", "database"]
related: ["normalization", "primary-key", "relational-algebra", "schema"]
---

The **relational model** is the mathematical model behind relational databases, described by E. F. Codd. Data lives in **relations** (essentially tables), each a set of **tuples** (rows) with named **attributes** (columns). A relation has no order and no duplicate rows; columns have a domain (allowed values). Queries are expressed in [relational algebra](/t/relational-algebra) and map closely onto SQL.

```text
relation = set of tuples       (a table, unordered, no duplicates)
tuple    = one row
attribute = one column with a domain
```

Why the theory matters in practice:

- Keys come from it. A candidate key is a set of attributes that uniquely identifies a tuple; one is chosen as the [primary key](/t/primary-key). Foreign keys express relationships between relations.
- Normalisation comes from it. [Normal forms](/t/normalization) are defined in terms of functional dependencies among attributes, aimed at removing redundancy and update anomalies.
- SQL is an approximation. SQL tables are *bags* (may contain duplicate rows) unless constrained; results are unordered unless ordered. Knowing the difference clarifies a lot of confusing behaviour.

The classic mistakes:

- Assuming tables have an inherent order. Relational relations are unordered; SQL rows come back in unpredictable order unless you add `ORDER BY`. Pagination without an explicit order is a classic bug.
- Pretending rows are distinct by default. SQL allows duplicate rows; a missing primary key means the database won't stop you creating identical rows. The model's "no duplicates" needs an explicit key.
- Treating the schema as the model. The relation is the logical model; indexes, storage and physical layout are implementation. Conflating them leads to over-fitting the schema to storage concerns.
- Ignoring functional dependencies. Normalisation is about which attributes determine others. Not seeing those dependencies is why redundant data creeps in.
- Thinking SQL is the model. SQL is one language implementing (loosely) the relational model, not the model itself. Understanding the model explains why joins, projections and selections behave as they do.

Why to care: the relational model gives you the vocabulary — relations, keys, dependencies, joins — to design schemas that are correct and evolve well, and to understand why SQL's quirks (ordering, duplicates, `NULL`) exist. It underpins [normalisation](/t/normalization), [ER diagrams](/t/er-diagram) and [relational algebra](/t/relational-algebra).
