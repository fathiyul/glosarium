---
title: "Bootstrap Resampling"
summary: "Estimating uncertainty by resampling your own data."
levels: { data-analyst: mid-level , data-scientist: mid-level }
---

Bootstrap resampling estimates the uncertainty of a statistic by replaying your own dataset. Draw n observations with replacement from the original n rows, recompute the statistic, repeat — often thousands of times. The spread of those recomputed values stands in for the spread the statistic would show across fresh samples, and the middle 95% forms a [confidence interval](/t/confidence-interval).

It earns its place because it needs almost no closed form. The median, a ratio of two sums, a 99th-percentile latency — statistics with no convenient formula still have a computable sampling spread. That is where analysts use it: "how much does this revenue-per-account metric wobble?" becomes a loop instead of a derivation.

```python
import random

def bootstrap_median_ci(data, B=2000, seed=0):
    rng = random.Random(seed)
    n = len(data)
    stats = []
    for _ in range(B):
        resample = sorted(rng.choices(data, k=n))
        mid = n // 2
        med = resample[mid] if n % 2 else (resample[mid-1] + resample[mid]) / 2
        stats.append(med)
    stats.sort()
    return stats[int(0.025 * B)], stats[int(0.975 * B)]
```

Data scientists should know the edges, though. The bootstrap trusts the empirical distribution: it cannot reveal the true tail beyond what you sampled, so extreme percentiles and rare-event estimates come out overconfident. Small samples, heavy [long-tail](/t/long-tail-distribution) data, and clustered or dependent rows (many observations per customer) all degrade the intervals — naive resampling ignores that structure. And it is computational: thousands of redraws cost time a formula would not.

It pairs naturally with the [permutation test](/t/permutation-test), the other "ask the data repeatedly" method: bootstrap quantifies an estimate's spread, permutation quantifies how strange an observed gap looks under the [null hypothesis](/t/null-hypothesis). Used together, they cover most everyday uncertainty questions without a textbook of formulas.
