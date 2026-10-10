---
title: "Bayes' Theorem"
summary: "Updating a belief with new evidence, and why 'how likely is that really' beats 'how surprising'."
levels: { data-analyst: senior }
aliases: ["Bayes theorem", "Bayes rule", "Bayesian updating"]
prereqs: ["probability-basics", "p-value"]
related: ["bayesian-vs-frequentist", "p-value", "ab-testing", "decision-rule", "sampling-bias", "probability-basics"]
---

**Bayes' theorem** says how to revise a probability when new evidence arrives:

```text
P(A | B) = P(B | A) × P(A) / P(B)
```

The pieces have names. P(A) is your prior — how likely A is before the evidence. P(B | A) is the
likelihood — how probable the evidence is if A is true. P(A | B) is the posterior, the revised
belief. Everything the theorem does is normalise by P(B), the total probability of the evidence
across all the possibilities.

Its practical value is that it reverses the conditional. A model, a test, or a diagnostic has a known
accuracy for "what the result is, given the state of the world", and you usually want "the state of
the world, given the result". Bayes is the bridge.

A worked illustration, with invented numbers so the arithmetic is checkable. Suppose 1% of accounts
on a platform are fraudulent, the fraud model flags 90% of fraudulent accounts, and it also flags 5%
of honest ones. Of every 10,000 accounts, about 90 fraudulent ones are flagged and about 495 honest
ones are, so a flagged account is fraudulent roughly 90 / 585 ≈ 15% of the time. The flag looks far
more convincing than it is, purely because fraudulent accounts are rare. **Getting the base rate into
the answer is the point.**

That is the difference from a [p-value](/t/p-value). A p-value says how surprising the evidence is if
the null is true; Bayes says how much to change your belief about the null given the evidence. They
answer different questions, which is why "there's only a 5% chance this is noise" is not a
translation of "p = 0.05" — see
[Bayesian versus frequentist](/t/bayesian-vs-frequentist).

Notes worth attaching when you use it:

- The prior is an assumption, so make it explicit and check how far the answer moves when you change
  it. If a conclusion only survives one particular prior, say so.
- Posterior probabilities are only as good as the likelihood. A model whose accuracy was measured on
  a [different population](/t/sampling-bias) produces a well-formatted wrong answer.
- With plenty of data and vague priors, a Bayesian analysis and a frequentist one often land close
  together. They diverge where the data is thin, which is exactly where the choice matters.

For running tests where beliefs are updated as data accumulates, see
[A/B testing](/t/ab-testing) and the [decision rule](/t/decision-rule) that follows from it.
