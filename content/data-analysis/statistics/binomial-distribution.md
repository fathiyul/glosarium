---
title: "Binomial Distribution"
summary: "Counting successes in a fixed number of tries."
levels: { data-analyst: mid-level , data-scientist: mid-level }
---

The binomial distribution answers "how many successes out of n tries": n independent events, each with the same success probability p, and it gives the probability of seeing exactly k successes. Ten coin flips counting heads is the textbook picture; a hundred visitors on a checkout page is the practical one.

Its shape comes from two numbers: the mean is n×p and the variance is n×p×(1-p). That variance formula is the everyday gift — it says how much a rate should bounce by pure luck. Analysts use it directly: if a page normally converts at 2% and 1,000 visitors arrive today, conversions should sit within a couple of [standard deviations](/t/standard-deviation) of 20; "down to 12" may or may not be signal, and the binomial spread settles whether it is noise before anyone opens an incident.

Data scientists meet it as the engine under every test of proportions ([z-test](/t/z-test), and the counts inside [A/B testing](/t/ab-testing)), and as the parent of the [Poisson distribution](/t/poisson-distribution): let n grow, p shrink, n×p fixed, and the binomial turns into Poisson. As n grows, its shape approaches the [normal](/t/normal-distribution); the common rule of thumb is to keep both n×p and n×(1-p) around 5 or more before leaning on that approximation.

The classic mistake is assuming the setup when reality refuses: trials that are not independent (one viral hour drags all visitors together), a p that drifts across the day, or counting sessions while the same users behave alike. When successes cluster, the true variance exceeds n×p×(1-p), and your noise band is wrong in the dangerous direction — real anomalies hide inside it.

Before applying it, say the three assumptions out loud: fixed number of trials, stable probability, independence. If two of the three survive contact with your data, the distribution is doing real work.
