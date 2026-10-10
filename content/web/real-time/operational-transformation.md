---
title: "Operational Transformation"
summary: "Transforming concurrent edits so they apply consistently, as in Google Docs."
levels: { backend: principal, frontend: senior }
aliases: ["operational transformation", "ot", "collaborative editing"]
prereqs: ["websocket", "realtime-pub-sub"]
related: ["crdt", "websocket", "event-streaming"]
---

**Operational transformation (OT)** keeps concurrent editors consistent through a central server: each edit is an operation (retain/insert/delete with positions); when two operations race, the server **transforms** the latecomer against what already applied, so intentions survive reordering. It's the classic Google-Docs algorithm — correct, centralised, and notoriously subtle to implement.

```text
doc "abc": you insert "X" at 1 → aXbc
peer deletes at 0 concurrently → transform your op vs theirs → same final doc
```

OT's shape follows from its centre: the server serialises, transforms and broadcasts, giving a single order and straightforward permissioning — at the cost of the server being load-bearing for every keystroke (latency, availability, scale) and the transform functions being famously hard to get right.

The classic mistakes:

- Hand-rolling transforms. OT correctness (convergence, intention preservation across operation pairs) is research-grade subtle. Use proven libraries; bespoke transforms diverge in production in ways tests miss.
- Ignoring the server bottleneck. Every edit round-trips centrally — latency floors responsiveness and outages freeze collaboration. Budget latency; plan failover that preserves the operation stream.
- No offline story. Disconnected editing with OT needs queued operations and server reconciliation on return — designed in, not bolted on, or offline edits corrupt.
- Treating it as simpler than CRDTs. The complexity moved (to transforms and the centre), not away. Choose OT for central control and mature text editing, [CRDTs](/t/crdt) for decentralised/offline-first — neither is "easy."
- Undo across transforms. Undoing through transformed history breaks naive implementations. Design undo against the operation model from the start.
- Composition and selection. Cursors, selections and rich formatting multiply the operation space. Collaborative *text* is the solved core; rich documents extend it painfully.

**When to choose it:** centralised collaborative editing where server ordering, permissions and mature text behaviour matter. For decentralised or offline-first collaboration, CRDTs fit better. Either way, adopt libraries — this algorithm family punishes reimplementation.
