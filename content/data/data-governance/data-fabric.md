---
title: "Data Fabric"
summary: "An integration layer that connects data across systems using metadata."
levels: { data-engineer: staff , data-scientist: staff }
aliases: ["data fabric architecture", "fabric data integration", "active metadata fabric", "federated data layer"]
prereqs: ["data-catalog", "data-governance"]
related: ["data-catalog", "data-lineage", "data-mesh", "data-governance", "metadata-types", "semantic-layer"]
---

A data fabric is a metadata-driven layer that connects data across many systems, so people can find, access and combine it without copying everything into one place first. The systems might be several warehouses, a lake, operational databases and SaaS tools, on premises and in different clouds. The fabric uses metadata, lineage, semantics and policy to route a request to the right source, apply the right controls, and return a consistent result.

It is a response to a real constraint: centralising all data is slow, expensive, and sometimes forbidden by residency or contractual rules. A fabric tries to leave data where it lives and make it usable in place.

## What it is usually built from

- A [metadata catalog](/t/data-catalog) covering technical, business and operational metadata ([metadata types](/t/metadata-types)).
- [Lineage](/t/data-lineage) and a graph of how datasets relate, used to find sources and assess impact.
- A semantic layer that maps business terms to physical columns, so "revenue" means one thing ([semantic layer](/t/semantic-layer)).
- Federation or virtualisation, which queries remote sources on demand rather than loading them.
- A policy engine that enforces classification and access wherever the data is ([data classification](/t/data-classification), [data governance](/t/data-governance)).

The "active metadata" idea is central: the metadata is not just documentation, it drives routing, recommendations and policy automatically.

## How it relates to data mesh

They are often mentioned together but are different in kind. [Data mesh](/t/data-mesh) is mostly organisational: domain teams own their data as products. A data fabric is mostly technical: an integration and metadata layer. A mesh can be built on a fabric, and a fabric can support a mesh's self-serve platform.

## Trade-offs

**Federation is not free.** Querying across systems at runtime is harder to optimise than a single warehouse and can be slow or fragile; join across sources with care, and cache or materialise where it matters.

**It needs good metadata to work.** A fabric over poor, stale metadata just routes people to the wrong place faster.

**The term is used loosely by vendors.** The substance is metadata management plus integration plus governance; ask what a product actually does rather than trusting the label.

**It does not replace modelling or ownership.** A fabric connects data; it does not decide what a good table looks like or who is accountable for it.

Treat a data fabric as an architecture you grow into as your metadata and governance mature, not a product you install and finish.
