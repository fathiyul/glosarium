---
title: "Regression Discontinuity"
summary: "Learning from a cutoff that assigns treatment."
levels: { data-analyst: senior , data-scientist: mid-level }
---

Regression discontinuity (RD) finds causal effects in cutoff rules. When treatment flips sharply at a threshold — scholarships at 80 test points, a program at age 65, a flag at a credit-score line — the units just above and just below the line are near-identical in every practical respect, differing mainly in treatment status. Comparing outcomes across the cutoff estimates the rule's local effect almost like a randomized experiment at the boundary.

Analysts should frame the comparison honestly: RD asks "what happens *at* the threshold?" not "what does this program do everywhere?" An effect found on borderline students does not transfer to students who clear the bar comfortably. The bandwidth choice — how close to the line counts as "just above/below" — drives the estimate and the uncertainty, and both should be reported.

Data scientists use it when randomization is off the table but the assignment mechanism is sharp and known. Validation lives in the running variable: plot the density around the cutoff and look for bunching. If people can push their score, their birth date into a month, or their revenue past a threshold, the units near the line on either side differ systematically — the "as-good-as-random" premise collapses. Check that other outcomes (predetermined characteristics) do not jump at the line; a jump there means the design is measuring selection, not treatment.

The threats are specific and checkable: manipulation of the running variable (fatal), too-narrow bandwidth leaving too little data (inflates noise), too-wide bandwidth mixing in units that are not comparable (biases the estimate), and extrapolating the local effect far beyond the cutoff (not what was estimated).

Where it shines: policy and gating rules already exist in most businesses — spend tiers, risk scores, eligibility lines — and RD turns an existing rule into evidence almost for free. Where it fails: nowhere near a cutoff, never. If the decision is fuzzy around the threshold (assignment only *partly* follows the rule), you need the fuzzy variant, which estimates compliance-weighted effects, or a different design entirely.
