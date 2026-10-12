---
title: "Lag Features"
summary: "Using past values of a series as inputs to predict its future."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["lag features", "lagged variables", "autoregressive features"]
prereqs: ["time-series", "forecasting"]
related: ["autocorrelation", "arima", "stationarity", "regression-analysis"]
---

A **lag feature** is a past value of a series used as an input: yesterday's sales predicts today's, last week's same-day value predicts this week's. Most time-series models are built from lags — "the future looks like a function of the recent past" — so choosing which lags to include is choosing what memory the model has.

```text
predict sales[t] from:  sales[t-1], sales[t-7], sales[t-364]
                         (yesterday) (last week) (last year, same date)
```

Which lags matter is an empirical question answered by [autocorrelation](/t/autocorrelation): lags with strong correlation to the present carry signal; the rest add noise and overfitting. Calendar lags (7, 30, 364) encode weekly and yearly seasons without any seasonal machinery.

The classic mistakes:

- Leaking the future. A lag of zero, a same-day aggregate that includes the target hour, or a "lag" computed after sorting incorrectly — all let the model peek. Lags must strictly precede the prediction point in event time.
- Too many lags. Fifty lags on a short series fit noise beautifully and forecast terribly. Select by autocorrelation and validate on held-out trailing data.
- Ignoring regime breaks. Lags assume the past resembles the future. After a redesign, a price change or a pandemic, old lags describe a world that no longer exists — re-examine them.
- Non-[stationary](/t/stationarity) levels as raw lags. A trending series makes every lag look predictive (everything correlates with time). Difference or detrend first.

**When not to use them:** when the driver is external and known — a planned promotion, a holiday calendar, a price change. Lags capture momentum; known future events need explicit features, not history.
