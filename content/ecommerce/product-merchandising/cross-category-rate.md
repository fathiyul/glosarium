---
title: "Cross-Category Purchase Rate"
summary: "Share of customers buying from two or more categories — the one-buyer-versus-many-stores test."
levels: { data-analyst: junior }
aliases: ["category breadth", "multi-category rate"]
prereqs: []
related: ["category-penetration", "gateway-category", "market-basket-analysis", "attach-rate"]
---

Cross-category purchase rate = customers with orders in ≥2 categories ÷ customers with ≥1, per window. It measures whether your catalog behaves as *one store* or a hallway of strangers: the number is the breadth of the customer relationship.

```text
breadth per customer (categories bought, 12mo):
  median 1.2 · 34% buy ≥2 · those 34% carry 71% of revenue
```

That last line is the pattern worth checking in your own data: multi-category buyers tend to dominate revenue and [retention](/t/retention-analysis) — they bought the store's *reason to exist* (one-stop convenience), not one product. The operational corollary: "second category activation" is often the cheapest retention program you have — one more category converted per customer beats one more customer converted.

Where it earns its keep:

- **Gateway mapping.** Paired with [gateway category](/t/gateway-category) analysis: which first category produces broad buyers? A beauty-first cohort with 3.1 categories/year tells you where the *funnel into the whole store* starts.
- **Bundling and search design.** High cross-category lift between pairs is [market-basket](/t/market-basket-analysis) affinity across carts (not just within baskets); the homepage "complete your setup" modules are built from these pairs.
- **Category valuation.** A thin-margin category with high *cross-rate* effect is loss-leader infrastructure; the same category with zero cross-effect is just a low-margin business line.

Traps: category taxonomy drift inflates the number (split one department into four subcategories and "cross-category" becomes arithmetic, not behavior — freeze the tree or use hierarchy depth deliberately); and window choice dominates (a phone-buyer adding a case in the *same* order is same-order cross-category, a fundamentally different habit than buying a case next quarter).

Founders: treat the metric as the breadth half of growth math — revenue = customers × [frequency](/t/purchase-frequency) × [AOV](/t/aov) tells depth; cross-category rate tells how many reasons a customer has to stay.
