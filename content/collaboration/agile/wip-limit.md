---
title: "WIP Limit"
summary: "Capping how many tasks are in progress at once."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
---

A work-in-progress (WIP) limit caps how many tasks a team or workflow stage may have active at one time. The goal is to expose bottlenecks and encourage finishing work before starting more, rather than keeping everyone busy on many half-done items.

If code review has several waiting changes, starting another feature does not make the queue shorter. A visible limit can prompt the team to help review, split a large change, or investigate why work is blocked. The limit is a conversation trigger, not a rule to leave urgent incidents unattended.

Set limits based on the team's workflow and adjust them after observing actual flow. A limit that is too high changes nothing; one that is too low may create avoidable idle time if tasks genuinely require independent work. Do not use WIP limits to pressure individuals or conceal dependencies outside the team's control.

Make blocked work visible and distinguish active work from work waiting for an external decision. Review the system as a team; the objective is smoother completion, not a dashboard that looks full. WIP limits work naturally with [Kanban](/t/kanban) and can help improve [cycle time](/t/cycle-time).

Check the workflow with a recent piece of work rather than relying on an abstract rule. If the practice adds a queue or hides blocked work, adjust it; if it helps the team finish and learn, keep it. Backend developers can flag service constraints, frontend developers can check user-facing behavior, and data engineers can surface pipeline or data-quality dependencies.

After trying it, review several completed items and adjust the practice if it created a queue, hid a blocker, or failed to produce a useful outcome.
