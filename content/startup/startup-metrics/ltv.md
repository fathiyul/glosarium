---
title: "Customer Lifetime Value"
summary: "The gross profit you expect from a customer over the whole relationship."
levels: { tech-entrepreneur: pmf }
aliases: ["customer lifetime value", "LTV", "CLV", "lifetime value"]
prereqs: ["churn-rate", "gross-margin"]
related: ["ltv-cac-ratio", "churn-rate", "net-revenue-retention", "cac-payback-period"]
core: [tech-entrepreneur]
---

**Customer Lifetime Value (LTV)** is the gross profit a customer generates across the whole relationship: average revenue × gross margin × expected lifetime (roughly 1 ÷ churn rate for subscription shapes). It sets every acquisition budget — spendable CAC, payable payback, viable channels all derive from LTV.

```text
e.g. $50/mo × 80% margin ÷ 5% monthly churn = $800 LTV (20-month expected life)
use:  CAC ≤ LTV/3-ish (rule of thumb, segment-dependent) · payback from monthly margin
```

LTV is an *estimate built on retention assumptions*, not a fact — and retention is the load-bearing one. A churn shift from 5% to 7% cuts lifetime nearly a third; LTV models deserve sensitivity ranges, not point values.

The classic mistakes:

- Churn-blind LTV. Computing lifetime from early, best-cohort retention while actuals decay. Use mature-cohort churn by segment, refreshed quarterly — LTV rots silently otherwise.
- Gross revenue as value. Multiplying ARPU without margin overstates brutally for low-margin businesses (marketplaces, fintech flows). Gross profit, always.
- Infinite-horizon math. 1/churn assumes constant hazard forever; real curves flatten (good) or businesses change. Cap horizons explicitly for planning sanity.
- One LTV for all segments. Enterprise and SMB lifetimes differ by multiples. Segment LTV drives segment CAC budgets — blended LTV misallocates both.
- LTV justifying any CAC today. Future value does not pay today's salaries. Pair LTV with [payback period](/t/cac-payback-period) — value *and* timing decide spendable acquisition cost.

**Recompute quarterly** by segment, with churn, margin and horizon stated. LTV is the ceiling over acquisition strategy — see [LTV:CAC](/t/ltv-cac-ratio) for the ratio that rules growth spending.
