---
title: "Randomised Controlled Trial"
summary: "Randomly splitting subjects to compare an outcome, the design every A/B test comes from."
levels: { data-analyst: mid-level }
aliases: ["rct", "randomized controlled trial", "randomised experiment"]
prereqs: ["ab-testing", "sampling-methods", "hypothesis-testing"]
related: ["ab-testing", "quasi-experiment", "causal-inference", "experiment-design", "confounding-variable"]
---

A randomised controlled trial splits subjects into groups at random, gives one group the treatment and the others nothing or the current experience, then compares a pre-specified outcome. Random assignment is the load-bearing part: it is what lets you attribute the difference to the treatment rather than to how the groups differed to begin with.

An A/B test is a randomised controlled trial on a website ([ab testing](/t/ab-testing)), and the same design underlies clinical trials and most of experimental science.

## What randomisation does and does not do

It makes the **groups comparable in expectation**. Over many repetitions of the same random assignment, the confounders you thought of and the ones you did not both balance out ([confounding variable](/t/confounding-variable)). That is a statement about the procedure, not about the run you did: with a finite sample, the groups you actually ended up with can still differ by chance.

Two habits follow. Check the assignment before reading the metric — are the arm sizes and the obvious user attributes roughly what the design promised? And still run a significance test, because "they were randomised" does not mean "they came out identical".

## The control has to be real

The comparison group must be **a genuine alternative experience**, measured over the same period. Comparing treated users against last month compares them against a different traffic mix, a different season and a different product ([seasonality](/t/seasonality), [quasi-experiment](/t/quasi-experiment)).

The other requirements are unglamorous, and usually where it fails:

- Assignment is sticky, so a user stays in their arm, or the arms blur.
- Exposure is logged, so you can tell who actually saw what.
- The primary metric and its exact definition are fixed before launch ([metric definitions](/t/metric-definitions)).
- The sample and the duration are decided in advance, not once the chart looks good.
- Internal traffic, bots and test accounts are handled the same way in both arms.

## The trade-off

Randomisation buys credibility at the cost of traffic, time, and the awkwardness of withholding a change from some users. When you cannot randomise — a price change, a policy, a brand campaign, a competitor's outage — you fall back on designs without it, and accept that the comparison argument is now yours to defend ([causal inference](/t/causal-inference)).
