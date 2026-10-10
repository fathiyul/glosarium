---
title: "Designing a Chat System"
summary: "Real-time messaging, presence and message storage."
levels: { backend: senior, frontend: senior }
aliases: ["chat system design", "messaging system", "design chat"]
prereqs: ["websocket", "message-queue"]
related: ["websocket", "fan-out", "message-ordering"]
---
**Designing a chat system** delivers messages between users in real time with history: connection handling (WebSocket/long-poll), message routing and fan-out, ordered persistent history, presence and receipts — at scales from team chat to billions of messages a day. The core tension is real-time delivery versus durable, ordered history.

```text
send → gateway → router → recipients' connections (+ persist to history store)
offline user → history catch-up on reconnect (cursor-based)
```

Key decisions: protocol (WebSocket for real-time, with fallback), 1:1 vs group fan-out (groups multiply delivery work), ordering (per-conversation sequence numbers), storage (recent in fast store, archive in cheap), presence and receipts (ephemeral state, separate from messages), and media (uploads via object storage, not inline).

The classic mistakes:

- No ordering story. Concurrent sends, retries and reconnects scramble conversations without per-conversation sequencing. Sequence at write; reconcile on read.
- History as an afterthought. Real-time without durable ordered history breaks on every reconnect and device switch. Persist first-class; replay by cursor.
- Group fan-out naively. A 10k-member group turns one send into 10k deliveries; viral groups need fan-out batching and read-path optimisation (see [hot partition](/t/hot-partition)).
- Presence coupled to messages. Online indicators on the message path slow delivery and fail together. Separate ephemeral presence from durable messaging.
- Unbounded history growth. Infinite scrollback without archiving and retention policy balloons storage. Tier history; expire per policy.
- Missing abuse controls. Spam, harassment and illegal content need rate limits, reporting, blocking and scanning from the start — not after the incident.
- Encryption promises. End-to-end encryption changes everything (history, search, moderation, multi-device). Decide the trust model before the architecture, not after.

**Why it teaches:** real-time transport, fan-out, ordering, presence, storage tiering and abuse — chat compresses distributed messaging into one relatable system. Sequence, persist, fan out deliberately.
