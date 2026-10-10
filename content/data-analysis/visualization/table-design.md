---
title: "Table Design"
summary: "Laying out rows and columns so the important number is found before everything else."
levels: { data-analyst: junior }
aliases: ["table layout", "designing tables", "table formatting"]
prereqs: ["chart-selection", "data-visualization"]
related: ["sparkline", "bar-chart", "pivot-table", "data-freshness", "visual-hierarchy"]
---

A table is a chart with a grid. **It is the right form when the reader needs exact values**, needs to look up one row, or needs to compare a measure across many rows. Tables get designed badly more often than charts, because they are the default rather than a choice.

## What makes one work

- **The important number is found first.** Sort by it by default, keep it in a consistent column, and right-align it. Left-aligned numbers cannot be compared down a column.
- Consistent units and consistent decimals. A column mixing "1.2k" with "842" and "12,400" cannot be scanned at all.
- One idea per column. If one column holds both this month's figure and last month's, the header tells the reader nothing about what to compare.
- Fewer columns than you think. Every extra column costs the whole row. Ten columns is a data dump; five is a finding.
- Group rows and put a subtotal where each group starts. See [pivot table](/t/pivot-table) for the spreadsheet way of building one.
- Keep the totals row visually distinct from the last group, and label it. A reader should never mistake a total for a member.
- Say when the data was refreshed and where it came from — a stale table presented as current is worse than no table, so link or state [data freshness](/t/data-freshness).

## The trade-off

A table is precise and slow. When the question is "which is biggest" rather than "what is the exact number", a [bar chart](/t/bar-chart) answers faster. When the question is "which is moving", a [sparkline](/t/sparkline) column answers it without a second view.

Many tables earn their place by carrying both: the number for the reader who needs it and the shape for the reader scanning. Ordering the columns is [visual hierarchy](/t/visual-hierarchy) applied to a grid, and the same rule holds — decide what should read first, then let size, weight and spacing express that.
