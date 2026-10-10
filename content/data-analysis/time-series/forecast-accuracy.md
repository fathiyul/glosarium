---
title: "Forecast Accuracy"
summary: "Judging forecasts on held-out data, against a baseline."
levels: { data-analyst: senior }
aliases: ["forecast accuracy", "forecast evaluation", "backtesting"]
prereqs: ["forecasting", "naive-forecast"]
related: ["mape", "rmse", "naive-forecast", "forecast-interval"]
---

A forecast is only as good as its error on data it never saw. **Forecast accuracy** is the discipline of measuring that: hold out trailing history, generate the forecast a model would have made at each point, score the errors ([MAPE](/t/mape), [RMSE](/t/rmse)), and compare against the [naive baseline](/t/naive-forecast). Everything else — in-sample fit, elegance, stakeholder enthusiasm — is not evidence.

```text
history:  [ fit here ............ | test here: naive vs model, scored ]
                                 (rolling origin: repeat at several cutoffs)
```

One holdout can lie (an easy stretch flatters, a weird one condemns), so roll the origin: cut at several points, score each, average. And score the decision, not just the number — a model with slightly worse MAPE but calibrated [intervals](/t/forecast-interval) beats a sharper point forecast with no uncertainty for planning purposes.

The classic mistakes:

- In-sample accuracy as the headline. Fitted error always flatters complex models. Report holdout error; mention fit only as a diagnostic.
- No baseline. An error number without naive beside it cannot be read. "MAPE 6%" might be brilliant or embarrassing depending on what "same as last time" scores.
- Leakage in the holdout. Features, scalers or seasonal factors computed over the full history smuggle the future into training. Build every input strictly from pre-cutoff data.
- One metric, one window. Different errors ([MAPE](/t/mape) vs [RMSE](/t/rmse)) crown different winners, and one calm window hides fragility. Score several measures across several origins.
- Accuracy without calibration. Point error says nothing about whether the intervals mean what they claim. Check coverage too.

**The rule:** no holdout, no claim. A forecast that has never been tested on unseen data is a hypothesis with a chart, and should be presented as one.
