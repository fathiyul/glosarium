---
title: "Cross-Team Dependencies"
summary: "Work blocked on other teams, and how to manage it."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
---

A cross-team dependency is work, information, or a decision your team needs from another team before it can complete its own work. Examples include an API change, data access approval, schema contract, infrastructure capacity, or a partner's release date.

Dependencies become risky when they are discovered late or exist only as informal promises. Name the dependency, the owner on each side, the needed outcome, and the date by which it affects your plan. For example, “analytics needs the event schema before instrumentation begins” is more actionable than “waiting on product.” Agree on a compatible contract or a temporary mock where possible.

Do not assume that tracking a dependency means the other team is committed to your date. They have their own priorities and may need context to evaluate the request. Escalate a conflict with options and impact, not blame. Sometimes the best solution is to remove the dependency by changing scope or providing a self-service capability.

Backend, frontend, and data engineers should communicate interface changes early and make integration tests available where useful. Keep the dependency visible in shared planning and update it when assumptions change. See [stakeholder management](/t/stakeholder-management), [critical path](/t/critical-path), and [influence without authority](/t/influence-without-authority).

Treat the plan as a decision aid, not a promise detached from its assumptions. Name who can change scope, what evidence would prompt a replan, and which risks need a separate owner. Backend developers can identify system dependencies, frontend developers can clarify user-facing acceptance, and data engineers can expose source, quality, and backfill uncertainty.

Update the assumptions when new evidence arrives, and tell affected partners which consequence changes rather than only changing a date.
