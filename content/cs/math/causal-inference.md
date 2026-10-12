---
title: "Causal Inference"
summary: "Estimating cause and effect from observational data."
levels: { data-analyst: senior , data-scientist: senior }
core: [data-analyst, data-scientist]
aliases: ["causal inference", "causal estimation", "causal analysis"]
prereqs: ["correlation-vs-causation", "regression-analysis", "experiment-design"]
related: ["correlation-vs-causation", "confounding-variable", "experiment-design", "quasi-experiment", "difference-in-differences", "randomized-controlled-trial"]
---

Causal inference is the set of methods for estimating what happens when you intervene, from data where you did not get to intervene. You observe that two things move together and you want to know whether changing one changes the other.

## The problem stated precisely

For any unit — a user, a region, a customer — the causal effect is the difference between the outcome you would see if it got the treatment and the outcome you would see if it did not. You only ever observe one of those two. Everything else in the field is **a way of estimating the unobserved one**.

What you can usually estimate is an average over a population, not an effect for each unit. And an average can be true while being misleading: if the effect is positive for one group and negative for another, the average hides both.

## Why correlation is not enough

An association between X and Y has several possible explanations, and the data alone often cannot choose between them ([correlation vs causation](/t/correlation-vs-causation)):

- X causes Y.
- Y causes X. Reverse causation: users who churn stop opening emails and stop logging in, and the metric did not cause the churn.
- A third variable causes both — a [confounder](/t/confounding-variable). Spend and revenue both rise in December.
- The sample was selected on something related to both. Survivorship in the users you still have data for is the standard version of this.

## What makes an estimate causal

Randomisation is the cleanest answer, because it confounds nothing ([randomised controlled trial](/t/randomized-controlled-trial)). Without it you need an identification argument: a stated reason why the comparison you made is not confounded, plus evidence for that reason. The common designs are described under [quasi-experiment](/t/quasi-experiment) and [difference-in-differences](/t/difference-in-differences).

A causal diagram — a directed graph of what you believe causes what — is a useful way to make the argument explicit. It tells you which variables to adjust for and which to leave alone: adjust for common causes of the treatment and the outcome, and do not adjust for things the treatment causes downstream, nor for common effects of two variables, which can manufacture an association that was not there. The diagram is **your assumption, not evidence**. It does not become true because you drew it.

## Reporting honestly

Say what compares to what, state the assumption the comparison rests on, give the size of the uncertainty, and most usefully, say what evidence would change your mind. "Conversion is higher among users who enable the feature" is a description of data. "Enabling the feature raises conversion, assuming users who enable it would have behaved like those who did not" is a causal claim with its assumption visible — which is close to the most you can honestly say without randomisation ([experiment design](/t/experiment-design)).
