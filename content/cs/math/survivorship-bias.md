---
title: "Survivorship Bias"
summary: "Conclusions drawn only from the winners that survived."
levels: { data-analyst: mid-level }
aliases: ["survivorship bias", "survivor bias", "survival bias", "selection effect"]
prereqs: ["sampling-bias", "descriptive-statistics"]
related: ["sampling-bias", "retention-analysis", "cohort-analysis", "metric-definitions", "segmentation", "correlation-vs-causation"]
---

Survivorship bias is what you get when the data you analyze has already been through a selection process and you cannot see the ones that did not make it. The survivors are not a sample of the population; they are the population minus everyone filtered out — usually the part you most wanted to learn about.

Concrete cases:

- Ask the customers you still have why they stayed and you learn nothing about why the others left. **The churned are not in the table**, and the ones you are missing are precisely the informative ones ([retention analysis](/t/retention-analysis)).
- Study the products that made it to market and you will find they all share diligence, focus and good execution — and never notice the equally diligent products that failed. **The trait only looks predictive because the failures are absent from the data.**
- Fund performance databases drop the funds that closed. **The average surviving fund beats the average fund that ever existed**, because the losers are not in the file to be counted.

The structure of the error is always the same: whether a row survives is correlated with the outcome you are studying. So the survivors over-represent success, and any average taken over them is biased upward.

What to do:

- Ask what had to be true for a row to appear in this dataset, and write the answer down. "Current customers as of today" is a filter, and so is "products that shipped".
- Look for the excluded rows. Churned customers, cancelled subscriptions, closed funds, failed launches and deleted records often exist in the same table under a status column — the exclusion was in your query, not in the data.
- Report the base: how many were considered, how many survived, how many were excluded and why ([metric definitions](/t/metric-definitions)).
- Compare cohorts of the same age rather than survivors against starters ([cohort analysis](/t/cohort-analysis)).
- Where you cannot recover the missing rows, say so in the conclusion instead of generalising ([sampling bias](/t/sampling-bias)).

The tell is a suspiciously good average. If your sample looks uniformly excellent, check what it took to get into the sample.
