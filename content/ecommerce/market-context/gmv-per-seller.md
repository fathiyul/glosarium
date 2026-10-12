---
title: "GMV per Seller"
summary: "Average volume per selling store — the concentration test behind marketplace growth."
levels: { data-analyst: mid-level }
aliases: ["average seller GMV", "seller productivity"]
prereqs: ["active-sellers"]
related: ["active-sellers", "take-rate", "market-share", "seller-performance-score"]
---

GMV per active seller = total category/platform GMV ÷ [active sellers](/t/active-sellers). On its own it is an average that hides a power law — marketplace supply is *always* concentrated; the metric's job is tracking the *shape* of that concentration and what it means for both sides of the platform.

```text
YoY: GMV +40% · active sellers +2% · GMV/seller +37%
  top-1% share of GMV: 31% → 44%
  → growth is a big-store story; the long tail is flat or dying
```

Reads that matter, by stakeholder: for **platform health**, rising GMV/seller alongside flat active-seller counts means new supply is not activating or old supply is exiting ([seller churn](/t/seller-churn) is the companion) — the network's *choice*, the buyer-facing promise, is stagnating even as volume grows. For **seller economics**, average GMV is the ceiling of the "make a living selling here" story: when the mean outruns the *median* by decades, the median seller — the recruitment pitch's hero — is being served by an algorithm that only rewards the top decile, and the platform's *future* supply growth is priced in that gap.

The honest dashboard reports the distribution, not the ratio: deciles of seller GMV, top-100 concentration index, and the count of sellers *above a livelihood threshold* (the "middle class" of the marketplace). Those three tell you whether concentration is efficiency (mature sellers earning scale) or eviction (growth by reallocating demand from many to few).

Analyst notes: net of COD refusals and cancellations (gross-order averages overstate what sellers keep), and segment by category (a platform-wide average blends a 100k-seller fashion tail and a 2k-seller automotive market into mush). And beware the definitional trap: "per *active* seller" vs "per *registered* seller" differ ~10×; whichever you pick, never switch without re-baselining the trend, or a definition edit becomes a "growth story."

When the metric is secondary: take-rate strategy ([platform revenue per seller](/t/take-rate) is the P&L number — GMV concentration matters to it only through what sellers can *bear*).
