---
title: "Indonesian Payment Methods"
summary: "Bank virtual accounts, e-wallets, QRIS and other ways Indonesians pay online."
levels: { tech-entrepreneur: mvp }
aliases: ["Indonesian payments", "payment methods Indonesia", "local payments"]
prereqs: ["payment-gateway", "sea-market-landscape"]
related: ["payment-gateway", "qris", "cash-on-delivery", "regional-pricing"]
---

Indonesians pay online mostly *without* credit cards: bank virtual accounts (unique per-transaction numbers), e-wallets (GoPay, OVO, DANA and others), bank transfers via ATM/mobile banking, [QRIS](/t/qris) QR codes, retail-store payments (Indomaret/Alfamart), and in some segments [cash on delivery](/t/cash-on-delivery). A checkout offering only cards converts a fraction of its potential.

```text
typical mix:  virtual accounts + e-wallets + QRIS + transfers (+ cards for premium/foreign)
rule:         match methods to YOUR buyers — B2B invoices differ from consumer checkouts
```

Coverage beats optimization: each missing method visibly costs completed checkouts. Integrate through an aggregator [gateway](/t/payment-gateway) covering local rails rather than wiring methods one by one, and track conversion *by method* to see what your buyers actually use.

The classic mistakes:

- Cards-only checkout. The single costliest payments mistake in Indonesia. If cards are your only rail, you are declining most buyers before they start.
- Ignoring expiry behavior. Virtual accounts expire (commonly within a day); unpaid expiries need dunning flows, not silence. Design the pending-payment lifecycle, not just the success path.
- No reconciliation by method. Settlement timing and fees differ per rail; blended reporting hides margin leaks. Reconcile per method on a schedule.
- Assuming Java = Indonesia. Payment habits vary by city tier, age and segment — QRIS-strong youth, transfer-strong enterprise, COD pockets. Segment before standardizing.
- Fraud posture copied from cards. E-wallet promos attract abuse patterns cards never see (fake accounts, voucher farming). Tune risk rules per rail.

**Default stack:** aggregator gateway + virtual accounts + top e-wallets + QRIS + transfers, conversion tracked per method, reconciliation weekly. Add cards for premium and foreign buyers — as a complement, never the base.
