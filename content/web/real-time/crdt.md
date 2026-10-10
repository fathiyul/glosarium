---
title: "CRDT"
summary: "Data structures that merge concurrent edits without conflicts, used in collaborative editors."
levels: { backend: senior, frontend: senior }
aliases: ["crdt", "conflict-free replicated data type", "crdts"]
prereqs: ["eventual-consistency", "websocket"]
related: ["operational-transformation", "eventual-consistency", "realtime-pub-sub"]
---

A **CRDT** (conflict-free replicated data type) is a data structure whose concurrent updates always merge to the same result — no coordination, no locking, no conflicts to resolve. Counters (grow-only, add wins), sets (add/remove with tombstones or observed semantics), registers (last-writer with logical clocks), and full collaborative-text types all have CRDT forms. Replicas exchange operations and **converge** automatically.

```text
you: set title = "A"    peer: set title = "B"   (concurrent)
merge → same result everywhere (LWW, multi-value, or structured merge)
```

That's the superpower for offline-first and realtime collaboration: edits apply locally *instantly*, sync in the background, and merge deterministically. The price is type design (not every structure has a good CRDT), metadata overhead (tombstones, clocks), and semantics that surprise (deleted items resurfacing, concurrent edits both surviving).

The classic mistakes:

- Using CRDTs where coordination is fine. A central server with [operational transformation](/t/operational-transformation) or simple locking is easier to reason about. CRDTs earn their complexity in peer-to-peer, offline-first, or partition-tolerant settings.
- Last-write-wins for everything. LWW registers silently drop concurrent edits — fine for presence, wrong for prose. Match the type to the collaboration semantics.
- Unbounded tombstones. Remove-wins sets accumulate tombstones forever without garbage collection; long-lived documents bloat. Plan compaction.
- Assuming text CRDTs are simple. Sequence CRDTs (RGA, Yjs-style) are subtle machinery — use proven libraries, never hand-roll.
- Ignoring identity and ordering. Concurrent inserts need stable, ordered identifiers; naive timestamps tie and interleave wrongly. The ID scheme is the algorithm.
- No server authority. Pure peer convergence can't enforce permissions or validation. Real systems pair CRDT sync with server-side authz and bounds.
- Treating convergence as correctness. Replicas agreeing doesn't mean the merged result is what users wanted. Test merged outcomes, not just convergence.

**When to choose them:** offline-first apps and peer collaboration where local-first writes matter more than central control. Otherwise, centralised approaches are simpler — see [OT](/t/operational-transformation) for the server-mediated classic.
