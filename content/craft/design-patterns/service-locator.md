---
title: "Service Locator"
summary: "A registry for looking up dependencies, often seen as an anti-pattern."
levels: { backend: senior, frontend: senior }
aliases: ["service locator", "service locator pattern", "locator"]
prereqs: ["dependency-injection", "inversion-of-control"]
related: ["anti-pattern", "singleton", "design-pattern", "coupling"]
---

A **service locator** is a central registry that objects query to obtain their dependencies. Instead of being handed what they need, objects ask the locator: "give me the database" or "give me the logger". It centralises *where* dependencies come from and can be convenient in code that has no easy way to pass things in.

```text
# service locator
db = ServiceLocator.resolve("database")

# dependency injection
class ReportService(db):   # receives db from outside
```

It's widely regarded as an **anti-pattern**, for one main reason: it hides dependencies. With [dependency injection](/t/dependency-injection), a class's constructor lists what it needs, so you can see its dependencies at a glance. With a locator, the dependency is invisible in the signature — anything could resolve anything — and testing means configuring a global registry rather than passing a fake.

The classic mistakes:

- Using it to avoid passing dependencies. It's often chosen because threading dependencies through constructors is tedious. The tedium is the price of visible dependencies; hiding it doesn't remove the coupling, just the evidence of it.
- A global mutable registry. A locator is frequently a [singleton](/t/singleton), which makes tests order-dependent and state leak between them.
- Runtime failures instead of compile-time. A missing registration fails when the code runs, not when it's built. Dependency injection moves that to startup or compile time.
- Blaming it for framework ergonomics. In some frameworks the locator is built in and hard to avoid; that's a framework limitation, not a reason to add more.
- Confusing it with DI container. A DI *container* can be fine — it wires dependencies at startup and injects them. The problem is resolving dependencies *inside* business code, at call time. That distinction is the whole issue.

**When it's acceptable:** at the composition root — the single place where the app is wired together — a container resolving dependencies is normal. The anti-pattern is when arbitrary code reaches into the locator to get collaborators. Prefer constructor injection so dependencies are explicit; see [dependency injection](/t/dependency-injection) and [inversion of control](/t/inversion-of-control).
