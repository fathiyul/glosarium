---
title: "Benford's Law"
summary: "Why real numbers start with 1 far more often."
levels: { data-analyst: mid-level , data-scientist: junior }
---

Benford's law says that in many naturally collected datasets, leading digits are not evenly spread: numbers starting with 1 appear about 30% of the time, while those starting with 9 appear under 5%. The predicted share for digit d is log10(1 + 1/d), falling smoothly across the nine digits.

The law holds for data that spans several orders of magnitude and is roughly scale-invariant — invoice amounts, city populations, stock prices, distances. It breaks for data with fixed ranges or assigned identifiers: heights in centimetres cluster in a narrow band, phone numbers and lottery draws are designed to look uniform, and anything capped (percentages at 100) skews the pattern.

Analysts can use it as a cheap sanity and anomaly check: compute the leading-digit distribution of transaction amounts, compare with the expected curve, and investigate large departures. Fabricated or manipulated numbers often cover digits too evenly or overuse a few, because people invent digits the way they imagine randomness looks. Data scientists should treat it the way auditors do — a screening signal that points where to look, not evidence of anything by itself.

The classic mistake is running the check on data that violates the law's conditions and "finding fraud" in perfectly normal numbers: a reimbursement system where claims are capped at $500, survey scores from 1 to 5, ages, or prices all set at .99 endings. Before trusting the signal, ask whether the quantity naturally spreads across orders of magnitude, and test the digits before decimal points.

The positive use is smaller but honest: as part of [data quality](/t/data-quality) checks, a Benford departure flags feeds worth a closer look — new sources, rounding changes, or duplication — alongside [outliers](/t/outliers) review and [distribution shapes](/t/distribution-shapes), not instead of them. It is one lens for knowing what normal looks like before hunting for strange.
