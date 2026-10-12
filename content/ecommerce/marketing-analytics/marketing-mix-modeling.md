---
title: "Marketing Mix Modeling (MMM)"
summary: "Regression on aggregated spend and sales over time — budget allocation when individual experiments can't run."
levels: { data-analyst: senior, data-scientist: mid-level }
aliases: ["MMM", "media mix modeling", "media modeling"]
prereqs: ["attribution"]
related: ["attribution", "marketing-efficiency-ratio", "incremental-revenue", "forecasting"]
---

Marketing mix modeling regresses total sales on spend across channels over weeks/months, plus controls for price, seasonality and promotions, to estimate each channel's contribution curve. Its value: it works where user-level [A/B tests](/t/ab-testing) cannot — TV, radio, billboards, whole-platform spend — and it sees the *interaction* between paid and organic that attribution hides by construction (attribution splits credit within paths; MMM estimates the effect of moving the budget line).

```text
weekly model sketch:
sales = base
      + f(search spend) + f(social spend) + f(TV spend) + ...
      + price effect + holiday effects + error
f() = saturating curves (diminishing returns per channel)
    + adstock (this week's click lags into future weeks)
```

The two structural assumptions bite: spend must have varied enough, non-strategically, to identify effects (if the team always buys social in growth months, the model learns "social = growth" — collinearity, and no coefficient escapes it); and the media landscape hides within-platform shifts (the same TikTok spend bought different audiences quarter to quarter). MMM gives allocation *directions*, never decimal confidence — treat its channel curves as priors that quarterly holdout tests update ([incremental revenue](/t/incremental-revenue)).

Open-source implementations exist and lower the old agency-cost barrier (Meta's Robyn, Google's Meridian among them) — but tooling does not fix identification: garbage variation in, garbage curves out.

Data scientists: budget the time-series plumbing — autocorrelated errors, holiday effects that swamp channel signal in a [double-date](/t/revenue-decomposition) market like Indonesian e-commerce, and the calibration problem everyone under-discusses: MMM coefficients should be anchored to experiment results where overlap exists (paid social, search); a model never validated against a lift test is a story with R².

Senior analysts: the meeting use is the *shape* — where saturation starts, which channels' marginal [MER](/t/marketing-efficiency-ratio) contribution is flat at current budget — presented as ranges and scenarios, not "the model says cut TV 30%".
