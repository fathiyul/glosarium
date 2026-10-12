---
title: "On-Time Delivery Rate"
summary: "Share of orders arriving by the promised date — the promise, graded end to end."
levels: { data-analyst: junior, tech-entrepreneur: growth }
aliases: ["OTD", "on-time delivery", "delivery promise rate"]
prereqs: []
related: ["order-processing-time", "courier-performance", "failed-delivery-rate", "customer-success"]
---

On-time delivery rate = orders delivered on or before the *promised date* ÷ delivered orders. The promise matters more than the speed: a 3-day promise kept at 2 days is OTD 100% and a next-day promise kept at "next+" is a broken promise — customers judge against what the product page said, and platforms score exactly that.

```text
promise: 3 days (paid Jun 2)
delivered Jun 4 ✓  ·  Jun 5 ✗  ·  Jun 6 (late, arrived) ✗
OTD counts the second one against you even though the parcel "moved fine"
```

Measure from the *customer's* clock (paid-at), define the promised date *per region and service* (the same courier takes 2 days to Bandung and 6 to Makassar — one national SLA grade is fiction), and split late-but-delivered from undelivered — the first is an ops grade, the second is a [failed delivery](/t/failed-delivery-rate) story.

Why founders care beyond satisfaction scores: OTD is a *compound* metric — the warehouse and the courier each own half, which is exactly the point where blame hides. Decompose it monthly into [processing time](/t/order-processing-time) percentiles per node and courier segment percentiles per lane; a 90% OTD hiding 96% processing and 94% transit is fine; the same 90% hiding an 80%-tail P90 processing is a queue crisis wearing a delivery costume.

The analyst traps: address-zone drift (promises auto-adjusted by the platform vs what the shopper actually saw at checkout — grade against the *shown* promise), forward-looking bias (recent orders' deliveries haven't happened yet — close the window at "expected delivery date," not "ordered date," or the rate dips mechanically), and COD returns (a refused parcel was late *and* lost; count it in both metrics, never net it out).

When OTD is incomplete: pre-orders and made-to-order (the promise model differs entirely — measure against *promised ship window*), and pure marketplace dropshipping where you are scoring a partner's clock — still worth it, because the customer hands *you* the complaint.
