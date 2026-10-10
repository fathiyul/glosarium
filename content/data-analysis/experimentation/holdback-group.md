---
title: "Holdback Group"
summary: "A slice of users deliberately left out of a change so its long-term effect stays measurable."
levels: { data-analyst: mid-level }
aliases: ["holdback", "long-term holdback", "always-on control group", "control group"]
prereqs: ["ab-testing", "test-duration"]
related: ["ab-testing", "novelty-effect", "test-duration", "retention-analysis", "cohort-analysis"]
---

A holdback group is a small, randomly chosen slice of users who never get the change, kept aside after it ships to everyone else. Because they stay on the old experience, you can keep comparing shipped users against them for as long as you like — which is something a **finished A/B test cannot do**.

It answers the questions a short test is too short to answer. Did the change hold up after the novelty faded ([novelty effect](/t/novelty-effect))? Did retention, repeat purchase or churn move over months? Did a change that looked neutral in week two turn out to compound? The comparison is concurrent — holdback against shipped, at the same time — which matters, because comparing shipped users to last quarter lines them up against a different season and a different traffic mix ([seasonality](/t/seasonality)).

## What it costs

- You permanently serve a minority an older experience. Someone has to own that decision, and the older path has to keep working and keep being maintained.
- The holdback is small by design, so it has limited power for small long-term effects. It is good at detecting a large persistent difference and poor at confirming a tiny one.
- It only works if it stays clean. The holdback has to remain random, must not be able to reach the new experience through another surface — a shared login, a marketing page, a support workaround — and must not be quietly filtered out by your own queries.

## The classic mistake

Treating the holdback as free evidence. It is **not a second A/B test you forgot to stop**; it is a deliberate long-term cost. If nobody has committed to keeping the old code path alive and to reading the comparison at a set date, the holdback will be dropped and the data will be unusable.

The other mistake is letting a holdback substitute for a proper test up front. The pre-launch comparison still has to carry the shipping decision; the holdback is for what happens afterwards ([ab testing](/t/ab-testing)). Reading it over time is a [retention](/t/retention-analysis) or [cohort](/t/cohort-analysis) question, and it needs a set date, not a vague intention to look at it someday.
