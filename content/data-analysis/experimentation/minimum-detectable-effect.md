---
title: "Minimum Detectable Effect"
summary: "The smallest change worth finding, which decides how much traffic the test needs."
levels: { data-analyst: senior }
aliases: ["mde", "minimum detectable effect", "smallest effect of interest"]
prereqs: ["statistical-power", "sample-size-calculation", "effect-size"]
related: ["statistical-power", "sample-size-calculation", "effect-size", "standard-error", "multivariate-testing"]
---

The minimum detectable effect (MDE) is the smallest true effect your test is designed to catch, holding your sample size, baseline rate, variance and desired power fixed. It is not the smallest effect that exists. It is the **smallest effect you would reliably notice**.

## What sets it

- Baseline rate and variance. For a proportion, a change of one percentage point is easier to see against a low baseline than a high one, because the variance of a proportion shrinks as the rate moves away from the middle. For a continuous metric, the raw variability of the underlying measure dominates.
- Power. Higher power means a smaller MDE for the same traffic ([statistical power](/t/statistical-power)).
- Traffic per arm. Splitting the same traffic across more variants raises the MDE for every one of them ([multivariate testing](/t/multivariate-testing)).
- Scaling. In the common two-arm cases, the required sample size grows roughly with the inverse square of the effect size, so halving the effect you want to detect costs roughly four times the data, other things equal.

## Choosing it

The MDE is **a business judgement wearing statistics**. The question is "what is the smallest effect that would change what we do", not "what effect do we expect". If a small relative lift would not justify the engineering cost and the added complexity, powering for it just buys an expensive "inconclusive", and a larger MDE with a shorter test may be the honest choice.

Equally, do not pick the MDE to fit the traffic you happen to have. An MDE larger than the effect you care about means a negative result tells you almost nothing: the effect could be real and smaller than your floor.

## How it goes wrong

- Set after the test. Computing the MDE from the observed effect size post hoc turns it into a description of the noise you measured rather than a property of the design ([decision rule](/t/decision-rule)).
- Confused with the expected effect. They are different numbers with different jobs: the expected effect is a guess about reality, the MDE is a property of your design.
- Ignored for guardrails and segments. Your primary metric may be powered while a guardrail or a segment cut is not, so those analyses are under-powered by construction ([guardrail metrics](/t/guardrail-metrics)).

Report the MDE with the test plan, next to the sample size and the duration it therefore requires ([sample size calculation](/t/sample-size-calculation), [effect size](/t/effect-size)). If the traffic needed is not available, that is a finding: the design has to change, not the arithmetic.
