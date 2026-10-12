---
title: "Price Index vs Competitors"
summary: "Your price relative to the market's — the one dashboard line that translates 'is this promo worth it?' into context."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["competitive price index", "price positioning", "PCI"]
prereqs: ["asp"]
related: ["price-elasticity", "discount-depth", "assortment-gap", "web-scraping"]
---

Price index = your price ÷ market reference price (typically the median or buy-box price across comparable listings), per SKU, over time. An index of 0.97 says you are 3% under market; 1.10 says you carry a premium — and *why* you carry it is the strategy question the number exists to force.

```text
SKU-100 index trend: 1.02 → 1.08 → 1.14
conversion 3.1% → 2.4% → 1.6%
the shelf is telling you the premium died; P&L hasn't noticed yet
```

The metric's whole job is **contextualizing elasticity**. [Price elasticity](/t/price-elasticity) measured within *your* store answers "will my customers tolerate this price?"; the index answers "will they tolerate it *when a tab away* there is a cheaper one" — which in a marketplace-saturated category is the more honest question. Elasticity in a market where you sit at index 0.95 and elasticity at 1.15 are different businesses; measure them separately, or your pricing model is averaging two populations that don't exist together.

How it is built: matched-SKU scraping of competitors or marketplace price feeds (accuracy depends entirely on *matching* — same condition, same seller rating, same shipping inclusions; a "price" that excludes shipping is not a price), aggregated to a reference (median across the credible set, not the minimum — the minimum is always a listing nobody fulfills).

The failure modes analysts should own: **anchor drift** (competitors' "normal prices" are themselves fiction — everyone anchors on everyone's sale price), **mix blindness** (a flat store-level index hides SKU-level whipsaws; segment by category), and **promo asymmetry** (during double-dates the *market* discounts faster than you; index says you "got cheaper" while you actually lost share — watch absolute price position alongside).

Founders: the index also sizes your *margin for service* — at 0.95 with identical listings you're one courier-delay review away from invisible; at 1.10 the premium must be justified by something the listing can't be (speed, warranty, bundle, brand), and every campaign season tests whether.
