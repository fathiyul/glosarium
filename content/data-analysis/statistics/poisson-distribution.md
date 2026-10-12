---
title: "Poisson Distribution"
summary: "Counting events that arrive randomly over time."
levels: { data-analyst: mid-level , data-scientist: mid-level }
---

The Poisson distribution counts how many events land in a fixed window when they arrive at a steady average rate: tickets per hour, errors per deploy, clicks per session. One parameter does all the work — the expected count λ — and the probabilities follow exp(−λ)·λᵏ/k!.

Two properties make it useful and dangerous at once. Mean and variance are both λ, so the spread is not a free knob: if you observe 900 tickets a day, day-to-day counts should bounce around with [standard deviation](/t/standard-deviation) √900 = 30. That gives analysts a clean noise model — counts that wander beyond a couple of those standard deviations are worth investigating, while the wiggles inside are just probability. (The count-versus-time view pairs with the [exponential distribution](/t/exponential-distribution), which times the gaps between arrivals.)

Data scientists build on it as the default likelihood for counts — and meet the same-default failure mode first: overdispersion. Real count data is usually more variable than Poisson allows because events cluster (one bad deploy causes ten tickets, one campaign day brings tenfold clicks). When the observed variance dwarfs λ, plain Poisson intervals are far too tight, and models that handle extra spread (quasi-Poisson, negative-binomial style) are the honest next step.

The second failure is violated independence of arrivals — the same clustering that breaks the variance is the signal, not noise, and treating clustered arrivals as Poisson mistakes real spikes for routine jitter, or routine bursts as incidents.

Reach for it when events genuinely arrive at a steady rate, one per moment, not in packs: it is a superb *null* for count noise. When the counts arrive in storms — outages, viral moments — the assumption is exactly what you should test before quoting its intervals.
