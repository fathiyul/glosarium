---
title: "tRPC"
summary: "End-to-end type-safe APIs for TypeScript without a schema language."
levels: { frontend: mid-level }
aliases: ["trpc", "trpc api", "typesafe rpc"]
prereqs: ["rpc", "api-contract"]
related: ["rpc", "graphql", "openapi"]
---

**tRPC** builds APIs as typed function calls shared between a TypeScript server and TypeScript clients: define procedures on the server, import their *types* on the client, and get autocompletion and compile-time checking across the boundary — with no schema file, codegen step or versioned spec in between.

```ts
// server
export const appRouter = router({ userById: publicProcedure.input(z.string()).query(({input}) => db.user(input)) });
// client — fully typed, no codegen
const user = await client.userById.query("7");
```

The types *are* the contract, validated at runtime with schemas (typically Zod). Refactors propagate through the compiler; breaking changes surface as type errors in the client, not production surprises.

The bargain is scope: both ends must be TypeScript in a shared workspace. Third parties, mobile apps in other languages, and public APIs need a language-neutral contract (REST/OpenAPI, GraphQL) instead — tRPC has no IDL to hand them.

The classic mistakes:

- Exposing it publicly. Non-TypeScript consumers get nothing usable — no spec, no docs, no SDK. tRPC serves first-party full-stack apps; public APIs need REST or GraphQL.
- Skipping runtime validation. Types evaporate at compile time; without input schemas, malformed requests hit handlers unchecked. Types describe, validators enforce.
- Monolith coupling. Importing server code paths into the client bundle (or vice versa) bloats and entangles. Share types, not implementations.
- No versioning story. Compiler-propagated breakage is fine inside one deploy; independent clients need versioned compatibility tRPC doesn't provide. Split or version when consumers deploy separately.
- Business logic in procedures. Thin procedures over services stay testable; fat routers become an untestable ball of endpoints.
- Assuming it replaces API design. Naming, granularity, auth and error shapes still need deliberate design — types don't supply judgement.

**When to choose it:** first-party TypeScript full-stack apps (monorepos especially) where end-to-end type safety beats language neutrality. Anywhere consumers diverge in language or deploy cadence, prefer a specified contract.
