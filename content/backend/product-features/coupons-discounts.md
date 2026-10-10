---
title: "Coupons and Discounts"
summary: "Promotions without letting them stack or be abused."
levels: { backend: mid-level , tech-entrepreneur: pmf }
aliases: ["coupons and discounts", "discounts", "coupon codes"]
prereqs: ["subscription-billing", "ledger"]
related: ["subscription-billing", "ledger", "idempotence", "proration"]
---

**Coupons and discounts** reduce what a customer pays — a percentage off, a fixed amount, a free trial, a promo code. Simple on the surface, but the rules (eligibility, stacking, duration, what they apply to) and the interaction with billing make them a genuinely fiddly feature.

```text
apply coupon → validate (eligible? expired? already used?) → compute new total → record
```

The pieces: defining a discount (amount/percent, duration, applicable products), validating it at checkout (eligibility, expiry, usage limits, minimum spend), applying it to the total, and recording it in the billing/ledger so the charge matches.

The classic mistakes:

- No validation on the server. Applying whatever code the client sends without checking eligibility/expiry/usage lets people reuse expired codes or stack unlimited discounts. Validate server-side.
- Race on limited-use codes. "First 100 users" or "one use per customer" needs atomic enforcement (a unique constraint, a counter) or concurrent requests oversubscribe it (see [unique constraint guard](/t/unique-constraint-guard)).
- Unclear stacking rules. Whether discounts combine, and in what order, has to be decided and enforced; ambiguous stacking produces wrong totals and disputes.
- Applying once but charging the wrong amount. The discount must be reflected consistently in the invoice, the ledger and the payment — not just displayed at checkout. Mismatches cause accounting problems.
- Reuse across subscriptions/invoices. A one-time coupon accidentally applied to every renewal; or a subscription discount that should expire but doesn't. Model duration explicitly.
- Floating-point money. Discounts and totals in floating point produce rounding errors and reconcile wrong; use precise decimal/integer minor-unit arithmetic (see [multi-currency](/t/multi-currency)).
- No audit. Who applied which discount, when and why matters for finance and fraud (see [audit columns](/t/audit-columns)).
- Ignoring the ledger. A discount is a real financial event; record it so revenue reporting and reconciliation are correct (see [ledger](/t/ledger)).

**How to build it:** define discount rules, validate server-side (eligibility, expiry, limits) with atomic enforcement for restricted codes, apply to the total precisely, record in the ledger, and audit applications. It's a billing feature where correctness and fraud resistance matter — treat the money math as carefully as any [payment](/t/payment-integration). See [subscription billing](/t/subscription-billing) and [proration](/t/proration).
