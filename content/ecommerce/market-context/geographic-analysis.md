---
title: "Geographic Demand Analysis"
summary: "Where your customers and costs actually are — by city, province and logistics reality."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["geo analysis", "regional demand mapping", "city-tier analysis"]
prereqs: []
related: ["market-share", "otd-rate", "cod-rejection-rate", "regional-pricing"]
---

Geographic analysis maps orders, revenue and — the e-commerce twist — *cost-to-serve* by location: province, city, city-tier, and finally by courier lane. An archipelago market makes this a first-class metric family, not a pretty map: economics per parcel to Sorong and to South Jakarta are a different business wearing the same storefront.

```text
demand vs cost-to-serve, per region:
  Java urban     71% orders · 2-day OTD 96% · refusal 3%
  outer islands  18% orders · 2-day OTD 61% · refusal 11% · freight 2.4×
  → the growth plan and the markdown plan live in this table
```

The two lenses, joined: **demand** (orders per capita, [penetration](/t/customer-segments) vs the online-population base, growth by region) and **fulfillment reality** ([OTD](/t/otd-rate), [COD rejection](/t/cod-rejection-rate), freight cost per region). Growth reading demand alone over-promises the archipelago; pricing and [shipping subsidy](/t/shipping-subsidy-ratio) set nationally, felt regionally.

Decisions this table actually makes: warehouse and hub placement (a Medan forward-stock position converts 6-day promises into 2 — sized against inventory duplication and [DOI](/t/days-of-inventory)), delivery promise per region (the same page can promise honestly only regionally), ad targeting geography (why [ROAS](/t/roas) from outer-island campaigns is a [unit-economics](/t/unit-economics) question with a refund answer), and assortment (regional category mix is real demand structure — the hijab-to-sneaker ratio is not uniform).

Analyst notes: always geocode to *delivery* address, not account registration city (migrants buy for home provinces — the demand and the wallet live in different regions); use consistent boundaries when a platform's region labels change mid-year; and treat city-tier as the segmentation that predicts payment-mix and COD behavior better than province does in Indonesian data.

When it's one number, not a map: digital goods and platform-wide campaigns — the geography is then a *billing* address for tax analysis ([cross-border digital tax](/t/cross-border-digital-tax)), nothing more.
