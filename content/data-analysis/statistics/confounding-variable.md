---
title: "Confounding Variable"
summary: "A third factor driving both things you measured, producing a real but meaningless relationship."
levels: { data-analyst: mid-level }
aliases: ["confounder", "confounding variable", "confounding"]
prereqs: ["correlation-coefficient", "statistics-basics"]
related: ["correlation-vs-causation", "simpsons-paradox", "causal-inference", "experiment-design", "multiple-regression", "segmentation"]
---

A **confounding variable** is a third factor that influences both things you measured. Its signature
is a relationship that is entirely real in the data and entirely meaningless as a claim about cause:
the two things you measured share a common driver, not a relationship with each other.

The classic form is seasonal. Suppose you compare churn across two quarters and find customers in
the newer quarter churning much less. Contract length might explain it: the newer quarter's
customers have had far less time in which to leave. Both "quarter" and "churn" are downstream of
tenure, so the comparison is measuring the calendar.

You find it by asking, for any pair you are about to report, "what could plausibly cause both of
these?":

- A group difference driven by who is in the group. Users who landed on a new page may have arrived
  through a different channel, on a different device, with a different intent
  ([segmentation](/t/segmentation)).
- A change over time driven by the calendar. [Seasonality](/t/seasonality) confounds any comparison
  of two short windows ([period over period](/t/period-over-period)).
- A trend shared by two unrelated columns. Two series that both grow will correlate whatever they
  measure, so a [trend](/t/trend) is a confounder of itself.
- A selection in the data. Rows that exist at all may be the ones that survived something
  ([survivorship bias](/t/survivorship-bias)).

What to do depends on how the data was collected. In a randomised experiment, assignment does the
work for you, which is why it is the strongest design
([randomised controlled trial](/t/randomized-controlled-trial)). In observational data you have to
name the confounder, measure it, and control for it — through stratification, by matching, or by
including it in a [multiple regression](/t/multiple-regression). Each control works only for the
confounders you actually measured, and **unmeasured ones stay inside the result**. A control that is
itself downstream of the treatment can make the bias worse rather than better, so think about
ordering before adding columns.

Reporting a correlation without thinking about confounders is how "users who use feature X spend
more" becomes "build feature X". See [causal inference](/t/causal-inference) for the tools that go
further, and [Simpson's paradox](/t/simpsons-paradox) for what happens when the pooled and the
stratified comparison disagree.
