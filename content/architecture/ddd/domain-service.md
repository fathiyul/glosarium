---
title: "Domain Service"
summary: "Domain logic that doesn't belong to any one entity."
levels: { backend: senior }
aliases: ["domain service", "domain services", "DDD service"]
prereqs: ["ddd-entity", "ubiquitous-language"]
related: ["ddd-entity", "anemic-domain-model", "service-layer"]
---
A **Domain Service** holds domain logic that fits no single entity or value: multi-entity operations (transfer between accounts), calculations spanning concepts (pricing across catalogue and promotions), and policies over collections. Stateless, side-effect-free, named from the language — services for behaviour homeless elsewhere, not dumping grounds.

```text
entity logic:    order.ship() (owns its transition)
domain service:  PricingService.quote(cart, customer) (spans concepts, no home)
```

Services complement entities (which own their invariants) and application services (which orchestrate use cases, infrastructure and transactions). The three levels keep responsibilities crisp: entities decide for themselves, domain services compute across, application services coordinate with the outside.

The classic mistakes:

- Everything-service (anemia). Logic that belongs on entities migrating to services hollows the model. Entities first; services for the genuinely homeless.
- Stateful services. Conversational state in "services" recreates stateful session bugs. Domain services stateless; state lives in entities and callers.
- Infrastructure in domain services. Database calls, HTTP clients and queue publishes belong in application/infrastructure layers. Domain services compute purely.
- Application logic masquerading. Orchestration (load, call, save, publish) labelled "domain" drags infrastructure into the model. Orchestrate outside; compute inside.
- Static-method dumping grounds. Util classes accumulating unrelated functions signal missing concepts (entities, values) more than service needs. Find the homes first.
- Services calling servicesin chains. Deep service-to-service cascades obscure flow and duplicate orchestration. Coordinate in application services; keep domain services leaf-level.
- Naming from implementation. `OrderManager`, `PaymentUtil`, `CommonService` describe nothing domain-meaningful. Name from the language (`PricingService`, `RiskAssessor`).

**How to place logic:** entity-owned first, domain service for cross-concept computation, application service for orchestration. Services fill gaps in the model — they don't substitute for one.
