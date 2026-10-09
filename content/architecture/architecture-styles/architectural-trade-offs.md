---
title: "Architectural Trade-offs"
summary: "Every architecture decision gives something up; naming what."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["architecture trade-offs", "trade-offs in architecture", "tradeoffs", "it depends", "architecture decisions trade-offs"]
prereqs: ["quality-attributes", "non-functional-requirements"]
related: ["quality-attributes", "non-functional-requirements", "architecture-decision-record", "fitness-function", "one-way-two-way-doors", "design-doc"]
core: [backend, frontend, data-engineer]
---

There is no best architecture. Every significant design choice **gives you something and takes something away**, and the right choice depends on your **context**: your goals, constraints, team and what you're optimizing. A senior engineer's answer to "which should we use?" is rarely "X". It's "it depends on these factors, and here's what we gain and lose with each."

## Qualities pull against each other

Systems are judged on qualities such as performance, scalability, availability, consistency, security, cost, simplicity, time to market and maintainability ([quality attributes](/t/quality-attributes), [non-functional requirements](/t/non-functional-requirements)). Improving one often costs another:

| Choice | You gain | You give up |
|---|---|---|
| **Caching** | Speed, lower load | Freshness, simplicity (invalidation) |
| **Microservices** | Independent deployment and scaling, team autonomy | Operational complexity, consistency, debuggability |
| **Strong consistency** | Simple reasoning, correct reads | Latency and availability |
| **Denormalization** | Fast reads | Write complexity, risk of inconsistency |
| **Build vs buy** | Control and fit vs speed and lower maintenance | Time and cost, or flexibility |
| **More abstraction/flexibility** | Adaptability | Simplicity, performance, readability |
| **Redundancy** | Availability | Cost, complexity |
| **Rewrite** | Clean design | Risk, time, lost features |

Example: *"We'll use a message queue between checkout and email."* Gain: checkout isn't slowed or broken by email problems. Cost: the email is delayed and the flow is harder to trace. For an email, worth it. For a payment confirmation the user waits on, maybe not.

## How to reason about them

- **Name the trade-off explicitly.** "We're choosing availability over strict consistency here, accepting that a user might briefly see stale data." Unstated trade-offs become surprises.
- **Know what actually matters here.** Rank the qualities for this system: a trading platform and a marketing site differ.
- **Use numbers.** Expected load, data size, latency targets and cost make "it scales" and "it's fast enough" testable.
- **Consider reversibility**: prefer cheap, reversible choices, and spend care on irreversible ones ([one-way and two-way doors](/t/one-way-two-way-doors)).
- **Consider the team**: a technically elegant design that your team can't operate is a bad trade.
- **Consider time.** Today's good-enough solution may be tomorrow's constraint. Decide when you'll revisit.
- **Compare real alternatives**, including "do nothing" and "the simple version".

## Make it durable

- **Record decisions and their reasoning** ([architecture decision records](/t/architecture-decision-record), [design docs](/t/design-doc)).
- **Guard the properties you care about** with automated checks that fail when an important quality regresses ([fitness functions](/t/fitness-function)).
- **Revisit** when context changes.

Be wary of absolute claims ("always use X", "never do Y") and of trends. Good architecture is the discipline of making deliberate trade-offs, and being honest about what you gave up.
