---
title: "Funnel Analysis"
summary: "Measuring how users move through a sequence of steps."
levels: { data-analyst: mid-level , tech-entrepreneur: pmf }
aliases: ["funnel analysis", "conversion funnel", "funnel metrics", "step conversion"]
prereqs: ["group-by", "cohort-analysis"]
related: ["cohort-analysis", "retention-analysis", "segmentation", "metric-definitions", "kpi-design", "exploratory-data-analysis"]
---

A funnel measures how many people make it through a sequence of steps: landed on the site, signed up, activated, made a first purchase. Each step has a count, a conversion rate from the step before it, and a drop-off. The step with the largest drop is usually where the work goes.

```sql
-- users reaching each step, for one day
SELECT step, COUNT(DISTINCT user_id) AS users
FROM (
  SELECT user_id, 'landed'    AS step FROM events WHERE event_name = 'landed'    AND event_date = DATE '2024-06-01'
  UNION ALL
  SELECT user_id, 'signed_up'          FROM events WHERE event_name = 'signed_up' AND event_date = DATE '2024-06-01'
  UNION ALL
  SELECT user_id, 'purchased'          FROM events WHERE event_name = 'purchased' AND event_date = DATE '2024-06-01'
) steps
GROUP BY step;
```

Per-step conversion is step N divided by the step before it. Overall conversion is the last step divided by the first. Report both: the overall rate hides which step is leaking, and a single bad step early on makes everything after it look worse than it is.

Two classic mistakes:

Count sessions instead of people and the top of the funnel inflates, because one person contributes several sessions and each session starts at step one, so the drop-off looks far worse than it is. **Decide the unit — user, session, device or account — and use it at every step**, and write it down with the definition ([metric definitions](/t/metric-definitions)).

Change what counts as activation, reorder a step or add one, and the historical series no longer measures the same thing: the next report shows a drop caused by the change itself. **Version the funnel definition**, and keep the old series visible alongside the new one while it beds in ([metric discrepancy](/t/metric-discrepancy)).

Two more things to get right. Funnels assume an order, so decide what happens to users who arrive out of it — someone who buys before signing up, or who never touches the middle step. And the funnel tells you where people leave, not why; that needs a different analysis ([segmentation](/t/segmentation), [diagnostic analysis](/t/diagnostic-analysis)). A funnel can look excellent while nobody comes back, which is what [retention analysis](/t/retention-analysis) is for.
