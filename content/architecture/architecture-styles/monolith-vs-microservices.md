---
title: "Monolith vs Microservices"
summary: "Weighing simplicity against independent scaling and deployment."
levels: { backend: senior, frontend: senior }
aliases: ["monolith or microservices", "monolith vs microservice", "microservices vs monolith", "when to use microservices"]
prereqs: ["monolith", "microservices"]
related: ["modular-monolith", "distributed-monolith", "microservices", "monolith", "architectural-trade-offs", "database-per-service"]
core: [backend]
---

A **monolith** is deployed as one unit. **Microservices** split the system into many independently deployed services ([monolith](/t/monolith), [microservices](/t/microservices)). Neither is "better". They trade different costs.

| | **Monolith** | **Microservices** |
|---|---|---|
| Deployment | One artifact, one release | Many, each independent |
| Complexity | In the codebase | In the system: network, versions, infrastructure |
| Calls between parts | In-process, fast and reliable | Over the network: latency, failures, retries |
| Transactions and consistency | Simple (one database transaction) | Hard: sagas, eventual consistency ([sagas](/t/saga-pattern)) |
| Debugging and testing | Easier: one process, one log | Harder: distributed tracing, many logs, integration tests |
| Scaling | Scale the whole thing | Scale services independently |
| Team autonomy | Teams share a codebase and a release | Teams own services end to end |
| Technology choices | One stack | Free choice per service (and more to maintain) |
| Fault isolation | A bug can take down everything | Failures can be contained (if designed for it) |
| Operational overhead | Low | High: CI/CD per service, discovery, monitoring, security |
| Starting speed | Fast | Slow: infrastructure first |

## What really drives the choice

**Team size and organization.** Microservices mostly solve an **organizational** problem: many teams stepping on each other. With one team or a handful, the overhead usually outweighs the benefit. Conway's law applies: systems mirror communication structures.

**Operational maturity.** Microservices require solid automation, observability and on-call practices. Without them, you get chaos.

**Different scaling or reliability needs** among parts of the system.

**Domain understanding.** Service boundaries are hard to get right early. Wrong boundaries are expensive to fix, much more so than module boundaries in a monolith.

## The usual advice

1. **Start with a (modular) monolith.** Keep clean module boundaries and owned data ([modular monolith](/t/modular-monolith)).
2. **Extract a service when there's a concrete reason**: a different scaling profile, a team that needs independent deployment, a part needing a different technology or isolation.
3. **Avoid the worst of both worlds**: the **[distributed monolith](/t/distributed-monolith)**, services so coupled (shared database, synchronous call chains, lockstep releases) that you pay microservices' costs without their benefits.

## Questions to ask

- What problem are we trying to solve, and is it a **code** problem, a **team** problem or a **scaling** problem? Would better modularity fix it?
- Can we run, monitor and debug a distributed system?
- How will we handle data consistency across services?
- What happens when one service is down?
- Is there a cheaper step (module boundaries, a separate worker process, a managed service) that gets most of the benefit?

Decide with the actual constraints in front of you, record the reasoning ([architecture decision record](/t/architecture-decision-record)), and be willing to change course ([architectural trade-offs](/t/architectural-trade-offs)).
