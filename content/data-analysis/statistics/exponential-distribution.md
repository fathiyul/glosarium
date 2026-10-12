---
title: "Exponential Distribution"
summary: "Waiting times when events arrive randomly."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["exponential", "negative exponential distribution"]
prereqs: ["distribution-shapes", "expected-value"]
related: ["poisson-distribution", "lognormal-distribution", "normal-distribution", "binomial-distribution"]
---

The exponential distribution models the **waiting time between events that arrive randomly** at a steady average rate. One number sets its whole shape: the rate. High rate means short typical waits and a fast-dropping tail; low rate means the opposite.

Its signature property is **memorylessness**: how long you have already waited tells you nothing about how much longer remains. If support tickets arrive at about 6 per hour, the mean wait is 10 minutes, and the chance the next ticket takes more than 20 minutes is roughly 13% (e.g. exp(−2) ≈ 0.135) — whether or not you have already waited 10 minutes with nothing arriving. Flip it around: if counts per fixed window are [Poisson](/t/poisson-distribution), the gaps between arrivals are exponential. The two distributions are views of the same random-arrival process.

The classic mistake is reaching for it whenever waits are involved. It assumes a constant rate and independent arrivals, so it fails for things that age (machine parts more likely to fail as they wear), things with schedules (buses on a timetable), or traffic that clusters (incidents during an outage storm). Plot your observed gaps first — against [its shape](/t/distribution-shapes) — before trusting any calculation.

## When not to use it

As a data analyst, use it for back-of-the-envelope service questions — queue waits, time between signups — but switch models the moment the rate visibly varies by hour or day. As a data scientist, treat it as the baseline inter-arrival model: fit it, then check whether the data wants something richer such as a [lognormal](/t/lognormal-distribution) or a mixture. Skip it wherever the rate drifts, events trigger each other, or history predicts the next gap.
