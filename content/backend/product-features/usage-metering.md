---
title: "Usage Metering"
summary: "Counting billable usage accurately, without double-counting."
levels: { backend: senior, data-engineer: senior , tech-entrepreneur: pmf }
aliases: ["usage metering", "usage-based billing", "metering"]
prereqs: ["entitlements", "subscription-billing"]
related: ["entitlements", "subscription-billing", "metrics", "idempotence"]
---

**Usage metering** measures how much a customer consumes — API calls, storage, compute time, messages — so you can bill for it (usage-based pricing) or enforce plan [limits](/t/entitlements). It turns activity into countable, billable quantities.

```text
events (API calls, GB stored) → aggregate per customer per period → usage amount → invoice
```

The chain: **emit** usage events (each call, each byte), **aggregate** them per customer and billing period, **enforce** limits in real time, and feed the aggregates into billing. Each step has traps.

The classic mistakes:

- Counting non-idempotently. Retries and duplicate events inflate usage (over-billing) or, with dedup done wrong, under-count. Use idempotent event ids so a repeated event counts once (see [idempotence](/t/idempotence) and [idempotency key](/t/idempotency-key)).
- Late and out-of-order data. Usage events arrive late or out of order; aggregating "live" and then re-aggregating when late data lands must be handled, or the final bill is wrong.
- No period boundary definition. What counts as "this month" depends on time zone and cycle; ambiguity shifts usage between periods (see [timezone](/t/timezone)).
- Expensive per-event writes. Writing a row per API call to the billing database can overwhelm it; aggregate in a buffer/stream and flush periodically.
- Enforcing limits non-atomically. Checking "under the limit" and then using doesn't prevent brief overuse under concurrency; hard limits need atomic counters (see [atomic update](/t/atomic-update)).
- Mismatch with the invoice. The metered amount and the invoiced amount must reconcile; rounding and aggregation differences cause disputes (see [subscription billing](/t/subscription-billing)).
- No visibility for the customer. Customers need to see their usage (current period, overage); opaque metering causes support load and disputes.
- Forgetting free tiers and overage. How usage maps to price (first N free, then X per unit, or blocks) is a pricing model that must match the meter.

How to build it: emit idempotent usage events, aggregate them robustly (handling late data and clear period boundaries) via a buffer/stream, enforce hard limits with atomic counters where needed, expose usage to the customer, and reconcile the aggregate with the invoice. It's the measurement layer under usage-based [subscription billing](/t/subscription-billing) — correctness here is directly financial. See [entitlements](/t/entitlements) and [metrics](/t/metrics).
