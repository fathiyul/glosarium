---
title: "Seller Churn"
summary: "When the supply side leaves the platform — the marketplace failure customers never see coming."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["seller attrition", "store churn"]
prereqs: []
related: ["churn-rate", "active-sellers", "gmv-per-seller", "seller-performance-score"]
---

Seller churn = active sellers who stop selling on the platform within a window. It is the supply-side twin of customer [churn](/t/churn-rate) and, in marketplaces, often the *leading* one: a store that dies takes its catalog, its ratings history and a slice of buyer retention with it — and unlike a customer, a departed seller was also a *co-worker* of the platform.

Definition first (this metric's Wikipedia page is a mess of windows): last transaction older than 60/90 days after an activity baseline; segment by tenure (a seller who tries, fails and quits in month two is *activation* churn, not retention churn), by GMV decile (a top-decile departure is a category event), and by *cause signal*: delisting everything (exit) vs zero orders (dormant — different problem, different rescue).

```text
seller churn by tenure, 90d:
  month 2-3     41%   → onboarding/first-sale failure (fix: activation)
  established   9%    → economics (fix: fees, traffic, competition)
  top-decile     2.1% ← rising from 1.3% YoY — investigate every account
```

That last line is the board-level one: when the top decile's exit rate *doubles* on a low base, the platform's largest sellers are computing the same arithmetic they've always controlled — where else their volume earns better. Causes worth diagnosing: fee/load changes ([take-rate](/t/take-rate) shifts hit margin-thin sellers first), algorithm shifts that quietly re-route demand to a different set of stores ([performance scores](/t/seller-performance-score) as the visible mechanism), and *success itself* — a seller who outgrows the platform's commission economics into their own storefront.

Analyst cautions: seller concentration changes what churn *means* (in a 500-seller category, losing 15 sellers is 3% of the count and 22% of the GMV — weight by volume or you'll mis-triage everything); and COD-market reality — some "churned" sellers still ship from social channels and simply stopped listing here; they're multi-homing, not lost (and your competitor knows it).

When not to chase zero: exit is *creative* on a marketplace — dormant supply crowds search and erodes buyer trust in "is this store alive"; healthy platforms accept high early-cohort churn while protecting the mid-tier.
