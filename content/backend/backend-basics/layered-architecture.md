---
title: "Layered Architecture"
summary: "Controllers, services and data access as separate layers."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["layered architecture", "n-tier", "layers"]
prereqs: ["backend", "separation-of-concerns"]
related: ["service-layer", "hexagonal-architecture", "clean-architecture", "mvc"]
---

**Layered architecture** organises a system into horizontal layers, each with a distinct responsibility and depending only on the layer below it. A common set:

- Presentation / API — HTTP handling, request parsing, response shaping.
- Application / service — orchestrating a use case: fetch, decide, persist.
- Domain — the business rules and entities.
- Data access / persistence — talking to the database.

```text
API → service → domain → repository → database
each layer only calls the one beneath it
```

The benefit is separation of concerns: a controller doesn't contain SQL, a repository doesn't contain HTTP, and business rules live in one place. Changes localise — swap the database and only the persistence layer changes.

The classic mistakes:

- Fat controllers or fat models. Logic leaking into the HTTP layer (untestable without a server) or the database layer (mixing rules with storage) is the most common failure. Push decisions into the domain/service layer.
- Leaky layers. A controller reading the schema directly, or a domain object knowing about HTTP status codes, defeats the separation. Keep each layer's vocabulary its own.
- Pass-through layers. A "service" that just forwards to the repository adds indirection without value. Layers earn their place by doing something.
- Confusing layers with physical tiers. Layering is a code organisation; turning each layer into a separate deployable (its own service) is a different, costlier step (see [microservices](/t/microservices)).
- The "everything depends on everything" slide. Strict one-directional dependencies are the point; without discipline, layers become a tangle with descriptive names.

**When it's the right choice:** for most CRUD-and-rules business applications, a small number of clear layers is a solid, understandable default. It's the pragmatic cousin of [hexagonal](/t/hexagonal-architecture) and [clean architecture](/t/clean-architecture), which push the dependency direction further (inner layers know nothing of frameworks). See the [service layer](/t/service-layer) and [MVC](/t/mvc) for the specific pieces.
