---
title: "Long Polling"
summary: "Holding a request open until the server has news."
levels: { backend: mid-level, frontend: mid-level }
also: [real-time]
aliases: ["long polling", "long-polling", "comet"]
prereqs: ["http", "websocket"]
related: ["server-sent-events", "webhooks-vs-polling", "polling"]
---

**Long polling** is a hack for server→client updates over plain HTTP: the client opens a request, and the server *holds it* until an event arrives (or a timeout), then responds — whereupon the client immediately opens another. From the outside it looks like near-real-time push; inside it's just very patient requests.

```text
client: GET /events ──▶ server holds… (30s, event!) ──▶ response → client reconnects
```

It works everywhere HTTP works — no special protocols, no firewall issues — which is why it refuses to die. But each held request ties up a server connection (thread/process/port) for its whole wait, so scale means managing tens of thousands of mostly-idle connections.

The classic mistakes:

- Holding without timeouts. Requests held forever leak on dead clients. Bound the hold (25–30s typical) so both sides recycle cleanly.
- Blocking a thread per held request. On thread-per-connection servers, 10k waiting clients = 10k parked threads. Use async/non-blocking handling for held requests.
- Tight reconnect loops. Reconnecting instantly with no backoff turns a server outage into a self-inflicted retry storm. Back off and jitter.
- Message loss between polls. Events arriving in the reconnect gap need buffering keyed by a client cursor — otherwise updates silently vanish.
- Ordering assumptions. Reconnect races can deliver out of order; sequence numbers let the client reconcile.
- Choosing it when SSE/WebSocket fit. Same-origin one-way updates → [Server-Sent Events](/t/server-sent-events); bidirectional → [WebSocket](/t/websocket). Long polling is the fallback for constrained environments, not the default.
- Proxy timeouts killing holds. Intermediaries with short idle timeouts sever long polls; tune the chain or keep holds under the shortest timeout.

**When to use it:** as the compatibility fallback — ancient browsers, strict proxies, or simple low-volume needs. For greenfield real-time, prefer purpose-built transports and keep long polling in the fallback path.
