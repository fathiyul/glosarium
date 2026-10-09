---
title: "Micro-Frontends"
summary: "Splitting a frontend into independently deployed parts."
levels: { frontend: senior }
aliases: ["micro frontends", "microfrontends", "micro-frontend architecture", "frontend microservices", "module federation"]
prereqs: ["monolith", "component-library"]
related: ["microservices", "web-components", "design-system", "component-library", "monorepo-vs-polyrepo", "client-side-routing"]
core: [frontend]
---

**Micro-frontends** apply the microservices idea to the frontend: a large web app is split into **independently developed and deployed parts**, each owned by a different team (often a full vertical slice, including its backend), and composed into one product in the browser or at the edge.

```
                    ┌──────────────── shell (header, routing, auth) ────────────────┐
                    │  /catalog  → Catalog app (team A)                              │
                    │  /cart     → Cart app    (team B)                              │
                    │  /account  → Account app (team C)                              │
                    └────────────────────────────────────────────────────────────────┘
```

## Why teams do it

- **Team autonomy at scale**: many teams work and release without coordinating on a giant frontend codebase and release train.
- **Independent deployments**, so a small change doesn't mean redeploying everything.
- **Incremental modernization**: replace parts of a legacy frontend piece by piece, even with a different framework.
- **Clear ownership boundaries** that mirror business domains.

## Ways to compose them

| Approach | How | Notes |
|---|---|---|
| **Build-time** | Each part is a package, assembled into one app at build | Simple, but not independently deployed |
| **Runtime, via JavaScript** | The shell loads each part's bundle at runtime (for example with module federation) | Truly independent deploys, more complexity |
| **iframes** | Each part in its own iframe | Strong isolation, awkward UX, communication and accessibility |
| **Web components** | Each part exposes custom elements ([web components](/t/web-components)) | Framework-agnostic boundary |
| **Server-side / edge composition** | HTML fragments are stitched together on the server or CDN | Good for performance and SEO |

## Costs and risks

- **Duplicated dependencies** and a heavier page: each part may bundle its own copy of the framework and libraries. Share carefully, and budget performance ([performance budgets](/t/performance-budget)).
- **Inconsistent UX** without a strong shared [design system](/t/design-system) and [component library](/t/component-library).
- **Shared state and communication** (auth, user, cart) across parts needs explicit contracts: events, URLs, a small shared API.
- **Routing, navigation and error handling** at the seams.
- **Complex tooling and testing**: integration across independently deployed parts, version compatibility, local development.
- **Operational overhead**: more pipelines, versions and monitoring.
- **Organizational rather than technical benefit.** If you have one team, it's overhead with little payoff.

## When it makes sense

A large product with **many teams** that are blocked by a shared frontend codebase, with clear domain boundaries, strong platform engineering and a shared design system. For most teams, a well-structured **modular monolith** frontend (clear module boundaries, a monorepo, shared components, good tooling) gives most of the benefits with far less complexity ([modular monolith](/t/modular-monolith), [monorepo vs polyrepo](/t/monorepo-vs-polyrepo)).

As with microservices ([monolith vs microservices](/t/monolith-vs-microservices)): don't adopt it for fashion. Adopt it to solve a real scaling problem in how your teams work.
