---
title: "Sample Size Calculation"
summary: "How much data you need before starting a test so its result is worth reading."
levels: { data-analyst: senior }
aliases: ["sample size", "sample size calculation", "power analysis"]
prereqs: ["statistical-power", "effect-size", "standard-error"]
related: ["statistical-power", "minimum-detectable-effect", "effect-size", "test-duration", "confidence-interval", "standard-error"]
---

A **sample size calculation** works backwards from the effect you need to be able to detect, to the
number of observations required to detect it. Doing it before a test rather than after is what makes
the result readable: an under-sized test mostly returns "inconclusive", and you pay the cost of
running it anyway.

Every input is something you name, not something you discover:

| Input | Where it comes from |
|---|---|
| Effect size you must detect | The smallest change worth acting on — see [minimum detectable effect](/t/minimum-detectable-effect) |
| Baseline level or spread | The metric's typical value and variability, from history |
| Significance threshold | A convention your team agreed ([statistical significance](/t/statistical-significance)) |
| Target power | Usually stated as "a reasonable chance of detecting that effect" ([power](/t/statistical-power)) |
| Allocation | How the sample splits between groups, if not evenly |

The familiar shape for a comparison of two means:

```text
n per group ≈ 2 × ( z(1 − α/2) + z(1 − β) )² × σ² / δ²
```

with δ the difference you must detect and σ the standard deviation of the metric. Comparing two
proportions substitutes sqrt(p(1−p)) for σ, and the pooled proportion usually gives the conservative
answer.

Three things the formula hides:

- **The sample size scales with the square of the effect.** Detecting half the difference takes
  roughly four times the data, not twice. This is the single most common surprise, and it is the
  reason to set the minimum detectable effect deliberately rather than optimistically.
- σ is usually an assumption. Take it from a comparable historical window, name which one, and note
  that a wrong σ wrongly sizes the test.
- A minimum detectable effect is **a choice, not a measurement**. Setting it after seeing the data
  makes the whole calculation decorative.

Suppose, as an illustration only, that you are comparing two groups' mean order value, the historical
standard deviation is 20, and you decide you must detect a difference of 4. The formula gives
something in the region of a few hundred observations per group. Change the 4 to a 2 and the number
roughly quadruples.

If the number you need is larger than the traffic you have, the honest options are a
[longer test](/t/test-duration), a less noisy metric, or admitting that this design cannot answer the
question — not a smaller test and a hopeful report.
