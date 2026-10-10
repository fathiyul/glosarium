---
title: "Hypothesis Testing"
summary: "Deciding, in advance, what evidence would change your mind \u2014 then checking it."
levels: { data-analyst: mid-level }
aliases: ["hypothesis test", "significance testing", "statistical test"]
prereqs: ["null-hypothesis", "p-value", "statistics-basics"]
related: ["null-hypothesis", "p-value", "statistical-significance", "statistical-power", "ab-testing", "experiment-design"]
---

A **hypothesis test** is a pre-committed procedure: state the claim you want to make, state the
"nothing is happening" version of it, define what result would count as surprising, collect the
data, then report what you found. The value is not in the arithmetic, it is in the discipline of
fixing the rule before you see the number.

The steps, as an analyst runs them:

1. Write the question as two statements. The [null hypothesis](/t/null-hypothesis) is the boring
   one — no difference, no relationship. The alternative is the claim you are testing for.
2. Choose a test statistic that grows when the alternative is true: a difference in means for a
   [t test](/t/t-test), a sum over cells for a [chi-square test](/t/chi-square-test).
3. Fix the [decision rule](/t/decision-rule) in advance. What result ships the change, what kills
   it, and what counts as inconclusive. This is also what protects you from
   [peeking](/t/peeking-problem) at a running test and stopping when it looks good.
4. Settle the [sample size](/t/sample-size-calculation) first, so the test is actually capable of
   detecting the effect you care about — that capability is its
   [statistical power](/t/statistical-power).
5. Report the number, its uncertainty, and the size of the effect
   ([effect size](/t/effect-size)), not just whether it cleared a threshold.

The mistake that costs most is **testing after looking**. If you sort, filter and re-slice until
something pops, the test you eventually run no longer has the false-positive rate you claim,
whatever the software prints. Whatever the hypothesis turns out to be, decide it before the data.

The second is **reading a large sample as proof of meaning**. With enough rows, a real but trivial
difference becomes clear. So report the size of the effect next to the p-value, and say whether it
matters for the decision on the table.

A hypothesis test does not tell you that the null hypothesis is true when it fails to reject it, and
it does not tell you what caused the difference it finds. For the threshold conventions see
[statistical significance](/t/statistical-significance); for the second problem see
[causal inference](/t/causal-inference) and
[experiment design](/t/experiment-design).
