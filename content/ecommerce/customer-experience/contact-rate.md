---
title: "Contact Rate"
summary: "Tickets (or chats) per order — the demand-side metric for how well the store explains itself."
levels: { data-analyst: mid-level }
aliases: ["customer contact rate", "tickets per order"]
prereqs: []
related: ["first-contact-resolution", "resolution-time", "return-rate", "failed-delivery-rate"]
---

Contact rate = support contacts ÷ orders, in a window (or per thousand orders for readability). It is the inverse quality signal of the *experience*: a store that works quietly generates less service demand. Rising [GMV](/t/gmv) with flat contact rate means scaling healthily; GMV and contacts climbing together means every order now costs service — and CSAT is usually the next domino.

```text
contact rate 38 → 52 per 1,000 orders over one quarter:
  by trigger: "status pesanan" +9 · "ongkir lama" +7 · refund +3
  by period:  spike begins courier-lane switch in week 6
```

That decomposition is the metric's entire value: contacts are *symptoms with timestamps*. Join every contact to its order, the order to its courier lane and its [status history](/t/failed-delivery-rate), and the contact-rate line becomes a ranked list of what broke. The biggest e-commerce contact driver is almost never "problems" — it's *not knowing*: order status, delivery timing, refund progress — all three are product-information failures priced in agent hours.

The ratio's denominator choices change the story: contacts ÷ *orders* (blames the order mix), ÷ *customers* (blames relationship depth), and ÷ *delivered* orders (exposes pre-delivery anxiety — that "where is my order" wave happens before any parcel completes). Report which one; a team watching orders-based contact rate will not see the WISMO (where-is-my-order) pattern at all.

The operational uses: staffing forecasts (contact-rate × forecast orders = queue plan, [lead-time](/t/resolution-time)-aware), self-service ROI (an order-status page that converts 40% of "status" contacts pays for itself at Rp 12k/ticket × your volume — the arithmetic CS teams need to win roadmap slots), and product defect surfacing (a SKU whose contacts spike on "tidak sesuai deskripsi" is a listing bug with a ticket queue attached, see [aspect mining](/t/aspect-based-sentiment)).

When to expect it low by design: high-involvement purchases (customers read the FAQ *because* the product page makes contact the fallback) and B2B-ish flows where buyers self-serve through portals. A *suspiciously* low contact rate means the opposite problem: customers gave up before asking.
