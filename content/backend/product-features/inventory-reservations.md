---
title: "Inventory and Reservations"
summary: "Temporarily holding stock or seats so two buyers can't get the last one."
levels: { backend: senior }
aliases: ["inventory and reservations", "inventory reservation", "stock reservation"]
prereqs: ["transaction", "unique-constraint-guard"]
related: ["transaction", "ledger", "idempotence"]
---

**Inventory and reservations** is the problem of tracking limited stock and *holding* an item for a customer while they check out, without overselling. A single product with one unit left must go to exactly one buyer, even if two people click "buy" at the same instant — and the hold should expire if the buyer abandons checkout.

```text
checkout start → reserve 1 unit (expires in 15 min) → pay → confirm (reservation → sale)
                                          └─ abandon → reservation expires, unit returns
```

The core is a **reservation**: a time-limited claim on stock, created atomically, that prevents others from taking it. On successful payment the reservation becomes a sale; on expiry or failure, the stock is released.

The classic mistakes:

- Check-then-decrement without atomicity. "Is stock > 0? yes → decrement" in two steps lets two buyers both pass the check and oversell. Use an atomic conditional update (`SET stock = stock - 1 WHERE stock >= 1`) or a reservation with a constraint (see [atomic update](/t/atomic-update)).
- No reservation expiry. A shopper abandons checkout and the units are held forever, so sellable stock disappears. Reservations must expire and release.
- Expiry races. A reservation expiring at the same moment a payment confirms must not both release and sell the same unit; the transition must be atomic and idempotent.
- Overselling by counting reservations wrong. Available stock = physical stock − active reservations; getting this formula or its updates wrong oversells or undersells. Keep it consistent.
- Hot-row contention. A popular item's stock row serialises all checkouts on it; under flash-sale load, that becomes a bottleneck. Consider sharded counters or queueing.
- Non-idempotent retries. Retried "confirm" or "reserve" calls can reserve twice or sell twice; make the operations idempotent (see [idempotence](/t/idempotency-key)).
- Ignoring the financial side. Stock movements are financial events; recording them in a [ledger](/t/ledger) keeps inventory and accounting consistent.
- Negative stock from returns/corrections. Manual adjustments, refunds and restocks must respect the same rules; guard against driving stock negative.

**How to design it:** model stock and reservations with atomic, conditional updates; expire reservations and release atomically; make reserve/confirm/cancel idempotent; and compute availability as stock minus active holds. Handle contention for hot items. It's a classic concurrency problem where correctness is measured in money — get the atomicity right and use [transactions](/t/transaction) to keep the transitions consistent.
