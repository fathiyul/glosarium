---
title: "Ninety-Ninety Rule"
summary: "The last 10% of the work takes the other 90% of the time."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
---

The Ninety-Ninety Rule is a humorous saying: the first part of a project appears nearly complete, then the remaining work takes much longer than expected. It points to the hidden work that often remains after the main implementation seems finished.

A dashboard can look complete while permissions, empty states, accessibility, monitoring, data reconciliation, deployment, and support documentation remain. These tasks are not always visible in a demo, but they determine whether the feature is safe and usable in production. Make “done” explicit and include integration, testing, rollout, and operational work in planning.

The saying is not a reason to add a fixed amount to every estimate or to treat the final phase as inherently unpredictable. Investigate unknowns early and keep unfinished work visible. If a team repeatedly discovers the same late tasks, improve its checklist or build pipeline rather than accepting the pattern as inevitable.

Backend, frontend, and data engineers should each identify their production-readiness responsibilities before implementation is declared complete. Product and delivery partners need to understand which risks remain and what can be deferred safely. See [definition of done](/t/definition-of-done), [iterative delivery](/t/iterative-delivery), and [estimate buffers](/t/estimate-buffers).

Treat the plan as a decision aid, not a promise detached from its assumptions. Name who can change scope, what evidence would prompt a replan, and which risks need a separate owner. Backend developers can identify system dependencies, frontend developers can clarify user-facing acceptance, and data engineers can expose source, quality, and backfill uncertainty.

Update the assumptions when new evidence arrives, and tell affected partners which consequence changes rather than only changing a date.
