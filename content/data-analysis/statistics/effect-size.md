---
title: "Effect Size"
summary: "How big the difference is, separately from how sure you are that it is real."
levels: { data-analyst: mid-level }
aliases: ["effect size", "Cohen's d", "standardized effect"]
prereqs: ["hypothesis-testing", "standard-deviation"]
related: ["statistical-power", "minimum-detectable-effect", "statistical-significance", "confidence-interval", "treatment-effect", "p-value"]
---

**Effect size** is the magnitude of the difference or relationship you found, expressed on its own
terms and separately from how precisely you measured it. Two results can both be significant and
describe very different effects, and a tiny significant difference and a large one warrant different
decisions.

Useful forms for an analyst:

| Question | Effect size |
|---|---|
| Did a rate change? | Difference in proportions, or the ratio of one to the other |
| Did an average change? | Difference in the original units |
| How strong is a relationship? | [Correlation coefficient](/t/correlation-coefficient) |
| How much does a predictor move the outcome? | [Regression](/t/linear-regression) coefficient |

Standardised versions — a mean difference divided by a standard deviation, the family that includes
what is often called Cohen's d — let you compare effects across metrics measured on different scales.
They are convenient and easy to misread, because "small" and "medium" come from conventions that fit
some fields better than others. Report the raw difference too, so a stakeholder can see what it means
in money or minutes.

Effect size earns its keep in two places.

Before a test: decide the **smallest change worth finding** — the
[minimum detectable effect](/t/minimum-detectable-effect) — and the
[sample size](/t/sample-size-calculation) follows from it. The data needed grows unevenly, because
required sample size scales with the square of the ratio: looking for half the effect takes
substantially more than twice the data.

After a test: a [confidence interval](/t/confidence-interval) around the effect tells you which
magnitudes are still compatible with the data. A p-value answers a third question entirely, and a
significance verdict only tells you that the interval excludes zero under the null you named. The
stakeholder's questions are **"how big?"** and **"how sure are you?"**, and those are the two to
answer first.
