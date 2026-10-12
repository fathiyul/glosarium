---
title: "Winsorization"
summary: "Taming outliers by capping instead of dropping."
levels: { data-analyst: mid-level , data-scientist: mid-level }
---

Winsorization tames outliers by *capping* them instead of dropping them: pick percentiles — commonly the 1st and 99th — and replace every value below or above with the boundary value. The dataset keeps its size and the bulk of its shape; the tails stop dominating totals.

Analysts meet it in money and behavior data where a handful of whales skew the average: revenue-per-account, order values, session lengths. A single $4M enterprise contract can make "average customer value" describe nobody. Capping at the 99th percentile lets the mean reflect the typical customer again — and unlike deletion, nothing silently disappears, which is the point.

Data scientists use it in factor and score work, where extreme raw values overwhelm [standard deviation](/t/standard-deviation)-scaled features; a winsorized z-score stops one freak observation from moving everyone's normalization.

The honest trade-offs start with the fact that winsorization changes what the data means. The capped values are not real measurements: revenue capped at $500K undercounts actual revenue, and any sum, forecast, or cost model built on it inherits that understatement — label the capped column as a modeling artifact, never "revenue." It also does nothing about *errors*: a $4M entry that should be $4K is not an outlier, it is a bug, and winsorizing hides it instead of fixing it ([outliers](/t/outliers) worth investigating deserve a lookup first).

When not to use it: whenever the tail is the subject. Churn-risk, fraud, capacity planning and [long-tail](/t/long-tail-distribution) revenue all live exactly where winsorization clips; for those questions, model the tail or report [percentiles](/t/percentile) — don't amputate it for tidiness.

The reporting habit that keeps it clean: state the cutoff percentiles, how much mass was capped, and show the key metric both raw and winsorized, so nobody forgets the surgery happened.
