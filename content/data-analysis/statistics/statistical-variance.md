---
title: "Variance and Standard Deviation"
summary: "How spread out numbers are, and why the average alone misleads."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["variance", "standard deviation", "spread", "dispersion"]
prereqs: ["descriptive-statistics", "central-tendency"]
related: ["standard-deviation", "central-tendency", "outliers", "confidence-interval"]
---

**Variance** measures how far numbers spread around their average: the mean of squared deviations from the mean. Its square root, the **standard deviation**, puts the spread back in original units — "average order $40, typically ±$35" tells you the business lives on variability that the average alone hides.

```text
team A deals: 38, 40, 42  → mean 40, sd ≈ 2   (predictable)
team B deals:  5, 40, 75  → mean 40, sd ≈ 35  (same average, different business)
```

Same mean, different worlds: one team to forecast, the other to investigate. Whenever two groups share an average, the spread is where the story went.

The classic mistakes:

- Reporting the centre without the spread. A mean forecast with no variability band is a promise the data never made. Quote both, always.
- Treating standard deviation as the error of the mean. Spread of the data (sd) and precision of the average ([standard error](/t/standard-error)) shrink differently with sample size — confusing them overstates what big samples prove about individuals.
- Assuming symmetry. "Mean ± 2 sd covers ~95%" holds for bell-shaped data only. On skewed data (incomes, latencies, deal sizes) it misstates both tails — check the shape ([distribution shapes](/t/distribution-shapes)) before quoting bands.
- Comparing variances across different scales. A sd of $35 means opposite things for $40 and $4,000 averages. Compare relative spread (sd ÷ mean) across scales, absolute within one.
- Letting [outliers](/t/outliers) set the spread. A few extreme values inflate variance enormously since deviations are squared. Inspect the tails before trusting the number.

**The habit:** never let an average travel alone. Centre plus spread plus shape is the minimum honest description of any batch of numbers — see [confidence intervals](/t/confidence-interval) for what the spread implies about estimates.
