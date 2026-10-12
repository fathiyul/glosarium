---
title: "Order Processing Time"
summary: "Paid to packed — the warehouse's share of the delivery promise, measured in hours."
levels: { data-analyst: junior }
prereqs: []
related: ["otd-rate", "pick-pack-productivity", "courier-performance", "failed-delivery-rate"]
aliases: ["processing SLA", "ship time", "packing time"]
---

Order processing time = paid-at → picked-up-by-courier, per order (report median *and* P90; the mean hides the backlog tail where complaints live). It is the store's own half of the delivery promise — everything after courier pickup is [courier performance](/t/courier-performance); everything before is yours.

```text
promise: "same-day shipping"
median 4h ✓ · P90 38h ✗
the promise is true for most orders and false for the ones
customers review-bomb about
```

Why the distribution, not the average: processing is a *queue*, and queues fail by tail, not by mean. Campaign weeks (double-date, Ramadan) are the stress test — 3× volume into a warehouse staffed for baseline sends the P90 past every promise, and the complaint pattern matches the tail, not the dashboard. Track the number *per day* during campaigns, not just per month.

The decomposition that makes it fixable: payment-received → pick-listed → picked → packed → handed-off. Each segment has a different owner — pick-listing delays are inventory/allocation, packing delays are materials and labor scheduling, handoff delays are courier cut-off windows (a warehouse that packs by 3pm and hands off by 6pm loses to one that aligns packing shifts to the courier's pickup run, *same labor*, different result). Marketplace platforms literally score you on this — the seller-performance clock runs from payment, not from your shift start.

The analyst traps: cutoff-time artifacts (orders paid at 23:59 "process" across a calendar boundary — define same-day against the operational cutoff, not midnight), batched-system timestamps (some WMS stamp "packed" when the *whole order* is scanned, hiding partial-line waits), and COD orders (no payment event — the clock should start at order creation, or your processing time measures a fiction).

When it's the wrong boss: made-to-order and pre-sale models where delay is *the product plan* — but then the promise metric becomes "on-time vs promised date", not speed; measuring raw processing time would just punish the model.
