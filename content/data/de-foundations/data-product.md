---
title: "Data Product"
summary: "A dataset treated as a product, with an owner, documentation, quality guarantees and users."
levels: { data-engineer: senior , data-analyst: junior }
aliases: ["data products", "data as a product", "dataset as a product", "data product thinking"]
prereqs: ["data-ownership", "documenting-datasets"]
related: ["data-mesh", "data-contract", "data-ownership", "documenting-datasets", "data-catalog", "data-sla"]
core: [data-engineer]
---

A **data product** is a **dataset (or data service) treated like a real product**: it has an **owner**, a defined **audience**, **documentation**, **quality guarantees**, support, and a lifecycle, and it's built so that **others can discover and use it with confidence**, without having to ask its creators for help every time.

Compare a typical "table somebody built once": undocumented, with an unknown owner, changing without warning, and used by people who found it by accident. A data product is the opposite.

## What makes something a data product

| Attribute | Meaning |
|---|---|
| **Clear owner** | A named team accountable for it, who fixes problems and decides changes ([data ownership](/t/data-ownership)) |
| **Defined consumers and purpose** | Built for known use cases, with feedback from users |
| **Discoverable** | Registered in a catalog, searchable, with context ([data catalog](/t/data-catalog)) |
| **Documented** | What it contains, grain, definitions, caveats, example queries ([documenting datasets](/t/documenting-datasets)) |
| **Trustworthy** | Tested, monitored, with stated quality and freshness guarantees ([data SLAs](/t/data-sla), [data tests](/t/data-tests)) |
| **Addressable and consumable** | Stable names, clear interfaces (tables, APIs, files) and access control |
| **Stable, versioned interface** | Changes are managed and communicated ([data contracts](/t/data-contract), [schema evolution](/t/schema-evolution)) |
| **Supported** | A place to ask questions and report issues |
| **Lifecycle managed** | Deprecation and retirement are planned ([deprecating tables](/t/deprecating-tables)) |

## Why this framing helps

- **Trust and reuse**: people use data they can understand and rely on, instead of rebuilding their own copy.
- **Accountability**: problems have an owner, so they get fixed.
- **Scalability of the organization**: domain teams publish good data for others, instead of a central team being the bottleneck for every request. This is the core idea in data mesh ([data mesh](/t/data-mesh)).
- **Product thinking**: focus on the users' needs, usage and satisfaction, not just on having produced a table ([product thinking](/t/product-thinking)).

## Building one

1. **Identify the users and their needs**: who will use it, for what, and how fresh and accurate it must be.
2. **Define the interface**: the schema, grain and meaning of each column, and the access method.
3. **Build with quality built in**: tests, monitoring, alerts and idempotent pipelines.
4. **Document and publish**: description, owner, SLA, examples, in the catalog.
5. **Operate it**: on-call or a support channel, an incident process, and a change process.
6. **Measure usage and value**: who uses it, how often, whether people are happy.
7. **Evolve and retire** deliberately.

## Cautions

- **It's a mindset and an operating model**, not a tool. Calling every table a "data product" without ownership and quality doesn't change anything.
- **It costs effort**, so apply it to datasets that matter (widely used, business-critical), not to every temporary table.
- **Ownership needs capacity.** A team told to own data products without time or incentives won't.
