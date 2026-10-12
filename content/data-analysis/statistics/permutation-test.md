---
title: "Permutation Test"
summary: "Testing by shuffling labels and re-measuring."
levels: { data-analyst: senior , data-scientist: mid-level }
---

A permutation test estimates significance by *building the null distribution from your own data*. Under the null hypothesis that group labels carry no information, shuffling the labels should not change the statistic you computed. So: compute the observed difference, randomly reassign the labels thousands of times, recompute the statistic each time, and the p-value is how often the shuffled version matches or beats the real one.

```python
import random

def perm_test_p(a, b, B=10000, seed=0):
    rng = random.Random(seed)
    obs = abs(sum(a)/len(a) - sum(b)/len(b))
    pool = list(a) + list(b)
    na = len(a)
    hits = 1                       # count the observed arrangement too
    for _ in range(B):
        rng.shuffle(pool)
        d = abs(sum(pool[:na])/na - sum(pool[na:])/(len(pool)-na))
        if d >= obs:
            hits += 1
    return hits / (B + 1)

print("e.g. p =", perm_test_p([3, 5, 4, 6], [8, 9, 10, 11]))
```

Its strength is that the test makes almost no shape assumptions — no [normal distribution](/t/normal-distribution), no equal variances — because the reference distribution comes from the data itself. Any statistic works: difference of medians, a correlation, a custom score. With enough permutations it is exact, and small samples where formulas misbehave are precisely where it shines.

Data scientists should mind the two real costs. Computation scales with B times the statistic's cost — fine for medians, painful for fits inside the loop. And the assumption underneath is exchangeability: under the null, a labeled observation could equally have worn the other label. That breaks when the groups differ in ways beyond the effect being tested — paired or blocked designs need permutations within the blocks, not across everything.

For an analyst, the honest framing is that a permutation test is the t-test's no-assumptions cousin for [hypothesis testing](/t/hypothesis-testing) on small, odd or custom quantities. Report B, the seed, and the statistic you shuffled, so the run is reproducible — the p-value is Monte Carlo and carries its own [uncertainty](/t/confidence-interval) at small B.
