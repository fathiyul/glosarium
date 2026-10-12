---
title: "Restock Rate"
summary: "Share of returned goods that sell again at full price — the return cost line nobody models."
levels: { data-analyst: mid-level }
aliases: ["resale rate", "return-to-stock rate"]
prereqs: []
related: ["return-rate", "dead-stock", "margin-per-sku", "failed-delivery-rate"]
---

Restock rate = returned units that re-enter sellable inventory in full-price condition ÷ total returns. It is the quiet multiplier on every return-cost calculation: a 20% [return rate](/t/return-rate) where 90% restocks cleanly is a logistics fee; the same 20% where half arrives damaged, opened or unsellable is a COGS event — and the markdown path ([dead stock](/t/dead-stock) adjacent) is what the P&L actually pays.

```text
100 returns:
  78 inspected sellable        → restock rate 78%
  14 open-box (clearance value −40%)
   8 damaged/write-off
  cost per return = freight + handling + value loss (the last is 90% of it)
```

What the rate measures, operationally: **intake discipline**. An unstructured returns pile produces a random restock rate; the number stabilizes only with a standard inspection pipeline (condition codes, packaging rules, a defined refurbish-or-clear line) and with [serial returners](/t/serial-returners) and failed-COD parcels ([refusals](/t/failed-delivery-rate)) flowing through the *same* quality gate — a parcel refused at the door is often in perfect condition and should restock at ~100%, which is exactly why mixing it into general "returns" understates your recoverable value.

The category truth: electronics with sealed-packaging requirements restock poorly by construction (opened = downgraded, whatever its state); apparel depends entirely on tag/stain/odor inspection consistency; heavy/bulky items often skip inspection because the freight economics say "dispose on arrival" — the right restock rate is a *policy target per category*, not a house-wide average.

Analyst traps: restock ≠ recovery (time in the returns queue ages the unit; measure *days-to-restock* beside the rate — Ramadan returns restocked in February are technically restocked and practically written off), and double-counting risk (COD refusal units re-enter stock AND get claimed by the failed-delivery team's "recovery" number).

Where the number earns money: the markdown ladder (what share of returns never resells tells you whether a generous returns policy is *actually* expensive — pair with [conversion lift](/t/conversion-rate) to price the trade), and reverse-logistics sourcing (couriers who handle returns badly quietly convert your restock rate into a discount; the scorecard number is negotiation ammo on the same lane).
