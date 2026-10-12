---
title: "Functional Core, Imperative Shell"
summary: "Pure logic in the middle, side effects at the edges."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["functional core imperative shell", "pure core", "humble object"]
prereqs: ["pure-function", "side-effect"]
related: ["referential-transparency", "dependency-injection", "hexagonal-architecture", "unit-test", "separation-of-concerns", "immutability"]
---

**Functional core, imperative shell** is an architecture pattern that separates the two kinds of code in a program. The **functional core** is pure: it takes data, returns data, and does nothing else — no I/O, no clock, no randomness, no mutation of shared state. The **imperative shell** is thin: it reads inputs, calls the core, writes outputs, and handles all the messy interaction with the outside world.

```text
shell:  read request → call core → persist result → send response
core:   pure(input) → output     (decisions, calculations, rules)
```

The payoff is testability and reasoning. A pure core is trivial to test — give it inputs, assert outputs, no mocks, no setup. The tricky, non-deterministic parts (databases, HTTP, time) are gathered in the shell, where they're easy to spot and either tested with integration tests or replaced. Because the core has no [side effects](/t/side-effect), it's [referentially transparent](/t/referential-transparency): the same inputs always give the same output.

The classic mistakes:

- Business logic scattered into the shell. When pricing rules or validation live inside a controller that also talks to the database, you can't test them without standing up a database. Push decisions into the core.
- A core that secretly has effects. Reading `now()`, a global config, or a random value inside the "pure" part quietly makes it impure. Pass those in as parameters; let the shell supply them.
- Mocks everywhere. Needing many mocks is a symptom that logic and I/O are tangled. Moving the logic to a pure function usually removes the mocks entirely.
- Over-applying it. A pure core still needs an edge that talks to the world; the pattern is about *separation*, not about eliminating effects. Trivial scripts don't need the ceremony.

It's the same instinct as [hexagonal architecture](/t/hexagonal-architecture) (business logic inside, adapters outside) and [keeping framework code at the edges](/t/framework-independence): put the valuable, changeable logic where it can be understood and tested in isolation. [Dependency injection](/t/dependency-injection) is one way to wire the shell to the core.
