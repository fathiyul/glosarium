---
title: "QRIS"
summary: "Indonesia's national QR payment standard, accepted across banks and e-wallets."
levels: { tech-entrepreneur: mvp }
aliases: ["QRIS", "QR Indonesia Standard", "QR payments"]
prereqs: ["indonesia-payment-methods", "payment-gateway"]
related: ["indonesia-payment-methods", "payment-gateway", "cash-on-delivery", "regional-pricing"]
---

**QRIS (Quick Response Code Indonesian Standard)** is the national QR payment standard: one QR code payable from any participating bank app or e-wallet. For merchants it collapses "which wallets do you accept?" into a single sticker, API or checkout option — and for customers it means paying with whatever app they already have.

```text
merchant shows one QRIS → customer scans with any bank/e-wallet app → settled per rail rules
```

Adoption is widest in offline retail, food, and micro-merchants, but online checkout increasingly offers it beside virtual accounts and e-wallets. Support it wherever Indonesian consumers pay you — its absence reads as "not really local" to a growing share of buyers.

The classic mistakes:

- QRIS as the only rail. It complements transfers, virtual accounts and cards; it does not replace them. Coverage is a portfolio ([payment methods](/t/indonesia-payment-methods)).
- Ignoring settlement and fees. Rails differ in timing and cost; QRIS economics suit small tickets best. Model per-rail margins rather than assuming uniformity.
- Static codes shared carelessly. Printed static QR stickers get swapped by fraudsters (a real attack pattern). Prefer dynamic per-transaction codes, verify merchant names in-app, and educate staff.
- No reconciliation. QRIS settlements blend into the mix; without per-rail reconciliation, leakage hides in volume. Track it like every other rail.

**Default:** offer QRIS alongside the other local rails through your [gateway](/t/payment-gateway), reconcile per method, and watch adoption by segment — its growth curve is the closest thing Indonesian payments has to a free win.
