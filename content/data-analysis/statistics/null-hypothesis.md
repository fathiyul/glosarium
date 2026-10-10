---
title: "Null Hypothesis"
summary: "The 'nothing is happening' assumption a test measures against."
levels: { data-analyst: mid-level }
aliases: ["null hypothesis", "H0", "null hypothesis significance testing"]
prereqs: ["hypothesis-testing", "statistics-basics"]
related: ["p-value", "hypothesis-testing", "statistical-significance", "effect-size", "ab-testing", "treatment-effect"]
---

The **null hypothesis**, written H₀, is the statement that the thing you suspect is not happening.
No difference between two groups, no relationship between two columns, no change from the baseline.
The entire test asks one question: how surprising would the data look if H₀ were true?

For a [t test](/t/t-test) comparing two group averages, H₀ says both averages come from the same
distribution. For a [chi-square test](/t/chi-square-test), it says the two categorical variables are
independent. For a regression coefficient, it says that coefficient is zero once the other
predictors are in the model.

What the null is for, and what it is not for:

- It defines the yardstick. Without it, "the new group is better" has no reference point, and
  "better than what" goes unanswered.
- It is not a claim you expect to be true. You choose the dullest version of the world precisely so
  that a surprising result is informative.
- It is not the opposite of your hypothesis in any useful sense. H₀ is a point — a specific zero
  difference — not a range of small differences.

The subtle part is what happens when the test comes back unconvincing. A result that does not reach
the threshold does not establish H₀. The data is left compatible with a no-difference world and also
with small effects you did not have enough data to see. **Absence of evidence is not evidence of
absence**, and a test with little [power](/t/statistical-power) can miss a real effect entirely.
Reporting "no significant difference" without the [effect size](/t/effect-size) and the interval
around it is close to reporting nothing.

One-sided and two-sided nulls are different claims, and the difference matters. A two-sided test
asks whether the groups differ at all; a one-sided test asks whether the new one is better. Choosing
one after seeing the direction of the result inflates the apparent strength of the evidence, so
make the choice while writing the [decision rule](/t/decision-rule).
