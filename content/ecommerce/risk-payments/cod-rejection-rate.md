---
title: "COD Rejection Rate"
summary: "Parcels the buyer won't take at the door — the failure rate of trust, priced in freight."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["COD refusal", "delivery rejection rate"]
prereqs: []
related: ["cash-on-delivery", "failed-delivery-rate", "fake-cod-order", "payment-method-mix"]
---

COD rejection = parcels refused at delivery ÷ COD parcels attempted. The metric every Indonesian store owns and every payment-centric dashboard forgets: a COD order counts as "converted" at checkout and *dies* at the door — and between those events you paid freight twice and aged the stock once.

```text
rejection by segment:
  first-time buyer        14%
  3rd+ order              4%
  cash-not-ready reported  38% of all refusals  ← timing, not intent
  office addresses, weekdays  2× residential
```

That split is the strategy map: a large share of refusals are *recoverable logistics failures* (nobody home, courier arrived during work hours) — fixed by delivery-window selection, pickup points and courier re-attempt policy, not by canceling COD. The rest is intent economics ([fake orders](/t/fake-cod-order), remorse, price regret at the door) and belongs to eligibility scoring: history-based COD caps ("up to Rp 300k until you have 2 completed orders") convert the tail without taxing the first-time buyer entirely.

The economics per rejection: outbound + return freight, warehouse re-intake, a unit that aged ([restock](/t/restock-rate)) and — the number that makes CFOs listen — *the real orders the platform now throttles*: marketplaces score seller COD reliability, and a high rejection store quietly loses COD visibility, which is bottom-of-market conversion.

Measurement honesty: attribute by *order cohort with a maturity window* (a refusal lands weeks after the order), reason-code every attempt (refused vs unreachable vs damaged-rejected — [failed delivery](/t/failed-delivery-rate)'s categories), and always value-weight (one Rp 1.5jt refusal ≠ five Rp 30k ones). And never present COD rejection against *prepaid* conversion in isolation — the [payment method mix](/t/payment-method-mix) moved the loss from one column to the other; the correct question is total loss per delivered order.
