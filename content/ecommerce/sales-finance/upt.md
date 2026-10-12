---
title: "Units per Transaction (UPT)"
summary: "How many items leave in one order — basket depth, priced separately from what they cost."
levels: { data-analyst: junior }
aliases: ["UPT", "items per order", "units per order"]
prereqs: ["aov"]
related: ["aov", "asp", "attach-rate", "basket-size"]
---

UPT = total units sold ÷ number of orders. Where [AOV](/t/aov) blends "how many items" with "how expensive they are", UPT isolates the first half: the average basket holds 2.3 items — that is a behavior, and behaviors can be worked on.

```text
AOV = ASP × UPT   (price effect × depth effect)
AOV rising while UPT flat  → you are selling pricier things, not more things
```

That split is the whole reason UPT exists as a separate line: the merchandising action differs completely depending on which factor moved. A beauty store lifting UPT with mini-sizes is doing cross-sell; one lifting ASP with premium serums is doing [assortment](/t/assortment-gap) upgrade. Same growth story, different teams and different inventory consequences.

The unit-count nuance analysts learn the hard way: count *order lines* or *physical units*? A 12-pack of screws is one SKU line but twelve units; "12-pack" bundles make UPT jump without anyone deepening their basket deliberately. Pick one, label it, and watch the date your bundle SKUs launched.

Where UPT earns its keep: [market-basket](/t/market-basket-analysis) initiatives — the add-on, the "frequently bought together" widget, the free-shipping threshold nudge all live or die on this number before they show up in revenue. Segment it by entry category and device; first-time buyers in a COD market add fewer items per basket than returning ones, and that mix alone moves UPT every week.

When not to chase it: single-unit categories (a fridge is a fridge) and gift-heavy seasons where every order is a one-item order by nature. And UPT says nothing about *profit* — depth at negative margin is a giveaway program; read it next to [ASP](/t/asp) and per-unit margin before celebrating bigger baskets.
