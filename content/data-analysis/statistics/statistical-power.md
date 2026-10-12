---
title: "Statistical Power"
summary: "The chance a test would have detected an effect of the size you care about."
levels: { data-analyst: senior , data-scientist: mid-level }
aliases: ["statistical power", "power of a test", "power analysis"]
prereqs: ["hypothesis-testing", "effect-size", "sample-size-calculation"]
related: ["sample-size-calculation", "minimum-detectable-effect", "statistical-significance", "effect-size", "test-duration", "peeking-problem"]
---

**Statistical power** is the probability that a test will reject the null hypothesis, given that the
effect you named is genuinely there. It is **the sensitivity of your instrument**: how likely you are
to notice the thing you went looking for, decided before you collect the data.

Four things determine it, and only one of them is the arithmetic:

- the size of the effect, since smaller effects need more data to find;
- the amount of data, since more data means more power;
- the variability of the metric, since noisier metrics need more data;
- the significance threshold you chose, since a stricter level costs power and a looser one buys it.

Because power is a probability, it earns its keep as a design input. Work out the
[sample size](/t/sample-size-calculation) that gives a reasonable chance of detecting the
[minimum detectable effect](/t/minimum-detectable-effect), then check that the traffic you actually
have clears that number. If it does not, the test will return an inconclusive result much of the
time, whatever the p-value ends up saying.

Two readings that matter when you report:

- A test with **low power that came back negative has learned very little.** "No significant
  difference" from an underpowered test is mostly a statement about the sample rather than the world,
  and it does not establish the null. Absence of evidence is not evidence of absence.
- A significant result from an underpowered test is likely to be inflated. If the test can only
  detect large effects, the ones it does detect are the ones at the top of the range, and
  [regression to the mean](/t/regression-to-the-mean) applies to any selection on an extreme
  estimate — so a replication with more data usually finds something smaller.

Power is also what [peeking](/t/peeking-problem) destroys. Stopping a test the moment it clears the
threshold does not change the power you calculated; it changes the probability that a "significant"
result is noise. If you intend to look repeatedly, use
[sequential testing](/t/sequential-testing) rules that account for it, and set a
[test duration](/t/test-duration) you can defend.
