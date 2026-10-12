---
title: "Keep Framework Code at the Edges"
summary: "Keeping business logic free of framework details so it survives framework changes."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["framework independence", "framework at the edges", "decouple from framework"]
prereqs: ["separation-of-concerns", "hexagonal-architecture"]
related: ["clean-architecture", "dependency-injection", "layered-architecture", "domain-driven-design"]
---

**Keeping framework code at the edges** means your **business logic** shouldn't depend on the details of the framework it runs in. Frameworks change — versions, paradigms, even vendors — and if your pricing rules, permissions and domain state are woven through framework classes and decorators, then upgrading or replacing the framework means untangling all of it. Push framework concerns to the boundary and keep the core in plain code.

```text
edge (framework):    controllers, routes, ORM models, DI wiring
core (business):     rules and data in plain classes/functions
```

The benefit is that the core — the code that actually encodes what your organisation does — can be read, tested and reasoned about without the framework. It survives a framework upgrade, a move to a different server style, or a swap of database library, because those are all edge details.

The classic mistakes:

- Business rules in controllers or models. Logic that lives in the web layer or the ORM can't be tested without the framework, and changes whenever the framework does. Extract it.
- Framework annotations everywhere. A domain class spray-painted with framework decorators is now married to that framework. If a class needs to exist outside it (tests, a different entry point), it can't.
- Confusing "keep it at the edges" with "don't use the framework". You should use the framework — at the edges. The point is where its reach stops, not avoiding it.
- Hand-rolled indirection for everything. Wrapping every framework call in your own abstraction before you have a reason is over-engineering. Draw the line where the core is, and don't abstract the edges speculatively.
- A core that leaks. If the core imports the framework "just for types", the dependency exists. Keep the core's imports its own.

This is the practical core of [clean architecture](/t/clean-architecture) and [hexagonal architecture](/t/hexagonal-architecture): business logic in the middle, adapters and frameworks at the rim. [Dependency injection](/t/dependency-injection) typically wires the two together, and it's closely related to the "functional core, imperative shell" split — different vocabulary, same instinct to isolate what changes slowly from what changes quickly.
