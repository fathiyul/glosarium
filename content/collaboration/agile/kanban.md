---
title: "Kanban"
summary: "Visualizing work on a board and limiting work in progress."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["kanban board"]
prereqs: ["agile"]
related: ["agile", "backlog", "sprint", "scrum"]
---

Kanban is an approach to managing work that makes the flow visible. Work items sit on a board with columns for each stage, such as To do, In progress, Review and Done. People pull the next item when they have capacity, rather than committing to a fixed batch for a fixed period.

```
To do      | In progress (limit 3) | Review  | Done
-----------+------------------------+---------+------
Search fix | Login bug              | PR #88  | Export
Dark mode  | Checkout copy          |         |
```

The key idea is the work-in-progress limit: a maximum number of items allowed in a column at once. When a column is full, the team finishes something before starting more. Limits show bottlenecks, because work piles up in front of the slow stage.

Kanban doesn't require sprints, which is one of the main differences from [Scrum](/t/scrum). Teams often use it for support work and maintenance, where new requests arrive unpredictably.

The classic mistake is a board with no limits, where everything is "in progress" at once and nothing finishes. Set limits, and treat a full column as a signal to help clear it, not to start more work.
