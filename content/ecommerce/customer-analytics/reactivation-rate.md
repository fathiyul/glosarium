---
title: "Reactivation Rate"
summary: "Share of lapsed customers a win-back campaign brings back — and the honest math of whether that's cheap."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["winback rate", "re-engagement rate"]
prereqs: ["second-purchase-rate"]
related: ["revenue-at-risk", "second-purchase-rate", "holdback-group", "incremental-revenue"]
---

Reactivation rate = lapsed customers who buy again within a campaign window ÷ lapsed customers contacted. It makes win-back campaigns legible — *but* its two denominators hide a trap each: contact only the reachable (deliverable email, active app), and a huge share of "reactivation" is whoever would have come back anyway.

```text
10,000 contacted, 30-day window:
  raw reactivation      4%  (400 bought)
  holdout baseline      2.6% bought back unprompted
  INCREMENTAL lift      1.4% — the campaign's real yield
```

The holdout ([holdback group](/t/holdback-group)) is not optional for honest numbers: dormant-customer pools are surprisingly bouncy — season needs, payday, natural reorder cycles — and a win-back "success" without a baseline is usually [incremental revenue](/t/incremental-revenue) fiction with a discount attached.

The economics decide whether the number matters: a reactivated customer's margin in the following year ([reactivated-cohort CLV](/t/predictive-clv)) against campaign cost (discount depth × the 1.4% who *only* came for it + list fatigue + [unsubscribe cost](/t/unsubscribe-rate)). Two findings repeat everywhere: reactivation from deep lapsed (>12 months) is rarely worth a discount, and *early* lapses — a [second-purchase-rate](/t/second-purchase-rate) window of weeks, not quarters — respond to *nudge-level* cost or better: the cheapest win-back is not winning back.

Segment before ranking, because the pool is heterogeneous: [RFM](/t/rfm-analysis) high-frequency/low-recency (routine broke — timing messages work), one-order-promo-buyer (came for the deal — re-offering trains them further), COD-only lapsed (trust or logistics issue — discount does not fix it). And a founder's framing: reactivation revenue is the same revenue [CAC](/t/cac) buys, minus the discovery cost — treat it as the second engine of the growth plan, sized by the pool of lapses × observed incremental rate, not by email volume.
