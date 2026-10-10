---
title: "Real-Time Communication"
summary: "Pushing updates to clients as they happen."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["real-time communication", "realtime", "real time updates"]
prereqs: ["websocket", "http"]
related: ["realtime-pub-sub", "webrtc", "server-sent-events"]
---

**Real-time communication** delivers updates as they happen — chat messages, live cursors, prices, game state, notifications — instead of on refresh or poll intervals. The transports form a ladder by need: polling for the occasional, SSE for one-way streams, WebSocket for conversation, WebRTC for peer media and data.

```text
seconds-late OK → polling / webhooks
one-way stream → SSE
bidirectional  → WebSocket
peer media/data → WebRTC
```

Going real-time changes the architecture: connections become stateful and long-lived (scaling needs routing or shared backplanes), delivery needs at-least-once thinking with resume cursors, and load becomes spiky (fan-out on popular events). The update path is a system, not a socket.

The classic mistakes:

- Real-time where polling would do. Dashboards refreshing every 30 seconds don't need sockets; statefulness always costs. Match the transport to the freshness requirement.
- No resume story. Dropped connections that restart from zero lose updates or replay everything. Cursors and replay windows make reconnects seamless.
- Stateful servers, accidental stickiness. Scaling stateful connections without shared state strands users on dying nodes. Route deliberately (sticky + shared backplane) or go stateless where possible.
- Fan-out without a budget. One event to a million connections is a load event every time. Bound, batch, and backpressure — popular channels need engineering, not just broadcast.
- Assuming ordering and delivery. Transports reorder and drop; application sequence numbers and idempotent handling close the gap.
- Ignoring the quiet costs. Idle connections consume file descriptors, memory and proxy slots at scale. Heartbeats, timeouts and capacity planning are part of the feature.
- No degradation. When the realtime path fails, the app should degrade to polling or cached state — not to a spinner.

**How to choose:** freshness need sets the transport; scale sets the architecture. Start with the simplest transport that meets the latency bar, and design resume, fan-out and fallback before the first incident teaches you to.
