---
title: "Experiment Design"
summary: "Setting up a test so its result is trustworthy."
levels: { data-analyst: senior , data-scientist: senior }
core: [data-analyst, data-scientist]
aliases: ["experiment design", "experimental design", "study design"]
prereqs: ["ab-testing", "causal-inference", "randomized-controlled-trial"]
related: ["ab-testing", "randomized-controlled-trial", "causal-inference", "quasi-experiment", "difference-in-differences", "statistical-power"]
---

Experiment design is the set of decisions you make before the data that determine whether the result can be believed: what is compared, what is measured, how much data, for how long, and what would make you doubt it. Analysis happens afterwards. Design is **where the trustworthiness is decided**.

## Start from the comparison you want

The question behind every experiment is a counterfactual: what would have happened otherwise. Every design choice is an attempt to make that comparison credible, and most failures are failures of comparison rather than of arithmetic.

Randomisation is the strongest tool, because it balances known and unknown confounders as a property of the design ([randomised controlled trial](/t/randomized-controlled-trial)) — though it balances them in expectation, so the particular split you got still deserves a look. When you cannot randomise, the comparison has to be **argued instead of arranged** ([quasi-experiment](/t/quasi-experiment), [difference-in-differences](/t/difference-in-differences), [causal inference](/t/causal-inference)).

## The decisions, in rough order

| Decision | Why it comes early |
|---|---|
| Unit of randomisation | Sets the claim and the effective sample size ([randomisation unit](/t/randomization-unit)) |
| Control experience | Determines what the number is relative to |
| Primary metric, defined exactly | Stops the metric being chosen after the result ([metric definitions](/t/metric-definitions)) |
| Smallest effect worth finding | Sets the required traffic ([minimum detectable effect](/t/minimum-detectable-effect)) |
| Power and duration | The statistical and calendar clocks ([statistical power](/t/statistical-power)) |
| Guardrails and the decision rule | What "worse" means, and what result ships ([guardrail metrics](/t/guardrail-metrics)) |
| Integrity checks | How you will know the machinery worked ([sample ratio mismatch](/t/sample-ratio-mismatch)) |

## Threats worth naming in the design

Contamination, where control users see the treatment. Differential data loss between arms. Assignment that is not sticky. Traffic that is not comparable. Concurrent changes landing mid-test. Metrics that move for reasons unrelated to the treatment. A confounder the design never addressed, a seasonal pattern that lands on one arm, and regression to the mean after an unusually good or bad starting period.

Naming them in advance is cheaper than explaining them afterwards.

## The trade-off

A bigger, longer, cleaner design costs traffic, calendar time and the complexity of holding a change back from some users. But a design that cannot answer the question is worse than no experiment, because it produces a number that will be quoted. If the traffic is not there to detect the effect you care about, say so before the test rather than after it.
