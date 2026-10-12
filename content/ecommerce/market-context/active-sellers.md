---
title: "Active Sellers"
summary: "How many stores actually transact — the marketplace's supply-side heartbeat, and its vanity metric."
levels: { data-analyst: mid-level }
aliases: ["selling sellers", "transacting suppliers"]
prereqs: []
related: ["gmv-per-seller", "seller-churn", "take-rate", "seller-performance-score"]
---

Active sellers = stores with ≥1 *completed* transaction in a window (state the window and the definition: registered sellers, listed sellers, sellers with orders, or sellers with *delivered-and-paid* orders — those four differ by an order of magnitude, and marketplaces quote whichever flatters the slide).

```text
seller funnel, monthly:
  registered        480k
  listed (≥1 SKU)   210k
  received orders    61k
  delivered+paid     54k  ← the honest "active"
```

That funnel is the metric's whole value: the gap between "listed" and "transacted" is the supply-side [activation problem](/t/aha-moment), and the gap between orders and *paid-delivered* is COD refusals and cancellations counting the same seller twice. Growth teams that celebrate seller counts while the last two rows stall are marketing a bazaar that's quietly empty.

Why it matters commercially: buyer experience runs on *effective* supply — choice, price competition and delivery coverage all come from sellers who actually ship. Demand-side metrics (orders, GMV) can grow while active sellers shrink — concentration; when [GMV per seller](/t/gmv-per-seller) climbs *and* the seller count falls, you are becoming a platform of big stores with a long tail quietly evicted (check whether that's algorithm design or fee structure).

The segment cuts that make it useful: new-seller activation (first-sale rate within 30/60 days of listing — the growth metric; registered-only counts are noise), *category* active sellers (the "does this platform have depth in X" question buyers vote on daily), and region (a marketplace with 40k sellers and no sellers shipping from Kalimantan sells Kalimantan-shaped air).

When the metric misleads: counting sub-accounts as sellers (one operator, twelve storefronts — the promo-abuse identity clustering applies to supply-side counts too), and seasonal religious demand sellers (a 10% active-seller spike each Ramadan that evaporates in Shawwal is a calendar, not a network effect).
