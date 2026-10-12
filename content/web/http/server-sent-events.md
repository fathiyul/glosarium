---
title: "Server-Sent Events"
summary: "A one-way stream of events from server to browser over HTTP."
levels: { backend: mid-level, frontend: mid-level , data-scientist: junior }
also: [real-time]
aliases: ["server-sent events", "sse", "eventsource"]
prereqs: ["http", "long-polling"]
related: ["websocket", "webhooks-vs-polling", "http-2"]
---

**Server-Sent Events (SSE)** give the browser a one-way stream from server to client over ordinary HTTP: the client opens an `EventSource`, and the server drips `text/event-stream` messages down the held response indefinitely — notifications, feeds, progress, tickers.

```text
GET /stream (Accept: text/event-stream)
  ← data: {"progress": 42}
  ← data: {"progress": 87}
  ← …kept open, auto-reconnected by the browser…
```

Its charms are simplicity (plain HTTP: no new protocol, proxies and auth work normally) and free client behaviour (automatic reconnection with `Last-Event-ID` resume). Its limits are direction (server→client only — client talks back via separate requests) and connection model (one stream per HTTP/1.1 connection, six-per-origin caps; HTTP/2 multiplexing relieves this).

The classic mistakes:

- Using it bidirectionally. SSE has no client→server channel. Chat and collaboration need [WebSocket](/t/websocket) or equivalent; bolting POSTs alongside SSE is fine but should be a conscious choice.
- Blocking a thread per stream. Like long polling, each open stream holds a connection — serve them from async handlers, not parked threads.
- No resume cursor. Without event IDs, a reconnect replays or skips. Emit IDs and honour `Last-Event-ID` so clients resume cleanly.
- Proxies buffering the stream. Intermediaries that buffer responses defeat streaming; disable buffering on SSE routes (`X-Accel-Buffering: no` and equivalents) and confirm through the whole chain.
- Missing heartbeats. Silent streams look dead to idle-timeout proxies. Send periodic comment pings to keep the path alive and detect dead peers.
- Binary or huge payloads. SSE is UTF-8 text frames; binary belongs elsewhere (WebSocket binary frames or separate fetches).

**When to choose it:** one-way server→browser updates where HTTP simplicity matters — feeds, notifications, build progress. For bidirectional or binary traffic, WebSocket; for everything-constrained, long polling remains the fallback.
