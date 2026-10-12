---
title: "E-commerce Fraud Rate"
summary: "Share of orders that are not what they claim to be — measured against acceptance, not against hope."
levels: { data-analyst: mid-level, data-scientist: mid-level }
aliases: ["fraud rate", "order fraud", "e-commerce fraud"]
prereqs: []
related: ["fraud-loss", "chargeback-rate", "promo-abuse", "cod-rejection-rate"]
---

Fraud rate = confirmed-fraudulent orders ÷ total orders (value-weighted is the honest companion — fraud concentrates in expensive baskets). "Confirmed" is the hard part: fraud is discovered with a lag (chargebacks arrive 30–90 days later, COD refusals at delivery, promo abuse at the third account from the same device), so a *maturity window* is part of the definition — today's fraud rate is last month's, or it's an extrapolation dressed as a measurement.

```text
by payment method, 90-day matured:
  prepaid card     0.6%   (classic stolen-card)
  e-wallet/VA      0.2%   (phone verification does its job)
  COD              1.1%*  *intent-fraud — refusal pattern, not card theft
  BNPL             2.4%   (new-account stacking, see bnpl-default-rate)
```

The taxonomy decides the toolset: **account takeover** (real buyer, wrong person — velocity + device fingerprint), **friendly fraud** (the buyer is the fraud — chargeback-after-receipt, concentrated in digital goods), **card testing** (tiny amounts, massive attempts), and **first-party abuse** (the COD-refusal serial, the return-fraud, the voucher farm — see [promo abuse](/t/promo-abuse)). Blended fraud rates average four different crimes into one number nobody can act on; report per *mechanism*.

The detection-economics frame that must accompany the rate: every blocking rule trades fraud avoided against [false positives](/t/input-validation) — good orders declined are *revenue lost plus a customer insulted at a high [CAC](/t/cac)*. The frontier curve (decline-rate vs fraud-caught) is how risk teams earn budget; a fraud rate that fell while accepted revenue fell more is a warning, not a win.

The Indonesian context: COD dominates first orders for many stores, so fraud-rate-by-payment-method *is* your channel mix report ([payment method mix](/t/payment-method-mix)) — and COD risk is mostly refusal economics ([fake-COD orders](/t/fake-cod-order)), a behavioral problem with credit-check-like solutions: history, address quality, device signals.

When not to obsess: micro-transactions (a Rp 15k basket isn't worth a decline), and new-market entry where over-strict rules throttle the very acquisition you're paying for — set segment-specific tolerance, reviewed with the [fraud-loss](/t/fraud-loss) numbers.
