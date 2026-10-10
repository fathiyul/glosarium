---
title: "Investigating Metric Discrepancies"
summary: "Explaining why two numbers that should match don't."
levels: { data-engineer: mid-level , data-analyst: mid-level }
aliases: ["numbers don't match", "metric mismatch", "dashboard discrepancy", "why do two reports disagree", "data discrepancy investigation"]
prereqs: ["metric-definitions", "data-reconciliation"]
related: ["metric-definitions", "data-reconciliation", "semantic-layer", "data-lineage", "late-arriving-data", "grain"]
core: [data-engineer, data-analyst]
---

"The finance dashboard says revenue was 1.84 M, and the product dashboard says 1.91 M. Which is right?" This happens constantly, and trust depends on how you handle it. The cause is almost always **a difference in definition, scope or timing**, not mysterious bad data, and you find it by **narrowing down systematically**.

## A method that works

**1. Write both numbers down precisely**, with where each comes from (dashboard, table, query), the date and time you looked, the filters applied, and the time range. Screenshots help.

**2. Compare the definitions**, item by item. Most discrepancies end here:

| Check | Typical differences |
|---|---|
| **What's counted** | Gross vs net of refunds, with or without tax or shipping, paid vs booked, test accounts included? |
| **Time boundaries** | UTC vs local time zones, calendar month vs 30 days, event date vs load date ([event time vs processing time](/t/event-time-vs-processing-time)) |
| **Time of refresh** | One dashboard updated at 06:00, the other at 09:00. Late data hasn't arrived in one ([late-arriving data](/t/late-arriving-data)) |
| **Filters** | Country, plan, status, internal users |
| **Source tables** | Application database vs billing system vs warehouse copy |
| **Grain and joins** | A join that fans out and duplicates rows, or one that drops rows (inner vs left join) ([grain](/t/grain)) |
| **Currency and units** | Conversion rates, dates of conversion, cents vs dollars |
| **Deduplication and corrections** | One includes duplicates or not, one applies backdated corrections |

**3. Make them comparable.** Run both calculations for the *same* definition and window, ideally in a single query, so you can stop arguing about two different questions.

**4. Narrow down by slicing.** Compare by day, then by region, product or customer. Find the **smallest slice where they differ**, then the specific rows or IDs that exist on one side only ([data reconciliation](/t/data-reconciliation)).

```sql
-- find the days where two sources disagree
SELECT COALESCE(a.day, b.day) AS day, a.revenue AS dashboard_a, b.revenue AS dashboard_b
FROM revenue_a a FULL JOIN revenue_b b ON a.day = b.day
WHERE a.revenue IS DISTINCT FROM b.revenue
ORDER BY day;
```

**5. Explain the cause**, and **quantify** how much each reason contributes to the gap ("1.8 K from refunds, 0.9 K from a time zone cutoff, 0.1 K unexplained").

**6. Decide what's right**, together with the people who own the definition. Sometimes both are correct for their purpose, and the fix is to name them differently ("Booked revenue" and "Recognized revenue").

**7. Prevent it from recurring.** Define the metric once ([metric definitions](/t/metric-definitions), [semantic layer](/t/semantic-layer)), document it, and add a reconciliation check.

## Habits

- **Don't assume which is wrong.** Be curious, not defensive.
- **Reproduce before theorizing.**
- **Check recent changes**: a new filter, a modified model, a schema change upstream ([data lineage](/t/data-lineage)).
- **Communicate**: tell the people who noticed what you found and what you'll do, so they stop doubting both dashboards.
- **Keep a log** of past discrepancies and their causes. The same few reasons recur.
