---
title: "Cohort Analysis"
summary: "Comparing groups who started together, tracked over their own lifetimes."
levels: { data-analyst: mid-level }
aliases: ["cohort analysis", "cohort table", "cohort retention"]
prereqs: ["segmentation", "retention-analysis"]
related: ["retention-analysis", "segmentation", "funnel-analysis", "survival-analysis"]
core: [data-analyst]
---

A **cohort** is a group sharing a starting event — signed up in March, installed v2.4, joined from a campaign — tracked forward along its own lifetime. **Cohort analysis** lays those lifetimes side by side: March signups at month 0, 1, 2 against April signups at month 0, 1, 2. Calendar date disappears; age does the comparing.

```text
         month0  month1  month2  month3
Mar cohort 100%    62%     48%     41%
Apr cohort 100%    65%     51%      —
May cohort 100%    58%      —       —
(read down columns: same age, different cohorts — the fair comparison)
```

Columns compare fairly (same age, different eras); rows show a cohort ageing. A rising column means newer cohorts behave better — the product improving. A falling one means the opposite, even if headline totals still grow on the back of acquisition.

The classic mistakes:

- Calendar-aligned comparison. March signups in June against June signups in June compares 3-month-olds with newborns. Align by cohort age, always.
- Reading rows as improvement. A cohort's own row declines by construction (users leave over time) — that slope is the product's retention shape, not a verdict on recent work. Verdicts live in the columns.
- Tiny recent cohorts. Last week's cohort has two data points and enormous noise. Do not brief the all-hands on a cohort younger than the behaviour needs to stabilise.
- Survivorship in disguise. Cohorts defined by a later event ("users who upgraded") select for the engaged. Define cohorts by the starting event, before outcomes are known.
- One cohort table for every question. Retention cohorts, revenue cohorts and feature-adoption cohorts answer different things. Build the cohort around the behaviour being studied (see [retention analysis](/t/retention-analysis), [funnel analysis](/t/funnel-analysis)).

**The discipline:** define by start, align by age, compare down columns, and distrust any cohort too young to have lived. See [survival analysis](/t/survival-analysis) for the formal machinery underneath.
