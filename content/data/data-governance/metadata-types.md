---
title: "Technical, Business and Operational Metadata"
summary: "Schemas, meanings, and run history: the three kinds of data about data."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["types of metadata", "technical business operational metadata", "metadata categories", "data about data"]
prereqs: ["data-catalog", "data-dictionary"]
related: ["data-catalog", "data-dictionary", "data-lineage", "data-observability", "data-ownership", "data-catalog-metastore"]
---

Metadata is data about data, and it comes in three broad kinds. Technical metadata describes structure: schemas, column types, keys, file locations, partitions. Business metadata describes meaning: what a table is for, what a column measures, the business terms and who owns it. Operational metadata describes what actually happened: when a job last ran, how many rows it loaded, how fresh the table is, whether checks passed.

People often say "metadata" when they only mean the schema. The three kinds answer different questions and usually live in different tools, which is why a schema viewer alone will not tell you whether a table is safe to use.

| Kind | Example | Answers |
|---|---|---|
| Technical | `orders.total_cents` is an integer, not null | How is it structured? |
| Business | "total_cents is the order total before tax, in cents" | What does it mean? |
| Operational | Last loaded 06:12 today, 1.2M rows | Is it current and healthy? |

## Why the split matters

- A [data catalog](/t/data-catalog) is useful precisely because it joins all three: the schema from the warehouse, the definitions from the [data dictionary](/t/data-dictionary), and the run history from the orchestrator ([data observability](/t/data-observability)).
- [Lineage](/t/data-lineage) is metadata too, and it bridges the kinds: it records which physical datasets produce which, and often which business terms they feed.
- Access and privacy decisions need business and operational context as much as structure, so classification and ownership attach to the same records ([data ownership](/t/data-ownership)).

## Cautions

**It goes stale.** A schema is easy to refresh automatically; a description is not, so treat documentation as part of the change, not an afterthought.

**Operational metadata is high-volume.** Row counts and run records pile up; decide how long to keep them.

**The categories are a convenience, not a standard.** Frameworks split metadata differently, and some add "governance" or "social" metadata. Use the split to reason about coverage, not as a rigid taxonomy.

**No single system holds it all.** Expect to combine a warehouse's [system catalog](/t/system-catalog), a [metastore](/t/data-catalog-metastore), the orchestrator and the catalog.

The test of good metadata is simple: can someone who did not build the table find it, understand it, and judge whether to trust it?
