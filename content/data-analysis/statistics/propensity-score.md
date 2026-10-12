---
title: "Propensity Scores"
summary: "Balancing groups statistically when you cannot randomize."
levels: { data-analyst: senior , data-scientist: mid-level }
---

A propensity score is the probability that a unit *would have been treated*, given the variables you observe: model P(treated | X) with [logistic regression](/t/logistic-regression) or similar, and every unit gets one number that summarizes how "treatment-likely" its characteristics make it. The trick that earns the name: conditioning on this single score balances the observed covariates the way [randomization](/t/randomization-unit) would, letting you compare treated and control units with matching, weighting (IPW), or stratification instead of apples-to-oranges averages.

Analysts use it on observational questions you cannot randomize: did the onboarding email raise retention? Compare emailed and non-emailed users *within similar propensity bands* — users who look alike in activity, plan, tenure — rather than overall averages that are hopelessly confounded, since the people who open emails were different to begin with.

Data scientists should hold the limitations firmly. The score adjusts for what is measured, never for what is not; an unobserved driver of both treatment and outcome (motivation, manager quality) stays baked into the "effect." It also needs overlap: if a region of covariate space was never treated, there is no comparison to be had, and weighting will lean on a handful of extreme units. Check the score distributions before trusting the balance tables, and inspect which covariates actually balanced after adjustment.

The classic overstatement is calling propensity-adjusted results "causal." At best they are *less confounded* than raw comparisons, under stated assumptions — treatment assignment ignorable given observed X — that nobody can fully verify. Say what was adjusted, show the balance, and name what could not be.

When not to bother: with rich behavioral data, regression or [difference-in-differences](/t/difference-in-differences) designs may answer the same question with clearer assumptions, and a well-designed [randomized trial](/t/randomized-controlled-trial) beats all of this — run one where you ethically and practically can.
