---
title: "False Discovery Rate"
summary: "Controlling the share of false alarms among hits."
levels: { data-analyst: senior , data-scientist: mid-level }
aliases: ["FDR", "false discovery rate control", "Benjamini-Hochberg"]
prereqs: ["p-value", "hypothesis-testing"]
related: ["bonferroni-correction", "statistical-significance", "hypothesis-testing", "ab-testing"]
---

The false discovery rate is the **share of false alarms among your hits**. If you flag 20 metrics as "significant" while controlling the FDR at 5%, you accept that roughly 1 of those 20 is expected to be a false alarm. It is a property of the whole batch of discoveries, not of any single test.

The classic mistake is confusing it with the per-test [p-value](/t/p-value). A p-value threshold of 5% on each of 200 tested metrics can easily produce around 10 false flags by chance alone — all of them looking equally "significant" in a dashboard. FDR control (most often the Benjamini–Hochberg procedure, which ranks the p-values and holds each to a progressively stricter bar) sorts this out: it lets you trade a small, bounded share of false discoveries for much more power than family-wise methods. For the strictest alternative, which aims for zero false flags at all, see the [Bonferroni correction](/t/bonferroni-correction).

A concrete read: your experiment platform tests 200 guardrail metrics, 20 trip the alarm, and the FDR is controlled at 10%. Tell the team "about 2 of these 20 are probably noise — investigate accordingly", not "each of these has a 10% chance of being wrong". The first sentence is what the method promises; the second is not.

## When not to use it

As a data analyst running many slices, segments or [A/B readouts](/t/ab-testing), reach for FDR when false alarms are cheap but missing real effects is costly — triage, exploration, monitoring. As a data scientist, prefer Bonferroni-style control when a single false claim is expensive (safety, billing, public numbers), and pre-register [what counts as significant](/t/statistical-significance) either way. Never apply FDR to cherry-picked subsets of tests: it governs the batch you ran, and hiding tests from the batch breaks its guarantee.
