---
title: "Requirements"
summary: "What the software must do."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: mid-level }
aliases: ["software requirements", "functional requirements"]
prereqs: ["user-story"]
related: ["user-story", "edge-cases", "acceptance-criteria", "user-empathy"]
---

Requirements describe what the software must do, and sometimes how well it must do it. Functional requirements are the behaviours: "customers can save a card". Non-functional requirements are the qualities: "the page loads quickly for slow connections", "data is encrypted at rest".

Requirements are often incomplete when they arrive. A request like "add export" leaves open the format, the size limit, who can export, and what happens to large data sets. Turning that into something buildable means asking those questions and writing the answers down.

```
Request:     "Add export."
Requirement: "Account owners can export their orders as CSV, for a date range
              the team has set a limit on. Large exports are emailed instead."
              (The limits are for the team to decide, not fixed rules.)
```

The classic mistake is treating the first description as complete, and discovering the gaps after the work is done. Ask about the unusual cases, and about who the feature is for. [Edge cases](/t/edge-cases) are often where the missing requirements hide. For the way requirements are written in a team, see [user stories](/t/user-story).
