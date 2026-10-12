---
title: "Promo Uplift"
summary: "How much a promotion sold above its baseline — the first question every campaign owes."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["uplift", "promo lift", "baseline sales"]
prereqs: []
related: ["incremental-revenue", "difference-in-differences", "holdback-group", "contribution-margin", "revenue-decomposition"]
---

Promo uplift measures the sales jump a promotion caused:

```text
uplift % = (promo sales − baseline) ÷ baseline
baseline 100 units/week, promo week 130 → +30%
```

Everything interesting lives inside "baseline". A plain average of prior weeks assumes nothing else moved — and during [double-date campaigns](/t/revenue-decomposition) like 11.11 the whole category rises with the tide, so a "30% uplift" can be nothing against a market at +40%. Build the baseline from comparable non-promo weeks, the same stores and customers, ideally a **control** that sees no promo ([holdback group](/t/holdback-group)), or [difference-in-differences](/t/difference-in-differences) when the groups differ to begin with.

Uplift is not yet profit, and three things eat it:

- **Discount cost.** +30% units at −25% price is usually margin erosion in disguise — run the [contribution margin](/t/contribution-margin) arithmetic before the victory lap.
- **Cannibalization.** Some of the promo product's gain came from sibling SKUs that would have sold at full price; subtract them.
- **Pull-forward.** The week after a flash sale dips *below* baseline — buyers stocked tomorrow's purchase today. Net uplift across promo + post period is the honest number.

As a founder, use uplift to rank promo *mechanics* — voucher depth vs free shipping vs bundle — under the same budget; uplift without the margin correction simply selects the loudest discount. As an analyst, report the trio together: uplift %, [incremental revenue](/t/incremental-revenue), and margin effect. Campaigns judged on one of the three get repeated badly.

When not to bother: liquidation (the goal is converting inventory to cash, not demand creation) and brand-first campaigns — forcing an uplift story onto either produces a confident number nobody can act on.
