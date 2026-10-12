---
title: "Analytics Event Tracking"
summary: "Recording user actions for later analysis."
levels: { backend: mid-level, frontend: mid-level, data-engineer: junior , data-scientist: junior }
aliases: ["event tracking", "product analytics tracking", "user event tracking", "clickstream tracking"]
prereqs: ["instrumentation"]
related: ["event-naming-conventions", "tracking-plan", "client-vs-server-tracking", "identity-resolution", "consent-at-collection", "bot-filtering"]
core: [data-engineer]
also: [collection]
---

**Analytics event tracking** is recording what users do (signed up, searched, added to cart, paid) as a stream of **events**, so that
people can analyze behavior later: funnels, retention, which features get used.

An event is a small record:

```json
{
  "event": "item_added_to_cart",
  "timestamp": "2024-06-01T09:30:12Z",
  "user_id": "u_8841",
  "anonymous_id": "a_3f9c",
  "properties": { "sku": "KETTLE-1", "price": 29.99, "currency": "USD" },
  "context": { "platform": "web", "app_version": "2.8.1" }
}
```

Many events flow to a collection service, then into storage and the warehouse, where analysts count and group them.

## What makes the data trustworthy (or not)

- **Consistent names and properties**: otherwise nothing is comparable ([event naming](/t/event-naming-conventions), and a
  [tracking plan](/t/tracking-plan)).
- **Where it's sent from.** Browser events can be lost to ad blockers, closed tabs and flaky connections. Server-side events are more
  reliable for things that matter, such as purchases ([client vs server tracking](/t/client-vs-server-tracking)).
- **Who it's about.** Visitors are anonymous until they log in, then you need to join the two identities
  ([identity resolution](/t/identity-resolution)).
- **Duplicates and ordering.** Retries send events twice, and events arrive late or out of order. Give each event a unique ID
  and use the event time, not the arrival time ([deduplication](/t/deduplication)).
- **Bots and internal traffic** inflate numbers ([bot filtering](/t/bot-filtering)).
- **Time zones**: send UTC timestamps.

## Privacy

Tracking is about people. Collect only what you need, respect consent and opt-outs, and keep personal data out of event properties
unless justified ([consent at collection](/t/consent-at-collection)).

Events can't be created retroactively, so decide the questions you'll want answered *before* you ship the feature.
