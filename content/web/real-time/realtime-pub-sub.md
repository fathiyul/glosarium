---
title: "Real-Time Pub/Sub"
summary: "Broadcasting events to subscribed clients through a broker."
levels: { backend: mid-level, frontend: mid-level }
also: [messaging]
aliases: ["realtime pub/sub", "realtime pubsub", "live pubsub"]
prereqs: ["pub-sub-pattern", "websocket"]
related: ["pub-sub-pattern", "websocket", "fan-out"]
---

**Real-time pub/sub** pushes live events to subscribed clients the moment they're published: a score changes, a message arrives, a price ticks — every subscriber gets it now. A broker (or managed realtime service) holds topics and fan-out; publishers emit; subscribers receive over WebSocket, SSE or platform channels.

```text
publisher → topic "match:42" → broker ─┬─▶ app server
                                        ├─▶ 50k browsers
                                        └─▶ analytics consumer
```

It decouples beautifully: publishers don't know subscribers, new consumers attach without touching producers, and one event feeds browsers, services and analytics alike. The engineering concentrates in delivery semantics (at-least-once with dedupe keys, ordering per channel), authorisation (who may subscribe to what), and fan-out capacity.

The classic mistakes:

- No authz on subscribe. A topic namespace without per-channel authorisation leaks everyone's events to anyone who guesses a name. Authorise subscriptions like API routes.
- Assuming exactly-once. Retries and reconnects duplicate; clients must dedupe by event id. Design messages idempotent from the start.
- Ordering across channels. Order holds within a channel/partition, not across the system. Clients merging streams need their own sequencing.
- Unbounded fan-out. A viral topic multiplying one event into millions of deliveries needs capacity planning — it's your biggest load event, arriving unannounced.
- No presence or catch-up. Clients that connect mid-stream need current state plus the stream, not just the stream. Pair pub/sub with state snapshots and resume cursors (see [presence](/t/presence)).
- Vendor protocol lock-in. Managed realtime APIs differ; isolate the transport behind an interface so migration doesn't rewrite the app.
- Treating it as storage. Pub/sub delivers; it doesn't retain. Late joiners and audits need the event log persisted elsewhere.

**When to use it:** live fan-out to many consumers — scores, tickers, notifications, collaborative awareness. One publish path, many subscribers, with authz, dedupe and catch-up designed in from day one.
