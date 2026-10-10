---
title: "Read-Your-Writes Consistency"
summary: "Users always seeing their own updates."
levels: { backend: senior, frontend: senior }
aliases: ["read-your-writes consistency", "read your writes", "session consistency"]
prereqs: ["eventual-consistency", "leader-follower"]
related: ["eventual-consistency", "strong-consistency", "leader-follower"]
---
**Read-your-writes consistency** guarantees a client always sees its own updates: post a comment, reload, and it's there — even on an eventually-consistent system. Users forgive global lag ("someone else's post appears late") but never self-inconsistency ("my post vanished"), making this the highest-value consistency upgrade per cost.

```text
write (session S) → route S's reads to leader / wait for position / version-check
→ S always sees its writes; others converge eventually
```

Implementations: session pinning (route a session's reads to the leader briefly), position tracking (replicas serve only when caught past the client's last write), or version-gated reads (client sends versions, server waits). All bound the weirdness to a session instead of eliminating it globally.

The classic mistakes:

- Global strong consistency for a session problem. Paying worldwide coordination latency so everyone's reads are fresh wastes what session guarantees achieve cheaply. Scope consistency to the session.
- Ignoring device switches. Phone-write → laptop-read breaks session tricks keyed to connections. Key sessions to users/tokens, not sockets.
- Optimistic UI without backing. Showing unconfirmed writes then "correcting" on stale reads confuses more than waiting would. Optimism needs the read guarantee behind it.
- Replica lag unmonitored. Session guarantees degrade as lag grows; unbounded lag breaks even generous windows. Alert on lag; bound it by design.
- Cache bypass forgotten. A CDN or app cache serving pre-write content violates read-your-writes above the database. Invalidate or version session-visible paths.
- Testing single-session only. Multi-user interleavings still converge eventually — verify the global story too, not just the mirror test.

**How to deliver it:** session-scoped freshness (pinning, positions, versions) over eventually-consistent stores. The cheapest consistency users actually notice — implement it before upgrading anything global.
