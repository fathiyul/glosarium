---
title: "Sample Ratio Mismatch"
summary: "When the groups are not the size the design promised, meaning the assignment itself is broken."
levels: { data-analyst: senior , data-scientist: senior }
aliases: ["srm", "sample ratio mismatch", "bucket imbalance", "imbalance check"]
prereqs: ["ab-testing", "randomization-unit", "chi-square-test"]
related: ["ab-testing", "randomization-unit", "chi-square-test", "data-quality-check", "metric-definitions"]
core: [data-analyst, data-scientist]
---

A sample ratio mismatch (SRM) is when the groups in a running experiment are not the sizes the design said they would be, by more than chance would explain. The design promised an even split; the data shows one arm noticeably larger than the other.

The point is that **the sizes of the arms are not something your treatment can influence**. Assignment happens before anyone sees a variant, so a working experiment cannot produce badly skewed group sizes. A large discrepancy therefore reports a bug in assignment, exposure, logging or analysis — not an effect.

## Checking it

Compare the observed counts against the expected split, for instance with a chi-square goodness-of-fit test ([chi-square test](/t/chi-square-test)). Small deviations are normal and are exactly what the test is for: the question is not "are the arms exactly equal" but "is this much deviation surprising if assignment were working".

One caveat before quoting a p-value. The test assumes the observations are independent. If you randomise by account but count by session, the effective sample is smaller than the number of rows and the mismatch looks more significant than it is ([randomisation unit](/t/randomization-unit)). Aggregate to the unit you randomised on first.

## Where it comes from

- Assignment after exposure. The bucket is decided when the user arrives, using something the treatment itself changed.
- Differential data loss. The new variant errors before its event fires, so treated users vanish from the results. This one biases your metric too, not just your counts.
- A filter applied to one arm only. Excluding rows with a field that only the new variant populates silently removes treated users.
- Contamination. Control users reach the treatment through another surface and get filtered out of the control group.
- The analysis query. Grouping by the wrong key, joining in a way that duplicates one arm, or filtering on a variant name that changed mid-test.
- Bot and internal traffic handling that differs between arms.

## What to do

Treat a significant SRM as **a stop sign, not a footnote**. Do not read the metric result first and reason backwards: if the counts are wrong, your metric is computed over two populations that differ for a reason you have not identified, and a "win" on top of that is not evidence of anything. Fix the assignment, check the exposure logs and the filters, then rerun.

This is one of the few tests where a significant result is bad news. It belongs in every experiment readout next to the effect estimate, as a [data quality check](/t/data-quality-check) on the experiment itself ([ab testing](/t/ab-testing)).
