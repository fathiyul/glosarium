---
title: "Profit Waterfall (GMV → Net Profit)"
summary: "The step-by-step bridge from gross merchandise value down to what you actually keep."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["margin waterfall", "GMV to profit bridge"]
prereqs: ["gmv", "contribution-margin"]
related: ["gmv", "contribution-margin", "discount-burn", "ebitda", "gross-margin"]
---

The profit waterfall walks revenue down to reality, one deduction per step. Every e-commerce argument about "are we profitable" is really an argument about which line this bridge hides:

```text
GMV (ordered value)
 − cancellations & expired payments     → paid GMV
 − returns & refunds                    → net revenue
 − COGS                                 → gross profit
 − shipping subsidy + packing + payment fees
 − marketplace commission / ads spend   → contribution margin
 − salaries, rent, tools (fixed)        → operating profit
 − interest, tax, D&A                   → net profit
```

As an analyst, the waterfall *is* your model: one fact table at order-line level, one dimension per deduction, and every dashboard reads off it consistently. The moment someone says "margin" without naming its line, point at the step. The classic corporate incident: marketplace GMV slides presented as growth while commission + paid-boost spend ate every step below — paid GMV grew, [contribution margin](/t/contribution-margin) died two lines down.

Founders: the waterfall reframes the growth conversation. "Marketing spend" is one *specific* step (ads), shipping subsidy another — and each has its own lever. Which step grew fastest this quarter is a better question than "where's our profit", and the answer changes who you hire.

The build traps: double-counting (return costs *and* revenue reversal — pick one convention and enforce it), allocation (shared courier fee across three orders; ads spend across ten SKUs — allocate with a stated rule, revisit annually), and timing (refund hits today for an order of last quarter — cash view or accrual view, both valid, never mixed).

When not to over-engineer: single-channel, pre-scale stores — five lines cover the truth. The full bridge earns its keep exactly when different people control different steps and argue about the sum.
