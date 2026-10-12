---
title: "Seller Performance Score"
summary: "The platform's composite grade of a store — cancellation, shipping, chat, returns — with algorithmic consequences."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["store score", "shop performance", "seller rating (platform)"]
prereqs: []
related: ["cancellation-rate", "chat-response-rate", "otd-rate", "active-sellers"]
---

The seller performance score is a marketplace's weighted composite — typically late/cancelled-order rate, shipping-time SLA, [chat response](/t/chat-response-rate) speed, return-refund handling and rating history — scored per store, tiered, and *wired into the algorithm*: visibility, campaign eligibility, badge status, sometimes fee concessions. Sellers feel it as "the traffic got switched off"; platforms run the entire quality economy of a marketplace through it.

The analytics reality for sellers: the score is an **external, partially opaque, moving metric**, and the only defensible response is a *shadow score* — recompute the published components from your own order data (every platform's cancellation clock starts at *their* timestamp, and your [cancellation rate](/t/cancellation-rate) definition must match theirs to the minute), trend each component against the tier threshold, and alert before the tier change, not after. Teams that manage the composite manage a lagging number; teams that manage the components manage the score.

```text
shadow-score cadence, weekly:
  ship-time P90    vs 24h SLA    → margin: 6h — watch during campaigns
  chat <12h        vs 80% floor  → 78% (Saturday night is the leak)
  cancel rate      → spike traced to one out-of-stock listing
```

The campaign-week pattern is the classic self-harm: sellers chase order volume during a double-date, [OTD](/t/otd-rate) tail and chat backlog degrade, and the score drop arrives *after* the campaign — a traffic penalty that lands in the quiet week, disconnected in everyone's memory from its cause. Model score risk before bidding on volume.

For platform analysts: the score's components and weights *are* the incentive structure — expect gaming exactly where weights are loose (chat-reply bots that "answer" in 2 minutes; cancellations re-labeled as buyer-initiated), and audit with outcomes the seller cannot fake ([repeat-buyer rate of that store](/t/repeat-purchase-rate), delivered-and-paid margin per order). A score that rewards activity over quality eventually buys a marketplace of high-scoring bad stores.
