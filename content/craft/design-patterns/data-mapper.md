---
title: "Data Mapper"
summary: "A separate layer moving data between objects and the database."
levels: { backend: senior }
aliases: ["data mapper", "data mapper pattern", "mapper"]
prereqs: ["domain-model-pattern", "orm"]
related: ["active-record-pattern", "repository-pattern", "unit-of-work", "transaction", "enterprise-application-patterns"]
---

**Data mapper** is a persistence pattern that puts a separate layer between your in-memory objects and the database. The mapper's job is to translate: read rows and build objects, and turn objects back into rows on save. Your domain objects stay plain — they don't know SQL, tables or columns exist.

```text
domain object ──▶ Mapper ──▶ database
     Person        PersonMapper      INSERT/UPDATE/SELECT people
```

The contrast is [active record](/t/active-record-pattern), where the object *is* the row and knows how to save itself. Data mapper keeps the domain model clean and independent of the database; active record is simpler and couples the two. Most full-featured ORMs are data mappers (the persistence is handled by the framework, separate from your classes), whereas frameworks built on active record put `save()` right on the model.

The benefit shows when the domain and the schema diverge: a rich object graph, inheritance, or a schema you don't control. The mapper absorbs the mismatch, so your domain doesn't have to mirror tables 1:1.

The classic mistakes:

- An anemic domain paying the cost anyway. Data mapper keeps the domain clean, but if the domain objects are just data holders with no behaviour, you've added a layer for little gain (see [anemic domain model](/t/anemic-domain-model)). It pairs with a [rich domain model](/t/domain-model-pattern).
- Leaking persistence into the domain. If domain objects start carrying lazy-loading proxies and database IDs everywhere, the separation has eroded. Sometimes unavoidable, but notice it.
- Bypassing the mapper. Ad-hoc SQL scattered next to mapped code creates two sources of truth for how data is shaped.
- Mapping by hand for a big schema. Hand-written mappers for hundreds of tables are tedious and error-prone; use an ORM that implements the pattern, and reserve manual mapping for the gaps.

**When to use it:** when the domain model is the important part and you want it decoupled from the database. Pair it with a [unit of work](/t/unit-of-work) to batch changes and a [repository](/t/repository-pattern) to give the domain a clean way to fetch aggregates. It's a core pattern in Fowler's [enterprise application patterns](/t/enterprise-application-patterns).
