---
title: "Microservices"
summary: "Many small, independently deployable services."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["microservice architecture", "microservice", "service-based architecture", "MSA"]
prereqs: ["monolith", "api-design"]
related: ["monolith", "modular-monolith", "monolith-vs-microservices", "distributed-monolith", "database-per-service", "saga-pattern", "service-mesh"]
core: [backend]
---

**Microservices** is an architectural style where an application is built as **many small services**, each focused on one business capability (orders, payments, catalog), **independently deployable**, owning its own data and communicating over the network (HTTP/REST, gRPC or messages).

```
            ┌─► Orders service ───► Orders DB
Client ─► API gateway ─► Payments service ─► Payments DB
            └─► Catalog service ──► Catalog DB
      services talk through APIs or events, not by sharing a database
```

Compare to a [monolith](/t/monolith): one codebase, deployed as one unit.

## What they promise

- **Independent deployment**: a team ships its service without coordinating a release of everything.
- **Independent scaling**: scale only the busy parts.
- **Team autonomy**: small teams own services end to end, which maps to how large organizations work.
- **Technology freedom** per service, and **fault isolation**: one failing service doesn't have to take down everything.

## What they cost

You trade code complexity for **distributed-systems complexity**:

- **Network calls fail and are slow**, so you need timeouts, retries and fallbacks ([timeouts](/t/timeouts), [retries](/t/retry-with-backoff)).
- **Data consistency** across services is hard. No cross-service transactions ([database per service](/t/database-per-service), [sagas](/t/saga-pattern)).
- **Debugging and observability** require tracing across services.
- **Testing and local development** get harder.
- **Operational overhead**: deployment pipelines, service discovery, monitoring, versioned APIs, security between services ([service mesh](/t/service-mesh)).
- **Wrong boundaries are expensive.** Split too early or along the wrong lines, and you get a [distributed monolith](/t/distributed-monolith): all the costs, none of the independence.

## When they make sense

- A large organization with many teams that need to deploy independently.
- Parts of the system with very different scaling or reliability needs.
- A system and team mature enough to run this infrastructure.

For most products and small teams, a well-structured **[modular monolith](/t/modular-monolith)** is simpler and faster to build, and can be split later where the boundaries prove themselves. Microservices solve an **organizational** scaling problem as much as a technical one. See
[monolith vs microservices](/t/monolith-vs-microservices).
