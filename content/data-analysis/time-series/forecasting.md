---
title: "Forecasting"
summary: "Predicting future values from past patterns, with honest uncertainty."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["forecasting", "demand forecasting", "sales forecast"]
prereqs: ["time-series", "trend"]
related: ["time-series", "naive-forecast", "forecast-accuracy", "forecast-interval", "arima", "scenario-analysis"]
---

**Forecasting** predicts future values of a [time series](/t/time-series) from its history: next quarter's revenue, tomorrow's server load, next week's signups. Every method — from eyeballing the [trend](/t/trend) to [ARIMA](/t/arima) — is a bet that past patterns persist, plus machinery for turning that bet into numbers.

```text
history ──▶ model (trend + season + recent pace) ──▶ future values + uncertainty
```

The workflow matters more than the method. Start with a [naive forecast](/t/naive-forecast) as the baseline, add one model at a time, compare on held-out trailing data with a real accuracy measure ([forecast accuracy](/t/forecast-accuracy)), and ship [intervals](/t/forecast-interval), not just points. Most business forecasting failures are process failures — no baseline, no holdout, no uncertainty — not algorithm failures.

The classic mistakes:

- Forecasting what you should scenario-plan. A forecast answers "what will happen if patterns persist". A product launch, a price change, a competitor move breaks persistence — that needs [scenarios](/t/scenario-analysis), not extrapolation.
- Complexity before baseline. A neural net that barely beats naive on a holdout is a maintenance burden with no payoff. Earn complexity with measured gains.
- Point forecasts as commitments. A naked number becomes a promise the moment it leaves your laptop. Always attach the interval.
- One model forever. Series change shape — growth saturates, seasons shift, regimes break. Re-validate on recent data; retire models whose edge over naive vanished.

**When not to forecast:** when the decision does not need it (a range or a trigger level suffices), when history is too short or the world too changed, or when the honest answer is "we cannot know yet". A refused forecast beats a precise-looking fiction.
