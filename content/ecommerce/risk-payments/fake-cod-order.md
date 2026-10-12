---
title: "Fake COD Orders"
summary: "Orders placed to be refused at the door — prank buys, competitor noise and the cost of a zero-friction cart."
levels: { data-analyst: mid-level }
aliases: ["prank order", "malicious COD", "COD abuse"]
prereqs: []
related: ["cod-rejection-rate", "fraud-rate", "cancellation-rate", "failed-delivery-rate"]
---

A fake COD order is a purchase the buyer never intended to receive: prank orders from minors with a parent's app, competitors and disgruntled parties flooding a store to burn stock and courier trust, or habitual refusers gaming "free to try." Every one costs outbound freight, a courier attempt, a warehouse round-trip, an [inventory hold](/t/fill-rate) that blocked a real buyer, and — in campaign weeks — a stockout on the hero SKU.

```text
one prank order, Rp 90k basket:
  outbound freight  Rp 14k · return freight  Rp 14k
  pick+pack         Rp 6k  · slot held from real buyers (lost sale ~ margin)
  ≈ Rp 34k + trust damage on the seller's COD score
```

The economics explain why platforms police it: a seller's [COD rejection rate](/t/cod-rejection-rate) feeds marketplace trust scores, and repeated abuse quietly revokes the store's own COD eligibility — which, for the bottom of the market, *is* conversion.

The signal stack: **behavioral** (first-order-with-no-history + high-value basket + address-never-verified + "kirim sekarang" urgency), **device/identity** (multiple accounts, one phone — the promo-abuse cluster machinery applies directly), **geographic** (refusal-rate baselines per region; a 90%-refuse zone is an address-quality story, not a fraud story, until it isn't), and **timing** (abuse spikes on flash-sale open and campaign end-days — the pattern is a signature).

Controls trade conversion for cost exactly like risk rules elsewhere: COD-eligibility scoring (new accounts above a value threshold must prepay or verify — a small, real [conversion](/t/conversion-rate) tax on the first order), phone-confirmation steps for suspicious baskets, per-zone COD caps, and *deliberate* friction (COD slot booking: "choose delivery day" converts prank orders into non-commits).

The measurement rule: always pair fake-COD losses with *refused-and-returned* inventory state (units that aged or got damaged on round-trip) and courier relationship cost — the Rp 34k/unit headline understates the second-order damage. And report by *cause mix*: prank, habitual-refuser, competitor, address-error — a different counter lives in each bucket ([failed delivery](/t/failed-delivery-rate) is the logistics half of the same parcel's story).
