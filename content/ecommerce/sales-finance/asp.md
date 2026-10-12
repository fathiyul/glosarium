---
title: "Average Selling Price (ASP)"
summary: "Revenue per unit sold — the price half of the basket, before the margin question."
levels: { data-analyst: junior }
aliases: ["ASP", "average unit price"]
prereqs: ["aov"]
related: ["aov", "upt", "margin-per-sku", "discount-depth"]
---

ASP = net revenue ÷ units sold. It is the *price* side of the basket; [UPT](/t/upt) is the *quantity* side; together they are [AOV](/t/aov) split into things you can actually act on.

```text
AOV = ASP × UPT
Rp 120k AOV = Rp 50k/unit × 2.4 units  → raise ASP, or raise depth?
```

ASP moves for three reasons, and telling them apart is the entire job: **mix shift** (customers bought more of the premium line — or the promo pushed cheap stock up in volume and dragged ASP down), **list-price changes**, and **discount depth**. Same headline number, opposite business stories — a rising ASP from selling more premium is strength; the same rise because a cheap SKU went out of stock is [lost demand](/t/stock-out-rate) wearing a mask. Decompose ASP into mix effect vs within-SKU price effect before it goes in any deck.

Analysts: report ASP at category level, not company level — a store mixing Rp 15k phone cases and Rp 4jt cookware has a blended ASP that describes no real transaction. And gross vs net: after discounts, or before? The number differs exactly by your [discount depth](/t/discount-depth); pick net and say so.

Founders: ASP is the quick read on whether [pricing](/t/pricing-tiers) and positioning are holding. A slow ASP decline under flat sales volume is the promo spiral starting — depth climbing to defend units is the same event in two charts.

When ASP misleads: bundles (the bundle's ASP is per-pack, not per-item — normalize or exclude), marketplace commissions (you see gross-to-customer, you keep net), and category seasons that never repeat comparably. It is a *price-behavior* signal, never a profitability claim — margin per SKU is a different page.
