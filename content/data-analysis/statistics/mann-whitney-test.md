---
title: "Mann-Whitney U Test"
summary: "Comparing two groups without assuming bell curves."
levels: { data-analyst: senior , data-scientist: mid-level }
aliases: ["Mann-Whitney U", "Wilcoxon rank-sum test", "rank-sum test"]
prereqs: ["hypothesis-testing", "t-test"]
related: ["t-test", "non-parametric-test", "permutation-test", "effect-size"]
---

The Mann-Whitney U test compares two independent groups using **ranks, not raw values**: pool every observation, rank them smallest to largest, then ask whether one group's ranks sit systematically higher. Because only order matters, a few enormous values cannot hijack the result the way they hijack a [t test](/t/t-test) on means.

Reach for it when the data is skewed, heavy-tailed or ordinal — revenue per user, satisfaction scores, task completion times. A short example: control has 400 checkouts averaging $60 with a handful of $5,000 bulk orders, variant has 400 averaging $52 with none. A t-test on means may shrug (the bulk orders inflate the variance); Mann-Whitney detects that typical variant orders rank consistently below typical control orders.

The classic mistake is calling it "a test of medians". It tests whether values from one group tend to exceed values from the other (stochastic dominance) — one of the standard [rank-based tests](/t/non-parametric-test) — and that equals a median shift only if you assume both groups share the same shape and spread. Report that assumption when you claim medians differ. It also assumes independent observations: paired before/after data needs a paired test instead.

## When not to use it

As a data analyst, use it as your default two-group comparison for skewed KPIs, and always show the group medians and their gap next to the p-value — the test gives no magnitude on its own (pair it with an [effect size](/t/effect-size)). As a data scientist, prefer the t-test when the data is plausibly normal (it has more power there) or a [shuffling-based alternative](/t/permutation-test) when you want fewer assumptions with a direct difference estimate. Never run both tests and report the friendlier one.
