---
title: "Chargeback Rate"
summary: "Reversals claimed through the card network — the fraud signal that also threatens your ability to accept cards at all."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["dispute rate", "payment dispute rate"]
prereqs: []
related: ["fraud-rate", "fraud-loss", "payment-method-mix", "customer-success"]
---

Chargeback rate = chargebacks ÷ card transactions (or card volume, value-weighted) in a rolling window. It is the one fraud metric with *external* enforcement: card networks maintain monitoring programs with thresholds that, once crossed, trigger escalating penalties, mandatory remediation programs, and in the worst case loss of card-acceptance ability. Visa/Mastercard's thresholds and programs change — the risk team must know the current numbers for the market and acquirer; the analytics team's job is keeping the *measured* rate honest and the trend legible.

The composition analysis is the whole craft, because the rate blends two different failures:

```text
chargebacks, 90d window:
  true fraud (card not present, stolen)      35%
  "item not received / not as described"     55%   ← product & logistics signal!
  friendly fraud (received, but disputed)    10%
```

The middle bucket is the store's own problem arriving through the bank: [damaged delivery](/t/courier-performance), unmet expectations, [slow refund processing](/t/resolution-time) — customers dispute when the dispute button is faster than the refund. Reading chargebacks as "risk's number" and not routing the product-related ones to merchandising and logistics is how stores re-solve the same dispute forever.

The operational loop: **representment** (submitting delivery proof — signature, tracking-completed, device logs — reverses a large share of "not received" cases, and the evidence must be captured at fulfillment time, not reconstructed after the dispute), and **alert routing** (early-warning networks flag disputes before they become chargebacks; minutes of response time convert loss into recovery).

The trend hygiene: rolling 60–120-day windows (single-month spikes are network-timing artifacts as much as fraud events), value-weighting (one phone's chargeback outweighs fifty stickers), and *never* celebrate suppressing the rate by fighting only the easy cases — the network measures your *ratio*, and analytics that game the denominator will get you in the monitoring program, not out of it.
