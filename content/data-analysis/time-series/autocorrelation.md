---
title: "Autocorrelation"
summary: "How much a series resembles its own past, at each lag."
levels: { data-analyst: senior , data-scientist: junior }
aliases: ["autocorrelation", "ACF", "serial correlation"]
prereqs: ["time-series", "correlation-coefficient"]
related: ["lag-features", "arima", "stationarity", "seasonality"]
---

**Autocorrelation** measures how much a series correlates with itself shifted by k periods, for each lag k. Plot those correlations (the ACF plot) and the series describes its own memory: a slow decay means momentum, spikes at lags 7 or 12 mean weekly or yearly [seasonality](/t/seasonality), a cliff after lag 2 means only the recent past matters.

```text
ACF:  lag1 ████████  lag2 ██████  lag7 ████████  lag14 ██████  rest ▫
read:  short memory + strong weekly season (spikes at 7, 14)
```

It is the diagnostic behind half of time-series modelling: which [lags](/t/lag-features) to include, whether [differencing](/t/stationarity) worked (residual autocorrelation means no), and whether a fitted model's leftovers still contain structure.

The classic mistakes:

- Reading correlation on trending levels. Two trending series correlate with their own past trivially — everything goes up together. Check autocorrelation on stationary (differenced) data, or the plot flatters every lag.
- Confusing it with cross-correlation. Autocorrelation is a series versus itself; relating two different series is a different computation with different traps (shared trends inflate both).
- Ignoring the confidence bands. Small autocorrelations are noise; the plot's bands say which spikes clear chance. Do not build lags on sub-band wiggles.
- One ACF for a changing series. Memory structure shifts across regimes. A single full-history ACF averages distinct behaviours; window it when the world changed mid-history.

**How to use it:** ACF first, model second. Let the plot nominate lags and seasons, fit, then ACF the residuals — a good model leaves leftovers with no memory. See [ARIMA](/t/arima) for the machinery that consumes this diagnosis.
