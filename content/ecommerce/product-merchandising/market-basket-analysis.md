---
title: "Market Basket Analysis"
summary: "Finding which products are bought together — the affinity math behind bundles and recommendations."
levels: { data-analyst: mid-level, data-scientist: mid-level }
aliases: ["basket analysis", "association analysis", "products bought together"]
prereqs: []
related: ["support-confidence-lift", "attach-rate", "association-rules", "cross-category-rate"]
---

Market basket analysis mines order lines for co-purchase patterns: if customers repeatedly buy A with B, there is an association worth surfacing — the "frequently bought together" widget, the bundle, the cross-sell at add-to-cart. The formal machinery is association-rule mining (Apriori/FP-Growth families, see [association rules](/t/association-rules)); the vocabulary that decides what you ship is three numbers:

```text
support(A,B)    share of baskets containing both
confidence(A→B) of baskets with A, how many include B
lift(A→B)       confidence ÷ overall B-rate — >1 is genuine affinity,
                =1 "they co-occur because everyone buys B"
```

Lift is the metric that survives contact with a phone-case store: confidence for (phone → case) is huge and *worthless* (every phone buyer needs the case — that's the product working, not an insight); the interesting rows are cross-category lifts (kettle → dish soap, *why* is a household's kitchen trip also a cleaning trip) where the recommendation actually *creates* a purchase.

The two operational uses, with their traps:

- **Bundling and attach.** High-lift pairs become bundles — but check [margin per SKU](/t/margin-per-sku) before discounting a bundle: bundling two A-class margin items is a gift with no discovery value; bundling an A with its C-class companion is pricing strategy ([attach-rate](/t/attach-rate) is the follow-through metric).
- **Recommendation ranking.** [Collaborative filtering](/t/recommendation-system) generalizes the same co-occurrence idea across users; the rule-based lift tables beat cold-start personalization for new visitors and remain the interpretable baseline a model must outperform.

Analyst cautions: support thresholds hide *profitable* rare pairs (a Rp 2jt pair at 0.3% support can outrank a Rp 20k pair at 12% on expected value — weight lift by margin); seasonality manufactures fake pairs (Ramadan cooking sets live one month); and COD markets cluster orders by household — dedupe per shipping address or you learn "one family's spreadsheet" as a population preference.

When not to bother: single-unit categories (nothing to associate) and catalogs so small the rules are the taxonomy itself — read the category tree; skip the algorithm.
