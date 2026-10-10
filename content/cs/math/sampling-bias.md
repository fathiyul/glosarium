---
title: "Sampling Bias"
summary: "When the data you see isn't the population you claim."
levels: { data-analyst: mid-level }
aliases: ["sampling bias", "selection bias", "biased sample"]
prereqs: ["sampling-methods", "statistics-basics"]
related: ["sampling-methods", "survivorship-bias", "simpsons-paradox", "missing-data", "causal-inference", "holdback-group"]
---

**Sampling bias** is the systematic mismatch between the rows you have and the rows you are making a
claim about. The rows are not a random draw, they are a filtered one, so **the summary describes the
filter** rather than the population.

It shows up in ordinary analysis more often than any other statistical error, because it needs no
arithmetic to produce:

- Who is in the data at all. Satisfaction surveys hear from users who are delighted or furious;
  everyone else stays silent. Churn analysis only covers the ones who stayed.
- What survives to be counted. Judging a feature by the users who happened to see it, when seeing it
  was itself a choice ([survivorship bias](/t/survivorship-bias)).
- Availability. The rows that are easy to query — the table with a fresh pipeline, the region with a
  clean API — quietly become "the customers".
- Self-selection. Users who clicked, opted in, upgraded or replied. Every one of those is a decision,
  and decisions correlate with everything else about those users
  ([confounding variables](/t/confounding-variable)).
- Missing data. Rows with blank fields are rarely missing at random; the reason they are blank is
  usually something you would want to measure ([missing data](/t/missing-data)).

The signature to look for is a number that is suspiciously good, or one that will not reproduce
outside the window it was measured in. A
[holdback group](/t/holdback-group) exists partly to catch changes that only appear in a selected
slice.

What you can and cannot do about it:

- Bias does not shrink with more data. A million rows drawn from a biased frame converge confidently
  on the wrong answer (see the [law of large numbers](/t/law-of-large-numbers)).
- Weighting helps only if you know the direction and the size of the imbalance, which requires an
  external population you trust.
- Say what the data covers. "Among users who submitted a survey in Q3" is a claim you can support.
  "Our customers think" is not.

For how the data was collected in the first place, see
[sampling methods](/t/sampling-methods); for bias that survives correct collection, see
[Simpson's paradox](/t/simpsons-paradox) and [causal inference](/t/causal-inference).
