---
title: "Bounded Context"
summary: "A boundary inside which a model and its terms have one meaning."
levels: { backend: senior, frontend: senior }
aliases: ["bounded contexts", "DDD bounded context", "context boundary", "model boundary"]
prereqs: ["domain-driven-design", "ubiquitous-language"]
related: ["ubiquitous-language", "context-map", "anti-corruption-layer", "domain-driven-design", "microservices", "modular-monolith"]
core: [backend]
---

A **bounded context** is an **explicit boundary within which a particular domain model, and its language, applies consistently**. It's a central idea of [domain-driven design](/t/domain-driven-design) (from Eric Evans), and it solves a problem that appears in every large system: **the same word means different things in different parts of the business.**

Consider "**Customer**":

| In... | A Customer is... | Cares about |
|---|---|---|
| **Sales** | A prospect or account in a pipeline | Contacts, deals, territory |
| **Billing** | A party that's invoiced | Tax ID, payment terms, billing address |
| **Support** | A person with open tickets | Plan, history, entitlements |
| **Shipping** | A recipient at an address | Delivery address, phone |

Trying to build **one universal Customer model** for all of them creates a bloated, contradictory class that everyone depends on and nobody can change. The alternative: **each context has its own model** of customer, tailored to its needs, with its own meaning of the word.

```
┌─ Sales context ──────┐   ┌─ Billing context ─────┐   ┌─ Support context ─────┐
│ Customer = lead/acct │   │ Customer = invoiced   │   │ Customer = ticket     │
│ Deal, Pipeline       │   │ Invoice, Payment      │   │ requester; Ticket     │
└──────────────────────┘   └───────────────────────┘   └───────────────────────┘
        ▲        translate at the boundary (IDs, events, APIs)        ▲
```

## What defines the boundary

- **A consistent ubiquitous language**: inside the context, a term has exactly one meaning ([ubiquitous language](/t/ubiquitous-language)).
- **A model that's internally consistent**, with its own rules and invariants.
- **Often its own team, codebase and database**, since the model is autonomous.
- **Explicit contracts at the edges**: how contexts talk to each other, by published events, APIs and translation. Mapped in a [context map](/t/context-map), and protected by an [anti-corruption layer](/t/anti-corruption-layer) when integrating with a messy external model.

## Why it matters for architecture

- **It's the natural unit for service or module boundaries.** A good microservice (or module in a [modular monolith](/t/modular-monolith)) often corresponds to one bounded context. Boundaries based on technical layers or arbitrary entities tend to produce chatty, coupled services ([microservices](/t/microservices)).
- **It reduces coupling**: contexts share only what's necessary, in a controlled way.
- **It keeps models small and understandable.**
- **It aligns teams with domains.**

## Finding them

- **Listen to the language.** Where does the same word start meaning something different? Where do domain experts disagree about a term?
- **Run collaborative modeling sessions** with domain experts ([event storming](/t/event-storming)).
- **Look at organizational structure**: teams, departments and workflows.
- Accept that boundaries are discovered over time, and refine them.

A bounded context is not the same as a **subdomain** (a part of the business problem), though they often line up. Don't draw boundaries along technical convenience. Draw them along meaning.
