---
title: "Payment Gateway"
summary: "A service that lets you accept card, bank and e-wallet payments without building payment rails."
levels: { tech-entrepreneur: mvp }
aliases: ["payment gateway", "payment processor", "accepting payments"]
prereqs: ["business-model", "mvp"]
related: ["indonesia-payment-methods", "subscription-model", "multi-currency", "payment-integration"]
also: [indonesia]
---

A **payment gateway** handles the money movement you do not want to build: card processing, bank transfers, e-wallets, fraud checks, settlement and payouts — you integrate once and accept what your customers actually use. Building direct bank integrations for every method burns quarters; gateways compress it to days.

```text
without:  your team × every bank/e-wallet × compliance × reconciliation (quarters)
with:     one integration → cards + transfers + wallets (days)
```

Choose by coverage first (the methods *your* customers pay with), then fees, settlement speed, payout reliability and dashboard quality. A gateway missing your buyers' preferred method costs more in lost sales than any fee difference.

The classic mistakes:

- Cards-only in e-wallet markets. In Indonesia and much of Southeast Asia, bank virtual accounts, e-wallets and QRIS dwarf cards. Coverage mismatch silently caps revenue (see [Indonesian payment methods](/t/indonesia-payment-methods)).
- Ignoring settlement timing. "2% fee" with 7-day settlement versus 2.5% next-day changes cash flow materially for thin-margin businesses. Price the float, not just the fee.
- No reconciliation process. Gateway reports versus your books will differ (refunds, chargebacks, timing). Reconcile on a schedule from day one or month-end becomes archaeology.
- Single gateway, no fallback. Outages and risk-reviews freeze all revenue instantly. A secondary rail for retries — even manual at first — beats a dead checkout page.
- PCI scope misunderstandings. Using hosted fields/checkout pages keeps card data off your servers; handling raw card numbers invites compliance burdens startups should not carry. Let the gateway hold the hot potato.

## In Indonesia and Southeast Asia

Local methods dominate: virtual accounts, e-wallets, QRIS and bank transfer ([details](/t/indonesia-payment-methods)), plus cash-on-delivery where relevant. Pick gateways with deep local coverage first; global ones second for cards and cross-border. See [regional pricing](/t/regional-pricing) for matching prices to local purchasing power.
