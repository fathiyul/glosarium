---
title: "Stationarity"
summary: "When a series' statistical behaviour doesn't drift over time."
levels: { data-analyst: senior }
aliases: ["stationarity", "stationary series", "weak stationarity"]
prereqs: ["time-series", "trend"]
related: ["arima", "autocorrelation", "trend", "time-series"]
---

A series is **stationary** when its average level, variability and correlations stay roughly constant over time — no [trend](/t/trend), no widening swings, no changing seasons. Most classical forecasting machinery ([ARIMA](/t/arima), and the theory behind [autocorrelation](/t/autocorrelation) plots) assumes it, which is why non-stationary data must be transformed first, usually by differencing: model the day-to-day *changes* instead of the levels.

```text
levels (trending):     / / / / /      → not stationary
day-to-day changes:    ~ ~ ~ ~ ~      → roughly stationary, modellable
```

Differencing is not free information — it discards the level to stabilise the dynamics. Difference twice and you are modelling noise-of-noise. Transform the minimum needed (one difference, a log for stabilising variance), and check the result rather than assuming.

The classic mistakes:

- Modelling raw trending levels. Autocorrelations near 1.0 at every lag, regressions with sky-high R² between unrelated trending series (spurious regression), forecasts that extrapolate drift forever. Difference first.
- Over-differencing. Each difference injects noise and erases long-run information. If one difference stabilises it, stop.
- Assuming variance is stable. Level-stationary with exploding variance (common in growth data) still violates the machinery. Logs or explicit volatility handling come before modelling.
- Unit-root tests as oracles. Statistical tests for stationarity have weak power on short series and break under structural shifts. Plot the series and its differences; let the tests confirm, not decide.
- Forgetting why it matters. Stationarity is not a ritual — it is the condition under which "patterns in the past describe the future" is mathematically licensed. Without it, every fitted pattern is suspect.

**The working rule:** plot, difference the minimum that stabilises, verify the differences look stable, then model. See [time series](/t/time-series) for why order makes all of this load-bearing.
