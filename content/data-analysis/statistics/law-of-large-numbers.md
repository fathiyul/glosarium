---
title: "Law of Large Numbers"
summary: "Averages settle toward the true value as you gather more observations."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["LLN", "law of averages", "law of large numbers"]
prereqs: ["probability-basics", "sampling-methods"]
related: ["central-limit-theorem", "standard-error", "regression-to-the-mean", "confidence-interval", "sampling-bias"]
---

The **law of large numbers** says that as the number of independent observations grows, the sample
mean converges on the expected value of the underlying distribution. Flip a coin a thousand times
and the proportion of heads is usually close to a half; flip it a million times and it is usually
closer still.

It is a statement about long-run behaviour. It does not say that a run of tails is owed a head, and
it does not say that any particular sample will be close. Small samples stay noisy, which is exactly
why the [standard error](/t/standard-error) shrinks as 1/√n rather than in proportion to n.

Where it changes an analysis:

- **A short window is a weak estimate of a rate.** Tuesday's conversion rate is a much worse number
  than the same rate for the whole quarter, and comparing two short windows invites
  [regression to the mean](/t/regression-to-the-mean) to be read as a real change.
- **More rows is not the same as more information.** The law applies to the mean of independent
  observations, not to the sum of correlated ones. A metric that counts the same active user across
  200 sessions is not 200 times as informative.
- **Convergence is slow.** Halving the error takes four times the data. That arithmetic is what
  drives [sample size](/t/sample-size-calculation) planning.

The mistake is to treat "we have a lot of rows" as an answer to "is this estimate trustworthy?".
Volume fixes noise, not bias: a million rows drawn from a
[biased sample](/t/sampling-bias) converge confidently on the wrong number.

For the related claim about how the *spread of averages* behaves, see the
[central limit theorem](/t/central-limit-theorem); for what a *range around an estimate* means, see
[confidence intervals](/t/confidence-interval).
