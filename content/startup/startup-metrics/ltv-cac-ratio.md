---
title: "LTV:CAC Ratio"
summary: "Customer lifetime value compared with acquisition cost, a test of whether growth pays off."
levels: { tech-entrepreneur: growth }
core: [tech-entrepreneur]
---

LTV:CAC compares the lifetime value of a customer against what it cost to acquire them — the ratio that answers "is buying customers a good investment?" A long-standing rule of thumb is 3:1 or better; lower means you are overpaying for growth, higher often means you are underinvesting in it.

The naive LTV formula is gross-margin revenue per month divided by monthly [churn](/t/churn-rate): $80/month profit at 4% monthly churn gives roughly 25 months of life, about $2,000 LTV. Against a $700 blended CAC that is 2.9:1 — passable, thin. The sophistication is in what you exclude: never book margin you don't have ([unit economics](/t/unit-economics)), cap lifetimes to observed cohorts, and discount future profit if you are comparing against cash spent today.

The classic mistake is inflating LTV through low-churn assumptions. At 1% monthly churn the formula "proves" a 100-month lifetime — for a product nobody has kept using that long. When churn is unmeasured, use a bounded horizon ("12-month value, given we have data") instead of pretending to know the tail.

The second classic mistake is the mirror image: chasing the ratio upward by starving sales. A 10:1 with flat growth usually means every cheap channel is tapped and you are leaving market share on the table; a 2.5:1 in a land-grab with fast payback can be the smarter trade. The [CAC payback period](/t/cac-payback-period) is the companion metric precisely because ratio and cash timing can point different ways.

When not to use it: pre-PMF, LTV is fiction (behaviors aren't stable), and the ratio becomes an excuse machine in both directions — "we'll be profitable once LTV holds" and "we can afford anything." Use it from PMF onward as a throttle on acquisition spending, with churn and payback in the same view. And compare like-for-like segments; blended ratios hide the mix shifts that usually precede trouble.
