---
title: "Event Sourcing"
summary: "Storing every change as an event and deriving state from them."
levels: { backend: senior, data-engineer: senior }
aliases: ["ES", "event sourced", "event store", "event-sourced systems", "storing events"]
prereqs: ["domain-event", "event-driven-architecture"]
related: ["cqrs", "domain-event", "event-driven-architecture", "record-history", "eventual-consistency", "event-schema-versioning"]
also: [integration]
core: [data-engineer]
---

In **event sourcing**, you don't store the **current state** of an entity. You store the **sequence of events** that happened to it, as the source of truth. The current state is **derived** by replaying the events.

```
Traditional (state):          balance = 70                   ← history is gone

Event sourced:                1. AccountOpened     (owner: Ana)
                              2. MoneyDeposited    (+100)
                              3. MoneyWithdrawn    (-30)
                              → replay: 0 + 100 - 30 = 70
```

Events are **immutable facts in the past tense**, only appended, never edited or deleted ([domain events](/t/domain-event)). A correction is a new event (`WithdrawalReversed`).

```python
def apply(state, event):
    if event.type == "MoneyDeposited": return state + event.amount
    if event.type == "MoneyWithdrawn": return state - event.amount
    return state

balance = reduce(apply, events_for("account-42"), 0)
```

## What you gain

- **A complete audit trail** by design: every change and its reason, with timestamps.
- **Time travel**: reconstruct the state at any past moment, and answer "what did we know then?"
- **New views later**: build new **projections** (read models) by replaying the history, even for questions you didn't think of originally ([CQRS](/t/cqrs)).
- **Debugging and analysis**: replay events to reproduce a bug.
- **A natural fit** with event-driven architecture: the events can be published to other services ([event-driven architecture](/t/event-driven-architecture)).

## The real costs

- **Complexity and a different mindset**: modeling in events, handling projections and eventual consistency.
- **Reads need projections.** You rarely query the event log directly. Read models are built asynchronously, so they lag ([eventual consistency](/t/eventual-consistency)).
- **Event schema evolution is hard.** Events are stored forever, so old shapes must stay readable. Versioning and upcasting are needed ([event schema versioning](/t/event-schema-versioning)).
- **Performance of replay**: long histories need **snapshots** (periodic saved state) to avoid replaying thousands of events.
- **Deleting data** (privacy laws, right to erasure) conflicts with immutability. Techniques include crypto-shredding (encrypting personal data with a key you can delete) and keeping personal data outside the events.
- **Tooling and operations** are less mature than for plain databases, and ad-hoc queries and reporting are harder.
- **Getting event granularity right** takes experience: too fine-grained creates noise, too coarse loses meaning.

## When it fits

Domains where **history is the point**: finance and accounting (ledgers are naturally event-sourced, see [ledger](/t/ledger)), audit-heavy systems, collaborative or workflow-heavy domains, and systems needing temporal queries.

For ordinary applications where you only need an audit log, a simple history table is much cheaper ([record history](/t/record-history)). Event sourcing is a significant commitment, so adopt it deliberately, in the part of the system that benefits, not across everything.
