---
title: "P-value"
summary: "How surprising data is if nothing is going on."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["p value", "p-value significance", "p-value threshold"]
prereqs: ["null-hypothesis", "probability-basics"]
related: ["statistical-significance", "hypothesis-testing", "null-hypothesis", "effect-size", "bayes-theorem", "peeking-problem"]
---

The **p-value** is the probability of getting data at least as extreme as what you observed,
assuming the [null hypothesis](/t/null-hypothesis) is true and the model's other assumptions hold. It
is a statement about the data under an assumption — not a statement about the assumption.

A p-value is **not**:

- the probability that the null hypothesis is true. That needs a prior and is a
  [Bayesian](/t/bayes-theorem) quantity; see
  [Bayesian versus frequentist](/t/bayesian-vs-frequentist).
- the probability that your result is a fluke. The p-value is computed *assuming* no effect, so it
  cannot be the probability of "no effect" given what you saw.
- the probability that repeating the study would give the same answer.
- a measure of how big the effect is. A tiny unimportant difference with enough data has a small
  p-value, and a large important difference with a small sample can have a large one. Report the
  [effect size](/t/effect-size) beside it.

The usual convention treats a p-value below 0.05 as "statistically significant". **0.05 is a
convention, not a fact about the world** — a threshold someone settled on for a decision rule, and
it behaves badly under peeking and selective reporting
([the peeking problem](/t/peeking-problem)). A p-value of 0.049 and one of 0.051 are not different
kinds of evidence.

Two readings that help:

- A p-value of 0.001 does not mean the null is very unlikely. It means the null predicts data like
  yours is rare. If you already had good reason to doubt the null before you started, you have
  learned less than the arithmetic suggests.
- A p-value of 0.30 does not prove the null. It means the data is not surprising under the null —
  which is also exactly what a real effect too small for the sample would look like.

Small p-values are easy to produce in two ways that have nothing to do with discovery: testing many
things at once and reporting the winners, and looking repeatedly until something clears the bar.
Both change what a p-value means afterwards, regardless of what the software prints.
