---
title: "Choreography vs Orchestration"
summary: "Services reacting to events vs a central coordinator directing them."
levels: { backend: senior, data-engineer: senior }
aliases: ["choreography vs orchestration", "saga choreography", "saga orchestration"]
prereqs: ["saga-pattern", "event-driven-architecture"]
related: ["saga-pattern", "workflow-engine", "event-driven-architecture"]
---
**Choreography vs orchestration** is the choice between coordinating a multi-step workflow with no centre (services react to each other's events — choreography) or with one (an orchestrator commands each step — orchestration). Dancers improvising versus an orchestra following a conductor.

```text
choreography:  order→[paid event]→shipping reacts, →[shipped]→notify reacts…
orchestration: conductor: charge→(ok)→reserve→(ok)→ship→(fail?)→compensate
```

Choreography decouples (no centre to bottleneck or fail) but obscures the workflow — no place shows the whole story, failures emerge from interactions. Orchestration centralises visibility and error handling but creates a coupling hub that must scale and survive.

The classic mistakes:

- Choreography past comprehension. Five services emoting events with the workflow existing nowhere produces emergent behaviour nobody can trace or debug. Choreograph simple flows; orchestrate complex ones.
- Orchestrator as god object. Every workflow through one conductor makes it the bottleneck, blast radius and deployment coupling. Scope orchestrators per domain/process.
- No saga discipline either way. Partial failures need compensation regardless of style; "the events will work out" is not a rollback plan (see [saga](/t/saga-pattern)).
- Cyclic choreography. A→B→C→A event loops (directly or via chains) deadlock or spin. Map the graph; break cycles explicitly.
- Versioning the conversation. Events and commands evolve; choreographed consumers break silently on misunderstood messages. Version and test the protocol like an API.
- Observability gap in choreography. Without a conductor, tracing the workflow needs correlation ids and stitched traces across every hop. Instrument all of them.

**How to choose:** simple, stable, few-step flows → choreography; complex, evolving, failure-prone processes → orchestration (see [workflow engine](/t/workflow-engine)). Most systems mix — and name which style each flow uses.
