---
title: "Randomization Unit"
summary: "Whether you randomize by user, session or device, and how much it changes what you can conclude."
levels: { data-analyst: senior }
aliases: ["randomisation unit", "unit of randomisation", "experiment unit"]
prereqs: ["ab-testing", "experiment-design", "sampling-methods"]
related: ["ab-testing", "experiment-design", "standard-error", "sample-ratio-mismatch", "feature-flags"]
---

The randomisation unit is the thing that gets assigned to a variant: the user, the session, the device, the account, the household. It is a design decision made once, and it quietly sets **what you can claim and how much data you really have**.

## It sets the claim

If you randomise by user, "users who saw the variant converted at a higher rate" is a sentence your design supports. If you randomise by session, the same data supports "sessions that saw the variant were more likely to convert" — a weaker and different statement. A returning user who sees the new variant once and the old variant three times is a mixture, and no analysis un-mixes them afterwards.

## It sets the effective sample size

This is the part that costs significance. When units are clustered — users in a household, sessions of the same user, students in a class — behaviour within a cluster is correlated, so the second and third observations carry less new information than the first. The effective sample is smaller than the row count.

Randomise by session and then compute the standard error as though sessions were independent, and you understate the uncertainty: the test comes out significant more often than it should. The same trap runs the other way. Randomise by user when the effect flows between people — a collaboration feature, a referral programme, a shared device — and you split an interacting group across variants, contaminating both arms.

The analysis has to match the unit: aggregate to the level you randomised on before computing the error ([standard error](/t/standard-error)), and check that the arm sizes are what the design promised ([sample ratio mismatch](/t/sample-ratio-mismatch)).

## Choosing

| Unit | Good for | Cost |
|---|---|---|
| User or account | Durable product changes, per-user outcomes | Fewer independent units; needs more traffic for the same power |
| Session or visit | Decisions that must be fast; changes that are naturally per-session | Correlated sessions; only session-level claims |
| Device or household | Changes that apply to a shared surface | Coarsest units; largest sample requirement |

There is no universally right answer. The rule of thumb is to randomise at the level **the treatment actually applies to**, and to make the claim match the unit. A finer unit gives you more numbers and a weaker statement; a coarser unit gives you a clean statement and needs far more traffic.

Whatever you pick, the assignment has to be sticky: a user who flips between variants on every request makes both arms uninterpretable ([feature flags](/t/feature-flags), [experiment design](/t/experiment-design)).
