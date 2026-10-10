---
title: "Mean Absolute Percentage Error"
summary: "Forecast error as a percentage, and where it misleads."
levels: { data-analyst: mid-level }
aliases: ["MAPE", "mean absolute percentage error", "percentage error"]
prereqs: ["forecast-accuracy", "forecasting"]
related: ["forecast-accuracy", "rmse", "naive-forecast"]
---

**MAPE** expresses forecast error as a percentage: the average of |actual − forecast| / |actual|, times 100. "Off by 8% on average" is immediately meaningful to stakeholders in a way that raw error units never are, which is why MAPE dominates business forecasting conversations.

```text
actual 100, forecast 110  →  |100-110|/100 = 10%
MAPE = average of those percentages (e.g. 8% across the period)
```

Its convenience hides two asymmetries. Dividing by the actual punishes errors unevenly: over-forecasts are capped at 100% per period only in the extreme, while under-forecasts are bounded — and when actuals are near zero, tiny absolute misses become enormous percentages. MAPE also treats a 10% miss on a huge month the same as on a tiny one, even though the money differs wildly.

The classic mistakes:

- MAPE on intermittent or near-zero series. Spare-parts demand, new products, thin days — percentages explode and the metric becomes noise. Use a scaled or absolute measure there instead.
- Averaging percentages across different scales. A 5% miss on the flagship product dwarfs a 20% miss on a minor one. Weight by volume, or report [RMSE](/t/rmse) alongside.
- Optimising MAPE blindly. Minimising percentage error favours under-forecasting (a forecast of zero can never exceed 100% error on one side). Check the bias, not just the average.
- No baseline. "MAPE 8%" means nothing without the [naive forecast's](/t/naive-forecast) MAPE beside it.

**When to use it:** communicating accuracy on stable, non-zero series where percentages read naturally. Pair it with a scale-aware measure and always show the baseline — see [forecast accuracy](/t/forecast-accuracy).
