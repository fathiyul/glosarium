---
title: "Forecast Bias"
summary: "Whether your forecasts are systematically high or low — the direction WAPE and MAPE refuse to show."
levels: { data-analyst: mid-level, data-scientist: mid-level }
aliases: ["bias", "forecast bias", "over/under-forecasting"]
prereqs: []
related: ["wape", "mape", "forecast-accuracy", "safety-stock"]
---

Forecast bias = Σ(forecast − actual) ÷ Σ actual, signed. Positive = the system consistently buys/plan-over reality (excess inventory downstream); negative = it consistently under-forecasts (stockouts and lost sales). Accuracy metrics like [WAPE](/t/wape) fold the errors together; bias separates them — and the two failure directions have opposite remedies.

```text
bias +12% over 8 weeks → every safety-stock and PO carries 12% of hope
   → check: promo cannibalization assumed? pull-forward not subtracted?
   → check: new-supplier orders anchored to launch-week velocity?
bias −9% → chronically hungry shelves
   → check: stockouts censoring the history (you're modeling demand
            you could sell, not demand that existed — see
            [stock-out rate](/t/stock-out-rate) as the hidden tax)
```

Bias compounds through the planning chain in a way random error doesn't: a steady +15% over-forecast is 15% of every order cycle parked as future [dead stock](/t/dead-stock), and finance discovers it a quarter late as a markdown event. Random error of the same magnitude mostly averages into buffer ([safety stock](/t/safety-stock) exists for that); *bias eats the buffer on purpose*.

Where bias hides, in order of how often analysts find it there:

1. **Censored demand** — historical sales < true demand wherever you were out of stock; the model learns the shortfall and plans it again next year. Demand-unconstrained history is the standard correction.
2. **Promo contamination** — campaign weeks left in the baseline (the forecast "correctly" predicts a promo that isn't scheduled) or stripped too aggressively from everything.
3. **New-product anchoring** — launch velocity treated as permanent rate, then the decay surprises the reorder logic.
4. **Return/net confusion** — grossed forecasts netted late (COD rejects returning to stock re-enter the "demand" line).

Track bias by *segment and horizon* (A-items vs tail, 7-day vs 30-day), and report it as a signed trend line — a bias that drifts toward zero after a process change is the change working; bias averaged across a whole catalog averages itself to zero.

When bias is *acceptable*: deliberate — a strategic buffer that always orders +10% on sole-source imports is policy, not error. Label policy separately or the metric becomes a negotiation instead of a measurement.
