---
title: "ARIMA"
summary: "A classical forecasting model combining autoregression, differencing and moving averages."
levels: { data-analyst: senior }
aliases: ["ARIMA", "autoregressive integrated moving average", "Box-Jenkins"]
prereqs: ["stationarity", "autocorrelation", "lag-features"]
related: ["stationarity", "autocorrelation", "exponential-smoothing", "forecast-accuracy"]
---

ARIMA forecasts a series from its own history through three ideas, one per letter: autoregression — predict from past values, i.e. [lags](/t/lag-features); integrated — difference the series until it is [stationary](/t/stationarity); moving average — correct using past forecast errors. The (p, d, q) order says how many of each: ARIMA(2,1,1) uses two lags, one differencing, one error term.

```text
ARIMA(p,d,q):  difference d times → predict from p lags + q past errors
```

ARIMA shines on short, stable, univariate series with clear short-term structure — the classic operations-forecasting workhorse. Its discipline is its value: checking stationarity, reading [autocorrelation](/t/autocorrelation) plots to choose orders, and validating on a holdout forces you to understand the series rather than throwing lags at it.

The classic mistakes:

- Fitting levels that trend. ARIMA needs stationarity; fitting raw trending data gives nonsense orders and drifting forecasts. Difference (or detrend) first, and verify.
- Order-picking by in-sample fit. More parameters always fit history better. Choose (p,d,q) by holdout error or an information criterion, not by how pretty the fitted line looks.
- Ignoring the residuals. If leftover errors still show structure (autocorrelation, season), the model missed something the data is still saying. Diagnose residuals; they are the model telling on itself.
- Univariate tunnel vision. ARIMA sees one series. Promotions, prices, holidays and campaigns need exogenous inputs (ARIMAX/regression hybrids) or [scenarios](/t/scenario-analysis) — a pure ARIMA will "learn" the promo effect as noise.
- Seasonality assumed away. Plain ARIMA has no seasonal machinery; seasonal data needs seasonal orders or explicit deseasonalising first.

**When not to use it:** long, rich, multi-driver problems (use regression with features), intermittent demand (use specialised methods), or any series where a [naive forecast](/t/naive-forecast) already wins on the holdout. ARIMA earns its keep on short-horizon, stable, single-series forecasts — measure it against naive before trusting it.
