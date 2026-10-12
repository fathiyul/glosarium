---
title: "Unpaid Order Rate"
summary: "Orders created, never paid — the checkout's silent leak between intent and money."
levels: { data-analyst: junior }
aliases: ["payment abandonment", "expired orders", "pending payment rate"]
prereqs: []
related: ["payment-method-mix", "cart-abandonment-rate", "conversion-rate", "cash-on-delivery"]
---

Unpaid order rate = orders that expired without payment ÷ orders created. It is the checkout's *middle* loss — after the cart [converted](/t/conversion-rate) to an order, before money moved — and it hides in plain sight because the order *exists* in GMV reports until it quietly dies in the payment queue.

```text
orders by method → unpaid at 24h expiry:
  bank VA    11%   (generated, never transferred)
  e-wallet    4%   (token/session failures)
  card        6%   (3DS dropout)
  COD         0%   (no payment step — the risk moved to the doorstep)
```

That table *is* the metric's purpose: each method fails differently. VA abandonment is friction-and-intent (a code generated "to check total," a transfer that never happened); wallet/card failures split into *technical* (redirect dropped, session expired, bank switch down — an uptime story owned by the [gateway](/t/payment-gateway) integration) and *behavioral* (price sticker-shock at the bank app, where the order total is finally *real*). COD shows zero here by definition — which is precisely why unpaid-rate must be read *with* [COD rejection](/t/cod-rejection-rate): stores that pushed prepaid payments cut this metric and grew the other.

The operational loops it feeds: **inventory holds** (unpaid VA orders hold stock until expiry — long windows convert curiosity into stockouts; short ones lose late payers: the expiry length is a conversion-vs-availability dial, and the two rates are the evidence), and **retry capture** (a payment-failed customer with a "complete your payment" reminder converts at a real percentage — this cohort is the highest-ROI message in the flow; measure it as a [funnel step](/t/funnel-analysis), not a hunch).

Analyst hygiene: define the expiry clock per method (VA 24h, card 1h, wallet 30min), exclude *intentionally* unpaid (test orders, cancelled-by-buyer before payment — those are [cancellations](/t/cancellation-rate)), and mature the window before reporting — an order created at 23:50 is "unpaid" to every dashboard for a day of its natural life.
