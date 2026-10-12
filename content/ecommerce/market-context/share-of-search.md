---
title: "Share of Search"
summary: "Your brand's slice of category search volume — visibility measured where demand actually forms."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["SoS", "brand search share", "search visibility"]
prereqs: []
related: ["market-share", "organic-ctr", "seo", "market-positioning"]
---

Share of search = searches for your brand ÷ searches for all brands in your category, per period. It is a *demand-side* visibility metric: people don't search categories, they search brands they already have in mind — SoS measures how many of those minds you occupy, before any ad auction and any ranking algorithm.

Sources, honestly ranked for Indonesian e-commerce: Google Trends for brand-query trends (free, relative-index only — compute SoS as shares of a query set, never as absolute volume), marketplace search data where the platform exposes category search terms (often only via seller tools and ad planners — the *rank* of your brand terms vs competitors is the usable signal), and social listening volume as a weak cousin.

```text
SoS trend, "hijab sport" cluster (indexed):
  yours 100→148 · competitor A 100→104 · category total +31%
  = you grew attention faster than the category —
    and note: category GMV +9% (share vs interest = demand not yet buying)
```

That last read is the metric's superpower: SoS is a **leading indicator of [market share](/t/market-share)** — interest forms before purchases — the gap between rising search share and flat sales share is *exactly* the conversion or [assortment-gap](/t/assortment-gap) brief, and when SoS falls while GMV holds, you're coasting on existing customers until someone else spends on the future.

Cautions: brand-query normalization (typos, "sepatu <brand>" genericized searches, and store-name collisions inflate or leak share — curate the query set per quarter like a metric, not a list), campaign pulses (SoS spikes during a KOL push; trend on rolling windows), and paid contamination (brand-search ads lift *clicks*, not *searches* — SoS is immune to your own bidding, which is precisely why it's honest).

When not to bother: private-label resellers competing on price where nobody searches your name (there, category-rank share and [price index](/t/price-index) carry the visibility story instead).
