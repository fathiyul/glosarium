---
title: "Leader Election"
summary: "Choosing one node to coordinate the others."
levels: { backend: senior, data-engineer: senior }
aliases: ["leader election", "electing a leader", "leader failover"]
prereqs: ["consensus", "coordination-service"]
related: ["consensus", "raft", "split-brain"]
---
**Leader election** picks one node to coordinate (accept writes, assign work, sequence events), with the rest following or standing by — and re-picks on failure. Done through a coordination service or consensus protocol, election gives the system a single decision-maker without a single point of permanence: leaders are replaceable by design.

```text
nodes campaign → majority grants votes (term/epoch) → one leader serves
leader silent → followers time out → new term → new leader
```

Terms/epochs make leadership monotonic (old leaders can't unseat new ones once fenced), and majorities make it exclusive (at most one leader per term). The machinery exists so the common case — one undisputed coordinator — stays fast while failures stay survivable.

The classic mistakes:

- Split-brain leaders. Two nodes both believing they're leader (partition + lax fencing) accept conflicting writes. Majority votes plus fencing tokens keep leadership singular.
- Election storms. Flapping networks triggering constant re-elections stall all coordinated work. Randomised timeouts, hold-downs and pre-vote calm the process.
- Leadership as data plane. Routing all traffic through the leader wastes followers and bottlenecks throughput. Leaders coordinate (metadata, sequencing); data flows directly.
- Unready new leaders. A freshly elected leader serving before state catches up serves stale or partial truth. New leaders complete catch-up (or bounded recovery) before accepting work.
- Manual failover rituals. Human-run elections during incidents are slow and error-prone. Automate with tested procedures; humans supervise, not execute.
- Ignoring the observer problem. Clients caching "the leader is X" route to deposed leaders after elections. Direct clients through discovery with TTLs, not sticky knowledge.
- Single-voter setups. Two nodes can't elect (no majority possible alone); minimum three voters, placed across failure domains.

**How to run it:** consensus-backed election, odd voters across domains, fenced leadership, automated failover with caught-up successors. One leader at a time — enforced, not hoped.
