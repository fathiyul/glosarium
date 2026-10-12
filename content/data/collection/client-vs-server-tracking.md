---
title: "Client-Side vs Server-Side Tracking"
summary: "Recording events in the browser or app vs on your servers, and what each misses."
levels: { data-engineer: mid-level, backend: mid-level , data-scientist: mid-level }
aliases: ["client-side tracking", "server-side tracking", "client vs server analytics"]
prereqs: ["instrumentation"]
related: ["instrumentation", "analytics-event-tracking", "tracking-plan", "consent-at-collection", "bot-filtering", "telemetry-pipeline"]
---

Client-side tracking records events in the user's browser or app, usually with a JavaScript or mobile SDK. Server-side tracking records events on your own servers, at the point the business action actually happens. Most real setups use both.

The classic mistake is tracking critical actions only on the client. A purchase tracked in the browser is lost when the user has an ad blocker, a flaky connection, or closes the tab before the event sends, and it can be faked by anyone who can run JavaScript. The server, by contrast, sees the order only after payment succeeds.

Use the client for what only the client can see: page views, scroll depth, clicks, video playback, UI interactions. Use the server for business events that must be correct and complete:

```
client: page_viewed, video_paused, signup_form_started
server: order_completed, payment_failed, subscription_cancelled
```

A common pattern is to send both and reconcile, trusting the server as the source of truth for the business action while using client events for behaviour.

## Trade-offs

- Client-side is cheap to add and captures UI context, but it is lossy, blockable and untrusted. Treat client data as a hint, not a record.
- Server-side is more reliable and can enforce [consent](/t/consent-at-collection) in one place, but it needs engineering effort and misses anything the server cannot observe. It also cannot identify an anonymous visitor unless the client tells it.
- Sending both risks double counting, so give each event a stable id and [deduplicate](/t/deduplication) downstream.

For backend developers: emit the event where the state change is committed, not where the request is received. See [instrumentation](/t/instrumentation) and the [tracking plan](/t/tracking-plan).
