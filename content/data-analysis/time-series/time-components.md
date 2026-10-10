---
title: "Trend, Seasonality and Noise"
summary: "Splitting a series into direction, repeating pattern and leftover."
levels: { data-analyst: mid-level }
aliases: ["time series decomposition", "trend-seasonality-noise", "decomposing a series"]
prereqs: ["time-series", "trend", "seasonality"]
related: ["trend", "seasonality", "moving-average", "stationarity"]
---

Every [time series](/t/time-series) can be read as three layers added together: the slow **trend** (direction), the repeating **seasonality** (calendar pattern), and the leftover **noise** (everything else). Splitting a series this way — decomposition — turns "sales went up" into three answerable questions: did the direction change, was it the season, or was it a one-off?

```text
observed  =  trend  +  season  +  noise
  120     =    100   +    25    +   (-5)
```

In practice the split is approximate: smooth the series for the trend, average each calendar position for the season, and whatever remains is noise. The value is not precision but attribution — each layer gets judged on its own terms instead of all three arguing inside one number.

The classic mistakes:

- Reading the raw series as one story. A December record with a flat trend is a seasonal success and a strategic flatline at once. Decompose before judging.
- Treating noise as signal. A single odd week is usually leftover, not a break. Reacting to noise with strategy changes is expensive churn.
- Assuming the layers are independent. Promotions (noise by design) can pull forward seasonal demand; a trend break can look like a seasonal shift. The split organises thinking; it does not prove the layers never interact.
- Over-smoothing the trend. An over-aggressive smoother bends the trend toward the season and hides real breaks. Keep the trend flexible enough to turn.

**When to go further:** models like [exponential smoothing](/t/exponential-smoothing) and [ARIMA](/t/arima) formalise this split to forecast. For reading and explaining a series, the informal three-layer split is usually enough.
