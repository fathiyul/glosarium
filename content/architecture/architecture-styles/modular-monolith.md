---
title: "Modular Monolith"
summary: "A monolith with strong internal module boundaries."
levels: { backend: senior, frontend: senior }
aliases: ["modulith", "modular monolith architecture", "well-structured monolith", "monolith with modules"]
prereqs: ["monolith", "coupling"]
related: ["monolith", "microservices", "monolith-vs-microservices", "cohesion", "coupling", "hexagonal-architecture", "plugin-architecture"]
core: [backend]
---

A **modular monolith** is an application deployed as **one unit**, but internally organized into **well-separated modules with strict boundaries**, each owning a business capability (orders, billing, catalog, users). It aims to get the **simplicity of a monolith** (one deployment, in-process calls, easy transactions and debugging) plus the **discipline of microservices** (clear ownership and boundaries).

```
one deployable
 ├── orders/     public API: OrdersFacade        ─ internal code and tables hidden
 ├── billing/    public API: BillingFacade
 ├── catalog/    public API: CatalogFacade
 └── users/      public API: UsersFacade
 modules talk through public interfaces or events, never through each other's internals or tables
```

## What makes it "modular"

- **Modules map to business domains**, with high cohesion inside and low coupling between ([cohesion](/t/cohesion), [coupling](/t/coupling)).
- **Explicit public interfaces.** Other modules may call only those. Everything else is private.
- **Data ownership**: each module owns its tables, and **other modules don't query them directly**. They go through the module's interface (or consume its events). This is the boundary that matters most.
- **Enforced boundaries**: not just conventions. Use language visibility, package or module systems, and tooling that fails the build on forbidden dependencies (architecture tests, dependency rules).
- **No circular dependencies** between modules.
- Often combined with ideas from [hexagonal architecture](/t/hexagonal-architecture) inside each module.

## Why it's attractive

- **Simple operations**: one deployment, one database, one monitoring setup.
- **Easy refactoring and transactions** across modules, in-process calls with no network failures.
- **Easier local development and testing.**
- **A path forward**: well-defined modules with owned data can later be **extracted into services** if a real need appears (independent scaling, separate team), at lower risk than splitting a tangled codebase.
- **Avoids the distributed-systems tax** until you need it ([microservices](/t/microservices), [distributed monolith](/t/distributed-monolith)).

## The risks

- **Boundaries erode without enforcement.** A "modular" monolith where anyone can import anything and join any table is just a big ball of mud with folders.
- **Shared database temptation**: cross-module joins are easy and tie everything together.
- **One deploy unit**: a single team's bug can break the release for everyone. Independent scaling and independent releases aren't available.
- **Getting module boundaries wrong** is costly either way. Learn the domain, and start with coarse modules.
- **Build times** and repository size can grow, though tooling helps.

## When to choose it

For most products and most team sizes, it's a strong default: **start modular, stay monolithic until a concrete reason forces a split**. See [monolith vs microservices](/t/monolith-vs-microservices) for the decision.
