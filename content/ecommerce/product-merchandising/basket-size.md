---
title: "Basket Size"
summary: "How many distinct items ride along in one order — the depth metric behind bundle strategy."
levels: { data-analyst: junior }
aliases: ["items per basket", "basket depth", "line items per order"]
prereqs: []
related: ["upt", "attach-rate", "market-basket-analysis", "aov"]
---

Basket size = distinct order lines (or SKUs) per order. It reads close to [UPT](/t/upt) — units per order — and differs where quantities and variants bite: a basket with 3 packs of the same socks is 1 line / 3 units; your bundle analytics and your warehouse picker disagree on what "size" means, so state the counting rule (lines vs distinct SKUs vs units) and keep it stable.

```text
basket-size distribution, 12 months:
  1 line  72% · 2 lines 18% · 3+ 10%
target the 18% → 24%: every line added moves [AOV](/t/aov)
without a new customer, a new ad, or a discount
```

Why it deserves its own column: basket depth is the *structural* driver of revenue quality — shipping and payment costs are largely per-order, so each marginal line is nearly pure [contribution margin](/t/contribution-margin) (the economics behind every free-shipping threshold, see [shipping subsidy ratio](/t/shipping-subsidy-ratio)). Two stores at equal AOV — one from big single-item baskets, one from deep small-item baskets — have different profitability per delivered carton.

The levers it judges: [attach-rate](/t/attach-rate) programs (accessory placement adds a *line*), bundle SKUs (careful: a bundle is one line that *reduces* measured basket size while *raising* UPT — track both or your report contradicts itself), and category-completion prompts (the cart widget from [market-basket](/t/market-basket-analysis) lift pairs).

Analyst cautions: basket size is taxonomy-sensitive (a store that explodes one category into ten subcategories grows measured "distinct categories per basket" by editing a menu), returns reverse it (a 3-line basket returned 2 lines is 1 line that shipped three times), and reseller clusters inflate it — segment B2B-looking patterns out ([purchase frequency](/t/purchase-frequency) shapes flag them).

When it's the wrong target: categories where depth is capped by the product itself (a rice cooker is a rice cooker), and any push that adds lines by adding *subsidy* — check margin per line before celebrating the carton.
