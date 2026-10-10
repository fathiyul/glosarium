---
title: "Embedded Analytics"
summary: "Showing charts and reports inside your product to customers."
levels: { data-engineer: senior, backend: senior }
aliases: ["embedded BI", "customer-facing analytics", "in-product analytics", "embedded dashboards"]
prereqs: ["business-intelligence", "data-serving"]
related: ["data-api", "bi-dashboard", "row-level-security", "data-sharing", "semantic-layer"]
---

Embedded analytics means putting charts, reports or a full analytics view inside your own product, so your customers see data about themselves without leaving the app or logging into a separate BI tool. You build the experience; the customer may never know a BI product is behind it.

The classic mistake is treating it like an internal dashboard. An internal [BI dashboard](/t/bi-dashboard) is usually single-tenant: one company's data, a handful of trusted users. Embedded analytics is **multi-tenant**: many customer accounts share one application, and each must see only its own rows. A query that forgets the tenant filter, or a cached chart keyed without the tenant id, can show one customer another's numbers. That is a data breach, not a cosmetic bug.

## What makes it different

- Tenancy is the core problem. Every query needs a tenant filter **enforced by the server**, not the client. [Row-level security](/t/row-level-security) or a scoped [data API](/t/data-api) is the usual mechanism.
- You cannot trust the embedder. Parameters sent from the browser can be changed, so decide what a tenant may filter on server-side.
- Performance is part of the product. A slow report becomes a support ticket. Precompute with [aggregate tables](/t/aggregate-tables) and cap [query cost](/t/query-cost), since many tenants query at once.
- Reuse a [semantic layer](/t/semantic-layer) so the numbers customers see match the numbers your team quotes.
- Charts appear in your design, with your colors and language.

## Build or embed

You can build charts yourself against a [data API](/t/data-api), embed a commercial embedded-BI product, or extend an existing BI tool. Building gives control and no per-seat cost but is real product work. Buying gets you there faster but adds a dependency and per-user pricing. The same reasoning as [build vs buy](/t/build-vs-buy) applies.

## Cautions

- Some platforms offer [data sharing](/t/data-sharing) instead of copying, which can be simpler and fresher than duplicating per tenant.
- One heavy tenant should not slow everyone; isolate workloads where the platform allows.
- Sensitive columns still need [column-level security](/t/column-level-security) even inside a customer's own data.

For data engineers this is a serving concern; for backend engineers it is a multi-tenant security and performance concern. Get tenancy right before adding features.
