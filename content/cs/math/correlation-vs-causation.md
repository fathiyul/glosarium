---
title: "Correlation vs Causation"
summary: "Why related numbers don't prove one causes the other."
levels: { data-analyst: mid-level }
aliases: ["correlation vs causation", "correlation does not imply causation", "correlation is not causation"]
prereqs: ["correlation-coefficient", "confounding-variable", "sampling-bias"]
related: ["correlation-coefficient", "confounding-variable", "causal-inference", "randomized-controlled-trial", "simpsons-paradox"]
---

Correlation says two numbers move together. Causation says that changing one changes the other. The first is something you can compute from a spreadsheet. The second is **a claim about what would happen if you intervened**, and it needs more than a formula.

## Why an association can appear without a cause

- Reverse causation. Y causes X. Users who churn stop opening emails and stop logging in; the sessions metric did not cause the churn.
- A confounder drives both. Ice cream sales and drownings both rise in summer. Neither causes the other; the season causes both ([confounding variable](/t/confounding-variable)).
- Selection. The group you are looking at was filtered on something related to both. Users who completed onboarding are the ones who stayed, so comparing them with users who did not compares two different populations ([sampling bias](/t/sampling-bias)).
- Chance and small samples. Enough subgroups and enough metrics, and something will look related. A striking pattern in a thin slice is usually noise ([regression to the mean](/t/regression-to-the-mean)).

## The stale example, and why it matters

A dashboard shows that users who enable a feature retain better. Does enabling it cause retention, or do engaged users both enable features and stick around? The correlation cannot tell you, and the decision it invites — "ship the feature to everyone" — assumes the answer it cannot give.

Watch aggregation too: a relationship that holds in every group separately can disappear or reverse when the groups are pooled, because the mix of groups changes ([Simpson's paradox](/t/simpsons-paradox)).

## Getting closer to a cause

- Randomise. Splitting users at random and comparing the groups is the one method that also handles confounders you did not think of ([randomised controlled trial](/t/randomized-controlled-trial)).
- Use a comparison group you did not select by outcome. A rollout by region or by date gives you a quasi-experiment, with assumptions you have to argue ([quasi-experiment](/t/quasi-experiment)).
- Adjust for confounders, carefully. Controlling for the right variables helps; controlling for the wrong ones creates the association you were trying to remove ([causal inference](/t/causal-inference)).

The mistake is not using correlation. It is **treating it as a decision**. A strong, stable, dose-responsive association with a plausible mechanism is real evidence, and worth acting on when you cannot experiment — as long as you say what it is: evidence consistent with the claim, not proof of it.
