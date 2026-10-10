---
title: "Backend for Frontend (BFF)"
summary: "A backend tailored to one frontend's needs."
levels: { backend: senior, frontend: senior }
aliases: ["backend for frontend", "BFF", "bff pattern"]
prereqs: ["api-gateway", "api-first"]
related: ["graphql", "public-vs-internal-api", "api-contract"]
---

A **backend for frontend (BFF)** is a backend layer dedicated to one type of client — a web app, an iOS app, a partner portal. Instead of every client calling one general API and stitching responses together, each client gets a backend shaped for its needs: the fields it wants, in the calls it can afford, in the format it expects.

```text
web app  → BFF-web  ─┐
iOS app  → BFF-ios  ─┼─▶ shared services (users, orders, payments)
```

It solves the "one API for everyone" problem. A single API serving wildly different clients tends to accrete flags and fields to satisfy each, becoming bloated and forcing clients to over-fetch or make many round trips. A per-client BFF lets each be simple and opinionated.

The classic mistakes:

- Putting business logic in the BFF. A BFF should aggregate, shape and tailor responses — not re-implement domain rules. Rules belong in the shared services; otherwise they diverge per client.
- Confusing it with an [API gateway](/t/api-gateway). The gateway routes and applies cross-cutting policy for all clients; a BFF is *client-specific* composition and shaping. They often coexist.
- One BFF to rule them all. If a single "BFF" serves every client, it becomes the general API you were trying to escape. BFFs are per client type.
- Too many BFFs. A BFF per screen or per feature multiplies services and duplication. Split by *client*, not by page.
- Sharing the BFF with external consumers. A BFF is an internal, changeable interface for your own clients; don't accidentally publish it. See [public vs internal APIs](/t/public-vs-internal-api).
- Ignoring ownership. The team that owns the client usually owns its BFF, so they can change it together — a natural fit with [Conway's law](/t/conways-law).

**When to use it:** when you have several distinct clients whose needs diverge, and a single general API is forcing awkward compromises. It trades a layer of services for simpler, faster clients and decoupled evolution. [GraphQL](/t/graphql) can be an alternative for flexible client-driven querying, but a BFF is often simpler to reason about and cache. It all rests on a clear [contract](/t/api-contract).
