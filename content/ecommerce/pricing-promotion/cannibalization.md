---
title: "Sales Cannibalization"
summary: "When a new product, channel or promo eats your own existing sales instead of adding to them."
levels: { data-analyst: mid-level, data-scientist: mid-level }
aliases: ["self-cannibalization", "demand stealing"]
prereqs: []
related: ["promo-dependence", "pull-forward", "market-basket-analysis", "assortment-gap", "incremental-revenue"]
---

Cannibalization is sales that *moved* rather than sales that were *created*. A promo, a new SKU, a second channel or a cheaper house-brand version lifts its own numbers while a neighbor declines; sum the lines and it looks like growth. Net of cannibalization is the honest number — and it is the same [incrementality](/t/incremental-revenue) question wearing an assortment costume.

```text
week with promo on SKU-A:
  SKU-A +38% · SKU-B (same shelf, no promo) −22%
  category net: +9% — not +38%
```

Three flavors e-commerce teams hit, with their tells:

- **Promo cannibalization** — the discounted item steals from its undiscounted siblings. Tell: category [basket size](/t/basket-size) steady, category margin falls.
- **Assortment cannibalization** — a new product splits demand from its substitute. Tell: combined demand curve barely shifts after launch; the "winning" SKU is the *lower-margin* one.
- **Channel cannibalization** — your TikTok shop takes from your marketplace store; your own ads bid against the affiliate's code. Tell: total orders flat, attribution fights suddenly get heated.

Measurement, cheapest to best: pre/post with category totals (confounded, quick read), holdout by region or cohort ([difference-in-differences](/t/difference-in-differences) on the *neighbors*, not the treated SKU — cannibalization is read off what *didn't* get the treatment), and substitution modeling at basket level ([market-basket](/t/market-basket-analysis) lift pairs make the stealing visible: if A and B routinely appear in competing baskets, promo A is partly promo-B's funeral).

Founders: the strategic version — cannibalizing yourself *on purpose* (launching the cheaper tier before a competitor does; a marketplace moving sellers to official stores) is a defense, and the number that decides it is: how much would a rival have taken, versus how much of ours we'll take.

Analysts: report the **net** line with every gross win. One campaign deck that celebrated +38% SKU-A without the category line will be remembered — and demanded — at the next budget.
