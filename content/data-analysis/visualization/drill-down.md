---
title: "Drill-Down"
summary: "Clicking a summary number to see the detail behind it, and the trap of drilling without a question."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["drilldown", "drilling into detail", "drill through"]
prereqs: ["dashboard-design", "chart-selection"]
related: ["dashboard-design", "bi-dashboard", "self-service-analytics", "metric-definitions", "aggregate-tables", "ad-hoc-analysis"]
---

Drill-down is navigating from a summary number to the detail behind it: a total breaks into regions, a region into countries, a country into accounts, an account into transactions. It is the difference between a number and an explanation.

## Why it matters

A dashboard tile tells you something is wrong. Drill-down is the only thing that tells you *where*. Without it, every follow-up question becomes a new request to the data team, and the person with the question waits.

## The trap

**Drilling without a question.** The path from "revenue is 8% below target" to "here are the forty thousand transactions" is technically possible and analytically useless. **Drill-down answers a question that got narrower, not one that got bigger.** "Which segment explains the gap?" narrows. "Show me everything about revenue" does not — it just moves the work from the analyst to the reader, who now has to do the narrowing themselves.

## Designing one

- Every level should answer a question somebody actually asked. If a level exists because the join was easy, delete it.
- Keep the drill consistent with the metric definition, or the detail will not reconcile with the summary. Two definitions of "revenue" produce a waterfall that disagrees with the tile above it — see [metric definitions](/t/metric-definitions).
- Watch the grain. The commonest drill-down bug is a join that changes grain and quietly multiplies the detail rows, so the drill shows more than the total.
- Put a row count on each level. A reader who drills into five rows needs to know that before they form an opinion.
- Make the top level open in one click. A summary number you cannot open is a dead end, and readers stop trusting the numbers above it.

## The trade-off

Each level is another query, and the deepest level is usually too slow to be interactive. Pre-aggregate the levels people actually use — [aggregate tables](/t/aggregate-tables) and [olap cubes](/t/olap-cube) exist for this — and leave the raw table for the rare case. Give readers the freedom and it becomes [self-service analytics](/t/self-service-analytics); keep it inside a page and it is [dashboard design](/t/dashboard-design) or a [bi dashboard](/t/bi-dashboard). And when the drill is a fishing expedition after an experiment, [ab testing](/t/ab-testing) is the discipline that stops it.
