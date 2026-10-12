---
title: "Root Mean Squared Error"
summary: "Forecast error that punishes big misses more than small ones."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["RMSE", "root mean squared error", "root mean square error"]
prereqs: ["forecast-accuracy", "statistical-variance"]
related: ["forecast-accuracy", "mape", "naive-forecast", "outliers"]
---

**RMSE** is the square root of the average squared forecast error. Squaring before averaging means a single huge miss counts more than many small ones — an error of 10 contributes 100 times what an error of 1 does, before the root brings the units back to the original scale ("off by $4.2K on average, big misses weighted heavily").

```text
errors: 1, 2, 1, 10  →  mean |err| = 3.5,  RMSE = √(1+4+1+100)/4 ≈ 5.1
                              (the 10 dominates RMSE, barely moves the mean)
```

Use RMSE when big misses are disproportionately costly — stockouts, capacity breaches, cash shortfalls. Use a plain average error ([MAPE](/t/mape)) when all misses cost roughly in proportion. The choice encodes how much you fear the tail.

The classic mistakes:

- RMSE on data with [outliers](/t/outliers) you do not care about. One data glitch dominates the score and model selection chases it. Clean or winsorise first, then measure.
- Comparing RMSE across different series. Its units are the series' units — an RMSE of 50 is great for revenue in thousands and terrible for conversion rates. Compare models on the same series, or scale first.
- Forgetting the root. Reporting MSE (squared units, "square-dollars") to stakeholders is meaningless. Take the root so the number reads in real units.
- No baseline. Like every accuracy number, RMSE needs the [naive forecast's](/t/naive-forecast) value beside it to mean anything — see [forecast accuracy](/t/forecast-accuracy).
