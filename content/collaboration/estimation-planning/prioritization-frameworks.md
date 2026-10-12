---
title: "RICE and MoSCoW"
summary: "Frameworks for prioritizing work."
levels: { backend: senior, frontend: senior, data-engineer: senior , tech-entrepreneur: pmf , data-scientist: senior }
---

Prioritization frameworks such as RICE and MoSCoW help teams compare candidate work using a shared set of questions. RICE commonly considers reach, impact, confidence, and effort; MoSCoW groups requirements as must, should, could, or will not for a particular scope. Implementations and definitions vary, so agree on what the labels mean before using them.

A framework can make assumptions visible. A feature with broad expected reach but low confidence may deserve research before a large build. A compliance requirement may be a “must” because of a deadline rather than a high score in a generic value calculation.

Do not treat a score as an objective answer. Inputs can be uncertain or biased, and a single number may hide strategic, safety, dependency, or maintenance concerns. Use the result to structure discussion, then have the decision owner explain the trade-off. Revisit priorities when evidence or constraints change.

Backend, frontend, and data engineers should contribute effort, risk, and dependency estimates without pretending they are exact. Product partners clarify user value and reach; data teams can help validate measurement assumptions. See [cost of delay](/t/cost-of-delay), [roadmap](/t/roadmap), and [OKRs](/t/okrs).

Treat the plan as a decision aid, not a promise detached from its assumptions. Name who can change scope, what evidence would prompt a replan, and which risks need a separate owner. Backend developers can identify system dependencies, frontend developers can clarify user-facing acceptance, and data engineers can expose source, quality, and backfill uncertainty.

Update the assumptions when new evidence arrives, and tell affected partners which consequence changes rather than only changing a date.
