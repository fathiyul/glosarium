---
title: "Raft"
summary: "An understandable consensus algorithm, used in etcd."
levels: { backend: senior, data-engineer: senior }
aliases: ["raft", "raft consensus", "raft protocol"]
prereqs: ["consensus", "leader-election"]
related: ["paxos", "leader-election", "quorum"]
---
**Raft** is the understandable consensus algorithm: leaders elected by majority vote, log entries replicated and committed by majority, followers applying committed entries to state machines. Its contribution isn't novelty (it's Paxos-equivalent) but comprehensibility — leader-centric design that engineers can reason about, implement correctly and operate confidently.

```text
elect: candidates request votes → majority elects leader (term N)
replicate: leader appends entry → majority acks → committed → applied
```

Terms, voted-for records and commit indexes keep the invariants; leader completeness (new leaders hold all committed entries) and election safety (one leader per term) fall out of majority overlap. etcd, Consul and countless control planes run Raft underneath.

The classic mistakes:

- Reimplementing it. Even "understandable" consensus hides edge cases (disruptive servers, pre-vote needs, snapshotting) that mature libraries already survived. Embed, don't author.
- Even cluster sizes. Four nodes, quorum three — the availability of three with the cost of four. Odd clusters (3, 5, 7) matched to the failures tolerated.
- Leadership instability. Flapping networks and tight timeouts cause chronic re-elections; randomised timeouts, pre-vote and sensible intervals calm campaigns.
- Unbounded log growth. Uncompacted logs exhaust disks and slow recovery; snapshotting plus log compaction are operational necessities, not optimisations.
- Joint membership changes ignored. Adding/removing voters needs phased transitions; single-step swaps risk dual majorities. Use the protocol's joint consensus path.
- Reads through the leader blindly. Stale reads from deposed-but-unaware leaders need read-index or lease checks; linearizable reads cost a round trip — pay it where freshness matters.
- Single-region clusters for global systems. Cross-region Raft pays WAN latency per commit; keep clusters regional, federate globally.

**How to use it:** proven Raft (etcd/Consul/libraries) for control planes, metadata and leadership — odd nodes across zones, snapshotted, monitored for terms and commit lag. Consensus you can understand is consensus you can trust.
