---
title: "API-First Design"
summary: "Designing the API contract before implementing it."
levels: { backend: senior, frontend: senior }
aliases: ["api-first", "design-first api", "contract first"]
prereqs: ["api-contract", "api-documentation"]
related: ["api-lifecycle", "bff", "backward-compatibility"]
---

**API-first design** means defining the API contract before writing the implementation. You design the endpoints, request/response shapes and errors as the primary artifact, get feedback from consumers, and only then build the service behind it. The interface is the product; the implementation serves it.

It matters because APIs outlive implementations. Clients, integrations and other teams build on the interface; changing it later is expensive (see [backward compatibility](/t/backward-compatibility)). Designing first catches awkward shapes before they're baked into code.

```text
api-first:  design contract → review with consumers → implement → ship
code-first: build service → whatever it returns becomes the contract
```

A practical workflow: write the OpenAPI/schema spec, have consumers and frontend review it, generate mocks so frontend work can start in parallel, then implement against the spec and verify with contract tests.

The classic mistakes:

- Letting the code define the API. The "code-first" default means the response shape is whatever the models happen to serialize — internal fields leak, awkward shapes ship, and changes are accidental. Design it deliberately.
- Designing in isolation. An API designed without talking to its consumers often misses what they actually need, forcing workarounds and a v2. Review with them.
- Over-specifying the internals. The contract is the boundary, not the implementation. Don't lock in how it's built.
- Treating the spec as documentation-only. If the spec isn't the source of truth that drives mocks, validation and tests, it drifts and lies.
- Ignoring errors and edge cases. A contract that only describes the happy path is half a contract. Define the failure shapes.
- Freezing too early. API-first is about designing before building, not preventing iteration. Solicit feedback and refine before committing.

**When to use it:** whenever the API has external or cross-team consumers — which is most of the time. For a truly internal, private interface, code-first is fine. The discipline pays off by producing coherent APIs that consumers can actually use, and by decoupling frontend and backend work through an agreed [contract](/t/api-contract). See the [API lifecycle](/t/api-lifecycle) and [BFF](/t/bff).
