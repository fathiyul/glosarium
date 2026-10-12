---
title: "REST vs GraphQL vs gRPC"
summary: "Choosing an API style for the clients and teams you have."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["rest vs graphql vs grpc", "api style comparison", "choosing an api style"]
prereqs: ["rest", "graphql"]
related: ["graphql", "grpc", "api-contract"]
---

**REST**, **GraphQL** and **gRPC** solve "talk to my service" with different bargains. REST exposes resources over HTTP semantics (cacheable, uniform, tooling-friendly). GraphQL offers client-shaped queries over one endpoint (flexible, resolver-disciplined). gRPC gives typed binary RPC with streaming (efficient, contract-first, internal).

```text
REST:     GET /orders/42            cacheable, uniform, many round trips
GraphQL:  { order(id:42){…} }       exact shapes, harder caching/cost control
gRPC:     GetOrder(42) → binary     fast, typed, streaming; not browser-native
```

Choose by consumer and need: public/cached resource APIs lean REST; varied clients aggregating views lean GraphQL; internal typed service meshes lean gRPC. Many systems mix — REST at the edge, gRPC inside, GraphQL for the app layer.

The classic mistakes:

- One style for everything. gRPC to browsers, GraphQL for bulk ingestion, REST for streaming multiplex — each fights its medium. Match style to consumer.
- Ignoring caching. REST's HTTP caching is free infrastructure; GraphQL and gRPC must rebuild it at other layers. Count that cost honestly.
- Underestimating GraphQL's server discipline. Flexibility without batching, cost limits and schema governance becomes N+1s and abuse vectors. The style demands operational maturity.
- Exposing gRPC raw externally. Without transcoding, external developers get binary opacity. Edge in REST/GraphQL, mesh in gRPC.
- Versioning confusion. REST versions endpoints; GraphQL deprecates fields; protobuf evolves by numbers. Mixing the strategies (versioned GraphQL, unversioned REST) causes breakage.
- Choosing by fashion. The deciding factors are consumers, caching needs, payload efficiency and team skill — not conference talks.

**How to decide:** list the consumers, their languages, caching value, shape variability and streaming needs — the style falls out. And revisit per boundary: the right answer for service-to-service is rarely the right answer for browsers.
