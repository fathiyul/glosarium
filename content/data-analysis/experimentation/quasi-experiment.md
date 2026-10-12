---
title: "Quasi-Experiment"
summary: "Measuring an effect without randomisation, using groups that were naturally separated."
core: [data-scientist]
levels: { data-analyst: senior , data-scientist: senior }
aliases: ["quasi experiment", "natural experiment", "non-randomised comparison"]
prereqs: ["causal-inference", "experiment-design", "difference-in-differences"]
related: ["causal-inference", "difference-in-differences", "randomized-controlled-trial", "confounding-variable", "experiment-design"]
---

A quasi-experiment estimates a causal effect when you cannot randomly assign who gets the treatment. The groups are separated by something other than your randomiser: geography, a calendar date, an eligibility cut-off, a policy, a competitor's outage. You did not design the split, so you **borrow it**.

## Common designs

- Difference-in-differences. Treated and untreated groups, before and after; the untreated group's change stands in for the treated group's counterfactual. Rests on parallel trends ([difference-in-differences](/t/difference-in-differences)).
- Synthetic control. Where there is no single clean comparison group, build a weighted combination of untreated units that reproduces the treated unit's pre-period history, then read the gap after the change.
- Regression discontinuity. Assignment comes from a cut-off on a running variable — a score, an age, a spend threshold. Compare units just above the cut-off with units just below, where the two sides are otherwise alike.
- Interrupted time series. One series with a level or slope change at a known moment, used when there is no comparison group at all.
- Matching on covariates. Pair treated units with untreated units that look similar on observed characteristics, then compare the pairs.

## What they buy and what they cost

The buy is an answer where a randomised test is impossible. You cannot randomise a price rise, a law, a brand campaign or a competitor's outage. The alternative to a quasi-experiment is usually not an experiment; it is an opinion.

The cost is that **the identifying argument is yours to make and to defend**. Randomisation delivers balance on unobserved confounders as a property of the design ([randomised controlled trial](/t/randomized-controlled-trial)); a quasi-experiment delivers whatever balance your design and your assumptions can support. Each design above rests on a specific assumption, and none of them can be checked from the post-period data alone.

## Doing it honestly

- Say which design you used and what its assumption is.
- Show the pre-period evidence that supports the assumption: do the two series track each other before the change, and do the two sides of the cut-off look alike?
- Look for the specific ways it could break: anticipation, differential shocks, contamination of the comparison group, units that can move between groups.
- Report the direction of the likely bias, not just the number. A single estimate with no discussion of its assumptions is the observational-data equivalent of a p-value quoted without a sample size.

The rest of the discipline is shared with [causal inference](/t/causal-inference) and with [experiment design](/t/experiment-design) in general, and the shared trap is a [confounding variable](/t/confounding-variable) that the design never addressed.
