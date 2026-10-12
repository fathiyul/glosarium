---
title: "Test Duration"
summary: "Running long enough to cover weekly cycles and novelty, and no longer than you can defend."
core: [data-scientist]
levels: { data-analyst: mid-level , data-scientist: senior }
aliases: ["test duration", "experiment length", "test runtime"]
prereqs: ["ab-testing", "sample-size-calculation", "statistical-power"]
related: ["ab-testing", "novelty-effect", "seasonality", "minimum-detectable-effect", "holdback-group"]
---

Test duration is how long you run an experiment before reading the result. Two clocks have to be satisfied at once: **the statistical one and the calendar one**. Meeting either alone gives an answer you cannot defend.

## The two clocks

The statistical clock is the sample size you need for the effect you care about ([sample size calculation](/t/sample-size-calculation), [minimum detectable effect](/t/minimum-detectable-effect)). On a high-traffic surface that can be reached in hours; on a thin one, never.

The calendar clock is about which population you measured. A conversion rate computed over five weekdays is not the conversion rate over a week: weekend behaviour differs, and a test that starts on Monday and stops on Friday has measured a different mix of users than one that spans a weekend. Full cycles — whole weeks, and more than one — let day-of-week and week-to-week variation average out instead of landing entirely on one arm ([seasonality](/t/seasonality)).

## Long enough for the effect to be the one you mean

Some effects are not immediate. A novelty lift fades, a change-aversion dip recovers, and a retention change only shows up in later cohorts ([novelty effect](/t/novelty-effect)). Running past that window costs traffic. Running short of it gives you a number about curiosity rather than about the change.

## No longer than you can defend

The cost of long tests is real:

- More users exposed to a variant that may be worse, and more of them exposed to one that is broken.
- Contamination. Other changes ship during your test, so the treatment becomes "the treatment plus everything that launched in week two", and each of those needs its own read of which arm it touched.
- External events — an outage, a campaign, a competitor move — that land in one arm's window and not the other.
- Stale infrastructure: flags left on, buckets that have quietly drifted, a team that has lost interest.

## The practice

Compute the duration from the required sample, round up to whole weekly cycles, then check that the result is still readable at that length. If the required duration is longer than the change can wait, that is **a design problem** — a bigger effect worth looking for, fewer variants, or a different metric — not a reason to stop early. Write the end date down, and treat extending it as a decision that needs a reason rather than a rounding choice ([decision rule](/t/decision-rule), [ab testing](/t/ab-testing)).
