---
title: "Developer Productivity Metrics"
summary: "SPACE, DORA, and the danger of measuring the wrong thing."
levels: { backend: staff, frontend: staff, data-engineer: staff }
---

Developer productivity metrics attempt to describe how engineering work flows and what outcomes it produces. Frameworks such as SPACE and DORA group different dimensions, but no single score captures an engineer's contribution or the health of a team.

A delivery measure can reveal a bottleneck, but it can also be distorted if used as a target. If teams are rewarded for more deployments, they may split changes without improving safety or customer value. If individual output is inferred from commits or tickets, collaborative work, reviews, maintenance, and complexity may disappear from view.

Use measures to ask questions and compare a team's own process over time, not to rank individuals or teams without context. Combine quantitative signals with operational outcomes and conversations with engineers. Explain definitions, data quality, and possible unintended effects before making decisions from a dashboard.

Backend flow measures might reflect deploy safety and incident load. Frontend signals can include review delay and release stability. Data measures may track pipeline failures and rework from unclear contracts. Read each number alongside the work it came from. Discuss with the team whether a change in the metric matches their experience, and stop using any measure that encourages gaming or hides collaborative effort. Retire any measure that stops informing a decision.

Backend, frontend, and data engineering have different release shapes and feedback loops, so avoid comparing raw counts across unlike work. Involve the people measured in choosing and interpreting the measures. See [cycle time](/t/cycle-time), [velocity](/t/velocity), and [business metrics](/t/business-metrics).
