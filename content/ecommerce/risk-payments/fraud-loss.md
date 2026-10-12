---
title: "Fraud Loss"
summary: "What fraud actually costs — chargebacks plus goods plus freight plus the false-positive bill nobody puts in the column."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["fraud cost", "net fraud loss"]
prereqs: []
related: ["fraud-rate", "chargeback-rate", "promo-abuse", "fake-cod-order"]
---

Fraud loss converts the [rate](/t/fraud-rate) into money, and the honest version has four lines most dashboards omit:

```text
gross fraud loss:
  1. chargeback value + network dispute fees
  2. goods: the item that never comes back (or returns gutted)
  3. freight: outbound + return + the courier slot burned
  4. FALSE-POSITIVE cost: legitimate orders declined or blocked
     × margin × retention damage  ← the omitted line
```

Line 4 is the one that changes decisions: risk teams optimized against "fraud caught" alone over-block, and the store bleeds revenue the fraud never took. The economic target is never zero fraud — it is the *minimum total* of (fraud loss + false-positive cost + controls cost), a frontier, not a floor.

The Indonesian COD twist: for COD stores, fraud loss lives almost entirely in lines 2 and 3 ([fake-COD orders](/t/fake-cod-order) — the returned parcel with its round-trip freight and its aged unit), not in chargebacks; and COD "losses" concentrate in refused high-value single parcels, where a Rp 1.2jt phone that rode 800km both ways *is* the fraud loss, invisible in a card-centric report.

Measurement discipline: maturity windows (a chargeback today is an order from 60 days ago — report losses against the *cohort* of the order, not the calendar of the dispute), netting recovery (representment wins, insurance payouts, restocked-and-resold units with their discount cost), and one consistent unit (Rp of loss per 1,000 orders is comparable across seasons; % of revenue hides mix shifts that look like risk improvement).

Where the number should surface: the [profit waterfall](/t/profit-waterfall) — fraud loss belongs as an explicit deduction between gross and contribution margin, not buried in "ops," because the moment risk cost lands next to marketing cost and [shipping subsidy](/t/shipping-subsidy-ratio), the growth meeting can finally answer "how much protection buys the next thousand orders" with arithmetic instead of argument.
