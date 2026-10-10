---
title: "DTO"
summary: "A plain object for moving data between layers or over the wire."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["DTO", "data transfer object", "data transfer objects"]
prereqs: ["backend", "orm"]
related: ["request-handler", "api-contract", "service-layer"]
---

A **DTO** (data transfer object) is a plain, usually immutable object whose only job is to carry data across a boundary — from the database to an API response, from a request body into the application, or between services. It holds fields and no behaviour; it's a parcel, not a worker.

```text
domain object (rich) ──map──▶ UserResponseDTO (id, name, email) ──▶ JSON
```

The point is *decoupling*. Your internal domain objects — with their methods, invariants and maybe lazy-loaded database relationships — don't cross the wire. A DTO defines exactly what leaves a boundary, so you control what's exposed and hide what's internal. It also stops serialization from accidentally following a relationship and dumping half the database.

The classic mistakes:

- **Leaking the domain model as the DTO**. Serializing your ORM entity directly means adding an internal field publishes it, lazy relationships trigger surprise queries, and the API shape is hostage to the schema. Map to a DTO.
- A DTO with behaviour. The moment it validates, computes or queries, it's becoming a domain object in disguise. Keep it dumb; put logic elsewhere.
- One giant shared DTO. A single "everything" object used by every endpoint grows into a mess and exposes fields each caller shouldn't see. Prefer small, purpose-specific DTOs.
- DTOs everywhere, including internally. Inside one process, passing rich domain objects is usually cleaner; DTOs earn their keep *at boundaries*. Don't layer-mapper your entire call graph.
- Forgetting validation at the edge. A DTO is a convenient place to bind and validate incoming data — but ensure validation is real, not just field mapping.

DTOs are the luggage of layered systems: they define what data crosses an edge, keeping the internal model free to change and preventing accidental exposure. They pair naturally with a clear [API contract](/t/api-contract) and the [request handler](/t/request-handler) that produces them.
