---
title: "Conway's Law"
summary: "Systems mirror the communication structure of the organizations that build them."
levels: { backend: staff, frontend: staff, data-engineer: staff }
aliases: ["conway's law", "conways law", "organizations mirror systems"]
prereqs: ["microservices", "domain-driven-design"]
related: ["bounded-context", "monolith", "modular-monolith"]
---

**Conway's law** observes that a system's structure tends to mirror the communication structure of the organisation that built it. If four teams work on four separate components and rarely talk, you get a system of four loosely-connected parts. If one team builds a monolith, that's what the code looks like. The architecture reflects the org chart, whether you intended it or not.

```text
org:    Team A        Team B        Team C
system: [service A]   [service B]   [service C]
        (or one tangled module per team — same law, worse outcome)
```

Why it happens: people design interfaces at the boundaries where communication already happens. Where communication is hard, coupling is low and coordination is expensive; where it's easy, systems get tightly integrated. The architecture is a social artifact as much as a technical one.

The practical implication is the **inverse Conway maneuver**: if you want a particular architecture, shape the teams to match it. Want clean service boundaries? Give each service a team that owns it end to end. Want a modular monolith? Organise teams around modules with clear ownership. The org design is a lever on the technical design.

The classic mistakes:

- Ignoring it. Architects design ideal boundaries that ignore how teams actually communicate, and the system drifts back toward the org shape, leaving the intended design unrealised.
- Believing microservices will impose boundaries by themselves. If the teams aren't aligned to the services, you get a distributed monolith — all the coupling, plus network calls.
- Forcing the wrong structure. Rearranging teams to chase an architecture, without the communication and ownership to support it, creates confusion rather than clean boundaries.
- Treating it as fatalism. It's a tendency, not destiny. Deliberate ownership and communication design can shape the system — that's the point of the inverse maneuver.

Conway's law pairs naturally with [Domain-Driven Design](/t/domain-driven-design): [bounded contexts](/t/bounded-context) are meaningful boundaries, and aligning teams to them makes the boundaries real. It's a key reason the [monolith vs microservices](/t/microservices) decision is partly an organisational one, and why "modular" structures that match teams tend to hold up best.
