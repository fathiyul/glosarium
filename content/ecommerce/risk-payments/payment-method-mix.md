---
title: "Payment Method Mix"
summary: "The channel split of how customers pay — because every method has its own cost, risk and conversion economics."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["payment mix", "PM mix"]
prereqs: []
related: ["cash-on-delivery", "unpaid-order-rate", "cod-rejection-rate", "fraud-rate"]
---

Payment mix = share of orders (and value) per method: bank transfer/VA, e-wallet, QRIS, card, virtual account, COD, and BNPL/paylater. In Indonesian e-commerce the mix is *the* segmentation variable: payment method correlates with region, device, order value, trust stage and — critically — with the cost stack of each completed order.

```text
mix shift Q1→Q4:   COD 48% → 36% · QRIS 9% → 22% · VA flat
translation:       refusal losses ↓, gateway fees ↑ margin slightly,
                   average basket ↑ (digital-payment buyers)
```

The per-method economics belong on one table, because the P&L reads them there: gateway/MDR fees per method (card and wallet fees differ from fixed-fee VA), settlement timing (COD cash returns in days — [working capital](/t/cash-flow) — digital in T+n), [failure profile](/t/unpaid-order-rate) (VA expires silently, COD refuses at the door), and [fraud risk](/t/fraud-rate) by method. A "cheap" method with 9% refusal freight is not cheap per *completed* order — the right denominator is always cost-per-delivered-and-paid.

Analyst uses: mix *trend* is a trust indicator (new-region growth that stays COD-heavy is a store the market hasn't trusted yet), cohort conversion (which method did first-time buyers choose — that is the onboarding friction map), and pricing experiments (QRIS/paylater availability measurably lifts [AOV](/t/aov) because payment *is* credit framing; measure it against the BNPL default line below).

Founders: method expansion is a conversion roadmap decision with a margin tail — every added wallet/QRIS/BNPL channel pays a fee percentage and a reconciliation integration ([payment gateway](/t/payment-gateway) layer), so rank by *your* customers' abandonment reasons, not the competitor's checkout page.

When blended reporting kills the insight: comparing two stores' "COD %" without basket size (a store at 80% COD on Rp 40k orders and one at 80% on Rp 800k orders face different refusal damage) — always value-weight risk lines.
