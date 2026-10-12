---
title: "Expected Value"
summary: "The long-run average of an uncertain quantity."
levels: { data-analyst: mid-level , data-scientist: junior }
---

Expected value is the long-run average of an uncertain quantity: each possible outcome weighted by its probability, then summed. A bet that wins $10 half the time and loses $6 the other half has an EV of $2 — play it many times and you average $2 per play.

For analysts, expected value is the honest way to rank decisions under uncertainty. A campaign converting 2% of visitors at $50 each beats one converting 0.5% at $150 by EV per visit ($1.00 against $0.75), even though the second looks better on average order value. Insurance pricing is the same arithmetic: premiums cover the EV of claims plus expenses, and a quiet quarter changes nothing about the math.

For data scientists, EV is the theory behind model scores and loss functions: predicting the conditional mean is optimal under squared error, and when choices repeat, optimizing expected revenue or utility is usually the right objective for a ranking model.

The classic mistake is treating EV as a guarantee on a one-shot decision. EV is an average over repetitions, and some decisions — a pivot, a launch, a bet-the-budget contract — run exactly once. A plan with $200M EV on a 1% chance is mostly a lottery ticket: the [variance](/t/variance) around the average, the worst plausible branch, and the fact you cannot re-run the year all belong in the conversation. Pure EV reasoning fits repeatable, bounded-stakes choices; for rare, huge ones, pair it with downside analysis.

The second trap is garbage probabilities producing precise-looking numbers. EV multiplies whatever you feed it; a confident 20% that is really 2% just relabels the guess. State ranges, show the sensitivity, and sanity-check assumptions the way [forecasting](/t/forecasting) reviews do — the output deserves no more trust than the inputs it inherited.
