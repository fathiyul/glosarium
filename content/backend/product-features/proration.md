---
title: "Proration"
summary: "Charging fairly when a customer changes plans mid-cycle."
levels: { backend: senior }
aliases: ["proration", "prorated charge", "pro-rata billing"]
prereqs: ["subscription-billing", "invoices-receipts"]
related: ["subscription-billing", "invoices-receipts", "coupons-discounts", "multi-currency"]
---

**Proration** computes the partial charge or credit when a subscription changes **mid-cycle**: a customer upgrades on day 10 of a 30-day month, so they should be credited for the unused 20 days of the old plan and charged the pro-rated 20 days of the new one. Proration is how billing stays fair and accurate across plan changes.

```text
day 10 of 30: upgrade $10 → $30
  credit unused old:  20/30 × $10 = $6.67
  charge new period:  20/30 × $30 = $20.00
  net charge now:     $13.33
```

The calculation must be explicit about: the period boundaries, the fraction used, the direction (charge or credit), where rounding happens, and how it appears on the [invoice](/t/invoices-receipts).

The classic mistakes:

- No proration. Charging the full new price and ignoring unused time overcharges the customer; ignoring the new charge gives away service. Either way, it's wrong.
- Inconsistent rounding. Rounding each line vs the total, or rounding half-up vs down, produces different totals and can leave the invoice and the charge mismatched (see [multi-currency](/t/multi-currency) for money arithmetic). Fix a policy and apply it everywhere.
- Wrong period boundaries. Proration depends on exact cycle dates and lengths; time-zone and month-length errors shift the amount (see [timezone](/t/timezone)).
- Ignoring discounts and tax. A proration must account for any [coupon](/t/coupons-discounts) on the plan and the applicable [tax](/t/sales-tax-vat); computing it on the gross price only is incorrect.
- Downgrade handling. A downgrade produces a credit, not a charge; credits must be tracked (against future invoices) and not lost.
- Mismatch with the gateway. The billing provider may compute proration itself; if you also compute it, they must agree, or invoices and charges diverge (see [payments integration](/t/payment-integration)).
- No idempotency. Retried plan changes can prorate twice; make the change idempotent (see [idempotency key](/t/idempotency-key)).
- Not explaining it on the invoice. A sudden "net charge" confuses customers; itemise the credit and charge so it's clear.

**How to implement it:** define cycle boundaries and a rounding policy, compute credit-for-unused-old plus charge-for-remaining-new, apply discounts and tax, record it on the invoice, and keep it consistent with the payment gateway. It's a small calculation with financial and trust consequences — clarity and consistency matter as much as the arithmetic. See [subscription billing](/t/subscription-billing).
