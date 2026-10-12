---
title: "GraphQL Schema and Resolvers"
summary: "Types describing the data, and functions that fetch each field."
levels: { backend: mid-level, frontend: mid-level , data-scientist: junior }
aliases: ["graphql schema", "resolvers", "graphql types"]
prereqs: ["graphql", "api-contract"]
related: ["graphql-n-plus-one", "api-contract", "graphql"]
---

A GraphQL API is its **schema**: type definitions declaring what exists (object types, queries, mutations, subscriptions), and **resolvers** — one function per field — that fetch the data. The schema is both contract and documentation; resolvers are the implementation.

```graphql
type User { id: ID! name: String! orders: [Order!]! }
type Query { user(id: ID!): User }
# resolver: Query.user → fetch user; User.orders → fetch their orders
```

Design pressure concentrates in two places: *shape* (types clients can rely on — evolve by addition, deprecate rather than remove) and *fetching* (each field's resolver runs per parent object, so nested selections multiply database calls unless batched).

The classic mistakes:

- N+1 resolvers. `users { orders }` firing one query per user is the signature GraphQL performance bug. Batch per-request with a loader (see [DataLoader](/t/graphql-n-plus-one)).
- Resolvers with business logic. Resolvers should fetch and shape; rules belong in services. Logic in resolvers is untestable and unreusable.
- Nullable chaos. Everything nullable by default produces defensive `?.` everywhere. Mark genuinely-required fields non-null (`!`) deliberately.
- Mutations returning nothing useful. A mutation should return the changed object (and errors in-band) so clients update caches without refetching.
- Breaking changes disguised as edits. Renaming types, changing nullability, removing enum values — all break clients. additive evolution plus `@deprecated`.
- One giant schema, no ownership. Federated or modular schemas need clear ownership per type, or the schema rots into everyone's-second-priority.
- Ignoring complexity. Deeply nestable types let clients build expensive queries; bound depth and cost.

**How to build it:** schema-first design with consumers, non-null where guaranteed, batched resolvers over thin data access, additive evolution. The schema is the product; resolvers are just fetching done well.
