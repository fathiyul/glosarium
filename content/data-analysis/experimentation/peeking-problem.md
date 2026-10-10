---
title: "Peeking"
summary: "Checking a running test and stopping the moment it looks significant."
levels: { data-analyst: mid-level }
aliases: ["peeking problem", "peeking", "optional stopping"]
prereqs: ["ab-testing", "hypothesis-testing", "p-value"]
related: ["ab-testing", "sequential-testing", "hypothesis-testing", "decision-rule", "test-duration"]
---

Peeking is looking at a running experiment's results repeatedly and stopping the moment the primary metric looks significant. It feels like diligence. It is the most common way a test's stated error guarantee **quietly stops being true**.

## What actually breaks

A fixed-horizon test promises something narrow: if you look exactly once, at the time you planned, and nothing is happening, you will get a "significant" result about as often as your threshold says. That is the whole guarantee.

Check daily and stop at the first green day and you have changed the procedure. You are now taking the best of many correlated looks, and the chance that at least one of them crosses the line is higher than the nominal level — often much higher, and it grows with the number of looks. So the false-positive rate you are actually running is **not the one on the slide**.

```text
one look at a pre-planned time:   false-positive risk ≈ threshold
many looks, stop at the first crossing:  false-positive risk > threshold,
                                        and it grows with each additional look
```

What survives peeking is the point estimate: the measured difference is still the measured difference. What you have lost is the guarantee that "significant" means what you think it means, and because you stopped at the most favourable moment, the effect you recorded will tend to be larger than the true one ([regression to the mean](/t/regression-to-the-mean)).

## The fixes

- Commit and look once. Decide the metric, the duration and the threshold before launch, and read the result at the end ([decision rule](/t/decision-rule), [hypothesis testing](/t/hypothesis-testing)). It is the cheapest fix and the one most often skipped.
- Use a rule built for repeated looks. Sequential methods set a boundary that keeps the error guarantee while you look repeatedly. They are not free, but they are honest about what they cost ([sequential testing](/t/sequential-testing)).
- Separate watching from deciding. Monitoring a test for breakage — an error rate spiking, a broken variant, a collapsing guardrail — is good practice, and it is not the same thing as repeatedly significance-testing for a shipping decision. Watch for harm continuously; hold the shipping call to the pre-agreed rule.

The trade-off with a fixed end date is real: tests run past their useful life, and a result you cannot act on is a cost. Adjust the plan before the test rather than by re-reading the same data until it says yes.
