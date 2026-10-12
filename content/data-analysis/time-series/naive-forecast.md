---
title: "Naive Forecast"
summary: "Predicting 'same as last time' — the baseline every model must beat."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["naive forecast", "persistence forecast", "no-change forecast"]
prereqs: ["forecasting", "time-series"]
related: ["forecasting", "moving-average", "forecast-accuracy", "seasonality"]
---

A **naive forecast** predicts that the next value equals the last one — tomorrow's sales equal today's, next month equals this month. The seasonal version predicts "same as the matching period last year". It is the simplest possible forecast, and its job is to be the baseline: any fancier method has to prove it beats naive before it earns its complexity.

```text
actual:    102  98  105  101
naive:          102  98  105  101   (each prediction = previous actual)
```

Naive is embarrassingly hard to beat on stable, noisy series. A sophisticated model that cannot outperform "same as last time" on held-out data is not ready — it is overfit, mis-specified, or solving a problem with no signal. Teams that skip the baseline end up shipping complexity that adds nothing.

The classic mistakes:

- No baseline at all. Judging a model by its error in isolation, with nothing to compare against. Always run naive first; it takes one line.
- Wrong naive for seasonal data. On strongly seasonal series, plain naive ("last period") loses to seasonal naive ("same period last year"). Match the baseline to the series' shape.
- Beating naive in-sample only. A model fitted and tested on the same history will beat naive trivially and fail live. Compare on data the model never saw (see [forecast accuracy](/t/forecast-accuracy)).

Naive forecasts also make good placeholders: ship the naive number while the real model is built, and keep it running forever as a tripwire — if the fancy model ever drops below naive, something regressed.
