---
title: "Quality Attributes (the \"-ilities\")"
summary: "Scalability, availability, maintainability and other non-functional goals."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["quality attributes", "ilities", "nonfunctional characteristics"]
prereqs: ["non-functional-requirements", "software-architecture"]
related: ["non-functional-requirements", "fitness-function", "architecture-review"]
---
**Quality attributes** (the "-ilities": scalability, reliability, security, maintainability, observability, deployability…) name the dimensions architecture is judged on besides features. They turn "good system" from vibes into trade-offs: every attribute has scenarios (stimulus → response, measurably), tactics (patterns delivering it), and conflicts with others (security vs usability, flexibility vs performance).

```text
attribute → scenario: "1000 rps surge → p99 < 500ms" (testable)
          → tactics: autoscale, cache, shed (how)
          → trade-off: cost, complexity (price)
```

Attributes drive structure more than features do: the same forum software built for auditability vs for scale looks nothing alike. Naming the priority order early (which ilities win conflicts) prevents every decision relitigating values.

The classic mistakes:

- All attributes equal priority. "Fast, secure, cheap, flexible" without ranking decides nothing when they conflict. Rank explicitly; let ranking settle disputes.
- Attributes without scenarios. "Scalable" untestable; "10× Christmas traffic at p99 <1s" decidable. Scenario-ise every claimed attribute.
- Tactics applied blindly. Caching, queues and replicas added where the attribute doesn't matter complicate without benefit. Tactics follow prioritised scenarios.
- Conflicts undiscovered. Security reviews vetoing the performance design at launch, or operability discovering undeployable architecture in prod. Surface conflicts in reviews, early.
- -ilities as one person's job. "The architect handles quality" while feature teams ship against it guarantees erosion. Attributes owned collectively, enforced automatically.
- Static priorities. Startup's "ship fast" maturing into scale-up's "survive success" without re-ranking leaves architecture optimised for a dead era. Re-rank yearly.
- Unmeasured attributes. Claimed reliability without SLOs, claimed maintainability without change metrics — assertions, not attributes. Measure what you claim.

**How to use them:** rank, scenario-test, tactic deliberately, enforce with fitness functions, re-rank as the business evolves. The -ilities are architecture's requirements — specify them like it.
