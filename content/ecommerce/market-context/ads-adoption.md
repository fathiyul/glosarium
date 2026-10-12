---
title: "Ads Adoption (Seller Advertising)"
summary: "Share of sellers who buy platform ads — the marketplace's monetization funnel, told from the sellers' side."
levels: { data-analyst: mid-level }
aliases: ["adoption rate (ads)", "advertiser penetration", "monetization rate"]
prereqs: []
related: ["active-sellers", "take-rate", "gmv-per-seller", "roas"]
---

Ads adoption = sellers with ≥1 paid campaign ÷ [active sellers](/t/active-sellers), per window; the companion metric is *ad revenue share of seller GMV* — how much of the ecosystem's sales gets re-spent as advertising. Together they are the platform's monetization flywheel: ads are the second take-rate, and adoption is its funnel.

```text
adoption 18% · top-decile sellers: 71% · mid-tier: 9% · tail: 1.4%
ad-spend / GMV among advertisers: 6.2% average
→ growth ceiling = the mid-tier's ROAS evidence, not the tail's
```

The segment reading is the whole strategy conversation: top sellers *must* advertise (they can compute the marginal [ROAS](/t/roas) because they have conversion data, inventory depth and bidding budget); the tail mostly *can't* afford it; and the entire monetization upside lives in the 9%-tier — the question "why isn't the mid-tier adopting?" is where the product answers are (no measurement to trust, campaign setup too complex, minimum budgets, or the honest answer: their unit economics don't survive a commission *plus* an ad load).

The platform-health tension analytics must surface, because it's the adoption story's dark half: when organic rankings reward paid placement, non-advertisers' visibility erodes and adoption becomes a tax with a login — the *coerced* adoption spike looks identical to healthy uptake in the adoption % line, and the difference shows only in two places: seller [churn](/t/seller-churn) in the exposed segments, and GMV concentration rising as ad budgets consolidate into stores whose economics tolerate it ([GMV per seller](/t/gmv-per-seller) tells that story).

For analysts on the *ad product* itself: adoption is the breadth metric — the depth metrics (budget growth, repeat-campaign rate, ROAS distribution per segment) are what predict whether adoption *this* quarter was earned or bought with a first-campaign credit that dies as soon as sellers see the second invoice.

When the number is vanity: counting a Rp 50k one-day test campaign as an adopter — define adoption by sustained spend (e.g., campaigns in ≥N active weeks) or the funnel lies politely.
