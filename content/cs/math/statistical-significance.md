---
title: "Statistical Significance"
summary: "Whether a result is real or plausibly chance."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["statistically significant", "significance level", "statistical significance test"]
prereqs: ["p-value", "hypothesis-testing"]
related: ["p-value", "effect-size", "hypothesis-testing", "statistical-power", "decision-rule", "confidence-interval"]
---

A result is called **statistically significant** when its [p-value](/t/p-value) falls below a
pre-agreed threshold — most often 0.05. It says the observed data would be unusual if the
[null hypothesis](/t/null-hypothesis) were true. That is the whole content of the claim.

Three things significance does not tell you.

It does not tell you the size of the effect. With enough rows, any non-zero difference becomes
significant, so compare the [effect size](/t/effect-size) against the smallest change that would
justify acting ([minimum detectable effect](/t/minimum-detectable-effect)).

It does not tell you the null is false when it is absent. A non-significant result means the data is
compatible with the null, not that the null is established. **Absence of evidence is not evidence of
absence**, and the gap is widest when the test had low
[power](/t/statistical-power).

It does not tell you the cause. Significance survives confounders, selection effects and a broken
[metric definition](/t/metric-definitions) completely intact — see
[correlation versus causation](/t/correlation-vs-causation) and
[confounding variables](/t/confounding-variable).

The threshold itself is a **convention rather than a law of nature**. Fields and teams settle on
different values, and a different value is a different trade-off between acting on nothing and
missing something real, not a different fact about the world. Many teams prefer to report the
p-value and the [confidence interval](/t/confidence-interval) and keep the decision separate, which
is usually easier to explain to a stakeholder than a binary verdict.

If you are running a test, decide the rule before you start, and make it a
[decision rule](/t/decision-rule) with three outcomes — ship, kill, inconclusive — rather than a
single number you will later reinterpret. The two common failure modes are both about looking early
and often: [peeking](/t/peeking-problem) and testing until you find a winner.
