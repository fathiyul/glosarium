---
title: "Purchase Frequency"
summary: "Orders per customer over a window — how often your base returns, not how big each visit is."
levels: { data-analyst: junior }
prereqs: ["aov"]
related: ["second-purchase-rate", "rfm-analysis", "cohort-analysis", "days-of-inventory"]
---

Purchase frequency = total orders ÷ customers, over a defined window. The "per customer" part hides two different denominators and the choice changes everything: **orders per customer-ever** (includes one-and-done ghosts, drags the average) vs **orders per active customer** (measures the behavior of the living base). A store's blended frequency falls every time it acquires aggressively — the new customers dilute the denominator before their repeat orders arrive. Compare like definitions, or the metric becomes a growth punishment.

```text
100 customers · 130 orders/yr = 1.3 frequency
of which: 30 multi-buyers place 100 orders (3.3)
          100 → active-only view tells the better truth
```

What frequency actually diagnoses: whether the product *lives in a routine*. Consumables (coffee, baby supplies, refill beauty) support a natural frequency you can predict; fashion accessory frequency is event-driven and campaign-shaped. Against the natural cycle, deviations are findings: a 1.2 frequency in a category your data says should sit at 4 means re-engagement failure or a satisfaction leak; a frequency far *above* the natural cycle can mean your pricing pushes customers into small top-up baskets — which quietly raises your shipping-subsidy cost per rupiah of revenue ([shipping subsidy ratio](/t/shipping-subsidy-ratio)).

The pairing that matters: revenue = frequency × [AOV](/t/aov) × customers. Same revenue growth from frequency is usually the cheaper growth (no new CAC, no new traffic), which is why frequency deserves a line next to AOV on every board slide, not buried in RFM.

Inventory note for the ops reader: frequency distributions feed [replenishment and reorder-point](/t/reorder-point) models — a base that buys every 30 days predictably needs different safety stock than one that buys three times a year in bursts.

When frequency misleads: multi-account buyers (household members, resellers buying through personal accounts — resellers inflate frequency and *depress* margin; flag with basket-pattern detection), and promo-event periods where the burst is calendar, not habit.
