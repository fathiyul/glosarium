---
title: "Consensus"
summary: "Getting nodes to agree on a value despite failures."
levels: { backend: senior, data-engineer: senior }
aliases: ["consensus", "distributed consensus", "agreement protocol"]
prereqs: ["cap-theorem", "paxos"]
related: ["raft", "paxos", "leader-election"]
---
**Consensus** is distributed agreement: a group of nodes deciding one value (the next log entry, the current leader, the committed transaction) despite crashes and partitions. Raft and Paxos implement it; replicated state machines, leader election and consistent metadata all rest on it. If nodes must agree and some may fail, consensus (or something equivalent) is unavoidable.

```text
propose → majority accept → decided (survives minority failure)
```

The core is majority rule: with 2f+1 nodes tolerating f failures, any two majorities overlap — so decided values persist. Liveness needs timing assumptions (leader, timeouts, retries); safety holds regardless. Consensus is slow relative to local operations (round trips to a quorum) and invaluable exactly where agreement matters.

The classic mistakes:

- Reimplementing it. Hand-rolled "simple" consensus has decades of subtle failure modes (split votes, duelling proposers, lost commits). Use proven libraries/services, never bespoke protocols.
- Even node counts. 4 nodes tolerate 1 failure (same as 3) while needing 3 for quorum — even numbers buy nothing. Odd majorities (3, 5, 7) for the fault tolerance actually wanted.
- Consensus on the hot path. Running agreement per user request multiplies latency catastrophically. Consensus elects leaders and commits config; data planes use leases and local decisions.
- Ignoring the witness/quorum math. Two datacenters can't both hold majorities; three locations (or a witness) make partitions decidable. Place voters so any surviving side can quorum.
- Confusing consensus with 2PC. Two-phase commit blocks on coordinator failure; consensus progresses with any majority. Different guarantees, different uses.
- Untested partitions. Consensus code paths for leader loss, split votes and rejoining trigger rarely and break expensively. Partition-test deliberately (see [chaos engineering](/t/chaos-engineering)).

**How to use it:** proven implementations (Raft libraries, coordination services), odd quorums across failure domains, consensus off the data hot path. Agreement is expensive — spend it on leadership and metadata, not per-request work.
