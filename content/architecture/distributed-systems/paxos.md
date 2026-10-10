---
title: "Paxos"
summary: "The classic, notoriously hard-to-understand consensus algorithm."
levels: { backend: principal, data-engineer: principal }
aliases: ["paxos", "paxos consensus", "multi-paxos"]
prereqs: ["consensus", "quorum"]
related: ["raft", "consensus", "byzantine-fault"]
---
**Paxos** is the classic consensus protocol: proposers, acceptors and learners agreeing on values through prepare/promise/accept phases, with majorities guaranteeing safety across failures. Multi-Paxos (stable leader skipping per-instance preparation) made it practical; Raft later made the same guarantees approachable. Understanding Paxos means understanding consensus's core mechanics.

```text
prepare(n) → majority promise → accept(n, v) → majority accept → decided
higher n preempts; accepted values constrain future proposals (safety)
```

Its reputation for difficulty is deserved — the protocol is subtle, optimisations subtler, implementations rarer than citations. Modern systems usually choose Raft for new consensus needs; Paxos persists in storied systems (Chubby, early Spanner-adjacent designs) and as the vocabulary consensus literature speaks.

The classic mistakes:

- Implementing it. Even experts ship subtle Paxos bugs (liveness gaps, versnellingsbak edge cases in optimisations). Use Raft libraries or coordination services; study Paxos, don't ship it.
- Single-decree confusion. Basic Paxos decides one value; replicated logs need Multi-Paxos machinery (leader, log coordination, snapshots). Know which variant the problem needs.
- Liveness assumed. Paxos guarantees safety always, progress only with stable leadership and timely majorities — duelling proposers livelock without leader election/stabilisation.
- Ignoring the learner gap. Decided values still need delivery to learners/replicas; the commit-to-apply path needs the same care as the protocol.
- Byzantine expectations. Classic Paxos tolerates crashes, not lies; adversarial settings need BFT variants with 3f+1 and extra phases.
- Reconfiguration naively. Membership changes need careful transitions (joint consensus equivalents); ad-hoc voter swaps fork decisions.
- Dismissing it as obsolete. Raft's understandability doesn't retire Paxos's ideas — phases, promises and preemption recur in every consensus design. Learn it as foundation.

**Its place:** foundation and lineage — the protocol that proved consensus possible and shaped everything after. Build on Raft; understand through Paxos.
