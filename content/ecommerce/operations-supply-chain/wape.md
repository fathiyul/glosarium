---
title: "WAPE"
summary: "Weighted absolute percentage error — forecast accuracy that survives zero-sales SKUs and small volumes."
levels: { data-analyst: mid-level, data-scientist: mid-level }
aliases: ["WMAPE", "weighted MAPE"]
prereqs: ["mape"]
related: ["mape", "forecast-bias", "forecast-accuracy", "abc-xyz-analysis"]
---

WAPE = Σ|actual − forecast| ÷ Σ actual, summed over the window (and, usually, over SKUs in a class). It is [MAPE](/t/mape) with the denominator fixed at the *population* level instead of per-period — which kills MAPE's two classic failures in e-commerce demand: division-by-zero on the many zero-sales SKU-days of the long tail, and single-week blowups where a low-volume item forecasts 2 and sells 1, screaming "50% error" about a one-unit rounding accident.

```text
SKU-week:  actual 1, forecast 2   → MAPE 50%  (drama about one unit)
category-week: Σ|err| 60, Σ actual 4,000 → WAPE 1.5% (the truth)
```

The reading is demand-weighted: a 12% WAPE on an A-class hero is expensive noise; a 40% WAPE on a Z-class tail item that sells monthly is... also fine, because the absolute error is a handful of units — which is why WAPE should be *segmented by class* ([ABC/XYZ](/t/abc-xyz-analysis)) before anyone sets targets. Aggregate WAPE is the dashboard; per-SKU WAPE binned by class is the planning input.

The practice notes:

- **Bias is invisible in absolute error.** A model that over-forecasts 10% every week has a terrible [forecast bias](/t/forecast-bias) and a fine WAPE — always pair the two numbers (bias = Σ(forecast − actual) ÷ Σ actual, keep the sign).
- **Weight by value, not just volume**, when margin differs across SKUs — a unit miss on a Rp 5jt sofa and a Rp 20k phone case are different P&L events; unit WAPE answers the ops question (picking), value WAPE the finance one.
- **Reconcile horizons**: WAPE at 7-day and 30-day horizons describe different decisions (replenishment vs buying calendar); a model can "improve" by moving error between horizons.

When not to use: one-off launches with no comparable history (absolute error against a guess is theater — use judgmental ranges), and promo periods mixed into the baseline — campaign spikes dominate Σ|err| and hide the steady-state story. Score baseline and campaign weeks separately; the buyers live in different error worlds.
