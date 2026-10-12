---
title: "Failed Delivery & RTS Rate"
summary: "Parcels that reach the address and don't land — refused, unreachable, returned-to-sender."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["RTS rate", "delivery failure", "refused delivery"]
prereqs: []
related: ["cash-on-delivery", "otd-rate", "cancellation-rate", "courier-performance"]
---

Failed delivery rate = parcels that could not complete (refused, address unreachable, no recipient) ÷ parcels shipped; RTS specifically counts *returned-to-sender* outcomes. In prepaid logistics a failed delivery is a fee-burning loop (out, back, restock, maybe out again); in COD it doubles as a cancellation — the order "converted" and died at the doorstep.

```text
by payment method, same region:
  prepaid  1.8% fail
  COD      9.4% fail   ← this is a targeting & trust problem
```

That split is the first cut, always: COD failures are *behavioral* (buyer's remorse, forgotten order, "prank orders," cash not ready) and need the [COD](/t/cash-on-delivery) playbook — order confirmation, slot choice, COD-eligibility scoring by history. Prepaid failures are *operational* (wrong address data, courier attempts, office-only addresses on weekends) and need the address/attempts/last-mile playbook. Averaging them hides both.

The decomposition that makes it fixable: reason codes at first attempt (refused / no-recipient / wrong-address / damaged-rejected), attempts-before-RTS policy (one attempt is a different number than three), region × courier lane, and *customer-level* clustering — a handful of serial-refusers ([serial returners](/t/serial-returners)' cousin) can carry a region's rate.

Economics: each failed COD parcel costs outbound + return freight, warehouse handling, a returned-to-stock item that aged ([restock rate](/t/restock-rate)), and — the hidden one — a customer who now distrusts the next delivery attempt. Failure rate is therefore a *retention* input too: first-time COD buyers who experience a failed delivery convert to repeat at materially lower rates; the [OTD](/t/otd-rate) and this number jointly grade the delivery promise the reviews judge.

When to tolerate a higher rate: new-region launches (address data is thin until the first thousand parcels learn it), and event-driven demand spikes where impulse COD orders self-select for remorse. Price it in the plan; don't hide it in the average.
