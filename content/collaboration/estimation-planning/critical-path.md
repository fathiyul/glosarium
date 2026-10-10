---
title: "Critical Path"
summary: "The chain of tasks that determines the earliest finish date."
levels: { backend: senior, frontend: senior, data-engineer: senior }
---

The critical path is the chain of dependent tasks that determines the earliest possible finish date for a project, given the current plan and durations. A delay to a task on that path can delay the overall outcome unless the plan changes; work outside it may have some scheduling slack.

For example, a migration might require schema design, a backfill, reconciliation, and consumer cutover in sequence. Work on a separate dashboard may proceed in parallel, but the cutover still waits for reconciliation. A dependency diagram makes these relationships easier to see than a flat list of tasks.

Critical-path analysis depends on the plan's assumptions and task estimates. If durations are uncertain or resources are shared across tasks, the calculated path can change. Do not use it to imply that every task on the chain is equally risky or that work off the path is unimportant; a near-critical dependency can become the constraint after a small change.

Backend, frontend, and data engineers should identify integration order and external approvals, then revisit the path as evidence changes. Make owners and predecessor conditions explicit. See [milestone](/t/milestone), [cross-team dependencies](/t/cross-team-dependencies), and [project kickoff](/t/project-kickoff).

Treat the plan as a decision aid, not a promise detached from its assumptions. Name who can change scope, what evidence would prompt a replan, and which risks need a separate owner. Backend developers can identify system dependencies, frontend developers can clarify user-facing acceptance, and data engineers can expose source, quality, and backfill uncertainty.

Update the assumptions when new evidence arrives, and tell affected partners which consequence changes rather than only changing a date.
