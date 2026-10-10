---
title: "Treatment Effect"
summary: "The measured difference the change made, and the many reasons it may not be that difference."
levels: { data-analyst: mid-level }
aliases: ["treatment effect", "average treatment effect", "experiment lift"]
prereqs: ["ab-testing", "effect-size", "confidence-interval"]
related: ["ab-testing", "effect-size", "confidence-interval", "randomized-controlled-trial", "regression-to-the-mean"]
---

The treatment effect is the difference between what happened in the treated group and what happened in the control group. It is the number the experiment was run to produce, and it is worth being exact about what kind of number it is.

What you measured is **the average difference in your sample, in your context, over your window**. Not a property of the change.

## Why it is narrower than it looks

- It is an average over the people who were in the test. New users, a different traffic mix, a different season or a different device split can all move it. A test on logged-in desktop users says little about anonymous mobile traffic.
- It can hide opposite effects in segments. An overall lift can be a large gain in one segment and a loss in another that averages out to something small ([segmentation](/t/segmentation), [Simpson's paradox](/t/simpsons-paradox)).
- It is an estimate, not a value. It has an interval, and an estimate that lands just past your threshold is more likely than average to be an overstatement ([confidence interval](/t/confidence-interval), [regression to the mean](/t/regression-to-the-mean)).
- It depends on what you compare against. Only randomisation or a designed comparison makes the difference attributable to the change at all ([randomised controlled trial](/t/randomized-controlled-trial)).
- "No effect" is not what a null result says. A test that finds nothing has ruled out effects larger than the ones it could detect, which is a statement about your sample as much as about the change ([statistical power](/t/statistical-power)).

## Two definitions worth choosing in advance

- Absolute versus relative. "Plus 1.2 percentage points" and "plus 8% relative" are different numbers from the same data (e.g. a 15% baseline moving to 16.2%), and the relative one looks bigger when the baseline is small. Say which you are reporting.
- Everyone assigned versus everyone exposed. An intention-to-treat effect counts all users in the arm, whether or not they saw the change; an exposed-only effect counts those who did. They answer different questions, and choosing between them after seeing the data selects the bigger number.

Report the effect with its interval, the group sizes and the definition used. "Completion rose by X points (interval A to B), N users per arm, intention-to-treat" is a result someone can argue with. "A significant lift" is a **headline**.
