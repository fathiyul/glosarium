---
title: "Cone of Uncertainty"
summary: "Estimates get more accurate as work progresses."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
---

The cone of uncertainty describes how estimates tend to become more informed as a team learns about a project and reduces unknowns. Early estimates can vary widely because requirements, technical constraints, and dependencies are not yet clear; later estimates can use evidence from investigation and completed work.

It is not a promise that uncertainty shrinks smoothly or that a project estimate can be multiplied by a fixed factor. New information can reveal more work and widen the range again. A team migrating an unfamiliar system may discover a hidden dependency only after tracing real data flows.

Communicate estimates as ranges or scenarios when precision is not supported. Explain the assumptions behind them and what activity could reduce uncertainty, such as a [spike](/t/spike), a prototype, or a dependency review. Avoid using early estimates as firm commitments without an explicit decision about risk and scope.

Backend, frontend, and data engineers should state what they know, what remains unknown, and which systems or teams must be involved. Product partners can then choose whether to investigate, reduce scope, or proceed with a risk. Update estimates as evidence arrives rather than treating a changed forecast as a personal failure. See [estimate buffers](/t/estimate-buffers), [t-shirt sizing](/t/t-shirt-sizing), and [Hofstadter's Law](/t/hofstadters-law).

Treat the plan as a decision aid, not a promise detached from its assumptions. Name who can change scope, what evidence would prompt a replan, and which risks need a separate owner. Backend developers can identify system dependencies, frontend developers can clarify user-facing acceptance, and data engineers can expose source, quality, and backfill uncertainty.

Update the assumptions when new evidence arrives, and tell affected partners which consequence changes rather than only changing a date.
