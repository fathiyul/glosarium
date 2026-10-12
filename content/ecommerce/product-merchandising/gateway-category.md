---
title: "Gateway Category Analysis"
summary: "Which first-category purchases create customers who come back for everything else."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["gateway products", "entry categories", "wedding wedge"]
prereqs: ["cross-category-rate"]
related: ["cross-category-rate", "category-penetration", "second-purchase-rate", "acquisition-quality"]
---

The gateway category is the entry point that turns strangers into multi-category customers: sort first orders by category, then track [second-purchase rate](/t/second-purchase-rate) and category breadth from each entry.

```text
first-order category → 12-mo behavior:
  phone cases   2nd-order 7%  · breadth 1.1   — traffic, not trust
  small kitchen 2nd-order 31% · breadth 2.6   — the real gateway
  vitamins      2nd-order 58% · breadth 1.4   — habit loop (repeats one thing)
```

The table shows the two distinct jobs: *repeat* gateways (vitamins — consumable cadence) build frequency, *breadth* gateways (kitchen — starts an ecosystem habit) build cross-category revenue. The metric's purpose is spending acquisition budget toward whichever the strategy needs, because "cheapest first order" ([acquisition quality](/t/acquisition-quality) again) and "best first order" are usually different categories.

Building it properly: fix the cohort window (entry cohorts observed to equal age — a category launched last month can't prove breadth), count categories on a stable taxonomy, and run [margin per SKU](/t/margin-per-sku) underneath, because many gateways are cheap-by-design entry products whose second orders do the earning — which converts the gateway from a discount into an investment with a payback schedule.

The merchandising moves the analysis supports are unusually concrete: feature gateways in ad targeting lookalike-style audiences built from gateway buyers beat broad interest), seed the second-category moment (the kitchen buyer's first accessory *must* be discoverable — post-purchase flows, bundle placement), and price gateways as CAC ([the case is a business card; the kitchen order is the job interview](/t/attach-rate)).

Cautions: causality is not the point — cohorts choosing a category already differ; treat gateway ranking as targeting guidance, and use [holdout tests](/t/holdback-group) on any "push gateway X to segment Y" campaign before budgeting it; and watch promo pollution — a gateway's breadth partly reflects the campaigns that funded it ([promo dependence](/t/promo-dependence) by entry category is the correction).
