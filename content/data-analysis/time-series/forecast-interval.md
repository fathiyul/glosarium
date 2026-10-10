---
title: "Forecast Interval"
summary: "A range around a forecast saying how uncertain it is."
levels: { data-analyst: mid-level }
aliases: ["forecast interval", "prediction interval", "forecast band"]
prereqs: ["forecasting", "confidence-interval"]
related: ["forecasting", "forecast-accuracy", "confidence-interval", "scenario-analysis"]
---

A **forecast interval** puts a band around a point forecast: "Q3 revenue $4.2M, with an 80% interval of $3.6M–$4.9M". The point is the best single guess; the interval says how much to trust it. A forecast without an interval invites being read as a promise; with one, it reads as planning information — which is what it is.

```text
point forecast:  $4.2M
80% interval:    $3.6M ––––––– $4.9M     (plan the range, not the point)
```

Intervals widen with horizon — next week is narrower than next year — and with volatility. That widening is information, not failure: it tells planning how much buffer each horizon needs.

The classic mistakes:

- Shipping points without bands. A naked $4.2M gets committed to; a band gets discussed. The interval is what makes a forecast usable for decisions under uncertainty.
- Reading it as a [confidence interval](/t/confidence-interval) for the mean. A forecast interval covers a *future observation*, including irreducible noise — it is wider than an interval for the average, and the two answer different questions.
- Symmetric bands on skewed outcomes. Revenue cannot go below zero but can surprise upward; symmetric ± bands misstate both tails. Shape the interval to the outcome's distribution.
- Intervals from one model, treated as truth. The band quantifies the model's uncertainty, not model error — if the model is wrong about the world, the band is precisely wrong. Stress with [scenarios](/t/scenario-analysis) too.

**How to use them:** plan to the interval (staff to the low end, hope for the high end), and judge a forecaster by calibration — do about 80% of outcomes really land inside the 80% bands? See [forecast accuracy](/t/forecast-accuracy).
