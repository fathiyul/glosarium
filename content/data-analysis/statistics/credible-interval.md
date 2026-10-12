---
title: "Credible Interval"
summary: "The Bayesian twin of the confidence interval."
levels: { data-analyst: senior , data-scientist: mid-level }
aliases: ["credible intervals", "Bayesian credible interval", "posterior interval"]
prereqs: ["bayes-theorem", "confidence-interval", "conditional-probability"]
related: ["confidence-interval", "bayes-theorem", "margin-of-error", "bootstrap-resampling"]
---

A **credible interval** is a range that holds an unknown quantity with a stated probability, computed from your data plus a prior belief. A 95% credible interval of 4–6% conversion means: given the model and the prior, there is a 95% chance the true rate sits inside 4–6%.

That direct reading is the whole point — and the classic mistake is to read a [confidence interval](/t/confidence-interval) the same way. A 95% confidence interval is a procedure that traps the truth 95% of the time over repeats; it says nothing about the chance for this particular interval. The credible interval earns its reading from [Bayes' theorem](/t/bayes-theorem): prior plus data becomes a posterior distribution, and the interval is just a slice of that posterior, typically the middle 95%.

A short example: you test a new checkout with a weak prior centred on the historical 5% conversion rate. The posterior concentrates between 4.1% and 5.3%, so you report that as the 95% credible interval and can tell the team there is a 95% chance the true rate is inside it. You can also answer questions a confidence interval cannot touch, such as "what is the chance the new version beats the old one by at least a point?" — count the share of posterior samples where that holds.

## When not to use it

The probability comes with strings attached: change the prior and the interval moves. With plenty of data the prior barely matters, but with little data it dominates, so always report the prior next to the interval. As a data analyst, use credible intervals when the team wants plain-probability statements from a test readout — but check whether stakeholders expect frequentist guarantees first. As a data scientist fitting Bayesian models, prefer them when you can defend a prior and want full posterior summaries; skip them when the prior is arbitrary and readers will mistake its influence for evidence. For resampling-based ranges without priors see [bootstrap resampling](/t/bootstrap-resampling); for the frequentist counterpart see [margin of error](/t/margin-of-error).
