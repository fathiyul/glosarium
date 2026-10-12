---
title: "WebSocket"
summary: "A persistent, two-way connection between browser and server."
levels: { backend: mid-level, frontend: mid-level , data-scientist: junior }
also: [real-time]
aliases: ["websocket", "websockets", "ws protocol"]
prereqs: ["http", "tcp"]
related: ["server-sent-events", "long-polling", "webrtc"]
---

A **WebSocket** starts as an HTTP request that *upgrades* into a persistent, bidirectional message channel: either side sends frames at any time, with low overhead and no per-message handshake. It's the standard substrate for chat, collaboration, live dashboards and games — anything conversational.

```text
GET /chat (Upgrade: websocket) → 101 Switching Protocols
  ⇄ text/binary frames, either direction, until close
```

Unlike SSE (one-way) or polling (repeated requests), one connection carries the whole conversation. The costs are statefulness: the server holds the connection, scaling means sticky routing or shared pub/sub between nodes, and intermediaries must support upgrades (most modern ones do).

The classic mistakes:

- Stateful servers without a plan. Two nodes can't each hold half a conversation unless messages route between them (shared broker, pub/sub). Design the backplane before scaling.
- No heartbeat. Idle connections die silently through NATs and proxies; without ping/pong, neither side notices. Heartbeat and reap dead peers.
- Using it for request/response. Ordinary fetches over WebSocket forfeit caching, status codes and intermediaries. Use HTTP for documents and actions; sockets for conversations.
- No reconnection strategy. Connections drop (networks change, deploys restart). Clients need exponential-backoff reconnect with resume cursors, not a single attempt.
- Trusting frames. WebSocket messages bypass none of your validation — authenticate the upgrade, authorise subscriptions, validate every frame like any other input.
- Broadcast storms. One message fanned to 100k connections is a load event; bound fan-out and backpressure slow consumers (or drop them deliberately).
- Forgetting binary vs text. Frames can be either; mixing encodings without a declared protocol produces subtle corruption. Define the subprotocol.

**When to choose it:** genuinely bidirectional, low-latency communication. One-way browser updates may be simpler over SSE; occasional updates over polling or webhooks. WebSocket earns its statefulness where conversation is the product.
