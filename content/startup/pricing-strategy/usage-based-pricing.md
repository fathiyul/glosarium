---
title: "Usage-Based Pricing"
summary: "Charging for what customers consume, such as API calls, storage or transactions."
levels: { tech-entrepreneur: pmf }
aliases: ["usage-based pricing", "consumption pricing", "pay-as-you-go"]
prereqs: ["pricing-tiers", "value-based-pricing"]
related: ["seat-based-pricing", "api-as-a-product", "net-revenue-retention", "annual-vs-monthly-billing"]
---

**Usage-based pricing** charges for consumption — API calls, gigabytes, transactions, minutes — instead of seats or flat tiers. Customers pay in proportion to value received, small users start nearly free, and revenue grows automatically as usage grows. For infrastructure and AI products it is increasingly the default.

```text
$0.002/call → 1M calls = $2,000/mo (scales with customer success, no seat negotiations)
pairs with:  base platform fee (predictability) + overage tiers (volume discounts)
```

The model's honesty is its risk: revenue fluctuates with customer fortunes, bills surprise (viral spikes become invoice shocks), and procurement departments hate unpredictability. Pure usage without guardrails trades pricing fairness for budgeting pain on both sides.

The classic mistakes:

- No bill-shock protection. Usage spikes (bugs, attacks, virality) generating 100× invoices destroy trust instantly. Caps, alerts and anomaly pauses are part of the pricing, not extras.
- Metering customers don't understand. Billing on internal units (compute-seconds, "credits" with murky math) breeds disputes. Meter in customer-meaningful units or translate transparently.
- Ignoring the floor. Pure usage with tiny users costs support more than it earns. Platform minimums or base fees keep small accounts viable — for both sides.
- Discounting volume into unprofitability. Enterprise volume deals below marginal cost (support + infra at scale) lose money per unit at the largest volumes. Know unit economics before signing big usage deals.
- Billing infrastructure as afterthought. Metering, rating, invoicing and dunning for usage at scale is a real system — underbuilt billing leaks revenue and trust simultaneously. Budget engineering for it from the start, not after the first disputed invoice.

**Hybridize deliberately:** platform fee for predictability + usage for scale + caps/alerts for trust. See [seat-based](/t/seat-based-pricing) for the model this replaces — and watch AI-driven consumption reshape both.
