---
title: "GraphQL"
summary: "A query language that lets clients ask for exactly the data they need."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["graphql", "graph ql", "graphql api"]
prereqs: ["rest", "api-contract"]
related: ["graphql-schema", "rest-vs-graphql-vs-grpc", "api-contract"]
---

**GraphQL** is a query language for APIs: instead of many fixed REST endpoints, clients send a query describing exactly the fields they want to one endpoint, and the server resolves it. It kills over-fetching (unused fields) and under-fetching (five round trips to assemble a view) in one move.

```graphql
{ user(id: 7) { name email orders(first: 5) { total status } } }
```

The server defines types and **resolvers** (functions fetching each field); the client explores via introspection and gets exactly its selection. Strong tooling (typed clients, codegen) follows from the schema.

The costs are real: every query is bespoke, so caching, rate limiting and cost control are harder (one "small" query can fan into thousands of resolver calls — the N+1 problem, classically solved with batching); and the flexibility moves complexity server-side.

The classic mistakes:

- Naive resolvers (N+1). A resolver per object each hitting the database turns one query into thousands. Batch with loaders (see [DataLoader](/t/graphql-n-plus-one)).
- No query cost limits. Clients can craft deeply nested queries that exhaust the server. Limit depth, complexity and timeouts.
- Exposing everything. Introspection plus an expressive schema leaks internal structure and enables probing. Review the schema as an attack surface; disable introspection publicly if appropriate.
- Caching by URL. There's one endpoint and POST bodies — HTTP caching doesn't apply naively. Cache at the resolver/data layer or use persisted queries.
- Treating it as a REST replacement. Simple CRUD with clear caching needs is often better REST. GraphQL earns its complexity with varied clients and aggregated views.
- Versioning by habit. GraphQL evolves by addition and deprecation, not versions — running v1/v2/v3 endpoints misses the point. Deprecate fields instead.

**When to choose it:** diverse clients needing different shapes from shared data, with server capacity for resolver discipline. See the [schema](/t/graphql-schema) and the [REST vs GraphQL vs gRPC](/t/rest-vs-graphql-vs-grpc) comparison.
