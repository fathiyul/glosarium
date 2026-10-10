---
title: "Presence"
summary: "Showing who is online or viewing something right now."
levels: { backend: senior, frontend: senior }
aliases: ["presence", "presence channel", "online status"]
prereqs: ["realtime-pub-sub", "websocket"]
related: ["realtime-pub-sub", "fan-out", "websocket"]
---

**Presence** is live awareness of who's around: online indicators, avatars on a document, "three viewers," typing hints, cursor positions. Technically it's ephemeral state synchronised over realtime channels — joins, heartbeats and leaves maintaining a per-channel roster, with timeouts standing in for the leaves that never arrive (closed laptops send no goodbye).

```text
join → heartbeat every N sec → miss K beats → considered gone
roster = {user: {cursor, status, last-seen}}  (ephemeral, per channel)
```

The hard parts are all about impermanence: state must expire (nothing here is stored truth), scale with fan-out (popular channels have huge rosters), and degrade gracefully (presence is enrichment, never load-bearing for the app's function).

The classic mistakes:

- Treating presence as truth. "Online" means "heartbeat recently seen" — nothing more. Never gate security, billing or correctness on it.
- No expiry. Joins without timeouts accumulate ghosts — users "present" for days after closing the laptop. Heartbeat with aggressive expiry, always.
- Broadcasting too much. Per-keystroke cursors to ten thousand subscribers is a fan-out firehose. Throttle, batch and bound roster sizes on hot channels.
- Leaking activity. Presence reveals behaviour (who's viewing what, when). Scope channels tightly, get consent where sensitive, and don't log ephemeral state into permanent records.
- Thundering join/leave. Mass reconnects (deploy, network flap) storm the roster. Damp joins, batch diffs, and make rejoin cheap.
- Blocking app function on it. If presence fails, the document must still edit and the chat must still send. Enrichment degrades; function persists.
- Inconsistent identity. The same user on two devices needs a defined model (per-device entries vs merged user). Decide and render consistently.

**How to build it:** hearbeat-driven ephemeral rosters per channel, tight expiry, throttled updates, authorisation on subscribe, and total independence from core function. Presence is atmosphere — delightful when right, invisible when absent, never structural.
