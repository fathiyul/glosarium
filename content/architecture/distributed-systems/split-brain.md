---
title: "Split Brain"
summary: "Two nodes both believing they're the leader."
levels: { backend: senior, data-engineer: senior }
aliases: ["split brain", "split-brain", "divergent primaries"]
prereqs: ["cap-theorem", "quorum"]
related: ["quorum", "fencing-token", "leader-election"]
---
**Split brain** is divergent authority: two sides of a partition each believing they're primary, accepting writes independently — guaranteeing reconciliation pain when the partition heals. Every HA design courts it; quorum plus fencing is how serious systems refuse it.

```text
partition → A elects itself (no quorum check) + B elects itself → two primaries
heal → conflicting histories (one side's writes must lose)
```

Prevention is structural: majorities for leadership (at most one side quorums), fencing of the deposed (epochs, STONITH — old leaders can't write even if alive), and clients directed to the legitimate side. Detection (dual-primary alarms) is the backstop, not the plan.

The classic mistakes:

- Failover without quorum. "Promote the standby when the primary is silent" — silence includes "I'm partitioned but writing." Majority-gated promotion only.
- Fencing forgotten. A fenced-but-lively old primary accepting writes poisons recovery. Fence before promoting, verify before serving.
- Manual split-brain resolution. Asking humans to pick winning writes at 3am under pressure guarantees data loss and blame. Automate: last-writer rules, CRDTs, or partitioned ownership decided in advance.
- Two-node clusters. No majority possible with one survivor — two nodes can never safely auto-failover. Add a witness or accept manual promotion.
- Dual-primary by configuration. Active-active setups without conflict design are split-brain by architecture. Either design convergence or don't run dual-writer.
- Testing happy failover only. Clean kills rehearse the easy case; partitions rehearse split-brain. Test the network split, not just the process kill.
- Assuming cloud prevents it. Zones and regions partition too; managed services handle their internals, but *your* topology (DNS, clients, multi-writer apps) still splits.

**The rule:** majorities elect, fencing deposes, automation reconciles. Split brain isn't bad luck — it's quorum skipped. Design so partitions produce one authority or none, never two.
