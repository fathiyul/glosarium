---
title: "Bonferroni Correction"
summary: "Raising the bar when you run many tests."
levels: { data-analyst: senior , data-scientist: mid-level }
---

The Bonferroni correction is the simplest guard against false alarms multiplying under many tests: if you run m tests and want a family-wide error rate of α, judge each test at α/m. Twenty tests at α = 0.05 means each one needs p below 0.0025 to count.

Why it exists: one test at 0.05 carries a 1-in-20 false-alarm chance. Run twenty and the probability of at least one false alarm rises toward roughly 64%. This is exactly how "three metrics moved!" dashboards fool teams — someone checks every metric, every segment, every week, and probability delivers hits on schedule. Related traps: the [peeking problem](/t/peeking-problem) in running experiments, and the multiplicity inside [multivariate testing](/t/multivariate-testing).

Analysts should read it as the price of fishing: acceptable when the family is small and every comparison matters — launch criteria across a handful of metrics — and wasteful when you scanned hundreds of slices, because genuine small effects get buried. Data scientists see the same inflation in model selection: choosing the best of many candidate models or thresholds and then reporting its apparent performance as if it were a single pre-committed test.

The honest limitations. Bonferroni controls the family-wise error rate — the chance of any false alarm — and is conservative once tests are correlated, which business metrics almost always are. The everyday alternative is controlling the [false discovery rate](/t/false-discovery-rate): accept some false alarms but bound their share among the hits, which keeps far more usable power when scanning large metric sets.

When not to reach for it: a single pre-registered test on the one metric you said you would watch needs no correction; ceremony adds nothing. The discipline is ordering — define the family of tests and the threshold before you look, then correct within that family. Choosing the family after seeing the results lets you pick the answer twice.
