---
title: "Blast Radius"
summary: "How much breaks when something fails."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["blast radius", "failure blast radius", "limiting blast radius", "fault isolation", "failure domain"]
prereqs: ["availability", "single-point-of-failure"]
related: ["bulkhead", "cell-based-architecture", "canary-release", "cascading-failure", "single-point-of-failure", "circuit-breaker", "least-privilege"]
core: [backend]
---

**Blast radius** is **how much of your system, and how many users, are affected when something fails or goes wrong**. A failure is inevitable, so the design question is: *when it happens, how far does it spread?* Good architecture keeps the radius small.

The cause might be a bad deploy, a faulty configuration, a crashed dependency, a compromised credential, a noisy tenant or a mistaken command. What differs is whether it takes down **one user**, **one service**, **one region** or **everything**.

## Reducing it, at every level

**Isolate failure domains**

- **Bulkheads**: separate resource pools (thread pools, connection pools, queues) per dependency or feature, so one failing dependency can't exhaust shared resources ([bulkhead](/t/bulkhead), [thread pool exhaustion](/t/thread-pool-exhaustion)).
- **Cells**: partition the system into independent, identical copies (cells), each serving a subset of customers. An incident hits one cell, not everyone ([cell-based architecture](/t/cell-based-architecture)).
- **Multi-region and availability zones** with independent failure domains ([redundancy](/t/redundancy)).
- **Separate accounts, projects and environments**, so a mistake in one doesn't touch another.
- **Per-tenant limits** so one customer can't consume everything ([rate limiting](/t/rate-limiting)).

**Contain changes**

- **Gradual rollouts**: canaries, percentage rollouts, region by region ([canary release](/t/canary-release)).
- **Feature flags** to turn off a bad change instantly ([feature flags](/t/feature-flags)).
- **Small, frequent changes** instead of big-bang releases.
- **Staged configuration changes**: config pushes have caused huge outages when applied to everything at once.

**Prevent propagation**

- **Timeouts, circuit breakers, load shedding and backpressure** so failures don't cascade ([circuit breaker](/t/circuit-breaker), [cascading failure](/t/cascading-failure), [load shedding](/t/load-shedding)).
- **Degraded modes**: when a non-critical dependency fails, the core still works ([degraded modes](/t/degraded-modes)).
- Avoid shared fate: single shared databases, caches or control planes that everything depends on ([single point of failure](/t/single-point-of-failure)).

**Limit what damage a person or credential can do**

- **Least privilege**, narrow credentials and scoped access ([least privilege](/t/least-privilege)).
- **Guardrails on destructive operations**: confirmations, dry runs, soft deletes, backups ([backups](/t/backups)).

## Thinking tools

- For any change or component, ask: **"If this fails or is wrong, who is affected, and how fast can we stop it?"**
- **Estimate the percentage of users** that a single failure could impact, and set a goal to shrink it.
- Practice with **game days** and fault injection to find hidden shared dependencies ([chaos engineering](/t/chaos-engineering)).

There's a cost: isolation adds complexity and duplication. Spend it where the potential damage is greatest, such as the core path, shared infrastructure and anything that touches all customers at once.
