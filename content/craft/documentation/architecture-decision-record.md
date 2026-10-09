---
title: "Architecture Decision Record (ADR)"
summary: "A short document recording a decision, its context and its consequences."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["ADR", "ADRs", "decision record", "architectural decision record", "decision log"]
prereqs: ["design-doc", "technical-writing"]
related: ["design-doc", "rfc-process", "one-way-two-way-doors", "architectural-trade-offs", "docs-as-code", "onboarding-docs"]
core: [backend, frontend, data-engineer]
---

An **Architecture Decision Record (ADR)** is a **short document that captures one significant decision**: what was decided, the context and options that led to it, and the consequences. The format was popularized by Michael Nygard in a 2011 article. Teams keep a numbered series of them, which together form a **decision log** explaining *why the system is the way it is*.

## A typical template

```markdown
# ADR 0012: Use PostgreSQL for the orders service

Status: Accepted (2024-06-03)

## Context
We need transactional integrity for orders and payments, ad-hoc reporting, and a team that
already operates PostgreSQL. Expected load is under 500 writes/second for the next two years.

## Options considered
1. PostgreSQL
2. A document database
3. A managed key-value store

## Decision
We will use PostgreSQL (managed), with read replicas for reporting.

## Consequences
+ Strong consistency and familiar tooling.
+ Reporting queries can run on replicas.
- Horizontal write scaling will require partitioning later.
- We accept operating costs of a managed instance.
```

Typical fields: **title and number**, **status** (proposed, accepted, deprecated, superseded by ADR-0027), **context**, **decision**, **consequences** (good and bad), and often the **alternatives** considered.

## Why write them

- **Memory.** Six months later, nobody remembers why you chose X, and people reverse good decisions or keep bad ones for fear of changing them ([Chesterton's fence](/t/chestertons-fence)).
- **Onboarding**: new people read the log and understand the architecture's reasoning.
- **Better decisions.** Writing the context and options forces clarity, and exposes weak reasoning.
- **Shared alignment** and fewer repeated debates.
- **Honest trade-offs**: recording the downsides you accepted ([architectural trade-offs](/t/architectural-trade-offs)).

## Good practice

- **Keep them short** (one page) and focused on one decision.
- **Store them in the repository**, next to the code, as Markdown (for example `docs/adr/0012-use-postgresql.md`), and review them in pull requests ([docs as code](/t/docs-as-code)).
- **Write them at the time of the decision**, not months later.
- **Don't edit history.** If a decision changes, write a **new ADR** that supersedes the old one, and mark the old one as superseded. The trail of reasoning is the value.
- **Write one for decisions that are costly to reverse**: databases, major frameworks, service boundaries, security approaches ([one-way and two-way doors](/t/one-way-two-way-doors)). Don't write them for every small choice.
- **Link related documents**: larger proposals use a [design doc](/t/design-doc) or [RFC process](/t/rfc-process), and the ADR records the outcome.
