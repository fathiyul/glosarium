---
title: "Data Mesh"
summary: "Domain teams owning their data as products, on a self-serve platform."
levels: { data-engineer: staff , data-analyst: staff }
aliases: ["data mesh", "domain-oriented data", "data as a product"]
prereqs: ["data-governance", "data-platform-team", "data-warehouse"]
related: ["data-fabric", "data-product", "self-serve-data-platform", "data-governance", "data-platform-team", "domain-model-pattern"]
---

Data mesh is an organizational approach where domain teams — the people closest to the data — own their data as products, publishing it for others to consume through a self-serve platform. Instead of a central team extracting, transforming and serving every domain's data, each domain is responsible for making its own data discoverable, understandable and usable.

## The problem it addresses

In a traditional centralized model, one data team sits between every source system and every consumer. They become the bottleneck: domain experts queue up for pipeline changes, the team accumulates context it doesn't have, and data products drift away from the people who'd know whether they're right. At scale this slows everything down.

## The four principles

1. Domain ownership. The team that generates the data owns its pipelines and quality.
2. Data as a product. Published datasets get owners, documentation, SLAs and interfaces — treated with the same care as a customer-facing product.
3. Self-serve platform. A platform team provides tooling (compute, storage, catalog, access) so domains don't build their own from scratch.
4. Federated computational governance. Global rules — security, privacy, interoperability — are automated and enforced by the platform, not by manual review.

## What changes for you

If you join a data-mesh organization, you'll likely work within a domain team rather than a central platform. Your consumers are internal colleagues and analysts. You're expected to document your datasets, define schemas, and respond to data quality incidents — the responsibilities of a product engineer, applied to data.

## Trade-offs

- More autonomy, more responsibility. Domains move fast, but they also own the 3 a.m. pages.
- Consistency is harder. Without a central team enforcing one model, domains may define "customer" or "revenue" differently. Strong [data governance](/t/data-governance) and a shared [semantic layer](/t/semantic-layer) matter more, not less.
- It's an organizational change, not a tool. The technology (a lakehouse, a catalog, self-serve tooling) is the easy part; getting domains to adopt product thinking is the hard part.

## When not to adopt it

Small organizations with one or two data teams rarely need data mesh — the central model is simpler. It makes sense when domains are genuinely independent, the org is large enough that the central team is a bottleneck, and leadership is willing to invest in the platform and governance it requires. See also [data fabric](/t/data-fabric), a more centralised alternative.
