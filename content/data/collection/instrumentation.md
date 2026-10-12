---
title: "Instrumentation"
summary: "Adding code that records what users and systems do, so the data exists at all."
levels: { data-engineer: junior, backend: junior , data-analyst: mid-level , data-scientist: junior }
aliases: ["event instrumentation", "analytics instrumentation", "tracking implementation", "adding tracking", "telemetry instrumentation"]
prereqs: ["logging", "event-naming-conventions"]
related: ["tracking-plan", "client-vs-server-tracking", "telemetry-pipeline", "consent-at-collection", "event-naming-conventions", "bot-filtering"]
core: [data-engineer]
---

**Instrumentation** means adding code that **records what users and systems do**, so that the data exists to analyze later. If nobody
instruments "added to cart", no pipeline, however well built, can tell you how many people did it.

```js
// client-side event
analytics.track("checkout_started", {
  cart_value: 129.5,
  currency: "USD",
  item_count: 3,
});
```

```python
# server-side event, emitted when the business action really happens
events.emit("order_completed", user_id=user.id, order_id=order.id, total_cents=order.total_cents)
```

## Decide before you code

- **What questions** will this data answer? Start from the decisions people need to make.
- **What events and properties** are needed? Write them in a [tracking plan](/t/tracking-plan) with
  [consistent names](/t/event-naming-conventions).
- **Where should the event fire?** See [client vs server tracking](/t/client-vs-server-tracking): browsers can be blocked, offline or
  faked, while servers see what really happened.
- **Who is it about?** An anonymous visitor ID, a user ID, a device. Plan how they'll be linked
  ([identity resolution](/t/identity-resolution)).

## Doing it well

- **Fire events at the moment of truth**: `order_completed` after payment succeeds, not when the button is clicked.
- **Include context**: timestamp (with the time zone or in UTC), app version, platform, and a unique event ID for deduplication.
- **Send it asynchronously and safely.** Tracking must never slow down or break the product. Batch events, retry on failure, and swallow
  tracking errors.
- **Test it.** Check that events fire once, with the right properties, in a debug view or in the raw data.
  Bugs here are silent, and are noticed months later when a chart looks odd.
- **Respect privacy and consent** ([consent at collection](/t/consent-at-collection)). Don't collect personal data you don't need, and
  honor opt-outs.
- **Treat it as code**: review it, version it and test it.

## Observability vs analytics

The same word covers technical instrumentation (metrics, traces, logs for operating a system) and product instrumentation (events about
user behavior). The principle is the same. Think about the question you'll need to answer first, and capture the data to answer it ([telemetry pipelines](/t/telemetry-pipeline)).

Missing instrumentation can't be backfilled. History you didn't record is gone, so it pays to think ahead.
