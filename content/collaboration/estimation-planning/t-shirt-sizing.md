---
title: "T-Shirt Sizing"
summary: "Rough S/M/L/XL estimates for early planning."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

T-shirt sizing assigns rough categories such as S, M, and L to work so a team can compare relative size before detailed estimates are justified. It is useful early in planning, when the goal is to identify which items need discovery or may not fit a release.

A team might agree that a small schema change is S, a new integration is L, and a multi-system migration is XL. The categories are meaningful only within that team's shared calibration. They are not durations, and one team's “large” should not be compared with another team's.

Sizing can create false precision if people convert categories directly into dates or use them to rank individual performance. Keep assumptions visible: a task may be large because of implementation, uncertainty, coordination, or risk, and those call for different next steps. Split oversized items or run a [spike](/t/spike) where uncertainty dominates.

Backend, frontend, and data engineers should size together when the work crosses layers so integration effort is not hidden in one discipline's estimate. Use detailed planning only when a decision requires it; otherwise, a coarse category is enough. Revisit the size when scope or evidence changes. See [prioritization frameworks](/t/prioritization-frameworks) and [cone of uncertainty](/t/cone-of-uncertainty).

Treat the plan as a decision aid, not a promise detached from its assumptions. Name who can change scope, what evidence would prompt a replan, and which risks need a separate owner. Backend developers can identify system dependencies, frontend developers can clarify user-facing acceptance, and data engineers can expose source, quality, and backfill uncertainty.

Update the assumptions when new evidence arrives, and tell affected partners which consequence changes rather than only changing a date.
