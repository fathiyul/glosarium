---
title: "Exponential Smoothing"
summary: "Forecasting by weighting recent history more than old history."
levels: { data-analyst: senior }
aliases: ["exponential smoothing", "Holt-Winters", "ETS", "simple exponential smoothing"]
prereqs: ["moving-average", "time-components"]
related: ["moving-average", "arima", "seasonality", "forecast-accuracy"]
---

**Exponential smoothing** forecasts by averaging history with weights that decay exponentially — yesterday matters more than last month, which matters more than last year. One parameter sets how fast the past is forgotten; extensions add [trend](/t/trend) and [seasonality](/t/seasonality) components (Holt-Winters), each with its own decay rate.

```text
forecast = α·latest + (1-α)·previous forecast        (0 < α < 1)
α near 1:  chases every wiggle (nervous)    α near 0:  slow, stable (sluggish)
```

It is the pragmatic middle between a [moving average](/t/moving-average) and [ARIMA](/t/arima): adaptive like the former (it tracks level shifts automatically), principled enough to carry trend and season, and simple enough to explain to stakeholders and maintain across thousands of series — which is why it still runs half the world's inventory and demand forecasts.

The classic mistakes:

- One α for every series. Fast-moving SKUs and slow staples need different memory. Fit per series (or per group), or the parameter is a compromise that suits nothing.
- Smoothing through structural breaks. A price change or stockout enters the average and pollutes forecasts for months. Detect breaks and reset the level rather than letting the smoother digest them slowly.
- No intervals. Like every point method, it needs an uncertainty band to be decision-grade — see [forecast intervals](/t/forecast-interval).
- Seasonality assumed, not checked. Holt-Winters with a seasonal component on non-seasonal data fits noise seasonally. Verify the season exists ([seasonality](/t/seasonality)) before paying for it.
- Judging by fit, not holdout. Smoothing always looks good in-sample. Compare against [naive](/t/naive-forecast) on held-out trailing data (see [forecast accuracy](/t/forecast-accuracy)).

**When not to use it:** series driven by known external events (promotions, holidays as regressors beat pure smoothing), intermittent demand (needs specialised methods), or very short history (there is nothing to decay from — use naive or pooling).
