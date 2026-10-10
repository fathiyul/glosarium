---
title: "Service Layer"
summary: "Where business logic lives, apart from HTTP and storage."
levels: { backend: mid-level }
aliases: ["service layer", "application service", "use-case layer"]
prereqs: ["layered-architecture", "business-logic"]
related: ["request-handler", "domain-model-pattern", "dependency-injection", "transaction-boundaries"]
---

A **service layer** sits between the HTTP/API layer and the domain and data layers. It holds the *application's use cases*: "register a user", "place an order", "apply a refund". Each method orchestrates a workflow — load the relevant objects, invoke domain logic, persist the result, publish an event — without containing HTTP details or raw SQL.

```text
controller (HTTP) → OrderService.place(cmd) → domain + repository → response
```

Why separate it: the HTTP layer should deal with requests and responses, not business workflows; the domain should hold rules, not transaction management or messaging. The service layer is where the workflow lives, so the same use case can be triggered from a REST endpoint, a CLI, a queue consumer or a test, unchanged.

The classic mistakes:

- Business logic in the controller. Logic in the web layer can't be reused or tested without a server. The service layer gives it a home (see [keeping framework code at the edges](/t/framework-independence)).
- A pass-through service. If the service only forwards to the repository, it adds indirection without value. Services earn their place when they orchestrate *several* steps or enforce workflow rules.
- An anemic domain with fat services. If all the logic migrates into services and the domain objects become data holders, you've built an [anemic domain model](/t/anemic-domain-model). Split rules (domain) from orchestration (service).
- Managing transactions in the wrong place. Where a use case spans multiple writes, the service layer is a natural place to define the [transaction boundary](/t/transaction-boundaries) — one unit of work per use case.
- Becoming a god service. One giant service with every operation for a domain is hard to navigate. Split by use case or cohesion.

**How to size it:** one method per meaningful use case, named in the domain's language, with the workflow explicit. It's the orchestrator that makes the [layered architecture](/t/layered-architecture) useful, wire dependencies through [dependency injection](/t/dependency-injection), and keep the domain focused on rules. The [request handler](/t/request-handler) calls it; the service calls the domain and persistence.
